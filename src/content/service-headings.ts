/**
 * Section headings for each service page. Every service page used the same seven generic headings, which wasted the
 * strongest on-page relevance signal and made fifteen pages read as one template. Each heading here names the page's
 * own topic, in the wording people use (see docs/seo/06-keyword-research.md). Keep them distinct from each other:
 * check:content fails if two services share a heading. A service's own `whyTitle`, when set, still wins.
 * The fixed headings "Process", "What we do not do, and cannot promise", "Partner-built sites" and "Read next" stay in the template.
 */
export type ServiceHeadings = {
  what: string;
  why: string;
  problems: string;
  approach: string;
  included: string;
  tech: string;
};

export const defaultServiceHeadings: ServiceHeadings = {
  what: "What it is",
  why: "Why RUO businesses need it",
  problems: "What usually goes wrong",
  approach: "How we approach it",
  included: "What is included",
  tech: "Under the hood",
};

export const serviceHeadings: Record<string, ServiceHeadings> = {
  "wholesale-peptides": {
    what: "What wholesale peptide supply for business customers involves",
    why: "Why business customers need documents with every order",
    problems: "Where wholesale peptide sourcing usually goes wrong",
    approach: "How we handle a wholesale order",
    included: "What our wholesale service includes",
    tech: "The records and handling behind each order",
  },
  "peptide-dropshipping": {
    what: "What peptide dropshipping involves",
    why: "Why dropshipping gives up control",
    problems: "Where peptide dropshipping usually goes wrong",
    approach: "How we set up a dropshipping arrangement",
    included: "What a dropshipping setup includes",
    tech: "Order routing and stock sync details",
  },
  "peptide-3pl": {
    what: "What a 3PL for peptides does",
    why: "Why peptide brands use a 3PL",
    problems: "Where peptide 3PL and fulfillment usually go wrong",
    approach: "How we set up 3PL and fulfillment",
    included: "What our 3PL and fulfillment work includes",
    tech: "Integration and exception handling",
  },
  "white-label-peptides": {
    what: "What white label and private label peptide programs involve",
    why: "Why a peptide brand launch needs its records in order",
    problems: "Where peptide brand launches usually go wrong",
    approach: "How we launch an RUO peptide brand",
    included: "What a brand launch project includes",
    tech: "The records, labels and notices behind the brand",
  },
  "google-ads": {
    what: "What Google's policy says about advertising peptides",
    why: "Why peptide brands should not depend on Google Ads",
    problems: "Where peptide Google Ads plans usually go wrong",
    approach: "How we review a Google Ads plan honestly",
    included: "What a Google Ads policy review includes",
    tech: "Measurement that works on any channel",
  },
  "telehealth-payment-processing": {
    what: "What telehealth payment processing and LegitScript involve",
    why: "Why telehealth businesses plan certification and underwriting together",
    problems: "Where telehealth payment setups usually go wrong",
    approach: "How we prepare a telehealth business for payments",
    included: "What our telehealth payments work includes",
    tech: "Billing and monitoring details",
  },
  "ruo-peptide-website-development": {
    what: "What RUO peptide website development covers",
    why: "Why an RUO peptide store needs a custom build",
    problems: "Where RUO peptide store builds usually go wrong",
    approach: "How we build an RUO peptide store",
    included: "What an RUO peptide store build includes",
    tech: "Technical architecture of the store",
  },
  "telehealth-platform-development": {
    what: "What telehealth platform development involves",
    why: "Why clinical businesses need it",
    problems: "Where telehealth platform builds usually go wrong",
    approach: "How we build a telehealth platform",
    included: "What a telehealth platform build includes",
    tech: "Technical and security architecture",
  },
  "vial-label-design": {
    what: "What peptide vial label design covers",
    why: "Why RUO peptide brands need purpose-built labels",
    problems: "Where vial label projects usually go wrong",
    approach: "How we design RUO vial labels",
    included: "What a vial label project includes",
    tech: "Print and data specifications",
  },
  "payment-processing": {
    what: "What peptide payment processing involves",
    why: "Why RUO stores struggle to keep a payment processor",
    problems: "Where peptide payment processing usually goes wrong",
    approach: "How we prepare and implement payment processing",
    included: "What our payment processing work includes",
    tech: "Technical details of payment integration",
  },
  "business-dashboards": {
    what: "What business dashboards for RUO peptide stores do",
    why: "Why an RUO store needs one reporting layer",
    problems: "Where store reporting usually goes wrong",
    approach: "How we build the reporting layer",
    included: "What the dashboards include",
    tech: "Data model and integration details",
  },
  "customer-support": {
    what: "What customer support infrastructure covers",
    why: "Why RUO stores need support built for the category",
    problems: "Where customer support usually goes wrong",
    approach: "How we set up customer support",
    included: "What a support setup includes",
    tech: "Helpdesk and order-data integration",
  },
  "meta-advertising": {
    what: "What Meta advertising infrastructure covers",
    why: "Why RUO stores need careful Meta advertising setup",
    problems: "Where Meta advertising for RUO stores goes wrong",
    approach: "How we set up Meta advertising",
    included: "What our Meta advertising work includes",
    tech: "Pixel and Conversions API tracking details",
  },
  "affiliate-management": {
    what: "What peptide affiliate program infrastructure covers",
    why: "Why RUO brands need tracked, rule-based affiliate programs",
    problems: "Where peptide affiliate programs usually go wrong",
    approach: "How we build an affiliate program",
    included: "What affiliate infrastructure includes",
    tech: "Tracking and payout details",
  },
  "email-marketing": {
    what: "What email infrastructure for RUO stores covers",
    why: "Why RUO stores need authenticated, consent-based email",
    problems: "Where email for RUO stores usually goes wrong",
    approach: "How we set up email infrastructure",
    included: "What email infrastructure includes",
    tech: "Authentication and deliverability details",
  },
  "seo-geo-aeo": {
    what: "What SEO, GEO and AEO for peptide businesses involve",
    why: "Why RUO peptide stores need search and answer visibility",
    problems: "Where SEO for RUO stores usually goes wrong",
    approach: "How we approach SEO for peptide businesses",
    included: "What our SEO, GEO and AEO work includes",
    tech: "Technical SEO details",
  },
  "supplier-verification": {
    what: "What peptide supplier verification covers",
    why: "Why RUO businesses verify supplier documentation",
    problems: "Where supplier documentation usually goes wrong",
    approach: "How we review supplier documentation",
    included: "What a supplier verification review includes",
    tech: "Records and scorecard details",
  },
  "compliance-support": {
    what: "What a compliance-oriented review of an RUO site covers",
    why: "Why a research-use label is not enough",
    problems: "Where RUO sites usually create avoidable risk",
    approach: "How we run a compliance-oriented review",
    included: "What a review includes",
    tech: "What we check in the content and markup",
  },
  "site-audits": {
    what: "What an RUO peptide website audit covers",
    why: "Why audit before you apply, launch or scale",
    problems: "Where RUO stores usually lose ground",
    approach: "How we run a website audit",
    included: "What an audit delivers",
    tech: "What we measure",
  },
};

export function headingsFor(slug: string): ServiceHeadings {
  return serviceHeadings[slug] ?? defaultServiceHeadings;
}
