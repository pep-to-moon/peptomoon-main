import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const customerSupport: Service = {
  slug: "customer-support",
  name: "Customer support infrastructure",
  pillar: "run",
  summary: "Helpdesk setup, order-aware workflows and a knowledge base that stays inside research-use positioning.",
  status: "established",
  primaryKeyword: "ecommerce helpdesk setup",
  seo: {
    title: `Customer Support Infrastructure for RUO Stores | ${brand}`,
    description:
      "Helpdesk setup, ticket workflows, order-aware support and a knowledge base for RUO peptide stores, built to stay inside research-use positioning.",
  },
  h1: "Customer support infrastructure for RUO peptide businesses",
  lead: "Helpdesk setup, ticket workflows, order-aware support and a knowledge base that answers questions without straying into usage advice.",
  what: [
    "Support is where operational problems arrive: late shipments, payment questions, missing documents. We set up the helpdesk, the ticket categories, the automation and the knowledge base, and connect them to order data so agents see context.",
    "In this industry support also has a boundary to hold. Customers ask about dosing and personal use. Your team needs clear, consistent responses that stay inside research-use positioning, so we build those into macros and training notes.",
  ],
  why: [
    "Unresolved support threads become refund requests and chargebacks. Fast, informed answers protect revenue.",
    "Agents who must open four tools to answer one question are slow and make mistakes. Order, payment and shipment context in one place fixes that.",
    "Careless replies create content you did not intend to publish. A single message that sounds like usage advice can undo careful site wording.",
  ],
  problems: [
    { title: "Questions without context", text: "Agents should see the order, payment and shipment status inside the ticket." },
    { title: "Inconsistent answers", text: "Macros reviewed against your notices keep replies consistent." },
    { title: "Usage questions with no plan", text: "A deflection response, agreed in advance, keeps replies inside research-use positioning." },
    { title: "Recurring causes never fixed", text: "Ticket categories and reporting show what to fix upstream." },
  ],
  approach: [
    { title: "Map the questions", text: "From order status to document requests, grouped into categories." },
    { title: "Set up the helpdesk", text: "Inbox, routing, priorities and response targets." },
    { title: "Write the macros", text: "Including a reviewed response for usage questions." },
    { title: "Connect orders", text: "Order, payment and shipment status visible in each ticket." },
    { title: "Build the knowledge base", text: "Shipping, documents and policies, with no usage guidance." },
    { title: "Review", text: "Recurring causes reported and fixed at the source." },
  ],
  included: [
    "Helpdesk setup",
    "Ticket management and routing",
    "Customer communication workflows",
    "Automated support workflows",
    "Knowledge base",
    "Order-related support views",
    "Customer experience review",
  ],
  process: [
    { title: "Listen", text: "Current inbox, common questions and pain points." },
    { title: "Design", text: "Categories, routing and macros." },
    { title: "Connect", text: "Order data and notifications." },
    { title: "Train", text: "Notes for your team, including the usage-question response." },
    { title: "Review", text: "Monthly look at volume and causes." },
  ],
  technical: [
    "A ticket taxonomy tied to order events.",
    "Macros reviewed against your research-use notices.",
    "Order and shipment context inside the ticket.",
    "Escalation paths for payment and fulfillment issues.",
    "Reporting on volume, first response time and recurring causes.",
  ],
  limits: [
    "We do not write responses that give dosing, usage or outcome guidance.",
    "We cannot promise customer satisfaction scores.",
    "Staffing a support team is outside this service unless agreed.",
  ],
  visual: "support",
  faqs: [
    { q: "How should support answer usage questions?", a: "With a short, consistent response that explains the products are for research use only and that you cannot advise on use. We draft it with you and your counsel." },
    { q: "Which helpdesk do you set up?", a: "We choose based on your volume, integrations and the platform's rules for your category." },
    { q: "Can support see order data?", a: "Yes. We connect order, payment and shipment status to the ticket view." },
    { q: "Customers keep asking how to use products. How do we answer without crossing a line?", a: "Use one approved reply that says the products are sold for laboratory research use only and that you cannot advise on any other use, and use it every time. Keep it as a saved reply, review the wording with your counsel and retrain anyone who improvises. If a customer pushes, the answer stays the same." },
    { q: "Where-is-my-order messages flood our inbox. How do we reduce them?", a: "Give customers the answer before they ask: tracking in the confirmation and shipping emails, honest delivery estimates at checkout and a status view that support can see too. Then tag every where-is-my-order ticket and review the tags weekly, because clusters point to a carrier, a product or a delay in your own process." },
    { q: "How do we handle a customer who threatens a chargeback?", a: "Respond quickly and politely, and look for the fix first: a refund, a replacement or a corrected record. Keep the full thread, the order, the tracking and the delivery proof together so they can be sent if a dispute is filed anyway. Do not argue or promise what you cannot deliver, and log every case so the cause can be fixed upstream." },
  ],
  related: ["business-dashboards", "fulfillment-logistics", "compliance-support"],
  caseStudies: [],
  articles: ["infrastructure-behind-an-ruo-peptide-business"],
  cta: { label: "Plan your support setup" },
};
