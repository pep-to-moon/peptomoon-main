import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const emailMarketing: Service = {
  slug: "email-marketing",
  name: "Email marketing and retention",
  pillar: "grow",
  summary: "Authenticated sending, transactional email, automation and segmentation that respect consent.",
  status: "established",
  primaryKeyword: "peptide email marketing",
  seo: {
    title: `Email Infrastructure for RUO Peptide Stores | ${brand}`,
    description:
      "Domain authentication, transactional email, automation, segmentation and deliverability for RUO peptide stores. Consent respected, no inbox promises.",
  },
  h1: "Email infrastructure and marketing for RUO peptide stores",
  lead: "Email infrastructure covers authenticated sending, transactional messages, automation and customer segmentation. We set up domain authentication so your mail is trusted, build order and account emails that work reliably, and report on results. Consent and unsubscribe rules are respected throughout. We cannot promise inbox placement or open rates.",
  what: [
    "Email is the one channel you own. We set up the foundation first, covering domain authentication, sending reputation and transactional templates, and then the flows that matter: welcome, abandoned cart, post-purchase and retention, plus broadcast campaigns with proper segmentation.",
    "Category rules apply to email too. Sending providers and mailbox services judge content, and the same discipline about claims that applies to your site applies to your messages.",
  ],
  why: [
    "Order confirmations and shipping notices are operational. When they land in spam, support load rises and customers lose confidence.",
    "Marketing email sent without authentication or consent damages reputation, and reputation is slow to repair.",
    "Email platforms set their own acceptable-use rules, and some restrict categories. Check before you build a list on one.",
  ],
  problems: [
    { title: "Transactional mail in the spam folder", text: "Missing authentication and mixed sending streams are the usual causes. We separate and authenticate them." },
    { title: "Unauthenticated domains", text: "Without aligned SPF, DKIM and DMARC, mailbox providers have little reason to trust you." },
    { title: "Blasting the whole list", text: "Sending everything to everyone raises complaints. Segments by purchase history, interest and source keep messages relevant." },
    { title: "Flows built once and never reviewed", text: "Automations drift. We review results and tune them on a schedule." },
  ],
  approach: [
    { title: "Authenticate the domain", text: "SPF, DKIM and DMARC configured, with a staged DMARC policy so legitimate mail is not blocked." },
    { title: "Separate the streams", text: "Transactional and marketing mail on separate sending identities." },
    { title: "Build the flows", text: "Welcome, abandoned cart, post-purchase and win-back, each with a clear purpose." },
    { title: "Segment", text: "By purchase history, category interest and acquisition source." },
    { title: "Measure and tune", text: "Delivery, complaints, unsubscribes and revenue per flow." },
  ],
  included: [
    "Email infrastructure",
    "Domain authentication",
    "Transactional email setup",
    "Marketing automation",
    "Customer segmentation",
    "Abandoned cart workflows",
    "Welcome sequences",
    "Customer retention campaigns",
    "Broadcast campaigns",
    "Deliverability optimisation",
    "Email performance analytics",
  ],
  process: [
    { title: "Audit", text: "Current sending, domains, lists and consent records." },
    { title: "Foundation", text: "Authentication, streams and templates." },
    { title: "Flows", text: "Automations built and tested with real orders." },
    { title: "Launch", text: "Warm-up where needed and monitoring." },
    { title: "Tune", text: "Regular review of delivery and results." },
  ],
  technical: [
    "SPF, DKIM and DMARC configured and monitored.",
    "Separate sending domains or subdomains for transactional and marketing mail.",
    "Suppression lists and one-click unsubscribe.",
    "Consent recorded with its source and time.",
    "Bounce and complaint webhooks feeding back into customer records.",
  ],
  limits: [
    "We cannot promise inbox placement or open rates.",
    "Email providers set their own rules for what they will send. We check before we build on one.",
    "Consent and anti-spam rules apply to you as the sender. We build tools to help and you remain responsible.",
  ],
  visual: "email",
  faqs: [
    { q: "Do I need DMARC?", a: "Major mailbox providers expect authenticated mail from bulk senders, and DMARC is part of that. We set it up in stages, starting with monitoring, so legitimate mail is not blocked while you find every service that sends on your behalf. Once the reports are clean, we tighten the policy." },
    { q: "Can you send my campaigns?", a: "We can build and operate campaigns within your approved messaging, or set everything up for your team to run. Either way, consent and unsubscribe rules are built in, and we do not write claims about product use or outcomes. We cannot promise inbox placement or open rates, because mailbox providers decide those." },
    { q: "Which email platform do you use?", a: "We choose based on your volume, your category rules and your integrations, because email providers set their own rules about what they will send and some restrict certain products. We check a provider's current policy before building on it, and we tell you what it costs so there are no surprises later." },
    { q: "Our emails land in spam. How do we fix that?", a: "Check authentication first: SPF, DKIM and DMARC on the sending domain. Then look at list quality, since old and unengaged addresses hurt reputation, and at content, since some wording and very large images raise flags. Send gradually from a warmed sender, remove addresses that bounce and honour unsubscribes at once." },
    { q: "What can we email without making claims we should not make?", a: "Order and shipping messages, documentation updates, restock notices and plain product announcements stay close to facts. Avoid anything that describes effects on people or suggests personal use, and have the templates reviewed by your counsel. Every campaign should run from approved templates rather than fresh copy each time." },
    { q: "How do we collect consent properly?", a: "Ask clearly at signup, say what the person will receive, store when and how they agreed and make unsubscribing a single step. Do not add customers who have not agreed, and keep the record so you can show it. The rules that apply depend on where your subscribers are, so confirm them with counsel." },
  ],
  related: ["affiliate-management", "seo-geo-aeo", "customer-support", "business-dashboards"],
  caseStudies: [],
  articles: ["infrastructure-behind-an-ruo-peptide-business"],
  cta: { label: "Plan your email setup" },
};
