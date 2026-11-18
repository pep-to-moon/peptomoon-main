import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { ShotStrip } from "@/components/portfolio/shot-strip";
import { ServiceExplorer, type ExplorerPillar, type ExplorerService } from "@/components/services/service-explorer";
import { StageFlow } from "@/components/services/stage-flow";
import { ButtonLink } from "@/components/ui/button";
import { FaqSection } from "@/components/ui/faq-section";
import { servicesFaqs } from "@/content/page-faqs";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { media } from "@/content/media";
import { pillars } from "@/content/pillars";
import { servicePaths } from "@/content/service-paths";
import { serviceMedia } from "@/content/service-media";
import { servicesByPillar, services } from "@/content/services";
import { buildMetadata } from "@/lib/seo/metadata";
import { numberWord } from "@/lib/number-word";
import { webPageSchema } from "@/lib/seo/schema";

const title = `RUO Peptide Business Services | ${siteConfig.name}`;
const description =
  `${numberWord(services.length, true)} services for RUO peptide businesses: websites, payments, fulfillment, wholesale and 3PL, reporting, marketing, search, audits and compliance.`;

export const metadata: Metadata = buildMetadata({ title, description, path: "/services" });

const explorerServices: ExplorerService[] = services.map((s) => {
  const photo = serviceMedia[s.slug];
  return {
    slug: s.slug,
    name: s.name,
    summary: s.summary,
    pillar: s.pillar,
    status: s.status,
    image: photo ? `/images/${media[photo.hero].file}.webp` : undefined,
  };
});

const explorerPillars: ExplorerPillar[] = pillars.map((p) => ({ ...p, count: servicesByPillar(p.key).length }));

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={webPageSchema("CollectionPage", "Services", description, "/services", services.map((s) => ({ name: s.name, path: `/services/${s.slug}` })))} />
      <PageHero
        id="services-title"
        crumbs={[{ name: "Services", path: "/services" }]}
        title={
          <>
            {numberWord(services.length, true)} services. One partner.
          </>
        }
        lead={
          <p>
            {siteConfig.name} offers {numberWord(services.length)} services for research-use-only peptide businesses, in four stages: build the
            store, run the operation, grow the audience and verify the details. Planned together so the pieces fit. Take one service or
            the whole set, and use the guide below to find where to start.
          </p>
        }
        actions={
          <ButtonLink href="/contact" size="lg">
            Tell us what you need
          </ButtonLink>
        }
      />

      <ShotStrip eager className="pb-[clamp(3rem,7vw,6rem)]" />

      <Section labelledBy="services-browse" pad={false} className="pb-[clamp(3rem,7vw,6rem)]">
        <div className="container-x">
          <Reveal className="border-t border-ink/20 pt-4">
            <h2 id="services-browse" className="display display-md max-w-[22ch]">
              Find the service you need.
            </h2>
            <p className="mt-4 max-w-[56ch] text-ink-soft">
              Browse by stage, pick the situation closest to yours, or search. Every service has its own page with what it
              covers, what it does not and how it connects to the others.
            </p>
          </Reveal>
          <div className="mt-10">
            <ServiceExplorer services={explorerServices} pillars={explorerPillars} paths={servicePaths} />
          </div>
        </div>
      </Section>

      <Section tone="sky" labelledBy="services-stages">
        <div className="container-x">
          <Reveal className="mb-12 border-t border-ink/20 pt-4">
            <h2 id="services-stages" className="display display-md max-w-[24ch]">
              Four stages, one journey.
            </h2>
            <p className="mt-4 max-w-[54ch] text-ink-soft">
              Most businesses move through the same four stages, often more than once. Planning them together is what stops
              the handovers between them from breaking.
            </p>
          </Reveal>
          <StageFlow stages={explorerPillars.map((p) => ({ ...p }))} />
        </div>
      </Section>

      <FaqSection id="services-faq" title="Questions before you choose" items={servicesFaqs} />

      <CtaBand
        id="services-cta"
        title={
          <>
            Not sure where to start? Start with one question.
          </>
        }
        actions={
          <ButtonLink href="/contact" variant="light" size="lg">
            Tell us what you need
          </ButtonLink>
        }
      >
        <p>A short questionnaire is enough. We read every answer and reply to you directly.</p>
      </CtaBand>
    </>
  );
}
