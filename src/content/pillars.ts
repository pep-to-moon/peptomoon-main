import type { PillarKey } from "./types";

export const pillars: { key: PillarKey; index: string; label: string; verb: string; blurb: string }[] = [
  { key: "build", index: "01", label: "Build", verb: "Build the store", blurb: "The website and its architecture." },
  {
    key: "run",
    index: "02",
    label: "Run",
    verb: "Run the operation",
    blurb: "Payments, fulfillment, support and reporting.",
  },
  {
    key: "grow",
    index: "03",
    label: "Grow",
    verb: "Grow the audience",
    blurb: "Advertising infrastructure, affiliates, email and search visibility.",
  },
  {
    key: "verify",
    index: "04",
    label: "Verify",
    verb: "Verify the details",
    blurb: "Supplier documentation, site audits and compliance review.",
  },
];
