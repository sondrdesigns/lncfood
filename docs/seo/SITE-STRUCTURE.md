# L&C Food Distribution — Site Structure & URL Hierarchy

_Companion to [`SEO-STRATEGY.md`](./SEO-STRATEGY.md)._

## 1. Proposed URL hierarchy

```
/                                         # Home — Organization + WebSite schema
├── /about                                # Existing — AboutPage schema
├── /products                             # Existing hub — CollectionPage + BreadcrumbList
│   ├── /products/fruits-vegetables       # NEW — category landing
│   ├── /products/meat-seafood            # NEW
│   ├── /products/dry-grocery             # NEW
│   ├── /products/disposables             # NEW
│   └── /products/beverages               # NEW
├── /solutions                            # NEW hub for kitchen concepts
│   ├── /solutions/ramen-shop             # NEW
│   ├── /solutions/sushi-restaurant       # NEW
│   ├── /solutions/pho-restaurant         # NEW
│   ├── /solutions/boba-shop              # NEW
│   ├── /solutions/chinese-american       # NEW
│   ├── /solutions/korean-bbq             # NEW
│   ├── /solutions/thai-restaurant        # NEW
│   └── /solutions/dim-sum                # NEW (Phase 3)
├── /locations                            # NEW hub
│   ├── /locations/san-diego              # NEW — LocalBusiness schema
│   ├── /locations/los-angeles            # NEW
│   ├── /locations/fresno                 # NEW
│   └── /locations/san-jose               # NEW
├── /careers                              # Existing — lists JobPosting
│   └── /careers/[slug]                   # Existing — JobPosting schema (NEW addition)
├── /partner-application                  # Existing — noindex (form intake)
├── /credit-application                   # Existing — noindex (form intake)
├── /resources                            # NEW hub (Phase 2)
│   └── /resources/[slug]                 # NEW — Article schema
├── /faq                                  # NEW (Phase 1) — FAQPage schema
├── /privacy   /terms   /accessibility    # Existing — noindex,follow
└── /admin/*                              # Existing — robots disallow
```

## 2. Indexation rules

| URL pattern | Index | Sitemap | Notes |
|---|---|---|---|
| `/`, `/about`, `/products`, `/solutions`, `/locations`, `/careers`, `/faq`, `/resources` | ✅ | ✅ | Hub pages |
| `/products/[slug]` | ✅ | ✅ | All 5 categories |
| `/solutions/[slug]` | ✅ | ✅ | Quality-gated — see §5 |
| `/locations/[slug]` | ✅ | ✅ | All 4 cities |
| `/careers/[slug]` | ✅ | ✅ | Only `published && archivedAt === null` |
| `/resources/[slug]` | ✅ | ✅ | After publication |
| `/partner-application`, `/credit-application` | ❌ noindex,follow | ❌ | Conversion forms — links should pass equity, but no need to rank |
| `/privacy`, `/terms`, `/accessibility` | ❌ noindex,follow | ❌ | Compliance pages — required but low SEO value |
| `/admin/*` | ❌ disallowed | ❌ | `Disallow: /admin/` in robots.ts |
| `/api/*` | ❌ disallowed | ❌ | `Disallow: /api/` |
| `/_next/*`, `/*.json` | ❌ | ❌ | Next.js handles correctly by default |

## 3. Internal linking strategy

```
                       ┌─────────────────┐
                       │      Home       │
                       └────────┬────────┘
                                │
          ┌────────┬────────────┼────────────┬────────┐
          ▼        ▼            ▼            ▼        ▼
     /products /solutions  /locations    /careers /resources
          │        │            │
   ┌──────┘        │            │
   ▼               │            │
 5 category   8 concept     4 location
   pages         pages         pages
   │  ▲            │  ▲           │  ▲
   │  └────────────┘  │           │  │
   │                  └───────────┘  │
   └──────── reciprocal links ───────┘
```

**Rules:**

1. **Hub → spoke:** every hub page links to all of its spokes (already true for `/products` since the bento grid renders all 5 categories).
2. **Spoke → spoke (cross-pillar):** category pages link to relevant concept pages and vice versa. Example: `/products/beverages` links to `/solutions/boba-shop`, `/solutions/sushi-restaurant`. `/solutions/ramen-shop` links to `/products/meat-seafood`, `/products/dry-grocery`, `/products/fruits-vegetables`.
3. **Spoke → location:** every category and concept page has a "Available at all 4 California DCs" footer linking to `/locations/[slug]`. Reinforces local relevance.
4. **Location → spoke:** each location page lists "What we deliver from this DC" with links into top categories and concepts.
5. **Resources → commercial:** every resource article has a sidebar/footer CTA to the most relevant location or solution page (e.g. boba supplier checklist → `/solutions/boba-shop` + `/locations/san-jose`).
6. **Avoid orphans:** every indexable URL must be reachable in ≤3 clicks from `/`. Verified by sitemap-vs-internal-links diff in CI (Phase 2).

## 4. Breadcrumbs

| URL | Breadcrumb chain |
|---|---|
| `/products/dry-grocery` | Home › Products › Dry Grocery |
| `/solutions/ramen-shop` | Home › Solutions › Ramen Shop |
| `/locations/san-jose` | Home › Locations › San Jose |
| `/careers/warehouse-associate-fresno` | Home › Careers › Warehouse Associate (Fresno) |
| `/resources/cold-chain-compliance-california` | Home › Resources › Cold-Chain Compliance in California |

Emit `BreadcrumbList` JSON-LD on every spoke page. Render visually on category, solution, location, and resource pages (matches user expectation in B2B research).

## 5. Quality gates

### Location pages
| | Threshold |
|---|---|
| **Total location pages** | Hard cap at 4 (one per real DC). **Do not** create programmatic city pages for unstaffed cities (e.g. "Asian food distributor Sacramento" without a Sacramento DC). |
| **Min unique words** | 600 |
| **Required unique elements** | Real street address, real phone, hours, on-site photos (≥3 from `scripts/refs/warehouse/` if applicable to that DC), staff/team mention if available, locally-relevant context (neighborhoods served, freeway access, dock count, fleet size), local testimonials when permission obtained |
| **Forbidden** | Boilerplate that's identical across 4 city pages with only the city name swapped. Each must read as if a human wrote it for that DC specifically. |

### Solution pages (concept landings)
| | Threshold |
|---|---|
| **Total solution pages, Phase 2** | Cap at 5 (ramen, sushi, pho, boba, chinese-american) |
| **Total solution pages, Phase 3** | Cap at 8 (add korean-bbq, thai, dim-sum) |
| **Min unique words** | 500 |
| **Required unique elements** | What this concept orders weekly (typical SKU mix), suggested category mix with cross-links, common operator pain points addressed, related supplier brands, photo of relevant product or kitchen setting, FAQ block (3+ Qs) |

### Category pages
| | Threshold |
|---|---|
| **Min unique words** | 400 |
| **Required unique elements** | Description (already in `data/categories.ts`), full item list, representative supplier brands, "delivered from these DCs" location links, related solution links, on-site photo |

### Resource articles
| | Threshold |
|---|---|
| **Min unique words** | 1,000 |
| **Required** | Author byline + bio (E-E-A-T), publish date, last-updated date, internal links to ≥2 commercial pages, ≥1 image with descriptive alt |

## 6. Sitemap structure

Single `app/sitemap.ts` returning:

```ts
[
  { url: '/',            changeFrequency: 'monthly',  priority: 1.0 },
  { url: '/about',       changeFrequency: 'monthly',  priority: 0.8 },
  { url: '/products',    changeFrequency: 'monthly',  priority: 0.9 },
  // 5 category pages — priority 0.8
  // 4 location pages   — priority 0.9 (high local value)
  { url: '/solutions',   changeFrequency: 'monthly',  priority: 0.7 },
  // 5–8 concept pages   — priority 0.7
  { url: '/careers',     changeFrequency: 'weekly',   priority: 0.7 },
  // N job pages         — changeFrequency: 'weekly', priority: 0.6
  { url: '/resources',   changeFrequency: 'weekly',   priority: 0.6 },
  // N article pages     — changeFrequency: 'monthly', priority: 0.5
  { url: '/faq',         changeFrequency: 'monthly',  priority: 0.5 },
]
```

Generate from existing data sources:
- Categories: `src/app/data/categories.ts`
- Locations: `src/app/data/locations.ts`
- Jobs: live Prisma query (already used by `/careers/page.tsx`)
- Solutions: new `src/app/data/solutions.ts` (Phase 1)
- Resources: file-based MDX or Prisma model (Phase 2)

## 7. robots.ts (proposed)

```ts
export default function robots() {
  return {
    rules: [
      { userAgent: '*',           allow: '/', disallow: ['/admin', '/api', '/partner-application', '/credit-application'] },
      { userAgent: 'GPTBot',         allow: '/' },
      { userAgent: 'ClaudeBot',      allow: '/' },
      { userAgent: 'PerplexityBot',  allow: '/' },
      { userAgent: 'Google-Extended',allow: '/' },
      { userAgent: 'CCBot',          allow: '/' },
    ],
    sitemap: 'https://lncfood.com/sitemap.xml',
  };
}
```

> Form-intake URLs are noindex (via `metadata.robots`) but also disallowed in robots.txt to prevent crawl budget waste. They remain reachable for users who land via direct CTA clicks.

## 8. Canonical strategy

- Self-referential canonical on every indexable URL.
- Trailing-slash policy: **no trailing slash** (Next.js default; ensure `next.config.mjs` doesn't override).
- HTTPS only; HTTP → HTTPS 301.
- `www.lncfood.com` → `lncfood.com` (or vice versa — pick one and 301; verify Vercel domain config).
- Pagination on `/resources` and `/careers` (when needed): use `?page=N` with self-canonical, no `rel=next/prev` (deprecated).

## 9. Migration / launch impact

The plan adds ~15 new URLs in Phase 1 and ~12 more in Phase 2/3. **No existing URL changes** — backward-compatible. Existing `/about`, `/products`, `/careers`, etc. remain at their current paths.

If the team ever wants to deep-link from `/products` directly to a category panel (e.g. `/products#beverages`), keep the hash anchor for UX but ensure the canonical category content lives at `/products/beverages` for indexation.
