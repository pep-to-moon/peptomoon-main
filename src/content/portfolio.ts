import type { PortfolioItem } from "./types";

const CAPTURED = "2026-11-17";
const desktop = (slug: string) => ({ src: `/portfolio/${slug}/desktop.webp`, width: 1440, height: 900 });
const mobile = (slug: string) => ({ src: `/portfolio/${slug}/mobile.webp`, width: 780, height: 1688 });
const shop = (slug: string) => ({ src: `/portfolio/${slug}/shop.webp`, width: 1440, height: 900 });

/**
 * Facts here come from the live sites (sitemaps, markup, screenshots) and project repositories on the capture date.
 * Counts change as the stores change. Re-run `pnpm capture:portfolio` and review this file when updating.
 */
export const portfolio: PortfolioItem[] = [
  {
    slug: "99-purity-peptides",
    name: "99 Purity Peptides",
    url: "https://99puritypeptides.com/",
    host: "99puritypeptides.com",
    category: "Bilingual RUO e-commerce",
    blurb:
      "An English and Spanish storefront with kit pricing, a members-only catalog tier and batch-level certificate links on product pages.",
    facts: [
      "English and Spanish storefront with language alternates",
      "Members-only catalog tier with member pricing",
      "Pack-size pricing on product pages",
      "Batch certificate link on product pages",
    ],
    services: ["Website design and development", "E-commerce build", "Bilingual structure and technical SEO", "Affiliate pages"],
    accent: "sky",
    images: { desktop: desktop("99-purity-peptides"), mobile: mobile("99-purity-peptides"), shop: shop("99-purity-peptides") },
    alt: {
      desktop: "99 Purity Peptides homepage on desktop, showing a research peptide vial and a featured product card",
      mobile: "99 Purity Peptides homepage on a phone",
      shop: "99 Purity Peptides shop page on desktop",
    },
    captured: CAPTURED,
    caseStudy: true,
  },
  {
    slug: "veracue-labs",
    name: "Veracue Labs",
    url: "https://veracuelabs.com/",
    host: "veracuelabs.com",
    category: "CMS-managed RUO e-commerce",
    blurb:
      "A 95-product RUO catalog on a CMS-managed storefront, with a hosted card checkout integration, affiliate pages and a blog publishing pipeline.",
    facts: [
      "95 product pages across eight research categories and nasal spray formats",
      "Mega-menu navigation grouped by research field",
      "Product photography led visual identity",
      "Automated storefront tests",
    ],
    services: ["Website design and development", "E-commerce build", "CMS and content pipeline", "Payment checkout integration", "Affiliate pages"],
    accent: "yellow",
    images: { desktop: desktop("veracue-labs"), mobile: mobile("veracue-labs"), shop: shop("veracue-labs") },
    alt: {
      desktop: "Veracue Labs homepage on desktop with the headline Peptides Built for the Bench, Not the Hype",
      mobile: "Veracue Labs homepage on a phone",
      shop: "Veracue Labs shop page on desktop",
    },
    captured: CAPTURED,
    caseStudy: true,
  },
  {
    slug: "helix-bio-chem",
    name: "Helix Bio Chem",
    url: "https://helixbiochem.com/",
    host: "helixbiochem.com",
    category: "Content-led RUO e-commerce",
    blurb:
      "A 98-product catalog with a certificate hub and one of the largest article libraries in the set, behind a cinematic loading introduction.",
    facts: [
      "98 product pages",
      "More than 100 article pages",
      "Certificate hub",
      "Wholesale and affiliate pages",
    ],
    services: ["Website design and development", "E-commerce build", "Content architecture", "Technical SEO"],
    accent: "steel",
    images: { desktop: desktop("helix-bio-chem"), mobile: mobile("helix-bio-chem"), shop: shop("helix-bio-chem") },
    alt: {
      desktop: "Helix Bio Chem homepage on desktop with an underwater vial photograph",
      mobile: "Helix Bio Chem homepage on a phone",
      shop: "Helix Bio Chem shop page on desktop",
    },
    captured: CAPTURED,
    caseStudy: false,
  },
  {
    slug: "primetime-bio-labs",
    name: "PrimeTime BioLabs",
    url: "https://www.primetimebiolabs.com/",
    host: "primetimebiolabs.com",
    category: "Dark, high-contrast RUO e-commerce",
    blurb:
      "A dark storefront with 21 products, a certificate hub, a 33-article research blog and a documented technical SEO audit trail.",
    facts: [
      "21 product pages and 33 articles",
      "Product and list structured data on listings",
      "FAQ hub built from approved questions",
      "Dated technical audits from September 2026",
    ],
    services: ["Website design and development", "E-commerce build", "Technical SEO audits", "Maintenance"],
    accent: "canvas",
    images: { desktop: desktop("primetime-bio-labs"), mobile: mobile("primetime-bio-labs"), shop: shop("primetime-bio-labs") },
    alt: {
      desktop: "PrimeTime BioLabs homepage on desktop with a dark landscape and floating vial",
      mobile: "PrimeTime BioLabs homepage on a phone",
      shop: "PrimeTime BioLabs shop page on desktop",
    },
    captured: CAPTURED,
    caseStudy: true,
  },
  {
    slug: "certified-aminos",
    name: "Certified Aminos",
    url: "https://certified-aminos.com/",
    host: "certified-aminos.com",
    category: "Bold-identity RUO e-commerce",
    blurb:
      "A 51-product catalog with sale-price display, a certificate hub and 52 articles, set in a deep navy and acid lime identity.",
    facts: ["51 product pages and 52 articles", "Sale pricing on cards and product pages", "Certificate hub", "Affiliate pages"],
    services: ["Website design and development", "E-commerce build", "Content architecture", "Technical SEO"],
    accent: "sky",
    images: { desktop: desktop("certified-aminos"), mobile: mobile("certified-aminos"), shop: shop("certified-aminos") },
    alt: {
      desktop: "Certified Aminos homepage on desktop with the headline Precision Beyond Purity and a vial and box",
      mobile: "Certified Aminos homepage on a phone",
      shop: "Certified Aminos shop page on desktop",
    },
    captured: CAPTURED,
    caseStudy: false,
  },
  {
    slug: "amino-based",
    name: "Amino Based",
    url: "https://www.aminobased.com/",
    host: "aminobased.com",
    category: "Technical-dossier RUO e-commerce",
    blurb:
      "A 50-product catalog with per-product technical dossier sections and institutional purchasing information, in a light, editorial layout.",
    facts: [
      "50 product pages",
      "Technical dossier sections on product pages",
      "Institutional purchase terms in the FAQ",
      "Product and navigation structured data on the homepage",
    ],
    services: ["Website design and development", "E-commerce build", "Technical SEO"],
    accent: "yellow",
    images: { desktop: desktop("amino-based"), mobile: mobile("amino-based"), shop: shop("amino-based") },
    alt: {
      desktop: "Amino Based homepage on desktop with a serif headline and a vial inside a water ring",
      mobile: "Amino Based homepage on a phone",
      shop: "Amino Based shop page on desktop",
    },
    captured: CAPTURED,
    caseStudy: false,
  },
];

export function getPortfolioItem(slug: string) {
  return portfolio.find((p) => p.slug === slug);
}
