/** Groups guides by the stage of a founder's journey. Slugs that are missing or hidden are skipped, and any guide not listed falls into "More guides". */
export type JourneyStage = { id: string; title: string; blurb: string; slugs: string[] };

export const journey: JourneyStage[] = [
  {
    id: "plan",
    title: "Plan the business",
    blurb: "Choose a model, understand the terms and work out what it will cost before you commit.",
    slugs: [
      "peptide-business-setup-checklist",
      "cost-to-start-a-peptide-business",
      "white-label-vs-private-label-peptides",
      "wholesale-vs-dropshipping-vs-3pl-for-ruo-brands",
      "infrastructure-behind-an-ruo-peptide-business",
    ],
  },
  {
    id: "suppliers",
    title: "Find and verify suppliers",
    blurb: "Write a standard, then test every supplier and every batch against it.",
    slugs: ["how-to-find-a-peptide-supplier", "review-a-peptide-suppliers-documentation"],
  },
  {
    id: "store",
    title: "Build the store",
    blurb: "Pick a platform and structure the catalog so notices and records stay consistent.",
    slugs: ["shopify-vs-custom-peptide-store", "peptide-store-architecture"],
  },
  {
    id: "payments",
    title: "Get paid, and keep getting paid",
    blurb: "Underwriting, held funds, closed accounts, reserves and disputes, with sources.",
    slugs: [
      "payment-processing-for-ruo-stores",
      "chargebacks-peptide-store",
      "rolling-reserve-explained",
      "stripe-closed-my-peptide-account",
      "paypal-froze-funds-peptide-store",
      "shopify-payments-peptide-store-disabled",
      "payment-processor-shut-down-account",
      "match-list-peptide-sellers",
    ],
  },
  {
    id: "growth",
    title: "Get found",
    blurb: "Search, answer engines and paid channels, and what to do when one of them fails.",
    slugs: ["search-and-ai-visibility-for-ruo-peptide-stores", "peptide-store-not-ranking", "meta-ad-account-disabled-peptides", "peptide-blog-content-strategy", "meta-health-and-wellness-restrictions"],
  },
  {
    id: "compliance",
    title: "Understand the risks",
    blurb: "What a research-use label does and does not do, and where the lines are drawn.",
    slugs: ["ruo-label-is-not-a-compliance-strategy", "503a-503b-and-ruo-retail", "is-selling-research-peptides-legal"],
  },
];
