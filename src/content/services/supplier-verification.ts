import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const supplierVerification: Service = {
  slug: "supplier-verification",
  name: "Supplier sourcing and verification",
  pillar: "verify",
  summary: "A documentation framework for reviewing suppliers, batch records and laboratory reports.",
  status: "established",
  primaryKeyword: "peptide supplier verification",
  seo: {
    title: `Peptide Supplier Verification and Review | ${brand}`,
    description:
      "A structured documentation review for RUO peptide suppliers: batch-matched reports, scorecards and records. We review documents and never invent results.",
  },
  h1: "Supplier verification and documentation review for RUO peptide businesses",
  lead: "Supplier verification is a structured review of the documents behind a product: batch records, laboratory reports, method details and identity data. We write a standard, review each supplier against it, score the results and keep records by supplier and batch. We do not invent certifications, results or purity claims, and a review is not an approval.",
  what: [
    "Supplier risk is one of the largest operational risks in this industry: unverified manufacturers, specifications that change between batches, purity claims without support and shipments that do not arrive. We help you set a documentation standard, review what suppliers send against it and keep records you can stand behind.",
    "This is a documentation and process service. We review documents and build the framework. Unless a project explicitly includes independent laboratory testing arranged with a laboratory, we do not test samples ourselves.",
  ],
  why: [
    "A supplier that cannot produce consistent, batch-specific documents is a risk to everything downstream: your product pages, your payment review, your customers and your reputation.",
    "Documents are easy to present and hard to evaluate. A single purity figure with no method, no data and no batch reference tells you very little. Knowing what a complete record looks like is what protects you.",
    "Records matter after the purchase too. When a question arises about a batch, you need to find the documents quickly and show that you checked.",
  ],
  problems: [
    { title: "Suppliers you cannot verify", text: "Names, addresses and websites are cheap to create. We check what can be checked and record what cannot." },
    { title: "Documents that do not match the product", text: "A report for a different batch, a generic file reused across orders or a lot number that does not match the vial are signs to stop and ask." },
    { title: "Purity claims without support", text: "A number without method details, a named laboratory and the underlying data is a claim, not evidence." },
    { title: "No record of decisions", text: "Without records, every question restarts from zero. We organize documents by supplier and batch." },
  ],
  approach: [
    { title: "Set the standard", text: "Define what every supplier must provide before you buy: identification, batch records, laboratory reports with method details, storage and handling information." },
    { title: "Review the documents", text: "Check that batch numbers match, that the laboratory is real and independent, that chromatograms and identity data are present rather than one headline number, and that dates and details are consistent." },
    { title: "Score and compare", text: "A supplier scorecard turns the review into a comparable record." },
    { title: "Keep the records", text: "Organize documents by supplier and batch so they can be retrieved and shown when needed." },
    { title: "Re-check on a schedule", text: "Review again when specifications change, a new batch arrives or something looks wrong." },
  ],
  included: [
    "Supplier documentation standard",
    "Document review with discrepancy notes",
    "Batch-matched laboratory report checks",
    "Supplier scorecards",
    "Sourcing transparency records",
    "Quality-control record organization",
    "Ongoing review schedule",
    "Questions to ask suppliers",
  ],
  process: [
    { title: "Scope", text: "Which products, which suppliers, which documents already exist." },
    { title: "Standard", text: "Your minimum documentation requirements, written down." },
    { title: "Review", text: "Documents checked against the standard, discrepancies recorded." },
    { title: "Decide", text: "Scorecards support go, ask or stop decisions." },
    { title: "Maintain", text: "Records kept current as batches change." },
  ],
  technical: [
    "Documents stored as structured records linked to product and batch.",
    "Version history so changed documents are visible.",
    "Optional publication of selected documents on product pages.",
    "Access controls for internal supplier records.",
  ],
  limits: [
    "We do not invent supplier relationships, laboratory results, certifications or purity claims. Nothing we publish for you is stronger than the documents behind it.",
    "Documentation review reduces risk. It cannot remove it, and a document cannot prove sterility or biological activity.",
  ],
  visual: "supplier",
  faqs: [
    { q: "Do you recommend suppliers?", a: "We do not publish supplier lists or recommend a name. We help you evaluate the suppliers you are considering against a clear written standard: who they are, the documents for each batch, the laboratory and the method. You then decide, with scores and notes that show how each supplier compared." },
    { q: "What makes a good certificate of analysis?", a: "A good one is tied to a specific batch, names the laboratory, shows method details and the underlying data such as a chromatogram and an identity result, and is consistent with the product label. Even then it is one piece of evidence." },
    { q: "Can selected documents be shown to customers?", a: "Yes. We help you decide which documents to show and make sure nothing is claimed beyond what they support. A purity figure on its own is only a claim, so we work with the batch record, the named laboratory and the method behind it. Nothing shown should be stronger than the evidence." },
    { q: "A supplier sent a purity report but will not name the laboratory. What now?", a: "Treat it as no documentation. A figure with no named laboratory, no method and no data is a claim that cannot be checked. Ask for the full report from a laboratory you can contact, and do not buy until you have it. If the supplier refuses, that refusal is itself information." },
    { q: "How do I check that a certificate of analysis is real?", a: "Contact the laboratory using details you found yourself, quote the report number and ask it to confirm that it issued the report. Then check that the data is consistent: the trace matches the figure, the dates are possible and the batch number matches the vial. Write down what you checked and when." },
    { q: "A new batch arrived and the report looks different from the last one. Should I worry?", a: "Look at what changed: the laboratory, the method, the layout or the figures. A change is not automatically a problem, but treat it as a trigger for a full review. Ask the supplier to explain, compare batch numbers and dates, and hold the stock until you are satisfied." },
  ],
  related: ["compliance-support", "wholesale-peptides", "ruo-peptide-website-development"],
  caseStudies: ["99-purity-peptides"],
  articles: ["review-a-peptide-suppliers-documentation", "infrastructure-behind-an-ruo-peptide-business"],
  cta: { label: "Discuss supplier review" },
};
