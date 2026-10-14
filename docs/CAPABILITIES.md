# Implementation map

| Requirement | Working implementation |
|---|---|
| Evidence and exact source | Figure drawer, input links, simulated printed pages, field/page locator, read-text highlight, source verification; document reverse destinations and exclusion reasons |
| Calculations and detailed records | All 627 engine lines, filter/search/paginated display, input dependencies, supplied rule descriptions, prior-year comparison, per-asset federal/CA/AMT schedule and detail records |
| Independent checks | 22 checks/review concerns independent of the 11 engine diagnostics, with concrete evidence refs and saved resolutions |
| Changes | Adjustments preserve originals, author, reason and estimated tax effects; undo; atomic bulk verification and batch undo; signature/affected verification invalidation |
| Comparison and scenarios | v1/v2/v3 browsing, changes-from-previous, saved checkpoint comparison, supplied alternate engine outcomes |
| Judgment and completeness | Source verification methods, recorded decisions/elections/due diligence with authority, area completeness review, document dispositions, outside-filing concerns |
| People | Server-validated demo personas, questions/answers, blocking notes, reviewer/partner/client approval chain, assignments/deadlines, notification summary, shared polling updates |
| Filing and after | Blocking checklist, simulated client authorization, filing freeze, preserved filing snapshot, amendment, scripted season replay, agency rejection records, client JSON copy, examiner JSON record, notice response and 2026 carryforward |
| Firm | Administrator standards editor, sensitivity masking, unmasked payload/document view logs, area budgets and time entries, engagement activity and last-reviewed marker |
| Deliverables | Hosted prototype, approach/data-model page, findings report, walkthrough recording outline |

## Explicit prototype boundaries

- Reviewers select simulated identities. Real firm SSO, user invitations, client identity verification and legally valid signatures need production integrations.
- No agency transmission occurs. Season replay shows provided e-file events and rejection records; it does not create an actual electronic return.
- Adjustments estimate marginal tax effects. Linked downstream engine figures remain original engine results until individually adjusted; affected verification records reopen. No complete tax engine is reconstructed.
- Printed pages are simulated directly from `printed_content`. Highlighted extracted text may be absent or ambiguous; the UI shows the extracted field separately rather than claiming successful OCR alignment.
- Attachments are stored within the review aggregate for the bounded demo (1 MB per attachment, 1.8 MB aggregate limit). Production files should use object storage.
- Review changes are shared by periodic polling and optimistic revision checks rather than WebSocket push.
- Exported client and examination packages are JSON, not filed-form PDFs. Retention is a recorded firm standard; deletion scheduling and legal holds are not performed.
- Source packet is bundled as delivered. The prototype addresses one household and is not a multi-client practice-management system.
- The required video of the applicant explaining decisions still needs to be personally recorded and uploaded. A script is included.

## Validation

Eight domain tests cover real independent findings, immutable originals, dependent review invalidation, correct undo ordering, role restrictions, independent approvals, bulk undo, blocked filing, full signing/freezing/amendment lifecycle, and redaction. TypeScript and the production build pass. Browser checks cover all eight navigation sections, exact source tracing, restricted persona payloads and mobile role switching. Local API integration checks prove D1 persistence, compare-and-swap concurrency, role rejection and blocked filing.

## MUI migration validation

Material UI 9 replaces interface controls and overlay infrastructure; server data and tax-review rules remain the same. Browser workflow checks verify real adjustment and multiline verification saves, checkbox values, dialog focus trapping, nested Escape behavior, undo, table filters and bulk selection. A clipped native-select issue was corrected with scoped sizing styles. The complete eight-screen smoke check continues to pass.

## Document layout regression checks

Drawer source pages use normal document flow to prevent MUI flex shrinking from letting printed text overlap extracted fields. Long fields wrap on mobile. Source values follow their declared type, including mileage, percentages and Swedish currency. Geometry checks cover mileage pages, the corrected brokerage supplement, large sales records, wage and foreign statements at desktop, tablet and mobile widths, plus long-dialog scrolling on a short mobile screen.

## Interface polish

The shared Inter/MUI theme establishes a readable typography hierarchy, restrained severity chips, 8px spacing, compact summary cards, numeric table alignment and distinct keyboard focus. Responsive layouts and mobile navigation preserve access to the review workflow. Automated accessibility scans pass for the main screens, figure drawer and verification dialog; long records support keyboard scrolling.
