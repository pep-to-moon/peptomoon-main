# 07. Competitor and SERP analysis

Researched 19 November 2026. Competitors are identified by **real SERP overlap** on the target phrases in doc 06, not by similar business descriptions. Authority is Ahrefs' free Domain Rating (DR, 0 to 100, a relative link-profile measure, not traffic). Pages were fetched with a plain script; two sites blocked it (AMZ Prep returned 403, Ads Digitally sits behind a Cloudflare check), so those rows rely on search snippets. SERPs come from a web-search tool, a proxy for Google, so what a competitor "ranks for" means "appeared for this query in this tool", not measured ranking.

Peptomoon for comparison: **DR 0.0**, no known inbound links, Search Console unverified.

## 1. The SERPs are weak, vendor-biased and spam-contaminated

Across 12 queries the results fall into five groups. Recognise them, because each calls for a different response.

| Group | Examples | Why it matters |
|---|---|---|
| Single-service vendors | Payment brokers (SeamlessChex, Corepay, EasyPayDirect, AdaptivPayments, Payline), 3PLs (AMZ Prep, 3PLGuys, RapidFulfillment), peptide marketing agencies | The real direct competitors, each covering one slice |
| Marketplaces and gig sellers | Fiverr gig pages for "FDA compliant peptide website", Dribbble, Clutch profiles | They lend authority to tiny sellers (Velixa Labs' own domain is DR 0.0; its Clutch profile is DR 91) |
| Telehealth and clinic software | Optimantra (DR 82), OpenLoop (DR 68) | Own "start a peptide business" because their audience is clinics, not RUO operators |
| Neutral expertise | A Canadian law firm (Substance Law, DR 45, 3,558 words: "'Research Use Only' does not necessarily avoid Canadian law"), PharmaPhorum on COAs (DR 75), Payline's eligibility-first payments post | The standard to beat on trust; they support Peptomoon's stance |
| Mass-produced and hijacked sites | Many `.pages.dev`, `.vercel.app`, `.manus.space`, `.lovable.app`, `.netlify.app` pages and one recurring `.org` domain (DR 23) with templated "Navigating the Landscape..." titles | Thin, repetitive, often consumer-oriented. AI answers cite them, then caveat them |

Every AI-style answer to the six customer questions in doc 10 ended with a version of "these are mostly vendor marketing pages; verify with a regulatory attorney". A neutral, sourced, honest publisher is the missing party.

## 2. Direct competitors

| Competitor | Type | DR | Surfaced for | Positioning and offer | Content depth and format | Strengths | Weaknesses |
|---|---|---|---|---|---|---|---|
| peptide-marketing.com | Marketing agency | 1.1 | marketing agency for peptide companies | "Compliance-first digital marketing, web development, SEO, CRO"; claims 40+ peptide brands since 2022 | Home page 1,693 words, 8 H2, FAQ, "everything we know about marketing peptides" hub | Clear niche, case claims, Clutch and Trustpilot presence (3.6, very few reviews) | Tiny authority; no sourced guidance; $10,000+ minimum on Clutch |
| adsdigitally.com | Marketing agency | 0.6 | same | "Compliance-first" Google and Meta ads, technical SEO for research peptide brands | Not fetched (bot check) | Specialist | Tiny authority |
| peptads.com | Ads agency | 9.0 | same | "Get Meta, Google and TikTok ads approval" including "advanced cloaking" | 541 words, testimonials block | Aggressive promise | Cloaking is a policy violation; no trust signals beyond testimonials |
| SeamlessChex | Payment broker | 54 | peptide payment processor | Ranked list "Best Payment Processor for Peptides in 2026" with itself first; "72-hour approvals, next-day funding" | 1,505 words, 1 table, 11 H2, Speakable schema | Comparison format wins the query; named providers; numbers | Self-ranked listicle; unverified claims (99% acceptance) |
| Corepay | Payment broker | 40 | peptide merchant account | "Peptide Payment Processing" sales page; "processing in 30+ countries" | 1,597 words, 12 H2, rate-comparison CTA | Dedicated industry pages for many verticals | Sales page, no sources |
| EasyPayDirect | Payment broker | 53 | peptide merchant account | "Peptide Merchant Account: fast and easy" | Not fetched | Authority | Generic |
| AdaptivPayments | Payment broker | 37 | peptide merchant account guide | High-risk integration guide, reserves "5 to 10 percent" | Blog guide | Developer-oriented | Vendor view |
| Payline | Payment provider | 57 | peptide payment processing | **Eligibility-first**: "Separate regulatory status from processor approval... without evading restrictions" | 285 words, BlogPosting with Person author | Closest to Peptomoon's honest stance | Very short |
| Convesio | Hosting | 71 | peptide payment processing | Knowledge-base article on restrictions, FDA position, website compliance, documents, chargebacks | 830 words, 6 numbered H2, table | Covers the full underwriting-preparation arc | Hosting vendor, shallow |
| AMZ Prep | 3PL | 68 | peptide 3PL fulfillment | Dedicated peptide fulfilment page; "50+ locations in 6 countries", cold-chain zones (-80 C to 55 to 65 F), FDA-registered, cGMP | Not fetched (403) | Specific operational detail; authority | Generic 3PL brand |
| 3PLGuys, RapidFulfillment | 3PL | 26, 24 | peptide fulfillment, dropshipping | Press-release launches of peptide and white-label fulfilment | Distributed press releases | Timely | Promotional, unverified |
| Velixa Labs, Tech Hikers | Web agencies | 0.0 (own domain) | who builds peptide websites | "Specialised digital agency for research peptide suppliers"; "100+ peptide and RUO websites, WooCommerce" | Clutch and Dribbble profile pages | Visible on the query that matters | WooCommerce/WordPress templates; "FDA compliant" claims |
| Fiverr sellers | Freelancers | n/a | peptide website development | $50 to $995 builds on Shopify and WooCommerce with disclaimer pages and COA sections | Gig listings | Price, volume | Compliance left to the client; no accountability |

## 3. Indirect competitors

| Competitor | Category | DR | Notes |
|---|---|---|---|
| High Stack Solutions, Beenacle (DR 11), Custody and Agency (DR 25), Folio3 (DR 74) | E-commerce agencies for regulated or restricted products (kratom, CBD, firearms) | 11 to 74 | Show the shape of a general "high-risk e-commerce agency" offer: WooCommerce or Shopify plus a high-risk gateway. None names peptides |
| PaymentCloud (DR 69), Cardfellow (66), Merchant Maverick (74), 1Digital (63) | High-risk processing and review sites | 63 to 74 | Win head terms like "high-risk merchant account" and "kratom credit card processing". Peptomoon cannot beat them on generic payments terms; it can on peptide-specific, eligibility-first content |
| Optimantra, OpenLoop | Telehealth and clinic software | 68 to 82 | Own "start a peptide business" for clinic readers |
| Substance Law | Law firm | 45 | The authority on legality; a source to cite, not to copy |

## 4. Competitor matrix: what they cover, explain better, and where they are weak

| Topic | What competitors cover that Peptomoon does not | What they explain better | Where they are weak |
|---|---|---|---|
| Payments | Named provider comparisons, approval timelines, fee and reserve ranges, ACH and crypto alternatives | Concrete numbers (vendor-sourced) | Self-interested ranking, unsourced figures, no application-readiness checklist |
| Fulfilment | **Cold chain** temperature zones, FDA registration, lot and batch tracking, white-label and dropship fulfilment | Operational specifics | Generic 3PL language, press-release claims |
| Starting a business | Business model choice (RUO seller, clinic, telehealth, synthesis), entity and bank setup, legal exposure by country | Step order | Clinic bias; legal content only from law firms; nothing on RUO operator infrastructure |
| Website build | Platform choice (Shopify, WooCommerce), age verification, COA sections | Price points | No architecture, no documentation model, "FDA compliant" overclaims |
| Marketing | Ad-approval promises | Confidence | Cloaking, no sources; peptide agencies are tiny |
| White label | Supplier lists | Names | Thin, affiliate-driven |
| Verification and COAs | Many "how to read a COA" posts | Plain explanation | Consumer-oriented; mass-produced |

## 5. Opportunities Peptomoon can realistically exploit

1. **Neutral, sourced, honest operator guidance.** Vendor pages dominate every commercial query, and AI answers discount them. A guide that states what is known, what is vendor claim and where counsel is needed is differentiated and fits Google's "unique, non-commodity" guidance.
2. **The low-authority direct agencies.** peptide-marketing.com, adsdigitally.com and peptads.com are DR 0.6 to 9. A DR 0 site with real proof can compete for "marketing agency for peptide companies" and "peptide website development" far sooner than for payments terms.
3. **Formation and sourcing queries** (start a peptide business, white label, dropshipping) are high-demand, low-quality SERPs, and Peptomoon has no content on white label or starting.
4. **Cold chain, lot traceability and FDA-registered facilities** are what 3PL competitors lead with. Peptomoon's fulfilment page does not mention cold chain at all.
5. **Application-readiness for processors**: documents, website review, chargeback prevention. Convesio's six-part outline shows the shape; Peptomoon's guides go deeper but need sources and a downloadable checklist.
6. **Free, relevant directory listings** (Clutch and similar) carry authority that new agency domains lack, but only with real client reviews. Do not buy or fabricate reviews.

## 6. What not to copy

Self-ranked listicles that put the author first, unsourced approval or acceptance rates, ad "approval" via cloaking, "FDA compliant" claims, and mass-produced long-tail pages.
