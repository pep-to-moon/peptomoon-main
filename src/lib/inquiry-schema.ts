import { z } from "zod";

export const STATUS_VALUES = ["existing-website", "new-business", "expand", "specific-problem"] as const;

export const SERVICE_VALUES = [
  "website-creation",
  "website-redesign",
  "payment-processing",
  "meta-advertising",
  "supplier-verification",
  "us-fulfillment",
  "dropshipping",
  "affiliate-systems",
  "email-marketing",
  "seo-geo-aeo",
  "site-audit",
  "compliance-support",
  "business-dashboards",
  "customer-support",
  "complete-infrastructure",
] as const;

export type StatusValue = (typeof STATUS_VALUES)[number];
export type ServiceValue = (typeof SERVICE_VALUES)[number];

export const statusLabels: Record<StatusValue, string> = {
  "existing-website": "I already have a website",
  "new-business": "I am launching something new",
  expand: "I want to expand what I have",
  "specific-problem": "I have a specific problem",
};

export const serviceLabels: Record<ServiceValue, string> = {
  "website-creation": "Website creation",
  "website-redesign": "Website redesign",
  "payment-processing": "Payment processing",
  "meta-advertising": "Meta advertising infrastructure",
  "supplier-verification": "Supplier verification",
  "us-fulfillment": "US fulfillment",
  dropshipping: "Dropshipping",
  "affiliate-systems": "Affiliate systems",
  "email-marketing": "Email marketing",
  "seo-geo-aeo": "SEO, GEO and AEO",
  "site-audit": "Site audit",
  "compliance-support": "Compliance support",
  "business-dashboards": "Business dashboards",
  "customer-support": "Customer support",
  "complete-infrastructure": "Complete business infrastructure",
};

/** Maps service page slugs to quiz options so a service page can preselect its option. */
export const serviceSlugToOption: Record<string, ServiceValue> = {
  "ruo-peptide-website-development": "website-creation",
  "payment-processing": "payment-processing",
  "meta-advertising": "meta-advertising",
  "supplier-verification": "supplier-verification",
  "fulfillment-logistics": "us-fulfillment",
  "wholesale-dropshipping-3pl": "dropshipping",
  "compliance-support": "compliance-support",
  "affiliate-management": "affiliate-systems",
  "email-marketing": "email-marketing",
  "seo-geo-aeo": "seo-geo-aeo",
  "site-audits": "site-audit",
  "business-dashboards": "business-dashboards",
  "customer-support": "customer-support",
};

/** Maps the contact page's ?topic= values (used by /all-in-one) to quiz options. */
export const topicToOption: Record<string, ServiceValue> = {
  "all-in-one": "complete-infrastructure",
  payments: "payment-processing",
};

/** Accepts "example.com" as well as "https://example.com", so nobody is stopped over a missing protocol. */
const isWebsite = (v: string) => {
  try {
    const u = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`);
    return (u.protocol === "http:" || u.protocol === "https:") && u.hostname.includes(".");
  } catch {
    return false;
  }
};

/**
 * Only four things are required: at least one service, a name, an email and consent to be contacted.
 * Everything else is optional, and the website address is never required, whatever the visitor's situation.
 */
export const inquiryFields = z.object({
  status: z.enum(STATUS_VALUES).optional(),
  services: z.array(z.enum(SERVICE_VALUES)).min(1, { error: "Choose at least one service." }),
  websiteUrl: z
    .string()
    .trim()
    .max(300)
    .refine((v) => v === "" || isWebsite(v), { error: "That does not look like a web address. Try example.com, or leave it blank." }),
  requirements: z.string().trim().max(2000, { error: "Please keep this under 2000 characters." }),
  challenges: z.string().trim().max(2000, { error: "Please keep this under 2000 characters." }),
  name: z.string().trim().min(2, { error: "Enter your name." }).max(120),
  business: z.string().trim().max(160),
  email: z
    .string()
    .trim()
    .max(200)
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, { error: "Enter a valid email address." }),
  phone: z
    .string()
    .trim()
    .refine((v) => v === "" || /^\+?[0-9][0-9\s().-]{6,19}$/.test(v), {
      error: "Enter a phone number with its country code, or leave it blank.",
    }),
  consent: z.boolean().refine((v) => v === true, { error: "Please agree so we can contact you about your enquiry." }),
});

export const inquirySchema = inquiryFields;
export type InquiryValues = z.infer<typeof inquirySchema>;

/** What the browser sends to the API: the answers plus anti-spam fields. */
export const requestSchema = inquiryFields.extend({
  company_website: z.string().max(0).optional(),
  startedAt: z.number(),
  captchaToken: z.string().max(400).optional(),
  captchaAnswer: z.string().max(12).optional(),
});
export type InquiryRequest = z.infer<typeof requestSchema>;
