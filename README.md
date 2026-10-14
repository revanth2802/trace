# Trace — tax review workspace

An evidence-first case-study prototype for the fictional Okafor–Lindqvist 2025 joint return. Loads the supplied JSON without changing its original records; review actions persist in Cloudflare D1.

## Run locally

Requires Node 22.13+ (build was also verified with the available Node 22.11). Install with `npm ci`. Generate migrations only when changing `db/schema.ts`: `npm run db:generate`.

Build: `npm run build`. Apply each pending local migration once:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_dazzling_nicolaos.sql
```

Start with `npm start` or develop with `npm run dev`. The server prints its localhost URL. Preview and hosted databases are separate.

## Checks

```sh
node --test tests/domain.test.mjs
npx tsc --noEmit
npm run build
```

Review records are written through `/api/workpaper`; an atomic revision check prevents lost updates. A server-issued demo persona cookie enforces the selected role. The persona switcher is a demonstration, not production identity or authentication. Sites owner-private access protects the hosted prototype.

## Submission files

- `docs/APPROACH.md`: core idea and data model.
- `docs/ERRORS.md`: independently surfaced errors and review concerns.
- `docs/WALKTHROUGH.md`: script for your required personal video.
- `docs/CAPABILITIES.md`: implementation and limitations.

This app simulates filing and signatures. It does not transmit to agencies. Adjustments use the packet’s supplied marginal rates, not a complete recomputation. Exports are self-contained JSON records. Attachments are capped at 1 MB and aggregate review storage is bounded to fit D1; production storage should use R2.
