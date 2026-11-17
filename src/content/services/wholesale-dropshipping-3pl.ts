import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const wholesaleDropshipping3pl: Service = {
  slug: "wholesale-dropshipping-3pl",
  name: "Wholesale, dropshipping and 3PL",
  pillar: "run",
  summary: "Business-to-business wholesale supply, dropshipping and third-party logistics for research-use-only peptide brands.",
  status: "by-engagement",
  primaryKeyword: "peptide wholesale and dropshipping",
  seo: {
    title: `Peptide Wholesale, Dropshipping and 3PL | ${brand}`,
    description:
      "Wholesale supply, dropshipping and 3PL for RUO peptide brands: supplier documentation, stock, order routing and US fulfillment. Business customers only.",
  },
  h1: "Wholesale, dropshipping and 3PL for RUO peptide brands",
  lead: "Wholesale, dropshipping and 3PL are three ways to supply and ship research-use-only product to business customers. We help you choose a model, check supplier and batch documents, connect orders and stock between your store and the shipper, and agree responsibilities in writing. We do not sell to consumers or assume what is lawful for your products.",
  what: [
    `${brand} works with RUO peptide brands that need a supply and delivery model they can rely on. That can mean buying wholesale and holding your own stock, having orders shipped on your behalf through a dropshipping arrangement, or handing storage, picking, packing and shipping to a third-party logistics (3PL) provider.`,
    "All of this is for business customers. We do not sell to consumers, and research-use-only products are labelled for laboratory research use only and are not for human or veterinary use.",
  ],
  why: [
    "The supply side decides whether a store can keep its promises. Stock that is late, undocumented or mislabelled shows up as support tickets, disputes and payment-account problems.",
    "Dropshipping and 3PL remove the warehouse from your fixed costs, but they move responsibility into contracts and integrations. Who holds stock, who ships and who answers for an error should be written down before the first order.",
    "Wholesale terms are only as good as the paperwork behind them. Batch records and supplier documentation let you answer a customer or a reviewer with evidence.",
  ],
  problems: [
    { title: "Supply you cannot document", text: "Product with no batch records or supplier paperwork is a liability. We ask for the documents first and keep them with the order." },
    { title: "Orders that do not reach the shipper", text: "A paid order that never arrives at the dropship partner or warehouse is an integration fault. We make each handoff explicit and observable." },
    { title: "Unclear responsibility", text: "Wholesale, dropship and 3PL agreements should say who holds stock, who ships, who handles returns and who answers for errors." },
    { title: "Stock counts that drift", text: "Overselling comes from two systems holding two numbers. We set one inventory record that the store and the shipper both read." },
  ],
  approach: [
    { title: "Choose the model", text: "Wholesale stock held by you, a dropshipping arrangement, or a 3PL, based on your products, volumes and partners." },
    { title: "Check the supply", text: "Supplier documentation and batch records reviewed before you commit." },
    { title: "Agree the terms", text: "Written scope for stock ownership, shipping, returns and exceptions." },
    { title: "Connect the systems", text: "Order push, inventory sync and tracking written back to the order." },
    { title: "Report", text: "Order-to-ship timing, stock levels and exceptions in your dashboard." },
  ],
  included: [
    "Wholesale supply of research-use-only product to business customers",
    "Dropshipping arrangements where lawful and contractually permitted",
    "Third-party logistics (3PL) coordination: storage, pick, pack and ship",
    "Supplier and batch documentation checks",
    "Inventory sync between store and shipper",
    "Order routing and tracking",
    "Returns and exception workflows",
    "Reporting on stock and shipping performance",
  ],
  process: [
    { title: "Brief", text: "Products, volumes, business model and current supply." },
    { title: "Model", text: "Wholesale, dropshipping or 3PL, with partner questions answered in writing." },
    { title: "Verify", text: "Documentation and terms checked before the first order." },
    { title: "Connect", text: "Store, inventory and partner integrated and tested with real orders." },
    { title: "Run", text: "Exceptions handled and reports reviewed on a schedule." },
  ],
  technical: [
    "Order push and status sync through partner APIs or structured files.",
    "One shared inventory record with low-stock thresholds and reservation at checkout.",
    "Carrier and shipping rate configuration.",
    "Tracking events written back to the order and to customer email.",
    "An exception queue for address problems, delays, damage and returns.",
  ],
  limits: [
    "Business customers only. We do not sell to consumers.",
    "Research-use-only products are for laboratory research use only, not for human or veterinary use. We write no dosing, usage or outcome content.",
    "Dropshipping and 3PL arrangements depend on your products, partners and the contracts involved. We confirm that before building anything.",
    "Shipping rules and carrier acceptance are confirmed with each party. We do not promise delivery times.",
    "Third-party logistics providers remain responsible for their own handling and compliance.",
  ],
  visual: "fulfillment",
  faqs: [
    { q: "Do you sell to individuals?", a: `No. ${brand} supplies business customers only and does not sell to consumers. Research-use-only products are labelled for laboratory research use only and are not for human or veterinary use. If you are an individual looking to buy product, this is not the right place, because our wholesale, dropshipping and 3PL services are built for businesses.` },
    { q: "What is the difference between wholesale, dropshipping and 3PL?", a: "With wholesale you buy stock and hold it yourself. With dropshipping a partner holds the stock and ships each order to your customer, so you never touch the product. With a 3PL you own the stock and a logistics provider stores, packs and ships it. The right model depends on how much control you need and how much capital you can tie up." },
    { q: "Can you set up dropshipping for my store?", a: "Yes, where it is lawful and permitted by the contracts involved. We check that before building the integration, because it depends on your products, your partner and what each agreement allows. If it is workable, we connect orders, stock and tracking between your store and the partner so each order is passed on and updated automatically." },
    { q: "What documents come with wholesale supply?", a: "Supplier documentation and batch records for each lot, which we review with you before an order is agreed. That usually means a laboratory report tied to the batch, with the method and underlying data. What is available depends on the product and the supplier, and we do not invent or fill gaps in a record." },
    { q: "How do orders and stock stay in sync?", a: "Orders are pushed to the shipper when they are paid, and tracking is written back to the order and sent to the customer. The store and the shipper read one inventory record, which is updated when an order is placed and when stock arrives, so counts do not drift between two systems." },
    { q: "When does a 3PL make more sense than dropshipping?", a: "Choose a 3PL when you want to own your stock and control packaging, speed and quality without running a warehouse. Dropshipping suits testing a range with less capital, at the cost of less control over the shipping step. Many brands start with one model and move to the other as volume and disputes show what works." },
    { q: "Who is responsible if a shipment is wrong or late?", a: "That is set in the written agreement before the first order: who holds stock, who ships, who handles returns and who answers for errors. We help you ask for those terms, and a lawyer should review the document. We do not promise delivery times, because they depend on the carrier and the partner as well." },
  ],
  related: ["fulfillment-logistics", "supplier-verification", "business-dashboards"],
  caseStudies: [],
  articles: ["wholesale-vs-dropshipping-vs-3pl-for-ruo-brands", "infrastructure-behind-an-ruo-peptide-business"],
  cta: { label: "Discuss wholesale or 3PL" },
};
