# 04. SEO strategy

Legend: [V] verified primary source, [O] observed, [R] reported, [A] assumption or recommendation.
No ranking can be guaranteed. The goal is the strongest sustainable foundation.

## 1. Data limits (read first)

- **No search volumes, difficulty or CPC figures are included.** Semrush returned "no API units left" and Ahrefs returned "Insufficient plan" [V]. Nothing below is a measured metric.
- What I did instead: qualitative SERP and competitor checks for each cluster, a Google Trends series for the head term [V], and a read of the two business-model references and the six portfolio sites.
- Fastest ways to get real numbers: top up Semrush API units, or provide an Ahrefs plan, or export Search Console data from the six existing sites (queries and pages that already earn impressions in this niche are the best available proxy).
- Treat the cluster priorities below as hypotheses to confirm with data in the first month after launch.

## 2. SERP observations by cluster [R, qualitative]

| Cluster | What ranks or appears | Opportunity read |
|---|---|---|
| Peptide website design and development | Freelance marketplace gigs, one niche agency profile, generic e-commerce agencies | Few authoritative, evidence-backed agency pages. Strong opening for a page with real portfolio proof |
| Payment processing and merchant accounts | High-risk processor and broker pages, blog posts from sellers | Crowded with vendor marketing. Differentiate with neutral, sourced education about underwriting preparation |
| Fulfilment and 3PL | 3PL vendor pages with peptide and cold-chain landing pages | Vendors dominate. We are not a 3PL, so target the buyer-side "what to ask" angle |
| Supplier verification and COA reading | Vendor-published guides, many on low-quality free-hosted sites | Room for a rigorous, documented framework with real structure |
| Affiliate programs | Brand program pages and affiliate software pages | Buyer-side guidance on program design is thin |
| Compliance and RUO | Law-firm and newsletter analysis around FDA letters, plus vendor content | Sensitive. Win on accuracy and dated primary sources, not volume |
| Email, Meta tracking | Generic ecommerce guides | Low competition for RUO-specific framing, but low search intent too |

## 3. Keyword clusters mapped to pages

One primary intent per URL. Synonyms in a cluster are covered by headings and natural body copy on that page, not by extra pages.

| Cluster (seed terms from the brief) | Intent | Primary page | Supporting |
|---|---|---|---|
| RUO peptide website development, peptide website design, peptide e-commerce development, RUO peptide store development | Transactional and commercial | /services/ruo-peptide-website-development | Case studies, architecture and redesign articles |
| Peptide website redesign | Commercial investigation | Section inside the website development page | Article "Redesigning a peptide store without losing rankings". Split into its own page only if data shows distinct intent |
| Peptide payment processing, high-risk merchant accounts for peptide businesses | Commercial | /services/payment-processing | Underwriting and reserves articles |
| Peptide fulfilment services, US peptide fulfilment | Commercial | /services/fulfillment-logistics | 3PL questions article |
| Peptide supplier verification | Commercial | /services/supplier-verification | Supplier documentation and COA articles |
| Peptide business infrastructure, RUO business operations | Informational and commercial | Homepage and /services hub (brand-level) | Pillar article "The infrastructure behind an RUO peptide business" |
| Peptide affiliate management | Commercial | /services/affiliate-management | Affiliate design article |
| Peptide email marketing | Commercial | /services/email-marketing | SPF, DKIM, DMARC article |
| Peptide store SEO | Commercial and informational | Technical SEO section on the website development page | Article "Technical SEO for peptide e-commerce". Gap noted: no standalone SEO service page is in the brief. Candidate for later |
| RUO compliance, research use only meaning, 503A and 503B | Informational | Articles | /services/compliance-support as the commercial destination |
| Meta tracking, Conversions API for stores | Informational | Article | /services/meta-advertising |
| Peptomoon (brand) | Navigational | Homepage | /about, /case-studies |

## 4. Avoiding keyword cannibalization

1. A typed registry `seo-map.ts` records each page's primary keyword and intent. A test fails if two pages declare the same primary keyword.
2. Articles target problem and question phrasing and link to the service page with a descriptive anchor. They never target the service page's primary term.
3. Case studies target the project and its engineering details, not generic service terms.
4. Hub pages (services, case studies, resources) summarise and link. They do not repeat body copy from child pages.
5. Topic hubs under resources exist only once a topic has four or more articles.

## 5. On-page standard for every indexable page

- Unique title (about 60 characters or fewer) and unique meta description (about 120 to 155 characters).
- One H1, logical H2 and H3 hierarchy, search-intent-focused body, natural semantic coverage, no keyword stuffing.
- Descriptive alt text for informative images, empty alt for decoration.
- Self-referencing canonical, Open Graph and Twitter card tags, a generated Open Graph image per route.
- Breadcrumbs where the page sits below the top level, matching BreadcrumbList data.
- Articles show a real author and a visible published and updated date.
- Descriptive internal links per file 03, section 7.

## 6. Structured data plan

Only markup that matches visible content and current Google guidance.

| Type | Where | Notes |
|---|---|---|
| Organization | Homepage | Name, URL, logo. Contact point only when confirmed. `sameAs` only for profiles that exist |
| WebSite | Homepage | Name and URL. No SearchAction, because there is no site search |
| Service | Each service page | `provider` points to the Organization. `serviceType` and `areaServed` only if confirmed. No price, offers or ratings |
| BreadcrumbList | All pages below the top level | Mirrors the visible breadcrumbs |
| Article | Resource articles | Headline, dates (matching visible dates), author, publisher, image |
| Article | Case studies | `about` the project. No Review or AggregateRating |
| AboutPage, ContactPage, CollectionPage | About, Contact, hubs | Light, optional |
| **FAQPage** | **None** | Google removed the FAQ rich result feature in May 2026 [V]. No benefit, so we skip it |
| Product, Review, AggregateRating | None | Not applicable, and fabricated reviews are prohibited |

Validation: Schema.org validator and Google's Rich Results Test on each template before launch.

## 7. Technical SEO specification (Next.js App Router)

- Metadata API with `generateMetadata`, `metadataBase` from an environment variable, canonical via `alternates`, a title template.
- `app/sitemap.ts` generated from the typed content registries with real `lastModified`. Noindex and not-ready pages are excluded.
- `app/robots.ts`: allow public pages, disallow `/api/` and `/contact/received`, reference the sitemap. Standard crawlers allowed. AI crawler policy is a decision for you, my default is to allow them. A short `llms.txt` is cheap, but its benefit is unproven [A].
- Preview and non-production deployments send `X-Robots-Tag: noindex`.
- Redirects: permanent (308) and declared in config. Single canonical host (www or apex, to be chosen with the domain). Trailing-slash and lowercase normalisation. Check Next 16 documentation for the current name of the request interception file (middleware or proxy) at install time.
- Status codes: unknown slugs return a real 404 through `notFound()` with `dynamicParams = false` where slugs are known. A custom 404 and error boundaries (`not-found`, `error`, `global-error`).
- Query parameters: `utm_*` and `?service=` canonicalise to the clean URL. Filters on hubs are client state. No indexable parameter variants.
- Pagination: show all resources on one page while the count is small. Beyond about 24, use crawlable path-based pages (`/resources/page/2`) with self-referencing canonicals. No infinite scroll that hides links.
- Images: `next/image`, AVIF and WebP, `sizes` set, explicit dimensions, `priority` only for the LCP image.
- Security headers: HSTS from the host, a content security policy introduced in report-only mode first because analytics and Turnstile need allowances.

## 8. Core Web Vitals plan

Targets at the 75th percentile in field data: LCP 2.5 s or better, INP 200 ms or better, CLS 0.1 or better. Lab target: mobile Lighthouse in the 90s as a build gate. These are targets, not promises.

Tactics:
- Server Components by default. Client islands only for the nav drawer, quiz, ecosystem diagram, portfolio scroller, sample dashboard and scroll-driven sections.
- Content stays in the HTML. Decorative effects are layered on after hydration, never gating text.
- Fonts via `next/font`, Latin subset, no more than three font files, `display: swap` with size-adjusted fallbacks to avoid shifts.
- Hero visual is a static AVIF with fixed aspect ratio and `priority`. Animation begins after load.
- Animate only `transform` and `opacity`. Reserve space for everything that appears on scroll.
- GSAP and ScrollTrigger load only on routes that use them. Lenis loads on desktop pointer devices without reduced-motion. Initial JavaScript for the homepage has a working budget of about 170 KB gzipped, checked with the bundle analyzer [A].
- Test on a mid-range Android profile, not only a fast laptop.
- CI checks: Lighthouse CI on key routes, Playwright with axe-core for accessibility, a link checker, and the link-graph script from file 03.

## 9. Measurement and search monitoring

- GA4 through `@next/third-parties/google`, with consent defaults set before any tag fires and a short cookie policy page.
- Events (no personal data): `quiz_start`, `quiz_step_complete`, `quiz_submit_success`, `quiz_submit_error`, `cta_click` with location, `case_study_click`, `live_site_click`. `quiz_submit_success` is the key conversion.
- Search Console: domain property by DNS record with an HTML tag fallback from an environment variable. Submit the sitemap. Monthly review of impressions, clicks, CTR, average position, landing-page performance, and Core Web Vitals report.
- Real Core Web Vitals field data via Search Console and the CrUX report once traffic exists. Vercel Speed Insights is an option if you accept its data collection.
- Case-study metrics are published only from real Search Console exports, with period and property stated.

## 10. Risks specific to this niche [A]

- Health-adjacent topics invite stricter quality scrutiny. Stay on business infrastructure. Publish no compound, dosing or reconstitution content.
- Promoting Peptomoon itself on advertising and social platforms may be restricted because of the category, so organic search, referrals and direct outreach should carry the plan.
- Regulatory pages go stale. Every regulatory statement carries a date and a review owner, and a quarterly review is scheduled.
- No ranking guarantee is given anywhere on the site, and none should be implied.

## 11. Implementation update, 17 November 2026

Decisions made after launch preparation, replacing the open points in section 7.

- **AI crawler policy: allowed.** robots.txt names the search, answer and agent crawlers of OpenAI, Anthropic, Google, Microsoft, Perplexity, Apple, Meta, Amazon, DuckDuckGo, Mistral, Cohere and others, plus the main training crawlers, and welcomes them all. Each named group repeats the rules, because a crawler with its own group ignores the "*" group. Only /api/ is disallowed. The list lives in src/app/robots.ts and should be extended when an operator documents a new crawler.
- **llms.txt and llms-full.txt: shipped.** Both are generated from the same content modules that render the pages (src/lib/llms.ts), so they cannot drift. llms.txt is the index with key facts and notes for AI systems. llms-full.txt carries every service, every published guide with its quick answer and sources, and the verified case-study facts. Their benefit for ranking or citation is unproven, and they cost nothing to maintain. Every page also sends a Link header pointing to /llms.txt.
- **Snippets:** the default robots meta allows full snippets and large image previews, so search and AI answers may quote the pages.
- **Canonical host:** the bare domain, peptomoon.com. The www redirect is configured in Vercel, not in code.
- **Structured data:** Organization (logo, topics), WebSite, Service (with audience), Article (image, word count, section), BreadcrumbList on every inner page, and CollectionPage with an ItemList on the three hubs. Publisher, provider and author carry their details inline. FAQPage stays out, as decided in section 6.
- **Social images:** one designed image per route in public/og, generated by pnpm make:og.
- **Checked on the production build:** 30 sitemap URLs with no on-page issues, structured data and breadcrumbs verified against visible content, all internal links and social images resolving, Lighthouse mobile SEO, accessibility and best practices at 100.

Open after launch: verify the domain in Google Search Console and Bing Webmaster Tools and submit the sitemap, add profile links to siteConfig.social when they exist (they feed sameAs), set NEXT_PUBLIC_CONTACT_EMAIL so the contact point appears in the markup, and watch the Core Web Vitals report once there is field data.
