# Deploy Trace to Vercel

The app uses standard Next.js, server-side API routes, and Postgres. The GitHub repository root is the application root. No Cloudflare binding or Sites runtime is needed for this deployment.

## Database

Use a dedicated Supabase or Neon database for this fictional case study. In Supabase, open **Connect → Transaction pooler** and copy the Postgres URI (port 6543). Replace the password placeholder with your database password, URL-encoding special characters. Keep SSL enabled with `sslmode=require`. For Neon, use the pooled Postgres URI supplied by its Connect panel.

Store the complete URI as **DATABASE_URL** in Vercel environment variables. This is a server secret. Do not commit it or prefix it with `NEXT_PUBLIC_`. Supabase's public URL and publishable key are not needed because this app connects to Postgres from its server, rather than through the browser SDK.

On the first API request, the app creates its two tables and seeds the original fictional packet. Initialization is idempotent and never overwrites saved review changes. The database role must have permission to create tables. You can also initialize explicitly with `npm run db:setup` after adding DATABASE_URL to `.env.local`.

## Vercel import

1. Sign in to Vercel with GitHub and import `revanth2802/trace`.
2. Select the Next.js framework preset. Leave Root Directory at its default (repository root); the repository itself contains `package.json` and `app/`.
3. Use Node.js 22.x, install command `npm ci`, and build command `npm run build`. Leave Output Directory at its framework default.
4. Add DATABASE_URL for Production. Use a separate database for Preview/Development if you enable them; pointing previews at production shares review records.
5. Deploy. Open the generated `vercel.app` URL and confirm the overview loads.
6. Verify an adjustment saves, a refresh preserves it, and a restricted role masks identifiers. Check reviewer access before submitting the link.

Pushes to the linked production branch (`main`) trigger future deployments. Adding or changing an environment variable requires a new deployment.

## Existing review data

The source packet is included in GitHub. The previous D1 review history is not: a new Postgres database starts with a fresh review workspace. The existing hosted version remains available separately. If you need to preserve its saved decisions, export the workpaper before switching; do not assume GitHub contains live database records.

## Verification

`npm test` runs the domain, source-value, and real Postgres-engine storage checks. `npm run typecheck` checks TypeScript. `npm run build` produces the Next.js deployment. Browser workflow checks run against localhost port 5173.

The selectable personas and simulated filing/signatures are case-study features, not production authentication or agency transmission.
