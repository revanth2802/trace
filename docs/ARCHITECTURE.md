# Trace: architecture and data flow

This describes the deployed prototype. Source records come from the supplied fictional packet; review changes are persisted separately. No document-extraction service, external AI model, or authoritative tax engine runs in the application.

## 1. Deployed architecture

```mermaid
flowchart TB
    User["Reviewer or client using a demo persona"]
    subgraph Vercel["Vercel: Next.js application"]
        UI["React and MUI interface"]
        API["Server API: /api/workpaper"]
        Rules["Domain rules: permissions, review actions, approval invalidation"]
        Packet["Unchanged JSON packet: sources, return versions, reference data"]
        Checks["Independent deterministic findings"]
        Store["Postgres storage adapter"]
        UI -->|"GET: load or refresh; POST: action and revision"| API
        Packet --> API
        Packet --> Checks
        Checks --> API
        API --> Rules
        Rules -->|"Validated next review state"| Store
        API -->|"Read state and log sensitive payload access"| Store
        API -->|"Role-filtered packet and review state"| UI
    end
    subgraph Supabase["Supabase"]
        Pool["Transaction pooler: TLS connection"]
        DB[("Postgres: workpapers and access_logs")]
        Pool --> DB
    end
    User --> UI
    Store -->|"Server-only DATABASE_URL"| Pool
    GitHub["GitHub main branch"] -->|"Build and deploy"| Vercel
```

The browser calls the Next.js API. It does not connect directly to Postgres. The server uses a private connection string through Supabase's transaction pooler. GitHub pushes trigger Vercel deployments. Shared review changes refresh through polling every 15 seconds.

## 2. Evidence and review relationships

```mermaid
flowchart LR
    Doc["Document and page: simulated printed content"]
    Field["Extracted field: ID, value, read text, confidence"]
    Line["Return figure in a supplied version"]
    Inputs["Other return figures used as calculation inputs"]
    Review["Saved adjustments, verifications, notes, and resolutions"]
    Approval["Approval state and filing readiness"]
    Doc -->|"Document ID and page number"| Field
    Field -->|"Source reference"| Line
    Inputs -->|"Input references"| Line
    Line -->|"Review subject key"| Review
    Review -->|"Recompute blockers and reopen affected approvals"| Approval
```

These are logical relationships between records, not separate SQL tables. Links also resolve reference data, client answers, prior-year records, and other supplied evidence. The UI supports reverse lookup from a document to the current return lines whose source references identify it. Extraction confidence and reviewer verification remain separate concepts.

## 3. Physical database model

```mermaid
erDiagram
    workpapers {
        text id PK "Single household review record"
        integer revision "Optimistic concurrency version"
        jsonb data "Review aggregate"
    }
    access_logs {
        text id PK "Access event ID"
        text actor "Demo persona ID"
        timestamptz at "Access time"
        text reference "Access description"
    }
```

There is no foreign key between these tables. Persona IDs resolve against the supplied packet.

| Storage | Contents |
|---|---|
| Bundled `lib/packet.json` | Documents, extracted values, engine versions, client records, staff, and reference information; unchanged by review actions |
| `workpapers.data` | Adjustments, verifications, issues, notes, questions, attachments, assignments, time, judgments, approvals, filing state, snapshots, and audit events |
| `workpapers.revision` | Revision checked atomically on every saved review action |
| `access_logs` | Server-side record of unmasked workpaper payload access; document-view actions also appear in the review audit |

The JSON aggregate is appropriate for one household and keeps state transitions easy to inspect. A multi-client production system would use more granular engagement, evidence, event, and attachment storage. Review audit entries and snapshots are application-maintained records, not a tamper-proof external ledger.

## 4. Saving a review action

```mermaid
flowchart TD
    Action["User submits an action and the displayed revision"]
    Origin{"Same-origin request?"}
    Actor["Resolve demo persona from HttpOnly cookie"]
    Read["Read current workpaper"]
    Revision{"Submitted revision matches?"}
    Apply["Validate role and action; build next state"]
    Invalidate["Reopen approvals and affected verifications when required"]
    Save["Atomic UPDATE where stored revision equals previous revision"]
    Changed{"Exactly one row updated?"}
    Success["Return role-filtered saved state"]
    Conflict["409 conflict: refresh and retry"]
    Forbidden["Reject request"]
    Action --> Origin
    Origin -->|"Yes"| Actor
    Origin -->|"No"| Forbidden
    Actor --> Read --> Revision
    Revision -->|"No"| Conflict
    Revision -->|"Yes"| Apply
    Apply --> Invalidate --> Save --> Changed
    Changed -->|"Yes"| Success
    Changed -->|"No: another save won"| Conflict
```

The database comparison is necessary even after the initial revision check: another reviewer can save between reading and updating. Invalid actions are rejected by server-side domain rules. An adjustment records its explanation and estimated effect while preserving the original engine output.

## 5. Implementation boundaries

- Source documents are simulated from packet content; no OCR pipeline runs here.
- Findings are deterministic checks, independent of supplied engine diagnostics.
- Tax effects use supplied marginal rates; downstream engine figures are not fully recalculated.
- Personas demonstrate server-side permissions, not production authentication.
- Filing and signatures are simulated; no agency transmission occurs.
- Attachments are bounded and stored in the aggregate; exports are JSON records.
- Codex assisted development, analysis, tests, and documentation. No runtime external AI service receives the packet.

See [Approach and key decisions](APPROACH.md), [Findings](ERRORS.md), and [Deployment](VERCEL.md).
