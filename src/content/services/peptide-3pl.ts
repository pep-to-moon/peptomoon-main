import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const peptide3pl: Service = {
  slug: "peptide-3pl",
  name: "Peptide 3PL and fulfillment",
  pillar: "run",
  summary: "3PL and US fulfillment coordination: order routing, inventory sync, carriers, tracking and exception workflows.",
  status: "established",
  primaryKeyword: "3pl for peptides",
  seo: {
    title: `3PL for Peptides and Fulfillment | ${brand}`,
    description:
      "3PL and US fulfillment coordination for RUO peptide brands: order routing, inventory sync, carriers, tracking and exception workflows. No delivery promises.",
  },
  h1: "3PL for peptides: fulfillment and logistics for RUO brands",
  lead: "A 3PL stores, packs and ships your stock while you keep owning it. We connect your store to the provider so each paid order is routed, tracked and reconciled, with one inventory record and an exception queue for delays, damage and returns. We also coordinate US fulfillment for brands that ship their own stock. We promise no delivery times.",
  what: [
    "Fulfillment is where operations meet customer experience. Late, damaged or untraceable shipments show up as support load, chargebacks and lost customers. With a 3PL, you own the stock and a logistics provider stores, picks, packs and ships it. We set up the workflows and integrations between your store, your inventory and the provider, and we help you ask the right questions before you sign.",
    "Not every brand needs a 3PL. Our [guide to choosing between wholesale, dropshipping and 3PL](/resources/wholesale-vs-dropshipping-vs-3pl-for-ruo-brands) compares the models, and we also coordinate fulfillment for brands that ship from their own stock. Where a [dropshipping](/services/peptide-dropshipping) arrangement fits better, we structure that instead.",
  ],
  why: [
    "Customers judge the whole business by the delivery. Consistency matters more than speed alone: orders that ship when promised, with tracking that works, generate far fewer problems.",
    "Operational efficiency depends on clean data. When orders, inventory and shipments live in different tools without integration, people fill the gaps by hand and errors follow.",
    "Exceptions are inevitable. A defined process for address problems, delays, damage and returns turns them into manageable events.",
  ],
  problems: [
    { title: "Orders that stall between systems", text: "A paid order that never reaches the provider, or a shipment that never updates the customer, is an integration problem. We make the handoffs explicit and observable." },
    { title: "Inventory that does not match reality", text: "Overselling and phantom stock come from counts that update late. We reserve stock at checkout and reconcile regularly against the provider's count." },
    { title: "No plan for exceptions", text: "Without a process, every delay becomes an inbox thread. We define who acts, what is recorded and what the customer is told." },
    { title: "Unclear provider responsibilities", text: "Contracts with a 3PL should say who handles what, including labels, returns and errors. We help you ask the right questions." },
  ],
  approach: [
    { title: "Map the order lifecycle", text: "From payment confirmation to delivery and return, with an owner for every step." },
    { title: "Choose and question the provider", text: "A written list of questions about peptide handling, storage, lot tracking and restricted orders, answered before you commit." },
    { title: "Integrate", text: "Order push, inventory sync and tracking written back to the order and the customer." },
    { title: "Handle exceptions", text: "A queue and a set of workflows for address issues, delays, damage and returns." },
    { title: "Report", text: "Fulfillment timing, exception rates and carrier performance in your dashboard." },
  ],
  included: [
    "3PL selection questions and provider comparison",
    "US-based fulfillment coordination",
    "Order routing and status sync",
    "Inventory sync and reconciliation",
    "Shipping and carrier integrations",
    "Tracking systems",
    "Returns and exception workflows",
    "Fulfillment reporting",
  ],
  process: [
    { title: "Review", text: "Products, packaging needs, volumes and current shipping." },
    { title: "Select", text: "Model and provider questions answered in writing." },
    { title: "Connect", text: "Store, inventory and provider integrated and tested with real orders." },
    { title: "Launch", text: "Exception handling and customer messages ready before volume arrives." },
    { title: "Improve", text: "Reports reviewed and workflows adjusted." },
  ],
  technical: [
    "Order push and status sync through provider APIs or structured files.",
    "Stock counts with low-stock thresholds and reservation at checkout.",
    "Carrier and shipping rate configuration.",
    "Tracking events written back to the order and to customer email.",
    "An exception queue for address problems, delays, damage and returns.",
  ],
  limits: [
    "Shipping rules and carrier acceptance depend on your products and your provider. We confirm requirements with each party and do not assume them.",
    "A 3PL remains responsible for its own handling and compliance.",
    "We do not promise delivery times.",
  ],
  visual: "fulfillment",
  faqs: [
    { q: "What does a 3PL do for a peptide brand?", a: "A third-party logistics provider stores your stock, picks and packs each order and ships it, while you keep owning the product. Your store connects to the provider so orders and tracking move on their own. We set up that connection and the exception handling around it." },
    { q: "How do I choose a 3PL for peptides?", a: "Ask each provider in writing whether it handles research-use-only products, how it stores and tracks lots, how it handles storage or temperature needs from your supplier, and how it flags orders it cannot ship. Compare the written answers, not the sales pitch. We help you build that list." },
    { q: "Which carriers do you use?", a: "That depends on your products, your volumes and your provider. We select and configure carriers with you, comparing service levels, tracking quality and what each carrier accepts for your products. We confirm acceptance requirements directly with each party instead of assuming them, and we do not promise delivery times." },
    { q: "How are returns and exceptions handled?", a: "We define the workflow with you before launch: who is notified, what is recorded and how customers are updated. Address problems, delays, damage and returns go into one exception queue with an owner for each step, so a problem becomes a managed event with a clear message to the customer, not an open inbox thread." },
    { q: "Orders are shipping late and customers are filing disputes. What do we fix first?", a: "Measure order-to-ship time and find where the delay sits: payment confirmation, the handover to the provider, picking or the carrier. Fix the largest gap first, then tell customers the real timing at checkout and by email. Late shipments with no message are what turn into disputes, and disputes affect your payment account." },
    { q: "How do we handle products that need temperature control in transit?", a: "Follow the storage and handling information your supplier provides for each product, and write it into the fulfillment procedure: packaging, shipping methods, cut-off days and what to do over weekends or delays. Test the process with real shipments before launch and record the results. We do not make claims about stability beyond what the supplier documents show." },
    { q: "Stock on the site does not match the shelf. How do we stop overselling?", a: "Use one inventory record that both the store and the provider read, update it at the moment of order and at the moment of receipt, and count stock against it on a schedule. Overselling usually comes from two systems each holding their own number. Once there is one number, reserve stock at checkout and release it if payment fails." },
  ],
  related: ["peptide-dropshipping", "wholesale-peptides", "business-dashboards", "customer-support"],
  caseStudies: [],
  articles: ["wholesale-vs-dropshipping-vs-3pl-for-ruo-brands", "infrastructure-behind-an-ruo-peptide-business"],
  cta: { label: "Discuss 3PL and fulfillment" },
};
