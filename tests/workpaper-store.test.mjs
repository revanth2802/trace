import test from 'node:test';
import assert from 'node:assert/strict';
import { PGlite } from '@electric-sql/pglite';
import { createWorkpaperStore } from '../lib/workpaper-store.mjs';
import { initialState } from '../lib/domain.mjs';
import { readFileSync } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import postgres from 'postgres';
import { PGLiteSocketServer } from '@electric-sql/pglite-socket';
const packet = JSON.parse(readFileSync(new URL('../lib/packet.json', import.meta.url)));

test('the production Postgres driver round-trips JSON without double encoding', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'trace-pg-'));
  const db = new PGlite();
  const server = new PGLiteSocketServer({ db, path: join(directory, '.s.PGSQL.5432') });
  const sql = postgres({ host: directory, database: 'postgres', username: 'postgres', max: 1, prepare: false });
  try {
    await server.start();
    const store = createWorkpaperStore((statement, params) => sql.unsafe(statement, params));
    const seed = initialState(packet);
    assert.deepEqual(await store.read(seed), seed);
    const next = { ...seed, revision: 1, nested: { text: 'quotes " and newline\n', amount: 1871 } };
    assert.equal(await store.save(next, 0), true);
    assert.deepEqual(await store.read(seed), next);
  } finally {
    await sql.end();
    await server.stop();
    await db.close();
    await rm(directory, { recursive: true, force: true });
  }
});

test('Postgres preserves saved data on reseed, rejects stale writes, and records access', async () => {
  const db = new PGlite();
  const query = async (sql, params) => (await db.query(sql, params)).rows;
  try {
    const store = createWorkpaperStore(query);
    const seed = initialState(packet);
    const state = await store.read(seed);
    assert.deepEqual(state, seed);
    const next = { ...state, revision: state.revision + 1, testMarker: 'persisted' };
    assert.equal(await store.save(next, state.revision), true);
    assert.equal(await store.save({ ...next, testMarker: 'stale' }, state.revision), false);
    assert.deepEqual(await createWorkpaperStore(query).read(seed), next);
    await store.recordAccess(packet.firm.staff[0].id);
    const logs = await store.accessLogs();
    assert.equal(logs.length, 1);
    assert.equal(logs[0].actor, packet.firm.staff[0].id);
    assert.match(logs[0].at, /^\d{4}-\d{2}-\d{2}T/);
  } finally { await db.close(); }
});

test('two reviewers cannot overwrite the same revision', async () => {
  const db = new PGlite();
  try {
    const store = createWorkpaperStore(async (sql, params) => (await db.query(sql, params)).rows);
    const state = await store.read(initialState(packet));
    const outcomes = await Promise.all([
      store.save({ ...state, revision: 1, reviewer: 'A' }, 0),
      store.save({ ...state, revision: 1, reviewer: 'B' }, 0),
    ]);
    assert.equal(outcomes.filter(Boolean).length, 1);
    assert.equal((await store.read(initialState(packet))).revision, 1);
  } finally { await db.close(); }
});
