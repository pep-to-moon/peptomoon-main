import { siteConfig } from "./site";

export const primaryNav = [
  { label: "Services", href: "/services" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export const companyNav = [
  { label: "About", href: "/about" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export const legalNav = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export const primaryCta = { label: "Start a project", href: "/contact" };

/** The four starting points of the project questionnaire, reused by the footer call to action. */
export const startOptions = [
  { label: "I already have an RUO peptide website", status: "existing-website" },
  { label: "I am planning to launch a new business", status: "new-business" },
  { label: "I want to expand my operations", status: "expand" },
  { label: "I need help with a specific problem", status: "specific-problem" },
];

/** Short form of the Disclaimer page, shown in the footer on every page. Keep the two consistent. */
export const footerDisclaimer = [
  `${siteConfig.name} provides services to businesses in the research-use-only peptide industry and also provides research-use-only products.`,
  "All research products referred to on this site, whether offered by us or by our clients, are labelled for laboratory research use only and are not for human or veterinary use.",
  "Content on this site is general information, not legal, regulatory or medical advice. A research-use-only label does not make a product or its marketing compliant, so speak to qualified counsel.",
  "Client websites are operated by their owners, and we make no guarantee of approvals, rankings or business results.",
].join(" ");
