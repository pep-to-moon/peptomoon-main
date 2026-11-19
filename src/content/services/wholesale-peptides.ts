import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const wholesalePeptides: Service = {
  slug: "wholesale-peptides",
  name: "Wholesale peptides for business customers",
  pillar: "run",
  summary: "Wholesale research-use-only supply for business customers, with batch documents and terms confirmed per order.",
  status: "by-engagement",
  primaryKeyword: "wholesale peptides",
  seo: {
    title: `Wholesale Peptides for RUO Businesses | ${brand}`,
    description:
      "Wholesale research-use-only peptide supply for business customers, with batch documents, supplier checks and clear terms confirmed per order.",
  },
  h1: "Wholesale peptides for RUO business customers",
  lead: "We supply research-use-only product to business customers wholesale, with batch documents you can check and terms confirmed when an order is agreed. We also help you evaluate any supplier you are considering against a written standard. We do not sell to consumers, and we do not write dosing, usage or outcome content.",
  what: [
    "Wholesale means you buy stock in volume and hold it yourself, then sell or ship it under your own business. You own the product from delivery, so the documents for each batch are your evidence of what you sold. That is why we treat the paperwork as part of the product.",
    "This service is for business customers only. Availability and the terms of supply are confirmed with you when an order is agreed, and research-use-only products are labelled for laboratory research use only and are not for human or veterinary use.",
    "You can also use this service to test a supplier you already have. We review their documents against a written standard and score the result, using the method in our [guide to reviewing a supplier's documentation](/resources/review-a-peptide-suppliers-documentation).",
  ],
  why: [
    "A purity figure on its own is only a claim. A named laboratory, a batch number, the method and the raw data turn it into evidence you can show a customer or a payment reviewer.",
    "Wholesale puts the work of storage, packing and shipping on you. If that is more than you want to run, a [3PL](/services/peptide-3pl) or [dropshipping](/services/peptide-dropshipping) may fit better.",
    "Buying on price alone is the usual mistake. Terms, documents and how a supplier handles a bad batch matter more over time.",
  ],
  problems: [
    { title: "Supply you cannot document", text: "Product with no batch records is a liability. We ask for the documents first and keep them with the order." },
    { title: "Unclear terms", text: "Minimums, lead times, what happens with a bad batch and who handles returns are often left vague. We get them in writing." },
    { title: "Documents that do not match the vial", text: "A report must name the batch you actually received. We check the match before the product is listed." },
    { title: "Storage and handling gaps", text: "Handling follows the supplier's information for each product. We write it into your procedure and keep the records." },
  ],
  approach: [
    { title: "Define what you need", text: "Products, quantities and the documents you will require for each batch." },
    { title: "Confirm availability and terms", text: "Availability and terms are agreed per order, in writing, before anything ships." },
    { title: "Check the documents", text: "Batch records reviewed against the product you receive, with discrepancies noted." },
    { title: "Receive and record", text: "Stock received, counted and filed by supplier and batch." },
    { title: "Review and repeat", text: "Each order scored and recorded, so the next one starts from evidence." },
  ],
  included: [
    "Wholesale supply of research-use-only product to business customers",
    "Batch documentation reviewed with you before an order is agreed",
    "Written terms for each order",
    "Supplier evaluation against a written standard",
    "Receiving and batch records",
    "Shipping coordination",
  ],
  process: [
    { title: "Brief", text: "What you need and how you will use the records." },
    { title: "Confirm", text: "Availability and terms agreed for the order." },
    { title: "Verify", text: "Documents checked against the batch." },
    { title: "Ship", text: "Order shipped and tracked." },
    { title: "Record", text: "Batch and order records filed." },
  ],
  technical: [
    "Batch and lot records tied to each order.",
    "Documents stored by supplier and batch.",
    "Order and tracking records written back to your systems.",
    "A scorecard that shows how each supplier compared.",
  ],
  limits: [
    "Business customers only. We do not sell to consumers.",
    "Research-use-only products are for laboratory research use only, not for human or veterinary use. We write no dosing, usage or outcome content.",
    "Availability, minimums, lead times and terms are confirmed per order. We publish none of them here and promise no delivery times.",
    "We are not a law firm. Whether a particular purchase or resale is permitted for your business should be confirmed with qualified counsel.",
  ],
  visual: "supplier",
  faqs: [
    { q: "Do you sell to individuals?", a: `No. ${brand} supplies business customers only and does not sell to consumers. Research-use-only products are labelled for laboratory research use only and are not for human or veterinary use. If you are an individual, this is not the right place, because our wholesale service is built for businesses.` },
    { q: "What documents come with a wholesale order?", a: "Supplier documentation and batch records for each lot, which we review with you before an order is agreed. That usually means a laboratory report tied to the batch, with the method and underlying data. What is available depends on the product and the supplier, and we do not invent or fill gaps in a record." },
    { q: "What are the minimum order and the lead time?", a: "Minimums and lead times depend on the product and are confirmed when an order is agreed. We do not publish them here because they change with supply, and we give no delivery promises. Ask for them in writing with the other terms, so there are no surprises later." },
    { q: "Can you ship straight to my customers?", a: "That is a separate arrangement, usually called dropshipping, and it is only possible where it is lawful and permitted by the contracts involved. Our peptide dropshipping service explains how it works, what the risks are and how responsibility for labels and returns is settled." },
    { q: "How do I check a supplier's documents myself?", a: "Look for a named laboratory, a batch number that matches your vial, the method and the underlying data, and confirm the report with the laboratory where you can. A purity number alone is only a claim. Our guide to reviewing a supplier's documentation sets out the full checklist." },
    { q: "Is buying wholesale peptides legal?", a: "That depends on what you buy, how you label and market it and where you operate, so take advice from qualified counsel. FDA warning letters to peptide sellers have turned on website claims, so how a product is described matters as much as the research-use label." },
    { q: "Should I buy wholesale or use a 3PL?", a: "Buy wholesale if you want full control and can do the storage, packing and shipping yourself. A 3PL lets you keep owning the stock without running a warehouse. Many brands start with wholesale and move the physical work to a 3PL as volume grows." },
  ],
  related: ["peptide-3pl", "peptide-dropshipping", "supplier-verification", "white-label-peptides"],
  caseStudies: [],
  articles: ["wholesale-vs-dropshipping-vs-3pl-for-ruo-brands", "review-a-peptide-suppliers-documentation"],
  cta: { label: "Ask about wholesale supply" },
};
