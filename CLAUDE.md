# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is `pnpm`. Database commands load env from `.env.local` via `dotenv-cli`.

- `pnpm dev` — Next dev server
- `pnpm build` — runs `prisma generate && next build`
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm test` — route smoke tests against a real `next start` server on port `3456`. **You must `pnpm build` first** (or run `pnpm test:full` which does both). The harness spawns Next's CLI directly and kills the tree on Windows via `taskkill`.
- Run a single test: `node --test --test-name-pattern="<regex>" tests/routes.test.mjs` (server still needs to be built; the harness manages start/stop)
- `pnpm db:migrate` / `db:deploy` / `db:seed` / `db:studio` — Prisma against `POSTGRES_PRISMA_URL`
- `pnpm generate:images` / `regenerate:warehouse` — regenerate `public/images/*.webp` via `@google/genai` + `sharp` (requires `GOOGLE_API_KEY`)

## Architecture

Next.js 14 App Router (Pages Router is **not** used), React 18, Tailwind v4 (PostCSS plugin), TypeScript strict, Prisma + Vercel Postgres, NextAuth v5 (beta), Upstash Redis for rate limiting.

### Route groups

`src/app` uses two route groups that map to two distinct shells:

- `(site)/` — public marketing site. `src/app/(site)/layout.tsx` adds `Navigation` + `Footer`. Most public pages are one-line re-exports of components in `src/app/components/pages/*` (e.g. `(site)/page.tsx` → `components/pages/Home.tsx`). Edit the component, not the route file.
- `admin/(authed)/` — admin CMS. `admin/(authed)/layout.tsx` calls `auth()` and redirects to `/admin/login` if not authenticated. `admin/login/` sits **outside** the authed group on purpose.

`src/app/layout.tsx` is the root: registers `next/font` (DM Sans + Playfair) as CSS variables, sets `metadataBase` from `SITE_URL`, and injects the org JSON-LD.

### Auth

NextAuth is split into two files because the middleware bundle can't import bcrypt/Prisma:

- `src/lib/auth.config.ts` — edge-safe config (`authorized` callback, jwt/session callbacks, `pages.signIn`). Imported by `middleware.ts`.
- `src/lib/auth.ts` — full config including the `Credentials` provider that hits Prisma + bcrypt + the Upstash login limiter. Server-only.

`middleware.ts` runs `NextAuth(authConfig)` against `matcher: ["/admin/:path*"]`. Inside `authorized`, `/admin/login` is allow-listed; everything else under `/admin` requires a session.

Login rate limiting (`src/lib/rate-limit.ts`) is **best-effort** — if Upstash env vars are missing or the call throws, the limiter returns `true` (allow) rather than blocking logins.

### Jobs CMS

Two-layer model: there's a static `src/app/data/jobs.ts` array (used by `prisma/seed.ts` to bootstrap) and the live `Job` table in Postgres. Public pages read from Prisma:

- `(site)/careers/[slug]/page.tsx` — `revalidate = 60`, filters `published: true, archivedAt: null`
- Mutations are React Server Actions in `src/lib/actions/jobs.ts`. Each action calls `requireAdmin()`, validates with `jobInputSchema` (Zod, in `src/lib/validators/job.ts`), writes via Prisma, then `revalidatePath`s `/careers`, `/admin`, and the affected slug(s). Slug uniqueness is enforced in app code via `slugify` + `uniqueSlug` (in `src/lib/slug.ts`), not the DB.

`publishedAt` is set on the first transition to `published: true` and preserved thereafter — don't reset it on subsequent updates.

### SEO

`src/lib/seo/jsonld.ts` exports `SITE_URL` (env `NEXT_PUBLIC_SITE_URL`, fallback `https://lncfood.com`), `absoluteUrl()`, and JSON-LD builders (`organizationLd`, `jobPostingLd`, etc.). Inject with `<JsonLd data={…} />` from `src/lib/seo/JsonLdScript.tsx`.

`src/app/sitemap.ts` and `src/app/robots.ts` are App Router metadata routes. The sitemap pulls published jobs from Prisma but **swallows DB errors** so build/preview without a live DB still works — keep that fallback if you edit it.

### Path alias

`@/*` → `./src/*` (see `tsconfig.json`). Use it instead of relative imports across `src`.

### Tailwind v4

Configured via `@tailwindcss/postcss` in `postcss.config.mjs` — there is no `tailwind.config.*`. Theme tokens (`--primary: #2D5F3E`, etc.) live in `src/styles/theme.css`; `src/styles/index.css` is the single global stylesheet imported by the root layout.

## Test gotchas

`tests/routes.test.mjs` runs against a built production server, so changes that only manifest in dev (e.g. dev-only middleware behavior) won't be caught. The tests assert specific copy strings on each page — e.g. `Your Trusted Asian Food Distribution Partner`, `Join Our Team`, `Let's Partner Up`, the support phone/email in the footer, and `Warehouse Associate` on `/careers` (the seeded job). If you rename hero copy or remove that seed, update the corresponding assertion. There are also regression guards against `<a><button>` nesting, empty-href `<a href="#">` social links, and external `fonts.googleapis.com` `@import`s — keep `next/font` self-hosted and use `<button>` for not-yet-wired social icons.


##UPDATED FEEDBACK

We also decided not to include any customers on our website. Alternatively, please add that we work with franchise clients and can procure custom items to streamline their product line. We can add the brands that we work with to keep that animation if you'd like. 
