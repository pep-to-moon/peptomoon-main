# 15. Implementation log

All changes below are in the working tree on top of commit `e708a28`. **Nothing is committed or deployed**; you commit and push yourself. Changes made on 18 November (late LCP, `llms-full.txt` links, `legalName`) were already shipped in your commits and are recorded in doc 04. Date of this log: 19 November 2026. 56 files changed, 381 insertions and 254 deletions, plus 3 new files in the codebase (two content modules and a crawl script) and this documentation folder.

## 1. What changed and why

| ID | Change | Files | Evidence and reason | Status |
|---|---|---|---|---|
| C-01 | Each of the 15 service pages now has its own section headings naming its topic (for example "What peptide payment processing involves"). Fixed utility headings stay. `whyTitle` still wins where set | `src/content/service-headings.ts` (new), `src/components/services/service-page.tsx` | All 15 services shared 17 identical, keyword-free H2s (doc 05). After: only 6 H2s are shared, all deliberate utility headings (Process, limits, Read next, Partner-built sites, Guides, call-to-action band) | Implemented |
| C-01 guard | `check:content` now fails if two services share a section heading or a new service has no heading entry | `scripts/check-content.ts` | Prevents the template problem returning | Implemented |
| C-02 | US spelling across copy, metadata, alt text, schema topic list and glossary terms (211 replacements across 45 files): catalogue→catalog, organisation→organization, programme→program, optimisation→optimization, labelled→labeled, analyse→analyze, behaviour, centre, prioritise, summarise, recognise, colour, licence, judgement, favour, modelled and related forms | 45 files under `src/content`, `src/app`, `src/components`, `src/lib`, plus one e2e assertion | A US-targeted site used UK forms (`catalogue` ×76 against 0 `catalog`); US autocomplete shows "peptide catalog" with 10 suggestions against 1 for "catalogue". Left unchanged on purpose: `src/content/legal.ts` (reviewed policy text), the other contributor's `site-intro.tsx`, and third-party licence headers in `particles.tsx` and `threads.tsx` | Implemented |
| C-03 | Search Console block retitled "What a partner-built RUO store reaches in Google" with an intro saying the figures belong to that store, were exported by its owner and are shown without its name, and are not Peptomoon's own | `src/components/sections/home/gsc-reach.tsx` | Doc 08: figures verified genuine, but "one of our stores" misattributes ownership | Implemented |
| K-01 | `/all-in-one` meta description now says "no rolling reserve for qualifying merchants" | `src/app/all-in-one/page.tsx` | Unqualified rate and reserve claim in the snippet (doc 19) | Implemented |
| C-07 | Three claims about AI visibility reworded to match documentation: the service card no longer says "citations in ChatGPT, Perplexity and AI Overviews" as an outcome; "Bing and IndexNow for ChatGPT and Copilot visibility" became "Bing Webmaster Tools and IndexNow for Bing and Copilot discovery"; the GEO definition in the FAQ says no one can guarantee a citation | `src/content/all-in-one.ts` | OpenAI documents OAI-SearchBot, not IndexNow, for ChatGPT search (doc 10) | Implemented |
| C-11 | SEO service retitled "SEO for Peptide Businesses, Plus GEO and AEO"; its primary keyword is now "SEO for peptide businesses" | `src/content/services/seo-geo-aeo.ts` | The phrase people type has footprint (3 suggestions); "peptide SEO GEO AEO" has none. Direct competitors are DR 0.6 to 9 | Implemented |
| C-05 | Wholesale guide retitled "Wholesale, Dropshipping or 3PL for an RUO Brand" | `src/content/articles/wholesale-dropshipping-3pl.ts` | Its title was nearly identical to the service title | Implemented |
| C-12 | Two passages that said "Our guide explains the difference" now say "Ask your counsel how they apply to your products" | `src/content/services/compliance-support.ts` | The guide is hidden until counsel review | Implemented |
| C-10 | Three long meta descriptions shortened (cosmetic; Google sets no limit) | why-peptomoon page, telehealth and vial-label services | Doc 04 | Implemented |
| L-02 | Service copy renders inline links through the existing `Inline` component; every service now links to "All guides" and, where it lists case studies, "All case studies" | `service-page.tsx` | Services could not carry contextual links (doc 09) | Implemented |
| L-01 | Contextual links added: home to `/why-peptomoon`; About to `/why-peptomoon`, `/glossary` and `/editorial-policy`; guides hub to `/glossary`; fulfilment service to the wholesale decision guide; payments service to the shutdown and underwriting guides; wholesale service to fulfilment; SEO service to the GEO and AEO glossary entries | `why-us.tsx`, `about/page.tsx`, `resources/page.tsx`, four service content files | `/why-peptomoon` and `/glossary` had 0 body links (doc 09) | Implemented |
| L-01a | Guides link the first mention of 12 glossary terms to `/glossary#term` | `src/components/resources/rich-text.tsx` | The glossary received no contextual links | Implemented |
| T-03 | Sitemap `lastmod` now comes from a per-page lookup with a documented rule (only substantive edits count); `priority` and `changefreq` removed from the output | `src/lib/routes.ts`, `src/app/sitemap.ts` | Google ignores priority and changefreq and uses lastmod only if accurate; Bing says the same (doc 02) | Implemented |
| GEO-001 | `llms.txt` and `llms-full.txt` make service-copy links absolute and drop links to unpublished guides | `src/lib/llms.ts` | New inline links in services would otherwise be relative | Implemented |
| G-05 | New guide "Search and AI visibility for RUO peptide stores: what Google, Bing and OpenAI document": 3,600 words, 16 sections, 3 tables, 7 questions, 11 dated primary sources, each opened and read on 19 November. Linked from the SEO and site-audit services and the store-architecture guide | `src/content/articles/search-ai-visibility.ts` (new), `articles/index.ts`, three related lists | Fills the Grow-pillar gap and gives the SEO service its proof page; fixes the site's own GEO claims. Passes the existing guide guards | Implemented |
| Tooling | The crawl script used for this audit is saved so the inventory can be refreshed | `scripts/seo-crawl.mjs` (new) | Doc 03 says "re-run the crawl script" | Implemented |

## 2. What I deliberately did not change

| Item | Reason |
|---|---|
| Homepage title and description | Already sound; the phrase has no demand but works as brand language |
| `/all-in-one` title ("Peptide & Telehealth") and the reconstitution-calculator copy | Positioning and counsel decisions (POS-02, K-02, K-03) |
| `legal.ts`, `site-intro.tsx` | Reviewed policy text; another contributor's in-progress file |
| Service URLs, slugs, redirects | No evidence justifies a URL change; there are no 301s in this pass |
| Entity, author, address, testimonial or credential content | Needs real facts from the owner (E-01); never invented |
| Case-study challenges and outcomes | Unconfirmed by owners (C-09) |
| New guides G-01 (start a business) and G-02 (white label) | Need a counsel route and a supplier-disclosure decision first |
| Event tracking (`cta_click`, quiz steps) | The event names are your reporting contract; confirm first (M-02, M-03) |
| The stale hover-preview e2e test | Belongs to the services-hub redesign by the other contributor (see doc 16) |

## 3. Migration and URL implications

None. No existing URL, slug, canonical or redirect changed. One new URL was added (`/resources/search-and-ai-visibility-for-ruo-peptide-stores`), already in the sitemap. Two titles changed (SEO service, wholesale guide); expect Google to re-evaluate them on recrawl and keep an eye on those two pages' impressions once Search Console exists.

## 4. Open follow-ups created by this pass

1. Commit and deploy (not Friday; not 26 or 27 November). Fetch and merge `origin/main` first.
2. Update `PAGE_UPDATED` in `src/lib/routes.ts` whenever a page changes in substance.
3. After deploy, run `node scripts/seo-crawl.mjs https://peptomoon.com scratch/live.json` and compare against doc 16.
4. When the regulatory guides are published, relink the two compliance-support sentences back to them.
