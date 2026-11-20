import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const telehealthPlatformDevelopment: Service = {
  slug: "telehealth-platform-development",
  name: "Telehealth platform development",
  pillar: "build",
  summary:
    "Custom telehealth software for licensed clinical businesses: intake, scheduling, secure messaging, prescription workflows, subscription billing and audit logs on hosting that supports HIPAA.",
  status: "established",
  primaryKeyword: "telehealth platform development",
  seo: {
    title: `Telehealth Platform Development for Clinics | ${brand}`,
    description:
      "Custom telehealth platform development: patient and provider portals, intake, scheduling, secure messaging, prescriptions and subscription billing.",
  },
  h1: "Telehealth platform development for licensed clinical businesses",
  lead: "We design and build custom telehealth platforms around your care model: patient and provider portals, intake, scheduling, secure messaging, prescription and pharmacy workflows and subscription billing, on hosting that supports HIPAA. We build the software. The clinical service, the licenses and the compliance duties stay with your licensed providers and your organization, and we never promise approval, outcomes or compliance.",
  what: [
    "A telehealth platform is the system a patient and a clinician both use, from the first question to the follow-up. It collects intake and consent, decides who may see which record, books and reminds, carries the visit and the messages around it, hands prescriptions to your pharmacy partner through the route your clinicians choose and bills the patient on the schedule your model needs. It is also the part of the business a payment reviewer, a regulator or a patient reads most closely.",
    "We build that system as custom software. Patient, provider and admin areas share one data model, so intake answers reach the clinician without retyping, a visit leaves a trail that an admin can audit and a subscription follows the care plan instead of fighting it. We build the platform and its integrations. We do not employ clinicians, prescribe, dispense or provide medical advice, and the platform never replaces a clinician's judgment.",
  ],
  whyTitle: "Why clinical businesses need it",
  why: [
    "Off-the-shelf telehealth tools are designed for general primary care. A subscription clinic, a specialty practice or a program with its own eligibility rules usually ends up with a patchwork: a form builder for intake, a scheduling app, a video link, a spreadsheet and a billing tool, none of which share a record. Patients repeat themselves, staff copy data between tools and nobody can say who saw what.",
    "Health information has strict handling rules. In the United States, HHS says providers must use technology vendors that comply with the HIPAA Rules and will sign business associate agreements, and the same applies to the cloud services that store the data. A platform built around that fact from the first commit, with access controls, encryption and audit logs designed in, costs far less than one retrofitted after a problem.",
    "Payment providers underwrite telehealth carefully. Recurring billing, higher ticket sizes and, in many models, prescriptions put the category in elevated-risk review. The platform, its policies and its billing flow are part of what a reviewer reads, so they need to describe the business accurately and consistently.",
  ],
  sources: [
    { label: "HHS: HIPAA and telehealth", url: "https://www.hhs.gov/hipaa/for-professionals/special-topics/telehealth/index.html", checked: "18 November 2026" },
    { label: "HHS: HIPAA rules for telehealth technology", url: "https://telehealth.hhs.gov/providers/telehealth-policy/hipaa-for-telehealth-technology", checked: "18 November 2026" },
    { label: "HHS: business associates FAQ", url: "https://www.hhs.gov/hipaa/for-professionals/faq/business-associates/index.html", checked: "18 November 2026" },
  ],
  problems: [
    {
      title: "Tools that do not share a record",
      text: "Intake in one app, scheduling in another and notes in a third means re-entry, gaps and no single audit trail. We model the patient, the visit and the plan once and let every screen read the same record.",
    },
    {
      title: "Patient data in places without an agreement",
      text: "Health information that drifts into a general-purpose spreadsheet, chat tool or analytics script is a risk the operator carries. We keep patient data inside services that offer business associate agreements and keep it out of everything else.",
    },
    {
      title: "Marketing scripts inside the patient area",
      text: "Pixels, session recording and analytics are normal on a marketing site and a problem inside a logged-in portal. We keep the two apart, and we leave trackers off authenticated pages unless your adviser decides otherwise.",
    },
    {
      title: "Billing that fights the care plan",
      text: "Subscriptions, pauses, dose or plan changes and refunds all touch the clinical record. We connect billing events to plan status so a change in one never silently breaks the other.",
    },
    {
      title: "A launch that stalls at underwriting",
      text: "A payment reviewer reads the site, the policies and the flow. We prepare them together, so the application matches what the platform really does.",
    },
  ],
  approach: [
    { title: "Map the care model", text: "We start with who the patient is, what the clinician needs to decide and what must be recorded at each step. Eligibility rules, visit types, follow-ups and escalation paths become a written workflow before any screen is designed." },
    { title: "Separate three areas", text: "Patients, providers and administrators each get their own area with their own permissions. Role-based access means a person sees only what their job requires, and every access is logged." },
    { title: "Build on services that sign agreements", text: "Hosting, database, email, video and messaging are chosen from services that offer business associate agreements. You hold the accounts and the agreements, so the data stays yours." },
    { title: "Connect prescriptions and pharmacy through your partners", text: "Your licensed prescribers and your pharmacy partner decide how a prescription is issued and fulfilled. We integrate the route they choose and show its status in the record." },
    { title: "Tie billing to the plan", text: "Subscriptions, memberships and one-off visits are billed from plan status, with clear descriptors and refund handling, and set up with a payment provider that underwrites your category." },
    { title: "Test, document and hand over", text: "We test the full journey on phones and desktops, run accessibility and security checks, document the data flows for your compliance adviser and train your team." },
  ],
  included: [
    "Patient portal with account, intake, consent and history",
    "Provider workspace with queue, records, notes and follow-ups",
    "Admin area with roles, reports and an audit trail",
    "Intake forms and eligibility questionnaires with conditional logic",
    "Consent capture and versioned policies",
    "Appointment scheduling, reminders and rescheduling",
    "Video or audio visits through a service that signs a business associate agreement",
    "Secure messaging between patients and the care team",
    "Prescription and pharmacy workflow integration through your partners",
    "Subscription, membership and one-off visit billing",
    "Role-based access control and audit logs",
    "Encryption in transit and at rest, backups and retention rules",
    "Reporting on visits, conversion, retention and revenue",
    "Handover documentation for your compliance adviser",
  ],
  process: [
    { title: "Discover", text: "Care model, states you serve, clinicians, pharmacy partners, volumes and what exists today." },
    { title: "Specify", text: "Workflows, roles, data model and integrations written down and reviewed with your clinical and compliance leads." },
    { title: "Design", text: "Patient, provider and admin screens reviewed on phone and desktop before build." },
    { title: "Build", text: "Typed, tested software with accessibility, security and performance checks along the way." },
    { title: "Pilot", text: "A closed run with real clinicians and test patients, then fixes before the public launch." },
    { title: "Launch and care", text: "Monitored release, runbooks, updates and a clear path for changes." },
  ],
  technical: [
    "Next.js with server rendering for public pages and a separate, authenticated application for patient, provider and admin areas.",
    "A relational database on hosting that offers a business associate agreement, with encryption at rest and in transit and point-in-time backups.",
    "Role-based access control with least-privilege defaults, session limits, multi-factor sign-in for staff and an immutable audit log.",
    "Video, messaging, email and file storage supplied by vendors that sign business associate agreements, configured so nothing personal is sent through a service without one.",
    "No third-party analytics, session recording or advertising pixels inside logged-in areas by default, and a separate, consent-aware setup for the marketing site.",
    "Observability that records events and errors without writing patient content into logs.",
  ],
  limits: [
    "We build software. We do not provide medical care, prescribe, dispense, diagnose or give medical advice, and the platform is never a substitute for a clinician.",
    "HIPAA compliance belongs to your organization, not to software alone. We build on infrastructure that supports it and we recommend a healthcare compliance adviser reviews the final setup.",
    "Licensing, corporate practice and telehealth rules differ by state and by service. We do not give legal advice, and we cannot confirm that a care model is permitted where you operate.",
    "Research-use-only products are not part of a clinical offering and never appear inside the platform. If you run both businesses, we keep them separate.",
    "We cannot guarantee payment approval, specific rates or reserve terms. The acquiring bank decides.",
  ],
  visual: "telehealth",
  faqs: [
    {
      q: "What does a custom telehealth platform include?",
      a: "A typical build has a patient portal, a provider workspace and an admin area on one shared record. It covers intake and consent, scheduling and reminders, video or audio visits, secure messaging, prescription and pharmacy workflows through your partners, subscription billing, reporting, role-based access and audit logs. We scope the exact list with you, because a one-visit program and a membership clinic need different things.",
    },
    {
      q: "Is the platform HIPAA compliant?",
      a: "HIPAA compliance belongs to your organization, not to software alone. We build on hosting and services that offer business associate agreements, encrypt data in transit and at rest and add role-based access and audit logs. Your team still owns policies, training, risk assessments and agreements, and we recommend that a healthcare compliance adviser reviews the final setup before launch.",
    },
    {
      q: "Do you provide the clinicians, prescribers or pharmacy?",
      a: "No. You bring licensed clinicians, or a clinical group you contract, and the pharmacy partner you choose. We build the software that connects them to your patients and we integrate the prescription route your prescribers decide to use. We never prescribe or dispense, and we do not make clinical decisions.",
    },
    {
      q: "Why build custom instead of using an off-the-shelf telehealth tool?",
      a: "Off-the-shelf tools are a good fit when your model matches their defaults, such as general primary care at small volume. Custom software earns its cost when you have your own eligibility rules, subscription logic or reporting needs, or when you want one record across intake, visits and billing instead of five tools stitched together. We will tell you honestly if an existing product fits.",
    },
    {
      q: "Can patients have video visits and secure messaging?",
      a: "Yes. We integrate video or audio visits and messaging through vendors that sign a business associate agreement, so a visit link is not just a general-purpose meeting room. Some programs also use asynchronous care, where a patient submits an intake and a clinician reviews it later. We design the workflow around the visit types your licensed clinicians actually use.",
    },
    {
      q: "Where is patient data stored, and who owns it?",
      a: "In your own hosting accounts, under your agreements. We set the accounts up with you, so the data and the contracts are yours and you are not locked to us. The contact form on this website does not store enquiries in a database, and it asks you not to send health information through it.",
    },
    {
      q: "How does payment processing work for telehealth?",
      a: "Telehealth often combines recurring billing, higher ticket sizes and, in many models, prescriptions, so payment providers review it as elevated risk. We prepare the site, policies and billing flow for that review and integrate a provider that underwrites your category. Approval and pricing are the bank's decision, and we cannot promise either. See our payment processing service for how that work runs.",
    },
    {
      q: "Can I run an RUO peptide store and a telehealth platform together?",
      a: "They are different businesses and we keep them apart. Research-use-only products are not for human use and are never part of a clinical offering. Shared infrastructure, such as hosting and reporting, can serve both, but each line has its own notices, policies and payment setup. Ask your counsel to review how the two are presented before you launch either.",
    },
    {
      q: "How long does a build take and what does it cost?",
      a: "It depends on the number of visit types, integrations and states. We scope after a discovery call and often recommend a first release with the essentials, such as intake, visits, messaging and billing, then add features as real use shows what matters. Your proposal itemizes scope, timeline and anything billed by a third party.",
    },
    {
      q: "What happens after launch?",
      a: "Telehealth software needs care. We offer maintenance that covers updates, monitoring, backups, security patches and changes as your services, partners or rules change. We also keep the documentation current, so your compliance adviser always has an accurate picture of how the data flows.",
    },
  ],
  related: ["payment-processing", "ruo-peptide-website-development", "business-dashboards", "compliance-support"],
  caseStudies: [],
  articles: ["meta-health-and-wellness-restrictions"],
  cta: { label: "Scope a telehealth build" },
};
