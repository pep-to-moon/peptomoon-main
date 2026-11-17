import type { CaseStudy } from "../types";
import { purity99 } from "./99-purity-peptides";
import { primetimeBioLabs } from "./primetime-bio-labs";
import { veracueLabs } from "./veracue-labs";

/** Only studies listed here get a page. Others (Helix Bio Chem, Certified Aminos, Amino Based) await verified material. */
export const caseStudies: CaseStudy[] = [veracueLabs, purity99, primetimeBioLabs];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export const caseStudyFieldOrder = [
  "overview",
  "requirements",
  "challenges",
  "design",
  "architecture",
  "ecommerce",
  "technical",
  "seoNotes",
  "maintenance",
  "outcomes",
] as const;

export const caseStudyFieldLabels: Record<(typeof caseStudyFieldOrder)[number], string> = {
  overview: "Business overview",
  requirements: "Project requirements",
  challenges: "Challenges and objectives",
  design: "Design approach",
  architecture: "Website architecture",
  ecommerce: "E-commerce functionality",
  technical: "Technical implementation",
  seoNotes: "SEO considerations",
  maintenance: "Ongoing maintenance",
  outcomes: "Measurable outcomes",
};

/** Only verified fields ever render. A field without confirmed material is simply left out, never padded. */
export function shouldRender(status: "verified" | "needs-confirmation") {
  return status === "verified";
}
