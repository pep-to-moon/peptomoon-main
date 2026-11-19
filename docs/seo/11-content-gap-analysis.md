# 11. Content gap analysis and editorial roadmap

Prepared 19 November 2026 from docs 05 to 07. Principles from the brief and from Google's documentation: every page needs a distinct search and business purpose; do not publish to chase keyword variants (scaled content abuse); content length follows the subject, not a quota; regulatory content needs primary sources and counsel review.

## 1. Gaps found

| Gap | Evidence | Opportunity |
|---|---|---|
| Nothing on **starting an RUO business** | Autocomplete: "start a peptide business" 10, "how to start a peptide company" 10; zero pages on the site match; SERP is dominated by telehealth vendors and one law firm | High: operators are upstream of every Peptomoon service |
| Nothing on **white label / private label** | "peptide white label" 10 suggestions; 0 pages mention it; SERP is thin supplier lists and press releases | High, and gives `vial-label-design` its natural inbound link |
| **Cold chain, lot traceability, facility registration** absent from fulfilment | 3PL competitors lead with them; 0 pages on the site | Medium: add to existing pages first; a standalone guide only if Search Console shows demand |
| **Ad-platform policy** absent although Meta advertising is a service | 0 pages cite Meta policy; "peptide advertising" has mixed demand; agencies promise "approval" through cloaking | Medium: a sourced policy explainer is a trust differentiator |
| **AI and search visibility explained from documentation** | Peptomoon sells SEO, GEO and AEO; no guide supports the service; GEO claims need correcting (doc 10) | High for credibility: it is the proof page for a Tier 1 service and needs no regulatory claims |
| Processor **evaluation scorecard** | Competitors publish self-ranked listicles; Peptomoon cannot rank named processors neutrally while arranging processing itself | Medium: a neutral scorecard (questions, red flags, documents) inside the existing underwriting guide |
| Original data | Only anonymised partner Search Console data (one store) | Low now; revisit with more stores and owner permission |

## 2. Existing guides: what to do

| Guide | Action | Why |
|---|---|---|
| `infrastructure-behind-an-ruo-peptide-business` (pillar) | Improve | Add primary sources and glossary links; keep as the brand explainer |
| `peptide-store-architecture` | Improve | Add sources (structured-data and accessibility documentation) |
| `payment-processing-for-ruo-stores`, `payment-processor-shut-down-account` | Improve | Add card-network programme documents and FDA statements; add the scorecard and readiness checklist as sections |
| `review-a-peptide-suppliers-documentation` | Reframe | Operator onboarding a supplier, not a consumer checking a vendor |
| `wholesale-vs-dropshipping-vs-3pl-for-ruo-brands` | Retitle and link | Differentiate from the service page |
| `ruo-label-is-not-a-compliance-strategy`, `503a-503b-and-ruo-retail` | Keep hidden | Counsel review pending |
| Substantial rewrites | None | Quality is not the problem; sourcing and framing are |
| Overlap | None harmful | The two payments guides serve different moments (applying versus shut down) |

## 3. Content plan by pillar

| Pillar | Existing | Next (this order) |
|---|---|---|
| Build | Store architecture guide | **G-01** How to start an RUO peptide business (pillar) |
| Run | Payments ×2, wholesale/3PL decision | **G-02** White label and private label; cold-chain section in fulfilment (G-03); scorecard section (G-04) |
| Grow | none | **G-05** Search and AI visibility for RUO stores, from documentation (**written in this pass**); G-06 Ad-platform policies |
| Verify | Supplier documentation, two hidden regulatory guides | Reframe existing; publish hidden guides after counsel review |

## 4. Briefs

Each brief states the fields requested in the project brief. "Value" is qualitative because no volume data exists.

### G-05. Search and AI visibility for RUO peptide stores: what Google, Bing and OpenAI actually document (WRITTEN 19 November 2026, see doc 15)

| Field | Content |
|---|---|
| Proposed title | Search and AI visibility for RUO peptide stores: what the search engines document |
| Primary and secondary keywords | Primary: search and AI visibility for RUO stores (the phrase "SEO for peptide businesses" now belongs to the service page, so the guide uses a distinct primary keyword); secondary: AI search for peptide stores, OAI-SearchBot, llms.txt for ecommerce, AI Overviews for small sites |
| Search intent | Informational, with commercial investigation toward `seo-geo-aeo` |
| Audience | RUO operators and their developers who are being sold "GEO" |
| Pillar and URL | Grow; `/resources/search-and-ai-visibility-for-ruo-peptide-stores` |
| H1 | Search and AI visibility for RUO peptide stores: what Google, Bing and OpenAI document |
| Outline | Quick answer; what is documented versus folklore; Google (eligibility, AI features, what to ignore, scaled content); crawlers and robots (OAI-SearchBot, GPTBot, PerplexityBot, Google-Extended); Bing (sitemaps, lastmod, IndexNow, AI Performance); structured data and the FAQ rich result; measurement; what is specific to RUO sites; a checklist table; FAQs; sources |
| Key questions | Do I need llms.txt? Does IndexNow affect ChatGPT? Should I block GPTBot? Does FAQ markup still help? How do I measure AI visibility for free? |
| Research and sources | Google AI optimisation guide, AI features, spam policies, sitemaps, FAQ deprecation notice; OpenAI and Perplexity crawler pages; Bing Webmaster Blog on sitemaps; the GEO paper (class 3) |
| Internal links | `seo-geo-aeo`, `site-audits`, glossary GEO and AEO, the infrastructure guide, the store-architecture guide |
| Commercial page | `/services/seo-geo-aeo` |
| Competitor gap | Competitors sell "approval" and "AI visibility" without documentation; the AI answers found no authoritative source |
| Value and priority | High, P1 |

### G-01. How to start an RUO peptide business: the operating checklist

| Field | Content |
|---|---|
| Title and keyword | How to start an RUO peptide business; primary "how to start a research peptide business"; secondary start a peptide business, RUO peptide business setup, peptide business checklist |
| Intent and audience | Informational, founders and new operators |
| URL and H1 | `/resources/how-to-start-an-ruo-peptide-business`; "How to start an RUO peptide business: the operating checklist" |
| Outline | Choose the model (RUO seller versus clinical or telehealth, stated as different businesses with different rules); get jurisdiction-specific legal advice first; entity, banking and insurance as questions to ask, not advice; supplier and documentation; website and notices; payments and underwriting preparation; fulfilment and cold chain; support boundaries; marketing limits; records; what not to do |
| Key questions | What regulates what I plan to sell? What documents will a processor ask for? What does a supplier owe me? What can I not say on my site? |
| Sources | FDA and eCFR statements already cited by the hidden guides, processor policies (Stripe verified), state resources via counsel |
| Links | Infrastructure guide, payments guides, supplier documentation, store architecture, services hub |
| Competitor gap | Clinic and telehealth bias; legal content only from law firms; no operator checklist |
| Dependencies | Counsel review of the regulatory section; mark `needsCounselReview` until done |
| Value and priority | High, P1 (blocked on counsel) |

### G-02. White label and private label for RUO peptide brands

Keywords: peptide white label, private label, white label supplier USA. Intent: informational. URL `/resources/white-label-and-private-label-for-ruo-peptide-brands`. Outline: who is the manufacturer and who is the brand owner; the documentation chain (batch COA, labeling data); labeling responsibilities and the link to `vial-label-design`; minimums and contract terms to ask about; disclosure of Peptomoon's own supply role. Sources: supplier and labeling documents, FDA statements via counsel. Links: wholesale service and guide, supplier documentation, vial label design. Gap: thin lists. Value high, P1. Dependency: the supplier-independence disclosure decision.

### G-03. Cold chain and lot traceability in fulfilment (section first, guide later)

Add to `fulfillment-logistics` and the wholesale guide: temperature requirements are product-specific, ask the 3PL for lot and batch tracking, facility registration status and whether it accepts the category. Sources must be the 3PLs' own published specifications or regulator pages, read before citing. Publish a standalone guide only if Search Console later shows impressions for cold chain phrases (none exist in autocomplete today). Value medium, P2.

### G-04. Payment processor evaluation scorecard and application-readiness checklist (section, not a new URL)

Add to the underwriting guide: a table of questions to ask any provider (reserve percentage and hold period, termination terms, accepted products, documents required, chargeback thresholds) and a document checklist. No named rankings. Avoids a second URL competing with the guide. Value medium, P2.

### G-06. Ad-platform policies for RUO stores

Primary sources: Meta advertising standards and Google Ads policies for the relevant categories, read and cited with dates. Intent informational. Supports `meta-advertising`. Competitor gap: agencies promise approval. Value medium, P2, research task first.

## 5. Editorial standard for every new piece

1. State the search intent and the business purpose in one sentence each before drafting.
2. Review the current SERP and the competitor gap (doc 07).
3. Use primary sources, open each before citing, record the date checked and the jurisdiction.
4. Distinguish fact from interpretation; state uncertainty; no legal advice.
5. Counsel review for anything regulatory or about payments law; hide until reviewed.
6. Link in and out per doc 09 before publishing.
7. Validate with `pnpm check:content`, a build and the crawl script.
8. Review dates quarterly; update `updated` only on real changes.

Do not publish more than one new guide per fortnight until Search Console shows which topics earn impressions.
