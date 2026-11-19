import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { pageImages } from "@/lib/page-images";
import { getIndexableRoutes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return getIndexableRoutes().map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: r.lastModified,
    images: pageImages(r.path),
  }));
}
