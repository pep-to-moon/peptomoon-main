import { siteConfig } from "@/config/site";
import type { Article } from "../types";
import { callout, h2, h3, ol, p, table, ul } from "./helpers";

const brand = siteConfig.name;

export const ruoLabel: Article = {
  slug: "ruo-label-is-not-a-compliance-strategy",
  title: "Why a research use only label is not a compliance strategy",
  seo: {
    title: `Is an RUO Label a Compliance Strategy? | ${brand}`,
    description:
      "A research-use-only disclaimer does not decide how a product is regulated. What intended use means, what FDA letters describe and how to review your own site.",
  },
  primaryKeyword: "research use only label compliance",
  excerpt:
    "Many businesses treat the words 'for research use only' as a shield. Regulators look at the whole presentation. Here is what that means and how to review your own site.",
  topic: "Industry Compliance",
  published: "2026-11-17",
  updated: "2026-11-17",
  service: "compliance-support",
  related: ["503a-503b-and-ruo-retail", "infrastructure-behind-an-ruo-peptide-business"],
  needsCounselReview: true,
  quickAnswer:
    "A research-use-only label states an intended use, and it is one piece of evidence about that use. FDA's regulation on intended use says that intent is judged from the objective facts around the product, including labelling, advertising, statements by the people responsible and the circumstances of distribution. So the whole presentation matters, not the label alone. The practical step is to review everything you publish for content that points toward personal use, record what you found and take the findings to qualified counsel.",
  takeaways: [
    "A label is evidence of intended use, and not the only evidence. Websites, emails, social posts, affiliate content and customer conversations count too.",
    "Warning letters to peptide sellers have pointed to the surrounding presentation, such as dosing or preparation guidance, as evidence of intended use.",
    "Inconsistency is a risk by itself. A notice on one page and consumer-style copy on another tells a reader which one is the real position.",
    "Review everything you publish, record the findings with page references, and bring them to qualified counsel. A review is not an approval.",
    "Never respond to a problem by hiding content from reviewers or by adding disclaimers to cover content that should change.",
  ],
  blocks: [
    p("Many businesses treat the words 'for research use only' as a shield. If the label is there, the thinking goes, the product is a research chemical, and what happens afterwards is the buyer's business. Regulators do not read it that way. This guide explains why a label is one piece of evidence rather than a conclusion, what to look for on your own website, and why the right next step is a conversation with qualified counsel."),
    callout("General information, not legal advice", "This article does not advise on your situation. Rules and enforcement change, so check the sources and the review date, and speak to qualified counsel."),
    h2("What a label can and cannot do"),
    p("A label states an intended use. FDA's regulation on intended use, [21 CFR 201.128](https://www.ecfr.gov/current/title-21/section-201.128), says that intended use is judged by the objective intent of the people responsible for the labelling, and that this intent can be shown by labelling claims, advertising, statements by those people or their representatives, and the circumstances surrounding distribution. In plain terms, the label is evidence, and it is not the only evidence."),
    p("The consequence is simple to state and hard to act on. A label that says 'for research use only' sits next to everything else the business says and does. If the rest points in the same direction, the label is consistent with it. If the rest points somewhere else, the label is the odd one out, and a reader will weigh it accordingly. A label cannot change what the surrounding material shows."),
    h2("Everything is part of the presentation"),
    p("Intent is read from the whole picture. It helps to list the places where a business creates evidence, because most owners think of the product page and forget the rest."),
    table(
      "Where evidence of intended use can appear",
      ["Where", "Examples", "Often overlooked because"],
      ["Product labels and packaging", "Label wording, inserts, outer boxes.", "They were designed once and not revisited."],
      ["Website pages", "Product descriptions, FAQs, blog posts, banners, calculators.", "Blog and FAQ pages are written by different people at different times."],
      ["Email and messaging", "Newsletters, order emails, automated sequences, replies from support.", "They are not on the site, so they are not reviewed with it."],
      ["Social media and video", "Posts, captions, comments you reply to, shared content.", "Replies and reposts feel casual."],
      ["Affiliates and partners", "Content written by people promoting you.", "It is not under your direct control, yet it promotes your products."],
      ["Customer conversations", "Chat, email and phone answers to questions about use.", "Each person improvises unless a standard answer exists."],
      ["What else you sell", "Supplies, accessories and bundles that point to a use.", "They look like separate merchandising decisions."],
    ),
    h2("What the warning letters describe"),
    p("FDA has issued warning letters to peptide sellers whose products carried research-use-only wording, for example [this letter of 10 December 2024](https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/summit-research-peptides-695607-12102024). Published commentary on letters issued in 2025 and 2026 describes the agency pointing to the surrounding presentation as evidence of intended use, including dosing or reconstitution guidance, supplies for preparing solutions, calculators and marketing that implies personal use."),
    p("We have not independently verified every letter or every claim in that commentary. Read the agency's own letters and ask your counsel how they apply to your situation. The value of reading them yourself is that the examples are specific: you can see which kinds of statement and which surrounding materials the agency chose to cite, and compare them with your own pages."),
    h2("Signals worth reviewing on your own site"),
    p("These are common review points. Whether any of them is a problem for your business is a question for your counsel, and the same item can look different in different circumstances. The table groups them and says why each deserves a second look."),
    table(
      "Review points and why they matter",
      ["Signal", "Why it deserves a look", "A useful question for counsel"],
      ["Dosing, schedule or administration language", "It describes a use, wherever it appears, including blog posts, FAQs and emails.", "Which statements, if any, can remain?"],
      ["Reconstitution or preparation instructions", "They describe preparing a product for a use.", "Is this content consistent with a research position?"],
      ["Tools such as calculators", "A tool built around personal use can show the intended use.", "Should this tool exist on the site?"],
      ["Testimonials and reviews describing effects", "They show what customers are doing and what you are publishing.", "How should reviews be moderated?"],
      ["Consumer-oriented imagery and copy", "Tone and imagery show the audience you are addressing.", "Does the presentation match a laboratory audience?"],
      ["Supporting products that point toward personal use", "What you sell alongside can imply what the product is for.", "Which items in the range raise questions?"],
      ["Claims about outcomes or benefits", "They describe effects on people.", "What may be said about a research product at all?"],
      ["Inconsistent statements across channels", "Differences show which message is the real one.", "How do we keep every channel aligned?"],
    ),
    h2("Inconsistency is a signal in itself"),
    p("A common pattern is a site that carries a careful research-use notice and a set of social posts, emails or affiliate pages that say something quite different. The notice does not cancel the posts. A reader, whether a regulator, a payment reviewer or a platform moderator, takes the whole set together, and the most informal item often reads as the most honest. If a business tells a different story in different places, the story it tells to customers tends to be taken as the real one."),
    p("That is why a review has to cover every channel and not just the website, and why a notice in the footer cannot offset what the rest of a site says. Reviewers look at the whole presentation."),
    h2("Other readers of your presentation"),
    p("Regulators are not the only audience. Payment providers, advertising platforms, hosting companies and marketplaces each read how a business presents itself, and each applies its own policy. A presentation that is acceptable to one may not be to another, and their policies are not the same as the law. Content that raises questions for a regulator will often raise them for a provider too, so reviewing it for one reader helps with the others. Our guide to [payment processing for RUO stores](/resources/payment-processing-for-ruo-stores) describes what payment reviewers read."),
    h2("How to review your own presentation"),
    p("A review is a method, not a feeling. The point is to find what is out there, assess it against a consistent list and record what you decide. This is a workable sequence."),
    ol(
      "Inventory every page, email template, social profile and affiliate asset, with its address and owner.",
      "Review each item against the signals above and record findings with page references.",
      "Rate each finding by how clearly it points away from the research-use position, so the most serious are dealt with first.",
      "With counsel's input, remove or rewrite content that points toward personal use.",
      "Make notices consistent and place them where they apply, generated by the template rather than typed by hand.",
      "Brief everyone who writes for the business, including support staff and affiliates, and give them written guidelines.",
      "Document what you reviewed and when, and schedule a repeat review.",
      "Bring the findings and the changes to qualified counsel.",
    ),
    h3("Keep the record"),
    p("The record is as valuable as the changes. It shows what you looked at, when you looked and what you decided. Keep it in a simple form: a spreadsheet of items, findings, owners, decisions and dates is enough. If a question ever arises, being able to show that you reviewed your presentation and acted on what you found is far better than having no record."),
    h2("What not to do"),
    ul(
      "Do not respond to a finding by hiding content from reviewers or search engines. Show the same site to everyone.",
      "Do not add a disclaimer to cover content that should change. A notice cannot offset the content next to it.",
      "Do not rely on a template or a competitor's wording because it appears common. Common is not the same as acceptable.",
      "Do not leave affiliates and resellers to write their own claims.",
      "Do not treat a review, including ours, as an approval. It finds things to fix. It does not certify anything.",
    ),
    callout("What a review is and is not", "A content review looks for avoidable risk and helps you organise what you have. It is not legal advice, an approval, a certification or a guarantee that a regulator, provider or platform will agree with your position."),
    h2("Working well with counsel"),
    p("Questions about your own legal position belong with a qualified lawyer who understands this area. You will get more from that conversation if you arrive prepared. Bring the inventory, the findings with page references, the changes you propose and the questions you cannot answer yourself."),
    ul(
      "Which of our current statements, tools or products raise questions, and why?",
      "What should our standard answer to customer questions about use say?",
      "What should our affiliate and advertiser guidelines include?",
      "How should we handle reviews and user-generated content?",
      "How often should we repeat the review, and what should trigger an earlier one?",
    ),
    p("This is the work our [compliance support service](/services/compliance-support) organises. We are not a law firm, and a review is not an approval. For a related topic that is often misunderstood, read [503A and 503B explained](/resources/503a-503b-and-ruo-retail)."),
  ],
  faqs: [
    {
      q: "Does a research-use-only label protect my business?",
      a: "It is one piece of evidence about what a product is intended for, and it is not a protection by itself. FDA's regulation on intended use looks at labelling, advertising, statements by the people responsible and the circumstances of distribution. The label is more helpful when the rest of the presentation is consistent with it and less helpful when the rest points elsewhere. Ask counsel how this applies to you.",
    },
    {
      q: "Is a disclaimer in the footer enough?",
      a: "A disclaimer is a good practice, and it cannot offset what the rest of the site says. If product pages, blog posts or emails describe personal use, a footer notice does not change that. Consistency across the whole presentation matters more than the wording of any single notice.",
    },
    {
      q: "Can I keep blog posts that discuss published research?",
      a: "That is a question for your counsel, because it depends on what the posts say and how they are presented. A post that summarises a study and cites its source is different from one that tells readers how to use a product. Review every post against the signals in this guide and ask counsel which, if any, should change.",
    },
    {
      q: "What about customer reviews and testimonials?",
      a: "Reviews that describe personal effects can show what customers are doing and what you are publishing. Decide with your counsel how reviews will be moderated, whether they will be shown at all, and how you will handle the ones that describe use. Do not edit reviews to change their meaning.",
    },
    {
      q: "Am I responsible for what my affiliates write?",
      a: "That depends on the facts and on the law that applies to you, and it is a question for counsel. In practice, content that promotes your products is part of how they are presented, so give affiliates written guidelines, review what they publish and act when something falls outside the guidelines.",
    },
    {
      q: "How often should I review my content?",
      a: "Do a full review once, then repeat it on a schedule, for example twice a year, and whenever something changes: a new product line, a new channel, a new affiliate programme or a change in the rules you operate under. Keep the record of each review so you can show what was checked and when.",
    },
  ],
  sources: [
    { label: "eCFR: 21 CFR 201.128, meaning of intended use", url: "https://www.ecfr.gov/current/title-21/section-201.128", checked: "2026-11-17" },
    {
      label: "FDA warning letter to Summit Research Peptides, 10 December 2024",
      url: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/summit-research-peptides-695607-12102024",
      checked: "2026-11-17",
    },
  ],
};
