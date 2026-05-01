# L&C Food Distribution — Implementation Roadmap

_Companion to [`SEO-STRATEGY.md`](./SEO-STRATEGY.md). Tasks are sized for one technical contributor (engineering) + one content/SEO owner (writes copy, manages GBP) working in parallel._

## Phase 1 — Foundation (weeks 1–4)

**Outcome:** site is fully indexable, schema-correct, and has location/category landing pages live. No content marketing pillar yet.

### Week 1 — Plumbing & baseline

**Engineering:**
- [ ] Add `src/app/sitemap.ts` (auto-generates from `data/categories.ts`, `data/locations.ts`, Prisma `Job` query, and a new `data/solutions.ts` placeholder with the planned slugs)
- [ ] Add `src/app/robots.ts` per `SITE-STRUCTURE.md §7`
- [ ] Add `src/lib/seo/jsonld.ts` helper (Organization, LocalBusiness, JobPosting, BreadcrumbList, FAQPage builders)
- [ ] Inject Organization JSON-LD in root `layout.tsx`
- [ ] Verify trailing-slash and canonical config in `next.config.mjs`

**Content/SEO:**
- [ ] Claim or verify Google Business Profile for all 4 DCs (San Diego, City of Industry, Fresno, San Jose). Use real NAP from `data/locations.ts`.
- [ ] Verify Google Search Console for `lncfood.com` (DNS or HTML-file method). Submit sitemap once Engineering ships it Week 1.
- [ ] Verify Bing Webmaster Tools.
- [ ] Run baseline SERP screenshots for the 20 priority query–geo pairs (`SEO-STRATEGY.md §9`).
- [ ] Run baseline AI-citation tests against the 8 queries in `COMPETITOR-ANALYSIS.md §7`.

**Definition of done:** GSC reports sitemap discovered, ≥10 URLs indexed within 7 days. GBP profiles verified.

### Week 2 — Per-page metadata + JobPosting

**Engineering:**
- [ ] Add `export const metadata: Metadata` to every page route (Home, About, Products, Careers, Partner App, Credit App, Privacy, Terms, Accessibility). Each gets unique `title` + `description`.
- [ ] Add `metadata: { robots: { index: false, follow: true } }` to `/partner-application`, `/credit-application`, `/privacy`, `/terms`, `/accessibility`.
- [ ] On `/careers/[slug]/page.tsx`: add `JobPosting` JSON-LD (`title`, `description`, `datePosted`, `validThrough`, `employmentType`, `hiringOrganization` = L&C, `jobLocation` = the DC). Map from existing Prisma fields.
- [ ] Add weekly cron (Vercel cron or scheduled job) that archives jobs older than 60 days (`archivedAt = now()` if `publishedAt < now() - 60d`). Prevents stale-job manual-action risk per `SEO-STRATEGY.md §10`.

**Content/SEO:**
- [ ] Draft 9 unique `<title>` and meta descriptions (one per page route).
- [ ] Photograph or stage 2–3 location-specific shots per DC for Phase-1 location pages (warehouse exterior with city signage, dock, fleet, team if available).

**Definition of done:** GSC "indexed pages" view shows distinct titles per URL. Google Jobs rich-results test passes for ≥1 live job slug.

### Week 3 — First two location pages

**Engineering:**
- [ ] Create `src/app/(site)/locations/page.tsx` (hub) — lists all 4 DCs with cards, BreadcrumbList schema.
- [ ] Create `src/app/(site)/locations/[slug]/page.tsx` (dynamic) — pulls from `data/locations.ts`, hydrates from a new `data/locationContent.ts` (per-DC unique copy).
- [ ] Replace the hard-coded LA-pinned iframe in `AboutUs.tsx` with a dynamic per-location embed (ideally Google Maps with the DC's actual coordinates).
- [ ] LocalBusiness JSON-LD per location with full `geo`, `openingHours`, `address`, `telephone`, `areaServed`.

**Content/SEO:**
- [ ] Write `/locations/san-jose` (700+ unique words: address, hours, what gets delivered from this DC, neighborhoods served, dock count if known, fleet if known, local restaurant testimonial if available).
- [ ] Write `/locations/los-angeles` (same template, City of Industry-specific).
- [ ] Add 4 GBP service categories per location (foodservice distributor, wholesale grocer, delivery service, food broker).

**Definition of done:** Both pages live, validate clean on schema.org validator, GBP listings link to them.

### Week 4 — Remaining locations + categories + FAQ

**Engineering:**
- [ ] Create `src/app/(site)/products/[slug]/page.tsx` reading from existing `data/categories.ts`. Render description + items + supplier-brand mentions + cross-links to relevant `/solutions/*` pages (placeholder until Phase 2) + cross-links to `/locations/*`.
- [ ] Add `src/app/(site)/faq/page.tsx` with `FAQPage` schema. Initial 12–15 Qs covering: minimum order, delivery schedule, becoming a partner, cold-chain process, accepted payment terms, geographic coverage, supplier brands carried, organic/halal/kosher availability, refund policy, after-hours emergencies.

**Content/SEO:**
- [ ] Write `/locations/san-diego` and `/locations/fresno`.
- [ ] Write 5 category page intros (400+ unique words each) extending what's in `data/categories.ts`. Each must mention representative supplier brands and link to ≥1 location.
- [ ] Author the 12–15 FAQ entries.

**Definition of done:** All 4 locations live. All 5 categories live. FAQ live. Sitemap returns ≥20 URLs. Internal-link audit (use a quick crawler like Screaming Frog) confirms zero orphans.

## Phase 2 — Expansion (weeks 5–12)

**Outcome:** concept pillar live (5 solution pages), resource library launched (8–10 articles), customer-story pages started.

### Engineering work (one-shot, weeks 5–6)
- [ ] Create `src/app/(site)/solutions/page.tsx` + `/solutions/[slug]/page.tsx`.
- [ ] Create `src/app/data/solutions.ts` modeled after `categories.ts` — slug, name, tagline, description, typical SKU mix, related categories, related supplier brands, FAQs.
- [ ] Create `/resources` hub + `[slug]` route. MDX-based or Prisma-backed (recommend file-based MDX in `src/content/resources/*.mdx` for v1 — simpler than DB and version-controlled).
- [ ] Add `Article` schema on each resource page. Add author bios pulled from `src/app/data/authors.ts`.

### Content/SEO work (weekly, weeks 5–12)
See `CONTENT-CALENDAR.md §2 Phase 2` for the per-week publishing schedule. Cadence: 1 solutions page + 1 resource article per week, plus customer-story pages in weeks 11–12.

### Backlink work (weeks 5–12)
- [ ] List on California Restaurant Association directory (paid; tied to membership)
- [ ] List on local chambers (4 cities × 1 each)
- [ ] Outreach to 5 supplier brand-partner pages (Lee Kum Kee, Kikkoman, Pearl River Bridge, Mama Sita's, Aroy-D) for distributor-listing inclusion
- [ ] Submit to Yelp B2B and Apple Maps for all 4 locations (NAP-consistent with GBP)
- [ ] Pitch one local-press story (founder anniversary angle) — target one of LA Business Journal, San Diego Business Journal, San Jose Mercury News, or The Fresno Bee

### Phase 2 definition of done
- 5 solution pages live, all ≥500 unique words
- 8–10 resource articles published
- ≥10 verified backlinks added since Phase 1
- 2 customer-story pages live with explicit customer permission
- Local-pack appearances (any of 4 cities × 5 queries) ≥6

## Phase 3 — Scale (months 4–6 / weeks 13–24)

**Outcome:** authority signals, expanded concept coverage, first proprietary data piece.

- [ ] Add 3 more solution pages: `/solutions/korean-bbq`, `/solutions/thai-restaurant`, `/solutions/dim-sum` (caps at 8 per `SITE-STRUCTURE.md §5`).
- [ ] Publish 12 resource articles (2/month for 6 months — but Phase 3 covers months 4–6 so 6 articles here, balance in Phase 4).
- [ ] **First proprietary report:** "2026 Asian Foodservice Cost Index for California" — derived from anonymized L&C ordering data with explicit client approval and customer-anonymity guarantees. PDF + landing page + supporting blog posts.
- [ ] Founder podcast outreach: book 3 appearances on foodservice-industry podcasts.
- [ ] Performance optimization: Core Web Vitals audit, ensure all pages pass on field data (CrUX) by end of month 5.
- [ ] AI-citation push: re-run citation tests; if L&C still isn't appearing in `boba shop supplier california` AI Overviews despite strong page, audit prompt-fit and refactor `/solutions/boba-shop` for citation-friendly passages.

### Phase 3 definition of done
- 8 solution pages live (cap reached)
- ≥20 resource articles total
- 1 proprietary report shipped with promotion plan executed
- ≥1 podcast appearance live with embed + recap on `/resources`
- Local-pack appearances ≥12 (out of 20 query–geo pairs)
- Top-10 keyword count ≥60

## Phase 4 — Authority (months 7–12)

**Outcome:** L&C is a known voice in California Asian foodservice; SEO program is steady-state.

- [ ] Year-over-year proprietary report update.
- [ ] **Bilingual expansion** — Chinese-language versions of top 5 pages under `/zh/` with hreflang. Test conversion lift; if positive, expand to top 15.
- [ ] 2 more customer stories per quarter.
- [ ] Year-end SEO audit. Quarterly competitor re-checks per `COMPETITOR-ANALYSIS.md §9`.
- [ ] Refresh all location pages with new photography (annual cycle).
- [ ] Year 2 strategy planning.

### Phase 4 definition of done
- KPIs from `SEO-STRATEGY.md §9` 12-month column met or exceeded
- /zh/ live for top 5 pages with hreflang validated
- ≥4 customer stories live total
- Steady-state monthly cadence locked in: 2 articles, 1 customer story per quarter, ongoing GBP posts

## Resource & dependency summary

| Resource | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|---|---|---|---|---|
| Engineering hours | ~40 | ~30 | ~15 | ~10 / quarter |
| Content writing hours | ~30 | ~80 | ~80 | ~60 / quarter |
| Client/SME time (interviews, sign-offs) | ~10 | ~15 | ~25 (report) | ~10 / quarter |
| Photography | ~1 day per DC | — | annual refresh | annual refresh |
| External tools | GSC (free), GBP (free), Ahrefs or Semrush ($), Schema validator (free), Screaming Frog ($) | + Yelp B2B subscription | + PR distribution platform if doing report ($$) | steady |

## Critical-path dependencies

1. **Domain & DNS access** — needed Week 1 to verify GSC and configure 301s.
2. **Real customer-data sign-off** — needed before Phase 2 customer stories AND Phase 3 proprietary report.
3. **GBP ownership transfer** — if existing profiles are owner-disputed, this can take 4–8 weeks. Start Week 1.
4. **Photography of all 4 DCs** — interior + exterior, ideally daytime, by Week 3. Existing `scripts/refs/warehouse/` assets cover one DC; plan shoots for the others.
5. **Confirm placeholder data** — stats on `/products` and customer logos on `/about` are flagged in code as needing client validation. Block Phase 2 launch on resolution.

## Quick-win starter pack (first 5 days)

If only one week of work is available before reassessment, prioritize this:

1. Ship `robots.ts` + `sitemap.ts`.
2. Add Organization JSON-LD to root `layout.tsx`.
3. Verify GSC and submit sitemap.
4. Claim/verify all 4 GBP profiles.
5. Add `JobPosting` schema to `/careers/[slug]` (existing CMS makes this trivial — high-leverage for "warehouse jobs [city]" queries).

These five tasks together will move L&C from "invisible" to "tracked, indexed, eligible for rich results" within seven days.
