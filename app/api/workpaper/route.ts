import { getWorkpaperStore } from '../../../lib/workpaper-store.mjs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import packet from '../../../lib/packet.json';
import { initialState, applyAction, redact, findings } from '../../../lib/domain.mjs';
const client = { id: 'client-joint', name: 'Ngozi & Erik', role: 'client', sensitive_data_clearance: false };
function actorFor(req: Request) { const cookie = req.headers.get('cookie') || ''; const id = cookie.match(/(?:^|; )trace_actor=([^;]+)/)?.[1]; return [...packet.firm.staff, client].find(a => a.id === id) || packet.firm.staff[0]; }
async function read() { const store = getWorkpaperStore(); const state = await store.read(initialState(packet)); return { store, state }; }
function response(data: any, status = 200, headers: any = {}) { return Response.json(data, { status, headers: { 'Cache-Control': 'no-store', ...headers } }); }
function safeState(state: any, actor: any) { return actor.sensitive_data_clearance ? state : { ...redact(state, actor), attachments: state.attachments.map((a: any) => ({ ...a, data: null })) }; }
export async function GET(req: Request) { try {
    const { state, store } = await read();
    const actor = actorFor(req);
    if (actor.sensitive_data_clearance)
        await store.recordAccess(actor.id);
    const logs = await store.accessLogs();
    return response({ packet: redact(packet, actor), state: safeState(state, actor), actor, findings: findings(packet), accessLogs: logs });
}
catch (e: any) {
    console.error('Workpaper read failed', e);
    return response({ error: process.env.DATABASE_URL ? 'Unable to load the workpaper. Please try again.' : 'Database is not configured. Set DATABASE_URL in the server environment.' }, 503);
} }
export async function POST(req: Request) { try {
    // Next.js may construct req.url with its internal hostname behind a proxy.
    const requestHost = req.headers.get('host') || new URL(req.url).host;
    if (req.headers.get('origin') && new URL(req.headers.get('origin')!).host !== requestHost)
        return response({ error: 'Invalid origin' }, 403);
    const body: any = await req.json();
    if (body.type === 'switch') {
        const actor = [...packet.firm.staff, client].find(a => a.id === body.id);
        if (!actor)
            return response({ error: 'Unknown actor' }, 400);
        return response({ ok: true }, 200, { 'Set-Cookie': `trace_actor=${actor.id}; HttpOnly; SameSite=Strict; Path=/` });
    }
    const actor = actorFor(req);
    const { store, state } = await read();
    if (body.revision !== state.revision)
        return response({ error: 'Another reviewer saved changes. Your workspace has refreshed; please retry.' }, 409);
    const next = applyAction(packet, state, actor, body);
    if (new TextEncoder().encode(JSON.stringify(next)).length > 1800000)
        return response({ error: 'Review storage limit reached. Download a record and reduce attachment size; maximum aggregate record is 1.8 MB.' }, 400);
    const saved = await store.save(next, state.revision);
    if (!saved)
        return response({ error: 'Concurrent change detected. Refresh and retry.' }, 409);
    return response({ state: safeState(next, actor) });
}
catch (e: any) {
    return response({ error: e.message }, 400);
} }
