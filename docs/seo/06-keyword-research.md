# 06. Keyword research, search intent and geography

Researched 19 November 2026 using free sources only. **No search-volume numbers appear in this document because none could be obtained for free.** Google Keyword Planner needs a Google Ads login and Ahrefs and Semrush are paid, so volume is replaced by the strongest free proxies below, each labelled with what it does and does not prove.

## 1. Method and its limits

| Source | What it gives | What it does not give |
|---|---|---|
| Google autocomplete (US, `gl=us`), 57 seed phrases and 8 alphabet expansions (695 suggestions) | Whether a phrase has enough real search behaviour to be suggested; the modifiers people add (reddit, uk, supplier, checklist) | Volume. Suggestions are personalisation-free but not a ranked demand table |
| Google Trends (free tier, US, 5 years) | Relative interest, with 0 meaning below its reporting threshold | Absolute volume. Two phrases tested (the free quota is limited) |
| Web search SERPs for 6 target queries plus 6 customer-style questions | Who ranks, what format, vendor or neutral | Google's own index; no People Also Ask boxes |
| Ahrefs free Domain Rating for 24 domains | Relative authority of competitors | Their rankings or traffic |
| Partner-store Search Console export (92 days, 643,123 impressions) | Country and device mix for one RUO store | Queries (the importer deliberately never reads them) |
| Bing autocomplete | **Unavailable**: Bing's suggestion endpoints returned nothing without a browser session | |

Evidence class for every demand statement below: **proxy signal (class 4)**, not measured volume. When Search Console is connected, replace this document's demand column with real impressions (doc 13).

## 2. What the data says

### 2.1 Exact-match B2B service phrases have almost no measurable demand

Google Trends, US, 260 weeks (21 Nov 2021 to 14 Nov 2026):

| Phrase | Non-zero weeks | Reading |
|---|---|---|
| peptide merchant account | 2 of 260 (single spikes in Feb 2024 and Jun 2026) | Below Trends' threshold nearly every week: a very small query |
| peptide fulfillment | 4 of 260 (spikes of 72 to 100) | Same |

These are niche, high-intent, low-count queries. The strategy is therefore **a small number of precise, trustworthy pages that win the few queries that exist and convert**, not a volume play.

### 2.2 Phrase footprints (Google US autocomplete: number of suggestions returned, maximum 10)

| Cluster | Phrase | Suggestions | Reading |
|---|---|---|---|
| A Website | peptide website development | 5 | Exists. "design", "creation", "reviews" modifiers |
| | peptide store website | 7 | Mostly buyer-side ("online store", "reviews") |
| | peptide website design | 2 | Small |
| | peptide ecommerce platform | 1 | Tiny |
| | **ruo peptide website development**, peptide e-commerce development, research peptide store development, custom peptide store development, ruo e-commerce website, peptide shopify alternative | **0** | No autocomplete footprint |
| B Payments | peptide payment processing | 10 | Strong. Modifiers: reddit, credit card, gateway, solutions, uk |
| | peptide payment processor | 10 | Strong. "best", "reddit", "uk", "processormatch" |
| | peptide merchant account | 5 | "merchant services", "research peptide merchant account" |
| | ruo payment processing | 7 | Mixed with unrelated "payment is processing" |
| | high risk merchant account for peptide | 2 | Small |
| | research peptide payment gateway | 1; payment processing for research chemical 3 | Small |
| | peptide stripe alternative, peptide store payment processor shut down, high risk payment processing for ruo | **0** | No footprint (the shutdown guide's phrase is not typed this way) |
| C Fulfilment | peptide dropshipping | 10 | Strong. "supplier", "companies", "reddit", "uk", "white label" |
| | peptide wholesale / wholesale supplier | 10 / 10 | Strong, but includes buyers |
| | **peptide white label** | **10** | Strong ("supplier", "usa", "private label", "dropshipping"). **Peptomoon has no content on it** |
| | peptide 3pl | 5 | "3pl usa", "3pl peptide companies" |
| | peptide fulfillment services | 3 | "center" |
| | ruo peptide fulfillment, research peptide order fulfillment, inventory management for peptide | **0** | |
| D Verification | peptide coa verification / how to verify peptide supplier / supplier checklist / third party testing vendor | 5 / 4 / 4 / 5 | Real, but **consumer-skewed** ("coa checker", "legit peptide companies", "reviews") |
| | research peptide supplier documentation, laboratory report verification, batch documentation | **0** | |
| E Marketing | marketing agency for peptides | 5 | Small but real; direct competitors are tiny |
| | seo for peptide(s) | 3 | Small |
| | peptide affiliate program | 10 | Mixed: affiliates seeking programs as well as brands |
| | peptide advertising | 7 | Mixed |
| | email marketing for peptide | 3 | Small |
| F Business | **start a peptide business / how to start a peptide company** | **10 / 10** | Strong ("reddit", "in usa", "in canada", "in texas", "research peptide business", "telehealth business") |
| | research peptide business | 10 | Includes "companies list", "reviews" (buyer-side) |
| | peptide business guide / attorney / insurance / bank account / names | present in the alphabet expansion | Real formation-stage questions |
| | ruo peptide business | 2 | Small |
| | peptide business infrastructure, software for peptide business, peptide business management, ruo peptide business setup | **0** | **Peptomoon's own category language has no footprint** |
| Extras | peptide catalog vs peptide catalogue | 10 vs 1 | US searchers write "catalog" |
| | peptide label design / label template / vial label design | 10 / 10 / 5 | Template and DIY intent dominates |
| | peptide telehealth platform / software, telehealth platform development | 0 / 0 / 1 | No footprint |
| | peptide cold chain shipping / fulfillment, peptide chargeback | 0 | No footprint, but competitors lead with cold chain (doc 07) |

### 2.3 What these mean for intent and business value

- The highest B2B-flavoured demand is **formation and sourcing**: start a peptide business, white label, dropshipping, wholesale, supplier. These are operators early in the journey, upstream of infrastructure, and a natural entry point for Peptomoon.
- **Payments** is the highest-value commercial cluster (operators in distress or onboarding) and has a real footprint, but vendors with Domain Ratings of 37 to 57 own the head terms.
- Several clusters are **contaminated by consumer intent** (COA checkers, supplier reviews, "peptide online store", dosing-adjacent modifiers). The brief explicitly excludes that traffic. Frame every page for operators and avoid phrases whose natural reading is a consumer checking a vendor.
- Of the alphabet expansions, about 18 percent of suggestions carried a country token (China 22, UK 19, Australia 19, USA 15, Europe 9, Canada 8, Germany 6, India 4): see section 4.

## 3. Keyword-to-URL mapping

One primary intent per URL. "New" means a new page is justified by evidence; nothing is created for a phrase without a footprint.

| Primary phrase (and close variants) | Intent | Demand proxy | Competition (SERP composition, Domain Rating) | Target URL | Action | Feasibility |
|---|---|---|---|---|---|---|
| peptide payment processor / processing / merchant account / gateway / credit card processing | Commercial | Strong (10 suggestions) | Vendor sales pages and listicles; DR 37 to 57, one at 71 | `/services/payment-processing` | Keep title. Strengthen with sources. Do not publish rankings of processors | Medium, long-tail first |
| peptide payment processing eligibility, underwriting, application documents | Informational | Medium | Vendor blogs, a few careful ones (Payline) | `/resources/payment-processing-for-ruo-stores` | Keep; add primary sources | Medium |
| payment processor shut down my account (peptide) | Informational, urgent | Phrase has no footprint, but SERP shows vendor "what to do" posts | Vendors | `/resources/payment-processor-shut-down-account` | Keep; best candidate to rank; add sources | Medium-high |
| peptide website development / design / creation; peptide store website; peptide ecommerce platform | Commercial | Small but real (5, 7, 2, 1) | Fiverr gigs, a Clutch profile (Velixa Labs), Tech Hikers on Dribbble; no strong agency | `/services/ruo-peptide-website-development` | Keep title. Use US spelling ("catalog"). Put the three case studies near the top | **High** |
| peptide dropshipping, wholesale, white label, private label | Commercial-investigation | Strong (10 each) | Thin supplier lists, `.pages.dev` blogs, spam-network pages, a 3PL press release | `/services/wholesale-dropshipping-3pl` + existing decision guide | Differentiate guide title; add white label coverage | Medium-high |
| peptide white label supplier (USA), how white label works | Informational | Strong | Low-quality | **New guide** (doc 11, G-02) | Write only with sourced content and the supplier-independence disclosure | Medium-high |
| peptide 3PL, peptide fulfillment (services, center) | Commercial | Small-medium (5, 3) | 3PLs (AMZ Prep DR 68, 3PLGuys 26, RapidFulfillment 24) lead with cold chain, FDA registration, lot tracking | `/services/fulfillment-logistics` | Add cold chain and lot traceability coverage | Medium-hard |
| start a peptide business; how to start a peptide company (research / RUO) | Informational | **Strong (10 each)** | Telehealth vendors (Optimantra DR 82, OpenLoop 68), a Canadian law firm (3,558 words, DR 45), `.pages.dev` posts | **New guide** (doc 11, G-01) | Write as an operating checklist, route legal questions to counsel | Medium |
| marketing agency for peptide companies; seo for peptide(s) | Commercial | Small (5, 3) | Direct agencies are DR 0.6 to 9 (peptide-marketing.com, adsdigitally.com, peptads.com), listicles by general agencies | `/services/seo-geo-aeo` (marketing hub role) | Retitle to lead with "SEO for peptide businesses"; link meta, email and affiliate pages | **High** |
| peptide affiliate program (brand side), email marketing for peptide, peptide Meta ads | Commercial, mixed | Medium, mixed | Brand pages and software | `/services/affiliate-management`, `/services/email-marketing`, `/services/meta-advertising` | Keep as supporting; no new pages | Low priority |
| peptide supplier verification, COA review for businesses | Commercial-investigation | Medium, consumer-skewed | Vendor blogs | `/services/supplier-verification` + `/resources/review-a-peptide-suppliers-documentation` | Reframe for operators; do not chase "coa checker" | Medium |
| peptide label design, vial label design | Commercial | Medium, template-led | Templates, print shops | `/services/vial-label-design` | Keep as supporting | Low-medium |
| RUO peptide business infrastructure; software for peptide business; ruo e-commerce | Brand and category | **None** | None | `/` and `/resources/infrastructure-behind-an-ruo-peptide-business` | Use as descriptive brand language, never as a keyword target | n/a |
| telehealth platform development; peptide telehealth | Commercial | **None** | DR 68 to 82 generic telehealth vendors | `/services/telehealth-platform-development` | Keep, do not expand (POS-02) | Not worth targeting |
| peptide business attorney / legal | Informational | Present | Law firms | none | Do not target; point to counsel | n/a |

**Avoid on purpose:** consumer terms (dosage, reconstitution, benefits, reviews, "where to buy", "for sale", "reddit" as a goal), geography-by-state pages, one page per keyword variant (doorway and scaled-content risk), and phrases with no footprint.

## 4. Target market and geography

| Evidence | Finding |
|---|---|
| Partner-store Search Console export (15,096 clicks, 15 Aug to 14 Nov 2026) | United States 66.7 percent, Australia 5.3, United Kingdom 4.5, Canada 4.2, Puerto Rico 1.9, Spain 1.4. Mobile 80.5 percent. This is **one B2C store, not Peptomoon**, so it indicates market shape only |
| Autocomplete country tokens (695 suggestions) | China 22 (manufacturers), UK 19, Australia 19, USA 15, Europe 9, Canada 8 |
| Peptomoon's own proposition | US fulfilment coordination, US processors, US regulation (FDA), US spelling target |

**Decision:** United States is the primary market. Use US spelling and US examples everywhere. Do **not** create location pages (no evidence of state-level B2B demand; doorway-page risk). Revisit UK, Australia and Canada only if Peptomoon's own Search Console shows meaningful non-US impressions; then add short jurisdiction sections inside existing guides, labelled with the jurisdiction, rather than new URLs.
