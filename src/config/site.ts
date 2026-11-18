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
    // The public contact address, shown across the site. Override with NEXT_PUBLIC_CONTACT_EMAIL.
    // Enquiries are delivered to INQUIRY_TO_EMAIL. There is no public phone number yet; add one here when there is.
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "inquiry@peptomoon.com",
    // Where enquiries are delivered when INQUIRY_TO_EMAIL is not set. This needs RESEND_FROM_EMAIL to be an address on a
    // domain verified in Resend. (Resend's free test sender can only deliver to the Resend account owner's own address.)
    deliveryFallback: "inquiry@peptomoon.com",
  },
  social: [] as { label: string; url: string }[],
  analytics: {
    // GA4 measurement ID, like G-XXXXXXXXXX. Trimmed because a pasted value often carries a stray space or newline.
    gaId: (process.env.NEXT_PUBLIC_GA_ID ?? "").trim(),
    // Microsoft Clarity project ID (Clarity > Settings > Setup), a short code like zf8lqke71d.
    clarityId: (process.env.NEXT_PUBLIC_CLARITY_ID ?? "").trim(),
    gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function absoluteUrl(path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${clean}`;
}
