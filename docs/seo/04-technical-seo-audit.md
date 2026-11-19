# 04. Technical SEO audit

Audited 19 November 2026 on the live site and the repository at `e708a28`. Evidence tags: **VERIFIED** (measured here, method given), **LIKELY**, **NEEDS VERIFICATION**. Issue IDs continue into doc 14.

## 1. Crawling and indexing

| Check | Result | Evidence |
|---|---|---|
| robots.txt | Pass. `*` allows `/`, disallows `/api/`; one explicit allow group for 42 named crawlers (OAI-SearchBot, GPTBot, ChatGPT-User, Claude-SearchBot, ClaudeBot, PerplexityBot, Perplexity-User, Google-Extended, Bingbot, Applebot and others); sitemap declared. Googlebot is not named and falls under `*` | VERIFIED `curl https://peptomoon.com/robots.txt` |
| XML sitemap | Pass. 38 URLs, all 200, all indexable, none redirecting. Contains image entries. | VERIFIED |
| Sitemap accuracy | Weak. One constant (`SITE_UPDATED`) sets `lastModified` for 14 static pages, 15 services and 3 case studies; `priority` and `changefreq` are present and ignored by Google | VERIFIED `src/lib/routes.ts` |
| Canonicals | Pass. Self-referencing absolute URL on all 38 pages, equal to `og:url` | VERIFIED crawl |
| Duplicate URLs and parameters | Pass. Uppercase paths and `/index.html` return 404; `/path/` returns 308 to `/path`; `?utm_source=` and `?page=2` return 200 with the clean canonical | VERIFIED |
| Host consistency | Pass with one note. `http://` and `www` go to `https://peptomoon.com` in one 308. `http://www.` takes two hops (via `https://www.`) | VERIFIED `curl -sI` |
| Redirect chains | One two-hop chain (above). No chains inside the site | VERIFIED |
| Broken links | None. 59 unique internal link targets, all 200. Internal links to unpublished guides are removed from HTML | VERIFIED |
| 404 and soft 404 | Pass. Unknown URL returns real 404 with `noindex` | VERIFIED |
| Orphan pages | None. Lowest body-link counts: `/why-peptomoon` 0, `/glossary` 0 (both linked from header and footer only) | VERIFIED crawl |
| Noindex | No accidental noindex or `X-Robots-Tag` on any of the 38 pages. Preview deployments are noindexed by header and robots | VERIFIED |
| Crawl depth | Max 2 clicks from the homepage via the header; every page in the sitemap is also in the footer or hub | VERIFIED |
| Pagination, faceted navigation | None exist. Resources hub lists all items on one page (8 guides) | VERIFIED |
| Is anything actually indexed? | **Unknown.** No Search Console. The proxy search returned no peptomoon.com pages. Do not assume indexing | NEEDS VERIFICATION (T-01) |

## 2. Rendering

| Check | Result |
|---|---|
| Strategy | Static prerender for every content page; only the two API routes are dynamic (build output) |
| Content without JavaScript | All headings, body text, FAQs, tables and links are in the server HTML (homepage 698 KB raw, 62 KB Brotli). VERIFIED |
| Hidden-until-JS content | Elements marked `data-reveal` are `opacity: 0` only after an inline script adds the `js` class, and a 4-second failsafe removes the class if the motion layer fails (`layout.tsx`, `globals.css`). Eager hero content no longer depends on it (fixed 18 November). LIKELY safe for Googlebot because it renders JavaScript; confirm with URL Inspection |
| `content-visibility: auto` | Applied to sections on viewports under 1024px (`.cv-auto`). Google documents that it indexes rendered DOM; LIKELY fine. Confirm with URL Inspection "View crawled page" |
| Dynamic metadata | Server-generated per route. Titles, descriptions, canonicals and Open Graph present in raw HTML |
| Links | Real `<a href>` everywhere. Header mega menu and footer links are in the HTML |
| Semantic HTML | `main`, `nav`, `section aria-labelledby`, one H1 per page, no heading-level skips |
| Mobile rendering | Viewport meta present, CLS 0 to 0.024 |

## 3. Metadata (VERIFIED, 38 pages)

- Titles 22 to 60 characters, no duplicates, brand last. Descriptions 107 to 162 characters, no duplicates. Google states there is no length limit for descriptions, so lengths are cosmetic.
- One H1 on every page. The homepage and several heroes render letters in spans for an animation; the H1 also carries an accessible `aria-label` with the full sentence.
- Open Graph and Twitter: complete on every page, `summary_large_image`, per-route 1200 by 630 images, `en_US` locale. `<html lang="en">`.
- Hreflang: not needed (single language, US English).

## 4. Performance (lab, live site, 19 November 2026)

Method: Playwright with Edge, mobile viewport 412 by 823, 1.6 Mbps down, 150 ms RTT, 4x CPU throttle, median of 3 runs, page left 6.5 s after load, real-user mode (intro animation allowed). Lab data only. **Field data (CrUX) does not exist yet, so INP cannot be assessed.**

| Page | LCP | CLS | Long-task excess | Load |
|---|---|---|---|---|
| `/` | 2.21 s | 0.017 | 1,548 ms (14 tasks) | 4.9 s |
| `/all-in-one` | 1.64 s | 0.024 | 790 ms | 3.5 s |
| `/case-studies` | 2.20 s | 0.000 | 766 ms | 3.8 s |
| `/services` | 1.86 s | 0.003 | 1,104 ms | 4.0 s |
| `/why-peptomoon` | 1.69 s | 0.000 | 691 ms | 3.4 s |
| `/services/payment-processing` | 1.76 s | 0.000 | 743 ms | 3.4 s |
| `/resources/payment-processor-shut-down-account` | 1.67 s | 0.000 | 704 ms | 3.4 s |

TTFB about 0.3 s. Transferred HTML (Brotli): home 61.7 KB, all-in-one 43.6 KB, service 26.9 KB, guide 28.8 KB.

- **LCP and CLS pass everywhere** under harsh throttling. The 18 November regression (4.0 to 4.8 s on four pages) is fixed in production.
- **Main-thread work is the watch item.** 0.7 to 1.5 s of long-task excess under 4x CPU, now including GA4 and Clarity, points to INP risk on low-end phones (homepage worst). Treat as a hypothesis until field INP exists (T-04).
- Fonts via `next/font` with swap; images AVIF and WebP via `next/image`; no render-blocking third-party scripts (GA4 and Clarity load `afterInteractive`).

## 5. Structured data (read from page markup; not yet run through Google's Rich Results Test)

| Template | Types emitted | Assessment |
|---|---|---|
| All pages | Organization (logo, image, slogan, knowsAbout, contactPoint email), WebSite | Valid. `sameAs` empty (no profiles exist). `legalName` no longer emitted when it repeats the brand (fixed) |
| Home | + FAQPage | Matches visible FAQ. No Google rich result exists for it |
| Services | Service (serviceType, provider, BusinessAudience), BreadcrumbList, FAQPage | Valid. No `offers`/`price` (correct). `areaServed` is absent and could say United States |
| Guides | Article (headline, dates, image, wordCount, articleSection, author = Organization, publisher), BreadcrumbList, FAQPage | Valid. Author is the Organization, not a Person (honest given no named author) |
| Case studies | Article about a partner-built site, BreadcrumbList | Valid. No Review or AggregateRating (correct) |
| Hubs | CollectionPage with ItemList, BreadcrumbList | Valid |
| Glossary | DefinedTermSet with 22 DefinedTerm | Valid and a good definition resource |
| /all-in-one | WebPage, Service with OfferCatalog (offers without price), BusinessAudience, FAQPage | Valid; no price claims in markup |
| About, Contact | AboutPage, ContactPage | Valid |

No Product, Review, AggregateRating, MedicalWebPage or Drug types anywhere. Structured data matches visible text by construction (generated from the same modules, with a test for FAQ text).

## 6. Security and delivery headers (VERIFIED)

HSTS (2 years), `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, Brotli, no `X-Powered-By`. `Cache-Control: public, max-age=0, must-revalidate` on HTML (Vercel default). No CSP (not an SEO factor). `Link: </llms.txt>; rel="alternate"` on every response.

## 7. Technical issues

| ID | Issue | Evidence | URLs | Source file | Severity | SEO impact | Fix | Status |
|---|---|---|---|---|---|---|---|---|
| T-01 | Search Console not verified or connected | DNS TXT has only SPF; no `google-site-verification` meta; GSC connector refused connections | whole domain | DNS, Vercel env `NEXT_PUBLIC_GSC_VERIFICATION` | P0 | No sitemap submission, URL Inspection or query data; indexing unproven | Add a Domain property, add the TXT record, submit the sitemap (OWNER) | Open |
| T-02 | Bing Webmaster Tools status unknown | `BingSiteAuth.xml` is live; no access | whole domain | `public/BingSiteAuth.xml` | P1 | No Bing or Copilot data; the AI Performance report is unavailable | Confirm verification, submit sitemap, review Site Scan (OWNER) | Open, NEEDS VERIFICATION |
| T-03 | `lastmod` is one shared date; `priority` and `changefreq` ignored | Sitemap XML | 36 of 38 URLs | `src/lib/routes.ts` | P2 | Google ignores unreliable lastmod; Bing uses it for recrawl | Per-page real dates, drop priority and changefreq | **Implemented** 19 Nov (doc 15) |
| T-04 | Main-thread load may hurt INP | Lab long-task excess 0.7 to 1.5 s under throttling | `/`, all pages | `components/motion/*`, WebGL particles, third-party tags | P2 | INP is a Core Web Vital; unknown until field data | Collect field INP from GSC Core Web Vitals after traffic; reduce work only if it fails | Open, NEEDS VERIFICATION |
| T-05 | `http://www.` redirects in two hops | `curl -sI` | host level | Vercel domain settings | P3 | Negligible | Redirect `www` straight to the apex over both schemes (OWNER, Vercel) | Open |
| T-06 | No IndexNow | No key file | whole domain | n/a | P3 | Bing and Yandex only | Add key file and a deploy ping, after the sitemap is submitted | Open |
| T-07 | `sameAs` empty, Article author is an Organization | Organization JSON-LD | all | `src/config/site.ts`, `src/lib/seo/schema.ts` | P2 | Weaker entity signals | Fill `sameAs` and add `Person` author after owner decision (E-01) | Blocked on owner |
| T-08 | `llms-full.txt` linked to a 404 guide | 3 links to the hidden regulatory guide | `/llms-full.txt` | `src/lib/llms.ts` | P2 | Dead links for AI crawlers | Reduce links to unpublished guides to plain labels | **Fixed** 18 Nov, verified live |
| T-09 | `legalName` repeated the brand without a registered entity | Organization JSON-LD | all | `src/lib/seo/schema.ts` | P2 | Misleading entity data | Emit only when different from the brand | **Fixed** 18 Nov |
| T-10 | Late LCP on photo-led pages (4.0 to 4.8 s lab) | Lab test of 18 Nov | `/all-in-one`, `/case-studies`, `/why-peptomoon`, `/services` | `ui/section.tsx`, `ui/photo.tsx`, `globals.css` | P1 | LCP over 4 s is "poor" | `eager` mode so above-the-fold content never waits for JavaScript | **Fixed**, live LCP now 1.6 to 2.2 s |
| T-11 | AI-crawler allowance at the CDN level unverified | robots.txt allows; no Vercel Firewall view | all | Vercel project | P3 | A WAF rule could block OAI-SearchBot or PerplexityBot | Check Vercel Firewall and Bot Protection rules (OWNER) | Open, NEEDS VERIFICATION |
| T-13 | Homepage LCP varies in lab (intro strip is the largest paint) | Lab 2.2 s live, up to 4.0 s in one run | `/` | `components/sections/home/hero.tsx`, `components/layout/site-intro.tsx` | P2 | Field LCP for `/` could fail for first-visit users | Read field LCP after traffic; shorten the intro only if it fails (owner design decision) | Open, NEEDS VERIFICATION |
| T-12 | Rich Results Test and Schema Validator not run | Schema read from markup only | one URL per template | n/a | P3 | Unknown validity warnings | Run both on one URL per template; record results in doc 16 (OWNER) | Open |

## 4a. What is good and should be left alone

Canonicals, redirects, 404 handling, robots, sitemap structure, static rendering, internal-link markup, Open Graph, security headers, Brotli, the homepage title and description, the glossary markup, and the exclusion of unpublished regulatory guides.
