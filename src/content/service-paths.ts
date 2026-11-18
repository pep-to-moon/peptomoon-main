/**
 * Guided paths for the services hub: a situation, and the services that usually help with it, in the order that
 * usually works. These are suggestions, not packages. Every slug must be a real service (scripts/check-content.ts
 * enforces it), and the first slug is where the "start with" button leads.
 */
export type ServicePath = { id: string; label: string; hint: string; slugs: string[] };

export const servicePaths: ServicePath[] = [
  {
    id: "launching",
    label: "I'm launching a new store",
    hint: "Get the supplier documents right first, then build the store, the labels and the payment setup around them.",
    slugs: [
      "supplier-verification",
      "ruo-peptide-website-development",
      "vial-label-design",
      "payment-processing",
      "compliance-support",
      "fulfillment-logistics",
    ],
  },
  {
    id: "restricted",
    label: "A processor or ad account restricted me",
    hint: "Understand why it happened, fix the real cause, then prepare a clean application. We promise no approvals.",
    slugs: ["payment-processing", "compliance-support", "site-audits", "meta-advertising"],
  },
  {
    id: "operations",
    label: "I need orders shipped and supported",
    hint: "Decide who holds the stock, connect orders to the shipper, then give customers and your team one clear view.",
    slugs: ["wholesale-dropshipping-3pl", "fulfillment-logistics", "customer-support", "business-dashboards"],
  },
  {
    id: "growth",
    label: "I want more customers",
    hint: "Be found first, then bring people back, then add partners. Advertising depends on the platform's own rules.",
    slugs: ["seo-geo-aeo", "email-marketing", "affiliate-management", "meta-advertising"],
  },
];
