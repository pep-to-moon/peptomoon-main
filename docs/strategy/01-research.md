# 01. Research findings

Legend: [V] verified primary source, [O] observed directly, [R] reported by secondary source, [A] assumption or recommendation.
Research date: 2026-11-17. Method notes and limits are in section 9.

## 1. Market and demand

- US Google search interest for "research peptides" [V, TrendsMCP weekly series]: about 2 in 2022, about 5 average in 2024, about 15 in mid 2025, 31 to 47 in Nov to Dec 2025, peak 100 in the week of 2026-04-18, then a fall to 40 by Aug 2026 and 24 in the week of 2026-11-14. Values are relative (0 to 100), not search volumes.
- Interpretation [A]: demand grew several fold in two years, then fell back sharply after spring and summer 2026. The timing overlaps regulatory news (section 4), but this data does not prove cause. Plan for volatility and avoid positioning around a peak.
- Third-party commentary [R] says ordinary processors usually decline peptide accounts, high-risk processors typically apply reserves and limits, and chargeback ratios need to stay well under common review thresholds. These are vendor and blog statements, so the site must phrase them as industry conditions that vary, not facts about specific providers.

## 2. Business-model reference sites (research only, nothing copied)

### Hardproof (hardproof.io) [O]
- Offer: one product, "Store in a Box", a done-for-you research peptide store sold to aspiring individual operators. Includes storefront, admin, affiliate program, payment processing "in your name", supplier introductions, compliance templates and a 21+ age gate. Email, SMS and ad management are add-ons.
- Funnel: one-page homepage and an 8-step quiz ending in a call booking. No blog, resources, pricing, case studies or team pages. /sitemap.xml and /robots.txt both 404.
- Proof: "100+ stores built" (no list), press logos with no article links, no named clients, no testimonials. All unverifiable from the site.
- Price: undisclosed, described as a "multi-five-figure investment".
- Compliance framing: "compliance built in", "no human-use or health claims, no dosing", "approval is the processor's call". Details deferred to a sales call.
- Weak spots: income-oriented audience framing, proof gaps, terms with inconsistent effective dates (Aug 21 versus Jul 26, 2026).

### Vanta Foundry (vantafoundry.com) [O]
- Offer: vertically integrated. Wholesale supply, white label, factory-direct, 3PL, websites, payment processing, ads, SEO and GEO, email and SMS. B2B audience (new brands and scaling brands).
- Content: large guide library (18 buyer guides, 33 brand guides reported on its hub), glossary, per-service pages of roughly 10 to 15 KB each, FAQs on each, Spanish mirror with hreflang, `robots.txt` that allows GPTBot, ClaudeBot, PerplexityBot and other AI crawlers. Service pages are templated.
- Proof: names sister brands (including Veracue Labs, Helix Bio Chem, PrimeTime BioLabs), "Agency-reported" metrics, one unnamed client with "734k impressions". Independence of proof is limited because the brands are affiliated.
- Pricing: none published ("There is no published rate card").
- Compliance framing: consistent RUO footer, "no cloaking", "no one can guarantee approvals or rankings". Risk areas I noted: catalogue includes GLP-class and other high-scrutiny compounds, outcome-leaning claims on SEO and AI search, a "fewer bans" claim about running client ads on agency ad accounts, inconsistent timelines ("two weeks", "72 hours to a week", "eight days").
- Weak spots: conflict of interest (sells the catalogue it operates), thin independent proof, undisclosed processor economics.

### Common patterns [O]
Both sell "live in about two weeks" bundles, name processor approval as the step nobody controls, stress "in your name" ownership, publish no prices, route to a call or chat, and leave processors and suppliers unnamed. Neither shows team bios or independent testimonials.

## 3. Wider competitor landscape [R]

- Dedicated niche agencies exist (for example Amino Websites on Clutch, "8+ years" self-reported).
- Many Fiverr and freelance gigs sell WooCommerce or Shopify peptide stores with "FDA compliant" claims. Those claims are seller marketing and unverified.
- Adjacent vendors: affiliate software (Refersion, Tapfiliate, iDevAffiliate, Dub, Rewardful are used by peptide brands), cold-chain 3PLs (AMZ Prep, 3PLGuys, Flow Fulfillment, RapidFulfillment all advertise peptide fulfilment, claims unverified), high-risk processor brokers.
- SERP composition seen for agency, payments, fulfilment and COA queries: dominated by vendor marketing pages, Fiverr gigs, and low-quality static sites on free hosts. Authoritative, experience-backed content is scarce.

## 4. Regulatory and platform findings

| Topic | Finding | Status |
|---|---|---|
| FAQ rich results | Google's changelog: FAQ rich result feature "no longer shown in Google Search results", documentation removed, May 2026 entries. | [V] |
| FDA and RUO labels | Warning letters (Summit Research Peptides Dec 2024, Gram Peptides Mar 2026, four letters 2026-08-24 including Tex Peptides) reportedly state products are intended as drugs for human use despite "research use only" labelling, relying on intended-use principles (21 CFR 201.128) and marketing context such as bacteriostatic water, reconstitution supplies, peptide calculators and dosing guides. Letters reportedly based on website review only. | [R]. FDA URLs returned 404 to my fetcher. Re-read the letters in a browser before any copy cites them. |
| 503A status | BPC-157 reportedly removed from the FDA Category 2 "do not compound" list in April 2026 (sources give Apr 15 or Apr 23). FDA's briefing proposed NOT adding BPC-157 to the 503A bulks list. The advisory committee voted 8 to 6 on 2026-07-23 to recommend adding it, non-binding, against FDA reviewers. One source says no final FDA action had been published as of 2026-10-20. Headlines saying FDA "clears" peptides overstate a non-binding vote. | [R] |
| Stripe | Stripe's prohibited and restricted businesses page lists "Incorrectly labelled research chemicals", "Nutraceuticals and pseudo-pharmaceuticals", pharmaceuticals and online pharmacies among restricted categories. Peptides are not named in the extracted text. | [V] for the quoted categories |
| PayPal, Square | PayPal policy returned 403, Square policy rendered no text to my fetcher. | Not verified. Read in a browser before naming specifics. |
| Meta | Meta's drugs and pharmaceuticals and unsafe substances pages are JavaScript rendered and returned no text. Search results show a state attorney general letter about unapproved GLP-1 ads and other third-party commentary only. | Not verified. The Meta service page must say eligibility is decided by Meta and cannot be promised. |
| Reconstitution and usage content | Treated as a risk signal by the reported letters. | [R] |

Implications for Peptomoon's own copy [A]:
- Never state or imply a site, product or client is "compliant", "FDA compliant" or "approved".
- Never publish dosing, reconstitution, usage or outcome content on peptomoon.
- Explain 503A and 503B only as the licensed-pharmacy framework, explicitly distinct from ordinary RUO retail.
- Cite primary sources (FDA, eCFR, Google, Meta) and date every regulatory statement, since this area changes quickly.
- Ask counsel to review the compliance service page, the legal pages and the portfolio selection before launch.

## 5. Customer pain-point map

| Pain | Evidence | Peptomoon response | Page |
|---|---|---|---|
| Payment accounts frozen, funds held, settlement delays | [R] widespread industry reporting, Stripe policy categories [V] | Underwriting preparation, provider fit, monitoring, reconciliation workflows. No approval promises. | /services/payment-processing |
| Unreliable suppliers, weak documentation | [R], and inconsistencies seen across live retail sites [O] (purity claims, batch COA availability) | Documentation review framework, scorecards, batch-matched COA checks | /services/supplier-verification |
| RUO label mistaken for compliance | [R] FDA letters, [O] common patterns on retail sites | Content risk reviews, documentation index, coordination with qualified professionals | /services/compliance-support |
| Outdated, slow, poorly structured sites | [O] portfolio gaps in section 6 of file 02 show the issue exists even in well-built stores | Industry-specific architecture, technical SEO, performance | /services/ruo-peptide-website-development |
| Fragmented tooling | [O] each reference agency sells bundles because of it | Connected systems and dashboards | /services/business-dashboards |
| Ads, tracking, affiliates, email | [R] | Measurement infrastructure, affiliate mechanics, authenticated email | meta-advertising, affiliate-management, email-marketing |

## 6. Differentiation opportunities for Peptomoon [A]

1. **Verifiable proof.** Six live sites anyone can open, with specifics, instead of unlinked logos or unnamed clients.
2. **Engineering depth.** Next.js and a headless CMS stack with tests, audits and observability, versus templates and gigs.
3. **Honest compliance posture.** Explain limits ("a label is not compliance") instead of selling "compliance built in".
4. **Connected ecosystem.** Payments, orders, fulfilment, affiliates and email wired to one reporting layer.
5. **Transparent process.** Publish what we do, what we do not do, and what nobody can guarantee. Publish disclosures of any referral compensation.
6. **Real content.** Original, sourced guides with dated regulatory notes, not templated pages.

## 7. Design reference findings (evidence from markup, CSS and scripts only)

I could not view these sites as rendered video. Findings below come from downloaded HTML, CSS and script files. A true motion review needs a live browser session; the first design review in Phase 3 should do that.

| Site | Platform | Fonts found | Motion and libraries found | Transferable principle |
|---|---|---|---|---|
| mistral.ai | Astro | ALTMistral, DM Mono (plus KaTeX for math) | GSAP, ScrollTrigger, SplitText, Three.js, Lenis, Lottie, Swiper | Strong monospace micro-labels against large display type; proof by vertical segment |
| awsmd.com | Next.js (pages router) | Plus Jakarta Sans, Inter, Helvetica Neue, Freigeist Con (a DEMO licensed file), others | GSAP, ScrollTrigger, Lenis, Swiper | Numbered section index (01 to 06); proof stack in first two screens. Note it ships a demo-licensed font file, a licensing mistake to avoid. |
| medusmo.com | Webflow | Inter, Doumbar | GSAP 3.12, CustomEase, ScrollTrigger, ScrollTo, Lenis 1.0, SplitText, Swiper, Splide, Lottie. Palette values: #31312f, #dafb71, #4734f7 | Metrics row with precise figures; numbered process with outcome lines |
| motorium.framer.website | Framer template | Inter | No external animation library seen | Proof line above headline; numbered three-step process |
| fixaplan.com | Framer | Inter, Instrument Serif | Lenis (framer build) | Short declarative headings; repeated low-pressure CTAs |
| sohub.digital | unknown | not inspected | not inspected | Unreachable: timed out twice in the fetcher and returned nothing to a direct request. Needs retry in a browser. |
| unitedcarriers.com (typography reference) | Webflow | BT Steinhart, BT Steinhart Mono, Helvetica Neue | Lenis, Barba, Swiper, GSAP, Three.js | Heavy squared grotesk display type, mono labels, light small body text |

Pattern across the sites I could inspect: GSAP plus ScrollTrigger plus Lenis is the dominant combination, which matches the libraries already used in your repos.

## 7. Typeface identification: unitedcarriers.com [O]

From the site's stylesheet `@font-face` rules:
- Headings: **BT Steinhart** Medium (500) and Bold (700). h1 rule: 38px, weight 700, line-height 44px at the base breakpoint.
- Nav, buttons, labels: **BT Steinhart Mono** Regular (400).
- Body: **Helvetica Neue** Roman (400) and Medium (500).
- Files are subset `.woff2` served from the Webflow CDN, which indicates licensed webfonts. Licence terms for our use are **unverified**, so these cannot be used without purchase.
- Site palette variables seen: primary #0016cb, secondary #f50, dark #111. Not relevant to our palette.

Open-source direction (final pick by specimen test in Phase 3, see file 05): a squared, bold grotesque for display, a mono for labels, a clean grotesque for body. Candidates are all SIL OFL fonts available through `next/font`.

## 8. Technology version check [V] (npm registry, 2026-11-17)

next 16.4.6, react 19.3.1, tailwindcss 4.3.5, motion 14.14.0, gsap 3.15.1, lenis 1.3.27, payload 3.93.0, zod 4.6.7, react-hook-form 7.92.0, resend 6.38.1, lucide-react 1.73.0. Local Node is 22.12.0. Your existing repos pin older versions (for example Next 16.2.6, Payload 3.84.1). Verify GSAP's current licence terms and Next.js 16 documentation at install time.

## 9. Limits of this research

- No keyword volumes or difficulty scores (tool access, see summary point 7).
- FDA letters, Meta policy, PayPal and Square policies not read in primary form.
- Competitor pages were read through a text-conversion fetcher, so their `<head>` data was not visible. Portfolio sites were additionally checked by downloading their HTML directly.
- Screenshots captured so far show the age-gate or loading screen on top of each homepage, not the full design. Full captures need the gate dismissed (Phase 4 script).
- sohub.digital not inspected.
