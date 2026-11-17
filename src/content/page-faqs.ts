import { siteConfig } from "@/config/site";
import type { Faq } from "./types";

const brand = siteConfig.name;

/** Questions for the hub and company pages. Service pages and guides carry their own. */
export const servicesFaqs: Faq[] = [
  {
    q: "Do I have to buy all thirteen services?",
    a: "No. Most engagements start with one system, such as payments, a rebuilt store or reporting. Tell us what you need through the questionnaire and the first conversation decides the scope. Because the systems depend on each other, we will say plainly where a fix in one area relies on another.",
  },
  {
    q: "I am launching a new business. Where should I start?",
    a: "With the parts that everything else repeats: the business identity, the supplier documentation standard and the structure of the catalogue. Then the site, then the payment application prepared from the finished site, then fulfillment, reporting and growth. The guide called the infrastructure behind an RUO peptide business sets out the order in full.",
  },
  {
    q: "Which service fixes payments that keep getting limited?",
    a: "Payment processing is the starting point, but the cause is often elsewhere: a site that does not match the application, content that points toward personal use, or documents that do not agree. We begin by comparing the application, the site and your records, then fix what we find, whichever service it belongs to.",
  },
  {
    q: "How do the services fit together?",
    a: "They fall into four groups: build, run, grow and verify. The website holds the catalogue, payments take the money, fulfillment and support deliver and answer, dashboards show whether it is working, and the growth and verification services bring customers in and keep risks visible. The same facts, such as product names, batches and notices, must agree across all of them, which is why one team covering them reduces handover problems.",
  },
  {
    q: `Does ${brand} also provide peptides?`,
    a: `${brand} does not sell to consumers. Its wholesale supply, fulfillment, dropshipping and 3PL services are for business customers. Research-use-only products are labelled for laboratory research use only and are not for human or veterinary use. Tell us what you are looking for through the questionnaire and we will reply directly.`,
  },
  {
    q: "What does it cost?",
    a: "We do not publish fixed prices, because scope depends on what you already have and what you need. After the questionnaire we reply directly, and the first conversation covers scope and fees before anything is agreed.",
  },
];

export const caseStudiesFaqs: Faq[] = [
  {
    q: "Why do only some of the sites have a full case study?",
    a: "A case study appears only when its facts have been confirmed. The other projects show what we can verify from the live site, with the date it was captured, and gain a case study when the material has been confirmed.",
  },
  {
    q: "Are the numbers on these pages real?",
    a: "Counts such as product totals come from each site's sitemap on the capture date, and they change as the stores change. We do not publish results we cannot verify, and we do not show revenue, traffic or conversion figures unless they have been confirmed.",
  },
  {
    q: "Can I visit the live sites?",
    a: "Yes. Every project links to its live site, which opens in a new tab. The sites are run by their owners, who are responsible for their content.",
  },
  {
    q: "Can you build something like these for my business?",
    a: "Yes, but we start from your catalogue, your suppliers and your payment position rather than from a template. These projects show the kinds of structure we use. They are not designs to copy, and every project begins with the questionnaire.",
  },
  {
    q: "What should I look at when judging how well a store is built?",
    a: "Look past the visuals. Check whether categories have their own pages, whether each product has a single address, whether batch documents open and match the product, whether notices are consistent and how fast pages load on a phone. These structural points decide how a store holds up as it grows.",
  },
];

export const resourcesFaqs: Faq[] = [
  {
    q: "Is any of this legal advice?",
    a: "No. The guides are general information, and rules and enforcement change. Regulatory statements carry dates and primary sources, and we say when something has not been verified. Speak to qualified counsel about your own situation.",
  },
  {
    q: "How do you choose and check your sources?",
    a: "We prefer primary sources: statutes, regulations, agency documents and provider policies. Each guide lists its sources with the date we checked them, and where a claim comes from secondary reporting we say so.",
  },
  {
    q: "How up to date are the guides?",
    a: "Each guide shows when it was last updated. Rules, provider policies and enforcement change, so treat a guide as a starting point and confirm the current position before you act on it.",
  },
  {
    q: "Which guide should I read first?",
    a: "If you are launching or auditing, begin with the infrastructure map, which shows how the systems fit together. If payments are the pressing problem, read the payment processing guide. If you are choosing a supplier, read the supplier documentation checklist.",
  },
  {
    q: "Can I suggest a topic?",
    a: "Yes. Tell us what you are trying to solve through the contact page. The questions we hear most often are the ones that become guides.",
  },
];

export const aboutFaqs: Faq[] = [
  {
    q: "Are you a law firm, and does your review make us compliant?",
    a: "We are not a law firm and we do not give legal advice. A review helps you find and organise avoidable risk. It is not an approval, and it does not make a business compliant. We work alongside your own qualified counsel.",
  },
  {
    q: "What do you decline to do?",
    a: "We do not write dosing, usage or outcome content, we do not promise approvals, rankings or results, and we do not help with misrepresenting products, hiding business activities or getting around a provider's review. If a request needs any of those, we will say so and explain what we can do instead.",
  },
  {
    q: "How do I know your claims are true?",
    a: "We show live sites you can open, dated sources and documents. If we cannot show it, we do not claim it. Where a statement depends on a third party, such as a provider's policy, we link to it and say when we checked.",
  },
  {
    q: `Does ${brand} also provide peptides?`,
    a: `${brand} does not sell to consumers. Its wholesale supply, fulfillment, dropshipping and 3PL services are for business customers. Research-use-only products are labelled for laboratory research use only and are not for human or veterinary use. Tell us what you are looking for through the questionnaire and we will reply directly.`,
  },
  {
    q: "What happens to what I send you?",
    a: "We use it to reply to your enquiry. Enquiries are delivered by email, are not stored in a database on the site, and are kept for up to 24 months unless we start working together. The Privacy Policy has the detail.",
  },
];

export const contactFaqs: Faq[] = [
  {
    q: "What happens after I send the questionnaire?",
    a: "We read every answer and reply to you directly by email, or by phone if you gave a number. The first conversation covers what you need and what you already have, and decides the scope.",
  },
  {
    q: "I do not have a website yet. Can I still get in touch?",
    a: "Yes. A website address is never required. Choose that you are launching something new, and tell us where you are.",
  },
  {
    q: "I am not sure which service I need. What should I choose?",
    a: "Choose the situation that sounds closest, or the one that says you have a specific problem, and describe it in your own words. We will tell you which parts of the business it touches and where to start.",
  },
  {
    q: "What should I leave out of the form?",
    a: "Please do not include payment card details, passwords or personal health information. The questionnaire does not need them, and we do not want them.",
  },
  {
    q: "Is my information shared with anyone?",
    a: "Only with the providers that run the site and deliver your enquiry, as set out in the Privacy Policy. We do not sell it, and we do not add you to a mailing list because you wrote to us.",
  },
];
