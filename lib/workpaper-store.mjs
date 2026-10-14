import postgres from 'postgres';

export const schemaStatements = [
  `CREATE TABLE IF NOT EXISTS workpapers (
    id text PRIMARY KEY,
    revision integer NOT NULL DEFAULT 0,
    data jsonb NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS access_logs (
    id text PRIMARY KEY,
    actor text NOT NULL,
    at timestamptz NOT NULL,
    reference text NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS access_logs_at_idx ON access_logs (at DESC)`,
  // Supabase's browser API must not expose these server-owned review records.
  `ALTER TABLE workpapers ENABLE ROW LEVEL SECURITY`,
  `ALTER TABLE access_logs ENABLE ROW LEVEL SECURITY`,
];

// Query injection lets integration tests run these exact SQL statements in Postgres.
export function createWorkpaperStore(query) {
  let ready;
  async function initialize() {
    if (!ready) {
      ready = (async () => {
        for (const statement of schemaStatements) await query(statement, []);
      })().catch(error => { ready = undefined; throw error; });
    }
    await ready;
  }
  return {
    initialize,
    async read(seed) {
      await initialize();
      await query('INSERT INTO workpapers (id, revision, data) VALUES ($1, $2, $3::text::jsonb) ON CONFLICT (id) DO NOTHING', ['household', 0, JSON.stringify(seed)]);
      const [row] = await query('SELECT data::text AS data FROM workpapers WHERE id = $1', ['household']);
      return JSON.parse(row.data);
    },
    async save(state, previousRevision) {
      const rows = await query('UPDATE workpapers SET revision = $1, data = $2::text::jsonb WHERE id = $3 AND revision = $4 RETURNING id', [state.revision, JSON.stringify(state), 'household', previousRevision]);
      return rows.length === 1;
    },
    async recordAccess(actor) {
      await query('INSERT INTO access_logs (id, actor, at, reference) VALUES ($1, $2, $3, $4)', [crypto.randomUUID(), actor, new Date().toISOString(), 'Unmasked workpaper payload']);
    },
    async accessLogs() {
      const rows = await query('SELECT id, actor, at, reference FROM access_logs ORDER BY at DESC LIMIT 100', []);
      return rows.map(row => ({ ...row, at: new Date(row.at).toISOString() }));
    },
  };
}

let store;
export function getWorkpaperStore() {
  if (!store) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('Database is not configured. Set DATABASE_URL in the server environment.');
    // Use the provider's pooled URL and its SSL settings; never expose it to the client.
    const sql = postgres(url, { max: 1, idle_timeout: 20, connect_timeout: 10, prepare: false });
    store = createWorkpaperStore((statement, params) => sql.unsafe(statement, params));
  }
  return store;
}
