import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const businessDashboards: Service = {
  slug: "business-dashboards",
  name: "Business dashboards and operations",
  pillar: "run",
  summary: "One reporting layer across orders, payments, inventory, affiliates, fulfillment and support.",
  status: "established",
  primaryKeyword: "ecommerce business dashboard development",
  seo: {
    title: `Business Dashboards for RUO Peptide Stores | ${brand}`,
    description:
      "Custom dashboards for RUO peptide businesses: orders, payments, inventory, affiliates, fulfillment and support in one reliable reporting layer.",
  },
  h1: "Business dashboards and operations reporting for RUO peptide businesses",
  lead: "A business dashboard puts orders, payments, inventory, affiliates, fulfillment and support in one view, built from your own systems instead of spreadsheets that drift apart. We scope it to the questions you need answered and connect the data behind it. A dashboard shows what your systems record, so it can reveal bad data but not fix it.",
  what: [
    "Most stores run on several systems that do not agree: the shop, the payment provider, the fulfillment partner, the affiliate tool and the inbox. A dashboard layer brings the data together, so the same order means the same thing everywhere.",
    "We build custom dashboards and the integrations behind them, scoped to the questions you actually need answered.",
  ],
  why: [
    "When systems disagree, someone reconciles by hand, and problems are found late. A shared order record and clear freshness indicators remove most of that work.",
    "Payment and fulfillment issues cost the most when they are noticed last. Alerts on holds, failures and delays shorten the time to react.",
    "Decisions about suppliers, affiliates and channels need numbers you trust. Trust comes from transparent definitions, not from prettier charts.",
  ],
  problems: [
    { title: "Numbers that disagree", text: "Different tools count orders, refunds and revenue differently. We agree definitions once and apply them everywhere." },
    { title: "Manual reconciliation", text: "Spreadsheets copied between tools break silently. We connect the sources and show when data was last updated." },
    { title: "Problems seen too late", text: "A payout hold or a stalled shipment should raise a flag the same day." },
    { title: "Reports nobody trusts", text: "Every figure links back to its source records so it can be checked." },
  ],
  approach: [
    { title: "Decide the questions", text: "What you need to know each day, week and month." },
    { title: "Connect the sources", text: "Orders, payments, inventory, affiliates, fulfillment and support." },
    { title: "Model the data", text: "A single order record as the shared key, with clear definitions." },
    { title: "Build the views", text: "Sales, orders, inventory, payments, affiliates, fulfillment and support." },
    { title: "Add alerts and a review rhythm", text: "Thresholds that matter and a routine for reading the numbers." },
  ],
  included: [
    "Custom dashboards",
    "Sales reporting",
    "Order management views",
    "Inventory visibility",
    "Affiliate reporting",
    "Fulfillment reporting",
    "Payment analytics",
    "Customer support workflows",
    "Business performance monitoring",
    "Custom integrations",
  ],
  process: [
    { title: "Questions", text: "Metrics and definitions agreed." },
    { title: "Connect", text: "Source systems integrated and tested." },
    { title: "Build", text: "Views reviewed with the people who will use them." },
    { title: "Verify", text: "Numbers checked against source records." },
    { title: "Operate", text: "Alerts and review routine in place." },
  ],
  technical: [
    "Read-only data connections where possible.",
    "A single order record as the shared key across systems.",
    "Scheduled syncs with visible freshness and error states.",
    "Role-based access to sensitive views.",
    "Exports for accounting.",
  ],
  limits: [
    "A dashboard shows what your systems record. It cannot fix bad source data, though it can reveal it.",
    "Sample data shown in demonstrations is illustrative and is labeled as such.",
    "We do not promise business results from reporting.",
  ],
  visual: "dashboard",
  faqs: [
    { q: "Can you connect the tools I already use?", a: "Often yes, through their interfaces or exports. We check what each tool allows before committing to scope, because some tools offer a full interface and others only a scheduled export. Where a tool allows neither, we say so up front and suggest what to change, so the dashboard is built on data you can rely on." },
    { q: "Who can see the dashboard?", a: "Access is role-based, so staff, affiliates and partners each see only what they should. You decide the roles, and we set up the views to match: for example, a partner sees their own results and no one else's, and support sees order status without payment details. Access can be changed as your team changes." },
    { q: "Do I have to replace my current systems?", a: "No. The aim is to connect what you already have, not to replace it. The dashboard reads from your store, payment provider, fulfillment partner and other tools through their interfaces or exports, and brings the results together in one place. If a system is genuinely holding you back, we will say so and explain the options." },
    { q: "We have numbers in five tools and no two agree. How do we get to one version?", a: "Pick one definition per measure, such as what counts as a paid order, then trace each tool's number back to that definition. Differences usually come from timing, refunds, currency or test orders. Once the definitions are written down, the dashboard reads from the source of truth for each measure and shows when a source disagrees." },
    { q: "Which five numbers should I look at every morning?", a: "Orders paid, orders shipped, refunds, the amount your payment provider is holding and support tickets waiting. Together they show whether money is arriving, product is moving and customers are being answered. Add advertising spend and affiliate payouts when you run those channels. Anything you would not act on within a week does not need a place on the first screen." },
    { q: "Can a dashboard warn me before a payment provider acts?", a: "It can show the measures providers watch, such as decline rate, refund rate and chargeback ratio, and flag when they move. It cannot predict a provider's decision. What it gives you is time: days in which to find the cause, answer disputes and prepare documents before a review arrives." },
  ],
  related: ["payment-processing", "peptide-3pl", "affiliate-management"],
  caseStudies: [],
  articles: ["infrastructure-behind-an-ruo-peptide-business"],
  cta: { label: "Plan your reporting" },
};
