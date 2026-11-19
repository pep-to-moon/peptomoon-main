import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const telehealthPaymentProcessing: Service = {
  slug: "telehealth-payment-processing",
  name: "Telehealth payments and LegitScript readiness",
  pillar: "run",
  summary: "Underwriting preparation, LegitScript readiness and payment integration for licensed clinical telehealth businesses.",
  status: "by-engagement",
  primaryKeyword: "telehealth merchant account",
  seo: {
    title: `Telehealth Merchant Account and LegitScript | ${brand}`,
    description:
      "Telehealth payment processing for licensed clinical businesses: underwriting prep, LegitScript readiness and integration. Not for RUO peptide sellers.",
  },
  h1: "Telehealth merchant account and LegitScript readiness for licensed clinical businesses",
  lead: "This service is for licensed clinical telehealth businesses, not for research-use-only product sellers. We prepare the business for payment underwriting and, where it applies, for LegitScript certification, then integrate payments and monitor them. LegitScript says certification does not guarantee advertising approval, and we promise no approvals either.",
  what: [
    "Telehealth businesses that take card payments are underwritten for their services, their prescribing model and their records. LegitScript describes its healthcare certification as a third-party, independent certification that you meet the industry's compliance standards, intended for businesses involved in the online sale, prescribing, facilitation or payment processing of prescription medications.",
    "LegitScript also says certification is a necessary part of the approval process for card-not-present transactions with Visa and Mastercard and for advertising on Google and Bing, for businesses in that scope. It adds that certification may be required to take part in certain advertising programs but does not guarantee advertising approval. Requirements differ by country and by provider, so confirm the current rules directly.",
    "Research-use-only businesses are a different case. LegitScript's own FAQ lists research-use-only chemical businesses, including peptides, as generally not eligible for its healthcare certification. If you sell research-use-only product, this is not the right service, and our [payment processing](/services/payment-processing) page and underwriting guide are the better place to start.",
  ],
  why: [
    "Providers and platforms look closely at telehealth models, and a gap between how you operate and how you apply is a common reason for delay.",
    "Certification and payment underwriting are separate processes with separate decision makers, so plan for both.",
    "Records matter. Licensure, prescribing workflows, pharmacy relationships and billing all feed the review, so they should be organized before you apply.",
  ],
  problems: [
    { title: "Not knowing which approvals apply", text: "Certification, underwriting and platform rules overlap and differ by country. We map which ones apply to your model before you apply for any of them." },
    { title: "An application that does not match the operation", text: "What you say, what your platform does and what your records show have to agree. We find the gaps first." },
    { title: "Payments added after the platform is built", text: "Billing and consent flows are hard to change late. We plan them with the platform, not after it." },
    { title: "Records scattered across tools", text: "Reviewers ask for evidence. We organize licensure, workflow and billing records so they can be produced quickly." },
  ],
  approach: [
    { title: "Map your model", text: "What you offer, who prescribes, which pharmacies you work with and how patients pay." },
    { title: "Check what applies", text: "Which certifications and approvals are relevant to your model and countries, confirmed against the published sources." },
    { title: "Prepare the file", text: "Organize the records and make the application, the website and the platform tell the same accurate story." },
    { title: "Integrate payments", text: "Hosted checkout or gateway configuration, subscription billing and clear failure states." },
    { title: "Monitor", text: "Decline and chargeback tracking, with alerts and reconciliation." },
  ],
  included: [
    "Telehealth model and approvals mapping",
    "LegitScript readiness review, where it applies",
    "Underwriting file preparation",
    "Payment and subscription billing integration",
    "Chargeback and decline monitoring",
    "Records organization for review",
  ],
  process: [
    { title: "Review", text: "Your model, your records and your current payment setup." },
    { title: "Map", text: "Which approvals apply, and in what order." },
    { title: "Prepare", text: "The file, the website and the platform brought into line." },
    { title: "Integrate", text: "Payments connected and tested with real orders." },
    { title: "Monitor", text: "Results reviewed and workflows adjusted." },
  ],
  technical: [
    "Hosted checkout or gateway integration with signed webhooks.",
    "Subscription billing with clear renewal and cancellation states.",
    "Order, payment and consent records tied together for review.",
    "Decline and chargeback dashboards with alerts.",
  ],
  limits: [
    "This service is for licensed clinical telehealth businesses only, not for research-use-only product sellers.",
    "We cannot promise payment approval or LegitScript certification. LegitScript and your provider make those decisions.",
    "LegitScript states that certification does not guarantee advertising approval.",
    "We are not a law firm and give no clinical or legal advice. Licensing and compliance duties stay with your licensed providers and your organization.",
  ],
  sources: [
    { label: "LegitScript Healthcare Certification: FAQ", url: "https://www.legitscript.com/certification/healthcare-certification/faq/", checked: "2026-11-19" },
    { label: "LegitScript Healthcare Certification", url: "https://www.legitscript.com/certification/healthcare-certification/", checked: "2026-11-19" },
  ],
  visual: "payments",
  faqs: [
    { q: "What is LegitScript certification?", a: "LegitScript describes it as a third-party, independent certification that you meet the industry's compliance standards, intended for businesses involved in the online sale, prescribing, facilitation or payment processing of prescription medications. It is separate from payment underwriting, and each has its own decision maker." },
    { q: "Do I need LegitScript to take card payments?", a: "LegitScript says certification is a necessary part of the approval process for card-not-present transactions with Visa and Mastercard for businesses in its scope. Your own provider decides what it requires, and rules differ by country, so confirm the current requirements with your provider before you apply." },
    { q: "Can a research peptide seller get LegitScript certification?", a: "LegitScript's FAQ lists research-use-only chemical businesses, including peptides, as generally not eligible for its healthcare certification. If you sell research-use-only product, this is not the right service. Our payment processing page and underwriting guide explain how that route works, and you should confirm eligibility with LegitScript directly." },
    { q: "Does certification guarantee that my ads will be approved?", a: "No. LegitScript states that certification may be required to participate in certain advertising programs but does not guarantee advertising approval. Each platform applies its own policy, so plan marketing that does not depend on one channel. We promise no advertising approvals either." },
    { q: "Do you build the telehealth platform too?", a: "Yes, through our separate telehealth platform development service. You can use one without the other. The clinical service, the licenses and the compliance duties always stay with your licensed providers and your organization, and we never give clinical or legal advice." },
    { q: "How long does certification or approval take?", a: "We give no timelines, because certification and payment underwriting are decided by LegitScript and your provider, not by us. What we can do is get your records and application in order first, so that a request for evidence does not stall the process." },
    { q: "Is this legal advice?", a: "No. We are not a law firm, and nothing here is legal or clinical advice. We read the published requirements and prepare your business and records for review. Licensing and compliance questions should go to your own qualified counsel and your licensed providers." },
  ],
  related: ["payment-processing", "telehealth-platform-development", "compliance-support"],
  caseStudies: [],
  articles: ["payment-processing-for-ruo-stores"],
  cta: { label: "Discuss telehealth payments" },
};
