import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/config/site";
import { getLegalDoc } from "@/content/legal";
import { buildMetadata } from "@/lib/seo/metadata";

const doc = getLegalDoc("terms-of-service");

export const metadata: Metadata = buildMetadata({
  title: `Terms of Service | ${siteConfig.name}`,
  description: doc.description,
  path: "/terms-of-service",
});

export default function Page() {
  return <LegalPage doc={doc} />;
}
