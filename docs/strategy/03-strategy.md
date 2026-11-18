# 03. Brand, messaging, architecture and conversion strategy

Legend: [O] observed, [A] assumption or recommendation. Anything marked `[[CONFIRM]]` must be resolved before launch. A prebuild script will fail the production build while any such token remains in rendered content.

## 1. Positioning

Peptomoon is an infrastructure and growth partner for businesses in the research-use-only peptide industry. It plans, builds and maintains the connected systems behind a store: website, payments, supplier documentation, fulfilment, support, reporting, marketing infrastructure, affiliates and email. It also reviews website content and documentation for risk and coordinates with qualified regulatory professionals.

What it is not: a law firm, a regulator, a retailer, a guarantee of approvals, rankings or results.

Why this wins [A]: the visible alternatives are either one-size "store in a box" funnels, supplier-led agencies whose proof is affiliated brands, or freelancers selling "FDA compliant" sites. Peptomoon's claim rests on checkable evidence (live sites), engineering depth, honest limits and a connected service model (file 01, section 6).

## 2. Messaging hierarchy

| Level | Message | Where it lives |
|---|---|---|
| Brand promise (H1) | **One partner. Every moving part of your RUO peptide business.** | Homepage hero, social card |
| Proof line | **Built in the industry. Not just for it.** | Portfolio section |
| Pillars | Build the store. Run the operation. Grow the audience. Verify the details. | Ecosystem section, services hub |
| Service lines | One plain sentence per service, naming the outcome and the limit | Cards, service heroes |
| Credibility rule | Evidence beats adjectives. Every claim links to something real or is removed | Everywhere |

Tagline screening (from the brief's list):

| Candidate | Verdict |
|---|---|
| One partner. Every moving part of your RUO business. | Selected, with "peptide" added to name the audience and help search. |
| Beyond the Storefront | Keep as the H2 for the ecosystem section. |
| Your Business, Fully Connected | Keep as the dashboards section line. |
| Built for the Business Behind RUO | Keep for About. Too long for a hero. |
| Every System. One Partner. | Redundant with the H1. Drop. |
| The Infrastructure Behind Your Next Move | Vague. Drop. |
| Everything Your RUO Business Needs to Operate | Overpromises ("everything"). Drop. |

Hero subhead [A]: "Websites, payments, supplier documentation, fulfilment, compliance review, marketing systems and reporting, planned and maintained together by a team that already builds and runs sites in this industry."

Voice: direct, practical, industry-aware. No em dashes anywhere in site copy. No guarantees. Say "RUO" plainly. Explain limits as a feature.

## 3. The ecosystem and what we can claim

Four pillars map the ten services:

| Pillar | Services |
|---|---|
| Build | Website development and e-commerce |
| Run | Payment processing, fulfilment and logistics, customer support, business dashboards |
| Grow | Meta advertising infrastructure, affiliate infrastructure, email marketing |
| Verify | Supplier verification, compliance support |

Capability confidence. The brief says to separate established capabilities from unconfirmed ones. Evidence so far:

| Service | Evidence | Status for copy |
|---|---|---|
| Website development and e-commerce | Six live sites [O] | Established |
| Technical SEO and performance | Sitemaps, schema, canonical tags, dated audit files [O] | Established |
| Affiliate infrastructure | Affiliate pages linked on all six, referral and dashboard routes appear in robots files of four [O] | Established (four), confirm the rest |
| Email | Resend in repos, newsletter blocks [O] | Established for transactional email. Marketing automation and deliverability consulting: confirm |
| Business dashboards | Payload admin areas [O]. A project folder with a dashboards document exists (folder names only, not inspected) | Likely, confirm what is deliverable |
| Payment processing infrastructure | Stripe libraries in repos, project folders named for payment bridges (names only, not inspected) | Likely, confirm scope and any provider relationships |
| Meta advertising infrastructure | GA4 and Clarity on all six, Meta Pixel on one [O] | Unconfirmed |
| Supplier verification | No Peptomoon-side evidence yet | Unconfirmed |
| Fulfilment and logistics | Wholesale project folders (names only) | Unconfirmed |
| Compliance support | None yet | Unconfirmed |
| Customer support infrastructure | None yet | Unconfirmed |

Implementation: every service has `deliveryStatus: "established" | "by-engagement" | "planned"` in its data file. It controls a small label on the page and how copy is phrased, so an unconfirmed service never reads as a track record.

## 4. Sitemap

Indexable pages (all URLs lowercase, no trailing slash):

```
/                                                 Home
/services                                         Services hub
/services/ruo-peptide-website-development
/services/payment-processing
/services/meta-advertising
/services/supplier-verification
/services/fulfillment-logistics
/services/compliance-support
/services/affiliate-management
/services/email-marketing
/services/business-dashboards
/services/customer-support
/case-studies                                     Portfolio hub
/case-studies/99-purity-peptides
/case-studies/veracue-labs
/case-studies/helix-bio-chem
/case-studies/primetime-bio-labs
/case-studies/certified-aminos
/case-studies/amino-based
/about
/resources                                        Resource hub
/resources/{article-slug}                         Articles (flat)
/resources/topic/{category}                       Topic hubs, created only once a topic has 4 or more published articles
/contact                                          Qualification quiz
/privacy-policy  /terms-of-service  /disclaimer  /cookie-policy
```

Not indexed: `/contact/received` (noindex), `/api/*`, preview routes, 404. Case-study routes whose content is not ready return `notFound()` in production (or stay out of the sitemap with `noindex`), so no thin pages exist.

No additional service pages at launch. Candidates after search evidence exists: website redesign and migration (only if it earns distinct content and queries), merchant account preparation. Until then they are sections inside the main pages.

## 5. Homepage architecture (15 sections)

The brief suggests 18. Several overlap (problems and solutions, three operations sections, portfolio and case-study previews), so I merged them. Each remaining section has one distinct job.

| # | Section | Job | Content and interaction | CTA |
|---|---|---|---|---|
| 1 | Hero | Say what we are in one breath | H1, subhead, real screenshot stack of three live sites (static image first, subtle parallax after load), baseline-ruler motif, proof strip with only verified facts | "Tell us what you need" and "See what we have built" |
| 2 | Why generic fails | Show we know the industry | Large statement, three specific frictions (underwriting, documentation expectations, content rules), scroll-highlighted words | none |
| 3 | The RUO industry is complicated. Your infrastructure doesn't have to be. | The required problem and solution block | Six numbered problems with a sticky list and a changing panel: what we see, what we do, what we will not promise, link to the service. Accordion on mobile | Per problem link |
| 4 | Beyond the storefront | Show the systems are connected | SVG diagram: orders and data at the centre, ten service nodes, hover and focus highlight connections, real links list beneath | "Explore our services" |
| 5 | Built in the industry. Not just for it. | The portfolio | Six large cards in a horizontal scroll, desktop and mobile frames, hover transition, verified services per site, live link and case-study link where one exists | "Read the case study" |
| 6 | What we build | Development depth | Four feature rows drawn from real builds: catalogue architecture, batch documentation pages, research-use gate, performance and SEO foundations | "See website development" |
| 7 | Operations that hold up | Payments, supplier documentation, fulfilment | Sticky chapters, each with its own diagram: application to settlement timeline, documentation checklist, order lifecycle | Three service links |
| 8 | A label is not compliance | Differentiated honesty | What we review, what we do not do, coordination with qualified professionals | "Discuss a content review" |
| 9 | Growth systems | Tracking, affiliates, email | Event map, affiliate flow, email authentication checklist. Infrastructure framing, no results promises | Three service links |
| 10 | Your business, fully connected | Dashboards | Interactive sample dashboard, clearly labelled "Illustrative sample data" | "See business dashboards" |
| 11 | Evidence | Verified results | Rendered only when `evidence.ts` holds entries with source and date (for example GSC exports). Otherwise the section is omitted at launch | "See the data" |
| 12 | How we work | Process | Five steps on an animated line (discover, architect, build, launch, maintain) with deliverables and what we need from you | "Start a project" |
| 13 | Why Peptomoon | Differentiation | Honest comparison with freelancers, template agencies and managing separate vendors | none |
| 14 | Questions | Objections | Eight real questions, plain accordion, no FAQ schema | none |
| 15 | Final CTA | Convert | Short statement, the first quiz question inline so the visitor starts without leaving | "Tell us what you need" |

## 6. Service page architecture

Every service page uses the same skeleton, but the substance in each block, plus one unique component, differs. No page is a find-and-replace of another.

Skeleton: breadcrumb, H1 and one-sentence value, delivery-status label, what it is, why RUO businesses need it, common problems, how we approach it (unique component), what is included, process, technical considerations, what we do not do and cannot promise, related case studies, questions, related services, contextual CTA.

| Page | Unique angle | Unique component | Guardrails | Confirm |
|---|---|---|---|---|
| ruo-peptide-website-development | Why generic templates fail this industry: catalogue with variants, batch documentation, gate, content rules, SEO | Annotated architecture diagram built from real sites | Never say "FDA compliant". Link to six case studies | Scope list per site |
| payment-processing | Underwriting is a document review, so prepare the business to be underwritten | Application-to-settlement timeline, provider-fit checklist | No approval promises. No hiding activity. Stripe policy categories cited [V]. PayPal and Square only after they are read in a browser | Gateways actually integrated, any referral compensation |
| meta-advertising | Measurement infrastructure, separated into infrastructure, management and eligibility | Event map (pixel, Conversions API, deduplication) | No circumvention. Eligibility is Meta's decision. Do not claim agency accounts reduce restrictions | Whether any ad management is delivered |
| supplier-verification | A documentation framework, not a supplier list | Supplier scorecard and batch-matched COA checklist | No supplier names unless real, no lab results, no certification claims. We review documents, we do not test samples unless confirmed | Whether independent testing is arranged |
| fulfillment-logistics | Domestic shipping reliability as customer experience | Order lifecycle and exception diagram | Dropshipping only where lawful and contractually permitted. No partners named unless real | Real partners and integrations |
| compliance-support | RUO labelling is not compliance | Content risk review sample output (illustrative) | Not legal advice. No guidance on concealing intent or evading enforcement. 503A and 503B explained only as the licensed pharmacy framework | Named counsel or regulatory partner, referral disclosure |
| affiliate-management | Affiliates as an attribution and risk channel (their claims reflect on the brand) | Commission and attribution rules table, affiliate content guidelines | Net-sales definitions that exclude refunds and chargebacks, reversal rules | Platform used for existing programs |
| email-marketing | Authenticated sending and consent first | SPF, DKIM, DMARC checklist, flow map | No promises on inbox placement. ESP acceptance varies, so verify | Marketing automation experience |
| business-dashboards | One reporting layer across orders, payments, inventory, affiliates, fulfilment, support | Interactive sample dashboard | Sample data labelled as such | What has been built and can be shown |
| customer-support | Support without giving usage guidance | Ticket taxonomy and deflection macros | Support must not give dosing or usage advice, a rule built into macros | Tools used |

## 7. Internal linking architecture

Rules:
1. Hub and spoke. Homepage links to the services hub and each pillar. Services hub links to all ten. Each service links to two or three related services, its relevant case studies and two or three articles.
2. Every case study links to the services used on that project, using descriptive anchor text such as "payment infrastructure" rather than "click here".
3. Every article links to one primary service page, up to two related articles, and one case study where it genuinely fits.
4. Resources hub links to topic hubs. Topic hubs link to articles.
5. Components make this systematic: `RelatedServices`, `RelatedCaseStudies`, `RelatedArticles`, `Breadcrumbs`, all fed by typed relation fields, so links never depend on remembering to add them.
6. A build-time script computes the link graph and fails if any indexable page has zero inbound internal links or if any internal link 404s.

## 8. Call-to-action map

| Visitor stage | CTA language | Destination |
|---|---|---|
| Just arrived | Tell us what you need | /contact |
| Exploring | Explore our services | /services |
| Evidence seeking | See what we have built, Read the case study | /case-studies |
| Specific problem | Discuss your payment setup, Get a website assessment, Discuss a content review | /contact with the service preselected (`?service=`, canonical stays /contact) |
| Ready | Start your project | /contact |

## 9. Portfolio and case-study presentation

- Homepage: horizontal scroll showcase, six cards, asymmetric sizes, actual screenshots, desktop and mobile frames, hover transitions.
- `/case-studies`: filterable by service and category (client-side state, not indexable URLs), asymmetric grid.
- Card contents: brand name, live URL as a real link (`rel="noopener"`), screenshot with capture date, one-line description, category, verified services only, live link, case-study link only when a case study exists.
- Case-study template, 12 sections from the brief, each field carrying `value`, `source`, `verifiedOn`, `status`. `needs-confirmation` fields do not render in production, and the build fails if a page would render one. Measurable outcomes appear only with a dated source, for example a Search Console export.
- Launch candidates: Veracue Labs, 99 Purity Peptides, PrimeTime BioLabs (repos and documentation exist). The other three get cards linking to the live site until material exists.

## 10. Contact page: interactive qualification quiz

Five steps in the order the brief gives, with a visible progress list (`ol`, `aria-current="step"`, "Step 2 of 5").

| Step | Content | Logic |
|---|---|---|
| 1 | Business status (four options) | Required single choice |
| 2 | Services required (one option per service plus a complete-infrastructure option, multi-select) | "Complete business infrastructure" is exclusive: choosing it clears other choices and shows a note |
| 3 | Website information | Shown if status is "already have a website" or services include website redesign. Otherwise skipped. URL validated, with an "I do not have one yet" option |
| 4 | Additional details | Requirements and current challenges, plain textareas with limits |
| 5 | Contact | Full name, business name, email, WhatsApp number, website URL if not given earlier, consent checkbox (unchecked by default, linked to the Privacy Policy) |

Behaviour and backend:
- Shared Zod schema on client and server. Errors are linked with `aria-describedby`, `aria-invalid`, and an error summary receives focus on failed submit.
- Transitions use Motion with a reduced-motion fallback. Progress is held in client state (no PII in the URL or in storage).
- Spam protection: Cloudflare Turnstile, a honeypot field, server-side validation, and rate limiting.
- `POST /api/inquiry` validates, verifies the Turnstile token, and sends through Resend to `INQUIRY_TO_EMAIL`. It returns success only when Resend returns a message id. Otherwise the user sees a clear error and a visible email fallback. The form never shows a success state the backend did not confirm.
- A notifier adapter (`lib/notifiers`) fans out to email now and WhatsApp later. Adding WhatsApp Cloud API means writing one adapter and setting environment variables, with no form rebuild.
- Analytics events carry no personal data: `quiz_start`, `quiz_step_complete`, `quiz_submit_success`, `quiz_submit_error`.

## 11. Content plan (Resources)

Original and sourced, not templated. Regulatory statements carry dates and primary links, and counsel reviews them before publishing. Wave 1 ships with the site, wave 2 follows.

| Wave | Working title | Intent | Links to |
|---|---|---|---|
| 1 | The infrastructure behind an RUO peptide business: a complete map | Informational pillar | /services |
| 1 | Why "research use only" on a label is not a compliance strategy | Informational | compliance-support |
| 1 | 503A and 503B explained, and why they do not describe ordinary RUO retail | Informational | compliance-support |
| 1 | How to review a peptide supplier's documentation | Informational | supplier-verification |
| 1 | Payment processing for RUO stores: how underwriting works and what to prepare | Commercial investigation | payment-processing |
| 1 | Peptide store architecture: categories, variants, batch documents and gates | Commercial investigation | website development |
| 1 | Redesigning a peptide store without losing rankings | Commercial investigation | website development |
| 1 | Affiliate programs for research brands: attribution, net sales and reversals | Informational | affiliate-management |
| 2 | Reading a certificate of analysis: what it shows and what it does not | Informational | supplier-verification |
| 2 | Held funds and reserves: cash-flow planning for high-risk merchants | Informational | payment-processing |
| 2 | Technical SEO for peptide e-commerce: category pages, schema, sitemaps | Informational | website development |
| 2 | SPF, DKIM and DMARC for store email | Informational | email-marketing |
| 2 | Pixel and Conversions API event design for stores with strict ad policies | Informational | meta-advertising |
| 2 | Questions to ask a 3PL before you sign | Informational | fulfillment-logistics |

## 12. Open questions, with defaults if you do not answer

| # | Question | Default I will use |
|---|---|---|
| 1 | Relationship between Peptomoon or Belk Digital, Vanta Foundry and each of the six sites. Owner, client or group brand? Consent to be featured? | Describe as "websites we designed, developed and maintain". Do not use the word "clients" or testimonials. Hold any site where consent is unclear |
| 2 | Which services are delivered today? | Use the status table in section 3 |
| 3 | Named counsel or regulatory partner? Any referral compensation from processors, suppliers, 3PLs? | Say we "coordinate with qualified professionals" without naming anyone. Add a disclosure page section once you answer |
| 4 | Counsel review of the live sites before featuring them? | Recommended before launch. Without it, case studies avoid compliance claims entirely |
| 5 | Search Console access or exports for the six sites, and what may be published | No metrics published. Evidence section omitted |
| 6 | Where are Helix, Certified Aminos and Amino Based project records? | Cards only until material exists |
| 7 | Legal entity, address, contact email, WhatsApp number, domain, destination email | `[[CONFIRM]]` tokens that block production builds |
| 8 | Screenshots: crop or blur product names? | Capture product pages sparingly, homepages and shop views mostly |
| 9 | Stock imagery. Your Foundry notes say owner rejected stock photos twice | Real screenshots, original diagrams and abstract system graphics. A handful of macro or industrial stock images only if you approve, each licence logged. The Unsplash connector also needs authorisation before I could use it |
| 10 | Font purchase | Free alternative |
| 11 | Real keyword data | Qualitative SERP research only until Semrush units or an Ahrefs plan are available |
| 12 | Language | English only |
| 13 | Prices | None published |
| 14 | Does Peptomoon itself need an age gate? | No. It sells services to businesses. A short business-to-business notice in the footer |

## 13. Copy and evidence rules (enforced in code where possible)

1. No em dashes in site copy. A lint script scans content and templates.
2. No lorem ipsum, invented statistics, logos, testimonials, certifications, partnerships or case-study outcomes.
3. No "guaranteed", "FDA compliant", "approved", "bypass", "undetectable" and similar. A denylist check runs in the prebuild.
4. Regulatory statements are dated and link to primary sources.
5. Unconfirmed capabilities are labelled by `deliveryStatus`.
6. Sample data and illustrations are labelled as such on the page.
