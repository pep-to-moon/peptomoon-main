import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const vialLabelDesign: Service = {
  slug: "vial-label-design",
  name: "Vial label design and packaging",
  pillar: "build",
  summary: "Professionally designed, print-ready vial labels and packaging for RUO peptide brands, laid out to match your batch records, COAs and website.",
  status: "established",
  primaryKeyword: "peptide vial label design",
  seo: {
    title: `Peptide Vial Label Design for RUO Brands | ${brand}`,
    description:
      "Vial label design for RUO peptide brands: print-ready layouts, batch and QR fields, research-use notices and templates matched to your COAs.",
  },
  h1: "Vial label design for research-use-only peptide brands",
  lead: "A vial label is the one piece of your brand every customer holds, and it is also a document a reviewer can read. We design vial labels and packaging that are clean, consistent and print-ready, with fields for the batch, the quantity, a QR code to the matching certificate of analysis and the research-use notice your counsel approves. We design the layout. We do not write dosing or human-use text, and we cannot make a label compliant.",
  what: [
    "A label has very little room and a lot to carry: a brand, a product name, a batch or lot reference, a quantity, a research-use notice and a way to find the batch's documents. We turn that into a system instead of one-off artwork. We set up the label grid for each vial size, a type scale that stays legible when printed small, a color system for your range, and a template where the changing fields, such as product name, lot number and quantity, are the only things that move.",
    "The same system extends to boxes, sleeves and shipping inserts when you need them. Because we also build the store and keep the batch records, the label, the product page and the certificate all say the same thing. Customers see one brand, and a payment or platform reviewer sees one consistent business.",
  ],
  why: [
    "Labels are read by more people than most brands expect. Customers read them at the bench, suppliers and printers work from them, and payment and platform reviewers sometimes ask to see them. A label that looks improvised, or that disagrees with the website, creates doubt that is hard to remove.",
    "Batch-level documentation only helps if a customer can find it. A scannable code on the label that opens the matching certificate page connects the physical vial to the record behind it, and it is far easier to design in from the start than to add after a print run.",
    "Reprints are expensive. A template with fixed zones and a clear checklist for the changing fields keeps new products and new batches consistent, and it cuts the proofing rounds that follow every small change.",
  ],
  problems: [
    {
      title: "Artwork that cannot be reused",
      text: "A label drawn once per product has to be redrawn for every batch and every new compound. We build one system with variable fields, so a new lot is a data change and not a design job.",
    },
    {
      title: "Labels that disagree with the site",
      text: "A name, strength or notice that differs between the label, the product page and the certificate invites questions. We set all three from the same product record.",
    },
    {
      title: "Type that fails at print size",
      text: "A design that works on screen can turn to mush on a small vial. We proof at real size and choose type, contrast and spacing for the printer you actually use.",
    },
    {
      title: "No route from vial to document",
      text: "Without a code or reference, a customer cannot check the batch behind the vial. We design the QR code, the lot reference and the page they open as one path.",
    },
  ],
  approach: [
    { title: "Audit the range", text: "We list your vial sizes, closures, printers and products, and gather what each label has to carry, so the system fits the real range and not an imagined one." },
    { title: "Set the label grid", text: "We fix the zones for brand, product name, batch, quantity, notice and code, with type sizes and minimum clearances for each vial size." },
    { title: "Design the brand layer", text: "Color, type and a simple mark treatment make a range recognizable at a glance, without crowding the fields that matter." },
    { title: "Build the template", text: "A print-ready file with named variable fields, so adding a product or a lot is a quick data change and not new artwork." },
    { title: "Proof at real size", text: "We check printed proofs on your actual stock and printer, then adjust contrast, spacing and code size before the full run." },
    { title: "Connect it to the record", text: "The code on the label opens the matching batch page on your store, and the lot reference matches your records." },
  ],
  included: [
    "Label system for each vial size and closure",
    "Brand layer: color, type and mark treatment for the whole range",
    "Print-ready artwork with bleed, safe zones and cut guides",
    "Variable template for product name, lot number and quantity",
    "Space for your research-use notice, set where your counsel specifies",
    "QR code or short code that opens the matching COA page",
    "Box, sleeve or carton design to match the label",
    "Shipping insert or packing slip layout",
    "Mock-ups for the store and for supplier approval",
    "Printer and stock guidance, with proof checks at real size",
    "Handoff files for your label printer or supplier",
    "A checklist for adding a new product or batch",
  ],
  process: [
    { title: "Brief", text: "Range, vial sizes, printer, stock and the documents each label must point to." },
    { title: "System", text: "Grid, type scale, color and the variable fields, shown on one vial first." },
    { title: "Range", text: "The system applied across products, with boxes and inserts where needed." },
    { title: "Review", text: "Your counsel and supplier review wording and fit. Their changes come back as artwork updates." },
    { title: "Proof", text: "Printed proofs checked at real size, then final adjustments." },
    { title: "Handoff", text: "Print-ready files, the template and the checklist for future batches." },
  ],
  technical: [
    "Vector artwork in print-ready formats, with outlined type and named layers for each zone.",
    "Variable fields set up so product name, lot number and quantity can be filled from a spreadsheet or your product data.",
    "Color set for the printer's process, with a note on how coated and uncoated stock change contrast.",
    "QR codes generated at a size and error-correction level that scan reliably on a curved vial, tested before the run.",
    "The label's lot reference matches the batch page and the certificate, so a scan, a record and a document all agree.",
  ],
  limits: [
    "We design the layout and the look. The wording of the research-use notice, and any statement on the label, is for you and your counsel to decide, and we place it where they direct.",
    "We do not write dosing, usage or human-use text, and we do not design labels that suggest it.",
    "We are not a law firm, and a label cannot make a product or a business compliant. We flag content that looks inconsistent and leave the decision to qualified advisers.",
    "We do not print or ship labels. We prepare files and work with your printer or supplier.",
    "We never invent certifications, lab results or batch data for a label.",
  ],
  visual: "label",
  faqs: [
    {
      q: "What does a vial label for a research-use-only peptide need to show?",
      a: "That depends on your products, your markets and your counsel's advice, and we cannot give legal advice. Most brands show the product name, a batch or lot reference, the quantity in the vial, a research-use-only notice and a way to find the batch's documents. We lay those zones out clearly and consistently, and we place the exact wording your counsel approves.",
    },
    {
      q: "Do you write the text on the label?",
      a: "We set up the fields and we place your approved wording. We do not write dosing, usage or human-use claims, and we do not decide what the research-use notice must say. That wording is for you and your qualified advisers, because a label cannot be made compliant by design alone.",
    },
    {
      q: "Can the label link to the certificate of analysis for that batch?",
      a: "Yes. We design a QR code or short code that opens the matching batch page on your store, and we make the lot reference on the label identical to the one in your records and on the certificate. We test that the code scans on a curved vial at real size before a full print run.",
    },
    {
      q: "Can you design labels for many products at once?",
      a: "Yes. We build one label system with variable fields, so a new product or lot is a data change and not new artwork. That keeps a large range consistent, and it shortens the proofing that follows each addition.",
    },
    {
      q: "Do you also design the boxes and inserts?",
      a: "Yes, when you need them. Boxes, sleeves, cartons and packing slips use the same system as the label, so the whole parcel looks like one brand. We prepare print-ready files and mock-ups for your supplier.",
    },
    {
      q: "Will the label match my website and certificates?",
      a: "That is the aim. We build the store and the product records, so the product name, quantity and lot reference on the label come from the same data as the product page and the certificate. When all three agree, customers and reviewers see one consistent business.",
    },
    {
      q: "Do you print the labels?",
      a: "No. We deliver print-ready files and a template, and we work with your label printer or supplier on stock, color and proofing. If you do not have a printer yet, we can tell you what to ask a printer for, but you choose and contract with them.",
    },
    {
      q: "How long does a label design project take?",
      a: "It depends on the number of vial sizes and products, and on how quickly your counsel and supplier review the wording. We scope after a short brief. A first label system on one vial is usually quick to show, and the range, proofs and handoff follow from it.",
    },
  ],
  related: ["ruo-peptide-website-development", "supplier-verification", "compliance-support", "wholesale-peptides"],
  caseStudies: [],
  articles: ["ruo-label-is-not-a-compliance-strategy"],
  cta: { label: "Start a label project" },
};
