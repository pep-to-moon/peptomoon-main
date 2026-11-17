import { siteConfig } from "@/config/site";
import type { CaseStudy } from "../types";
import { unconfirmed, verified } from "./helpers";

const brand = siteConfig.name;
const SITE = "Live site, sitemap and screenshots, 17 November 2026";
const REPO = "Project README and repository structure";

export const veracueLabs: CaseStudy = {
  slug: "veracue-labs",
  seo: {
    title: `Veracue Labs Website Case Study | ${brand}`,
    description:
      "How we designed, built and maintain veracuelabs.com: a CMS-managed RUO peptide store with 95 product pages, hosted checkout and a blog pipeline.",
  },
  primaryKeyword: "Veracue Labs website case study",
  headline: "A 95-product RUO catalogue on a CMS-managed storefront",
  intro: verified(
    "Veracue Labs is an online store for research-use-only peptides at veracuelabs.com, supplying customers in the United States. We designed and built the storefront and its content system and continue to maintain it.",
    `${SITE}; owner statement`,
  ),
  overview: verified(
    [
      "Veracue Labs sells research-use-only peptides, with shipping limited to the United States.",
      "The catalogue spans eight research categories plus nasal spray formats, with 95 product pages listed in the sitemap on 17 November 2026.",
      "The site includes a research blog, a certificate hub and affiliate pages.",
    ],
    `${SITE}; ${REPO}`,
  ),
  requirements: verified(
    [
      "A storefront with categories, product pages with sizes and variants, a cart and checkout.",
      "Customer accounts, order history and an administration area where staff manage products, orders, coupons and affiliates.",
      "Several payment methods that staff can switch on or off without a code change.",
      "An affiliate programme with referral tracking.",
      "A blog the team can publish to, with a way to import drafted articles.",
    ],
    REPO,
  ),
  challenges: unconfirmed([]),
  design: verified(
    [
      "A visual identity built around product photography on neutral backgrounds, with a restrained palette and a bold grotesque headline style.",
      "A full-screen research-use and age acknowledgement shown on arrival.",
      "Mega-menu navigation grouped by research field, formulation and support content, with search and an account area.",
    ],
    "Live site screenshots and navigation, 17 November 2026",
  ),
  architecture: verified(
    [
      "Next.js App Router with separate route groups for the storefront, authentication and the administration area.",
      "Payload CMS collections for products, orders, users, coupons and affiliates, on a PostgreSQL database.",
      "Route handlers for search, social image generation, webhooks and scheduled jobs.",
      "Static content such as the FAQ held in typed data files, with site copy kept in one message catalogue.",
    ],
    REPO,
  ),
  ecommerce: verified(
    [
      "Product pages with size selection, quantity, add to cart and buy now, a compound profile table and numbered sections for product details, research focus, quality standards and compliance notice.",
      "Related products and further reading on each product page.",
      "Customer accounts and a wishlist, with account, cart and checkout paths kept out of search indexes through robots rules.",
      "Coupon codes and a verified military discount flow.",
      "Bundle and bulk pricing for selected products, and a wholesale account request route for institutions.",
    ],
    `${SITE}; robots file`,
  ),
  technical: verified(
    [
      "Next.js 16 and React 19, Payload CMS 3, PostgreSQL, Cloudflare R2 for uploads and Resend for email.",
      "Rate limiting backed by Redis with an in-memory fallback, and optional error monitoring.",
      "Integration tests with Vitest and end-to-end tests with Playwright against a production build.",
      "On production start the server logs the names, never the values, of any important setting that is missing.",
    ],
    REPO,
  ),
  seoNotes: verified(
    [
      "Canonical URL, Open Graph and Twitter card tags on the homepage.",
      "Organization, WebSite, WebPage and contact structured data on the homepage.",
      "An XML sitemap listing 14 pages, 95 products and 6 blog articles on 17 November 2026.",
      "A robots file that keeps account, cart, checkout and administration paths out of search.",
      "An llms.txt file referenced in response headers.",
    ],
    "Homepage HTML, response headers, sitemap and robots file, 17 November 2026",
  ),
  maintenance: verified(
    [
      "We continue to maintain the site. The repository documents routines for database migrations, content updates, maintenance scripts and a blog import pipeline for new articles.",
    ],
    `${REPO}; owner statement`,
  ),
  outcomes: unconfirmed([]),
  services: ["ruo-peptide-website-development", "payment-processing", "affiliate-management"],
  related: ["99-purity-peptides", "primetime-bio-labs"],
};
