# 02. Portfolio audit: the six existing sites

Legend: [O] observed (live HTML, response headers, sitemaps, screenshots, local repos), [R] reported by a text-only page fetch, [A] assumption or recommendation.
Method: homepage HTML and headers downloaded directly on 2026-11-17, sitemaps and robots files read, shop, product and about pages read through a text fetcher, homepage screenshots taken with headless Edge. Nothing below describes internal code beyond what repos in `F:\Belk Digital Projects` show.

## 1. What is confirmed about all six

- Footer credit "Designed & Developed by Belk Digital" with a link to belkdigital.com on all six [O/R].
- `X-Powered-By: Next.js, Payload` header on all six [O]. Product images served from Cloudflare R2 public buckets on all six [O/R].
- Each runs GA4. Microsoft Clarity on five (not Amino Based). A Meta Pixel call (`fbq`) is present on Helix only [O].
- Every homepage has a title tag, meta description, canonical URL, Open Graph and Twitter card tags, and at least one h1 [O].
- Structured data present on every homepage: Organization, WebSite, WebPage and FAQ Question/Answer entities. See section 5 for what that means now.
- Age and research-use gate shown on arrival on five sites [O, screenshots]. Helix showed an animated loading screen in the capture, so its gate was not observed.

## 2. The six side by side

| | 99 Purity Peptides | Veracue Labs | Helix Bio Chem | PrimeTime BioLabs | Certified Aminos | Amino Based |
|---|---|---|---|---|---|---|
| URL | 99puritypeptides.com | veracuelabs.com | helixbiochem.com | primetimebiolabs.com | certified-aminos.com | aminobased.com |
| Hosting header | Vercel | Vercel | Vercel | Vercel | Vercel | Railway |
| Canonical host | apex | apex | apex | www | www (apex 308 redirects) | apex (www 301 redirects) |
| Local repo found | Yes (Next 16.2.6, Payload 3.84.1) | Yes (same stack, README documents it) | No match found | Yes (Next 16.3.4, Payload 3.88) | No match found | No match found |
| Sitemap size | 188 entries reported by a tool summary, only 94 verified (first chunk) | 115 URLs: 14 pages, 95 products, 6 blog | about 220 URLs: 14 pages, 98 products, about 108 articles | 69 URLs: 15 pages, 21 products, 33 blog | 116 URLs: 13 pages, 51 products, 52 articles | 65 URLs: 15 pages, 50 products, 0 blog |
| Gate | 21+ with Google sign-in option | 18+ | not observed | 21+ | 21+ | 21+ |
| Visual identity (gate screen) | Warm off-white and deep teal, wide extended display type, macro vial photo with water droplets | Neutral white and grey, heavy grotesque headline, copper rule, vial-in-water photo | Near black, cyan particle loader, light wide-tracked type | Black with indigo and violet accent, extended display type | Deep navy with acid lime button, extended display type | Warm off-white on black, cyan-blue accent, heavy humanist sans, molecule logo |
| Standout features seen | EN and ES with hreflang, member-gated catalogue ("40+ products open to members", 20% member price), 5 and 10 kit pricing, Trustpilot widget, batch COA PDF link on product page | 95 products including 48 nasal sprays, mega-menu panels, `llms.txt` advertised in headers, tests and blog import tooling in repo | Largest article library, wholesale mention, Product and ItemList schema on homepage, 8 category tiles | Product schema, dated SEO audit files in repo, peptide calculator, COA hub | Sale pricing display, 13 best-seller cards, COA hub, "Lab Supplies" category | Per-product technical dossier accordions, net-30 institutional terms in FAQ, theme-color and zoom-friendly viewport |
| Payments seen | Text list: Pay, PayPal, Zelle, Visa, Amex, Mastercard | PayPal and Visa logos | not observed | "paid in full before processing" in FAQ | not observed | Cards, P-cards, ACH and wire in FAQ |
| i18n | EN and ES | English only | English only | English only | English only | English only |
| HTML caching | Cacheable (`max-age=0, must-revalidate`, Vercel cache status seen) | Cacheable | `no-store` (dynamic) | `no-store` | `no-store` | `no-store` |
| Homepage HTML size (uncompressed) | about 1.0 MB | 0.43 MB | 0.45 MB | 0.18 MB | 0.36 MB | 0.36 MB |

Differences that must stay visible in case studies [O]: not all six share hosting, language support, catalogue gating, caching behaviour or content scale. "Do not assume identical" holds.

## 3. Observations that cut across the six

Structure and SEO [O]:
1. **No category landing pages.** Category filtering is `?category=` on `/shop` on every site, and no sitemap lists a category URL. Whether those filtered URLs canonicalise to `/shop` was not checkable from the head of the homepage. For stores whose buyers search by category, indexable category pages are the largest structural SEO opportunity visible across the portfolio.
2. **Sitemap and content mismatches.** Amino Based's sitemap lists zero blog URLs though it has a Research section. Veracue's three homepage blog posts are absent from its sitemap.
3. **Footer and link inconsistencies.** Certified Aminos lists refund, shipping and disclaimer pages in the sitemap but not in the footer, and its FAQ links `/contact` while the nav uses `/contact-us`.
4. **FAQ markup** is present on all six homepages. It no longer produces rich results (file 01, section 4). Keep or remove by preference. It does no harm and has no confirmed benefit.
5. **Duplicate-pattern risk across domains [A].** Helix, Veracue and Amino Based share the same eight category names (GLP-1 and Metabolic; Healing and Recovery; Longevity and Anti-Aging; Cognitive and Nootropic; Growth Hormone Secretagogue; Sexual and Hormonal; Cosmetic and Skin; Nasal Sprays) and similar homepage section sequences (military discount with ID upload, four-step process, "Compliance Notice" blocks). Visual identities differ strongly, but content patterns overlap. Worth checking for near-duplicate text across domains.
6. **Performance questions to test, not assume.** Four sites return uncacheable HTML. 99 Purity's homepage HTML is about 1 MB uncompressed with 96 inline RSC chunks and 89 h3 elements. Run PageSpeed Insights and field data before claiming anything about Core Web Vitals.

Claims and consistency [O/R], listed so the owner can decide what to correct:
- The same headline statistic "30K+ vials shipped to U.S. labs" appears on the shop pages of both PrimeTime and Helix. Helix's homepage says "10,000+ vials fulfilled".
- Certified Aminos shows "98% researcher trust", "50K+ loyal customers", "12+ peer-reviewed studies" and "+82% collagen synthesis" on its homepage, and its GLP-3RTA page says purity is "not independently verified for this listing" while a "Verified Purity ≥99%" label is shown.
- 99 Purity says "minimum 99% purity" on the homepage and "95% to 99%+" in its shop FAQ. Amino Based shows a chromatogram graphic labelled "95.5% Purity" next to "Peak 99.8%".
- "Ships Worldwide" badge on Helix and Certified Aminos product pages versus US-only supply text.
- Product counts in copy do not match sitemaps (Helix "50+" versus 98 product URLs, Veracue "40+" versus 95, Amino Based "50+", "98 master compounds", "50 results").
- Price mismatches between listing and product page on Certified Aminos (GLP-1TRZ $199 versus $149, Semaglutide $129 versus $119).
- Helix homepage uses avatar images from `i.pravatar.cc` and an Unsplash image. Confirm they are not presented as customer testimonials.
- Veracue's gate is 18+ while the other five use 21+. Hardproof, for comparison, uses 21+.

Compliance-sensitive elements [O], not conclusions: peptide calculator pages, bacteriostatic water products, reconstitution steps in an FAQ, "per spray" counts for nasal sprays, outcome-leaning phrases ("accelerated tissue healing", "rebuild collagen, repair tissue and restore youthful function", a customer quote about how someone "looks and feels"), and regulatory-timeline statements on retail product pages that age quickly. These match the types of elements the reported FDA letters cite (file 01, section 4). Recommendation [A]: qualified counsel reviews the live sites before they headline a compliance-oriented brand.

## 4. Case-study readiness

Rule from the brief: no fabricated requirements, technologies, metrics or testimonials, and no thin pages written only to capture keywords.

| Site | Verified material available | Missing | Recommendation |
|---|---|---|---|
| Veracue Labs | Live site, repo README (stack, tests, blog import tooling, rate limiting, observability), sitemap, structured data, `llms.txt`, catalogue scale | Business goals, scope of work, dates, results | Full case study once scope is confirmed |
| 99 Purity Peptides | Live site, repo, hreflang EN/ES, gated catalogue and kit pricing, COA links, docs folder content files | Same as above | Full case study once scope is confirmed |
| PrimeTime BioLabs | Live site, repo, dated audit files (canonical double slash, duplicate product URLs, title length, FAQ hub, 2026-09-26 to 09-28) | Audit outcomes, GSC data | Strongest "ongoing maintenance and SEO" story. Full case study once outcomes confirmed |
| Helix Bio Chem | Live site only | Everything beyond what is observable | Hub card now, page noindex until material exists |
| Certified Aminos | Live site only | Same | Same |
| Amino Based | Live site only, hosted differently from the others | Same | Same |

For every case study the template needs these fields per section: `value`, `source` (repo file, owner statement, GSC export, live observation), `verifiedOn`, and `status` of `verified` or `needs-confirmation`. Production builds fail if a rendered field is `needs-confirmation`. That mechanically prevents fabricated content.

## 5. Portfolio screenshot plan

- A Playwright script captures each site at 1440 by 900 and 390 by 844 plus a tall full-page capture, after dismissing the age gate by setting its own acknowledgement state (found in each site's code or storage), then records capture date and URL in a manifest.
- Images are converted with `sharp` to AVIF and WebP in three widths and stored under `public/portfolio/<slug>/`.
- Screenshots are labelled "captured on [date]" because the live sites change. A rerun command refreshes them.
- Capturing and showing product pages means product names appear on Peptomoon. Counsel and the owner should decide whether to crop, blur or select pages (question in file 03).

## 6. Opportunities if you want them

- Footer credits on the six sites could point to the new brand's case study pages. They are contextual links from relevant domains. Footer credit links normally carry limited weight and should not be treated as a link-building tactic [A].
- The category URL gap, sitemap gaps and claim inconsistencies above form a ready-made maintenance backlog, and a credible "ongoing maintenance" story once fixed.

## 7. Corrections to earlier text-fetch reports

- A text fetch reported "no age gate observed". Screenshots show a gate on five sites.
- Certified Aminos was reported as an apex site with a www sitemap. Direct requests show apex 308 redirects to www and the canonical is www, which is consistent.
- Amino Based was assumed to be on Vercel. Its server header is Railway.
- Structured data, canonical tags and meta descriptions were reported as "not observable". They are now observed from the downloaded HTML.
