export type PillarKey = "build" | "run" | "grow" | "verify";
export type DeliveryStatus = "established" | "by-engagement" | "planned";

export type Source = { label: string; url: string; checked: string };
export type Faq = { q: string; a: string };

export type ServiceVisualKey =
  | "architecture"
  | "payments"
  | "meta"
  | "supplier"
  | "fulfillment"
  | "compliance"
  | "affiliate"
  | "email"
  | "dashboard"
  | "support"
  | "search"
  | "audit"
  | "telehealth"
  | "label";

export type Service = {
  slug: string;
  name: string;
  pillar: PillarKey;
  summary: string;
  status: DeliveryStatus;
  primaryKeyword: string;
  seo: { title: string; description: string };
  h1: string;
  lead: string;
  what: string[];
  /** Heading for the "why" section, when the default about RUO businesses does not fit. */
  whyTitle?: string;
  why: string[];
  problems: { title: string; text: string }[];
  approach: { title: string; text: string }[];
  included: string[];
  process: { title: string; text: string }[];
  technical: string[];
  limits: string[];
  visual: ServiceVisualKey;
  sources?: Source[];
  faqs: Faq[];
  related: string[];
  caseStudies: string[];
  articles: string[];
  cta: { label: string };
};

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "table"; caption: string; head: string[]; rows: string[][] };

export type Article = {
  slug: string;
  title: string;
  seo: { title: string; description: string };
  primaryKeyword: string;
  excerpt: string;
  topic: string;
  published: string;
  updated: string;
  service: string;
  related: string[];
  caseStudy?: string;
  /** Two to four sentences that answer the question the guide is about, shown before everything else. */
  quickAnswer: string;
  /** Four to six one-sentence takeaways, shown beside the quick answer. */
  takeaways: string[];
  blocks: Block[];
  /** Real questions a reader has after the guide, answered in full. */
  faqs: Faq[];
  sources: Source[];
  /** Regulatory content must be reviewed by counsel before publishing. */
  needsCounselReview: boolean;
  /** Set to the review date once counsel has reviewed it. Until then it stays hidden in production. */
  counselReviewedOn?: string;
};

export type PortfolioItem = {
  slug: string;
  name: string;
  url: string;
  host: string;
  category: string;
  blurb: string;
  facts: string[];
  services: string[];
  accent: string;
  images: {
    desktop: { src: string; width: number; height: number };
    mobile: { src: string; width: number; height: number };
    shop?: { src: string; width: number; height: number };
  };
  alt: { desktop: string; mobile: string; shop?: string };
  captured: string;
  caseStudy: boolean;
};

/** A field whose truth has been checked. Unconfirmed fields never render in production. */
export type Verified<T> = {
  value: T;
  source: string;
  verifiedOn: string;
  status: "verified" | "needs-confirmation";
};

export type CaseStudy = {
  slug: string;
  seo: { title: string; description: string };
  primaryKeyword: string;
  headline: string;
  intro: Verified<string>;
  overview: Verified<string[]>;
  requirements: Verified<string[]>;
  challenges: Verified<string[]>;
  design: Verified<string[]>;
  architecture: Verified<string[]>;
  ecommerce: Verified<string[]>;
  technical: Verified<string[]>;
  seoNotes: Verified<string[]>;
  maintenance: Verified<string[]>;
  outcomes: Verified<string[]>;
  services: string[];
  related: string[];
};
