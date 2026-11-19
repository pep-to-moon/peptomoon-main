import type { Faq } from "./types";

/**
 * Copy for /all-in-one, ported verbatim from the approved source (all-in-one.html, verified 17 Nov 2026).
 * The FAQ array feeds both the visible accordion and the FAQPage JSON-LD, so the two can never drift apart.
 */

/** The 3% / no-rolling-reserve qualifier. Show it wherever the claim appears (this page, the homepage strip and the payment processing service page). */
export const paymentsOfferQualifier =
  "*Rates, reserve terms and approval are decided by the acquiring bank after underwriting and depend on business model, volume, average ticket, processing history and chargeback performance. Processing from 3% and no-rolling-reserve terms are available to merchants who qualify; they are not guaranteed. Peptomoon is not a bank or payment processor. We never misrepresent a business or help anyone bypass a provider's rules. Typical market ranges are industry estimates and vary by provider.";

export const paymentsOfferHeadline = "High-risk payment processing from 3%, no rolling reserve*";

export const heroBadges = ["Research use only", "Compliance-aware", "High-risk ready", "One accountable team"];

export const pillarsStrip = [
  { t: "Build", d: "Custom e-commerce and telehealth platforms" },
  { t: "Run", d: "Payments, fulfillment, support, dashboards" },
  { t: "Grow", d: "SEO, GEO, AEO, email, affiliates, ads" },
  { t: "Verify", d: "Suppliers, COAs, compliance-oriented review" },
];

export const verticals = ["RUO peptides", "Research chemicals", "Telehealth", "Peptide clinics & wellness", "Subscriptions"];

export const paymentStats = [
  { num: "3%", star: true, label: "Processing from", text: "Card processing rates start from 3% for qualifying RUO, peptide and telehealth merchants." },
  { num: "0%", star: true, label: "Rolling reserve", text: "No-rolling-reserve accounts for eligible merchants, so cash flow stays in your business." },
  { num: "1", star: false, label: "Team end to end", text: "Underwriting file, checkout integration, chargeback monitoring and reconciliation in one place." },
];

export const paymentCompare: [string, string, string][] = [
  ["Processing rate", "Commonly 3.5% to 6.5% plus a per-transaction fee", "From 3%"],
  ["Rolling reserve", "Commonly 5% to 15%, held for 3 to 6 months", "None for qualifying merchants"],
  ["Application prep", "Left to you", "We build the underwriting file"],
  ["Checkout integration", "Left to you or your developer", "Built and tested on your site"],
  ["Chargeback monitoring", "Usually extra", "Alerts, ratios and workflows included"],
];

export const paymentIncluded = [
  "High-risk merchant account setup",
  "Underwriting file preparation",
  "Website and policy review for underwriting",
  "Gateway or hosted checkout integration",
  "Recurring billing for telehealth",
  "3-D Secure and address verification",
  "Chargeback alerts and dispute workflows",
  "VAMP ratio monitoring",
  "Payout and fee reconciliation",
  "Shutdown recovery and processor replacement",
  "Backup processor planning",
  "Clear billing descriptors",
];

type LayerCard = { n: string; t: string; d: string; href: string; link: string };

export const layers: { index: string; name: string; cards: LayerCard[] }[] = [
  {
    index: "01",
    name: "Build",
    cards: [
      { n: "Website", t: "RUO peptide e-commerce", d: "Custom Next.js stores with batch-level COA links, calculators, affiliates and fast, crawlable pages.", href: "/services/ruo-peptide-website-development", link: "Website development" },
      { n: "Platform", t: "Telehealth platforms", d: "Patient, provider and admin dashboards, intake, scheduling and subscription billing for your care model.", href: "/services/telehealth-platform-development", link: "Telehealth platform development" },
      { n: "Labels", t: "Vial label design", d: "Print-ready vial labels and packaging with batch, QR and research-use fields laid out to match your COAs and site.", href: "/services/vial-label-design", link: "Vial label design" },
      { n: "Data", t: "Business dashboards", d: "One reporting layer across orders, payments, inventory, affiliates and fulfillment.", href: "/services/business-dashboards", link: "Dashboards" },
    ],
  },
  {
    index: "02",
    name: "Run",
    cards: [
      { n: "Payments", t: "High-risk payment processing", d: "Merchant accounts from 3% with no rolling reserve for qualifying merchants, plus integration and monitoring.", href: "/services/payment-processing", link: "Payment processing" },
      { n: "Logistics", t: "Fulfillment and 3PL", d: "US fulfillment coordination, wholesale supply, dropshipping, tracking and exception workflows.", href: "/services/wholesale-dropshipping-3pl", link: "Wholesale and 3PL" },
      { n: "Support", t: "Customer support", d: "Order-aware helpdesk workflows and a knowledge base that stays inside research-use positioning.", href: "/services/customer-support", link: "Customer support" },
    ],
  },
  {
    index: "03",
    name: "Grow",
    cards: [
      { n: "Search", t: "SEO, GEO and AEO", d: "Visibility in Google and Bing, in AI answers and in direct answers for voice, built on sourced content. Nothing is guaranteed.", href: "/services/seo-geo-aeo", link: "SEO, GEO and AEO" },
      { n: "Retention", t: "Email and affiliates", d: "Lifecycle email, referral tracking and affiliate dashboards that turn first orders into repeat revenue.", href: "/services/affiliate-management", link: "Affiliate management" },
      { n: "Paid", t: "Compliance-aware ads and AI lead generation", d: "Campaigns built where platform policy allows, plus high-intent lead capture and qualification you own.", href: "/services/meta-advertising", link: "Advertising" },
    ],
  },
  {
    index: "04",
    name: "Verify",
    cards: [
      { n: "Suppliers", t: "Supplier and COA verification", d: "Batch-matched certificates from independent third-party labs, checked before a product goes live.", href: "/services/supplier-verification", link: "Supplier verification" },
      { n: "Review", t: "Compliance-oriented review", d: "Product copy, labels, calculators and support scripts reviewed for consistency with RUO positioning.", href: "/services/compliance-support", link: "Compliance support" },
      { n: "Audit", t: "Site audits", d: "Technical, content, payment-readiness and search audits with a prioritized fix list.", href: "/services/site-audits", link: "Site audits" },
    ],
  },
];

export const offerings: { index: string; t: string; tag: string; intro: string; items: string[]; note?: string }[] = [
  {
    index: "01",
    t: "RUO peptide website",
    tag: "Custom quote",
    intro:
      "A custom-coded e-commerce store for research peptides, with no drag-and-drop builder and no off-the-shelf theme. It is designed for catalog depth, batch documentation, conversion and search visibility from launch.",
    items: [
      "Custom Next.js build, fully responsive",
      "Research-focused UI designed for conversion",
      "Product management and secure checkout",
      "Customer accounts and order dashboard",
      "Batch-level COA links on every product",
      "Reconstitution and concentration calculators",
      "Affiliate program, dashboard and referral tracking",
      "Coupon system and loyalty-ready architecture",
      "Advanced search, filters and comparisons",
      "Wishlist, related and frequently-bought-together",
      "Multi-language support",
      "Integrated blog, FAQ hub and review system",
      "Product photography, icons, banners and brand visuals",
      "GA4, Search Console and analytics setup",
    ],
  },
  {
    index: "02",
    t: "Telehealth platform",
    tag: "Custom quote",
    intro:
      "A custom telehealth platform built around your care model, connected to payment processing that supports recurring billing in a high-risk category.",
    items: [
      "Patient, provider and admin dashboards",
      "Intake forms and eligibility questionnaires",
      "Appointment scheduling and reminders",
      "Secure messaging",
      "Prescription and pharmacy workflow integration",
      "Subscription and membership billing",
      "Role-based access and audit logs",
      "Hosting and services that offer BAAs",
      "Encryption in transit and at rest",
      "Reporting and analytics",
    ],
    note: "HIPAA compliance belongs to your organization. We build on infrastructure that supports it and recommend review by a healthcare compliance adviser.",
  },
  {
    index: "03",
    t: "Combined build",
    tag: "Preferential scope",
    intro:
      "An RUO peptide store and a telehealth platform on one shared foundation, with one team, one payment strategy and one reporting layer. As a result, you avoid paying twice for the parts both businesses share.",
    items: [
      "Everything in the RUO website",
      "Everything in the telehealth platform",
      "Shared customer and order data",
      "Separate payment setups per business line",
      "Unified dashboards",
      "One launch plan and one team",
    ],
  },
];

export const searchTicks = [
  "Technical SEO, indexing and Core Web Vitals",
  "Schema markup that matches visible content",
  "Direct-answer blocks and FAQs for AEO",
  "Data tables and cited research for GEO",
  "Bing Webmaster Tools and IndexNow for Bing and Copilot discovery",
  "Monthly reporting from Search Console, Bing and GA4",
];

export const programs: [string, string][] = [
  ["SEO Essentials", "New stores: technical SEO, keyword research, schema, two articles a month, monthly reporting"],
  ["Business Growth", "Scaling brands: advanced SEO, GEO and AEO, four to five articles a month, internal linking, maintenance and a monthly strategy call"],
  [
    "Enterprise Growth",
    "Category leaders: entity optimization, AI Overviews, ChatGPT, Claude, Gemini and Perplexity visibility, eight to ten articles a month, competitor analysis and priority development",
  ],
];

export const addOns = [
  { n: "Documentation", t: "COA program", d: "Third-party certificates of analysis per product and batch, with renewal tracking so nothing on your site goes stale." },
  { n: "Paid search", t: "Google Ads management", d: "Campaign structure, keywords, audiences, landing pages and reporting, built to platform policy. Ad approval is never guaranteed." },
  { n: "Pipeline", t: "AI lead generation", d: "High-intent acquisition, AI-assisted qualification, CRM and funnel integration, and conversion analytics." },
  { n: "Supply", t: "Wholesale and dropshipping", d: "Business-to-business supply and dropshipping for RUO peptide brands, coordinated with your fulfillment." },
];

export const vendorCompare: [string, string, string, string][] = [
  ["Custom code you control", "Yes", "Depends on developer", "No"],
  ["High-risk payments from 3%, no rolling reserve*", "For qualifying merchants", "Broker-dependent", "Often restricted for this category"],
  ["Underwriting file matched to your site", "Yes", "Rarely coordinated", "No"],
  ["Batch-level COAs on products", "Built in", "Manual", "Plugin or manual"],
  ["RUO-consistent copy, labels and support", "Reviewed", "Varies", "Your responsibility"],
  ["SEO, GEO and AEO from launch", "Included foundation", "Separate agency", "Basic"],
  ["Fulfillment and 3PL coordination", "Yes", "Separate contract", "App-dependent"],
  ["One accountable team", "Yes", "No", "No"],
];

export const processSteps = [
  { t: "Discovery", d: "Goals, catalog, markets, payment history and constraints." },
  { t: "Strategy and UX", d: "Design around conversion, credibility and underwriting." },
  { t: "Build", d: "Custom engineering on Next.js with a headless CMS." },
  { t: "Payments", d: "Underwriting file and processor setup, run alongside the build." },
  { t: "Content", d: "Products, COAs, copy and media integrated." },
  { t: "Search foundation", d: "Technical SEO, schema, GEO and AEO from day one." },
  { t: "Test and launch", d: "QA across devices, checkout and performance, then a monitored release." },
  { t: "Grow", d: "Content, optimization and development through monthly programs." },
];

export const limits = [
  "We cannot guarantee merchant approval, specific rates or reserve terms. The acquiring bank decides.",
  "We never misrepresent products, hide business activity or help anyone bypass a provider's rules.",
  "We do not guarantee ad approvals, rankings or AI citations.",
  "We never invent certifications, reviews or lab results.",
  "We are not a law firm, a bank or a payment processor.",
];

export const allInOneFaqs: Faq[] = [
  { q: "What is an all-in-one partner for a peptide business?", a: "An all-in-one partner is one team that builds and runs every layer of a research-use-only (RUO) peptide business: the website, payment processing, fulfillment, supplier and COA documentation, compliance-oriented review and marketing. Instead of six vendors who never talk to each other, you get one plan, one point of contact and systems built to work together from day one." },
  { q: "What is high-risk payment processing?", a: "High-risk payment processing is card acceptance for businesses that banks and card networks treat as carrying elevated chargeback, fraud or regulatory risk. These merchants are underwritten by specialist acquirers rather than mainstream payment platforms. In return, the business usually faces closer review, stricter monitoring and contract terms such as higher rates or reserves." },
  { q: "Why are peptide and RUO businesses considered high risk by payment processors?", a: "Processors weigh product category, regulatory exposure and dispute history. Research peptides sit close to pharmaceutical categories, so many mainstream platforms restrict or decline them. As a result, RUO stores need an acquirer that understands the category, plus a website, labeling and policies that show clearly how the business operates." },
  { q: "Is telehealth considered high risk for payment processing?", a: "Often, yes. Telehealth combines recurring billing, higher ticket sizes and, in many models, prescriptions. Card networks require merchants selling pharmaceuticals card-not-present, including telemedicine providers, to register as high-risk merchants. That is why telehealth brands benefit from a processor and a platform designed for that review from the start." },
  { q: "How low can high-risk payment processing rates go?", a: "Industry rates for high-risk accounts commonly sit several points above standard pricing. Through our acquiring partners, card processing for RUO, peptide and telehealth merchants starts from 3% for businesses that qualify. Your final rate is set by the acquiring bank after underwriting, based on volume, ticket size, history and chargeback performance." },
  { q: "What is a rolling reserve?", a: "A rolling reserve is a share of each day's card sales that the processor holds back for a set period, then releases on a rolling schedule. It protects the acquirer against future chargebacks. For a growing business, however, it ties up cash that would otherwise fund inventory and marketing, so reserve terms matter as much as the headline rate." },
  { q: "Can I get a high-risk merchant account with no rolling reserve?", a: "Yes, for merchants who qualify. We arrange no-rolling-reserve processing for eligible RUO, peptide and telehealth businesses through our acquiring partners. Eligibility depends on underwriting: a clean application, consistent website and policies, healthy chargeback history and realistic volume all help. The acquiring bank makes the final decision." },
  { q: "What documents do I need for a high-risk merchant account?", a: "Expect to provide business formation documents, owner identification, a business bank account, recent bank statements and any previous processing statements. Underwriters also review your live website, product list, refund and shipping policies, supplier documentation and certificates of analysis. We assemble this file with you so nothing is missing or inconsistent." },
  { q: "My payment processor shut down my peptide store. What should I do?", a: "First, read the termination notice and note any held funds and release dates. Next, find out why the account was closed, because the next underwriter will ask. Then fix the website, policies and documentation before applying again. We handle this recovery end to end and implement the new processor on your site, so you can take orders again." },
  { q: "What is the MATCH list?", a: "MATCH is a Mastercard database of merchants whose acquiring bank terminated them for specific reasons, such as excessive chargebacks or fraud. A listing generally stays for five years, and most processors decline listed merchants. That is why preventing termination through chargeback monitoring and accurate underwriting is worth far more than trying to fix it afterwards." },
  { q: "What chargeback ratio keeps a merchant account safe?", a: "Lower is always safer. Since 1 April 2026, Visa's Acquirer Monitoring Program flags US merchants whose combined fraud and dispute ratio reaches 1.5%, and many acquirers apply stricter internal limits. We set up dispute alerts, clear billing descriptors and refund workflows so your ratio stays well below those thresholds." },
  { q: "Can you guarantee merchant account approval?", a: "No one honestly can. The acquiring bank makes every approval and pricing decision. What we control is the quality of your application: an accurate business description, a compliant website, complete documentation and a processor matched to your model. We never misrepresent a business or help anyone get around a provider's rules." },
  { q: "What does research use only (RUO) mean?", a: "Research use only means a product is sold for laboratory research and is not intended for human or veterinary use, diagnosis or treatment. For a peptide business, RUO positioning affects everything: product descriptions, labels, calculators, support scripts, advertising and payment underwriting. We build every layer so it stays consistent with that positioning." },
  { q: "Do you build peptide stores on Shopify or WooCommerce?", a: "We build custom e-commerce on Next.js with a headless CMS. As a result, the store loads fast, ranks well and is not tied to a hosted platform's acceptable-use decisions about your category. You also get features RUO stores need, such as batch-level COA links, reconstitution calculators and affiliate tracking, without stacking third-party plugins." },
  { q: "What features does an RUO peptide website need?", a: "At minimum, it needs a product catalog with batch-level COA links, clear RUO labeling, secure checkout, customer accounts, order management and clear refund and shipping policies. In addition, strong stores add reconstitution calculators, affiliate and coupon systems, multi-language support, a blog and FAQ hub, and structured data built for search and AI answers." },
  { q: "What does a telehealth platform include?", a: "A telehealth platform typically includes patient, provider and admin dashboards, intake forms, appointment scheduling, secure messaging, prescription and pharmacy workflows, subscription billing and reporting. We design these around your care model and connect them to a high-risk payment processor that supports recurring billing in your category." },
  { q: "Is your telehealth platform HIPAA compliant?", a: "HIPAA compliance belongs to your organization, not to software alone. We build on hosting and services that offer Business Associate Agreements, encrypt data in transit and at rest, and add role-based access and audit logs. Your team still owns policies, training and risk assessments, and we recommend a healthcare compliance adviser review the final setup." },
  { q: "What is the difference between SEO, GEO and AEO?", a: "SEO earns rankings in Google and Bing search results. GEO, or generative engine optimization, is the work of being understood and cited accurately in AI answers from ChatGPT, Perplexity and Google AI Overviews, though no one can guarantee a citation. AEO, or answer engine optimization, structures content so engines can lift a direct answer. We build all three into every page." },
  { q: "How do I get my peptide brand cited by ChatGPT and Google AI Overviews?", a: "Start with the basics: pages must be crawlable, indexed and fast. Then publish content AI systems can trust and quote, such as direct answers, data tables, cited research and clear entity information. Google states that its AI features draw on the same index and ranking systems as regular search, so solid SEO remains the foundation." },
  { q: "Can you run Google or Meta ads for research peptides?", a: "Both platforms restrict advertising for unapproved pharmaceuticals and many related products, so peptide ads are often disapproved. We build compliance-aware campaigns where policy allows, and we make no approval promises. Where paid ads are not viable, we shift budget to SEO, email, affiliates and AI lead generation that you own." },
  { q: "What is a certificate of analysis (COA) for peptides?", a: "A certificate of analysis is a lab report that documents the identity and purity of a specific batch, usually using HPLC for purity and mass spectrometry for identity. For a peptide store, a current, batch-matched COA from an independent third-party lab is one of the strongest trust signals for buyers and payment underwriters alike." },
  { q: "How do you verify a peptide supplier?", a: "We check that COAs match the batch, come from an independent lab and can be confirmed with that lab. In addition, we review the supplier's documentation, consistency across batches, packaging and labeling, and lead times. We never invent certifications, and we flag gaps plainly so you can decide before you list a product." },
  { q: "How much does an all-in-one peptide business setup cost?", a: "Every engagement is scoped to your catalog, markets and goals, so we quote after a short discovery call rather than publishing one price. You can start with a single service, such as payment processing or a website, and add the rest later. Your proposal itemizes scope, timeline and anything billed by a third party." },
  { q: "How long does it take to launch?", a: "Timelines depend on catalog size, integrations and how quickly content and documents arrive. During scoping we agree on milestones for design, build, payment integration, testing and launch. Payment underwriting runs in parallel with the build, so your processor is ready when the site is." },
  { q: "Can I hire you for just one service?", a: "Yes. Many clients start with one urgent need, such as replacing a processor that shut them down, and expand later. Because every service is built on the same foundation, anything you add later connects cleanly to what is already running, without the rework you get when switching between vendors." },
];
