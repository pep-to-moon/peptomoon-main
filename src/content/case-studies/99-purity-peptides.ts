import { siteConfig } from "@/config/site";
import type { CaseStudy } from "../types";
import { unconfirmed, verified } from "./helpers";

const brand = siteConfig.name;
const SITE = "Live site, response headers, sitemap and screenshots, 17 November 2026";
const REPO = "Repository dependencies and structure";

export const purity99: CaseStudy = {
  slug: "99-purity-peptides",
  seo: {
    title: `99 Purity Peptides Website Case Study | ${brand}`,
    description:
      "How our partner built 99puritypeptides.com: a bilingual RUO store with a members-only tier, pack-size pricing and batch certificate links.",
  },
  primaryKeyword: "99 Purity Peptides website case study",
  headline: "A bilingual RUO storefront with a members-only catalog tier",
  intro: verified(
    "99 Purity Peptides is a research-use-only peptide store at 99puritypeptides.com with an English and Spanish storefront. Our partner designed and built the site.",
    `${SITE}; owner statement`,
  ),
  overview: verified(
    [
      "The store sells research-use-only peptides as single compounds, kits and nasal spray formats.",
      "A members-only tier opens more of the catalog and applies member pricing, while a public catalog stays browsable.",
      "The site publishes an article library, a certificate hub, affiliate pages and an external review widget.",
    ],
    SITE,
  ),
  requirements: verified(
    [
      "A bilingual storefront with correct language alternates for search engines.",
      "Pack-size pricing on product pages, with per-vial savings shown.",
      "Batch-level certificate documents linked from product pages.",
      "A members-only catalog tier with member pricing.",
      "Affiliate pages and a referral route.",
    ],
    SITE,
  ),
  challenges: unconfirmed([]),
  design: verified(
    [
      "A deep teal and warm off-white identity with wide display headlines and macro product photography.",
      "A full-screen age and research-use acknowledgement on arrival, with an option to continue through Google sign-in.",
      "A homepage sequence from featured product to bundles, laboratory standards, categories, certificates and questions.",
    ],
    "Live site screenshots, 17 November 2026",
  ),
  architecture: verified(
    [
      "Next.js App Router with a locale segment for English and Spanish, and Payload CMS for content.",
      "A shop area, product pages at /product/{slug}, articles at root-level slugs and policy pages in both languages.",
    ],
    `${REPO}; sitemap`,
  ),
  ecommerce: verified(
    [
      "Strength selectors and pack-size pricing for a single vial, five-pack and ten-pack on product pages.",
      "A certificate of analysis link on product pages with a batch reference.",
      "Out-of-stock labeling, free-shipping threshold messaging and a military and first-responder discount flow.",
      "Account, cart and checkout paths excluded from search through robots rules.",
    ],
    SITE,
  ),
  technical: verified(
    [
      "Next.js 16, React 19, Payload CMS 3 with PostgreSQL, S3-compatible storage, Resend for email and next-intl for translations.",
      "GSAP and Lenis for motion, and Sentry for monitoring.",
      "Playwright tests, and documentation in the repository for launch checks, environment settings and the affiliate system.",
    ],
    REPO,
  ),
  seoNotes: verified(
    [
      "Language alternates for English, Spanish and x-default, in response headers and in the sitemap.",
      "Organization, WebSite with site search, WebPage and BreadcrumbList structured data on the homepage.",
      "Canonical, Open Graph and Twitter card tags, and generated social images.",
      "Robots rules that block account, cart and checkout paths and add-to-cart URL parameters.",
    ],
    "Homepage HTML, response headers, sitemap and robots file, 17 November 2026",
  ),
  maintenance: verified(
    ["The repository documents launch checks, environment settings and the affiliate system."],
    `${REPO}; owner statement`,
  ),
  outcomes: unconfirmed([]),
  services: ["ruo-peptide-website-development", "affiliate-management"],
  related: ["veracue-labs", "primetime-bio-labs"],
};
