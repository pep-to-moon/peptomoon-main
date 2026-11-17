import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const affiliateManagement: Service = {
  slug: "affiliate-management",
  name: "Affiliate infrastructure",
  pillar: "grow",
  summary: "Referral tracking, commission rules, affiliate dashboards and payout records connected to your orders.",
  status: "established",
  primaryKeyword: "peptide affiliate management",
  seo: {
    title: `Peptide Affiliate Program Infrastructure | ${brand}`,
    description:
      "Referral tracking, commission rules, affiliate dashboards and payout tracking for RUO peptide brands, built into your store and tied to real orders.",
  },
  h1: "Affiliate program infrastructure for RUO peptide brands",
  lead: "Referral tracking, commission rules, affiliate dashboards and payout records, built into your store so programmes can be run, audited and improved.",
  what: [
    "An affiliate programme is a tracking and accounting system with a marketing layer on top. We build the registration flow, referral attribution, commission calculation, affiliate dashboard, payout tracking and reporting, and connect them to your orders so the numbers agree.",
    "We also help you set rules that protect the brand, because what affiliates say reflects on you.",
  ],
  why: [
    "Disputes about who earned a sale are expensive. Attribution stored on the order, with clear rules, settles them quickly.",
    "Commissions paid on orders that are later refunded or charged back drain margin. Net-sales definitions and automatic reversals prevent that.",
    "Affiliate content is your content in the eyes of reviewers and customers. In a category where claims matter, guidelines and monitoring are part of the programme, not an extra.",
  ],
  problems: [
    { title: "Attribution that nobody can audit", text: "Browser cookies alone are fragile. We store referral data against the order and keep a record of how it was assigned." },
    { title: "Commission on orders that did not stick", text: "Without reversal rules, refunds and chargebacks leave you paying twice. We calculate on net sales and reverse automatically." },
    { title: "Affiliates saying the wrong things", text: "Unreviewed claims create exposure. We draft content guidelines and a review step." },
    { title: "Opaque payouts", text: "Affiliates stay when they can see their clicks, orders, commissions and payment status." },
  ],
  approach: [
    { title: "Define the rules", text: "Attribution window, attribution model, net-sales definition that excludes refunds, chargebacks and taxes, and reversal rules." },
    { title: "Build tracking", text: "Referral links and codes with server-side recording, not only cookies." },
    { title: "Give affiliates a dashboard", text: "Clicks, orders, commissions, payout status and assets, in one place." },
    { title: "Track payouts", text: "Approved, pending and paid states with exports for your accounting." },
    { title: "Set content guidelines", text: "Plain rules about what affiliates may and may not say, and how material is reviewed." },
  ],
  included: [
    "Affiliate programme creation",
    "Affiliate registration",
    "Referral tracking",
    "Commission structures",
    "Affiliate dashboard development",
    "Affiliate management tools",
    "Performance reporting",
    "Affiliate integrations",
    "Payout tracking",
    "Programme optimisation",
  ],
  process: [
    { title: "Design", text: "Commission model, rules and content guidelines agreed in writing." },
    { title: "Build", text: "Tracking, dashboard and admin tools connected to orders." },
    { title: "Test", text: "Edge cases: refunds, chargebacks, repeat orders and self-referrals." },
    { title: "Launch", text: "Onboarding material and first affiliates." },
    { title: "Review", text: "Performance and fraud checks on a schedule." },
  ],
  technical: [
    "Referral attribution stored on the order, not only in a browser cookie.",
    "Commissions calculated from net sales and reversed automatically on refunds and chargebacks.",
    "Self-referral and duplicate-order checks.",
    "Exports for payout reconciliation.",
    "An admin audit log of rule changes.",
  ],
  limits: [
    "We do not promise affiliate recruitment or sales.",
    "We do not write or approve claims about human use, and the content guidelines we draft prohibit them.",
    "Payout methods and tax handling depend on your jurisdiction and your advisers.",
  ],
  visual: "affiliate",
  faqs: [
    { q: "Which affiliate platform do you use?", a: "Programmes can run on a custom system built into your store or on a third-party platform. We recommend based on your volume, your category and what the platform allows." },
    { q: "How are commissions calculated?", a: "On net sales, using a definition we agree with you. Refunds and chargebacks reverse commissions according to your rules." },
    { q: "Can affiliates see their own results?", a: "Yes. A dashboard shows clicks, orders, commissions and payout status." },
    { q: "An affiliate is making claims we would not make. What do we do?", a: "Contact them promptly, point to the written guidelines, ask for the content to be removed and record what happened. If it continues, pause payouts and end the relationship as your terms allow. This is why guidelines must exist before the first affiliate joins, and why affiliate content should be reviewed on a schedule." },
    { q: "How do we limit commission fraud and self-referrals?", a: "Define what counts as a valid referral, hold payouts for a review period that covers refunds, look for unusual patterns such as many orders from one address and write the rules into the affiliate terms. No system removes the risk, but clear rules and a hold period make it manageable." },
    { q: "How do we reconcile affiliate sales with what the store actually shipped?", a: "Pay commission on orders that were paid and not refunded, not on clicks or carts, and reconcile the affiliate report against the order system each month before payout. Mismatches usually come from refunds, partial shipments and orders placed without a tracking cookie." },
  ],
  related: ["meta-advertising", "email-marketing", "business-dashboards"],
  caseStudies: ["veracue-labs", "99-purity-peptides"],
  articles: ["infrastructure-behind-an-ruo-peptide-business"],
  cta: { label: "Plan an affiliate programme" },
};
