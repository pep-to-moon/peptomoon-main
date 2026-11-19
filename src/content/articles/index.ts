import type { Article } from "../types";
import { fiveOhThree } from "./five-oh-three";
import { infrastructureMap } from "./infrastructure-map";
import { matchListPeptideSellers } from "./match-list-peptide-sellers";
import { paymentsUnderwriting } from "./payments-underwriting";
import { paypalFrozeFundsPeptideStore } from "./paypal-froze-funds-peptide-store";
import { processorShutdown } from "./processor-shutdown";
import { rollingReserveExplained } from "./rolling-reserve-explained";
import { ruoLabel } from "./ruo-label";
import { searchAiVisibility } from "./search-ai-visibility";
import { shopifyPaymentsPeptideStoreDisabled } from "./shopify-payments-peptide-store-disabled";
import { storeArchitecture } from "./store-architecture";
import { stripeClosedPeptideAccount } from "./stripe-closed-peptide-account";
import { supplierDocs } from "./supplier-docs";
import { wholesaleDropshipping3plGuide } from "./wholesale-dropshipping-3pl";
import { costToStartPeptideBusiness } from "./cost-to-start-a-peptide-business";
import { whiteLabelVsPrivateLabelPeptides } from "./white-label-vs-private-label-peptides";
import { howToFindPeptideSupplier } from "./how-to-find-a-peptide-supplier";
import { shopifyVsCustomPeptideStore } from "./shopify-vs-custom-peptide-store";
import { isSellingResearchPeptidesLegal } from "./is-selling-research-peptides-legal";
import { chargebacksPeptideStore } from "./chargebacks-peptide-store";
import { peptideStoreNotRanking } from "./peptide-store-not-ranking";
import { metaAdAccountDisabledPeptides } from "./meta-ad-account-disabled-peptides";

export const allArticles: Article[] = [
  infrastructureMap,
  ruoLabel,
  supplierDocs,
  paymentsUnderwriting,
  processorShutdown,
  storeArchitecture,
  fiveOhThree,
  wholesaleDropshipping3plGuide,
  searchAiVisibility,
  stripeClosedPeptideAccount,
  paypalFrozeFundsPeptideStore,
  shopifyPaymentsPeptideStoreDisabled,
  matchListPeptideSellers,
  rollingReserveExplained,
  costToStartPeptideBusiness,
  whiteLabelVsPrivateLabelPeptides,
  howToFindPeptideSupplier,
  shopifyVsCustomPeptideStore,
  isSellingResearchPeptidesLegal,
  chargebacksPeptideStore,
  peptideStoreNotRanking,
  metaAdAccountDisabledPeptides,
];

const isProduction = (process.env.VERCEL_ENV ?? process.env.NODE_ENV) === "production";

/**
 * Regulatory articles stay hidden in production until counsel has reviewed them.
 * Set `counselReviewedOn` on the article (a date string) once that has happened.
 */
export function isPublished(article: Article): boolean {
  if (!isProduction) return true;
  return !article.needsCounselReview || Boolean(article.counselReviewedOn);
}

const words = (t: string) => t.split(/\s+/).filter(Boolean).length;

/** Words a reader meets in a guide: summary, body, tables, questions. Used for reading time and a content guard. */
export function articleWordCount(a: Article): number {
  let n = words(a.quickAnswer) + a.takeaways.reduce((s, t) => s + words(t), 0);
  for (const b of a.blocks) {
    if (b.type === "p" || b.type === "h2" || b.type === "h3") n += words(b.text);
    else if (b.type === "ul" || b.type === "ol") n += b.items.reduce((s, t) => s + words(t), 0);
    else if (b.type === "callout") n += words(b.title) + words(b.text);
    else n += b.head.reduce((s, t) => s + words(t), 0) + b.rows.flat().reduce((s, t) => s + words(t), 0);
  }
  return n + a.faqs.reduce((s, f) => s + words(f.q) + words(f.a), 0);
}

export function readingMinutes(a: Article): number {
  return Math.max(1, Math.round(articleWordCount(a) / 220));
}

export function getArticles(): Article[] {
  return allArticles
    .filter(isPublished)
    .sort((a, b) => (a.published < b.published ? 1 : -1));
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}
