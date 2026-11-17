import { getArticles } from "@/content/articles";
import { caseStudies } from "@/content/case-studies";
import { services } from "@/content/services";

export type RouteEntry = {
  path: string;
  lastModified: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

/** Date the static pages' content last changed. Update when editing them. */
const SITE_UPDATED = "2026-11-17";

export function getStaticRoutes(): RouteEntry[] {
  return [
    { path: "/", lastModified: SITE_UPDATED, priority: 1, changeFrequency: "monthly" },
    { path: "/services", lastModified: SITE_UPDATED, priority: 0.9, changeFrequency: "monthly" },
    { path: "/case-studies", lastModified: SITE_UPDATED, priority: 0.8, changeFrequency: "monthly" },
    { path: "/resources", lastModified: SITE_UPDATED, priority: 0.8, changeFrequency: "weekly" },
    { path: "/glossary", lastModified: SITE_UPDATED, priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", lastModified: SITE_UPDATED, priority: 0.6, changeFrequency: "yearly" },
    { path: "/contact", lastModified: SITE_UPDATED, priority: 0.8, changeFrequency: "yearly" },
    { path: "/privacy-policy", lastModified: SITE_UPDATED, priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms-of-service", lastModified: SITE_UPDATED, priority: 0.2, changeFrequency: "yearly" },
    { path: "/disclaimer", lastModified: SITE_UPDATED, priority: 0.2, changeFrequency: "yearly" },
    { path: "/cookie-policy", lastModified: SITE_UPDATED, priority: 0.2, changeFrequency: "yearly" },
  ];
}

export function getIndexableRoutes(): RouteEntry[] {
  return [
    ...getStaticRoutes(),
    ...services.map((s) => ({
      path: `/services/${s.slug}`,
      lastModified: SITE_UPDATED,
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
