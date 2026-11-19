import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const websiteDevelopment: Service = {
  slug: "ruo-peptide-website-development",
  name: "Website development and e-commerce",
  pillar: "build",
  summary: "Custom e-commerce for RUO peptide businesses, built for catalog depth, batch documentation and long-term care.",
  status: "established",
  primaryKeyword: "RUO peptide website development",
  seo: {
    title: `RUO Peptide Website Development | ${brand}`,
    description:
      "Custom Next.js e-commerce for RUO peptide businesses: catalog architecture, batch documentation pages, research-use gates, technical SEO and maintenance.",
  },
  h1: "RUO peptide website development built around how this industry actually works",
  lead: "RUO peptide stores need more than a generic theme. We build custom e-commerce sites where products, variants, batch documents and research-use notices come from structured records, so every page stays consistent. We also redesign, migrate and maintain stores, with technical SEO built in from the start. We do not promise rankings or sales.",
  what: [
    "A website for an RUO peptide business is closer to a documented catalog than a lifestyle shop. Each product has sizes, formats, batch information and notices that must stay accurate, and the same structure repeats across dozens of pages. We build the whole system: the product and category model, cart and checkout, the content system for articles and documents, the research-use and age gates, and the technical foundation that search engines and payment reviewers read.",
    "We build custom sites with Next.js and a headless content system rather than adapting a generic theme. New builds, redesigns of existing stores and migrations from other platforms follow the same discipline: structure first, design second, performance and search foundations from the first commit.",
  ],
  why: [
    "Generic e-commerce templates assume simple products and a lifestyle audience. RUO catalogs often combine single compounds, blends and delivery formats, each with sizes and documentation, and the notices around them need to be consistent on every page.",
    "Your website is also read by the people who decide whether you can operate. Payment reviewers, platform reviewers and supplier partners look at product copy, policies and notices, and at how consistently they appear. Inconsistent claims or missing policy pages create friction that no amount of design fixes.",
    "Search visibility depends on structure. Indexable category pages, clean URLs, accurate structured data and fast pages are architectural decisions, and they cost far less at the start than as a retrofit.",
  ],
  problems: [
    {
      title: "Templates that fit the wrong problem",
      text: "Themes built for apparel or supplements treat variants, documentation and notices as afterthoughts, so teams patch them with plugins that slow the site and drift out of sync.",
    },
    {
      title: "Catalogs that outgrow their structure",
      text: "A store that starts with twenty products and reaches a hundred needs real categories, filters and navigation. Filtering that only works through query strings leaves category pages that search engines cannot treat as pages.",
    },
    {
      title: "Documentation scattered across files",
      text: "Certificates and batch documents that live as loose uploads are hard to keep current. We model documents as data tied to products and batches.",
    },
    {
      title: "Slow, inconsistent pages",
      text: "Heavy scripts, unoptimized images and duplicated components add up. Speed is a design constraint from day one, not a final polish.",
    },
  ],
  approach: [
    { title: "Map the catalog", text: "We start with the product model: compounds, blends, sizes, formats, bundles, documents and how they relate." },
    { title: "Design the journey", text: "Category pages, product pages, cart and checkout are designed for fast, unambiguous decisions, with research-use notices placed where they matter." },
    { title: "Build on a fast foundation", text: "Server-rendered pages, optimized images, a content system your team can edit, and structured data generated from the same content." },
    { title: "Wire in the operations", text: "Payments, order email, fulfillment hooks, affiliate tracking and analytics connect from the start rather than being bolted on." },
    { title: "Maintain", text: "Updates, audits, dependency upgrades and monitoring keep the site healthy after launch." },
  ],
  included: [
    "Custom website development from scratch",
    "Website redesign and migration from another platform",
    "Product catalog, category and collection architecture",
    "Product pages with variants, sizes and documentation",
    "Cart and checkout experiences",
    "Research-use notices and age gates",
    "Third-party integrations",
    "Mobile and tablet optimization",
    "Technical SEO: metadata, sitemaps, canonical URLs, structured data",
    "Speed and Core Web Vitals work",
    "Conversion rate improvements",
    "Maintenance and technical support",
  ],
  process: [
    { title: "Discover", text: "Business model, catalog, current site, constraints and goals." },
    { title: "Architect", text: "Product model, URL structure, templates, integrations and content plan." },
    { title: "Design", text: "Layouts and components reviewed on desktop and phone before build." },
    { title: "Build", text: "Typed, tested components with accessibility and performance checks along the way." },
    { title: "Launch", text: "Redirect map, indexing checks, monitoring and a launch checklist." },
    { title: "Maintain", text: "Scheduled updates and a clear path for changes." },
  ],
  technical: [
    "Next.js App Router with server rendering for catalog and content pages, and client code only where interaction needs it.",
    "A headless CMS for products, articles, documents and global content, with typed schemas.",
    "An image pipeline with modern formats, responsive sizes and fixed dimensions to prevent layout shift.",
    "Sitemaps, canonical tags and structured data generated from the same content that renders the page.",
    "Automated checks for accessibility, links and metadata before each release.",
  ],
  limits: [
    "We do not promise search rankings or sales. We build the strongest foundation we can.",
    "A website cannot make a business compliant. We apply notices and structure consistently and flag content that needs review.",
    "We do not write human-use, dosing or outcome content.",
  ],
  visual: "architecture",
  faqs: [
    {
      q: "Can you redesign my existing store without losing search visibility?",
      a: "That is the aim of a migration plan. We inventory current URLs, map each to its new location, preserve metadata and accurate structured data, add permanent redirects and monitor indexing after launch. No migration is risk free, but a documented plan keeps the risk visible and manageable.",
    },
    {
      q: "Do you build on Shopify or WooCommerce?",
      a: "We build custom sites with Next.js and a headless content system. If you are on another platform we can plan a migration. Platform policies differ, so confirm that any hosted platform you rely on accepts your category before you build on it.",
    },
    {
      q: "What happens after launch?",
      a: "Sites need ongoing care after launch. We offer maintenance that covers software updates, monitoring, content changes and technical support, scoped to what your store needs. That keeps pages fast, notices consistent and integrations working as platforms and policies change, instead of leaving you to fix problems one at a time after something breaks.",
    },
    {
      q: "Do you write the legal notices and policies?",
      a: "We build the structure and place notices consistently across every page, so a notice cannot be missed by accident. The wording of legal notices and policies should be reviewed by your own qualified counsel, because we are not a law firm. We can supply the structure and a list of what each page should carry for that review.",
    },
    { q: "My store has hundreds of products and search traffic has stalled. Where do I start?", a: "Start with structure, not copy. Check that each product has a single address, that categories are real pages with their own headings, that the sitemap lists only pages that should be indexed and that near-identical variants are not competing with each other. Then check speed on a phone. These checks usually explain more than rewriting descriptions does, and we audit them in that order." },
    { q: "Customers say the price or stock on the page does not match the cart. What causes that?", a: "Usually the catalog lives in more than one place: the page, the cart and sometimes a spreadsheet or a plugin. When a price changes in one and not the others, they disagree. The fix is a single source of truth for price, variant and availability, so every page, filter and cart reads the same record, with a check that runs after every update." },
    { q: "How do I keep research-use notices consistent across hundreds of pages?", a: "Do not type them into pages. Define each notice once and let the product template, the cart and the checkout render it. Then a change is one edit, and a missing notice cannot happen by accident. We build this into the template and add a check that fails if a product page ever renders without its notice." },
  ],
  related: ["payment-processing", "vial-label-design", "seo-geo-aeo", "compliance-support", "business-dashboards"],
  caseStudies: ["veracue-labs", "99-purity-peptides", "primetime-bio-labs"],
  articles: ["peptide-store-architecture", "infrastructure-behind-an-ruo-peptide-business", "shopify-vs-custom-peptide-store"],
  cta: { label: "Get a website assessment" },
};
