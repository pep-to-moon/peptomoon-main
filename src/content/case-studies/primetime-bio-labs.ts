import { siteConfig } from "@/config/site";
import type { CaseStudy } from "../types";
import { unconfirmed, verified } from "./helpers";

const brand = siteConfig.name;
const SITE = "Live site, response headers, sitemap and screenshots, 17 November 2026";
const REPO = "Repository dependencies and audit documents";

export const primetimeBioLabs: CaseStudy = {
  slug: "primetime-bio-labs",
  seo: {
    title: `PrimeTime BioLabs Website Case Study | ${brand}`,
    description:
      "How our partner built primetimebiolabs.com: a dark, high-contrast RUO peptide store with 21 products, 33 articles and a documented SEO audit trail.",
  },
  primaryKeyword: "PrimeTime BioLabs website case study",
  headline: "A dark, high-contrast RUO store with a documented SEO audit trail",
  intro: verified(
    "PrimeTime BioLabs is a research-use-only peptide store at primetimebiolabs.com. Our partner designed and built the site.",
    `${SITE}; owner statement`,
  ),
  overview: verified(
    [
      "The store lists 21 products across nine research categories, with a certificate hub and a research blog of 33 articles in the sitemap on 17 November 2026.",
      "Product pages carry a certificate of analysis box showing batch reference, date and purity result.",
    ],
    SITE,
  ),
  requirements: verified(
    [
      "A dark, high-contrast storefront suited to scientific products.",
      "A shop with category filters, sorting, and product pages with size selection.",
      "A certificate hub and a downloadable certificate on each product page.",
      "A research blog and a FAQ hub built from approved questions.",
      "Affiliate and discount pages.",
    ],
    `${SITE}; audit documents`,
  ),
  challenges: unconfirmed([]),
  design: verified(
    [
      "A black and indigo identity with extended display type and a full-screen age acknowledgement.",
      "A homepage sequence from featured product and best sellers to categories, quality commitments, certificates, articles and questions.",
    ],
    "Live site screenshots, 17 November 2026",
  ),
  architecture: verified(
    [
      "Next.js App Router with Payload CMS and PostgreSQL, with product, blog and FAQ routes.",
      "Category filtering through query parameters on the shop page and product pages at /product/{slug}.",
    ],
    `${REPO}; sitemap`,
  ),
  ecommerce: verified(
    [
      "Product pages with size selection, quantity, add to cart, stock status and related products.",
      "Wishlist and account routes, and free-shipping threshold messaging.",
      "Account, checkout and order confirmation paths excluded from search through robots rules.",
    ],
    SITE,
  ),
  technical: verified(
    [
      "Next.js 16, React 19, Payload CMS 3 with PostgreSQL, Resend for email and Stripe client libraries.",
      "GSAP and Lenis for motion.",
    ],
    REPO,
  ),
  seoNotes: verified(
    [
      "Canonical, Open Graph and Twitter card tags and an explicit robots index directive on the homepage.",
      "Organization, WebSite with site search, WebPage, ItemList, Product and FAQ structured data.",
      "A single sitemap listing 15 pages, 21 products and 33 articles on 17 November 2026, with robots rules keeping account, checkout and administration paths out of search.",
    ],
    "Homepage HTML, sitemap and robots file, 17 November 2026",
  ),
  maintenance: verified(
    [
      "In September 2026 read-only technical audits were produced covering canonical URL consistency, duplicate product URLs, page title length, FAQ hub structure, and social tags and image alt text.",
    ],
    `${REPO}; owner statement`,
  ),
  outcomes: unconfirmed([]),
  services: ["ruo-peptide-website-development", "affiliate-management"],
  related: ["veracue-labs", "99-purity-peptides"],
};
