import { absoluteUrl, siteConfig } from "@/config/site";
import type { Article, Service } from "@/content/types";
import { ogImageFor } from "./og";

const orgId = () => `${siteConfig.url}/#organization`;
const isDummy = (v: string) => v.trim() === "";

/**
 * The organisation as a self-contained object. Search engines do not reliably join a bare "@id" reference to a different
 * script block on the page, so publisher, provider and author carry the name, address and logo themselves.
 */
const orgRef = () => ({
  "@type": "Organization",
  "@id": orgId(),
  name: siteConfig.name,
  url: siteConfig.url,
  logo: { "@type": "ImageObject", url: absoluteUrl("/android-chrome-512x512.png"), width: 512, height: 512 },
});

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId(),
    name: siteConfig.name,
    url: siteConfig.url,
    logo: { "@type": "ImageObject", url: absoluteUrl("/android-chrome-512x512.png"), width: 512, height: 512 },
    image: ogImageFor("/"),
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    knowsAbout: [
      "Research-use-only peptide e-commerce",
      "Payment processing and underwriting preparation",
      "Supplier documentation review",
      "Order fulfillment and logistics",
      "Search engine, generative engine and answer engine optimisation",
      "Website audits",
      "Content and compliance review",
    ],
    ...(isDummy(siteConfig.legalName) ? {} : { legalName: siteConfig.legalName }),
    ...(isDummy(siteConfig.contact.email)
      ? {}
      : { contactPoint: { "@type": "ContactPoint", contactType: "sales", email: siteConfig.contact.email } }),
    ...(siteConfig.social.length ? { sameAs: siteConfig.social.map((s) => s.url) } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: orgRef(),
    inLanguage: "en-US",
  };
}

export function webPageSchema(
  type: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage",
  name: string,
  description: string,
  path: string,
  items?: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    publisher: orgRef(),
    ...(items
      ? {
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: items.length,
            itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.path) })),
          },
        }
      : {}),
  };
}

export function serviceSchema(service: Service) {
  const path = `/services/${service.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name: service.name,
    serviceType: service.primaryKeyword,
    description: service.lead,
    url: absoluteUrl(path),
    image: ogImageFor(path),
    provider: orgRef(),
    audience: { "@type": "BusinessAudience", audienceType: "Research-use-only (RUO) peptide businesses" },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  published: string;
  updated: string;
  wordCount?: number;
  section?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.published,
    dateModified: input.updated,
    image: ogImageFor(input.path),
    ...(input.wordCount ? { wordCount: input.wordCount } : {}),
    ...(input.section ? { articleSection: input.section } : {}),
    author: { "@type": "Organization", "@id": orgId(), name: siteConfig.name, url: siteConfig.url },
    publisher: orgRef(),
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    inLanguage: "en-US",
  };
}

export type ArticleSchemaInput = Pick<Article, "published" | "updated">;
