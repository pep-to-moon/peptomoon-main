import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";
import { getLegalDoc } from "@/content/legal";
import { buildMetadata } from "@/lib/seo/metadata";

const doc = getLegalDoc("disclaimer");

export const metadata: Metadata = buildMetadata({
  title: `Disclaimer | ${siteConfig.name}`,
  description: doc.description,
  path: "/disclaimer",
});

export default function Page() {
  return <LegalPage doc={doc} />;
}
