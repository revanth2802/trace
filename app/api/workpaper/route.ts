import { env } from 'cloudflare:workers';
import packet from '../../../lib/packet.json';
import { initialState, applyAction, redact, findings } from '../../../lib/domain.mjs';
const client = { id: 'client-joint', name: 'Ngozi & Erik', role: 'client', sensitive_data_clearance: false };
function actorFor(req: Request) { const cookie = req.headers.get('cookie') || ''; const id = cookie.match(/(?:^|; )trace_actor=([^;]+)/)?.[1]; return [...packet.firm.staff, client].find(a => a.id === id) || packet.firm.staff[0]; }
async function read() { const db = (env as any).DB; if (!db)
    throw new Error('Database binding unavailable'); await db.prepare('INSERT OR IGNORE INTO workpapers (id,revision,data) VALUES (?,?,?)').bind('household', 0, JSON.stringify(initialState(packet))).run(); const row = await db.prepare('SELECT revision,data FROM workpapers WHERE id=?').bind('household').first(); return { db, state: JSON.parse(row.data) }; }
function response(data: any, status = 200, headers: any = {}) { return Response.json(data, { status, headers: { 'Cache-Control': 'no-store', ...headers } }); }
function safeState(state: any, actor: any) { return actor.sensitive_data_clearance ? state : { ...redact(state, actor), attachments: state.attachments.map((a: any) => ({ ...a, data: null })) }; }
export async function GET(req: Request) { try {
    const { state, db } = await read();
    const actor = actorFor(req);
    if (actor.sensitive_data_clearance)
        await db.prepare('INSERT INTO access_logs (id,actor,at,reference) VALUES (?,?,?,?)').bind(crypto.randomUUID(), actor.id, new Date().toISOString(), 'Unmasked workpaper payload').run();
    const logs = await db.prepare('SELECT * FROM access_logs ORDER BY at DESC LIMIT 100').all();
    return response({ packet: redact(packet, actor), state: safeState(state, actor), actor, findings: findings(packet), accessLogs: logs.results });
}
catch (e: any) {
    return response({ error: e.message }, 503);
} }
export async function POST(req: Request) { try {
    if (req.headers.get('origin') && new URL(req.headers.get('origin')!).host !== new URL(req.url).host)
        return response({ error: 'Invalid origin' }, 403);
    const body: any = await req.json();
    if (body.type === 'switch') {
        const actor = [...packet.firm.staff, client].find(a => a.id === body.id);
        if (!actor)
            return response({ error: 'Unknown actor' }, 400);
        return response({ ok: true }, 200, { 'Set-Cookie': `trace_actor=${actor.id}; HttpOnly; SameSite=Strict; Path=/` });
    }
    const actor = actorFor(req);
    const { db, state } = await read();
    if (body.revision !== state.revision)
        return response({ error: 'Another reviewer saved changes. Your workspace has refreshed; please retry.' }, 409);
    const next = applyAction(packet, state, actor, body);
    if (new TextEncoder().encode(JSON.stringify(next)).length > 1800000)
        return response({ error: 'Review storage limit reached. Download a record and reduce attachment size; maximum aggregate record is 1.8 MB.' }, 400);
    const result = await db.prepare('UPDATE workpapers SET revision=?,data=? WHERE id=? AND revision=?').bind(next.revision, JSON.stringify(next), 'household', state.revision).run();
    if (result.meta.changes !== 1)
        return response({ error: 'Concurrent change detected. Refresh and retry.' }, 409);
    return response({ state: safeState(next, actor) });
}
catch (e: any) {
    return response({ error: e.message }, 400);
} }
