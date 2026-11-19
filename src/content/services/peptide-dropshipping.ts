import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const peptideDropshipping: Service = {
  slug: "peptide-dropshipping",
  name: "Peptide dropshipping for RUO brands",
  pillar: "run",
  summary: "Dropshipping arrangements where lawful and contractually permitted: order routing, label terms and stock sync.",
  status: "by-engagement",
  primaryKeyword: "peptide dropshipping",
  seo: {
    title: `Peptide Dropshipping for RUO Brands | ${brand}`,
    description:
      "Peptide dropshipping for RUO brands: order routing, label and packaging terms, stock sync and tracking, where lawful and contractually permitted.",
  },
  h1: "Peptide dropshipping for RUO brands",
  lead: "In peptide dropshipping, a partner holds the stock and ships each order to your customer, so you never touch the product. We set up order routing, stock sync and tracking, and we settle label and returns responsibility in writing, but only where it is lawful and contractually permitted. We confirm that first and promise no timelines.",
  what: [
    "With dropshipping, your store takes the order and the payment, and a partner picks, packs and ships it directly to your customer. You pay for an item when it sells. The trade-off is control: you depend on someone else for speed, packaging, labels and accuracy.",
    "Whether a dropshipping arrangement is lawful and permitted by the contracts involved depends on your products and your partners. We confirm that first and do not assume it. FDA warning letters to peptide sellers have turned on website claims, so how a product is described matters as much as how it ships.",
    "If you want more control over packaging and speed, a [3PL](/services/peptide-3pl) may fit better. Our [guide to choosing between wholesale, dropshipping and 3PL](/resources/wholesale-vs-dropshipping-vs-3pl-for-ruo-brands) compares the models.",
  ],
  why: [
    "Dropshipping removes the warehouse from your fixed costs, but it moves responsibility into contracts and integrations. Who holds stock, who ships and who answers for an error should be written down before the first order.",
    "Labels are the most common source of trouble. If the partner ships under your brand, someone has to decide whose name and which research-use wording appear on the product and the packing slip.",
    "A customer who gets a wrong or late parcel sees your brand on the complaint, and in this category disputes affect your payment account.",
  ],
  problems: [
    { title: "Label and packaging terms nobody owns", text: "A label that differs from what your website says is a common review problem. We settle whose wording appears on the product and the packing slip, in writing, before launch." },
    { title: "Errors you cannot see or fix", text: "If the partner packs the wrong item or runs out of stock, your customer waits. We connect order status and stock back to your store so problems are visible." },
    { title: "Orders that do not reach the partner", text: "A paid order that never arrives is an integration fault. We make each handoff explicit and observable." },
    { title: "Unclear responsibility for returns", text: "Who pays for a wrong, damaged or returned parcel should be agreed before the first order, not argued afterwards." },
  ],
  approach: [
    { title: "Confirm it is workable", text: "Check, with your counsel and in writing with the partner, that the arrangement is lawful and permitted for your products." },
    { title: "Agree the terms", text: "Ownership, labels and packaging, service levels, returns and exit, written down before the first order." },
    { title: "Integrate", text: "Order push, stock sync and tracking written back to the order and the customer." },
    { title: "Test with real orders", text: "Run real orders end to end and check tracking, counts and returns before you rely on it." },
    { title: "Monitor", text: "Order-to-ship timing, error rates and disputes in your dashboard." },
  ],
  included: [
    "Dropshipping feasibility check with your counsel and partner",
    "Terms checklist: labels, packaging, returns and exit",
    "Order routing and status sync",
    "Stock sync between store and partner",
    "Tracking written back to the order and customer email",
    "Exception and returns workflows",
    "Reporting on order-to-ship timing and errors",
  ],
  process: [
    { title: "Review", text: "Your products, your partner and what each agreement allows." },
    { title: "Agree", text: "Responsibilities in writing before any build." },
    { title: "Connect", text: "Store and partner integrated and tested with real orders." },
    { title: "Launch", text: "Customer messages and exception handling ready before volume." },
    { title: "Improve", text: "Reports reviewed and the arrangement adjusted." },
  ],
  technical: [
    "Order push and status sync through partner APIs or structured files.",
    "One shared stock record with reservation at checkout.",
    "Tracking events written back to the order and to customer email.",
    "An exception queue for address problems, delays, damage and returns.",
  ],
  limits: [
    "We set up dropshipping only where it is lawful and permitted by the contracts involved, and we confirm that first.",
    "We are not a law firm. Whether an arrangement is permitted for your products should be confirmed with qualified counsel.",
    "We do not promise delivery times, because they depend on the partner and the carrier.",
    "We do not sell to consumers, and we write no dosing, usage or outcome content.",
  ],
  sources: [
    { label: "FDA warning letter to Summit Research Peptides, 10 December 2024", url: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/summit-research-peptides-695607-12102024", checked: "2026-11-17" },
  ],
  visual: "fulfillment",
  faqs: [
    { q: "What is peptide dropshipping?", a: "Your store takes the order and the payment, and a partner holds the stock and ships it straight to your customer, so you never touch the product. You pay for an item when it sells. The trade-off is that you depend on the partner for speed, packaging, labels and accuracy." },
    { q: "Is dropshipping peptides allowed?", a: "That depends on your products, your partners and the contracts involved, so we cannot say yes or no for you. Confirm it with qualified counsel and in writing with the partner before you build anything. Warning letters to peptide sellers have turned on website claims, so descriptions matter as much as shipping." },
    { q: "Who is responsible for the label on a dropshipped product?", a: "Whoever the agreement says. Decide it in writing before launch, including whose name and which research-use-only wording appear on the product and the packing slip. Keep it consistent with your website, because a label that differs from your site is a common review problem." },
    { q: "How do orders reach the partner?", a: "Orders are pushed to the partner as soon as they are paid, and tracking is written back to the order and sent to the customer. The store and the partner read one stock record, so counts do not drift between two systems. We test the whole route with real orders before launch." },
    { q: "What are the main risks of dropshipping?", a: "Loss of control. If the partner packs the wrong item, runs out of stock or ships late, your customer waits and your brand takes the complaint. In this category disputes can affect your payment account, so we set up visibility and agree responsibility in writing first." },
    { q: "Can I switch from dropshipping to a 3PL later?", a: "Yes, and many brands do. Plan for it by keeping one inventory record, filing documents by supplier and batch, and keeping customer messages generic about who ships. When you move, run both routes side by side with real orders before you retire the old one." },
    { q: "Do you provide the product?", a: `${brand} offers wholesale supply to business customers through a separate service, and we never sell to consumers. For dropshipping we set up the arrangement with your partner and your store. Availability and terms for any supply are confirmed when an order is agreed.` },
  ],
  related: ["peptide-3pl", "wholesale-peptides", "supplier-verification", "ruo-peptide-website-development"],
  caseStudies: [],
  articles: ["wholesale-vs-dropshipping-vs-3pl-for-ruo-brands"],
  cta: { label: "Discuss dropshipping" },
};
