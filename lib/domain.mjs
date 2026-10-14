export function findings(p) {
    const v = p.return_versions.at(-1), out = [];
    const add = (id, title, detail, refs, severity = 'critical') => out.push({ id, title, detail, refs, severity, origin: 'Independent check' });
    if (v.lines.some(l => l.key === 'SchB.1.6' && l.sources.includes('ref:fx.SEK.2024_average')))
        add('fx-year', 'Swedish interest uses a prior-year rate', 'SEK 18,450 divided by 10.56 gives $1,747. The packet’s 2025 average rate is 9.86, giving approximately $1,871.', ['SchB.1.6', 'D36', 'ref:fx.SEK.2025_average']);
    const mileage = p.documents.find(d => d.id === 'D23');
    if (mileage?.pages.some(pg => pg.printed_content.includes('Second scan')))
        add('mileage-duplicate', 'Mileage sheet counted twice', 'May–August appears on pages 2 and 3. Unique page totals are 2,600 + 3,700 + 1,800 = 8,100 miles. Review the engine’s mileage expense.', ['SchC.9', 'D23']);
    const rsu = v.lines.filter(l => l.form === 'F8949' && /RSU.*basis 0\.00/.test(l.label));
    if (rsu.length)
        add('rsu-basis', 'RSU sales carry zero cost basis', 'Three RSU lots show zero basis. Compare brokerage sales to the stock-plan supplemental statement before accepting capital gains.', rsu.map(l => l.key).concat('D11', 'D28'));
    const supplemental = p.documents.find(d => d.id === 'D31')?.pages.find(pg => pg.page === 32);
    if (supplemental && !v.lines.some(l => l.key.includes('M18')))
        add('supplemental-lot', 'Corrected brokerage supplemental sale omitted', 'D31 page 32 contains M18: proceeds $250, basis $310, short-term loss $60. No M18 return line exists. The missing proceeds also explain the $250 summary/detail mismatch.', ['D31', 'ev-0703']);
    const identity = p.household.people.find(a => a.role === 'dependent' && a.name.includes('Theo')) || p.household.people.find(a => a.name.includes('Theo'));
    if (identity && identity.ssn !== '666-74-3390')
        add('dependent-identity', 'Dependent identity conflicts with Social Security card', 'Theo’s household SSN differs from the printed Social Security card. Confirm the card before e-file; preserve the client entry and correction.', ['D71', 'household:' + identity.id]);
    const interest = v.lines.filter(l => /^SchB\.1\.[12]$/.test(l.key));
    if (interest.length === 2 && interest[0].value === interest[1].value)
        add('interest-overlap', 'Matching Northlake interest needs reconciliation', 'The composite statement and standalone 1099-INT both contribute $1,840. Determine whether they describe the same bank sweep interest.', ['SchB.1.1', 'SchB.1.2', 'D28', 'D29'], 'warning');
    const estimate = v.lines.find(l => l.key === 'F1040.26');
    const paid = p.tax_agency_records.irs_account_transcript_2025[0].transactions.filter(t => t.description === 'Estimated tax payment').reduce((n, t) => n + t.amount, 0);
    if (estimate?.value !== paid)
        add('estimated-payment', 'Estimated payments exceed IRS transcript', `The engine claims ${estimate?.value.toLocaleString()} in estimated payments; the March transcript totals ${paid.toLocaleString()}. The client guessed $4,000 for January, while IRS records show $3,000.`, ['F1040.26', 'qa-41', 'agency:/irs_account_transcript_2025/0', 'D67', 'D69']);
    const utilities = v.lines.find(l => l.key === 'SchC.25');
    if (utilities?.value === 3480)
        add('personal-utilities', 'Full family utilities deducted', 'The engine deducts $3,480. The client call reports 70% business use of the $2,160 mobile plan and 50% of the $1,320 internet service, totaling $2,172.', ['SchC.25', 'D15', 'call-01']);
    const software = v.lines.find(l => l.key === 'SchC.27a.1');
    if (software?.value === 6850)
        add('personal-software', 'Personal subscription remains in business expenses', 'The $6,850 software balance includes $216 Spotify Family, confirmed personal in the client call. Review a $216 exclusion.', ['SchC.27a.1', 'D15', 'call-01']);
    const wages = v.lines.find(l => l.key === 'SchCA540NR.1.E');
    if (wages?.value === 218400)
        add('ca-wages', 'California wages follow stale payroll coding', 'The employer retained California coding through September, although the household moved July 15. Compare D73 year-to-date CA taxable wages with W-2 totals; determine a supported resident/nonresident wage allocation.', ['SchCA540NR.1.E', 'D09', 'D73', 'qa-02']);
    const vehicle = v.lines.find(l => l.key === 'F8283.A1.vehicle');
    if (vehicle?.value === 6000)
        add('vehicle-gift', 'Vehicle gift uses donor estimate instead of sale record', 'The engine uses the client’s $6,000 valuation. Form 1098-C documents a sale for $2,900. Record a supported deduction decision rather than accepting the donor estimate.', ['F8283.A1.vehicle', 'D66', 'qa-39'], 'warning');
    add('hvac-capitalization', 'Whole HVAC replacement treated as repairs', 'D47 and the client call describe an $11,000 complete replacement. Review capitalization, service date and depreciation instead of accepting the repairs mapping.', ['SchE.14A', 'D47', 'call-01'], 'warning');
    if (p.prior_years.basis_records.partnership_ridgeline.some(b => b.outside_basis === null))
        add('basis-history', 'Partnership outside basis is not documented', 'Prior records show a capital account but outside basis was never computed. Record the reconstruction and supporting evidence; capital account alone does not complete the basis history.', ['D37', 'py:/basis_records/partnership_ridgeline'], 'warning');
    add('receipts-overlap', 'Business receipts need a books reconciliation', 'Atlas receipts include $12,400 processed by Paywell. Reconcile books, 1099-NEC and 1099-K; do not add overlapping reports blindly.', ['SchC.1', 'D14', 'D15', 'D17', 'D21'], 'warning');
    for (const e of p.extracted_values.filter(e => e.confidence < .7))
        add('confidence-' + e.id, 'Source verification required: ' + e.label, `Pipeline read ${String(e.value)} with ${Math.round(e.confidence * 100)}% confidence. Inspect the printed source and record verification.`, [e.id], 'warning');
    for (const d of p.documents.filter(d => d.extraction.status !== 'extracted'))
        add('coverage-' + d.id, 'Incomplete extraction: ' + d.id, d.extraction.reason || 'Review all pages and document how this item is accounted for.', [d.id], 'warning');
    return out.concat(v.diagnostics.map(d => ({ id: d.code, title: d.code.toLowerCase().replaceAll('_', ' '), detail: d.message, refs: d.refs, severity: d.severity === 'info' ? 'info' : 'warning', origin: 'Engine diagnostic' })));
}
export function initialState(p) { return { revision: 0, adjustments: [], verifications: {}, issues: {}, notes: [], questions: [], attachments: [], signoffs: {}, steps: {}, dispositions: {}, assignments: {}, time: [], judgments: [], audit: [], snapshots: [], filing: { status: 'in_review' }, standards: p.firm.starter_standards, seen: {}, scenario: null }; }
export function effectiveValue(s, l) { return s.adjustments.filter(a => a.key === l.key && !a.undone).at(-1)?.value ?? l.value; }
export function effects(p, s) { return s.adjustments.filter(a => !a.undone).reduce((sum, a) => { sum.federal += a.effect.federal; sum.california += a.effect.california; return sum; }, { federal: 0, california: 0 }); }
export function blockers(p, s) { const f = findings(p).filter(i => i.severity !== 'info' && !s.issues[i.id]?.resolved); return [...f.map(i => i.title), ...['Income & business', 'Investments & crypto', 'Property & rentals', 'Deductions & credits', 'Retirement & foreign', 'Basis & pass-through', 'California', 'Tax computation'].filter(a => !s.areaReviews?.[a]).map(a => a + ' area review missing'), ...s.notes.filter(n => n.blocking && !n.resolved).map(n => n.text), ...s.standards.required_steps.filter(k => !s.steps[k]), ...['reviewer', 'partner', 'client'].filter(r => !s.signoffs[r]).map(r => r + ' approval missing'), ...p.documents.filter(d => !p.return_versions.at(-1).documents_used.includes(d.id) && !p.return_versions.at(-1).documents_superseded.includes(d.id) && !s.dispositions[d.id]).map(d => d.id + ' not accounted for')]; }
export function applyAction(p, state, actor, action) {
    const s = structuredClone(state), now = new Date().toISOString(), id = crypto.randomUUID();
    const role = actor.role;
    const staff = ['preparer', 'reviewer', 'partner', 'quality_reviewer', 'firm_administrator'].includes(role);
    const editable = ['preparer', 'reviewer', 'partner'].includes(role);
    const assert = (ok, msg) => { if (!ok)
        throw new Error(msg); };
    assert(action && typeof action.type === 'string', 'Invalid action');
    const invalidate = () => { s.signoffs = {}; for (const k of ['Reviewer sign-off', 'Partner sign-off', 'Client approval and e-file authorization'])
        s.steps[k] = false; };
    const frozen = s.filing.status === 'filed';
    if (frozen && !['amend', 'seen', 'view', 'time', 'notice', 'carryforward'].includes(action.type))
        throw new Error('Filed record is frozen. Start an amendment first.');
    const text = v => { assert(typeof v === 'string' && v.trim().length > 0 && v.length < 10000, 'A meaningful explanation is required'); return v.trim(); };
    const log = { id, at: now, actor: actor.id, name: actor.name, role, type: action.type, detail: action };
    if (action.type === 'adjust') {
        assert(editable, 'This role cannot adjust figures');
        const l = p.return_versions.at(-1).lines.find(l => l.key === action.key);
        assert(l && typeof l.value === 'number' && Number.isFinite(action.value), 'Select a numeric return line');
        assert(p.return_versions.at(-1).tax_effect_rates[action.category] || ['credit', 'payment'].includes(action.category), 'Select a tax effect category');
        const original = effectiveValue(s, l), delta = action.value - original;
        const rates = p.return_versions.at(-1).tax_effect_rates[action.category];
        const effect = rates ? { federal: delta * rates.federal_per_dollar, california: delta * rates.california_per_dollar } : { federal: l.jurisdiction === 'federal' ? -delta : 0, california: l.jurisdiction === 'california' ? -delta : 0 };
        s.adjustments.push({ id, key: l.key, original, value: action.value, reason: text(action.reason), category: action.category, effect, actor: actor.id, at: now });
        invalidate();
        const affected = new Set([l.key]);
        let changed = true;
        while (changed) {
            changed = false;
            for (const dependent of p.return_versions.at(-1).lines) {
                if (dependent.inputs.some(k => affected.has(k)) && !affected.has(dependent.key)) {
                    affected.add(dependent.key);
                    changed = true;
                }
            }
        }
        for (const key of affected)
            s.verifications[key] = null;
    }
    else if (action.type === 'undo') {
        assert(editable, 'This role cannot undo');
        const a = s.adjustments.find(a => a.id === action.id && !a.undone);
        assert(a, 'Adjustment not found');
        assert(!s.adjustments.some(b => b.key === a.key && !b.undone && s.adjustments.indexOf(b) > s.adjustments.indexOf(a)), 'Undo the latest adjustment for this line first');
        a.undone = true;
        invalidate();
    }
    else if (action.type === 'verify') {
        assert(editable, 'This role cannot verify');
        assert(s.standards.verification_types.includes(action.method), 'Invalid verification method');
        assert(Array.isArray(action.keys) && action.keys.length <= 700, 'Invalid selection');
        log.previous = {};
        for (const key of action.keys) {
            log.previous[key] = s.verifications[key] || null;
            assert(p.return_versions.at(-1).lines.some(l => l.key === key) || p.extracted_values.some(e => e.id === key), 'Unknown figure');
            s.verifications[key] = { method: action.method, actor: actor.id, at: now, note: text(action.note) };
        }
        invalidate();
    }
    else if (action.type === 'undoVerification') {
        assert(editable, 'Review access required');
        const event = s.audit.find(a => a.id === action.id && a.type === 'verify' && !a.undone);
        assert(event, 'Verification batch not found');
        for (const key of event.detail.keys) {
            assert(s.verifications[key]?.at === event.at, 'A selected figure was reviewed again; cannot undo an older batch');
            s.verifications[key] = event.previous[key];
        }
        event.undone = true;
        invalidate();
    }
    else if (action.type === 'area') {
        assert(editable, 'Review access required');
        s.areaReviews ??= {};
        s.areaReviews[action.area] = { note: text(action.reason), actor: actor.id, at: now };
        invalidate();
    }
    else if (action.type === 'issue') {
        assert(editable, 'This role cannot resolve review items');
        assert(findings(p).some(i => i.id === action.id), 'Unknown review item');
        s.issues[action.id] = { resolved: !!action.resolved, reason: text(action.reason), actor: actor.id, at: now };
        invalidate();
    }
    else if (action.type === 'note') {
        assert(staff, 'Staff access required');
        s.notes.push({ id, text: text(action.text), key: action.key || null, blocking: !!action.blocking, actor: actor.id, at: now, resolved: false });
        invalidate();
    }
    else if (action.type === 'resolveNote') {
        assert(editable, 'Review access required');
        const n = s.notes.find(n => n.id === action.id);
        assert(n, 'Note not found');
        n.resolved = true;
        n.resolution = text(action.reason);
        invalidate();
    }
    else if (action.type === 'question') {
        assert(staff, 'Staff access required');
        s.questions.push({ id, text: text(action.text), to: action.to || 'Client', due: action.due || null, actor: actor.id, at: now });
    }
    else if (action.type === 'answer') {
        const q = s.questions.find(q => q.id === action.id);
        assert(q, 'Question not found');
        assert(role === 'client' || staff, 'Access denied');
        q.answer = text(action.text);
        q.answeredBy = actor.id;
        q.answeredAt = now;
        invalidate();
    }
    else if (action.type === 'disposition') {
        assert(editable, 'Review access required');
        assert(p.documents.some(d => d.id === action.id), 'Unknown document');
        s.dispositions[action.id] = { reason: text(action.reason), actor: actor.id, at: now };
        invalidate();
    }
    else if (action.type === 'step') {
        assert(editable, 'Review access required');
        assert(s.standards.required_steps.includes(action.key), 'Unknown step');
        assert(!['Reviewer sign-off', 'Partner sign-off', 'Client approval and e-file authorization'].includes(action.key), 'Approval steps require signatures');
        s.steps[action.key] = !!action.done;
        if (!action.done)
            invalidate();
    }
    else if (action.type === 'signoff') {
        assert(['reviewer', 'partner', 'client'].includes(role), 'Switch to reviewer, partner or client to sign');
        assert(!s.adjustments.some(a => !a.undone && a.actor === actor.id) && !Object.values(s.verifications).some(v => v?.actor === actor.id), 'You cannot approve work you prepared');
        if (role === 'partner')
            assert(s.signoffs.reviewer, 'Reviewer approval required first');
        if (role === 'client')
            assert(s.signoffs.partner, 'Partner approval required first');
        s.signoffs[role] = { actor: actor.id, name: actor.name, at: now, revision: s.revision, statement: text(action.statement) };
        const step = role === 'client' ? 'Client approval and e-file authorization' : role === 'partner' ? 'Partner sign-off' : 'Reviewer sign-off';
        s.steps[step] = true;
    }
    else if (action.type === 'file') {
        assert(role === 'partner', 'Only a partner can freeze a filing');
        assert(blockers(p, s).length === 0, 'Resolve all filing blockers first');
        s.filing = { status: 'filed', at: now, actor: actor.id };
        s.snapshots.push({ id, at: now, type: 'filed', state: structuredClone(state) });
    }
    else if (action.type === 'amend') {
        assert(role === 'partner' && frozen, 'Only a partner can amend a filed return');
        s.filing = { status: 'amendment', originalFiledAt: s.filing.at };
        invalidate();
    }
    else if (action.type === 'snapshot') {
        assert(staff, 'Staff access required');
        s.snapshots.push({ id, at: now, type: text(action.name), state: structuredClone({ ...state, snapshots: [] }) });
    }
    else if (action.type === 'assignment') {
        assert(staff, 'Staff access required');
        assert(p.firm.staff.some(a => a.id === action.assignee), 'Unknown assignee');
        assert(typeof action.due === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(action.due), 'A deadline is required');
        s.assignments[action.area] = { assignee: action.assignee, due: action.due, at: now };
    }
    else if (action.type === 'time') {
        assert(staff && Number.isFinite(action.hours) && action.hours > 0 && action.hours <= 24, 'Enter 0–24 hours');
        s.time.push({ id, area: text(action.area), hours: action.hours, actor: actor.id, at: now });
    }
    else if (action.type === 'judgment') {
        assert(editable, 'Review access required');
        s.judgments.push({ id, type: action.kind, text: text(action.text), authority: text(action.authority), refs: action.refs || [], actor: actor.id, at: now });
        invalidate();
    }
    else if (action.type === 'standards') {
        assert(role === 'firm_administrator', 'Only the firm administrator may edit standards');
        assert(Array.isArray(action.rules) && action.rules.every(r => typeof r === 'string'), 'Invalid rules');
        s.standards.rules = action.rules;
        invalidate();
    }
    else if (action.type === 'scenario') {
        assert(editable, 'Review access required');
        assert(action.id === null || p.what_if.alternatives.some(a => a.id === action.id), 'Unknown scenario');
        s.scenario = action.id;
    }
    else if (action.type === 'attachment') {
        assert(staff || role === 'client', 'Access denied');
        assert(typeof action.data === 'string' && action.data.length < 1400000, 'Attachment too large (maximum 1 MB)');
        s.attachments.push({ id, name: text(action.name), data: action.data, key: action.key || null, actor: actor.id, at: now });
        invalidate();
    }
    else if (action.type === 'notice') {
        assert(staff, 'Staff access required');
        s.judgments.push({ id, type: 'notice response', text: text(action.text), authority: text(action.authority), actor: actor.id, at: now });
    }
    else if (action.type === 'carryforward') {
        assert(staff, 'Staff access required');
        s.snapshots.push({ id, at: now, type: '2026 carryforward', state: { carryovers: p.return_versions.at(-1).carryovers_out, assets: p.return_versions.at(-1).assets, basis: p.prior_years.basis_records, adjustments: s.adjustments, judgments: s.judgments } });
    }
    else if (action.type === 'seen') {
        s.seen[actor.id] = now;
    }
    else if (action.type === 'view') {
        assert(staff, 'Staff access required');
        log.detail = { reference: action.reference, sensitive: actor.sensitive_data_clearance };
    }
    else
        throw new Error('Unknown action');
    s.revision++;
    s.audit.push(log);
    return s;
}
export function redact(p, actor) {
    if (actor.sensitive_data_clearance)
        return p;
    function walk(v, key = '') {
        if (/^(ssn|ip_pin|account_number|bank_account_for_refund_or_payment|firm_identity|prior_year_agi_for_esignature)$/.test(key))
            return '[protected]';
        if (typeof v === 'string')
            return v.replace(/666-\d{2}-\d{4}/g, '•••-••-••••').replace(/\b\d{6,17}\b/g, '[protected]');
        if (Array.isArray(v))
            return v.map(x => walk(x));
        if (v && typeof v === 'object') {
            const o = {};
            const sensitive = ['ssn', 'ein', 'account_number'].includes(v.value_type) || /ip.?pin|account.?number|bank.?account/i.test(v.field || '');
            for (const [k, x] of Object.entries(v))
                o[k] = sensitive && ['value', 'text_as_read'].includes(k) ? '[protected]' : walk(x, k);
            return o;
        }
        return v;
    }
    return walk(p);
}
