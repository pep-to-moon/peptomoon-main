import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const whiteLabelPeptides: Service = {
  slug: "white-label-peptides",
  name: "White label and private label peptides",
  pillar: "build",
  summary: "Launch your own RUO brand: supplier checks, batch documents, label design and a store built around them.",
  status: "by-engagement",
  primaryKeyword: "white label peptides",
  seo: {
    title: `White Label and Private Label Peptides | ${brand}`,
    description:
      "Launch your own RUO peptide brand: supplier checks, batch documents, label design and a store built around them. For business customers only.",
  },
  h1: "White label and private label peptides for RUO brands",
  lead: "Launching your own RUO peptide brand takes more than a label. We connect supplier verification, batch documents, label and packaging design and a store built around them, so every claim matches the record behind it. White label and private label mean different things to different suppliers, so we ask exactly what you can customize.",
  what: [
    "Launching your own brand means the supplier's documents, your labels, your store and your claims all have to agree. We connect those pieces: supplier verification, batch records, label and packaging design and a store built around them, so nothing on a label or a page goes beyond the record behind it.",
    "Terms such as white label and private label are used differently by different suppliers. Before you commit, ask each one exactly what you can customize, who owns the label artwork and the formulation record, what the minimum order is and what documents come with each batch. We help you write that list and score the answers. This service is for business customers only.",
  ],
  why: [
    "A label is a claim. If it says something your batch records or your website do not support, that mismatch is what a reviewer notices first.",
    "Changing a label after launch means reprinting stock and rewriting pages, so the wording should be settled early.",
    "Supplier terms differ more than the names suggest. Two suppliers that both say private label can mean different things by it.",
  ],
  problems: [
    { title: "Labels that outrun the documents", text: "Claims on a label, a product page or an advertisement that the batch record does not support. We check every claim against its source before anything is printed." },
    { title: "Unclear supplier terms", text: "Who owns the artwork, what can be customized and which documents arrive with each batch are often left vague. We turn them into written questions." },
    { title: "Rework after launch", text: "Wording that changes after stock is printed means waste. We settle the label content before design starts." },
    { title: "A store that disagrees with the label", text: "Product pages, labels and policies that tell different stories. We build them from one record." },
  ],
  approach: [
    { title: "Define the range", text: "The products you will launch, the sizes, and the wording you are willing to put your name to." },
    { title: "Verify supplier and documents", text: "Score each supplier against a written standard, and check that batch documents name the laboratory, show the method and match the vial." },
    { title: "Design labels and packaging", text: "Print-ready labels and packaging with batch numbers and research-use notices placed consistently." },
    { title: "Build the store around the record", text: "Product pages, notices and policies generated from the same product and batch records." },
    { title: "Review before launch", text: "Read the whole brand as a payment reviewer would, and fix mismatches before you apply for payments or send traffic." },
  ],
  included: [
    "Supplier terms checklist and scorecard",
    "Supplier and batch documentation review",
    "Vial label and packaging design",
    "Product and batch records",
    "Store built around those records",
    "Consistency review of labels, pages and policies",
    "Launch-readiness review",
  ],
  process: [
    { title: "Brief", text: "Your range, your model and what you can show for each product." },
    { title: "Verify", text: "Supplier terms and documents checked and scored before you commit." },
    { title: "Design", text: "Labels and packaging drafted, with the wording settled in writing." },
    { title: "Build", text: "The store and records built from one source." },
    { title: "Review", text: "A full consistency review before payments and launch." },
  ],
  technical: [
    "Product, variant and batch records that feed labels, pages and documents.",
    "Research-use notices defined once and rendered everywhere they apply.",
    "Print-ready label files with batch fields that match the records.",
    "A check that fails when a product page renders without its notice.",
  ],
  limits: [
    "Business customers only. We do not sell to consumers.",
    "We do not write dosing, usage or outcome content for labels, pages or advertisements.",
    "We are not a law firm. Label and policy wording should be reviewed by your own qualified counsel.",
    "We promise no approvals, rankings or sales, and no timelines, because supplier documents and payment underwriting are outside our control.",
  ],
  visual: "label",
  faqs: [
    { q: "What is the difference between white label and private label?", a: "Suppliers use the two terms differently, so there is no single answer. Ask each supplier what you can customize, who owns the artwork and the formulation record, what the minimum order is and what documents come with each batch. We help you write those questions and compare the answers." },
    { q: "Can I put my own brand on a supplier's product?", a: "Often yes, but it depends on the supplier's terms. Confirm in writing whether you may relabel, who is responsible for label accuracy and which research-use wording must appear. Your label, your website and your batch records should agree. We help you check that before anything is printed." },
    { q: "Do you supply the product?", a: `Our wholesale, dropshipping and 3PL service supplies research-use-only product to business customers only, and ${brand} never sells to consumers. For a brand launch we also help you evaluate your own suppliers against a written standard. Availability and terms are confirmed when an order is agreed.` },
    { q: "Do you design the labels?", a: "Yes. We design print-ready labels and packaging and set up the layout so batch numbers and notices sit in the same place on every product. We do not write dosing, usage or outcome text, and the final wording should be reviewed by your own qualified counsel." },
    { q: "How long does it take to launch a brand?", a: "It depends mainly on your supplier's documents and on payment underwriting, which the provider controls, so we give no timelines. We plan the labels, the store and the paperwork in parallel so that a delay in one does not stall the others." },
    { q: "What does it cost?", a: "It depends on how many products you launch, how much label and packaging work you need and how much of the store you want built. We do not publish fixed prices. We can scope your list, show where money goes first and give you a written scope once we understand the range." },
    { q: "Will a research-use-only label make my brand compliant?", a: "No. A research-use label states an intended use and is one piece of evidence. How you describe and market the products matters as much. Review everything you publish for claims that point toward personal use, and take the findings to qualified counsel." },
  ],
  related: ["vial-label-design", "supplier-verification", "ruo-peptide-website-development"],
  caseStudies: [],
  articles: ["wholesale-vs-dropshipping-vs-3pl-for-ruo-brands", "review-a-peptide-suppliers-documentation"],
  cta: { label: "Plan your brand launch" },
};
