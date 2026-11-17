import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const fulfillmentLogistics: Service = {
  slug: "fulfillment-logistics",
  name: "Fulfillment and logistics",
  pillar: "run",
  summary: "US fulfillment coordination, inventory, shipping integrations, tracking and exception workflows.",
  status: "established",
  primaryKeyword: "peptide fulfillment services",
  seo: {
    title: `Peptide Fulfillment and Logistics Coordination | ${brand}`,
    description:
      "US fulfillment coordination for RUO peptide businesses: order processing, inventory, shipping integrations, tracking and exception workflows.",
  },
  h1: "Fulfillment and logistics coordination for RUO peptide businesses",
  lead: "We coordinate the path from order to doorstep: US-based fulfillment, domestic shipping, inventory and order processing, tracking and the exception handling that decides whether customers come back.",
  what: [
    "Fulfillment is where operations meet customer experience. Late, damaged or untraceable shipments show up as support load, chargebacks and lost customers. We set up the workflows and integrations between your store, your inventory and your fulfillment partner, and we coordinate third-party logistics where it fits your model.",
    "Where a dropshipping arrangement is lawful and contractually permitted for your products and your partners, we can structure it. We do not assume it is.",
  ],
  why: [
    "Customers judge the whole business by the delivery. Consistency matters more than speed alone: orders that ship when promised, with tracking that works, generate far fewer problems.",
    "Operational efficiency depends on clean data. When orders, inventory and shipments live in different tools without integration, people fill the gaps by hand and errors follow.",
    "Exceptions are inevitable. A defined process for address problems, delays, damage and returns turns them into manageable events.",
  ],
  problems: [
    { title: "Orders that stall between systems", text: "A paid order that never reaches the warehouse or a shipment that never updates the customer is an integration problem. We make the handoffs explicit and observable." },
    { title: "Inventory that does not match reality", text: "Overselling and phantom stock come from counts that update late. We reserve stock at checkout and reconcile regularly." },
    { title: "No plan for exceptions", text: "Without a process, every delay becomes an inbox thread. We define who acts, what is recorded and what the customer is told." },
    { title: "Unclear partner responsibilities", text: "Contracts with third-party logistics providers should say who handles what. We help you ask the right questions." },
  ],
  approach: [
    { title: "Map the order lifecycle", text: "From payment confirmation to delivery and return, with an owner for every step." },
    { title: "Choose the model", text: "Own stock, third-party logistics or a dropshipping arrangement where lawful and permitted, based on your products, volumes and partners." },
    { title: "Integrate", text: "Order push, inventory sync and tracking written back to the order and the customer." },
    { title: "Handle exceptions", text: "A queue and a set of workflows for address issues, delays, damage and returns." },
    { title: "Report", text: "Fulfillment timing, exception rates and carrier performance in your dashboard." },
  ],
  included: [
    "US-based fulfillment coordination",
    "Domestic shipping infrastructure",
    "Third-party logistics coordination",
    "Dropshipping arrangements where lawful and contractually permitted",
    "Inventory management",
    "Order processing workflows",
    "Shipping integrations",
    "Tracking systems",
    "Returns and exception workflows",
    "Fulfillment reporting",
  ],
  process: [
    { title: "Review", text: "Products, packaging needs, volumes and current shipping." },
    { title: "Select", text: "Fulfillment model and partner questions answered in writing." },
    { title: "Connect", text: "Store, inventory and partner integrated and tested with real orders." },
    { title: "Launch", text: "Exception handling and customer messages ready before volume arrives." },
    { title: "Improve", text: "Reports reviewed and workflows adjusted." },
  ],
  technical: [
    "Order push and status sync through partner APIs or structured files.",
    "Stock counts with low-stock thresholds and reservation at checkout.",
    "Carrier and shipping rate configuration.",
    "Tracking events written back to the order and to customer email.",
    "An exception queue for address problems, delays, damage and returns.",
  ],
  limits: [
    "Shipping rules and carrier acceptance depend on your products and partners. We confirm requirements with each party and do not assume them.",
    "We coordinate with third-party logistics providers. They remain responsible for their own handling and compliance.",
    "We do not promise delivery times.",
  ],
  visual: "fulfillment",
  faqs: [
    { q: "Can you set up dropshipping?", a: "Where it is lawful and permitted by the contracts involved. We check that before building anything." },
    { q: "Which carriers do you use?", a: "That depends on your products, volumes and partner. We select and configure carriers with you." },
    { q: "How are returns and exceptions handled?", a: "We define the workflow with you: who is notified, what is recorded and how customers are updated." },
    { q: "Orders are shipping late and customers are filing disputes. What do we fix first?", a: "Measure order-to-ship time and find where the delay sits: payment confirmation, the handover to the warehouse, picking or the carrier. Fix the largest gap first, then tell customers the real timing at checkout and by email. Late shipments with no message are what turn into disputes, and disputes affect your payment account." },
    { q: "How do we handle products that need temperature control in transit?", a: "Follow the storage and handling information your supplier provides for each product, and write it into the fulfillment procedure: packaging, shipping methods, cut-off days and what to do over weekends or delays. Test the process with real shipments before launch and record the results. We organise the procedure and the records. We do not make claims about stability beyond what the supplier documents show." },
    { q: "Stock on the site does not match the shelf. How do we stop overselling?", a: "Use one inventory record that both the store and the warehouse read, update it at the moment of order and at the moment of receipt, and count stock against it on a schedule. Overselling usually comes from two systems each holding their own number. Once there is one number, reserve stock at checkout and release it if payment fails." },
  ],
  related: ["business-dashboards", "customer-support", "supplier-verification"],
  caseStudies: [],
  articles: ["infrastructure-behind-an-ruo-peptide-business"],
  cta: { label: "Discuss fulfillment" },
};
