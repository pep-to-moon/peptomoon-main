# Peptomoon.com SEO + GEO + AEO Audit

Audit date: 17 Nov 2026. Scope: `peptomoon.com`, all 30 sitemap URLs, plus the site source in this repo. Evidence tags: **VERIFIED** (I saw it in a tool result or live fetch), **LIKELY** (strong inference), **NEEDS VERIFICATION** (could not check; the exact check is given).

## Contents
1. Executive summary
2. Scorecard
3. Data sources: what worked and what failed
4. Findings
5. Keyword universe and page map
6. Site architecture blueprint
7. Page-level rewrites for the 30 existing URLs
8. Content plan: 40 new pages and 90-day calendar
9. GEO plan
10. Fix SOP
11. Antigravity batches
12. Off-page and digital PR plan
13. Measurement
14. Roadmap: 14-day sprint, 90 days, 180 days
15. Data still missing
16. Verification log

---

## 1. Executive summary

1. **Biggest blocker: Google barely knows the site exists.** The Search Console property `sc-domain:peptomoon.com` is verified, but Search Analytics returns zero rows for 1 Jan to 17 Nov 2026, and the API returns no submitted sitemaps. Of 10 URLs inspected (every template type), only the homepage is indexed. The other 9 return "URL is unknown to Google". VERIFIED.
2. **No Bing and no GA4.** `peptomoon.com` is not among the 16 sites in Bing Webmaster Tools and not among the GA4 properties on the account. Copilot, ChatGPT Search and others lean on Bing's index. VERIFIED.
3. **Zero authority.** Ahrefs Domain Rating is 0.0. No ranking, no citation and no brand mention was found in 6 searches. VERIFIED (limits in section 9).
4. **The homepage tells crawlers and LLMs the wrong things.** The proof counter renders `0+` in server HTML (the live site animates to 50+), and the hero statement renders as run-together words. Both causes are in the repo and are small fixes. VERIFIED.
5. **The entity message conflicts.** The agency says it serves businesses, yet 6 places in the source (and the live `llms.txt`) say Peptomoon "also provides research-use-only products". That needs a decision from you before any other entity work. VERIFIED.
6. **Strengths worth keeping.** Server-rendered HTML, clean canonicals, one H1 per page, correct 308 redirects, Service/Article/BreadcrumbList schema, no bot blocking, and compliance-safe copy. VERIFIED.
7. **Biggest opportunity.** The money queries (payment shutdown recovery, RUO store build, supplier verification) are served mostly by thin vendor pages and freelancer listings. A few evidence-heavy pages plus a handful of real third-party mentions can win citations. LIKELY.
8. **Realistic targets** (my judgment, not a forecast; a brand-new domain with DR 0). 30 days: all 30 URLs indexed in Google and Bing, analytics live. 90 days: first non-brand impressions on long-tail queries, brand query ranks #1. 180 days: low hundreds of organic clicks per month and 1 to 3 organic leads per month if the pillar content and links ship. No rankings guaranteed.
9. **Top 5 actions.** (a) Submit the sitemap in GSC, request indexing for the 29 unknown URLs, add the site to Bing, turn on IndexNow. (b) Fix the `0+` counter and run-together text. (c) Decide products vs services-only and make every surface agree. (d) Prove or remove "50+ RUO stores". (e) Create a GA4 property and conversion events.
10. **Do not build** a separate consumer-buyer content track on this domain until the products question is answered (see F-ENT-01).

---

## 2. Scorecard (0 to 10)

| Area | Score | Reason |
|---|---|---|
| Technical | 7 | Clean status codes, canonicals, redirects, headers. Sitemap `lastmod` is inaccurate. |
| Rendering | 5 | Server HTML is complete, but the counter and hero text extract badly. |
| Indexation | 1 | 1 of 10 inspected URLs indexed, no sitemap submitted, no Bing property. |
| On-page | 7 | Unique titles and one H1 everywhere. 19 of 30 pages have a meta description over 155 characters. |
| Content depth | 5 | 12 services at 1,100 to 2,100 words and 5 guides at 3,300 to 3,700 words. Thin on comparisons, tools and definitions. |
| Topical authority | 1 | 5 guides against a universe of 150+ queries. DR 0. |
| E-E-A-T | 3 | No named people, empty `sameAs`, unproven "50+" claim, org-only bylines. |
| Schema | 6 | Good types per template. Missing `sameAs`, duplicate-looking Organization blocks on home. |
| GEO | 1 | No citations, no third-party mentions, no data assets. |
| AEO | 4 | FAQs exist, but no 40-60-word quick answer block and no glossary. |
| Off-page | 0 | DR 0.0. |
| Conversion | 3 (unmeasured) | Form exists, but no analytics property to prove anything. |
| Compliance | 7 | Copy is clean. The positioning conflict is the risk. |

---

## 3. Data sources

| Source | Result |
|---|---|
| Google Search Console | Worked. Property verified (owner). Performance empty. Sitemaps empty. URL Inspection run on 10 URLs. Coverage report and Gen-AI report are not exposed by this connector: NEEDS VERIFICATION in the GSC UI. |
| Bing Webmaster | Worked. `peptomoon.com` not in the account's site list. |
| GA4 | Worked. No Peptomoon property exists. AI-referral data cannot be pulled. |
| Microsoft Clarity | Not queried. No Clarity tag found in the home HTML (cookie-consent gating could hide it). |
| Ahrefs | Free Domain Rating worked (0.0). Keyword and competitor endpoints not queried: plan access and time. |
| Semrush | **Failed.** "No API units left" on every report. |
| PageSpeed Insights / CrUX | **Failed.** Unauthenticated API quota exceeded (HTTP 429). Core Web Vitals not measured. |
| Live crawl | Worked. All 30 URLs fetched as Googlebot. Bot user-agent tests run. |
| Web search | 6 searches run. This is not the same as querying ChatGPT, Perplexity, Copilot or AI Overviews. |
| TrendsMCP, PubMed | Not used. Nothing in this audit relies on a scientific claim. |

---

## 4. Findings

Severity: P0 blocks everything, P1 high impact, P2 medium, P3 polish.

| ID | Area | Finding | Evidence | Affected URLs | Sev |
|---|---|---|---|---|---|
| F-IDX-01 | Indexation | Only the homepage is known to Google. 9 of 9 sampled deep URLs are "URL is unknown to Google". | **VERIFIED.** GSC URL Inspection: `/` is "Submitted and indexed", last crawl 2026-11-17 03:39Z. `/services`, `/resources`, `/case-studies`, `/about`, `/contact`, a service, a case study and two guides are unknown. The other 20 URLs were not inspected: NEEDS VERIFICATION. | 29 | P0 |
| F-IDX-02 | Indexation | No sitemap is submitted to GSC. | **VERIFIED.** `get_sitemaps` returned an empty list. The live `sitemap.xml` is valid and lists 30 URLs. | all | P0 |
| F-IDX-03 | Indexation | Not in Bing Webmaster Tools. | **VERIFIED.** `list_sites` shows 16 sites, none is peptomoon.com. | all | P0 |
| F-ANL-01 | Measurement | No GA4 property exists for Peptomoon. | **VERIFIED.** `list_properties` shows 6 accounts, none for this site. | all | P0 |
| F-REN-01 | Rendering | Counter renders `0` in server HTML. | **VERIFIED.** Raw HTML: `<span ...tabular-nums...>0</span>+</span>RUO stores we built and still maintain`. Cause: `NumberTicker` returns `{startValue}` (0) on the server, [number-ticker.tsx:71](../../src/components/ui/number-ticker.tsx). | `/` | P0 |
| F-REN-02 | Rendering | Hero statement words sit in separate `<span>`s with no whitespace between them. Extractors read "Genericstoresarebuilt...". Inline `opacity:0.5` is also set at render. | **VERIFIED.** Raw HTML plus [scroll-statement.tsx:22-30](../../src/components/sections/home/scroll-statement.tsx): words are laid out with flex `gap` and no text-node spaces. | `/` (and any page using `ScrollStatement`) | P1 |
| F-CLM-01 | Trust | "50+ RUO stores" is unproven. Only 6 portfolio sites are shown and 3 case studies exist. | **VERIFIED** for the mismatch. The truth of 50+ is NEEDS VERIFICATION (your records). The claim is in [case-studies/page.tsx:19,32](../../src/app/case-studies/page.tsx), [portfolio-pin.tsx:82](../../src/components/sections/home/portfolio-pin.tsx) and [llms.ts:63](../../src/lib/llms.ts). | `/`, `/case-studies`, `/llms.txt` | P1 |
| F-ENT-01 | Entity | Site copy says Peptomoon "also provides research-use-only products". It also presents as a services agency with no catalogue. | **VERIFIED.** [nav.ts:36](../../src/config/nav.ts), [faq.tsx:11](../../src/components/sections/home/faq.tsx), [page-faqs.ts:26,95](../../src/content/page-faqs.ts), [legal.ts:231](../../src/content/legal.ts), [llms.ts:63](../../src/lib/llms.ts). | `/`, legal pages, `/llms.txt`, FAQs | P1 |
| F-EEAT-01 | E-E-A-T | No named people anywhere. Article author is the Organization. `Organization.sameAs` is empty. `legalName` equals the brand name. | **VERIFIED.** Article JSON-LD `author` is `Organization`. [schema.ts:44](../../src/lib/seo/schema.ts) emits `sameAs` only when `siteConfig.social` is non-empty. Whether a real legal entity differs from "Peptomoon" is NEEDS VERIFICATION. | all | P1 |
| F-AUTH-01 | Off-page | Domain Rating 0.0. | **VERIFIED.** Ahrefs `public-domain-rating-free`. For scale, 99puritypeptides.com is 15.0 and veracuelabs.com is 2.4. | all | P1 |
| F-GEO-01 | GEO | No citation or mention found. "Peptomoon" and `site:peptomoon.com` searches surface no Peptomoon page. | **VERIFIED** for these web searches only. | all | P1 |
| F-CASE-01 | Content | Helix Bio Chem, Certified Aminos and Amino Based are on the homepage portfolio but have no case-study page. | **VERIFIED** (sitemap lists 3 case studies, portfolio shows 6). | 3 missing | P2 |
| F-META-01 | On-page | 19 of 30 meta descriptions exceed 155 characters (up to 167). 2 titles exceed 60 (61, 62). `/contact` description is 107 characters, short. | **VERIFIED.** Script output on the crawled HTML. List in section 7. | 19 | P2 |
| F-IMG-01 | Images | 24 of 33 images on `/`, 24 of 27 on `/services` and 24 of 27 on `/about` have `alt=""`. | **VERIFIED.** [shot-strip.tsx:15](../../src/components/portfolio/shot-strip.tsx) and [hero.tsx:82](../../src/components/sections/home/hero.tsx). Empty alt is correct for decoration, wrong for screenshots that are proof assets. | 3 | P2 |
| F-MAP-01 | Sitemap | Every `lastmod` is 2026-11-17, the build date, on all 30 URLs. Google discounts `lastmod` that does not track real edits. | **VERIFIED.** | all | P2 |
| F-AEO-01 | AEO | No 40-60-word quick answer at the top of service and guide pages. No glossary. | **LIKELY.** Page-level extraction was not done for every page. | 12 + 5 | P2 |
| F-LNK-01 | Links | The homepage has 99 occurrences of `/services/...` links (nav, mobile menu, grid, footer). Click depth is 1 for every page, so no orphans. | **VERIFIED** (count). Not harmful; keep an eye on dilution. | `/` | P3 |
| F-PERF-01 | Core Web Vitals | Not measured. Homepage HTML is 460 KB and uses GSAP, Motion and Lenis. | HTML size **VERIFIED**. CWV **NEEDS VERIFICATION**: run `https://pagespeed.web.dev/analysis?url=https://peptomoon.com/` and read CrUX (a new site may have no field data). | `/` | P2 |
| F-OK-01 | Technical (passes) | www and http redirect with 308 to the bare domain. Trailing-slash URLs 308 to the canonical. Case variants 404. All 30 URLs return 200 as Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot and PerplexityBot. Self-referencing canonicals. `index, follow`. HSTS, nosniff, DENY framing. OG image 200. | **VERIFIED.** | all | pass |
| F-OK-02 | Compliance (passes) | Scan of all 30 pages for human-use framing, dosing, medical claims and "FDA compliant". Hits were negations ("not for human use", "we do not write dosing content", "no guarantee"). The payments guide tells readers not to bypass underwriting or misrepresent the business. | **VERIFIED.** | all | pass |
| F-OK-03 | AI crawl access (passes) | `robots.txt` allows search and AI agents, blocks only `/api/`, declares the sitemap. `/llms.txt` exists and is linked in a `Link` header. Per the brief, Google does not use `llms.txt`, so treat it as optional. | **VERIFIED.** | all | pass |

Not found (so not raised): duplicate content across service pages beyond normal templating (NEEDS VERIFICATION with a similarity tool), preview-domain indexation (NEEDS VERIFICATION: `site:*.vercel.app peptomoon`).

---

## 5. Keyword universe and page map

Volumes and difficulty were **not** pulled (Semrush has no units; Ahrefs keyword endpoints were not queried). Clusters below are intent-based; validate volume and KD before building anything marked "new". No two URLs share a primary keyword.

| Cluster | Intent | Target URL | Primary keyword | Priority |
|---|---|---|---|---|
| Brand | Navigational | `/` | peptomoon | Quick win (indexation only) |
| Hire: build | Transactional | `/services/ruo-peptide-website-development` | RUO peptide website development | Money page |
| Hire: payments | Transactional | `/services/payment-processing` | RUO peptide payment processing | Money page |
| Hire: SEO | Transactional | `/services/seo-geo-aeo` | peptide SEO agency | Money page |
| Hire: audit | Transactional | `/services/site-audits` | peptide store audit | Money page |
| Hire: fulfillment | Commercial | `/services/fulfillment-logistics` | peptide fulfillment USA | Pillar support |
| Hire: affiliates | Commercial | `/services/affiliate-management` | peptide affiliate program software | Pillar support |
| Hire: email | Commercial | `/services/email-marketing` | peptide email marketing | Support |
| Hire: ads tracking | Commercial | `/services/meta-advertising` | Meta ads tracking for RUO stores | Support (compliance-sensitive) |
| Hire: dashboards | Commercial | `/services/business-dashboards` | peptide store reporting dashboard | Support |
| Hire: support | Commercial | `/services/customer-support` | helpdesk for RUO stores | Support |
| Verify: suppliers | Commercial | `/services/supplier-verification` | peptide supplier verification | Money page |
| Verify: compliance | Commercial | `/services/compliance-support` | RUO website compliance review | Money page |
| Problem-aware | Urgent | `/resources/payment-processor-shut-down-account` | payment processor shut down peptide store | Quick win |
| How-to | Informational | `/resources/infrastructure-behind-an-ruo-peptide-business` | how to start an RUO peptide business | Pillar |
| Payments guide | Informational | `/resources/payment-processing-for-ruo-stores` | RUO payment processing underwriting | Pillar |
| Supplier docs | Informational | `/resources/review-a-peptide-suppliers-documentation` | how to verify a peptide supplier COA | Pillar |
| Architecture | Informational | `/resources/peptide-store-architecture` | peptide store architecture | Support |
| Proof | Commercial | `/case-studies` and 3 case studies | RUO peptide website case studies | Support |
| Definitions | AEO | new `/glossary` | what is RUO, what is a COA, what is HPLC purity | New hub |
| Comparisons | Commercial | new `/resources/shopify-vs-custom-for-peptide-stores` and similar | Shopify vs custom for peptide stores | New |
| Pricing | Commercial | new `/pricing` or `/engagement-models` | peptide website cost | New money page |
| Tools | Tools | new `/tools/...` | peptide business startup cost calculator, COA checklist | New |
| Secondary audience (buyers) | Decide first | none on this domain | n/a | Do not build until F-ENT-01 is settled |

---

## 6. Site architecture blueprint

```
/                         home (brand + 4 groups)
/services                 hub (Build / Run / Grow / Verify)
  /services/{12 existing}
/resources                hub
  /resources/{5 existing}
  /resources/comparisons/...      new (hub: comparisons)
  /resources/guides/...           new (hub: how-to)
/glossary                 new, one page, anchored terms
/tools                    new hub: calculators and checklists
/case-studies             hub
  /case-studies/{3 existing + 3 new}
/pricing                  new
/about, /contact, legal   existing
/editorial-policy         new (how we research, corrections)
```

Rules: every service page links to 2 relevant guides and 1 case study; every guide links to its service page, the glossary terms it uses, and `/contact`; breadcrumbs are visible and match `BreadcrumbList`; one primary keyword per URL; no doorway or location pages (no real local presence); footer lists only services, resources, case studies and legal. New slugs follow the existing no-trailing-slash pattern.

---

## 7. Page-level rewrites for all 30 URLs

Titles are 60 characters or fewer with the keyword first and the brand last. Meta descriptions are 155 or fewer. A script validates lengths in section 16. FAQ topics are listed per template below the table; each FAQ answer should be 40 to 80 words and stand alone. Keep the existing RUO disclaimers and "not legal advice" lines on every page.

| # | URL | New title | New meta description | H1 | Schema | CTA |
|---|---|---|---|---|---|---|
| 1 | `/` | RUO Peptide Business Infrastructure \| Peptomoon | One partner for RUO peptide businesses: websites, payments, supplier documentation, fulfillment, marketing, reporting and compliance review. | Infrastructure for RUO peptide businesses | Organization, WebSite | Tell us what you need |
| 2 | `/services` | RUO Peptide Business Services \| Peptomoon | Twelve services in four groups, build, run, grow and verify, for research-use-only peptide businesses. See what each one covers. | Services for RUO peptide businesses | CollectionPage, ItemList | Start a project |
| 3 | `/case-studies` | RUO Peptide Website Case Studies \| Peptomoon | Real RUO peptide stores we built and maintain, with screenshots and facts confirmed on a stated date. No invented results. | RUO peptide website case studies | CollectionPage, ItemList | See our work |
| 4 | `/resources` | RUO Peptide Business Guides and Resources \| Peptomoon | Dated, source-cited guides on RUO store architecture, payment underwriting, shutdown recovery and supplier documentation. | Guides for running an RUO peptide business | CollectionPage, ItemList | Read the guides |
| 5 | `/about` | About Peptomoon \| RUO Peptide Infrastructure Partner | Who Peptomoon is, how we work and what we will not do. A business-to-business team for research-use-only peptide companies. | About Peptomoon | AboutPage, Organization (+ real `sameAs`) | Contact us |
| 6 | `/contact` | Contact Peptomoon \| Start a Project | Tell us about your RUO peptide business and what you need built, fixed or reviewed. We reply directly to every enquiry within two business days. | Contact Peptomoon | ContactPage | Send enquiry |
| 7 | `/privacy-policy` | Privacy Policy \| Peptomoon | How Peptomoon collects, uses and protects personal information from this website and its enquiry form. | Privacy policy | WebPage | none |
| 8 | `/terms-of-service` | Terms of Service \| Peptomoon | The terms that apply to using the Peptomoon website and its services. | Terms of service | WebPage | none |
| 9 | `/disclaimer` | Disclaimer \| Peptomoon | Peptomoon is not a law firm and gives no legal, regulatory or medical advice. Read what our reviews and audits do and do not mean. | Disclaimer | WebPage | none |
| 10 | `/cookie-policy` | Cookie Policy \| Peptomoon | Which cookies this site uses, what they do and how to change your choice. | Cookie policy | WebPage | none |
| 11 | `/services/ruo-peptide-website-development` | RUO Peptide Website Development \| Peptomoon | Custom Next.js e-commerce for RUO peptide businesses, built for catalogue depth, batch documentation and long-term maintenance. | RUO peptide website development | Service, BreadcrumbList | Plan my build |
| 12 | `/services/payment-processing` | RUO Peptide Payment Processing Support \| Peptomoon | Underwriting preparation, provider fit, integration and monitoring for RUO stores. We cannot promise approvals. | RUO peptide payment processing | Service | Review my setup |
| 13 | `/services/fulfillment-logistics` | Peptide Fulfillment and Logistics (USA) \| Peptomoon | US fulfillment coordination for RUO stores: inventory, carriers, tracking and exception workflows. | Peptide fulfillment and logistics | Service | Plan fulfillment |
| 14 | `/services/business-dashboards` | Peptide Store Reporting Dashboards \| Peptomoon | One reporting layer across orders, payments, inventory, affiliates and support for RUO peptide stores. | Business dashboards for RUO stores | Service | See a demo |
| 15 | `/services/customer-support` | Helpdesk Setup for RUO Peptide Stores \| Peptomoon | Order-aware helpdesk workflows and a knowledge base that stays inside research-use positioning. | Customer support infrastructure | Service | Set up support |
| 16 | `/services/meta-advertising` | Meta Ads Tracking for RUO Stores \| Peptomoon | Business account structure, pixel and Conversions API tracking and reporting. We do not write claims or run restricted ads. | Meta advertising infrastructure | Service | Check my tracking |
| 17 | `/services/affiliate-management` | Peptide Affiliate Program Setup \| Peptomoon | Referral tracking, commission rules, affiliate dashboards and payout records connected to your orders. | Affiliate program infrastructure | Service | Set up affiliates |
| 18 | `/services/email-marketing` | Peptide Email Marketing Setup \| Peptomoon | Deliverability, flows and list hygiene for RUO stores, with content kept inside research-use positioning. | Email infrastructure for RUO stores | Service | Fix my email |
| 19 | `/services/seo-geo-aeo` | Peptide SEO Agency: SEO, GEO and AEO \| Peptomoon | Technical SEO, AI-search visibility and answer-engine content for RUO peptide stores. No ranking guarantees. | SEO, GEO and AEO for RUO stores | Service | Request an audit |
| 20 | `/services/supplier-verification` | Peptide Supplier Verification \| Peptomoon | A documentation review of your supplier's COAs, batch records and lab reports. A review is not an approval. | Peptide supplier verification | Service | Review my supplier |
| 21 | `/services/compliance-support` | RUO Website Compliance Review \| Peptomoon | A review of your site copy, labels and policies for avoidable risk. We are not a law firm and give no approvals. | RUO website compliance review | Service | Book a review |
| 22 | `/services/site-audits` | Peptide Store Audit \| Peptomoon | A written audit of your RUO store's technical SEO, content, tracking and documentation, with a prioritised fix list. | Website audit for RUO peptide stores | Service | Request an audit |
| 23 | `/case-studies/veracue-labs` | Veracue Labs Website Case Study \| Peptomoon | How Peptomoon built and maintains the Veracue Labs RUO store, with screenshots and facts confirmed on a stated date. | Veracue Labs case study | Article (CreativeWork) | Start a project |
| 24 | `/case-studies/99-purity-peptides` | 99 Purity Peptides Website Case Study \| Peptomoon | How Peptomoon built and maintains the 99 Purity Peptides RUO store, with confirmed facts and screenshots. | 99 Purity Peptides case study | Article | Start a project |
| 25 | `/case-studies/primetime-bio-labs` | PrimeTime BioLabs Website Case Study \| Peptomoon | How Peptomoon built and maintains the PrimeTime BioLabs RUO store, with confirmed facts and screenshots. | PrimeTime BioLabs case study | Article | Start a project |
| 26 | `/resources/peptide-store-architecture` | Peptide Store Architecture and Catalogue Structure | How to structure an RUO peptide store: catalogue, batch documentation, policies and navigation. Dated and source-cited. | Peptide store architecture | Article | Plan my build |
| 27 | `/resources/payment-processor-shut-down-account` | Payment Processor Shut You Down? What To Do | A step-by-step plan for the first 72 hours after a processor closes an RUO store account. No guarantees. | What to do when a processor shuts down your RUO store | Article | Get a review |
| 28 | `/resources/payment-processing-for-ruo-stores` | RUO Payment Processing: Underwriting Guide | How underwriting reads an RUO store, what to prepare and what never to do. Dated and source-cited. | RUO payment processing and underwriting | Article | Review my setup |
| 29 | `/resources/review-a-peptide-suppliers-documentation` | How to Verify a Peptide Supplier's COA: Checklist | A checklist for reading a supplier's COA, HPLC and mass-spec records and batch documentation. | How to review a peptide supplier's documentation | Article | Review my supplier |
| 30 | `/resources/infrastructure-behind-an-ruo-peptide-business` | How to Start an RUO Peptide Business: Infrastructure | The systems an RUO peptide business needs before its first order: site, payments, documents, fulfillment, support. | The infrastructure behind an RUO peptide business | Article | Start a project |

FAQ topics per template (write 5 to 8 each, from real PAA and AlsoAsked data once pulled):
- **Services:** what is included, what we do not do, how long it takes, what you need to give us, whether a review is an approval, how we price (links to `/pricing`).
- **Resources:** the one-sentence answer, the common mistake, when to ask counsel, what to prepare, how to check a source.
- **Case studies:** what was built, which facts are verified and when, what is not claimed.

### Quick answers (40 to 60 words, one per page, placed under the H1)

- **Home:** Peptomoon is a business-to-business agency for research-use-only (RUO) peptide businesses. It plans, builds and maintains the connected systems behind a store: the website, payments, supplier documentation, fulfillment, marketing, reporting and compliance review. Peptomoon is not a law firm and does not guarantee approvals, rankings or sales.
- **Website development:** RUO peptide website development means building a store around catalogue depth, batch documentation, research-use labelling and long-term maintenance. Peptomoon builds these on Next.js with a headless CMS so product pages, certificates and policies stay accurate. It does not write dosing or usage content.
- **Payment processing:** RUO payment processing support helps a store prepare accurate underwriting material, choose a provider that serves the category, integrate it and monitor it. Providers make their own decisions, so Peptomoon cannot promise approval, rates or uninterrupted processing. It never advises misrepresenting the business or bypassing a provider's rules.
- **Fulfillment:** Peptide fulfillment coordination covers inventory, carrier choice, shipping integrations, tracking and exception handling for RUO stores in the United States. Carrier and partner rules differ, so Peptomoon confirms requirements with each party rather than assuming them. It sets up the workflow; it does not guarantee carrier acceptance.
- **Dashboards:** A business dashboard for an RUO store joins orders, payments, inventory, affiliates, fulfillment and support into one reporting layer. It lets the owner see margin, refunds and delays in one place. Peptomoon builds it from your own systems and does not invent benchmarks.
- **Customer support:** Support infrastructure for an RUO store means a helpdesk connected to orders, saved replies that stay inside research-use positioning, and a knowledge base that answers shipping and documentation questions. Peptomoon sets this up so staff never improvise answers about product use.
- **Meta advertising:** Meta advertising infrastructure covers business account structure, pixel and Conversions API tracking, event design and reporting for RUO stores. Peptomoon sets up the measurement. It does not write ad claims, run ads for restricted products or help avoid Meta's advertising standards, which the advertiser must read and follow.
- **Affiliates:** Affiliate infrastructure for an RUO store means referral tracking, commission rules, affiliate dashboards and payout records connected to real orders. Because affiliate content is public speech about your products, Peptomoon also helps you write guidelines and review what partners publish.
- **Email marketing:** Email infrastructure for an RUO store means authenticated sending domains, clean lists, order-triggered flows and templates that stay inside research-use positioning. Peptomoon sets up deliverability and reporting first, because a store that cannot reach the inbox cannot confirm orders or answer customers.
- **SEO, GEO and AEO:** SEO, GEO and AEO work makes an RUO store easier for search engines and AI answer systems to crawl, understand and cite. It covers technical health, structured data, clear definitions and source-cited content. Peptomoon cannot guarantee rankings or citations, and it does not write dosing or outcome content.
- **Supplier verification:** Supplier verification is a documentation review of a supplier's certificates of analysis, batch records and lab reports before you sell their product. Peptomoon checks that documents are consistent and traceable. A review is not an approval or certification, and it does not replace independent testing or legal advice.
- **Compliance support:** Compliance support is a review of an RUO store's copy, labels, policies and workflows for avoidable risk, such as wording that implies human use. Peptomoon is not a law firm. The review is not an approval, and the owner remains responsible for products, claims and compliance.
- **Site audits:** A site audit is a written review of an RUO store's technical SEO, content, tracking, structured data and documentation, ending in a prioritised fix list. Peptomoon supplies the findings and developer-ready instructions. It does not guarantee rankings, approvals or sales.
- **Store architecture guide:** A well-structured RUO peptide store organises its catalogue by research category, gives every product a documented batch and certificate, and keeps policies and research-use labelling in the same place on every page. This guide shows the structure and the mistakes that create review risk.
- **Shutdown guide:** If a payment processor closes your RUO store account, secure your records, read the written reason, check the provider's current policy, and avoid opening duplicate accounts. Then fix what the review found before you apply anywhere else. This guide sets out the first 72 hours and what never to do.
- **Payments guide:** RUO payment underwriting reviews your website, your products, your documents and your processing history. Prepare accurate business details, realistic volume figures, clear policies and consistent product copy. Never misrepresent products, hide activities or try to bypass underwriting. This guide explains each step and the common mistakes.
- **Supplier documentation guide:** To review a peptide supplier's documentation, confirm each certificate names the batch you received, comes from a named lab, shows the actual HPLC chromatogram and mass-spec result, and carries a recent date. Missing or inconsistent records are a reason to pause. This guide gives a checklist you can reuse.
- **Infrastructure guide:** Before an RUO peptide business takes its first order it needs a compliant website, a payment route, verified supplier documents, fulfillment, support, tracking and policies that agree with each other. This guide maps those systems and shows where small setups most often fail.

---

## 8. Content plan: 40 new pages

Every page needs: a 40-60-word quick answer, a table or checklist, a dated source list, the RUO and not-advice lines, a link to its service page, and a compliance read before publishing. Volumes are unvalidated. Effort: S under 1 day, M 1 to 3 days, L over 3 days. Compliance risk: L, M, H.

| # | Slug | Primary keyword | Type / angle (GEO hook) | Priority | Effort | Risk |
|---|---|---|---|---|---|---|
| 1 | `/glossary` | what is RUO | Definition hub, anchored terms (RUO, COA, HPLC, MS, MCC, KYC, 3PL, chargeback ratio) | P0 | M | L |
| 2 | `/resources/what-does-research-use-only-mean` | what does research use only mean | Definition, labelling basics with dated primary sources | P0 | M | H |
| 3 | `/resources/what-is-a-coa-peptides` | what is a COA | Definition plus annotated example | P0 | M | L |
| 4 | `/tools/coa-verification-checklist` | COA checklist | Downloadable checklist; table of what each field proves | P0 | M | L |
| 5 | `/tools/supplier-vetting-checklist` | supplier vetting checklist | Checklist plus red-flag table | P0 | M | L |
| 6 | `/pricing` | peptide website cost | Engagement models, ranges only if real | P0 | S | L |
| 7 | `/resources/peptide-business-startup-cost` | cost to start a peptide company | Cost table by line item (needs real data) | P1 | M | M |
| 8 | `/tools/peptide-business-launch-cost-calculator` | peptide business startup cost calculator | Calculator; citable numbers | P1 | L | M |
| 9 | `/tools/store-launch-checklist` | peptide store launch checklist | Checklist, ordered steps | P1 | M | L |
| 10 | `/resources/comparisons/shopify-vs-custom-for-peptide-stores` | Shopify vs custom for peptide stores | Comparison table, policy dates verified | P1 | M | M |
| 11 | `/resources/comparisons/woocommerce-vs-nextjs-peptide-store` | WooCommerce vs Next.js peptide store | Comparison table | P2 | M | L |
| 12 | `/resources/payment-options-for-ruo-sellers-compared` | payment options for RUO sellers compared | Matrix, no endorsement of rule evasion | P1 | L | H |
| 13 | `/resources/high-risk-merchant-account-research-peptides` | high-risk merchant account research peptides | Explainer, underwriting steps | P1 | M | H |
| 14 | `/resources/chargebacks-for-ruo-stores` | chargebacks peptides | Prevention checklist | P2 | M | M |
| 15 | `/resources/stripe-shut-down-peptide-account` | Stripe shut down peptide account | Problem-aware, check Stripe's current policy first | P1 | M | H |
| 16 | `/resources/shopify-banned-peptide-store` | Shopify banned peptide store | Problem-aware, platform policy verified | P1 | M | H |
| 17 | `/resources/paypal-froze-funds-peptide-store` | PayPal froze funds peptides | Problem-aware | P2 | M | H |
| 18 | `/resources/meta-ad-account-disabled-ruo-store` | Meta ad account disabled peptides | Verify against current Meta Advertising Standards | P2 | M | H |
| 19 | `/resources/peptide-3pl-fulfillment-usa` | peptide 3PL fulfillment USA | List with selection criteria, carrier policies dated | P1 | M | M |
| 20 | `/resources/how-to-ship-ruo-peptides` | how to ship peptides legally | Carrier policies verified against primary sources | P2 | L | H |
| 21 | `/resources/how-to-find-a-peptide-supplier` | how to find a peptide supplier | Selection criteria | P1 | M | M |
| 22 | `/resources/ruo-labelling-requirements` | RUO labelling requirements | Counsel-reviewed only (`needsCounselReview`) | P2 | L | H |
| 23 | `/resources/peptide-business-llc-and-licensing` | peptide business license LLC | Counsel-reviewed only | P3 | M | H |
| 24 | `/resources/peptide-store-compliance-checklist` | peptide store compliance checklist | Checklist | P1 | M | M |
| 25 | `/resources/peptide-store-seo-guide` | peptide store SEO | Guide with original checklist | P1 | M | L |
| 26 | `/resources/ai-search-visibility-for-ruo-stores` | GEO for peptide stores | Guide with prompt-test method | P2 | M | L |
| 27 | `/resources/state-of-ruo-peptide-ecommerce-2026` | RUO peptide ecommerce report | Original anonymised data, only with client permission | P1 | L | M |
| 28 | `/resources/peptide-affiliate-program-guide` | peptide affiliate program | Guidelines template | P2 | M | M |
| 29 | `/resources/peptide-email-deliverability` | peptide email marketing | Deliverability checklist | P2 | M | L |
| 30 | `/resources/peptide-store-analytics-setup` | peptide store analytics | GA4 event map table | P2 | M | L |
| 31 | `/case-studies/helix-bio-chem` | Helix Bio Chem case study | Only confirmed facts | P1 | M | L |
| 32 | `/case-studies/certified-aminos` | Certified Aminos case study | Only confirmed facts | P1 | M | L |
| 33 | `/case-studies/amino-based` | Amino Based case study | Only confirmed facts | P1 | M | L |
| 34 | `/resources/peptide-store-headless-cms` | headless CMS for peptide store | Architecture explainer | P3 | M | L |
| 35 | `/resources/peptide-product-page-structure` | peptide product page structure | Template table, no usage content | P2 | M | M |
| 36 | `/resources/ruo-policy-pages-checklist` | RUO store policies | Policy checklist | P2 | S | L |
| 37 | `/resources/peptide-business-banking` | business bank account peptide company | Banking explainer | P2 | M | H |
| 38 | `/resources/peptide-store-migration-checklist` | migrate peptide store platform | Migration checklist | P3 | M | L |
| 39 | `/resources/ruo-site-audit-sample` | peptide store audit example | Redacted sample audit | P2 | M | L |
| 40 | `/editorial-policy` | n/a (trust page) | How we research, corrections policy | P0 | S | L |

### 90-day calendar (no routing or redirect deploys on Fridays; at most one 301 batch per week)

- **Weeks 1-2:** indexation and measurement fixes (section 14), items 1, 6, 40 (glossary, pricing, editorial policy).
- **Weeks 3-4:** items 2-5 (definitions, two checklists), case studies 31-33 after fact confirmation.
- **Weeks 5-6:** items 15, 16, 13 (problem-aware money content) after the policy checks.
- **Weeks 7-8:** items 10, 12, 19, 21, 24 (comparisons and lists).
- **Weeks 9-10:** items 7, 8, 9, 25 (cost calculator, launch checklist, SEO guide).
- **Weeks 11-12:** item 27 (original data report, only if client permission and real data exist), then refresh dates on all older pages.

---

## 9. GEO plan

**What I ran.** 6 web searches (`site:peptomoon.com`, `Peptomoon`, and 4 topical queries). This is not a test of ChatGPT Search, Perplexity, Copilot, Gemini, Claude or AI Overviews, and it is well short of the 30 prompts the brief asks for. NEEDS VERIFICATION: run the 30 prompts below manually or through Ahrefs Brand Radar, and log them in the table.

| Query | Peptomoon cited? | What ranks / is cited | Gap |
|---|---|---|---|
| `site:peptomoon.com` | N | Unrelated peptide stores and blogs | No indexed pages surfaced |
| `Peptomoon` | N | Unrelated peptide pages (including similarly spelled names) | No brand result at all |
| peptide website developer, RUO store agency, payment processing | N | Fiverr gigs, vendor pages on `pages.dev` and similar | Thin, self-promotional results; no evidence-based agency page |
| Stripe shut down peptide account | N | Vendor blogs, processor marketing | Processor sellers dominate; no neutral recovery guide |
| how to start a research peptide business | N | Vendor blogs, Skool communities, a law firm page | Few primary-source-backed guides |
| how to verify a peptide supplier COA | N | Many vendor "how to read a COA" pages | Sources disagree on tolerances; a sourced, neutral checklist is missing |

**Prompt set to run (30):** how do I start a research peptide business; best website developer for peptide stores; payment processor for research peptides; Stripe account shut down selling peptides; how to verify a peptide supplier COA; peptide fulfillment 3PL USA; can I run Meta ads for research peptides; peptide SEO agency; Shopify vs custom for peptide store; what is RUO; what is a COA; what is HPLC purity; cost to start a peptide company; peptide store compliance checklist; high-risk merchant account peptides; PayPal froze funds peptides; best 3PL for peptides; peptide affiliate program software; peptide email marketing; Peptomoon; Peptomoon reviews; who builds RUO peptide websites; peptide store launch checklist; how to ship peptides; peptide business license; supplier vetting checklist; chargebacks peptides; peptide store audit; peptide store architecture; RUO labelling requirements. Record for each: cited Y/N, cited sources and page types, the gap.

**Citation-worthy assets that are missing:** original data report, COA field-by-field table, launch-cost calculator, processor and 3PL selection matrices (criteria, not endorsements), a glossary with anchored definitions, redacted sample audit.

**Brand-entity consistency:** one description repeated everywhere (site, `llms.txt`, LinkedIn, Crunchbase, directories). Settle F-ENT-01 first. Wikidata only if notability is met, which it is not now.

**Measurement baselines:** GSC Gen-AI report (not exposed by the connector: read it in the UI), Bing AI Performance (needs the Bing property), GA4 AI referrals (needs the GA4 property), Ahrefs Brand Radar (needs a paid plan check).

**Per the brief:** llms.txt, chunking and "AI schema" are not Google levers. Keep `llms.txt` as is; do not invest more in it.

---

## 10. Fix SOP

Each item: ID, priority, problem, evidence, URLs, why, exact fix, developer instructions, validation, post-deploy check, impact. The Antigravity prompts are in section 11.

| ID | Pri | Problem and evidence | Exact fix | Validation and post-deploy check | Impact |
|---|---|---|---|---|---|
| IDX-001 | P0 | Sitemap not submitted, 9 of 9 deep URLs unknown (F-IDX-01/02). | In GSC: Sitemaps, add `https://peptomoon.com/sitemap.xml`. Then Inspect URL, Request indexing, for the 29 non-home URLs, starting with `/services`, `/resources`, `/case-studies`, `/about`, `/contact`, then guides. | `get_sitemaps` shows the sitemap. Re-inspect the 10 sampled URLs after 3 to 7 days. | Unblocks everything |
| IDX-002 | P0 | Not in Bing (F-IDX-03). | Bing Webmaster Tools: Import from Google Search Console (fastest), then submit the sitemap. Add an IndexNow key file (see TECH-004). | `list_sites` lists peptomoon.com. `list_sitemaps` shows it. | Feeds Copilot and other Bing-based answers |
| ANL-001 | P0 | No GA4 property (F-ANL-01). | Create a GA4 property and a web stream for `https://peptomoon.com`. Set `NEXT_PUBLIC_GA_ID` in Vercel. Mark these key events: `generate_lead` (form success), `click_email`, `quiz_complete`. Add the same account to Clarity. | GA4 Realtime shows a visit after consent. | Lets us measure leads |
| TECH-001 | P0 | Counter renders `0` in HTML (F-REN-01). | Render the real value in server HTML. Animate only on the client, from the visible value, and only when the user has not asked for reduced motion. Gate the value on CLAIM-001. | `curl -s https://peptomoon.com/ \| grep -o "RUO stores we built"` shows the correct number before it. | Removes a false signal to crawlers and LLMs |
| TECH-002 | P1 | Hero words have no spaces (F-REN-02). | In `scroll-statement.tsx`, emit a space text node between words (`{i > 0 ? " " : null}`) so extracted text reads normally. Keep the animation. | Strip tags from the raw HTML: the sentence reads with spaces. | Clean passage extraction |
| CLAIM-001 | P1 | "50+" unproven (F-CLM-01). | You supply a dated list of the sites. If it cannot be shown, change every instance to the provable number or to "RUO stores we have built, including:" with the six shown. Keep a source and `verifiedOn` date, as the repo's content rules require. | `pnpm check:content`. Search the repo for `50+`. | Trust, and removes unsubstantiated-claim risk |
| ENT-001 | P1 | Products vs services conflict (F-ENT-01). | Decision needed from you (section 15). If services only: delete the "also provides research-use-only products" sentence and the "Yes" FAQ in the 6 locations and replace with "No. Peptomoon does not sell products to the public." If it does sell: move the catalogue to a separate domain or subdomain and keep this site B2B. | Search the repo for `also provides research-use`: zero hits. Re-fetch `/llms.txt`. | Clear entity for search and LLMs |
| EEAT-001 | P1 | No named people, empty `sameAs` (F-EEAT-01). | Add real founder or team names with real profile links only, an Organization `sameAs` list (LinkedIn, Crunchbase and so on) that actually exist, and a real legal entity name if different from the brand. Never invent any of it. | Rich Results Test on `/about`. | Entity trust |
| META-001 | P2 | 19 descriptions over 155, 2 titles over 60, short contact meta (F-META-01). | Apply the table in section 7. | `pnpm check:content` plus the length script in section 16. | CTR, no truncation |
| IMG-001 | P2 | Screenshots have empty alt (F-IMG-01). | Give portfolio screenshots descriptive alt such as "Desktop homepage of Veracue Labs, an RUO peptide store built by Peptomoon". Keep `alt=""` on pure decoration. | Re-run the alt count. | Accessibility and image search |
| MAP-001 | P2 | All `lastmod` equal (F-MAP-01). | Use each content module's real `updated` or `counselReviewedOn` date. Never set `lastmod` to the build time. | Fetch `sitemap.xml`: dates differ and match page dates. | Crawl scheduling |
| TECH-004 | P2 | No IndexNow. | Add a key file at `/<key>.txt` and a deploy-time ping for changed URLs. | Bing `get_url_submission_quota` and submissions appear. | Faster Bing discovery |
| CASE-001 | P2 | 3 portfolio clients have no case study (F-CASE-01). | Write each only from facts the client confirms (section 8, items 31 to 33). | `pnpm check:content` passes the portfolio match rule. | Proof assets |
| AEO-001 | P2 | No quick answers (F-AEO-01). | Add the quick answers in section 7 under each H1. | Word count 40 to 60 per answer. | Snippet and answer-engine eligibility |
| PERF-001 | P2 | CWV unmeasured (F-PERF-01). | Run PageSpeed Insights with an API key, read CrUX, then raise only what fails on field data. | CWV green or ticketed. | UX and rankings |
| SCHEMA-001 | P3 | Organization appears in two JSON-LD blocks on the home page. | Confirm whether this is a deliberate `@graph` split. If duplicated, merge by `@id`. Do not add `aggregateRating`, `review`, `MedicalWebPage`, `Drug` or `MedicalTest`. | Rich Results Test and Schema Markup Validator. | Cleaner entity data |

---

## 11. Antigravity batches

Every batch starts with this preamble. Paste it first.

```
SAFETY PREAMBLE
Inspect the repo first and read node_modules/next/dist/docs/ for anything Next.js-specific (see AGENTS.md).
Do not duplicate existing functionality.
git commit before you start and again when you finish.
Make the smallest safe change.
Do not touch forms, booking, payments, or auth unless that is the task.
Leave canonical logic alone unless that is the task.
Report changed files plus the results of pnpm check and pnpm build (TypeScript included).
No routing or redirect deploys on Fridays.
```

### Batch 1: Rendering fixes (TECH-001, TECH-002). Deploy Monday to Thursday.

```
Task: make two homepage components emit correct text in the server HTML.

1) src/components/ui/number-ticker.tsx currently renders {startValue} (0) on the server, so crawlers see "0+" instead of the real number.
   Change it so the server HTML contains `value`. Keep the count-up animation on the client, starting from startValue only when the element enters the viewport and the user has not set prefers-reduced-motion. If reduced motion is set, show `value` immediately.
   Do not change its props API.

2) src/components/sections/home/scroll-statement.tsx maps words to <motion.span> inside a flex container with gap, with no whitespace text nodes, so extracted text reads "Genericstoresarebuilt".
   Insert a real space between words (for example render {i > 0 ? " " : null} before each <Word>). Keep the animation, layout and reduced-motion behaviour unchanged.

Validate: pnpm check && pnpm build && pnpm start, then
curl -s http://localhost:3000/ | node -e "let s=require('fs').readFileSync(0,'utf8').replace(/<script[\s\S]*?<\/script>/g,' ').replace(/<[^>]+>/g,' ');console.log(/Generic stores are built/i.test(s))"
and check that the counter text in the raw HTML is the real number. Report the diff.
```

### Batch 2: Metadata lengths (META-001). Deploy Monday to Thursday.

```
Task: update titles and meta descriptions only.
Find where each page's metadata is defined (src/content/*, src/app/**/page.tsx, src/lib/seo). Apply the 30-row table in docs/seo/peptomoon-seo-geo-aeo-audit-2026-11-17.md section 7.
Rules: title <= 60 characters, description <= 155 characters, no em dashes, no risky claim phrases (run pnpm check:content).
Do not change slugs, canonicals, H1s, or schema in this batch.
Validate: pnpm check && pnpm build, then print every route's title and description lengths and confirm none exceed the limits.
```

### Batch 3: Sitemap lastmod, alt text, IndexNow (MAP-001, IMG-001, TECH-004)

```
Task A (sitemap): in the sitemap generator, set lastmod from each page's real content date (articles: updated or counselReviewedOn; services and case studies: their verifiedOn or updated fields; static pages: omit lastmod rather than using the build date).
Task B (alt text): src/components/portfolio/shot-strip.tsx and src/components/sections/home/hero.tsx use alt="". Where the image is a portfolio screenshot, set alt to "Desktop homepage of {site name}, an RUO peptide store built by Peptomoon" (derive from existing data; do not invent). Keep alt="" only where the image is purely decorative.
Task C (IndexNow): add a route that serves the key file at /{key}.txt, with the key read from an env var INDEXNOW_KEY. Add a script scripts/indexnow.ts that posts changed URLs to https://api.indexnow.org/indexnow. Do not run it in the build.
Validate: pnpm check && pnpm build. Report changed files.
```

### Batch 4: Positioning copy (ENT-001, CLAIM-001). Run only after you answer the questions in section 15.

```
Task: make the entity statement consistent.
Decision: {SERVICES_ONLY | SERVICES_AND_PRODUCTS}. Claim count: {NUMBER_THAT_CAN_BE_SHOWN}.
Locations: src/config/nav.ts:36, src/components/sections/home/faq.tsx:11, src/content/page-faqs.ts (lines 26 and 95), src/content/legal.ts:231, src/lib/llms.ts:63, and every "50+" in src/app/case-studies/page.tsx and src/components/sections/home/portfolio-pin.tsx.
If SERVICES_ONLY: remove "also provides research-use-only products" everywhere and change the FAQ answer to say Peptomoon does not sell products to the public.
Replace "50+" with the provable number, or with wording that matches the six sites actually shown. Keep source and verifiedOn fields, per README content rules.
Validate: pnpm check && pnpm build. grep the repo for "also provides research-use" and "50+": expected zero hits (or only the verified number).
```

### Batch 5: New content (one page at a time, section 8)

```
Task: add one new resource using the existing article module pattern in src/content/articles/.
Page: {title / slug / primary keyword from section 8}.
Required: 40-60 word quick answer under the H1; at least one table or checklist; dated source list with primary sources; the RUO and not-legal-advice lines; links to the related service page and glossary terms; Article + BreadcrumbList schema (author stays Organization unless a real named author is supplied); set needsCounselReview: true for regulatory topics.
Do not write dosing, usage, outcome or human-use content. No em dashes, no risky claim phrases.
Validate: pnpm check:content && pnpm check && pnpm build.
```

---

## 12. Off-page and digital PR plan

All targets are categories to verify before outreach; I did not confirm eligibility, terms, or editors. Be helpful, never spammy, and keep every post inside research-use positioning. Avoid consumer peptide-use communities entirely: engaging there pulls the brand toward human-use topics.

| # | Target | Angle |
|---|---|---|
| 1 | Clutch profile | Agency profile with real client reviews (only real, attributable) |
| 2 | GoodFirms profile | Same, B2B e-commerce category |
| 3 | DesignRush profile | E-commerce development listing |
| 4 | LinkedIn company page and founder profile | Source of truth for `sameAs`; weekly post from a guide |
| 5 | Crunchbase organisation | Entity consistency |
| 6 | GitHub organisation | Publish the COA checklist as an open Markdown or JSON file |
| 7 | Next.js showcase submission | A real production build (check current submission rules) |
| 8 | Vercel customer or community showcase | Same build, infrastructure angle |
| 9 | r/ecommerce | Answer questions about high-risk payments and store architecture, no pitching |
| 10 | r/smallbusiness | Same, payment-shutdown recovery |
| 11 | r/Entrepreneur | Launch-cost checklist when it exists |
| 12 | Indie Hackers | Build-in-public post on the cost calculator |
| 13 | Hacker News (Show HN) | The COA checklist or calculator, if it is genuinely useful |
| 14 | Ecommerce and payments podcasts | Guest topic: why underwriting reads your website |
| 15 | Guest posts on headless-commerce blogs | "Next.js vs Shopify for regulated categories" |
| 16 | High-risk payments directories | Only reputable ones, listing the educational guide, not the service |
| 17 | Merchant-services blogs | Pitch the shutdown-recovery checklist as a resource |
| 18 | Ecommerce newsletters | Pitch the original data report (item 27) once it exists |
| 19 | Industry associations or trade pages for research-chemical suppliers | Resource listing for the supplier-documentation checklist (verify the association exists and accepts listings) |
| 20 | Client sites | Footer credit (below) |

**Footer credit "Built by Peptomoon" on client sites.** A sitewide footer link across 50+ sites in one niche is a recognisable footprint. Link to the homepage only, vary the anchor text (brand, "Peptomoon", "RUO store infrastructure"), and mark sitewide footer links `rel="nofollow"` or `rel="sponsored"` unless you want the link to pass equity and accept that risk. Count of client sites and exact current anchors: NEEDS VERIFICATION.

---

## 13. Measurement

| KPI | Baseline (17 Nov 2026) | Source |
|---|---|---|
| Indexed pages (Google) | 1 confirmed of 10 inspected | GSC URL Inspection |
| Submitted sitemaps (GSC) | 0 | GSC |
| Bing property | not added | Bing WMT |
| Impressions / clicks, 1 Jan to 17 Nov 2026 | 0 / 0 | GSC |
| CTR by position band, non-brand share, Gen-AI impressions | no data | GSC (UI for Gen-AI) |
| Bing AI citations | no data | Bing WMT |
| AI-referral sessions | no GA4 property | GA4 |
| Domain Rating | 0.0 | Ahrefs |
| Leads and lead-to-call rate | unmeasured | GA4 events plus CRM |
| Core Web Vitals | unmeasured | CrUX via PSI |

Cadence: weekly during the first 90 days (indexed count, impressions, new queries, AI referrals), monthly after that. Report from the same GSC property each time and note that GSC rows are partial.

---

## 14. Roadmap

### 14-day sprint

| Day | Task | Owner | Depends on |
|---|---|---|---|
| 1 | Submit sitemap in GSC, request indexing for the 29 URLs (IDX-001) | You / Dev | none |
| 1 | Add site to Bing via GSC import, submit sitemap (IDX-002) | You / Dev | GSC |
| 1-2 | Create GA4 property and Clarity project, set env var (ANL-001) | Dev | none |
| 2 | Answer the section 15 questions | You | none |
| 3 | Batch 1 rendering fixes, deploy (not Friday) | Dev | none |
| 4 | Batch 2 metadata, deploy | Dev | none |
| 5 | Re-inspect the 10 sampled URLs | Dev | day 1 |
| 6-8 | Prove or change the "50+" claim; Batch 4 | You + Dev | answers |
| 9-10 | Batch 3: lastmod, alt text, IndexNow | Dev | none |
| 11-14 | Draft `/glossary`, `/pricing`, `/editorial-policy`; create LinkedIn and Crunchbase profiles | Content / Outreach | answers |

### 90 days
Weeks 1 to 14 of the calendar in section 8. Add the 30-prompt GEO test at week 2 as the baseline and repeat monthly. Ship the first 3 case studies from confirmed facts. Open 5 directory and profile listings.

### 180-day horizon
Publish the original data report if real client data and permissions exist. Add a downloadable tool and secure 5 to 10 independent mentions. Refresh every dated guide with its source check. Decide on a buyer-facing property only if the entity question allows it.

---

## 15. Data still missing

| Need | Why | How to get it |
|---|---|---|
| Does Peptomoon sell products, or services only? | F-ENT-01 | Your answer |
| Is Peptomoon a Belk Digital brand, a rebrand of Vanta Foundry, or separate? The same Google account holds GSC access to belkdigital.com and vantafoundry.com, which does not settle it | Entity, `sameAs`, Organization schema | Your answer |
| Can "50+" be shown? A dated list of sites | F-CLM-01 | Your records |
| What converts and what a lead is worth | Conversion scoring | Your answer, then GA4 events |
| Domain registration date and any past content | Age and history | WHOIS lookup or registrar |
| Search volumes and difficulty for section 5 clusters | Prioritisation | Ahrefs Keywords Explorer, or restore Semrush units |
| Core Web Vitals | F-PERF-01 | PageSpeed Insights with an API key |
| GSC Coverage report, Gen-AI report, the other 20 URL inspections | Complete indexation picture | GSC UI, or re-run inspections |
| 30-prompt AI citation test | GEO baseline | Manual run or Brand Radar |
| Clarity data | UX friction | Add the Clarity tag |
| Backlinks, referring domains, competitors | Off-page | Ahrefs plan access |

---

## 16. Verification log

Checked in this session:
- GSC: site list, performance (page and query, 2026-01-01 to 2026-11-17, both empty), sitemaps (empty), URL Inspection on 10 URLs.
- Bing WMT site list (16 sites, no peptomoon.com). GA4 property list (no peptomoon property).
- Live fetches of 30 sitemap URLs as Googlebot: status, title and description length, H1 count, canonical, JSON-LD types, image alt counts, word counts, internal links.
- Redirects, case variants, 404 behaviour, headers, OG image, six bot user-agents on one guide. `robots.txt`, `sitemap.xml`, `llms.txt` read in full.
- Repo source for the counter, hero statement, entity sentences, `sameAs` logic and empty alts.
- Ahrefs Domain Rating for three domains. Semrush report list.
- 6 web searches.

Not checked, and why: Core Web Vitals (PSI quota 429), Semrush data (no units), keyword volumes, ChatGPT/Perplexity/Copilot/Gemini/AI Overviews results, GSC Coverage and Gen-AI reports (not exposed), Clarity, the other 20 URL inspections.

Taken from the brief and skill, not independently verified here: Google's FAQ rich-result removal on 7 May 2026, Google's May 2026 guidance that llms.txt and chunking are unnecessary, and the schema bans. Treat them as the operating rules you set.

Corrections to the brief's "issues already spotted": item 1 confirmed and root cause found; item 2 confirmed and root cause found; item 3 partly confirmed (99 service-link occurrences on the home page, mostly nav and menu, not harmful by itself); item 4 confirmed (24 empty alts on three pages); item 5 confirmed; item 6 confirmed in six source locations; item 7 confirmed and worse than expected (one indexed page of ten); item 8 confirmed.

Competitor analysis (section 5 of the brief) is **not done**: no Ahrefs or Semrush competitor data was available, and the web searches show only that the results are dominated by vendor and freelancer pages. I did not name or score competitors.

---

## 17. Addendum: SERP and competitor landscape (17 Nov 2026)

**How this was gathered:** 8 live web searches on the core commercial and informational intents. Ahrefs Keywords Explorer and SERP Overview returned "Insufficient plan" and Semrush has no API units, so **there are still no search volumes, keyword difficulty or competitor DR/traffic figures.** Everything below is who appears in results, taken from the result lists. Tag: VERIFIED for "appears in the results", NEEDS VERIFICATION for anything about their traffic or authority. This is not the 30-prompt AI-assistant test. I cannot query ChatGPT, Perplexity, Gemini or Copilot from here, so section 9's prompt table remains untested.

### 17.1 Who appears, by intent

| Intent | Query | Who appears (VERIFIED in results) | Read-out |
|---|---|---|---|
| Hire a developer | peptide website developer research peptide store design agency | Almost entirely Fiverr gig pages, plus Dribbble, Contra | Marketplace freelancers, no established agency in the top results. Wide open for a proper agency page with proof. |
| Hire a marketer | peptide SEO agency marketing agency for peptide companies | Avenue Z "11 top agencies" list (it ranks itself first), DesignRush "Peptide Marketing", Clutch profiles for Velixa Labs and Ads Digitally, JH SEO Agency, Fiverr | Real specialist competitors: Peptide Marketing, Ads Digitally, Velixa Labs. Listicles and directories carry the visibility. |
| Payments | payment processor for research peptides high risk merchant account | Instabill, Corepay, Binderr, SeamlessChex, Fena, Peptipay, Payram, TechBullion, thefinrate, a stonevillenc.org blog network, several pages.dev blogs | Processor and affiliate content. Heavy on unverified claims (approval in 7-14 days, offshore accounts). |
| Payments (urgent) | Stripe shut down account selling research peptides | stonevillenc.org, peptidesetup.pages.dev, thefinrate, Payram, SeamlessChex, a PayPal press release, a BlackHatWorld thread about cloaking | A neutral, accurate "what to do next" guide has little real competition. |
| Fulfilment | peptide fulfillment 3PL USA research use only | 3PLGuys (Sept 2025 launch, via Racklify), RapidFulfillment (April 2026 white-label dropshipping launch), Koi Research Labs press releases, supplier FAQ pages | Press releases and supplier pages. No dedicated B2B explainer from an independent service. |
| Wholesale and dropshipping | peptide wholesale dropshipping research use only supplier | Real Peptides (wholesale partner, dropshipping, reseller and state-level wholesale pages), Remy Peptides, City Kindr, Essential Peptides, Scientific Aminos, stonevillenc.org | Real Peptides runs a deep programmatic cluster. They are suppliers selling product. Peptomoon is positioned as a services company, so should not copy a product catalogue approach. |
| Start a business | how to start a research peptide business | peptidesetup.pages.dev, stonevillenc.org FAQ, a Skool community, a Canadian law firm (substancelaw.ca), OpenLoop Health, assorted landing pages | Mostly thin vendor and course pages. A sourced, compliance-first guide can win here. |
| COA verification | how to verify a peptide supplier COA HPLC | Many supplier-run guides (pages.dev, Lovable, Manus sites), Finnrick, pharmaphorum | Crowded but low quality. Finnrick and pharmaphorum are the credible ones. |

### 17.2 Competitor set (top 10, to be sized once a data tool is available)

1. Peptide Marketing (peptide-marketing.com), specialist SEO, ads, email and eCommerce agency
2. Ads Digitally, research-peptide-only performance marketing and websites
3. Velixa Labs, websites, SEO and branding for research peptide suppliers
4. Avenue Z, general agency whose peptide list ranks itself first
5. Instabill, high-risk merchant accounts
6. Corepay, high-risk merchant accounts, LegitScript angle
7. SeamlessChex, peptide merchant accounts with a content cluster
8. 3PLGuys / Racklify, specialised peptide 3PL
9. RapidFulfillment, white-label peptide dropshipping and fulfilment
10. Real Peptides, wholesale, dropshipping and reseller programmes (supplier, adjacent rather than direct)

Content-site competitors for informational queries: peptidesetup.pages.dev, stonevillenc.org, thefinrate, Finnrick.

DR, organic traffic, backlinks and AI-citation share for these are NEEDS VERIFICATION. Re-run once Ahrefs has an eligible plan or Semrush units are restored.

### 17.3 What the results change in the plan

1. **The weakest competition is where Peptomoon already has content.** "Peptide website developer" is Fiverr gigs. A proper service page with live proof (the three case studies) should beat marketplace listings once it is indexed. Indexation is the blocker, not content quality.
2. **The payments cluster is crowded with sales content making unverified claims** (approval in 7-14 days, offshore accounts, 10% reserves, crypto settlement). Peptomoon's existing guides take the opposite line: no advice on evading underwriting. Keep that. It is both the compliance rule and the differentiator, and sources like Binderr and the procurement article already say RUO labelling is not a legal shield.
3. **A neutral "account shut down, what now" guide is under-served.** The current guide `payment-processor-shut-down-account` targets this directly. It needs to be indexed and linked, and its claims about holds and reserves must stay attributed. Several competitor figures (90-180 day holds) could not be confirmed from Stripe or an independent source.
4. **3PL and dropshipping have two live launches in the last 14 months** (3PLGuys Sept 2025, RapidFulfillment April 2026), so demand is real and competitors are moving. The new `/services/wholesale-dropshipping-3pl` page should be indexed early and get supporting guides: wholesale vs dropshipping vs 3PL, 3PL questions to ask, and what a dropship agreement should say.
5. **Real Peptides shows what a deep cluster looks like** (reseller, distributor, med-spa and per-state wholesale pages). Do not copy it. Per-state wholesale pages are doorway-risk and the brief bans them without a real presence.
6. **Listicles carry visibility in "agency" queries** (Avenue Z, DesignRush, Clutch). Off-page priority: get Peptomoon listed on Clutch and DesignRush with real client reviews. Never invent reviews.
7. **Marketplace and BlackHatWorld results show a risk-taking audience.** Content must stay firmly compliant. Searches for cloaking and descriptor tricks exist, and Peptomoon should not write to them.

### 17.4 Still not measured

- Search volume, keyword difficulty, CPC and SERP features (Ahrefs plan and Semrush units)
- Competitor DR, traffic, backlinks (same blockers)
- The 30-prompt AI-assistant test (needs manual runs in each product, or Ahrefs Brand Radar on an eligible plan)
- Core Web Vitals (PageSpeed quota)
- GSC coverage and Gen-AI reports, Clarity, backlinks

**Cheapest unblocks:** (a) run the 30 prompts by hand in ChatGPT, Perplexity, Gemini and Copilot and paste the answers, which costs nothing; (b) retry PageSpeed Insights tomorrow after the quota resets; (c) Semrush units return on the next billing reset; (d) for volumes without either paid tool, Google Keyword Planner is free with a Google Ads account.

---

## 18. Section E: GEO prompt test (30 prompts, 17 Nov 2026)

**Method and its limit (read first).** I ran 30 real queries through live web search and recorded who appears. This is a *proxy* for AI-assistant citation, not the real thing: I cannot query ChatGPT Search, Perplexity, Gemini, Copilot, Claude or Google AI Mode from here, and Ahrefs Brand Radar returns "Insufficient plan". Assistants draw heavily on the same web results, so the source mix below is a fair predictor of who they cite, but treat "cited by AI" as NEEDS VERIFICATION until the same prompts are run by hand in each product.

**Headline result: Peptomoon appeared in 0 of 30 (VERIFIED, web-search proxy).** The brand queries "peptomoon" and "peptomoon reviews" returned no Peptomoon page and no mention of the company at all. Search engines and answer tools currently have no entity for Peptomoon. This is consistent with the Search Console result (only `/` indexed, zero impressions) and Ahrefs DR 0.

### 18.1 Prompt results

| # | Prompt | Peptomoon cited | What was cited (source types) | Gap Peptomoon can fill |
|---|---|---|---|---|
| 1 | how do I start a research peptide business | N | peptidesetup.pages.dev, stonevillenc.org FAQ, Skool community, a Canadian law firm, OpenLoop Health, landing pages | A sourced, compliance-first launch guide. Existing results are thin vendor pages and courses |
| 2 | best website developer for peptide stores | N | Fiverr gigs, Dribbble, Contra | Agency page with live proof and case studies |
| 3 | payment processor for research peptides | N | Instabill, Corepay, Binderr, SeamlessChex, Fena, TechBullion, thefinrate, pages.dev blogs | Neutral, accurate underwriting guide. Competitors make unverified approval and reserve claims |
| 4 | my Stripe account got shut down selling peptides what now | N | stonevillenc.org, peptidesetup, thefinrate, Payram, SeamlessChex, PayPal press release, BlackHatWorld cloaking thread | "First 72 hours" recovery guide (already built, not yet indexed) |
| 5 | how to verify a peptide supplier COA | N | Supplier-run guides on pages.dev, Lovable, Manus; Finnrick; pharmaphorum | Independent verification checklist with method |
| 6 | peptide fulfillment 3PL USA | N | 3PLGuys, RapidFulfillment, Koi press releases, supplier FAQs | Neutral B2B explainer (new guide built) |
| 7 | can I run Meta ads for research peptides | N | stonevillenc.org (spam network), Fiverr and Contra gigs, a medical-marketing page, no Meta policy page | Policy-grounded guide citing Meta's actual standards (verify against Meta's text first) |
| 8 | peptide SEO agency | N | Avenue Z list, DesignRush, Clutch (Velixa Labs, Ads Digitally), JH SEO, Fiverr | Listing on Clutch and DesignRush with real reviews |
| 9 | Shopify banned peptide store alternatives | N | peptidesetup, Swell, dev.to, blogspot, Fena, seekpeptides | Neutral platform comparison. Most sources are vendors pitching themselves |
| 10 | PayPal froze funds peptide store | N | financialcontent press release, peptidesetup, Payram, Fena, salehoo, Medium | Plain explanation of holds and what to document |
| 11 | Meta ad account disabled peptides what to do | N | Generic disabled-account blogs; stonevillenc.org for the peptide angle | Peptide-specific, policy-cited recovery guide |
| 12 | what does research use only mean peptides | N | superpower.com, biosyn, peptevity.pages.dev, revivepeptides.lovable.app, porchdrinking | Definitive RUO definition and "the label is not a shield" explainer (glossary built) |
| 13 | cost to start a peptide company | N | realpeptides.co, launchyourpeptide.manus.space, financialmodelslab (a clinic model), pages.dev | No reliable cost source exists. A sourced cost breakdown would be citable, but only with real quotes |
| 14 | peptide store compliance checklist, RUO labelling | N | stonevillenc.org, complyruo, onlinelabels, vendor policy pages | Neutral checklist, counsel-reviewed |
| 15 | Peptomoon | N | Unrelated (Peptidemom, Pepsplanit, encyclopedia pages) | The entity does not exist yet |
| 16 | Shopify vs WooCommerce vs custom for a peptide store | N | Fiverr, Swell, Kinsta, Hostinger, Gradax | Peptide-specific platform comparison |
| 17 | how to reduce chargebacks research peptide store | N | Fena (UK), SeamlessChex, tokenoftrust, Stripe, Citcon, rr-bizops | Dispute-prevention guide with an evidence-pack template |
| 18 | how to find a reliable peptide supplier | N | stonevillenc.org network, peptiderecon, forem, resident.com | Documentation-review standard (guide exists, needs indexing) |
| 19 | best 3PL for peptides | N | 3PLGuys, AMZ Prep, Flex Fulfillment (EU), Fulfill.com, Skool | 3PL question list (built) and a comparison matrix (needs real vendor facts) |
| 20 | peptide affiliate program and email platform | N | thedigitalmerchant, Refersion and Tapfiliate programs, peptidesetup, Fiverr | Software comparison with a policy check per vendor |
| 21 | peptomoon reviews | N | A Trustpilot page for another company, Harvard, Tufts | No reviews exist. Do not invent any |
| 22 | peptide website cost | N | Dribbble listings ($650 and from $5,000), a Flippa store ($9,999), Fiverr | Pricing or engagement page. Competitors show prices only on marketplaces |
| 23 | what is HPLC purity on a peptide COA | N | Vendor guides: biorelix, researchvials, enos-usa, manus.space | Authoritative definition with the purity-vs-content distinction (glossary covers it) |
| 24 | high risk MCC code for peptides | N | Antom, Commercegate, Basis Theory, Corepay, Stripe | No official peptide MCC exists. A careful "ask your acquirer" explainer is citable |
| 25 | peptide store not ranking on Google | N | Fiverr SEO gigs, Semrush overview pages, a LinkGraph case study, FormBlends AEO guide | SEO guide for RUO stores |
| 26 | peptide business LLC license requirements | N | stonevillenc.org, realpeptides.co, inhouse.ai, Frier Levitt, OpenLoop | Counsel-reviewed entity and licensing overview |
| 27 | how to ship peptides legally USPS UPS FedEx | N | Vendor shipping policies, shipmercury, pages.dev | Carrier-policy explainer verified against USPS, UPS and FedEx terms |
| 28 | peptide store launch checklist, supplier vetting template | N | theo-site, peptidesetup, centralfloridapeptides, Finnrick | Downloadable checklist and template |
| 29 | RUO peptide website design agency portfolio | N | Fiverr, Dribbble | Portfolio and case-study depth |
| 30 | peptide wholesale dropshipping RUO supplier | N | Real Peptides programme pages, Remy Peptides, City Kindr, Essential Peptides, stonevillenc.org | Services-led explainer (service page and guide built) |

### 18.2 What the results say

1. **The field is weak, not strong.** Almost every result is a vendor blog, a Fiverr gig, an affiliate page or a pages.dev, Lovable or Manus microsite. A small number of credible sources recur: Finnrick (COA), pharmaphorum, Stripe and Frier Levitt. Peptomoon can win on depth, sourcing and honesty without needing high authority first.
2. **A spam network dominates several intents.** stonevillenc.org publishes near-identical "Navigating the Landscape of..." pages across payments, Meta ads, suppliers and shipping. It is not a model. Do not imitate it, link to it or compete on volume.
3. **Almost nobody cites a primary source.** Most regulatory and platform claims (Stripe policy, PayPal holds, FDA warning-letter counts, Mastercard BRAM, the MATCH list) came from vendors, and several figures could not be verified. Primary-source citations with dates are a real differentiator.
4. **Entity absence is the first problem.** Until search engines can resolve "Peptomoon" to one entity, AI answers cannot name it. Indexation, a Bing listing, directory profiles and consistent `sameAs` come before any content volume.
5. **Policy pages are missing from the results.** The Meta query returned no Meta policy page at all. A guide that quotes and links Meta's current Advertising Standards (after verification) is under-served.

### 18.3 Citation-worthy assets Peptomoon is missing

| Asset | Why it would be cited | Status | What is needed from you |
|---|---|---|---|
| COA verification checklist (one page, downloadable) | Recurs across prompts 5, 18, 23, 28 | Guide exists, checklist file does not | Nothing. I can build it |
| Supplier vetting scorecard template | Prompts 18, 28 | Not built | Nothing |
| Wholesale vs dropshipping vs 3PL comparison | Prompts 6, 19, 30 | Built and merged | Nothing |
| Processor comparison matrix | Prompts 3, 10, 24 | Not built | Verified, dated facts from each provider's own terms. Do not use vendor marketing |
| Launch-cost breakdown or calculator | Prompts 13, 22 | Not built | Your real cost ranges for builds and services, or I describe cost drivers without numbers |
| "State of RUO e-commerce 2026" original data | Original data is what assistants cite | Not built | Anonymised, client-approved metrics (order volume, dispute rates, indexation). Cannot be invented |
| Dispute-evidence pack template | Prompt 17 | Not built | Nothing |
| Platform comparison (Shopify, WooCommerce, custom) | Prompts 9, 16 | Not built | Platform policies verified against each platform's own terms |

### 18.4 Off-site citation sources (ranked)

1. **Clutch, DesignRush, GoodFirms:** real reviews only. Agency queries (prompt 8) are answered by listicles and directories.
2. **Bing Webmaster Tools and Search Console:** get indexed first. No off-site work lifts a site that search engines do not know.
3. **LinkedIn company page and founder profile, Crunchbase:** the `sameAs` entity anchors. Needs the real profiles.
4. **Reddit (r/ecommerce, r/smallbusiness, r/Entrepreneur):** helpful answers on payments and platforms, disclosed affiliation, no links on a first reply. Avoid r/Peptides for promotion, since it is a consumer community.
5. **Podcasts and guest posts** on payments, e-commerce and compliance publications, with named speakers (needs real people).
6. **Digital PR angle:** a sourced, honest piece on what RUO labelling does and does not do, and the payment-processor shutdown pattern.
7. **Do not pursue:** a stonevillenc.org-style network, paid link farms, fake reviews, or anything sold as "AI visibility".

### 18.5 Brand-entity consistency checklist

- One description everywhere: "Peptomoon is a business-to-business infrastructure and services company for research-use-only peptide businesses." Use the same sentence on the site, `llms.txt`, LinkedIn, Clutch, Crunchbase and any press.
- Same name format (Peptomoon, one word) and the same logo.
- Populate `Organization.sameAs` only with profiles that exist (currently empty).
- **Wikidata: not recommended.** The company does not meet notability, and a deleted entry is a negative signal.
- Resolve the open entity question (relationship to Belk Digital and Vanta Foundry) before any `sameAs` or `parentOrganization` markup.

### 18.6 Baselines

- GSC (property `sc-domain:peptomoon.com`): zero impressions or clicks for 2026-01-01 to 2026-11-17, and only the homepage indexed. The Gen-AI performance report was not pulled (NEEDS VERIFICATION).
- Bing Webmaster Tools: site not added, so no AI Performance baseline exists. Add it via GSC import first.
- GA4: no property, so AI-referral sessions cannot be measured.

### 18.7 What not to do (per the brief)

Do not market llms.txt, content chunking or "AI schema" as Google ranking or citation levers. Google's May 2026 guidance says they are not needed. `llms.txt` stays optional and low priority, for other agents only.

---

## 19. Sections F and G (in progress): AEO findings and ready-to-use quick answers

### 19.1 AEO findings against the brief (measured on the current source, 17 Nov 2026)

| Check | Brief says | Result | Status |
|---|---|---|---|
| Quick answer at the top of every service page | 40 to 60 words | Services have no separate quick-answer field. The top paragraph is 18 to 60 words: 9 of 13 are under 40 (customer support 18, business dashboards 21, affiliate 21, email 20, supplier verification 25, fulfillment 27, wholesale 28, website development 34, compliance 35) | **Gap** |
| Quick answer at the top of every guide | 40 to 60 words | All 8 guides run 65 to 98 words | **Gap (too long)** |
| FAQ answers | 40 to 80 words, each standalone | 39 of 135 answers are outside the band. 38 are under 40 words (mostly service-page FAQs, and all 7 on the new wholesale service page); 1 is over 80 | **Gap** |
| Question-style H2s in guides | Built on question-style H2s | Between 1 and 6 of 9 to 11 per guide. Lowest: supplier documentation (1 of 11), store architecture (1 of 10) | **Partial** |
| Tables and numbered steps | Tables for comparisons, numbered steps for how-to | Every guide has 2 or more tables and at least one numbered list | OK |
| Glossary hub with anchored terms | Required | Built (22 terms, anchored). Not yet live | OK once merged |
| FAQ data source | Real PAA and AlsoAsked data | Not used. FAQs are written from judgement and the search results. No PAA or AlsoAsked tool is connected. Mark as NEEDS VERIFICATION | **Gap (data)** |

### 19.2 Ready-to-use quick answers, services (all 40 to 60 words, verified by script)

Payment processing (60 words), meta advertising (52), SEO/GEO/AEO (40) and site audits (52) already fit and need no change. The other nine:

| Service | Words | Quick answer |
|---|---|---|
| `ruo-peptide-website-development` | 53 | RUO peptide stores need more than a generic theme. We build custom e-commerce sites where products, variants, batch documents and research-use notices come from structured records, so every page stays consistent. We also redesign, migrate and maintain stores, with technical SEO built in from the start. We do not promise rankings or sales. |
| `fulfillment-logistics` | 57 | Fulfillment coordination connects your store, your inventory and a shipping partner so each paid order reaches the customer with tracking. We set up order routing, stock counts, carrier integrations and an exception queue for delays, damage and returns. We work with your own stock, a 3PL or, where lawful and agreed, dropshipping. We promise no delivery times. |
| `wholesale-dropshipping-3pl` | 56 | Wholesale, dropshipping and 3PL are three ways to supply and ship research-use-only product to business customers. We help you choose a model, check supplier and batch documents, connect orders and stock between your store and the shipper, and agree responsibilities in writing. We do not sell to consumers or assume what is lawful for your products. |
| `business-dashboards` | 57 | A business dashboard puts orders, payments, inventory, affiliates, fulfillment and support in one view, built from your own systems instead of spreadsheets that drift apart. We scope it to the questions you need answered and connect the data behind it. A dashboard shows what your systems record, so it can reveal bad data but not fix it. |
| `customer-support` | 52 | Customer support infrastructure covers the helpdesk, ticket routing, order-aware replies and a knowledge base your team can rely on. We set it up so customers get consistent answers about orders, shipping and documents, and it is built to stay clear of dosing, usage or outcome advice. We cannot promise customer satisfaction scores. |
| `affiliate-management` | 50 | Affiliate infrastructure lets you run a referral programme from inside your store. We build registration, referral tracking, commission rules, affiliate dashboards and payout records, so every sale is attributed and every payment can be audited. Commission terms and disclosures follow your rules. We do not promise affiliate recruitment or sales. |
| `email-marketing` | 48 | Email infrastructure covers authenticated sending, transactional messages, automation and customer segmentation. We set up domain authentication so your mail is trusted, build order and account emails that work reliably, and report on results. Consent and unsubscribe rules are respected throughout. We cannot promise inbox placement or open rates. |
| `supplier-verification` | 56 | Supplier verification is a structured review of the documents behind a product: batch records, laboratory reports, method details and identity data. We write a standard, review each supplier against it, score the results and keep records by supplier and batch. We do not invent certifications, results or purity claims, and a review is not an approval. |
| `compliance-support` | 51 | A research-use-only label does not make a business or its marketing compliant. We review your website, product copy, disclaimers and documentation for avoidable risk, organise what you have and work alongside your own qualified counsel. We are not a law firm, and our review is neither legal advice nor an approval. |

### 19.3 Ready-to-use quick answers, guides (all 40 to 60 words, verified by script)

| Guide | Words | Quick answer |
|---|---|---|
| `infrastructure-behind-an-ruo-peptide-business` | 54 | An RUO peptide business runs on four groups of systems: build (website and catalogue), run (payments, fulfillment, support and reporting), grow (advertising, affiliates and email) and verify (supplier documents and content review). Each group usually works alone, and problems start where one hands over to another. Plan the handovers before you plan the tools. |
| `ruo-label-is-not-a-compliance-strategy` | 55 | A research-use-only label states an intended use, but it is only one piece of evidence. Under FDA's intended-use regulation, intent is judged from the objective facts, including labelling, advertising, statements and how a product is distributed. Review everything you publish for content pointing toward personal use, record the findings and take them to qualified counsel. |
| `review-a-peptide-suppliers-documentation` | 58 | Review a supplier's documents against a written standard, one batch at a time. A usable record names the laboratory, ties each document to a batch and shows the method and underlying data, not only a purity figure. If documents cannot be matched to the vial, checked with the laboratory or look reused, stop and ask before you buy. |
| `payment-processing-for-ruo-stores` | 54 | Underwriting is a payment provider's review of whether to take your business and on what terms, and it continues after approval. To prepare, make your site, application and documents tell the same accurate story, read the contract for reserves, holds and termination terms, and watch decline and chargeback rates. No one can guarantee approval. |
| `payment-processor-shut-down-account` | 60 | If your processor shuts you down, read the notice and contract, reply within the time given with one package, and ask in writing when held funds will be released. Then compare your application with your live site to find the cause, fix what is wrong and apply to providers that cover your category. Never route sales through another business's account. |
| `peptide-store-architecture` | 50 | Build the store from linked records: compound, product, variant, batch and document. Generate every page, filter, notice and document link from those records instead of writing them by hand. Give categories real addresses, keep one canonical address per product, and put research-use notices in the layout so they appear everywhere. |
| `503a-503b-and-ruo-retail` | 51 | Section 503A covers compounding by licensed pharmacists and physicians, generally for an identified patient on a prescription. Section 503B covers FDA-registered outsourcing facilities that meet current good manufacturing practice. Both carry conditions. A business selling research chemicals is neither, and a research-use label does not bring a product under either section. |
| `wholesale-vs-dropshipping-vs-3pl-for-ruo-brands` | 59 | Wholesale means you buy and hold the stock. Dropshipping means a partner ships each order, so you hold no stock. A 3PL means you own the stock while a provider stores and ships it. Choose by who must control quality and packaging, how much capital you can tie up and which partner you can hold to a written agreement. |

**How to apply:** add a quick-answer field to the Service type and render it at the top of each service page, then replace the eight guide quick answers. This touches the service page component and three guide files that currently have uncommitted edits in the working tree from another session, so it should be applied after that work lands, not on top of it.

### 19.4 Section G: schema audit (live site, 17 Nov 2026)

Checked the JSON-LD on 7 representative live URLs (home, services hub, a service, a guide, a case study, About, Contact).

| Item in the brief | Live status | Verdict |
|---|---|---|
| `Organization` with `logo`, `contactPoint` | Present: logo (512 px), contactPoint (sales, `inquiry@peptomoon.com`), `knowsAbout`, slogan | OK |
| `Organization.sameAs` | **Absent.** The site config has no profiles | Needs real profiles from you |
| `Organization.legalName` | Set to "Peptomoon", which is the trading name, not a registered entity | Needs the real legal name |
| `Organization` address | Absent | Needs your business address or jurisdiction |
| `WebSite` | Present on every page | OK |
| `Service` per service page with `provider`, `serviceType` | Present. `areaServed` is **missing** | Add `areaServed` (US, with AU, UK and CA as secondary markets, if you confirm) |
| `ProfessionalService` instead of `Service` | Not used. `Service` with a `provider` is valid | Optional |
| `BreadcrumbList` | Present on all 31 pages | OK |
| `Article` on guides | Present. `author` is the Organization (no invented people) | OK. Matches "author only if real" |
| `Article` for case studies | Present | OK |
| `ItemList` on hubs | Services hub: 13 items. Resources hub: 6 items | OK |
| `FAQPage` | Not emitted | Fine. Optional since 7 May 2026 |
| **Banned types** (`aggregateRating`, `review`, `MedicalWebPage`, `Drug`, `MedicalTest`) | **None found** on any of the 7 URLs | OK |

**Schema fixes to apply (small, safe):** add `areaServed` to the Service schema once you confirm the markets, and fill `sameAs`, `legalName` and an address when you supply them. Do not add `aggregateRating`, `review` or any medical type.

---

## 20. Section H: compliance and risk (verified against primary sources, 17 Nov 2026)

### 20.1 Sources read in full

| Source | What it says | Date |
|---|---|---|
| FDA warning letter to **Summit Research Peptides** (RE 695607) | Cites FD&C Act sections 505(a), 301(d), 201(g)(1) and 201(p). Relies on product webpages and a Facebook post. States that despite "RESEARCH USE ONLY" and "research chemical" labelling, the website evidence shows the products are intended as human drugs. 15 working days to respond | 10 Dec 2024 |
| FDA warning letter to **Wholesale Peptide** (Ref 729447) | Cites the same sections plus 21 CFR 201.128. Relies on website claims about disease and therapeutic effect. A footnote states that "research use only" and "not for human consumption" labels do not override that evidence. 15 business days to respond. Does not mention social media | 17 Jun 2026 |
| Meta Advertising Standards, **Drugs and Pharmaceuticals** (transparency.meta.com) | Advertisers cannot promote the sale or use of illicit or recreational drugs "or other unsafe substances, products or supplements, as determined by Meta at its sole discretion." The page does **not** mention peptides, research chemicals, research-use-only labelling or landing-page review | Change log shows 2024 and 2025 versions; no single current date could be read |
| Meta "Unsafe Supplements" page | **Could not be read.** The Facebook URL redirects to a Meta URL that returns 404 | Unverified |

Seen in search results only, not read in full (NEEDS VERIFICATION before citing): FDA warning letters to Gram Peptides (31 Mar 2026), Peak Performance Peptides and Royal Peptides (both 24 Aug 2026).

### 20.2 What this means for Peptomoon's copy

1. **The site's existing positions hold up.** The Meta service page leaves eligibility to Meta and never promises approval. The RUO guide already cites 21 CFR 201.128 and the Summit letter with dates. No change needed.
2. **Do not repeat the blog claim that "the landing page is the main problem" for Meta.** Several sellers say this, but Meta's own Drugs and Pharmaceuticals page does not say it. The honest statement is: Meta decides at its sole discretion, and its published text does not address research peptides specifically.
3. **Wholesale and dropshipping are not the risk. The marketing copy is.** Both warning letters turned on website claims, not on how stock moves. The new wholesale, dropshipping and 3PL pages already avoid product claims. Keep it that way. Never describe any compound's effects on any site, including client sites you show as case studies.
4. **A company named "Wholesale Peptide" received a letter in June 2026.** It is unrelated to Peptomoon, but a searcher could confuse the two phrases. The guide should not use "wholesale peptide" as a brand-like phrase in headings.
5. **Add the June 2026 letter to the RUO guide's source list** when counsel reviews it. It is the first letter in the set that cites 21 CFR 201.128 directly and is the most recent one verified.

### 20.3 Payment-content check (brief item)

Searching the current results showed competitors advertising descriptor changes, offshore accounts, crypto settlement and "instant approval". Peptomoon's payment guides state the opposite: no advice to misrepresent a business or bypass underwriting. The check-content script enforces this by failing on risky phrases. No payment page needs changes.

### 20.4 Items that still need a human

- **Counsel review** of the two held guides (`ruo-label-is-not-a-compliance-strategy` and `503a-503b-and-ruo-retail`) before they go live. They are hidden in production until a review date is recorded.
- **Meta policy:** re-read the "Unsafe Supplements" page in a browser, since it could not be fetched. Until then, do not publish a Meta-specific guide.
- **State rules** (licence, labelling, warnings): not verified. Vendor claims of "14 states" could not be confirmed. Needs counsel or a state agency source.

---

## 21. Section I: off-page and authority (17 Nov 2026)

### 21.1 Backlink profile

- **Not measurable with the connected tools.** Ahrefs backlink and referring-domain endpoints return "Insufficient plan", and Semrush has no API units. The only authority figure available is Ahrefs Domain Rating 0.0 (free endpoint), which implies a new domain with almost no referring domains. Toxic-link review and the competitor link gap are NEEDS VERIFICATION.
- **Cheapest unblock:** Bing Webmaster Tools and Google Search Console both report inbound links for free once the site is added and verified. GSC "Links" is already available for `sc-domain:peptomoon.com`.

### 21.2 Client-site footer credits: the finding that matters

I fetched the live homepage of all six portfolio sites and searched for "Peptomoon" and for credit phrases.

| Client site | Mentions "Peptomoon" | Credit found |
|---|---|---|
| 99purity peptides (99puritypeptides.com) | 0 | none found |
| Veracue Labs (veracuelabs.com) | 0 | none found |
| Helix Bio Chem (helixbiochem.com) | 0 | none found |
| PrimeTime BioLabs (primetimebiolabs.com) | 0 | none found |
| Certified Aminos (certified-aminos.com) | 0 | "Designed and developed by **Belk Digital**", link to belkdigital.com |
| Amino Based (aminobased.com) | 0 | "Designed & Developed by **Belk Digital**", link to belkdigital.com |

**VERIFIED:** none of the six client sites credits or links to Peptomoon. Two credit **Belk Digital** with a normal (followed) link.

What this means:

1. **Entity inconsistency.** Peptomoon says it "built and maintains" these sites, but the sites say Belk Digital built them. A search engine or an AI assistant that compares the two sees two different companies. The open question (is Peptomoon a Belk Digital brand, a rebrand, or separate) now blocks the case studies, the "50+" claim and the Organization schema.
2. **Link equity goes elsewhere.** If the credits are followed links, they build authority for belkdigital.com and give peptomoon.com nothing.
3. **Footprint risk is real either way.** Followed "built by" links with the same anchor across many sites in one niche is a pattern search engines discount, and it also makes the client network easy to map.

**Recommendation (decide after the entity answer):**
- If Peptomoon is the brand going forward: add "Peptomoon" credits to client sites with `rel="nofollow"` or `rel="sponsored"` and vary the anchor text (brand name, "Peptomoon", and a descriptive variant). Keep Belk Digital named where it is the true builder, or state the relationship on the About page.
- If they are separate companies: Peptomoon must not claim those sites as its own work. The case studies and the "50+" claim would need to come down.
- Either way, do not add large numbers of followed credits to new client sites.

### 21.3 Link-earning assets and targets (see also section 12)

Build-then-promote order, all dependent on being indexed first:
1. COA verification checklist and supplier scorecard (downloadable). Most reusable, cited across prompts 5, 18, 23 and 28.
2. Wholesale vs dropshipping vs 3PL comparison (built).
3. A neutral "processor shut you down, what now" guide (built).
4. Original data, only from client-approved, anonymised figures.

Directories to claim: Clutch, DesignRush, GoodFirms, Crunchbase, LinkedIn. Real reviews only. No reviews exist today, so none may be shown.

---

## 22. Section J: conversion audit (17 Nov 2026)

| Item | What exists | Gap |
|---|---|---|
| Lead path per intent | One path for every visitor: "Start a project" leads to the contact page with a questionnaire. The questionnaire has four starting points (existing site, new business, expand, specific problem) | No separate path for an urgent visitor (for example "my processor shut me down") or for someone who only wants an audit |
| CTA hierarchy | Header button "Start a project", page CTAs "Tell us what you need" | Consistent. Fine |
| Form friction | Only four required fields: service, name, email and consent. Website address is never required. Phone is optional | Low friction. Good |
| Trust near CTAs | Limits and disclaimers shown. No testimonials, logos, ratings or named people | Correct not to invent any. Add real proof when it exists |
| Audit-request lead magnet | The Site audits service page exists, but there is no "request a free sample audit" offer | Gap. A small, scoped sample audit would be a natural entry offer |
| Pricing and engagement-model page | None. Searches for "peptide website cost" return freelancer marketplace listings (one listing from $650, another from $5,000, a store for sale at $9,999). These are individual listings, not market rates | Gap. High commercial intent, and competitors show prices only on marketplaces |
| Booking flow | None. The questionnaire sends a request, and a person replies | Gap. Optional: a calendar link for qualified requests |
| Analytics events | **None.** No GA4 property exists, so form starts, form submits, CTA clicks and scroll depth are not measured. Clarity was not found on the site | Biggest gap. Without it no conversion rate can be known |

**Quick wins (all inside the repo, none touch forms, payments or auth):**
1. Add a page describing how an engagement works and what drives cost (scope, catalogue size, integrations, ongoing support), without invented prices. A real range can be added when you provide one.
2. Add a short "Is your processor shutting you down?" entry link from the payments guide and the Payment processing page to the questionnaire, with the situation preselected.
3. After GA4 exists, track: questionnaire started, step completed, submitted, and CTA clicked by page.

**Needs from you:** your real price ranges or starting points (or confirmation that none should be shown), what a lead is worth, and whether you want a booking calendar.

---

## 23. Sections 4 and 5: intent universe coverage and competitors (17 Nov 2026)

**What is and is not measured.** Volume, keyword difficulty, current rank, AI Overview presence and competitor DR/traffic could not be pulled: Ahrefs returns "Insufficient plan" and Semrush has no units. The "current rank" column is VERIFIED as *not ranking*, because Search Console shows zero impressions. The business-value score and the quick-win, pillar and money-page tags are my judgement and are labelled as such. Volumes stay NEEDS VERIFICATION. Google Keyword Planner (free with a Google Ads account) is the cheapest way to fill them.

### 23.1 Intent coverage map

Value is 1 to 5 (judgement). Rank is "none" for every row (VERIFIED, Search Console). SERP strength comes from the 30-prompt test in section 18.

| Intent | Target keyword themes | URL | Status | Value | SERP competition (observed) | Tag |
|---|---|---|---|---|---|---|
| Navigational | peptomoon, peptomoon reviews | `/` | Live, no entity yet | 3 | None. No results mention the brand | Quick win (entity) |
| Transactional | peptide website developer, RUO peptide website design, peptide store builder | `/services/ruo-peptide-website-development` | Live, not indexed | 5 | Fiverr gigs and Dribbble only | **Money page** |
| Transactional | peptide SEO agency, hire peptide marketing agency | `/services/seo-geo-aeo` | Live, not indexed | 4 | Listicles and 3 specialist agencies | Money page |
| Transactional | peptide store audit | `/services/site-audits` | Live, not indexed | 4 | Not seen in results | Quick win |
| Transactional | peptide fulfillment, peptide 3PL, peptide dropshipping, peptide wholesale services | `/services/fulfillment-logistics` and `/services/wholesale-dropshipping-3pl` | Live (new page) | 5 | 3PLGuys, RapidFulfillment, Real Peptides | Money pages |
| Commercial investigation | best payment processor for peptides, high-risk merchant account research peptides | `/services/payment-processing` + guide `payment-processing-for-ruo-stores` | Live, not indexed | 5 | Processor and affiliate content | Money page + pillar |
| Commercial investigation | wholesale vs dropshipping vs 3PL | `/resources/wholesale-vs-dropshipping-vs-3pl-for-ruo-brands` | Built, merged, live | 4 | Thin | Pillar |
| Commercial investigation | Shopify vs WooCommerce vs custom for peptide stores | **new guide** | Not built | 4 | Vendor pitches (Swell) | Pillar. Needs platform terms verified |
| Commercial investigation | peptide affiliate software, peptide email platform | `/services/affiliate-management`, `/services/email-marketing` | Live, not indexed | 3 | Affiliate networks | Support |
| Commercial investigation | Peptomoon vs competitor agencies | **new comparison** | Not built | 3 | None | Only with verified facts about competitors |
| Problem-aware / urgent | Stripe shut down peptide account, PayPal froze funds peptides | `/resources/payment-processor-shut-down-account` | Live, not indexed | 5 | Spam network, vendor posts | **Quick win + money** |
| Problem-aware / urgent | Meta ad account disabled peptides | **new guide** | Not built | 3 | No Meta policy in results | Blocked until the Meta page is read |
| Problem-aware / urgent | Shopify banned peptide store | **new guide** | Not built | 3 | Vendors | Needs platform terms |
| Problem-aware / urgent | peptide store not ranking | `/services/seo-geo-aeo` | Live | 3 | Fiverr SEO gigs | Support |
| Problem-aware / urgent | chargebacks peptides | **new guide + evidence template** | Not built | 4 | Fena, SeamlessChex | Pillar |
| Informational | how to start a research peptide business | **new pillar guide** | Not built | 5 | Thin vendor pages | **Pillar** |
| Informational | how to verify a COA (HPLC/MS) | `/resources/review-a-peptide-suppliers-documentation` | Live, not indexed | 4 | Supplier-run guides | Pillar |
| Informational | RUO labelling requirements, FDA | `/resources/ruo-label-is-not-a-compliance-strategy` | **Held until counsel review** | 4 | Vendor blogs | Pillar |
| Informational | peptide business license / LLC, state rules | **new guide** | Not built | 3 | Vendor blogs | Needs counsel |
| Informational | how to ship peptides legally | **new guide** | Not built | 3 | Vendor policies | Needs carrier terms verified |
| Informational | cost to start a peptide company | **new guide** | Not built | 4 | No reliable source | Needs your real figures |
| Definitional (AEO) | what is RUO, COA, HPLC purity, high-risk MCC, chargeback ratio, 3PL | `/glossary` | Built, merged, live | 3 | Vendor guides | **Quick win** |
| Tools / templates | COA checklist PDF, supplier vetting checklist, launch checklist, cost calculator | **new assets** | Not built | 4 | Thin | Link-earning assets |
| Local / geo-modified | peptide business [state] | none | **Do not build** | n/a | n/a | No real local presence, so these would be doorway pages |
| Secondary audience | researcher and buyer intents | none | **Do not build on this domain** | n/a | n/a | Peptomoon is B2B services. Consumer-facing product intent would dilute the entity. Use a separate brand if ever needed |

### 23.2 Competitors (summary of section 17)

Top 10 set, identified from live results: Peptide Marketing, Ads Digitally, Velixa Labs, Avenue Z, Instabill, Corepay, SeamlessChex, 3PLGuys, RapidFulfillment, Real Peptides (adjacent). Content-site competitors for informational queries: peptidesetup.pages.dev, thefinrate, Finnrick, and the stonevillenc.org spam network (not a model).

| Brief asks for | Status |
|---|---|
| DR, organic traffic, backlinks | **Not measured** (Ahrefs plan, Semrush units) |
| Top pages, content formats | **Done at result level** (section 17.1): directories, listicles, programmatic wholesale clusters, supplier microsites |
| Schema | Not checked for competitors |
| AI citation share | **Not measured**. None of the 30 prompts cited Peptomoon. Competitor share needs the real assistants |
| What they rank for that we do not | **Done at topic level** (section 18.1) |
| Where we can beat them | **Done** (section 17.3): depth, primary-source citations, proof from case studies, honest limits, freshness |
