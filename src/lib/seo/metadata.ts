import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { ogImageFor, ogSize } from "./og";

type BuildMetadataInput = {
  /** Full page title including brand where wanted. Keep to about 60 characters. */
  title: string;
  /** About 120 to 155 characters. */
  description: string;
  /** Canonical path such as "/services/payment-processing". */
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  noindex = false,
  publishedTime,
  modifiedTime,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const image = ogImageFor(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: image, ...ogSize, alt: title }],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
