# L&C Food Distribution — 12-Month Content Calendar

_Companion to [`SEO-STRATEGY.md`](./SEO-STRATEGY.md). Cadence assumes one part-time content owner + one technical contributor + occasional client SME interviews. Calibrate to actual capacity._

## 1. Cadence by surface

| Surface | Cadence | Owner | First publish |
|---|---|---|---|
| **Location pages** (`/locations/[slug]`) | One-shot, 4 pages, then quarterly refresh | Technical contributor + client SME | Phase 1, week 3 |
| **Category pages** (`/products/[slug]`) | One-shot, 5 pages, then update on supplier change | Technical contributor | Phase 1, week 4 |
| **Solution pages** (`/solutions/[slug]`) | 5 in Phase 2, +3 in Phase 3 | Content owner | Phase 2, week 5 (= overall week 5) |
| **Resource articles** (`/resources/[slug]`) | 2 / month starting Phase 2 | Content owner | Phase 2, week 6 |
| **Job posts** (`/careers/[slug]`) | As-needed via existing CMS | Hiring manager | Already live |
| **FAQ updates** | Quarterly | Content owner | Phase 1, week 4 |
| **Sitemap & schema audits** | Monthly | Technical contributor | Phase 1, week 1 |

## 2. Phase-by-phase publishing plan

### Phase 1 — Foundation (weeks 1–4)
**Theme:** Make the existing site discoverable. No new informational content yet.

| Week | Publish |
|---|---|
| 1 | Robots.ts, sitemap.ts, GSC verification, GBP claim/optimize for all 4 DCs |
| 2 | Per-page metadata for every existing route. Organization schema in root layout. JobPosting schema on `/careers/[slug]`. |
| 3 | `/locations/san-jose`, `/locations/los-angeles` (the two highest-volume DCs). LocalBusiness schema on each. |
| 4 | `/locations/san-diego`, `/locations/fresno`. `/products/[slug]` for all 5 categories. `/faq` v1 (12–15 Qs). BreadcrumbList everywhere. |

### Phase 2 — Expansion (weeks 5–12)
**Theme:** Build the concept pillar and launch the resource library.

| Week | Solutions / Locations | Resources |
|---|---|---|
| 5 | `/solutions` hub + `/solutions/ramen-shop` | — |
| 6 | `/solutions/sushi-restaurant` | "How to switch food distributors without disrupting service" |
| 7 | `/solutions/boba-shop` | "Boba shop supplier checklist (California 2026)" |
| 8 | `/solutions/pho-restaurant` | "What's actually in a foodservice invoice — line by line" |
| 9 | `/solutions/chinese-american` | "Cold-chain compliance basics for California restaurants" |
| 10 | (review + iterate; refresh data on `/about`, `/products`) | "Reading USDA labels for restaurant operators" |
| 11 | First customer-story page (with permission) | "Choosing a food distributor: 12 questions to ask before signing" |
| 12 | Customer-story #2 | "How weekly order forecasts cut waste by 18% — operator playbook" |

### Phase 3 — Scale (weeks 13–24, months 4–6)
**Theme:** Bigger content bets, link building, and AI-citation work.

| Block | Pages | Resources (2/mo) |
|---|---|---|
| Month 4 | `/solutions/korean-bbq`, `/solutions/thai-restaurant` | "Korean BBQ supplier guide for California restaurants" / "Thai pantry essentials at wholesale prices" |
| Month 5 | `/solutions/dim-sum` (cap at 8 solutions per `SITE-STRUCTURE.md`) | "Dim sum supplies — what's in a typical weekly order" / "Why your produce cost is rising and what distributors can actually do" |
| Month 6 | First "Industry Report" — proprietary data piece (e.g. _2026 Asian Foodservice Cost Index for California_, derived from L&C's own data with client approval) | "How a 30-year distributor stays in business" (founder interview + brand story) / "Sustainable disposables: what's worth the upcharge" |

### Phase 4 — Authority (months 7–12)
**Theme:** Thought leadership, PR, advanced schema, possibly bilingual.

| Month | Headline content |
|---|---|
| 7 | Year-over-year update of Industry Report. Press outreach to LA Business Journal, San Jose Mercury, FoodService Director. |
| 8 | Founder podcast tour — 3 booked appearances. Each becomes a `/resources/[slug]` recap with embed + transcript. |
| 9 | Begin Chinese-language version of top 5 pages (home, about, locations/san-jose, locations/los-angeles, products) under `/zh/` with hreflang. Validates with bilingual operator audience. |
| 10 | Customer story #3 + #4. Video content on YouTube; embed on `/resources/`. |
| 11 | Annual SEO audit. Refresh location pages with new photos. Run AI-citation tests and adjust FAQ. |
| 12 | Year 2 strategy doc. KPI review. |

## 3. Resource topic pipeline

Curated by intent stage. **Cap at one per row published per fortnight; aggressive cadence rots fast in B2B.**

### Operator-onboarding intent
- "How to switch food distributors without disrupting service" (week 6)
- "Choosing a food distributor: 12 questions to ask before signing" (week 11)
- "What's actually in a foodservice invoice — line by line" (week 8)
- "Minimum order requirements: a benchmark across California Asian distributors" (month 5)

### Operations intent
- "Cold-chain compliance basics for California restaurants" (week 9)
- "Reading USDA labels for restaurant operators" (week 10)
- "How weekly order forecasts cut waste by 18% — operator playbook" (week 12)
- "Inventory rotation for fresh produce — restaurant edition" (month 4)

### Concept-specific intent (mirrors `/solutions/[slug]` pages)
- "Boba shop supplier checklist (California 2026)" (week 7)
- "Korean BBQ supplier guide for California restaurants" (month 4)
- "Thai pantry essentials at wholesale prices" (month 4)
- "Dim sum supplies — what's in a typical weekly order" (month 5)
- "Sushi restaurant produce — daily vs. 3x weekly delivery tradeoffs" (month 6)

### Industry / thought leadership
- "Why your produce cost is rising and what distributors can actually do" (month 5)
- "How a 30-year distributor stays in business" (founder interview, month 6)
- "Sustainable disposables: what's worth the upcharge" (month 6)
- "2026 Asian Foodservice Cost Index for California" — proprietary report (month 6)

## 4. E-E-A-T building

Every resource article must include:

- **Author byline** with name, title, and bio (≥80 words). Authors should be real L&C team members or named outside experts. **Do not** publish under a generic "L&C Editorial" byline once the content marketing pillar is established.
- **Publish date** (ISO format) + **last-updated date**.
- **Original photography or diagrams** — no stock images on resource articles. Use the warehouse references in `scripts/refs/warehouse/` where appropriate.
- **Quoted operator** (from a real L&C customer, with permission) on at least every other article.
- **Internal links** to ≥2 commercial pages.
- **Article schema** with `author`, `publisher`, `datePublished`, `dateModified`, `image`.

Author candidate roles to develop bios for in Phase 1:
- **Founder / 30-year operator** — primary author for thought-leadership and brand-history content.
- **Head of Operations / Logistics Manager** — primary author for cold-chain, fleet, and DC content.
- **Head of Sourcing / Procurement Lead** — primary author for supplier-brand and category content.

## 5. Repurposing matrix

One core asset → many surfaces.

| Core asset | LinkedIn | YouTube/Short | Email newsletter | Social (IG/FB once active) |
|---|---|---|---|---|
| Resource article | 3-post carousel + executive summary | 60-sec talking head intro | Featured in monthly digest | 1 quote graphic |
| Solutions page | "Built for [concept]" carousel | 30-sec b-roll of relevant warehouse stock | Linked in concept-specific email | 1 graphic per item list |
| Industry Report | Multi-post thread + downloadable PDF | 5-min explainer | Standalone send (whitepaper offer) | 4–6 stat-card graphics |
| Founder podcast appearance | Audiogram + 3 quote posts | Full episode upload + clipped highlights | Newsletter feature | Quote cards |

## 6. Monthly content review template

Run on the last Friday of every month, owned by content lead:

1. **Performance:** which resource articles drove organic clicks? (GSC top 10 by clicks)
2. **Rankings:** which queries are climbing / declining? (rank-tracking export)
3. **Pruning:** any resource >12 months old that's underperforming? — refresh, redirect, or unpublish (don't leave thin content live)
4. **Schema integrity:** validator clean on every published URL? (run `pnpm seo:validate-schema` once Phase 1 ships it)
5. **Pipeline:** is the next 4 weeks of pipeline still confirmed? Any SME interviews to schedule?
6. **AI-citation spot check:** rerun the 8 test queries from `COMPETITOR-ANALYSIS.md §7`. Note any new citations or losses.
