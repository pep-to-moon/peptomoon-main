# 10. GEO and AEO audit

Audited 19 November 2026. Governing rule from the brief and from Google's own guidance (doc 02): follow verified platform documentation; do not treat popular GEO techniques as confirmed ranking factors. Evidence classes as in doc 02.

## 1. What is documented

| Platform | What it needs | Peptomoon status |
|---|---|---|
| Google AI Overviews and AI Mode | Page indexed, snippet-eligible, crawlable at robots and CDN level, internal links, text content, structured data matching visible text. No special optimisation | Crawlable and static. **Indexing unproven** (Search Console not verified). Snippets fully allowed (`max-snippet:-1`) |
| ChatGPT search | `OAI-SearchBot` allowed in robots.txt and its IP ranges allowed at the CDN; changes take about 24 hours | Allowed in robots.txt. CDN allowance not verifiable from here (T-11) |
| Perplexity | `PerplexityBot` allowed; `Perplexity-User` generally ignores robots | Allowed in robots.txt |
| Bing and Copilot | Verified site, sitemap, accurate `lastmod`; AI Performance report (public preview) | Verification file present; status unknown; `lastmod` inaccurate (T-02, T-03) |

## 2. Test: do AI-style answers represent Peptomoon?

Six customer-style questions from the brief were run through a web-search tool that returns AI-written summaries with sources. This is a **proxy, not ChatGPT, Perplexity or Google AI Mode**; real testing needs those products (listed in doc 17 as a manual task).

| Question | Peptomoon appeared? | Who was cited | What the answer said |
|---|---|---|---|
| Who builds websites specifically for RUO peptide businesses? | **No** | Velixa Labs (Clutch), Tech Hikers (Dribbble), about 18 Fiverr gigs | Mostly freelancers; "FDA compliant" is a marketing claim; verify before hiring |
| What companies provide e-commerce development for peptide stores? | **No** | Fiverr gigs only | No established agencies found |
| What should an RUO business consider when choosing a fulfillment provider? | **No** | Vendor blogs, `.pages.dev` and spam-network pages | Origin, lead time, cold chain, batch COAs, "vendor pitches" |
| What documentation should an RUO supplier provide? | **No** | Vendor COA guides, PharmaPhorum, many `.pages.dev` and `.manus.space` pages | Lot-matched, independent-lab COA, HPLC plus mass spectrometry, dates; "mostly vendor-run" |
| What technical systems does an RUO business need? | **No** | Supplier sites, a synthesis company | "No source listed a complete set"; the gap Peptomoon's pillar guide targets |
| Which agencies specialise in RUO business infrastructure? | **No** | Contract-lab requests, vendor blogs | Nothing relevant: the category phrase has no established source |

Findings:

1. **Peptomoon is invisible in these answers today**, which is expected for a one-week-old, unverified, DR 0.0 site; it is not evidence of a penalty.
2. **Every answer hedges** ("vendor marketing, verify with an attorney"). That is an opening for a neutral, sourced publisher with named accountability.
3. **The "technical systems an RUO business needs" answer found no complete source.** `infrastructure-behind-an-ruo-peptide-business` is that source in substance; it has no cited sources, which weakens its chance of being quoted.
4. **The cited sources are low quality** (mass-produced domains, press releases). Quality bars will rise; being the careful source matters more than being first.

## 3. Entity and representation

| Check | Result |
|---|---|
| Consistent description | The brand description is identical across title, Organization schema, `llms.txt` and About: pass |
| Entity clarity | Weak. No named person, legal entity, address or external profile; `sameAs` empty; the portfolio is "built by our partner" without naming the partner (doc 19) |
| External mentions | None found. The brand query returned nothing in the proxy |
| Source credibility | Guides cite few sources (3 of 6 none) |
| Citation potential | Good raw material: neutral stance, tables, dated guides, a 22-term glossary. Missing: original data, downloadable checklists, named authors |
| Accuracy of the site's own GEO claims | Mixed (see below) |

### Accuracy of Peptomoon's own GEO and AEO claims

| Claim | Where | Issue | Fix |
|---|---|---|---|
| "citations in ChatGPT, Perplexity and AI Overviews" as a result of the service | `all-in-one.ts` card, FAQ ("GEO ... earns citations inside AI answers") | Implies capability to earn citations; Google says AI features use the same ranking systems, and nobody can guarantee citations. The same FAQ later says so correctly | Reword as visibility work with no guarantee |
| "Bing and IndexNow for ChatGPT and Copilot visibility" | `all-in-one.ts` | IndexNow is documented for Bing and similar engines; **OpenAI documents OAI-SearchBot, not IndexNow**. The Copilot link is plausible, the ChatGPT link is unsupported | "Bing Webmaster Tools and IndexNow for Bing and Copilot discovery" |
| "Crawler access policy, including llms.txt guidance" | `seo-geo-aeo.ts` | Fine, provided the guidance says Google ignores llms.txt | Keep; add the plain statement in the service FAQ if space allows |

## 4. AEO

| Element | State |
|---|---|
| Direct answers | Every guide opens with a 50 to 60 word quick answer; services open with a 40 to 77 word lead |
| Question headings | None in service or guide body (statement headings only) |
| Definitions | 22 glossary terms, each 25 to 60 words with a DefinedTermSet |
| Tables | 2 to 3 per guide; none on services |
| Steps | Numbered lists in guides |
| FAQs | 153 questions across pages; 34 answers outside 40 to 60 words (not a requirement) |
| FAQ schema | Present; no Google rich result exists (class 1); harmless |
| Extractability | Static HTML, semantic headings, `Inline` links, sources lists |

Recommendations: (1) add question-form H2s inside guides where the reader's question is literally a question (not on service pages, where keyword-bearing statement headings are better); (2) add a short "At a glance" table to Tier 1 services using only facts already on the page; (3) do not add FAQs to chase keywords (brief rule); (4) keep one clear definitional sentence under each H1.

## 5. What not to do

Do not build "AI schema", chunk pages for AI, mass-produce answer pages, buy mentions, or rely on `llms.txt` for reach. Google lists all of these as unnecessary or harmful (doc 02).

## 6. Strategy

1. Get indexed and verified in Google and Bing; read the Generative AI and AI Performance reports as soon as they have data (doc 13).
2. Be the careful source: sourced guides, named accountability (doc 19), original or at least well-structured evidence.
3. Earn mentions legitimately: partner stores linking to case studies, a relevant directory profile, expert contributions (doc 12).
4. Run a manual prompt log monthly across ChatGPT, Perplexity, Google AI Mode and Copilot with the six questions above plus the three Tier 1 service questions; record whether Peptomoon appears, what it says and who is cited.
5. Verify CDN allowances for OAI-SearchBot and PerplexityBot in Vercel's firewall.
