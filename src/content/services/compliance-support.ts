import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const complianceSupport: Service = {
  slug: "compliance-support",
  name: "Compliance-oriented review and support",
  pillar: "verify",
  summary: "Website and content risk reviews, disclaimer and documentation organization, alongside your own qualified professionals.",
  status: "established",
  primaryKeyword: "RUO website compliance review",
  seo: {
    title: `RUO Website Compliance Review and Support | ${brand}`,
    description:
      "Compliance-oriented reviews of RUO peptide sites, copy, disclaimers and documentation. We work alongside your counsel and are not a law firm.",
  },
  h1: "Compliance-oriented review and support for RUO peptide businesses",
  lead: "A research-use-only label does not make a business or its marketing compliant. We review your website, product copy, disclaimers and documentation for avoidable risk, organize what you have and work alongside your own qualified counsel. We are not a law firm, and our review is neither legal advice nor an approval.",
  what: [
    "This service is about reducing avoidable exposure. We read your site the way a reviewer would, point out content and structure that creates risk, and help you organize policies, notices and documentation so they are consistent. We are not a law firm, a regulator or a substitute for legal advice.",
    "We work alongside your own counsel or regulatory professionals. If you do not have one yet, we can explain what to ask and what to bring to a first conversation, so the time you pay for is spent well.",
  ],
  why: [
    "A disclaimer does not decide how a product is regulated. FDA has issued warning letters to peptide sellers whose products carried research-use-only labeling, based on website evidence of intended use. The agency's own letters and your counsel are the right places to read the detail.",
    "Terms such as 503A and 503B describe licensed pharmacy and outsourcing facility frameworks. They do not describe ordinary RUO sales, and a retailer does not qualify for them by labeling products for research. Ask your counsel how they apply to your products.",
    "Regulation, enforcement priorities and platform policies change. A page that was reasonable last quarter can be out of date today, which is why we date every review.",
  ],
  problems: [
    { title: "Disclaimers asked to do too much", text: "A notice in the footer cannot offset what the rest of the site says. Reviewers look at the whole presentation." },
    { title: "Inconsistent claims across pages", text: "Purity statements, shipping claims and product descriptions that disagree create doubt and are easy to find." },
    { title: "Surrounding content that points the wrong way", text: "Intended use is judged from the full picture. Dosing language, usage guidance, personal-effect testimonials and some supporting products can undermine a research-use position, so we flag them for discussion with your counsel." },
    { title: "No record of what was reviewed", text: "Without dated notes you cannot show what you checked or repeat the review when rules change." },
  ],
  approach: [
    { title: "Content risk assessment", text: "A page-by-page review of the site, with a written risk register." },
    { title: "Disclaimer and notice review", text: "Placement, wording consistency and whether notices match the rest of the page." },
    { title: "Product description and labeling review", text: "Considerations for how products are described and labeled, raised for your counsel to decide." },
    { title: "Marketing claims review", text: "Site, email, affiliate material and social posts checked against the same standard." },
    { title: "Documentation organization", text: "Policies, notices, supplier records and review notes indexed in one place." },
    { title: "Updates", text: "Dated follow-up reviews and awareness of regulatory changes, with questions escalated to qualified professionals." },
  ],
  included: [
    "RUO website content reviews",
    "Product description reviews",
    "Disclaimer reviews",
    "Product labeling considerations",
    "Marketing claims review",
    "Website content risk assessments",
    "Regulatory documentation organization",
    "Business operations guidance",
    "Regulatory update awareness",
    "Coordination with qualified regulatory professionals",
  ],
  process: [
    { title: "Inventory", text: "Every page, claim, policy and document collected." },
    { title: "Review", text: "Findings recorded with page references and reasons." },
    { title: "Prioritize", text: "Changes ranked by exposure and effort." },
    { title: "Hand over", text: "Change lists for your developers or ours, and questions for counsel." },
    { title: "Repeat", text: "Scheduled reviews with dated notes." },
  ],
  technical: [
    "A review checklist applied page by page with a written risk register.",
    "Change lists that developers can apply directly.",
    "A documentation index linking policies, notices and supplier records.",
    "Dated notes so reviews can be repeated when rules change.",
  ],
  limits: [
    "We are not a law firm and we do not provide legal advice.",
    "A review is not an approval, certification or guarantee of compliance.",
    "We do not provide guidance on disguising human-use marketing, concealing intent, evading regulators or bypassing applicable law.",
    "We do not imply that an ordinary RUO retailer qualifies for 503A or 503B.",
  ],
  visual: "compliance",
  sources: [
    {
      label: "eCFR: 21 CFR 201.128, meaning of intended use",
      url: "https://www.ecfr.gov/current/title-21/section-201.128",
      checked: "2026-11-17",
    },
    {
      label: "FDA warning letter to Summit Research Peptides, 10 December 2024",
      url: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/summit-research-peptides-695607-12102024",
      checked: "2026-11-17",
    },
  ],
  faqs: [
    { q: "Does an RUO disclaimer make my business compliant?", a: "No. A disclaimer is one element, and it does not make a business or its marketing compliant. How products are described and marketed, and what the whole site implies, matters as much. We review the site for content that points beyond research use and take the findings to your counsel." },
    { q: "Do you work with lawyers?", a: "We work alongside your own counsel or regulatory professionals and prepare the material that makes those conversations efficient. That means organized copy, records and a list of risks we found, so a lawyer can spend their time on judgment. We are not a law firm, and our review is not legal advice or an approval." },
    { q: "What are 503A and 503B?", a: "They are parts of US law covering pharmacy compounding by licensed pharmacists and physicians (503A) and outsourcing facilities registered with FDA (503B). They concern licensed pharmacy and facility activity, not ordinary RUO retail, and a research-use label does not bring a product under either. Ask your counsel how they apply to your products." },
    { q: "We have years of old blog posts and emails. How do we review them all?", a: "Start with an inventory of every page, template and post, then review in order of reach, with the pages customers see most first. Score each against a written list of signals, record findings with page references and decide with your counsel what to change. A spreadsheet is enough. We organize the inventory and the findings, and the decisions belong to you and your counsel." },
    { q: "We removed content after a warning. How do we show that we fixed it?", a: "Keep dated records of what was found, what changed and who approved it, with before-and-after copies. Check every channel, including emails, social posts and affiliate material, and brief your team in writing. Your counsel can advise on what to share and how." },
    { q: "How often should we repeat a review?", a: "At least twice a year, and whenever something changes: a new product line, a new channel, a new affiliate program or a change in the rules you operate under. Keep each review's record so you can show a pattern of checking rather than a single effort." },
  ],
  related: ["site-audits", "supplier-verification", "ruo-peptide-website-development", "customer-support"],
  caseStudies: [],
  articles: ["is-selling-research-peptides-legal", "peptide-business-setup-checklist", "ruo-label-is-not-a-compliance-strategy", "503a-503b-and-ruo-retail"],
  cta: { label: "Discuss a content review" },
};
