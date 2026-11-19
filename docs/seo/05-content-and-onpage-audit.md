# 05. Content, on-page and brand-voice audit

Audited 19 November 2026 on the live site. Methods: full-text analysis of the 38 indexable pages (51,731 words of main content outside legal pages), pairwise text similarity, terminology counts, readability scoring (Flesch Reading Ease, a rough guide only) and a manual read of structure. Evidence tags as in doc 04.

## 1. On-page summary

| Element | Result |
|---|---|
| Titles | 22 to 60 characters, unique, brand last, mostly keyword-first. Good. Weak spots: `seo-geo-aeo` leads with jargon instead of the phrase people search ("SEO for peptide businesses") |
| Meta descriptions | Unique and concrete. No length rule exists (Google). `/all-in-one` states "from 3% with no rolling reserve" without its qualifier (K-01) |
| H1 | One per page. Service H1s are descriptive and contain the page's topic |
| H2/H3 | Statement headings, no skips. **All 15 service pages share the same 17 H2s** ("What it is", "Why RUO businesses need it", "What usually goes wrong", "How we approach it", "What is included", "Process", "Under the hood", ...). The primary keyword appears in none of them except the FAQ heading (C-01) |
| Question-style headings | None in service or guide body headings (the only "?" heading on a guide is the closing call to action) |
| Image alt text | 260 images on the local build analysed earlier: none missing alt; 82 empty (decorative); 26 over 125 characters (new photo descriptions); logo alt repeated by design |
| Internal anchors | No generic anchors ("click here"); one anchor phrase is repeated exactly 14 times (see doc 09) |

## 2. Service-page uniqueness (the earlier concern, corrected)

I flagged identical headings as a possible sign of repeated copy. Measuring the body text shows the opposite:

| Measure | Result |
|---|---|
| Mean pairwise similarity between the 15 services (6-word shingles, Jaccard) | **0.011** |
| Highest pair | `fulfillment-logistics` and `wholesale-dropshipping-3pl`: 0.062 (133 shared 6-word phrases) |
| Pairs above 0.15 | 0 |
| Verbatim sentences (50 to 260 characters) repeated on 3 or more services | 1: "See our all-in-one peptide business infrastructure." on all 15 |
| Boilerplate share per page | 0.9 to 4.4 percent |

So the page bodies are differentiated. The overlap risk is **intent** overlap between fulfilment and wholesale/dropshipping/3PL, not text overlap.

## 3. Spelling and language market (VERIFIED)

The site targets the United States (US fulfilment, US processors, `en_US` locale, 67 percent of the partner-store clicks from the US). The copy mixes US and UK spelling:

| Term | US form | UK form |
|---|---|---|
| catalog | 0 | **76** ("catalogue") |
| organization | 6 | **32** |
| program | 4 | **17** ("programme") |
| optimization | 4 | **11** |
| labeled | 0 | **11** ("labelled") |
| fulfillment | 90 | 0 |

"catalogue" appears in 4 titles, descriptions or H1s. Demand check: Google US autocomplete for "peptide catalog" returns 10 suggestions; "peptide catalogue" returns only itself. US searchers write "catalog". This is a ranking-relevant mismatch for the website-development and storefront terms and a credibility signal for a US B2B audience (C-02). The glossary term names ("optimisation") are also UK.

## 4. Brand voice

Measured:

- Average sentence length 15 to 17 words; Flesch Reading Ease: guides 59 (plain), services 49, home 46, case studies 38 (dense but technical).
- Zero marketing buzzwords from a 20-word list (no "seamless", "cutting-edge", "world-class", "leverage").
- "we do not" appears 93 times and "no promises / guarantee / cannot promise" 40 times in 51,731 words.
- "one partner" 7 times, "one team" 11, "built for" 12.

Assessment: the voice is already restrained, specific and honest, which is the right register for this audience. Two weaknesses: (1) limits are repeated so often that the tone reads defensive and dilutes confidence, even though a dedicated "What we do not do, and cannot promise" section exists on every service; (2) the heading skeleton makes 15 pages feel written to one template. Both are fixable without changing the facts.

## 5. Brand terminology and writing guideline (adopt for all new and edited copy)

### Describing the business

- Preferred: "Peptomoon is a business-to-business infrastructure partner for research-use-only (RUO) peptide businesses." After the first mention: "RUO peptide businesses".
- Avoid: "agency" as a lead noun, "retailer", "supplier" (unless describing the separate wholesale service), "FDA compliant", "approved", "certified".

### Terms

| Use | Avoid | Note |
|---|---|---|
| research-use-only (RUO) on first mention, then RUO | "research peptides for sale", "research chemicals" as a category label | Stripe uses "research chemicals"; quote it only when citing |
| US spelling: catalog, organization, program, optimization, labeled, analyze, center | UK forms | Keep "fulfillment" (already US) |
| high-risk merchant account, high-risk payment processing | "high risk" unhyphenated as an adjective | |
| 3PL (third-party logistics) on first mention, then 3PL | "logistics partner" without 3PL | |
| supplier verification, documentation review | "vetting" (implies guarantee) | |
| compliance-oriented review | "compliance audit", "compliant" | We are not a law firm |
| business customers, operators | "consumers", "buyers" | Peptomoon serves businesses |
| "Search Console figures from a partner-built store" | "one of our stores" | Attribution (C-03) |

### Service naming

Use the nav label as the short name and the page H1 as the long name. Do not invent a third name. Pillars (Build, Run, Grow, Verify) are navigation concepts, never headings that promise outcomes.

### Tone and sentences

Professional, direct, technically competent, evidence-led, honest about limits. One idea per sentence, active voice, numbers with units and dates, no em dashes, no filler adjectives. State a limitation **once per page** in the dedicated section and again only where a reader would otherwise be misled; do not append "we do not promise" to every paragraph.

### Headings

Sentence case. Each H2 on a service or guide carries the page topic or a real question the reader asks. Do not reuse an H2 across pages. Keep `Read next` and `What we do not do` as fixed utility headings.

### Evidence and sources

Every regulatory, payment-network or legal statement cites a primary source with the date checked and states the jurisdiction. Vendor claims are labelled as vendor claims. No unsourced numbers: a "typical range" needs a source or comes out. Distinguish fact from interpretation and say when something is unsettled. Never present information as legal advice.

## 6. Resources audit (8 guides, 6 published)

| Guide | Intent and keyword | Sources | Words (main) | Strengths | Issues | Action |
|---|---|---|---|---|---|---|
| `infrastructure-behind-an-ruo-peptide-business` | Pillar. "RUO peptide business infrastructure" (no autocomplete) | **0** | 3,163 | Links to 10 services, clear map | Broad; no sources; phrase has no demand | Keep as the pillar and brand explainer. Add sources and glossary links |
| `peptide-store-architecture` | "peptide store architecture" | **0** | 2,900 | Specific, tables, practical | No sources | Add Google structured-data and accessibility documentation; link glossary |
| `payment-processing-for-ruo-stores` | "RUO payment processing underwriting" | 1 (Stripe, verified live) | 2,752 | Neutral, eligibility-first | Thin sourcing for a YMYL-adjacent topic | Add card-network programme documents and the FDA statements already used elsewhere |
| `payment-processor-shut-down-account` | "payment processor shut down my account" | 1 (Stripe) | 3,131 | Best fit for a real moment of need; vendors dominate the SERP | Same | Add sources; strongest candidate to rank first |
| `review-a-peptide-suppliers-documentation` | "peptide supplier documentation review" | **0** | 3,014 | Useful checklist | SERP and autocomplete skew to consumers verifying vendors; needs a B2B framing and named standards | Reframe for operators onboarding suppliers; cite ISO/IEC 17025 and method standards only after reading them |
| `wholesale-vs-dropshipping-vs-3pl-for-ruo-brands` | Same phrase as the service page | 2 (FDA warning letter verified live) | 2,831 | Decision framework | Title nearly identical to the service title; only 3 body links in | Retitle to the question form; add links from fulfilment and payments (C-05) |
| `ruo-label-is-not-a-compliance-strategy` | Regulatory | 2 (eCFR page is behind a bot gate; one FDA URL timed out) | n/a | Aligns with the law-firm content that ranks | Hidden until counsel review (correct) | Keep hidden; verify sources manually |
| `503a-503b-and-ruo-retail` | Regulatory | 2 (Cornell LII verified) | n/a | | Hidden until counsel review (correct) | Keep hidden |

- **Freshness:** all guides are dated 17 November 2026 (published equals updated), correct for a new site. Set a quarterly review for payments and regulation, and update `updated` only on real edits.
- **Accuracy spot checks done:** Stripe's restricted-businesses page does list "incorrectly labelled research chemicals", nutraceuticals and pseudo-pharmaceuticals, and "pharmaceuticals, medical devices and telemedicine", consistent with the payments guides. The FDA warning letter cited in the wholesale guide exists (dated 17 June 2026). I did not verify the remaining factual claims line by line: **that review is still owed** and needs counsel for regulatory statements.
- **Cluster support:** every guide links to its service and the service links back (bidirectional). Missing: guides for the fulfilment, marketing and website-conversion clusters, plus the topics searchers actually type (doc 11).

## 7. Issues from this document

| ID | Issue | Severity | Fix | Status |
|---|---|---|---|---|
| C-01 | Same keyword-free H2 skeleton on all 15 services | P1 | Page-specific heading map | Planned (doc 15) |
| C-02 | US site with UK spelling (`catalogue` 76, `organisation` 32, `programme` 17, `optimisation` 11) | P1 | Convert to US spelling in copy and metadata, not in code identifiers or URLs | Planned |
| C-05 | Wholesale guide and wholesale service share almost the same title | P2 | Retitle the guide | Planned |
| C-06 | Limits repeated 133 times (we do not / no promises) | P2 | Keep the dedicated section, trim repeats in leads and paragraphs | Recommendation; owner review (compliance wording) |
| C-12 | "Our guide explains the difference" points to an unpublished guide | P2 | Reword to a published page | Planned |
| C-13 | Guides without sources (3 of 6) and services without sources (12 of 15) | P1 | Add dated primary sources, only after reading each source | Planned for the 3 guides with verified sources; rest OWNER |
