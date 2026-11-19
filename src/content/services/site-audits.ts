import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const siteAudits: Service = {
  slug: "site-audits",
  name: "Site audits",
  pillar: "verify",
  summary: "A written, prioritized audit of your site across compliance, SEO and GEO, payments and checkout, speed on phones, tracking and more.",
  status: "established",
  primaryKeyword: "RUO peptide website audit",
  seo: {
    title: `Website Audit for RUO Peptide Stores | ${brand}`,
    description:
      "A prioritized audit for RUO peptide stores: compliance content, SEO and GEO, payments, mobile speed, tracking and security, with a fix plan.",
  },
  h1: "Website audits for RUO peptide businesses",
  lead: "A written audit of your store across the areas that decide whether it can sell, rank and keep its payments: compliance content, SEO and GEO, payments and checkout, speed and phones, tracking and the details around them. Every finding comes with evidence and a priority, so you know what to fix first.",
  what: [
    "A site audit is a structured review of what your store actually does, as opposed to what you think it does. We crawl the site, test it on a phone and a desktop, read every page the way a payment reviewer, a search engine and a customer would, inspect the tracking that fires, and walk through checkout. The result is a written report that lists each finding with its page, its evidence and its priority.",
    "RUO stores are unusual because the areas interact. A product page can be fine for search and a problem for a payment reviewer. Tracking can be correct and slow the page down. A notice can be present on one page and missing on another. We audit the areas together, so the report shows where one problem causes another, and the fix plan is ordered by what matters most rather than by who found it.",
  ],
  why: [
    "Problems on a store are rarely visible from the inside. The people who built it know where to click, and they see the version of the site that works. A customer on a phone, a reviewer comparing your application with your pages and a crawler reading your code each see something different.",
    "Many of the failures that cost most in this industry are quiet ones: a checkout that fails for one payment method, an event that fires twice, a page that points toward personal use, a category that search engines cannot reach. They do not announce themselves until a provider limits an account or traffic falls.",
    "An audit turns a vague worry into a list. With evidence and priorities, you can decide what to fix now, what can wait and what to ask your counsel or your developer about.",
  ],
  problems: [
    { title: "Problems nobody sees from inside", text: "Broken checkouts, missing notices and slow phone pages are easy to miss when you only test the happy path. We test the paths customers and reviewers actually take." },
    { title: "Fixes with no priority", text: "A long list with no order wastes a team's time. We rank findings by their effect on sales, payment risk, search visibility and compliance exposure." },
    { title: "Audits that stop at a score", text: "A number from an automated tool does not say what is wrong or why. Every finding in our report names the page, shows the evidence and explains the effect." },
    { title: "Findings with no evidence", text: "A claim that something is wrong is hard to act on. We keep a screenshot, a page reference and a date with each finding." },
    { title: "One-off checks that go stale", text: "A site changes every week. We schedule a re-check, so the audit becomes a baseline rather than a snapshot that ages." },
  ],
  approach: [
    { title: "Agree the scope", text: "Which site, which areas, which markets and devices, and what you already know is wrong." },
    { title: "Crawl and test", text: "A full-site crawl, rendered-page checks on desktop and phone, checkout walked through with real payment methods, and tracking inspected as it fires." },
    { title: "Review by area", text: "Compliance content, SEO, GEO and AEO readiness, payments and checkout, speed and phones, tracking, accessibility, security and policies, each against a written list." },
    { title: "Prioritize", text: "Findings ranked by their effect on revenue, payment risk, search visibility and compliance exposure, and by the effort to fix them." },
    { title: "Report with evidence", text: "A written report with a summary, the ranked findings, the evidence for each and a plan you can hand to any developer." },
    { title: "Support the fixes and re-check", text: "We can implement fixes or support your team, then re-test to confirm that the problem is gone." },
  ],
  included: [
    "Compliance and content review: claims, notices and consistency across channels",
    "Technical SEO audit",
    "GEO and AEO readiness review",
    "Payments and checkout review, including underwriting readiness",
    "Speed and mobile review against Core Web Vitals",
    "Tracking and analytics audit: pixel, server events and consent",
    "Accessibility review with keyboard testing",
    "Security and privacy basics",
    "Policy and trust-page review",
    "Email authentication check",
    "Structured data validation",
    "Prioritized fix plan and a re-check",
  ],
  process: [
    { title: "Scope", text: "The site, the areas and what you already suspect." },
    { title: "Examine", text: "Crawl, device tests, checkout walk-through and tag inspection." },
    { title: "Analyze", text: "Findings grouped by area and ranked by effect." },
    { title: "Report", text: "A written report with evidence and a fix plan." },
    { title: "Re-check", text: "Fixes verified once they are made." },
  ],
  technical: [
    "A full-site crawl, plus rendered-page checks on a phone-sized and a desktop screen.",
    "Performance measured in the lab and, where data exists, in the field, covering loading, responsiveness and layout shift.",
    "Checkout tested with real payment methods and failure cases such as declines, expired cards and refunds.",
    "Tags and events inspected in the browser and in each platform's own testing tools, with consent state checked.",
    "Automated accessibility checks followed by manual keyboard and screen-reader testing.",
    "Evidence kept with every finding: the page, a screenshot and the date.",
  ],
  limits: [
    "An audit is a snapshot on the date of the review. Sites, policies and platform rules change, so findings can go out of date.",
    "A compliance content review looks for avoidable risk. It is not legal advice, an approval or a certification, and it does not make a business compliant.",
    "We cannot promise approvals, rankings, AI citations or sales after fixes are made, because platforms and providers make their own decisions.",
    "We audit what we can observe from outside unless you give us access to accounts and tools, and we will say which findings depend on access we did not have.",
  ],
  visual: "audit",
  faqs: [
    { q: "What does a site audit cover?", a: "It covers compliance content, technical SEO, GEO and AEO readiness, payments and checkout, speed and mobile experience, tracking and analytics, accessibility, security basics, policy pages and email authentication. We agree the scope with you first, so the audit goes deep where your concern is greatest." },
    { q: "How is this different from running a free checker?", a: "An automated checker gives you a score and a list of generic warnings. We read the site in context, walk through checkout, test on a phone, inspect the tracking and explain which findings matter for your business and why, with evidence for each. Automated tools are part of our method. They are not the whole of it." },
    { q: "Will an audit tell us whether we are compliant?", a: "No. A compliance content review looks for avoidable risk, such as content that points toward personal use or notices that are missing or inconsistent. It is not legal advice or an approval. We organize the findings so you can take them to your own qualified counsel." },
    { q: "Our site is slow on phones. Will the audit explain why?", a: "Yes. We measure loading, responsiveness and layout shift on a phone, then trace the causes, which are often oversized images, too many scripts, slow server responses or layout that moves while the page loads. The report ranks fixes by how much they help." },
    { q: "Our payment processor shut us down. Should we audit before reapplying?", a: "It is one of the best uses of an audit. We compare the site, the policies and the checkout with what a provider reads, find mismatches and risky content, and check the figures providers monitor. Then you can fix the real problems before you apply again. We cannot promise any provider will approve you." },
    { q: "Do you fix what you find?", a: "We can, and the audit and the fixes can be separate scopes. The report is written so that you can give it to any developer. If you want us to implement the fixes, we do that and re-test to confirm each one." },
    { q: "How often should we audit?", a: "At least once a year, and after any major change: a rebuild, a new payment provider, a new advertising channel or a change in the rules you operate under. Keep the previous report so you can see what improved and what returned." },
  ],
  related: ["compliance-support", "seo-geo-aeo", "payment-processing", "ruo-peptide-website-development"],
  caseStudies: [],
  articles: ["payment-processor-shut-down-account", "peptide-store-architecture", "payment-processing-for-ruo-stores", "search-and-ai-visibility-for-ruo-peptide-stores"],
  cta: { label: "Request a site audit" },
};
