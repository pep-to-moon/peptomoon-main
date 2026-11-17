import { siteConfig } from "@/config/site";

export type LegalTable = { caption: string; head: string[]; rows: string[][] };
export type LegalSection = { heading: string; paragraphs?: string[]; list?: string[]; table?: LegalTable };
export type LegalDoc = {
  slug: "privacy-policy" | "terms-of-service" | "disclaimer" | "cookie-policy" | "editorial-policy";
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const brand = siteConfig.name;
const entity = siteConfig.legalName;
const email = siteConfig.contact.email;
/** How visitors reach us: the address when one is configured, otherwise the contact page. */
const reach = email ? `writing to ${email}` : "using the contact page";
const reachShort = email ? `${email} or the contact page` : "the contact page";

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: `How ${brand} collects, uses, shares and protects information from this website, including the project questionnaire, and the choices you have.`,
    updated: "2026-11-17",
    intro: `This policy explains what personal information ${entity} ("${brand}", "we", "us") collects through this website, why we collect it, who it is shared with, how long we keep it and what you can do about it. We have tried to keep it short and specific to what this site actually does.`,
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          `${brand} is operated by ${entity}. This policy covers the ${brand} website and the project questionnaire on it. It does not cover the websites of our clients, which are run by their owners under their own policies. You can reach us at ${reachShort} for anything in this policy.`,
        ],
      },
      {
        heading: "What we collect",
        paragraphs: ["We collect only what we need to respond to you and to run a secure website."],
        list: [
          "Details you submit in the project questionnaire: the service or situation you choose, your name, your email address and your consent. If you add them, we also receive your business name, phone number, website address and the written details you give about your needs.",
          "Technical information that reaches our servers whenever a page or form is requested, such as your IP address, browser type and the time of the request. We use it to deliver the site, to rate-limit abuse and to keep the site secure.",
          "Your answer to a simple arithmetic question on the questionnaire. We use it only to tell people from automated spam, and we do not keep it.",
          "Analytics information about how pages are used, but only if analytics is switched on for this site and you accept analytics cookies.",
        ],
      },
      {
        heading: "What we do not collect",
        paragraphs: [
          "We do not ask for payment card details, government identification or health information on this site, and the questionnaire does not need them. Please do not put them in free-text fields. We do not build advertising profiles of visitors and we do not sell personal information.",
        ],
      },
      {
        heading: "How we use it, and why",
        table: {
          caption: "Purposes and the reason each is allowed",
          head: ["Purpose", "What it involves", "Basis"],
          rows: [
            ["Replying to your enquiry", "Sending you an automatic confirmation that we have it, reading your questionnaire, and answering by email, or by phone if you gave a number.", "Taking steps you asked for before any agreement, and our legitimate interest in running our business."],
            ["Security and abuse prevention", "Spam checks, rate limits and server logs.", "Our legitimate interest in keeping the site and its forms working."],
            ["Improving the site", "Seeing which pages are used, only after you accept analytics.", "Your consent, which you can withdraw at any time."],
            ["Meeting legal duties", "Responding to lawful requests and keeping records the law requires.", "Legal obligation."],
          ],
        },
        paragraphs: [
          "We do not use what you send us for marketing to third parties, and we do not add you to a mailing list because you completed the questionnaire.",
        ],
      },
      {
        heading: "Who handles it for us",
        paragraphs: [
          "We use a small number of service providers to run the site and process enquiries. They handle information on our instructions and for no purpose of their own, except where noted.",
        ],
        list: [
          "A hosting and delivery provider that serves the website and holds standard server logs.",
          "An email delivery provider that carries your questionnaire from the site to our inbox. Your enquiry is delivered by email. The site does not keep enquiries in its own database.",
          "Google, which provides Google Analytics, only if analytics is configured and you accept it.",
        ],
      },
      {
        heading: "Sharing and transfers",
        paragraphs: [
          "Apart from the providers above, we share personal information only where the law requires it, to protect our rights or the safety of others, or with your instruction. If we are ever involved in a sale or restructuring of the business, information may be transferred to the new owner, who would be bound by this policy.",
          "Our providers operate in several countries, including the United States. Where information is transferred out of the country where you live, we rely on the safeguards our providers offer, such as standard contractual clauses where those apply.",
        ],
      },
      {
        heading: "How long we keep it",
        table: {
          caption: "Retention periods",
          head: ["Information", "How long"],
          rows: [
            ["Questionnaire submissions and our replies", "Up to 24 months after the last contact, unless we begin working together. Then the retention terms of our written agreement apply."],
            ["Server and security logs", "Kept by our hosting provider for a short rolling period, then deleted."],
            ["Analytics data", "Kept by Google Analytics for the retention period configured on our account, then deleted."],
            ["Your cookie choice", "Stored in your browser until you change it or clear your browser data. We never receive it."],
          ],
        },
      },
      {
        heading: "Your choices and rights",
        paragraphs: [
          `Depending on where you live, you may have the right to ask what personal information we hold about you, to have it corrected or deleted, to receive a copy, to object to or restrict certain uses, and to withdraw consent you gave earlier. To use any of these rights, contact us by ${reach}. We may need to confirm it is you before acting, and we will answer within the period the law gives us, normally 30 days.`,
          "You can change your analytics choice at any time from the Cookie Policy page. If you are in the European Economic Area, the United Kingdom or Switzerland, you can also complain to your local data protection authority. If you live in a US state with a consumer privacy law, you can ask us to confirm that we do not sell your information or share it for cross-context behavioural advertising, and we do not.",
        ],
      },
      {
        heading: "Security",
        paragraphs: [
          "The site is served over an encrypted connection, enquiries are delivered by email through an authenticated provider, and we do not log the contents of your questionnaire on our servers. We use reasonable technical and organisational measures to protect information, but no system is perfectly secure, and we cannot guarantee that information sent over the internet will never be intercepted.",
        ],
      },
      {
        heading: "Who this site is for",
        paragraphs: [
          "This site is written for businesses and is not directed at anyone under 18. If you believe a child has sent us personal information, contact us and we will delete it.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          "We update this policy when the way the site handles information changes. The date at the top shows when it was last revised, and earlier versions are not kept on the site. If a change is significant we will say so on this page.",
        ],
      },
    ],
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    description: `The terms that apply when you use the ${brand} website, and how they relate to the services we provide to clients under a separate written agreement.`,
    updated: "2026-11-17",
    intro: `These terms apply to your use of the ${brand} website, which is operated by ${entity}. By using the site you agree to them. If you do not agree, please do not use the site. Services we provide to clients are governed by a separate written agreement, described below.`,
    sections: [
      {
        heading: "What this site is",
        paragraphs: [
          `The site describes the services ${brand} provides to businesses in the research-use-only (RUO) peptide industry, shows examples of work, publishes guides, and lets you send us an enquiry. Pages on the site describe our services in general terms. They are not an offer and do not create a contract by themselves.`,
        ],
      },
      {
        heading: "Services under a written agreement",
        paragraphs: [
          "When we work together, scope, deliverables, fees, timelines, ownership and responsibilities are set out in a written agreement that both sides sign or accept. If that agreement conflicts with these terms, the agreement prevails for the services it covers. Completing the questionnaire does not oblige either of us to enter into an agreement, and we may decline an enquiry for any reason.",
        ],
      },
      {
        heading: "Research-use-only products",
        paragraphs: [
          "Where we supply research-use-only products to business customers, they are labelled for laboratory research use only and are not for human or veterinary use. Availability and the terms of supply are confirmed with you when an order is agreed. Nothing on this site is guidance about using any product.",
        ],
      },
      {
        heading: "No legal, regulatory or financial advice",
        paragraphs: [
          `${brand} is not a law firm, regulator, payment provider or financial adviser. Guides, service descriptions and reviews are general information and may be out of date, because rules and enforcement change. Nothing on this site is legal, regulatory, tax or financial advice. Speak to qualified professionals about your own situation.`,
        ],
      },
      {
        heading: "Your responsibility for your own business",
        paragraphs: [
          "If you run an RUO peptide business, you are responsible for what you sell, how you describe it, the claims you make and your compliance with the laws and the provider rules that apply to you. Our services support your work. They do not transfer those responsibilities to us, and a review is not an approval.",
        ],
      },
      {
        heading: "No guarantees",
        paragraphs: [
          "We do not guarantee merchant approval, uninterrupted payment processing, search rankings, advertising approval, regulatory outcomes, supplier performance or business results. Third parties such as payment providers, ad platforms and search engines make their own decisions.",
        ],
      },
      {
        heading: "Acceptable use",
        paragraphs: ["When you use the site, you agree not to:"],
        list: [
          "misuse the site, attempt to disrupt it or probe it for vulnerabilities;",
          "submit false, misleading or abusive information through the questionnaire;",
          "use automated tools to submit forms, scrape content at scale or overload the site;",
          "use the site to ask for help with misrepresenting products, hiding business activities or bypassing a provider's underwriting. We will not help with those requests.",
        ],
      },
      {
        heading: "Content and intellectual property",
        paragraphs: [
          `The text, design, graphics and code of this site belong to ${entity} or its licensors and are protected by intellectual property law. You may view the site and share links to it. You may not copy, republish or reuse its content or design without written permission.`,
          "Screenshots and descriptions of client websites are shown to illustrate work we have done. Those sites, their products, names and content belong to their owners, and their appearance here does not imply endorsement by anyone other than the owner who agreed to be shown.",
        ],
      },
      {
        heading: "Links to other sites",
        paragraphs: [
          "The site links to websites we do not control, including client websites and the sources we cite. We are not responsible for their content, availability or practices, and a link is not an endorsement.",
        ],
      },
      {
        heading: "Availability and changes to the site",
        paragraphs: [
          "We aim to keep the site available and accurate, but it is provided as it is and as available. We may change, suspend or remove any part of it at any time without notice.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          `To the fullest extent the law allows, the site and its content are provided without warranties of any kind, and ${entity} is not liable for indirect, incidental or consequential loss, or for loss of profit, revenue, data or goodwill, arising from your use of the site or reliance on its content. Nothing in these terms limits liability that cannot be limited by law, such as liability for fraud.`,
        ],
      },
      {
        heading: "Changes to these terms",
        paragraphs: [
          "We may revise these terms. The date at the top shows when they last changed, and continued use of the site after a change means you accept the revised terms.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          `These terms are governed by the laws of the jurisdiction in which ${entity} is established, without regard to conflict-of-law rules. Courts in that jurisdiction have exclusive authority over disputes about the site, unless the law gives you the right to bring a claim elsewhere.`,
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`Questions about these terms can be sent to ${reachShort}.`],
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    description: `Limits on what the ${brand} website and its content are, including research-use-only products, legal information and portfolio examples.`,
    updated: "2026-11-17",
    intro: `Please read this disclaimer together with the Terms of Service. It explains the limits of the information on this site and who is responsible for what.`,
    sections: [
      {
        heading: "What we provide",
        paragraphs: [
          `${brand} provides services to businesses in the research-use-only peptide industry, including wholesale supply, fulfillment, dropshipping and 3PL. Information on this site describes those services in general terms and is not guidance about using any product.`,
        ],
      },
      {
        heading: "Research use only",
        paragraphs: [
          "Research products referred to on this site, whether offered by us or by our clients, are labelled for laboratory research use only and are not for human or veterinary use. They are not medicines, foods, dietary supplements or cosmetics, and they are not intended to diagnose, treat, cure or prevent any disease. We do not write or approve dosing, usage or outcome claims.",
        ],
      },
      {
        heading: "Not legal, regulatory or medical advice",
        paragraphs: [
          "Articles, guides and service descriptions are general information. They are not legal, regulatory, tax, financial or medical advice, and reading them does not create an adviser relationship. A research-use-only label does not make a product, business or marketing activity compliant. Sections 503A and 503B of the Federal Food, Drug, and Cosmetic Act concern licensed pharmacy compounding and outsourcing facilities, and we do not suggest an ordinary RUO retailer qualifies for them. Rules and enforcement change, so statements here may be out of date. Always speak to qualified counsel about your own situation.",
        ],
      },
      {
        heading: "Your own compliance",
        paragraphs: [
          "If you run a business, you are responsible for your products, your claims and your compliance. Our reviews look for avoidable risk and help you organise what you have. They are not an approval, a certification or a guarantee that a provider, platform or authority will agree.",
        ],
      },
      {
        heading: "Portfolio information",
        paragraphs: [
          "Descriptions, counts and screenshots of client websites reflect those sites on the dates shown. The sites are operated by their owners, who are responsible for their content, and the numbers can change as their stores change. We do not publish results we cannot verify, and a case study appears only when its material has been confirmed.",
        ],
      },
      {
        heading: "No guarantees",
        paragraphs: [
          "We make no promise about merchant approvals, payment continuity, rankings, advertising acceptance, supplier performance or business results. Outcomes depend on decisions made by third parties and on how a business is run.",
        ],
      },
      {
        heading: "Third-party names and links",
        paragraphs: [
          "Names, logos and products of other businesses shown or linked on this site belong to their owners. They appear to describe our work or to cite a source, and they do not imply that those businesses endorse us or the content of this site.",
        ],
      },
      {
        heading: "Accuracy",
        paragraphs: [
          "We take care to keep information accurate and to date the statements we make, but we cannot promise that everything is complete or current. If you find something that looks wrong, tell us through the contact page and we will check it.",
        ],
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    description: `How ${brand} uses cookies and similar browser storage, what each one is for, how long it lasts and how to change your choice at any time.`,
    updated: "2026-11-17",
    intro: `This policy explains the cookies and similar storage used on this website, what each is for, and how you control them. Cookies are small files, and similar technologies such as local storage work in the same way, that a website places in your browser.`,
    sections: [
      {
        heading: "What this site uses",
        table: {
          caption: "Cookies and browser storage on this site",
          head: ["Name or source", "Purpose", "Type", "How long"],
          rows: [
            ["pm-consent (local storage)", "Remembers whether you accepted or declined analytics, so we do not ask on every visit. It never leaves your browser.", "Essential", "Until you change it or clear your browser data"],
            ["_ga and _ga_ followed by an identifier (Google Analytics)", "Distinguish visitors and count page views so we can see which pages are useful. Loaded only if you accept analytics.", "Analytics, optional", "Up to two years"],
          ],
        },
        paragraphs: [
          "We do not use advertising cookies, and we do not use cookies to follow you across other websites.",
        ],
      },
      {
        heading: "Your choice",
        paragraphs: [
          "Analytics is off by default. If analytics is configured for this site, a banner asks for your choice, and nothing from Google Analytics is loaded until you accept. If analytics is not configured, no banner appears because there is nothing to choose. Declining analytics does not change what you can do on the site.",
          "You can change your mind at any time using the control below. Choosing again removes your saved choice and shows the banner on your next page.",
        ],
      },
      {
        heading: "Essential storage",
        paragraphs: [
          "Essential storage is needed for the site to remember your choice and keep the questionnaire working. It does not track you across sites, so it does not need your consent. If you block it in your browser, the banner may appear again on each visit.",
        ],
      },
      {
        heading: "Browser controls",
        paragraphs: [
          "Most browsers let you see, block and delete cookies and local storage, and some let you send a signal asking sites not to track you. The steps differ by browser, and your browser's help pages explain them. Blocking essential storage may stop parts of the site from working as intended.",
        ],
      },
      {
        heading: "More about how we handle information",
        paragraphs: [
          "The Privacy Policy explains what personal information we collect through the site, who receives it and the rights you have over it.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          "We update this policy when the cookies or storage on the site change. The date at the top shows when it was last revised.",
        ],
      },
    ],
  },
  {
    slug: "editorial-policy",
    title: "Editorial Policy",
    description: `How ${brand} researches, verifies, dates and corrects its guides, case studies and page content, and what it will not publish.`,
    updated: "2026-11-17",
    intro: `This page explains how ${brand} researches, writes, checks and corrects what it publishes: the guides, case studies, service pages and portfolio facts on this site. It exists so you can see the standard we hold ourselves to and tell us when we miss it.`,
    sections: [
      {
        heading: "Who writes what we publish",
        paragraphs: [
          `Guides and pages are written by the ${brand} team and published under the team's name rather than individual bylines. We do not attach a person's name or credentials to a piece unless that person wrote or reviewed it and agreed to be named.`,
          "The team builds and runs research-use-only e-commerce sites, so we write from operating experience. Experience is not a substitute for sources. Any claim about a rule, a platform policy or a regulation cites a source and the date we checked it.",
        ],
      },
      {
        heading: "How we verify claims",
        paragraphs: ["Different kinds of claim get different checks. If a claim fails its check, it is left out or labelled as unconfirmed."],
        table: {
          caption: "What we check for each kind of claim and what happens if it cannot be verified",
          head: ["Kind of claim", "What we check", "If we cannot verify it"],
          rows: [
            ["Rules and regulation", "A primary source, such as the regulator, the statute or the text of the policy, with the date we checked it.", "We say it is unconfirmed, or leave it out."],
            ["Platform and processor policies", "The provider's current published policy, read on the date shown in the sources list.", "We describe the general pattern and tell you to read the current policy."],
            ["Case study facts", "Each fact is confirmed against the live site or a record and carries a confirmation date.", "The fact is not shown."],
            ["Figures and statistics", "The original source of the number.", "We do not use the number."],
            ["Product and scientific statements", "Kept to what a supplier document shows. We do not make claims about use, dosing or outcomes.", "Left out."],
            ["Claims about our own work", "Something you can look at: a live site, a dated document or a stated limit.", "We remove the claim."],
          ],
        },
      },
      {
        heading: "Sources and how we use them",
        list: [
          "Primary sources come first: regulators, statutes, official policy pages and the documents themselves.",
          "Vendor pages, affiliate content and forum posts are treated as marketing or opinion. We do not rely on one for a factual claim.",
          "Each guide ends with a sources list showing the date we last checked each link.",
          "We link to sources instead of copying them.",
        ],
      },
      {
        heading: "Dates and updates",
        paragraphs: [
          "Every guide shows when it was last updated. We revisit a guide when the rules or platforms it describes change, and we change its date only when its content changes.",
        ],
      },
      {
        heading: "Legal and regulatory review",
        paragraphs: [
          `Guides that discuss regulation are flagged for review by qualified counsel and are held back from the live site until that review is recorded. A review of our content is not legal advice to you, and ${brand} is not a law firm.`,
        ],
      },
      {
        heading: "Corrections",
        paragraphs: [
          `If something we publish is wrong or out of date, tell us by ${reachShort}. We check the report against the source and correct the page. When a change affects what a reader would do, we add a dated note to the page. We aim to reply within five business days. We do not quietly change figures that readers may have relied on.`,
        ],
      },
      {
        heading: "Commercial relationships",
        paragraphs: [
          `${brand} sells services to research-use-only peptide businesses. A guide may point to a service we offer, and when it does, it links to that service page so the connection is visible. We do not accept payment for placement in our guides and we do not publish sponsored content. Websites shown in our portfolio belong to our clients, and we say so.`,
        ],
      },
      {
        heading: "What we will not publish",
        list: [
          "Dosing, usage or outcome content, or anything that implies human or veterinary use.",
          "Guidance on how to get around the rules of a payment processor, advertising platform or regulator. We do not give it.",
          "Invented reviews, testimonials, statistics, credentials or people.",
          "Promises of payment approval, search rankings, advertising acceptance or sales.",
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: LegalDoc["slug"]) {
  return legalDocs.find((d) => d.slug === slug)!;
}
