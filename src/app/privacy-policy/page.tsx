import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";
import { getLegalDoc } from "@/content/legal";
import { buildMetadata } from "@/lib/seo/metadata";

const doc = getLegalDoc("privacy-policy");

export const metadata: Metadata = buildMetadata({
  title: `Privacy Policy | ${siteConfig.name}`,
  description: doc.description,
  path: "/privacy-policy",
});

export default function Page() {
  return <LegalPage doc={doc} />;
}
