import postgres from 'postgres';
import { schemaStatements } from '../lib/workpaper-store.mjs';
if (!process.env.DATABASE_URL) throw new Error('Set DATABASE_URL in .env.local or the server environment.');
const sql = postgres(process.env.DATABASE_URL, { max: 1, prepare: false });
try {
  for (const statement of schemaStatements) await sql.unsafe(statement);
  console.log('Postgres workpaper tables are ready.');
} finally { await sql.end(); }
