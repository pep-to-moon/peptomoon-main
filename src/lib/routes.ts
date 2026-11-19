import { getArticles } from "@/content/articles";
import { caseStudies } from "@/content/case-studies";
import { services } from "@/content/services";

export type RouteEntry = {
  path: string;
  lastModified: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

/**
 * Lastmod values for the sitemap. Google uses lastmod only when it is consistently and verifiably accurate, and Bing uses it to
 * decide what to recrawl, so a date here must be the day the page changed in substance, not the day of a deploy.
 * SITE_UPDATED is the default; PAGE_UPDATED lists pages whose content changed later. Add or change an entry whenever you edit a page
 * in a way a reader would notice (a spelling fix or a restyle does not count). Guides use their own `updated` field.
 */
const SITE_UPDATED = "2026-11-18";
const PAGE_UPDATED: Record<string, string> = {
  "/": "2026-11-19",
  "/case-studies": "2026-11-19",
  "/resources": "2026-11-19",
  "/all-in-one": "2026-11-19",
  "/about": "2026-11-19",
};
const SERVICES_UPDATED = "2026-11-19";
const updatedFor = (path: string) => PAGE_UPDATED[path] ?? SITE_UPDATED;

export function getStaticRoutes(): RouteEntry[] {
  return [
    { path: "/", lastModified: updatedFor("/"), priority: 1, changeFrequency: "monthly" },
    { path: "/services", lastModified: updatedFor("/services"), priority: 0.9, changeFrequency: "monthly" },
    { path: "/case-studies", lastModified: updatedFor("/case-studies"), priority: 0.8, changeFrequency: "monthly" },
    { path: "/resources", lastModified: updatedFor("/resources"), priority: 0.8, changeFrequency: "weekly" },
    { path: "/all-in-one", lastModified: updatedFor("/all-in-one"), priority: 0.9, changeFrequency: "monthly" },
    { path: "/why-peptomoon", lastModified: updatedFor("/why-peptomoon"), priority: 0.8, changeFrequency: "monthly" },
    { path: "/glossary", lastModified: updatedFor("/glossary"), priority: 0.7, changeFrequency: "monthly" },
    { path: "/start-a-peptide-business", lastModified: SITE_UPDATED, priority: 0.9, changeFrequency: "monthly" },
    { path: "/tools", lastModified: SITE_UPDATED, priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", lastModified: updatedFor("/about"), priority: 0.6, changeFrequency: "yearly" },
    { path: "/contact", lastModified: updatedFor("/contact"), priority: 0.8, changeFrequency: "yearly" },
    { path: "/privacy-policy", lastModified: updatedFor("/privacy-policy"), priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms-of-service", lastModified: updatedFor("/terms-of-service"), priority: 0.2, changeFrequency: "yearly" },
    { path: "/disclaimer", lastModified: updatedFor("/disclaimer"), priority: 0.2, changeFrequency: "yearly" },
    { path: "/cookie-policy", lastModified: updatedFor("/cookie-policy"), priority: 0.2, changeFrequency: "yearly" },
    { path: "/editorial-policy", lastModified: updatedFor("/editorial-policy"), priority: 0.4, changeFrequency: "yearly" },
  ];
}

export function getIndexableRoutes(): RouteEntry[] {
  return [
    ...getStaticRoutes(),
    ...services.map((s) => ({
      path: `/services/${s.slug}`,
      lastModified: SERVICES_UPDATED,
      priority: 0.9,
      changeFrequency: "monthly" as const,
    })),
    ...caseStudies.map((c) => ({
      path: `/case-studies/${c.slug}`,
      lastModified: SITE_UPDATED,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    ...getArticles().map((a) => ({
      path: `/resources/${a.slug}`,
      lastModified: a.updated,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
  ];
}
