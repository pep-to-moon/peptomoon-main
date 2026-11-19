# 02. Official SEO, GEO and AEO research, and the free-tool register

Researched 19 November 2026. Primary sources were fetched and read directly. Evidence classes used throughout the project:

1. **Documented requirement** (stated by the search engine itself)
2. **Confirmed platform behaviour** (observed and consistent with documentation)
3. **Credible research** (peer-reviewed or well-sourced, with stated limits)
4. **Reasonable hypothesis** (plausible, unproven)
5. **Unverified theory** (do not act on it)

## 1. Google (class 1 unless marked)

| Topic | What the documentation says | Source (read 19 Nov 2026) | Consequence here |
|---|---|---|---|
| Eligibility | A page is eligible for indexing if Googlebot is not blocked, it returns HTTP 200 and it has indexable content. Indexing is never guaranteed | developers.google.com/search/docs/essentials/technical | Being in the sitemap proves nothing. Indexing must be confirmed in Search Console |
| AI features | AI Overviews and AI Mode need no extra requirements or special optimisation. A page must be indexed and snippet-eligible. Allow crawling in robots.txt **and** the CDN or host. Make content findable through internal links, put key content in text, keep structured data matching visible text. AI features traffic is counted in the normal Web performance report | .../appearance/ai-features (read in Japanese because of geo-redirect; content unambiguous) | No GEO-specific build is needed. Current robots and static HTML already meet it |
| AI optimisation guide | "AEO" and "GEO" are SEO from Google's perspective. Create non-commodity content with a unique point of view. You can ignore: `llms.txt` and other special files (Google ignores them; harmless to keep), content "chunking", rewriting content for AI, seeking inauthentic mentions, and over-focus on structured data. Creating separate pages for every query variation to manipulate AI answers violates the scaled content abuse policy. There is no ideal page length | .../fundamentals/ai-optimization-guide | Keep the existing `llms.txt` (neutral). Do not build "AI schema", do not mass-produce long-tail pages |
| Helpful content and E-E-A-T | Trust is the most important element. Ask "Who, How and Why". Clear sourcing, evidence of expertise and background about the author or publisher help. YMYL topics need high accuracy and alignment with expert consensus | .../fundamentals/creating-helpful-content | Payments and regulatory guides sit near YMYL. Named accountability and primary sources are the gap (doc 19) |
| Spam policies | Doorway abuse (pages made to rank for similar queries) and scaled content abuse (many pages without added value, including via generative AI) are violations | .../essentials/spam-policies | Rules out geography pages and keyword-variant articles. Every new guide needs a distinct purpose |
| Sitemaps | Google ignores `<priority>` and `<changefreq>`. It uses `<lastmod>` only if consistently and verifiably accurate | .../crawling-indexing/sitemaps/build-sitemap | The single shared lastmod constant carries no signal (T-03) |
| Links | Google can reliably crawl `<a href>` links. JavaScript-injected links are fine if they use that markup | .../crawling-indexing/links-crawlable | All site links are real anchors: pass |
| JavaScript | Googlebot renders JavaScript but server-rendered HTML is most reliable | .../javascript/javascript-seo-basics | Static prerendering is the safest option and is in place |
| Snippets | A meta description may be any length; Google truncates as needed and may rewrite it | .../appearance/snippet | The "155 characters" figure in my earlier audit is a display heuristic, not a rule. Only fix descriptions that mislead or truncate a key claim |
| Core Web Vitals | LCP within 2.5 s, INP under 200 ms, CLS under 0.1 | .../appearance/core-web-vitals | Used as the targets in doc 04 |
| FAQ rich result | No longer shown in Google Search. Documentation removed after a May 2026 changelog entry | developers.google.com/search/updates | FAQPage markup is harmless but gives no SERP benefit |
| Not read in full | SEO Starter Guide (served in Portuguese by geo-redirect), Search Essentials landing page, Search Quality Rater Guidelines PDF | | Findings above do not depend on them |

## 2. Bing and Microsoft

| Topic | Finding | Class | Source |
|---|---|---|---|
| Sitemaps and `lastmod` | Bing's July 2025 Webmaster Blog says `lastmod` is a key signal for recrawling and should track real content edits, not sitemap generation time | 1 | blogs.bing.com/webmaster (via search; page not fetched directly) |
| IndexNow | A change-notification system complementary to sitemaps, not a replacement for quality or crawling | 1 and 2 | Bing coverage via search |
| AI Performance report | Public preview since February 2026 in Bing Webmaster Tools: citations in Copilot and Bing AI, page-level citations and "grounding queries". Free with a verified site. No click or traffic data. Microsoft ecosystem only | 2 | Search coverage; verify in the tool |
| Webmaster Guidelines | The official guidelines page is a JavaScript app that cannot be fetched by script, so I could not read it directly. Secondary sources describe originality, relevance, crawlability and speed | 4 until read in the browser | |

## 3. OpenAI and Perplexity (class 1)

| Crawler | Purpose | Rule | Source |
|---|---|---|---|
| `OAI-SearchBot` | Surfaces sites in ChatGPT search. Sites that opt out are not shown in ChatGPT search answers | OpenAI recommends allowing it and its published IP ranges. Robots changes take about 24 hours | developers.openai.com/api/docs/bots |
| `GPTBot` | Training of generative models | Independent of OAI-SearchBot. Allow or disallow separately | same |
| `ChatGPT-User` | User-triggered browsing | per OpenAI | same |
| `PerplexityBot` | Perplexity search results. Not used for training | Allow it and its IP ranges. WAF allow-listing may be needed | docs.perplexity.ai/guides/bots |
| `Perplexity-User` | User-triggered fetches | Generally ignores robots.txt because a person asked | same |

**Peptomoon status:** all of these are explicitly allowed in `robots.txt`; Vercel serves them without a WAF block (the site returned 200 to a Googlebot user agent and to plain curl). Whether Vercel's bot protection ever blocks them cannot be tested from here: check Vercel Firewall settings (doc 10).

## 4. Credible research (class 3) and what it does and does not show

- **GEO: Generative Engine Optimization** (Aggarwal et al., KDD 2024, arXiv 2311.09735). In the authors' own benchmark of generative engines, adding citations, quotations and statistics raised source visibility by up to about 40 percent. Limits: a research benchmark, not Google or ChatGPT in production; the best-method figure, not the typical gain; I did not find the paper's own numbers for keyword stuffing, so any claim about it is secondhand. Use it as support for sourced, quotable, data-rich content, which also happens to be good SEO.
- Search-ecosystem studies on AI Overviews click-through and citation overlap are mostly vendor-run. I did not rely on any of them.

## 5. What is established, and what is not

| Practice | Verdict |
|---|---|
| Crawlable, indexed, snippet-eligible pages | Required (class 1) |
| Unique, sourced, non-commodity content with named accountability | Strongly supported (class 1) |
| Accurate structured data matching visible text | Recommended (class 1); not required for AI |
| `llms.txt` | Google ignores it; harmless; no evidence it helps other engines (class 5 for ranking benefit) |
| FAQ schema for rich results | Dead for Google (class 1) |
| Chunking, "AI schema", rewriting for AI | Not needed per Google (class 1) |
| Bing `lastmod` accuracy and IndexNow | Documented by Bing (class 1), Bing and Copilot only |
| "Bing and IndexNow make you visible in ChatGPT" | Not documented by OpenAI (class 5). Peptomoon's own copy said this; corrected in doc 15 (C-07) |

## 6. Free-tool register

State of each tool: what it is for, whether it is genuinely free, limits, why chosen, and whether it was used.

| Tool | Used for | Free? | Limits | Used in this project |
|---|---|---|---|---|
| Google Search Console | Indexing, queries, pages, CTR, AI features, sitemaps, URL Inspection | Yes | 1,000-row UI exports; 16 months of data | **Not available**: domain not verified (no TXT record, no meta tag) and the connector refused connections |
| Bing Webmaster Tools | Bing performance, crawl, Site Scan, backlinks report, AI Performance | Yes | Needs verified site | Not available. `BingSiteAuth.xml` exists, so verification may be done; access not confirmed |
| Google Analytics 4 | Organic sessions, landing pages, conversions | Yes | Standard GA4 limits | Installed and live; no access to the property from here |
| Microsoft Clarity | Behaviour recordings, heatmaps | Yes | Policy limits for EEA/UK without consent signal | Installed; no access |
| Looker Studio | Free dashboards on GSC, GA4 and Sheets | Yes | Connector limits | Specified in doc 18, not built (needs your accounts) |
| Google Keyword Planner | Search volume ranges | Free with a Google Ads account, ranges only without spend | Needs login | Not accessible. Replaced by autocomplete and Trends |
| Google Trends (via a free-tier connector) | Relative interest | Free tier: 100 requests a month, 70 left after 2 uses | Returns indexed 0 to 100 data, shows 0 below a volume threshold | 2 queries used; both returned almost all zeros (doc 06) |
| Google and Bing autocomplete endpoints | Demand signals, intent, modifiers | Yes, unauthenticated | Not volume data; US location | 57 seeds and 8 alphabet expansions (695 suggestions) |
| Web search (session tool) | SERP composition, competitor identification, AI-style test questions | Included in the session | A proxy, not Google's index; no People Also Ask | 21 searches |
| Ahrefs free Domain Rating endpoint | Domain Rating of any domain | Yes, 0 units | Rating only | 24 domains |
| Ahrefs Webmaster Tools | Backlinks and site audit for verified own site | Yes, for verified sites | Own site only | Recommended (doc 12); needs verification |
| Ahrefs and Semrush paid tools | Keywords, backlinks, rankings | **No** | Free plan has no Site Explorer access; Semrush has no units | **Not used**, per your free-only rule |
| Playwright with Edge | Lab performance (LCP, CLS, long tasks) under mobile throttling | Yes, project dependency | Lab data only, not field data | Used |
| Lighthouse | Lab audit | Yes (Chrome DevTools) | Running it through a remote package was blocked in this environment | Not run: use DevTools locally |
| PageSpeed Insights | Lab and CrUX field data | Yes | The shared API quota returned 429 | Not available |
| Screaming Frog (free) | Crawl | Yes up to 500 URLs | 500-URL cap (the site has 38) | Replaced by a custom Node crawler (`crawl2`) with the same coverage |
| Rich Results Test and Schema Validator | Structured data validation | Yes | Manual, one URL at a time | Not run here: schema checked by reading JSON-LD; manual validation listed in doc 16 |
| Custom scripts with project dependencies | Crawl, link graph, similarity, GSC export verification | Yes | | Used |
