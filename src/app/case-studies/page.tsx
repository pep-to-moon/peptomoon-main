import type { Metadata } from "next";
import { ProjectCard } from "@/components/portfolio/project-card";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { GscReach } from "@/components/sections/home/gsc-reach";
import { gscSites } from "@/content/gsc-data";
import { FaqSection } from "@/components/ui/faq-section";
import { caseStudiesFaqs } from "@/content/page-faqs";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { portfolio } from "@/content/portfolio";
import { buildMetadata } from "@/lib/seo/metadata";
import { webPageSchema } from "@/lib/seo/schema";

const title = `RUO Peptide Website Case Studies | ${siteConfig.name}`;
const description =
  "RUO peptide stores designed and built by our partner, with screenshots, verified facts and full case studies where the material is confirmed.";

export const metadata: Metadata = buildMetadata({ title, description, path: "/case-studies" });

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={webPageSchema("CollectionPage", "Case studies", description, "/case-studies", portfolio.filter((p) => p.caseStudy).map((p) => ({ name: p.name, path: `/case-studies/${p.slug}` })))} />
      <PageHero
        id="cases-title"
        crumbs={[{ name: "Case studies", path: "/case-studies" }]}
        title={
          <>
            Selected RUO stores built by our partner.
          </>
        }
        lead={
          <p>
            Our partner designed and built these websites for brands in the RUO peptide and research-product
            space. Every site below is live. Facts come from the sites and the projects themselves, and a case study appears
            only when its material has been confirmed.
          </p>
        }
      />

      <Section pad={false} className="pb-[clamp(4rem,8vw,7rem)]" labelledBy="cases-list">
        <h2 id="cases-list" className="sr-only">
          Projects
        </h2>
        <div className="container-x grid gap-5 lg:grid-cols-2 lg:gap-6">
          {portfolio.map((item, i) => (
            <Reveal key={item.slug} delay={i % 2} className={i % 2 === 1 ? "lg:mt-16" : ""}>
              <ProjectCard item={item} priority={i < 2} detailed />
            </Reveal>
          ))}
        </div>
        <p className="label container-x mt-14 text-ink-soft">
          Screenshots captured 17 November 2026. Counts reflect each site&apos;s sitemap on that date.
        </p>
      </Section>

      <GscReach sites={gscSites} />

      <FaqSection id="cases-faq" title="Questions about this work" items={caseStudiesFaqs} />

      <CtaBand
        id="cases-cta"
        title={
          <>
            Planning your own build?
          </>
        }
        actions={
          <ButtonLink href="/contact" size="lg">
            Start your project
          </ButtonLink>
        }
      />
    </>
  );
}
