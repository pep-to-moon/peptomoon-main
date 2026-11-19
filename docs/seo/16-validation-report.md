# 16. Validation report

Validated 19 November 2026 on a production build of the working tree (`pnpm build`, served with `pnpm start`), crawled with the project's crawl script and compared with the live site (`e708a28`) crawled the same morning. Each result below was measured, not assumed.

## 1. Automated checks

| Check | Result |
|---|---|
| `pnpm typecheck` | Pass |
| `pnpm lint` (whole repository) | Pass |
| `pnpm check:content` | Pass: 15 services, 9 articles, 3 case studies, 181 source files; unique service headings, unique primary keywords, relations, internal-link resolution, no em dashes or risky phrases, guide length and structure |
| `pnpm build` | Pass: all routes prerendered, including the new guide |
| `pnpm test:e2e` (230 tests: structure, FAQ markup, accessibility with axe on desktop and mobile for every page, sitemap, robots, llms files, 404, contact API) | **229 pass, 1 fails**: see section 4 |

## 2. Before and after (live crawl versus new build)

| Measure | Before (live) | After (new build) |
|---|---|---|
| Indexable URLs in the sitemap | 38 | 39 (new guide) |
| Pages returning 200 | all | all (404 probe returns 404 with noindex) |
| Accidental noindex or X-Robots-Tag | 0 | 0 |
| Pages with exactly one H1 | all | all |
| Duplicate titles / descriptions | 0 / 0 | 0 / 0 |
| Longest title | 60 | 60 |
| Broken internal links | 0 (55 unique targets checked on 18 November) | 0 (39 normalised targets checked on 19 November; the two scripts count targets differently, so the numbers are not comparable, only the zero is) |
| Canonicals present | all | all |
| JSON-LD blocks parse | all | all (minimum 2 per page) |
| H2s shared by two or more service pages | 12 (for example "What it is" ×15) | 6, all deliberate utility headings |
| `catalogue` / `organisation` / `programme` / `optimisation` / `labelled` in main text | 76 / 32 / 17 / 11 / 11 | 0 / 0 / 0 / 0 / 0 |
| UK spellings in titles, descriptions, H1s | 4 | 0 |
| Body links to `/why-peptomoon` | 0 | 2 |
| Body links to `/glossary` | 0 | 8 pages |
| Body links to `/resources` hub | 1 | 13 pages |
| Body links to `/case-studies` hub | 3 | 8 pages |
| Body links to the wholesale decision guide | 3 | 4 |
| `legalName` in Organization markup | present on 38 pages (fixed 18 Nov) | absent |
| `llms-full.txt` relative links / links to hidden guides | 0 / 0 (fixed 18 Nov) | 0 / 0, and service links are absolute |
| Sitemap entries with `priority` or `changefreq` | all | none |
| Sitemap `lastmod` values | one date for 36 URLs | three real dates (6 on 17 Nov, 12 on 18 Nov, 21 on 19 Nov) |
| Changed titles | n/a | 3 (SEO service, wholesale guide, store-architecture guide for spelling) |
| Meta descriptions changed | n/a | 5 |

## 5 templates, lab performance on the new build

Same method as doc 04 (Edge, mobile viewport, 1.6 Mbps, 150 ms RTT, 4x CPU, median of 3), stylesheet confirmed 200 before and after the run.

| Page | LCP | CLS | Long-task excess |
|---|---|---|---|
| `/all-in-one` | 1.47 s | 0.006 | 394 ms |
| `/services/payment-processing` | 1.47 s | 0.000 | 312 ms |
| `/resources/search-and-ai-visibility-for-ruo-peptide-stores` (new) | 1.56 s | 0.000 | 502 ms |
| `/resources/payment-processor-shut-down-account` | 1.48 s | 0.000 | 299 ms |
| `/` | 3.98 s in this run (2.21 s on live; varies run to run) | 0.000 | 1,322 ms |

No regression on templates I changed. The homepage's largest paint is the intro strip and varies widely; see T-13 in doc 14.

## 3. What this validation does not prove

| Not verified | Why | How to close it |
|---|---|---|
| Indexing, impressions, rankings, clicks | No Search Console | Doc 13 |
| Google's rendering of the new pages | No URL Inspection | After deploy, inspect the 8 pages in doc 13 |
| Structured-data validity in Rich Results Test and Schema Validator | Not run here | Run both on one URL per template (T-12) |
| Core Web Vitals in the field (INP especially) | No CrUX data | Search Console Core Web Vitals report after traffic |
| Screen-reader behaviour of the new links | axe passes; no manual screen-reader test | Test on a real device |
| Real mobile phone rendering | Emulated | Open the five templates on a phone |
| Accuracy of every factual claim in the older guides | Spot checks only (doc 05) | Counsel and source review (E-02) |
| Whether the changed titles will be rewritten by Google | Depends on recrawl | Watch Search Console after deploy |

## 4. The one failing test

`tests/e2e/design.spec.ts` "hovering a service row floats its photograph beside the cursor" expects `a[data-preview]` rows on `/services`. Commit `e708a28` (the services-hub redesign by the other contributor) replaced that page with an explorer and did not update the test, and my changes do not touch the services hub, the hover preview or the explorer (confirmed by an empty diff on those files). It is a stale test, not a regression from this work. Update the test to the explorer's markup or remove it when you next work on that page.

## 5. Post-deploy checklist

1. `git status`, commit, push; confirm the Vercel build is green.
2. `node scripts/seo-crawl.mjs https://peptomoon.com scratch/live.json` and confirm 39 URLs, all 200, one H1 each.
3. `curl -s https://peptomoon.com/sitemap.xml | grep -c "<loc>"` returns 39.
4. In Search Console: submit the sitemap, inspect the 8 priority URLs, request indexing for them.
5. Run Rich Results Test on the home page, a service page, a guide and `/glossary`.
6. Record the dated baseline in doc 13.
