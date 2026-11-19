# 01. Project and business context

Prepared 19 November 2026. Scope: codebase discovery, business understanding and the positioning verdict. Evidence is from the repository at commit `e708a28` (also what is live), a crawl of https://peptomoon.com and free search-demand research (doc 06). An earlier audit of 18 November is in `docs/strategy/06-seo-audit-2026-11-18.md`; this folder supersedes it where they differ.

## 1. What Peptomoon is, as the site presents it

A business-to-business infrastructure partner for research-use-only (RUO) peptide businesses. It is not a consumer retailer and not a general web agency. The site organises 15 services into four stages (Build, Run, Grow, Verify), plus an all-in-one proposition, a partner-built portfolio of six stores (three with case studies), eight guides (six published), a 22-term glossary, an About page and a two-step enquiry flow.

| Pillar | Services (slug) |
|---|---|
| Build | `ruo-peptide-website-development`, `telehealth-platform-development`, `vial-label-design` |
| Run | `payment-processing`, `fulfillment-logistics`, `wholesale-dropshipping-3pl`, `business-dashboards`, `customer-support` |
| Grow | `meta-advertising`, `affiliate-management`, `email-marketing`, `seo-geo-aeo` |
| Verify | `supplier-verification`, `compliance-support`, `site-audits` |

## 2. Technical discovery (verified from the repository and the live site)

| Area | Finding | Where |
|---|---|---|
| Framework | Next.js 16.4.6 App Router, React 19.3.1, TypeScript, pnpm. `AGENTS.md` warns this Next.js differs from older versions, so check `node_modules/next/dist/docs/` before using APIs | `package.json` |
| Rendering | Every content page is statically prerendered (`x-nextjs-prerender: 1`; build output shows `○` and `●` routes). Only `/api/inquiry` and `/api/challenge` are dynamic. All text is in the server HTML, no client-only content | build output, `curl` |
| Routing | 38 indexable URLs: `/`, `/services`, 15 `/services/[slug]`, `/case-studies`, 3 `/case-studies/[slug]`, `/resources`, 6 `/resources/[slug]` (2 more hidden), `/all-in-one`, `/why-peptomoon`, `/glossary`, `/about`, `/contact`, 5 legal and policy pages | `src/app`, `src/lib/routes.ts` |
| Content model | TypeScript modules, no CMS: `src/content/services/*.ts`, `articles/*.ts`, `case-studies/*.ts`, `glossary.ts`, `page-faqs.ts`, `all-in-one.ts`. Types in `src/content/types.ts` | `src/content` |
| Page templates | Service: `src/components/services/service-page.tsx` (same 17 H2 skeleton for all services). Article: `src/app/resources/[slug]/page.tsx` with `rich-text.tsx`. Case study: `src/app/case-studies/[slug]/page.tsx`. Hero: `ui/page-hero.tsx` | |
| Metadata | `buildMetadata()` sets absolute title, description, self canonical, Open Graph, Twitter card and an optional noindex. Root layout sets robots with `max-snippet:-1` and `max-image-preview:large` | `src/lib/seo/metadata.ts`, `src/app/layout.tsx` |
| Canonical | Self-referencing absolute URLs on every page, no trailing slash. `/contact?topic=x` keeps the clean canonical | verified |
| Sitemap | Generated from the content registries with image entries. One shared `lastModified` constant for all static, service and case-study URLs | `src/app/sitemap.ts`, `src/lib/routes.ts` |
| Robots | One explicit allow group for 42 named AI, search and social crawlers; `*` allows all; `/api/` disallowed; non-production returns `Disallow: /` | `src/app/robots.ts` |
| Structured data | Organization and WebSite everywhere; Service, Article, BreadcrumbList, CollectionPage, DefinedTermSet, AboutPage, ContactPage per template; FAQPage on pages with visible FAQs | `src/lib/seo/schema.ts` |
| Internal linking | Mega menu and footer (`src/config/nav.ts`, `header-client.tsx`, `site-footer.tsx`), breadcrumbs with schema, "Read next" and related lists on services, `[label](/path)` inline links inside guides (`Inline` in `rich-text.tsx`). **Service copy has no inline-link support** | |
| Images | `next/image` with AVIF and WebP, local files in `public/images` (free-licence photos, credits in `media-credits.json`) and real portfolio screenshots | `next.config.ts` |
| Deployment | Vercel production on the apex domain. Preview deployments send `X-Robots-Tag: noindex` and robots `Disallow: /`. `www` redirects to the apex (308) | `next.config.ts`, headers |
| Analytics | GA4 and Microsoft Clarity load on every page when their env IDs are set (confirmed live on all 38 pages). One conversion event, `generate_lead`, plus three contact-launcher events | `layout/analytics.tsx`, `lib/analytics.ts` |
| Lead capture | Two-step form (services, then contact) posting to `/api/inquiry`, which emails through Resend. Arithmetic challenge plus honeypot, no CAPTCHA | `components/quiz/quiz.tsx` |
| Machine files | `llms.txt` and `llms-full.txt` generated from the same content modules (`src/lib/llms.ts`) | |

## 3. Business and entity facts used in this project

Taken from the site and from statements you have made; unverifiable items are flagged and never repeated as fact in new copy.

- Audience: new and established RUO peptide businesses, mostly serving the United States (fulfilment, ACH and processors are US-centred).
- Portfolio sites are built by an unnamed "partner". Owners have agreed to be featured (your statement, not verifiable from the site).
- No named person, legal entity, address or phone appears on the site (doc 19).
- Peptomoon also supplies RUO products (your statement); the public copy says wholesale supply is for business customers only. Disclose this wherever supplier verification is discussed.

## 4. Positioning assessment

I was asked to challenge the current architecture. The evidence (docs 06 and 07) points to five conclusions.

1. **The audience is clear; the category phrase has no search demand.** Google autocomplete returns nothing for "ruo peptide website development", "peptide e-commerce development", "peptide business infrastructure", "software for peptide business", "peptide shopify alternative" or "ruo peptide fulfillment". The terms people actually type are narrower and more practical: *peptide payment processor / processing / merchant account*, *peptide dropshipping / wholesale / white label / supplier*, *start a peptide business / company*, *peptide store website*, *marketing agency for peptides*.
2. **Fifteen equal services is too broad for a Domain Rating 0.0 site.** Authority is spread across 15 landing pages and four pillars while competitors win with one service each. The architecture is coherent as a buying story (one partner for the whole operator journey) but it is not yet an *organic* identity.
3. **Body copy is not the problem.** The 15 service pages are well differentiated (mean pairwise similarity 0.011, only one verbatim sentence repeated, one pair with meaningful overlap: fulfilment versus wholesale/dropshipping/3PL). My earlier worry that pages repeat each other applies to the heading skeleton only (doc 08).
4. **Telehealth dilutes the identity.** `telehealth-platform-development` has a different audience (licensed clinical businesses), strong competitors (Domain Ratings of 68 to 82 among telehealth vendors) and no measurable demand for its phrase. The all-in-one title "Peptide & Telehealth" and the homepage mention tie the RUO story to a regulated clinical vertical. That is an owner decision (doc 14, POS-02), not something I changed.
5. **The URL structure is right.** Flat `/services/[slug]` URLs with no pillar URLs avoid thin category pages. Do not add pillar or geography pages.

### Service tiers (no URL changes)

| Tier | Meaning | Services | Why (evidence) |
|---|---|---|---|
| 1 | Acquire: invest in content, links and internal prominence now | `payment-processing`, `ruo-peptide-website-development`, `wholesale-dropshipping-3pl`, `seo-geo-aeo` | Real autocomplete demand; either unique neutral angle (payments), weak direct competition (website agencies, peptide marketing agencies are Domain Rating 0.6 to 9) or the largest B2B cluster (dropshipping, wholesale, white label) |
| 2 | Support: rank on long-tail through guides, keep the page accurate | `fulfillment-logistics`, `supplier-verification`, `compliance-support`, `site-audits`, `vial-label-design`, `meta-advertising`, `email-marketing`, `affiliate-management` | Some signal but crowded, consumer-contaminated or generic |
| 3 | Conversion pages only: no organic content investment | `business-dashboards`, `customer-support`, `telehealth-platform-development` | No demand signal for the phrase, or a different audience |

### Answers to the questions in the brief

| Question | Answer |
|---|---|
| Is Peptomoon sufficiently specialised? | In audience, yes. In what searchers type, not yet: lead with the practical phrases above, keep "RUO peptide business" as the brand-level category |
| Too broad for its current authority? | Yes. Tier the services and concentrate links, content and internal anchors on Tier 1 |
| Do all categories support one identity? | Mostly. Telehealth does not, and the all-in-one title amplifies that |
| Are service pages sufficiently differentiated? | Yes in body text; no in headings (identical 17-H2 skeleton, keyword in none of them) |
| Is the homepage targeting the right intent? | Yes: it establishes identity and routes to services. Its title and description are sound; leave them alone |
| Prioritise a few services first? | Yes, the four in Tier 1 |
| Can Peptomoon become a recognised specialist? | Yes, through neutral, sourced guides, honest limits, real proof and an entity with a named owner. Competitors are vendor-biased and low quality (docs 07, 10) |

## 5. What this means for the work

- Do not rename services, move URLs or add 301s. All gains below come from headings, internal links, titles for Tier 1 pages, missing guides, proof and measurement.
- Search Console must be connected before any ranking claim is made (doc 13).
