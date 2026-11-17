import type { PillarKey, Service } from "../types";
import { affiliateManagement } from "./affiliate-management";
import { businessDashboards } from "./business-dashboards";
import { complianceSupport } from "./compliance-support";
import { customerSupport } from "./customer-support";
import { emailMarketing } from "./email-marketing";
import { fulfillmentLogistics } from "./fulfillment-logistics";
import { metaAdvertising } from "./meta-advertising";
import { paymentProcessing } from "./payment-processing";
import { seoGeoAeo } from "./seo-geo-aeo";
import { siteAudits } from "./site-audits";
import { supplierVerification } from "./supplier-verification";
import { websiteDevelopment } from "./website-development";

/** Order matters: it is the order used in navigation, the hub page and the footer. */
export const services: Service[] = [
  websiteDevelopment,
  paymentProcessing,
  fulfillmentLogistics,
  businessDashboards,
  customerSupport,
  metaAdvertising,
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
