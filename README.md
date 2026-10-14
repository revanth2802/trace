# Trace — tax review workspace

A React/TypeScript app with Material UI 9, a shared Inter theme, and the official Next.js App Router Emotion cache integration.

An evidence-first case-study prototype for the fictional Okafor–Lindqvist 2025 joint return. Loads the supplied JSON without changing its original records; review actions persist in Postgres (Neon or Supabase) through server-only Next.js API routes.

## Run locally

Requires Node 22.13+. Install with `npm ci`. Copy `.env.example` to `.env.local` and set `DATABASE_URL` to your provider’s pooled Postgres connection string. Keep the provider’s SSL settings in the URL. Supabase transaction-pooler connections are supported; prepared statements are disabled.

Run `npm run db:setup` to create the tables, then `npm run dev` (port 5173). The API also creates missing tables safely on its first request and seeds the fictional packet only when no workpaper exists. Build with `npm run build`, then run `npm start`.

For deployment, follow [docs/VERCEL.md](docs/VERCEL.md). The GitHub repository root is the app root; leave Vercel’s Root Directory at its default.

## Checks

```sh
node --test tests/domain.test.mjs
npx tsc --noEmit
npm run build
```

Review records are written through `/api/workpaper`; an atomic revision check prevents lost updates. A server-issued demo persona cookie enforces the selected role. The persona switcher is a demonstration, not production identity or authentication. Configure Vercel deployment access according to your interview submission needs. The packet contains fictional case-study data.

## Submission files

- `docs/APPROACH.md`: core idea and data model.
- `docs/ERRORS.md`: independently surfaced errors and review concerns.
- `docs/WALKTHROUGH.md`: script for your required personal video.
- `docs/CAPABILITIES.md`: implementation and limitations.

This app simulates filing and signatures. It does not transmit to agencies. Adjustments use the packet’s supplied marginal rates, not a complete recomputation. Exports are self-contained JSON records. Attachments are capped at 1 MB and aggregate review storage is bounded to 1.8 MB; larger production uploads should use object storage.

## UI architecture

`lib/theme.ts` defines the design system; `app/providers.tsx` applies ThemeProvider, CssBaseline and the streaming style cache. Inter is self-hosted with Fontsource. `components/ui.tsx` adapts MUI buttons, fields, native selects, checkboxes, chips, panels and progress indicators to the workpaper’s form contracts. Evidence uses MUI Drawer; action forms use MUI Dialog with focus trapping and Escape handling. Tables use MUI Table and feedback uses Snackbar/Alert. Project CSS handles the application layout and document rendering.

Run `node tests/browser-smoke.mjs` and `node tests/mui-workflows.mjs` against the local preview for interface checks. These browser scripts currently use the installed macOS Chrome executable.

The design system is documented in `docs/DESIGN_SYSTEM.md`. `node tests/theme-review.mjs` checks typography, responsive layouts, keyboard focus and WCAG accessibility against the local preview.
