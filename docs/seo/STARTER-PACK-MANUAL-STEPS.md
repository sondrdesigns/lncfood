# Starter Pack — Manual Steps

_This is the human side of the 5-day starter pack. Code work is committed; these tasks must be done in browser/console UIs._

## What's already shipped (code)

| Item | Where |
|---|---|
| `app/sitemap.ts` (dynamic, includes jobs from Prisma) | `src/app/sitemap.ts` |
| `app/robots.ts` (allows GPTBot/ClaudeBot/PerplexityBot/Google-Extended/CCBot/Applebot-Extended) | `src/app/robots.ts` |
| Organization JSON-LD on every page | `src/app/layout.tsx` + `src/lib/seo/jsonld.ts` |
| `JobPosting` JSON-LD on `/careers/[slug]` | `src/app/(site)/careers/[slug]/page.tsx` |
| `metadataBase` set on root layout | `src/app/layout.tsx` |
| LocalBusiness + BreadcrumbList helpers (ready for Phase 1 location pages) | `src/lib/seo/jsonld.ts` |

After deploying these, `/robots.txt` and `/sitemap.xml` will be live at the production domain.

## Configuration the engineer should set before deploy

### 1. Set `NEXT_PUBLIC_SITE_URL` in Vercel

The JSON-LD, sitemap, and robots all use `NEXT_PUBLIC_SITE_URL` (defaults to `https://lncfood.com`). If the production domain is different, set it in Vercel project settings → Environment Variables for **Production** and **Preview**:

```
NEXT_PUBLIC_SITE_URL=https://lncfood.com
```

If `lncfood.com` is correct, no change is needed — the default kicks in.

### 2. Confirm canonical domain

Decide once: **`lncfood.com`** or **`www.lncfood.com`**. Configure the other to 301 → canonical in Vercel. Mixing the two creates duplicate-content issues and dilutes signals.

## Manual steps (in this order)

### Day 1 — Search Console & Bing Webmaster

1. **Verify `lncfood.com` in Google Search Console** at https://search.google.com/search-console.
   - Use **Domain property** (DNS TXT record) — covers HTTPS, HTTP, www, non-www, and all subdomains in one go.
   - Add the TXT record at the registrar.
2. After verification, submit the sitemap:
   - Sitemaps → Add new sitemap → enter `sitemap.xml`.
   - Within 7 days you should see "Discovered" with ~17 URLs (4 static + 4 locations [pending Phase 1 ship] + 5 categories [pending Phase 1 ship] + N jobs).
3. **Bing Webmaster Tools** at https://www.bing.com/webmasters — add the same property. Bing also feeds DuckDuckGo + ChatGPT search; it's worth 10 minutes.
4. **GSC URL Inspection** for `https://lncfood.com/`:
   - Confirm "Page is indexed" (or request indexing if not).
   - Confirm rich results test passes for the Organization JSON-LD on the homepage.

### Day 2 — Google Business Profile (×4)

For **each** of the 4 distribution centers, create or claim the GBP listing:

| Branch | Address | Phone |
|---|---|---|
| San Diego | 8724 Approach Rd, San Diego, CA 92154 | (619) 710-2030 |
| Los Angeles (City of Industry) | 15320 Salt Lake Ave, City of Industry, CA 91745 | (626) 465-7855 |
| Fresno | 471 S Teilman Ave, Fresno, CA 93706 | (559) 264-0298 |
| San Jose | 1309 Old Bayshore Hwy, San Jose, CA 95112 | (408) 998-8211 |

For each profile:

1. **Categories** (Google allows 1 primary + up to 9 secondary):
   - Primary: **Food and beverage distributor** (or "Wholesale grocer" if "Food and beverage distributor" is unavailable)
   - Secondary: **Wholesaler**, **Delivery service**, **Restaurant supply store**, **Food broker**
2. **Hours**: Mon–Fri 08:00–17:00 (matches the LocalBusiness schema we emit).
3. **Description**: 600–750 chars. Lead with "L&C Food Distribution — Asian foodservice distributor since 1995, serving California restaurants from our [city] distribution center." Include 2–3 local landmarks or freeway references for the city.
4. **Photos** (≥10 per location):
   - Exterior of the building (storefront with L&C signage)
   - Interior of warehouse (we have new ones for the SJ DC under `public/images/`)
   - At least one team member or truck shot
   - Logo
5. **Verification**: most B2B listings now use **video verification** (point a phone at the storefront sign + interior in one continuous take). Postcard verification is mostly phased out.
6. **NAP consistency check**: the address, phone, and business name on the GBP must **exactly** match what's in `src/app/data/locations.ts`. Any mismatch hurts local pack ranking.

> **Heads-up:** if any listings are already claimed by a previous owner / former employee, request ownership via GBP. This can take 4–8 weeks. Start it now.

### Day 3 — JobPosting validation

1. Go to https://search.google.com/test/rich-results.
2. Paste a live job URL — e.g. `https://lncfood.com/careers/warehouse-associate` (or whichever slug is currently published).
3. Confirm `JobPosting` is detected and reports zero errors. Common issues to check:
   - **`validThrough` in the past** — the helper sets it to publishedAt + 60 days. If a job has been live >60 days, it'll fail. Unpublish or refresh.
   - **`directApply: false`** — we set this when `applyUrl` is a `mailto:`. Some jobs in `data/jobs.ts` use mailto, which is fine — just confirms the boolean is correct.
   - **Address completeness** — the helper resolves the job's location string against `data/locations.ts`. If a job's location doesn't match any DC's city, it falls back to a partial address and may warn. Audit job locations: every published job's location string should start with one of: `San Diego, CA`, `Los Angeles, CA`, `Fresno, CA`, `San Jose, CA`.
4. Once clean, **submit one job URL via GSC** → URL Inspection → Request indexing. Within 1–7 days it should appear in Google Jobs results for relevant queries.

### Day 4 — Citations & directories

Add the business (NAP-consistent, all 4 locations) to:

- **Yelp for Business** (free listing) — https://biz.yelp.com
- **Apple Maps Connect** (free) — https://mapsconnect.apple.com
- **Bing Places** (free) — https://www.bingplaces.com (separate from Bing Webmaster Tools)
- **Local chamber of commerce** for each city (4 listings — usually free or low-cost with membership)

These citations strengthen local pack signals and AI-citation eligibility.

### Day 5 — Baseline & document

1. Take **dated SERP screenshots** for the 20 priority query–geo pairs in `SEO-STRATEGY.md §9`. Store in `docs/seo/baselines/2026-04-29/` (or current date). These become the before-picture for KPI tracking.
2. Run AI-citation tests on the 8 queries in `COMPETITOR-ANALYSIS.md §7` against ChatGPT, Perplexity, and Google AI Overview. Note current state.
3. In GSC, confirm:
   - Sitemap status: **Success** with discovered URL count
   - Coverage: at least the 4 static pages indexed
   - **Manual actions**: clean (no penalties)
4. In each of the 4 GBP profiles, confirm:
   - Verified status (green checkmark or "Verified")
   - Categories applied
   - Hours visible
   - At least 5 photos uploaded (full 10 can come later)

## Verification checklist (run after deploy)

- [ ] `https://lncfood.com/robots.txt` returns the rules (allow `/`, disallow `/admin`, `/api`, `/partner-application`, `/credit-application`; AI-crawler allow blocks; sitemap pointer)
- [ ] `https://lncfood.com/sitemap.xml` returns valid XML with all expected URLs
- [ ] View source on `/` — confirm `<script type="application/ld+json">` block with Organization data
- [ ] View source on a live job URL — confirm `<script type="application/ld+json">` block with JobPosting data
- [ ] Schema validator (https://validator.schema.org) passes clean on `/` and on one job URL
- [ ] Rich Results Test (https://search.google.com/test/rich-results) reports `Organization` on `/` and `JobPosting` on the job URL
- [ ] GSC sitemap submitted and "Success"
- [ ] All 4 GBPs verified

## Known gotchas

1. **Local Windows builds** — if `pnpm build` fails with `EPERM ... query_engine-windows.dll.node`, a local `next dev` or `next start` is holding the file. Stop those, or run `npx next build` (skips `prisma generate` if the client is already generated). On Vercel/Linux, this is a non-issue.
2. **Stale jobs** — jobs older than 60 days will emit `JobPosting` with `validThrough` in the past, triggering Google warnings. Recommend the weekly archival cron in `IMPLEMENTATION-ROADMAP.md` Phase 1 Week 2.
3. **Form-intake URLs** — `/partner-application` and `/credit-application` are now disallowed in `robots.txt` (they shouldn't rank). They remain reachable for direct CTA clicks, which is the intended UX. Don't remove the disallows.
4. **Admin** — the entire `/admin/*` tree is disallowed. NextAuth still gates access, but the disallow keeps the URLs out of crawler queues.
