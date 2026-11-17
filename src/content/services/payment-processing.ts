import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const paymentProcessing: Service = {
  slug: "payment-processing",
  name: "Payment processing and merchant infrastructure",
  pillar: "run",
  summary: "Underwriting preparation, provider fit, integration, monitoring and reconciliation. No approval promises.",
  status: "established",
  primaryKeyword: "peptide payment processing",
  seo: {
    title: `Peptide Payment Processing and Shutdown Recovery | ${brand}`,
    description:
      "Payment processor shut down your RUO store? We prepare the business and implement a replacement processor. Honest about underwriting, no promises.",
  },
  h1: "Payment processing infrastructure for RUO peptide businesses",
  lead: "We help RUO peptide businesses understand how payment underwriting works, prepare for it, integrate the right payment infrastructure and monitor it afterwards. If your payment processor has shut you down, we help you work out why, prepare for a fresh review and implement a new processor on your site. We never promise approval, and we never help misrepresent a business.",
  what: [
    "Payment processing is an operational system, not a checkbox. It includes the merchant account, the gateway or hosted checkout, the order and refund logic around it, the monitoring that spots trouble early and the reporting that matches payouts to orders. We consult on provider fit, prepare the business and website for underwriting review, integrate supported payment systems and set up the workflows that keep the money visible.",
    "If your payment processor has shut down your account, ended your merchant agreement or is holding your funds, the first job is to understand why and to protect your cash flow. We help you gather the documents, read the termination terms and prepare the business and the website for a fresh review. Then we help you implement a new payment processor on your site, covering checkout, webhooks, refunds and reconciliation, so you can take orders again. Approval is always the provider's decision, and we never promise it.",
  ],
  why: [
    "Many conventional providers restrict or decline this category, and accounts that were working can be limited, held or closed with little notice. When funds are held or settlement is delayed, the effect on cash flow is immediate.",
    "Each provider underwrites against its own policies and contract terms. A business model that does not fit those terms keeps running into trouble however good the checkout looks. Identifying providers whose underwriting and terms genuinely support your model is the foundation, and it has to be done honestly.",
    "At the time of writing (17 November 2026), Stripe's prohibited and restricted businesses list includes categories such as incorrectly labelled research chemicals and several pharmaceutical categories. Providers change these lists, so read the current policy of any provider you depend on.",
  ],
  problems: [
    { title: "Your payment processor shut you down", text: "When an account is closed or funds are held, sales stop and cash is tied up. We work out what happened, prepare the business and the site for a fresh review and implement a new processor on your site." },
    { title: "Unexpected restrictions", text: "Accounts can be limited or closed after review, often with little advance notice. We reduce surprise by preparing documentation and understanding a provider's terms before you depend on it." },
    { title: "Held funds and delayed settlement", text: "Reserves and rolling holds change cash flow. We model them in advance and build reporting so you can see exactly what is pending." },
    { title: "Terms that do not fit", text: "Fee schedules, chargeback penalties and termination rights vary widely. We read the contract with you and flag what matters." },
    { title: "Failures you cannot diagnose", text: "Declines, abandoned payments and webhook errors look alike from the outside. We instrument checkout so causes become visible." },
  ],
  approach: [
    { title: "Underwriting readiness", text: "We review what a provider will see: website content, product descriptions, policies, shipping and refund terms, business details and supplier documentation, and fix inconsistencies before an application goes in." },
    { title: "Provider fit", text: "We compare underwriting categories, reserve and hold practices, settlement timing, chargeback terms and termination notice, so you choose with the contract in view." },
    { title: "Integration", text: "Gateway or hosted checkout configuration, webhooks with signature checks, idempotent order updates and clear failure states." },
    { title: "Monitoring", text: "Transaction dashboards, decline analysis, chargeback ratio tracking and alerts." },
    { title: "Reconciliation", text: "Payout reports matched to orders, refunds and fees." },
  ],
  included: [
    "Merchant account consultation",
    "Termination notice and held-funds review",
    "Replacement payment processor implementation after a shutdown",
    "Payment processor and gateway integration",
    "Merchant application preparation",
    "Payment infrastructure review",
    "Checkout optimisation",
    "Payment failure troubleshooting",
    "Transaction monitoring workflows",
    "Chargeback management workflows",
    "Payment reporting and reconciliation",
    "Documentation of provider requirements and restrictions",
  ],
  process: [
    { title: "Assess", text: "Business model, volumes, products, current setup and any history with providers." },
    { title: "Prepare", text: "Website and documentation reviewed against what underwriters read." },
    { title: "Select", text: "Provider options compared on terms, not only on price." },
    { title: "Integrate", text: "Checkout, webhooks and order logic built and tested." },
    { title: "Operate", text: "Monitoring and reporting running from day one." },
  ],
  technical: [
    "Hosted payment pages or hosted fields keep card data off your servers and reduce PCI scope.",
    "Webhook endpoints verify signatures and are safe to retry.",
    "Order state changes follow confirmed payment events, never the browser redirect alone.",
    "Structured logging of declines and errors without storing card data.",
    "3-D Secure and address verification where the provider supports them.",
  ],
  limits: [
    "We cannot guarantee merchant approval, particular rates or uninterrupted processing. Providers make their own risk decisions.",
    "We never suggest misrepresenting products, hiding business activities, bypassing underwriting or breaking a provider's terms.",
    "We are not a payment provider and we do not decide whether you are approved.",
  ],
  visual: "payments",
  sources: [
    { label: "Stripe: prohibited and restricted businesses", url: "https://stripe.com/legal/restricted-businesses", checked: "2026-11-17" },
  ],
  faqs: [
    { q: "Can you get my account approved?", a: "No one can promise that, and we do not. We prepare your business and your website so an application is accurate and complete, and we help you choose providers whose published terms fit your model. The decision is always the provider's, and it can change after approval, so we also help you monitor your account afterwards." },
    { q: "Which providers do you work with?", a: "It depends on your business model and on what each provider is willing to support at the time. We discuss specific options within your project instead of publishing a list, because suitability changes and a name that fits one business may not fit another. We tell you what each provider's current terms say before you apply." },
    { q: "What if my account is restricted?", a: "We help you read the notice, gather the documentation the provider asks for, understand your options and put workflows in place so operations are less exposed next time. We cannot overturn a provider's decision or promise that funds will be released by a certain date, because those choices belong to the provider." },
    { q: "Our payment processor shut us down. Can you help us set up a new one on our site?", a: "Yes. We work out why the account was closed, read the termination terms with you, prepare the business and the website for a fresh review, help you choose providers whose policies fit your category and implement the new processor on your site: checkout, webhooks, refunds, reconciliation and monitoring. We cannot promise that any provider will approve you, because the decision is theirs, and we will tell you plainly what we see." },
    { q: "How long can a processor hold our money after closing our account?", a: "It depends on your contract. Many agreements allow funds to be held for a period after termination to cover refunds and chargebacks, and that period can be long. Find the clause, ask the provider for the release date in writing and plan your cash flow around it. A lawyer can advise on your rights under the agreement." },
    { q: "Will a new provider know we were shut down before?", a: "Applications usually ask about previous terminations, and some industry databases record them. Answer honestly. Hiding a closure is a breach of the application and tends to end the relationship later, usually at a worse moment. A truthful account of what happened and what you changed is the stronger position." },
    { q: "Our processor froze funds without warning. What should we do in the first 48 hours?", a: "Read the notice and your contract, then respond within the time given with one organised package: business records, supplier documents, policies and a clear account of what happened. Ask for the release timetable in writing, keep every message and tell your accountant. Do not route sales through another account to cover the gap, because that breaches provider terms and makes things worse. A lawyer can advise on your rights under the contract." },
    { q: "We keep getting declined. How do we find out why?", a: "Compare your application with your live site line by line. Mismatched business names, product descriptions that go beyond research use, missing policy pages and volumes you cannot explain are the usual causes. Ask the provider what it can share, correct any genuine inconsistency and consider whether the provider's policy simply excludes your category. Reapplying unchanged rarely helps." },
    { q: "How much cash should we hold back for reserves and holds?", a: "Work it out from the contract: the reserve percentage and how long it is held, applied to your typical sales, plus the settlement delay. Compare the total with the cash you could cover from elsewhere. The figure is specific to your terms and changes when your volume does, so we revisit it whenever either one changes." },
  ],
  related: ["ruo-peptide-website-development", "site-audits", "business-dashboards", "compliance-support"],
  caseStudies: ["veracue-labs"],
  articles: ["payment-processor-shut-down-account", "payment-processing-for-ruo-stores", "infrastructure-behind-an-ruo-peptide-business"],
  cta: { label: "Discuss your payment setup" },
};
