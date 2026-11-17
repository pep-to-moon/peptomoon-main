/**
 * Single source of truth for brand and business details.
 * Renaming the company means editing this file and replacing the logo component.
 * Contact details are read from environment variables and shown only when set, so nothing here is a made-up value.
 * Production builds are blocked until the required settings exist (scripts/check-placeholders.ts).
 */
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.NODE_ENV === "production" ? "https://peptomoon.com" : "http://localhost:3000");

export const siteConfig = {
  name: "Peptomoon",
  legalName: "Peptomoon",
  url: rawUrl.replace(/\/+$/, ""),
  locale: "en_US",
  tagline: "One partner. Every moving part of your RUO peptide business.",
  description:
    "Peptomoon plans, builds and maintains the connected systems behind RUO peptide businesses: websites, payments, supplier documentation, fulfillment, marketing infrastructure, reporting and compliance review.",
  contact: {
    // The public contact address. Override with NEXT_PUBLIC_CONTACT_EMAIL. Enquiries are delivered to INQUIRY_TO_EMAIL,
    // or to this address when that is not set. There is no phone number yet; add one here when there is.
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "peptomoon@gmail.com",
  },
  social: [] as { label: string; url: string }[],
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
    gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function absoluteUrl(path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${clean}`;
}
