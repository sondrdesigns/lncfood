# L&C Food Distribution — SEO Strategy

_Last updated: 2026-04-29_

## 1. Business at a glance

| | |
|---|---|
| **Brand** | L&C Food Distribution (陈氏食品公司) |
| **Founded** | 1995 (San Diego) |
| **Model** | B2B Asian-foodservice distributor — wholesale to restaurants, no DTC retail |
| **Tagline** | _Global Foods, Local Solutions — More than just supply_ |
| **Footprint** | 4 California DCs: San Diego, Los Angeles (City of Industry), Fresno, San Jose |
| **Catalog** | 5 categories — produce, meat/seafood, dry grocery, disposables, beverages |
| **Stack** | Next.js 14 (App Router), Vercel, Postgres + Prisma, NextAuth |
| **Primary conversion** | `/partner-application` (restaurant partner intake) and `/careers/[slug]` (apply) |

## 2. Strategic positioning

**Search-side identity:** L&C is a *regional, multi-location, Asian-specialty foodservice distributor*. Its competitive position is **between** the national giants (Sysco, Wismettac/JFC) and the small regional importers. It can't outrank Sysco on national queries, but it can dominate **{Asian-cuisine-concept} × {California-city}** intersections that nationals treat as long tail.

**The SEO mandate is therefore three-pronged:**

1. **Local pack capture** — own the Google local-3-pack for each of the 4 cities for "asian food distributor", "restaurant supply", "asian wholesale food" + variants. This requires location landing pages + LocalBusiness schema + GBP profiles + NAP consistency.
2. **Concept-driven landing pages** — capture restaurant-operator search journeys ("ramen shop supplier california", "boba supply company san jose", "sushi wholesale produce", "pho restaurant supplier") with use-case landing pages. The site's `Products.tsx` already has a "Built for your concept" section — those need to become real, indexable URLs.
3. **GEO / AI-citation readiness** — when a restaurant operator asks ChatGPT or Perplexity "who supplies asian groceries to restaurants in California", L&C should appear in the answer. This means LocalBusiness schema with full geo data, FAQ content, original photography, and presence on third-party "best of" lists.

## 3. Current-state SEO audit

### What exists
- ✅ Clean App Router structure with named routes
- ✅ Sitewide title template (`%s | L&C Food Distribution`)
- ✅ OG image, theme color, font preloading
- ✅ Original imagery via `public/images/*.webp` (now anchored on real warehouse references — see 2026-04-29 image refresh)
- ✅ Job CMS exists (`/careers/[slug]`) — content surface ready

### Critical gaps
| Gap | Impact | Effort |
|---|---|---|
| **No `app/sitemap.ts`** — search engines have no crawl manifest | High | Low |
| **No `app/robots.ts`** — no crawl directives, no sitemap pointer | High | Low |
| **No JSON-LD schema anywhere** — no Organization, LocalBusiness, Product, JobPosting | High | Medium |
| **No per-page metadata** — every URL ships the same `<title>` and meta description | High | Medium |
| **No `/locations/[slug]` pages** — 4 DCs are listed in a card grid on `/about` only | High | Medium |
| **Map iframe hard-coded to LA** on About — Bayshore-Hwy/SJ map embed shown for all locations | Medium | Low |
| **No category landing pages** — categories are inline panels on `/products`, not crawlable URLs | Medium | Medium |
| **No blog / resource section** — zero TOFU content, zero internal linking from informational queries | Medium | High |
| **No FAQ page** — high-intent commercial queries like "how do I order from L&C" go unanswered | Medium | Low |
| **Placeholder data on stats and customer logos** (`Royal India`, `Tokyo Express` etc. — flagged in code as needing client validation) | Low (on-site trust) | Client dependency |
| **No `JobPosting` structured data** despite existing job CMS — eligible for Google Jobs rich results | Medium | Low |
| **No `lncfood.com` indexation verification** | Audit-needed | Low |

### What is *not* a gap
- No need for hreflang in v1 — the brand uses 陈氏食品公司 in branding but the operator buyers (chef/owner) overwhelmingly search in English. Punt zh-Hans to Phase 4.
- No need for ProductGroup schema — there is no online ordering. Catalog is informational only.
- No need for Review/AggregateRating schema until real review collection is in place (don't fabricate).

## 4. Target audience & primary intents

| Persona | Search intent | Example query |
|---|---|---|
| **Asian restaurant owner / GM** (sushi, ramen, pho, dim sum, Chinese-American, Korean BBQ, Thai) opening or switching suppliers | Commercial — find a supplier | "asian food distributor san jose", "wholesale ramen supplier california" |
| **Boba shop operator** | Commercial — find boba supplies | "boba powder wholesale california", "tapioca pearl supplier los angeles" |
| **Existing customer** doing logistics | Navigational/informational | "L&C food order", "L&C food fresno phone" |
| **Restaurant chef** sourcing a specific item | Long-tail commercial | "lee kum kee bulk distributor", "frozen yu choy wholesale" |
| **Job seeker** | Transactional | "warehouse jobs san jose", "delivery driver fresno food distribution" |
| **Compliance / accounts payable** | Navigational | "L&C food credit application", "L&C food w-9" |

## 5. Keyword pillars

Five clusters drive the strategy. Each maps to a content pillar in §6.

| # | Pillar | Anchor query | Volume tier | Difficulty |
|---|---|---|---|---|
| 1 | **Geo + Service** | `asian food distributor [city]`, `restaurant supply [city]` | Med | Med (winnable locally) |
| 2 | **Concept + Geo** | `ramen supplier california`, `boba supply company san jose`, `sushi wholesale los angeles` | Med | Low–Med |
| 3 | **Category + Geo** | `wholesale asian produce california`, `bulk soy sauce supplier`, `restaurant disposables wholesale` | Med | Med |
| 4 | **Brand-on-brand** | `lee kum kee distributor california`, `kikkoman bulk wholesale ca` | Low | Low (long-tail wins) |
| 5 | **Operator informational** | `how to find restaurant food supplier`, `minimum order asian food distributor`, `cold chain compliance california` | Low | Low |

## 6. Content pillars

1. **Locations pillar** — 4 city pages (`/locations/san-diego`, etc.) with NAP, hours, service radius, on-site photos, location-specific testimonials, schema. Hub: `/locations`.
2. **Concept pillar** — landing pages for each kitchen archetype: ramen, sushi, pho, boba, Chinese-American, Korean, Thai, dim sum. URL: `/solutions/[concept]`. These become the SEO-visible counterparts to the inline "Use Cases" section already on `/products`.
3. **Category pillar** — 5 indexable category pages under `/products/[slug]` matching `data/categories.ts`. Each gets unique copy, supplier brand list, FAQ, related-concept links.
4. **Resource pillar** — `/resources` blog/guide section. Operator-grade content (no fluff): "How to switch food distributors without disrupting service", "Cold-chain compliance basics for California restaurants", "Boba shop supplier checklist", "Reading a foodservice invoice".
5. **Trust pillar** — `/faq`, `/about`, expanded `/careers`, customer story pages once real customer permission is granted.

## 7. Schema plan

| Page type | Schema |
|---|---|
| Root layout (sitewide) | `Organization` (with `sameAs` to GBP, LinkedIn, Yelp once those exist) |
| Home | `Organization` + `WebSite` (with `SearchAction` if site search is added) |
| `/about` | `AboutPage` + reference to `Organization` |
| `/locations/[slug]` | `LocalBusiness` (FoodEstablishment subclass — no, use `WholesaleStore` or generic `LocalBusiness`) with `geo`, `openingHours`, `areaServed`, `telephone`, `address` |
| `/products` | `CollectionPage` + `BreadcrumbList` |
| `/products/[slug]` | `CollectionPage` + `BreadcrumbList` (NOT `Product` — these are categories, not buyable SKUs) |
| `/solutions/[concept]` | `WebPage` + `BreadcrumbList` |
| `/careers/[slug]` | `JobPosting` (eligibility for Google Jobs rich results — meaningful traffic source) |
| `/resources/[slug]` | `Article` or `BlogPosting` with `author`, `datePublished`, `image` |
| `/faq` | `FAQPage` |

See `IMPLEMENTATION-ROADMAP.md` for sequencing.

## 8. Generative Engine Optimization (GEO)

**Goal:** when buyers ask AI ("who supplies asian groceries to restaurants in northern California?"), L&C is named. Three levers:

1. **Crawler accessibility** — explicitly allow `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot` in `robots.ts`. Most B2B sites still block them by accident.
2. **Quotable structure** — add `/faq` and "what we do / who we serve / where we operate" passages written for citation: short paragraphs, declarative, named locations, named cuisine concepts. Avoid marketing fluff that AI engines strip.
3. **Off-site authority** — get listed on third-party curated lists ("best Asian food distributors California", restaurant trade associations, Yelp B2B, Google Business Profile). AI engines disproportionately cite curated lists.

## 9. KPI targets

Baselines assume launch from a near-zero state (no sitemap submitted, ~5 indexed pages, no GBP optimization).

| Metric | Baseline (now) | 3 mo | 6 mo | 12 mo |
|---|---|---|---|---|
| **Indexed pages** (Search Console) | ~10 | 35 | 60 | 90 |
| **Organic clicks / mo** | <50 | 250 | 800 | 2,500 |
| **Branded vs non-branded ratio** | 90/10 | 70/30 | 55/45 | 45/55 |
| **Local-3-pack appearances** (across 4 cities × 5 core queries = 20 query–geo pairs) | 0 | 6 | 12 | 18 |
| **Keywords ranking top-10** | <5 | 20 | 60 | 150 |
| **Domain Rating** (Ahrefs proxy) | TBD | +3 | +8 | +15 |
| **Core Web Vitals — pages passing** | TBD (audit) | 90% | 100% | 100% |
| **GBP photo views / mo** (4 locations combined) | TBD | 2k | 6k | 15k |
| **Direction requests / mo** (4 locations) | TBD | 50 | 200 | 500 |
| **Phone calls from organic / mo** | TBD | 20 | 80 | 200 |
| **Partner-application form submits from organic / mo** | TBD | 5 | 20 | 60 |
| **JobPosting impressions in Google Jobs / mo** | 0 | 1k | 5k | 15k |

> **Calibration note:** baselines marked TBD must be measured before Phase 1 ends — see `IMPLEMENTATION-ROADMAP.md` Phase 1 Week 1.

## 10. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Placeholder customer logos & stats currently on `/about` and `/products` look fabricated and hurt E-E-A-T | Ship "real-data" pass before any major link-building push (block on Phase 2 launch) |
| Building 30+ programmatic location-concept pages tempts thin content | Quality gate: hard cap at 4 location pages × 8 concept pages = max 32. Each must hit 600+ unique words. See `SITE-STRUCTURE.md` quality gates |
| `JobPosting` schema with stale jobs that aren't taken down promptly creates manual-action risk | Tie schema emit to `published && !archivedAt` (already in DB query); add weekly cron to archive >60-day jobs |
| Map iframe currently shows LA regardless of context — confuses GBP/citation consistency | Replace with per-location embed in Phase 1 |
| Domain authority is low — ranking against Sysco/JFC on national terms is unrealistic | Lean into geo + concept long-tail; do not chase head terms |

## 11. Companion documents

| Doc | Purpose |
|---|---|
| [`SITE-STRUCTURE.md`](./SITE-STRUCTURE.md) | URL hierarchy, internal linking, crawl/indexation rules, quality gates |
| [`COMPETITOR-ANALYSIS.md`](./COMPETITOR-ANALYSIS.md) | Who L&C is up against and where the gaps are |
| [`CONTENT-CALENDAR.md`](./CONTENT-CALENDAR.md) | 12-month content roadmap with cadence and authorship |
| [`IMPLEMENTATION-ROADMAP.md`](./IMPLEMENTATION-ROADMAP.md) | Week-by-week and phase-by-phase execution plan |
