import type { PillarKey, Service } from "../types";
import { affiliateManagement } from "./affiliate-management";
import { businessDashboards } from "./business-dashboards";
import { complianceSupport } from "./compliance-support";
import { customerSupport } from "./customer-support";
import { emailMarketing } from "./email-marketing";
import { googleAds } from "./google-ads";
import { metaAdvertising } from "./meta-advertising";
import { paymentProcessing } from "./payment-processing";
import { peptide3pl } from "./peptide-3pl";
import { peptideDropshipping } from "./peptide-dropshipping";
import { seoGeoAeo } from "./seo-geo-aeo";
import { siteAudits } from "./site-audits";
import { supplierVerification } from "./supplier-verification";
import { telehealthPaymentProcessing } from "./telehealth-payment-processing";
import { telehealthPlatformDevelopment } from "./telehealth-platform-development";
import { vialLabelDesign } from "./vial-label-design";
import { websiteDevelopment } from "./website-development";
import { whiteLabelPeptides } from "./white-label-peptides";
import { wholesalePeptides } from "./wholesale-peptides";

/** Order matters: it is the order used in navigation, the hub page and the footer. */
export const services: Service[] = [
  websiteDevelopment,
  telehealthPlatformDevelopment,
  vialLabelDesign,
  whiteLabelPeptides,
  paymentProcessing,
  telehealthPaymentProcessing,
  wholesalePeptides,
  peptideDropshipping,
  peptide3pl,
  businessDashboards,
  customerSupport,
  metaAdvertising,
  googleAds,
  affiliateManagement,
  emailMarketing,
  seoGeoAeo,
  supplierVerification,
  complianceSupport,
  siteAudits,
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function servicesByPillar(key: PillarKey): Service[] {
  return services.filter((s) => s.pillar === key);
}
