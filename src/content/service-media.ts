import type { MediaKey } from "./media";

/** Which photograph opens each service page, and which one breaks up the page further down. */
export const serviceMedia: Record<string, { hero: MediaKey; band: MediaKey }> = {
  "ruo-peptide-website-development": { hero: "website", band: "layer-build" },
  "telehealth-platform-development": { hero: "telehealth-consult", band: "telehealth-dashboard" },
  "vial-label-design": { hero: "packaging", band: "vials-macro" },
  "payment-processing": { hero: "payments", band: "dashboards" },
  "fulfillment-logistics": { hero: "fulfillment", band: "layer-run" },
  "wholesale-dropshipping-3pl": { hero: "packaging", band: "layer-run" },
  "business-dashboards": { hero: "dashboards", band: "layer-grow" },
  "customer-support": { hero: "support", band: "team" },
  "meta-advertising": { hero: "meta", band: "layer-grow" },
  "affiliate-management": { hero: "affiliate", band: "team" },
  "email-marketing": { hero: "email", band: "layer-grow" },
  "seo-geo-aeo": { hero: "search", band: "layer-grow" },
  "supplier-verification": { hero: "supplier", band: "vials-macro" },
  "compliance-support": { hero: "compliance", band: "supplier" },
  "site-audits": { hero: "audit", band: "layer-build" },
};
