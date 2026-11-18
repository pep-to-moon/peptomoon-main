import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { ShotStrip } from "@/components/portfolio/shot-strip";
import { ServiceRows } from "@/components/services/service-rows";
import { ButtonLink } from "@/components/ui/button";
import { FaqSection } from "@/components/ui/faq-section";
import { servicesFaqs } from "@/content/page-faqs";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { pillars } from "@/content/pillars";
import { servicesByPillar, services } from "@/content/services";
import { buildMetadata } from "@/lib/seo/metadata";
import { numberWord } from "@/lib/number-word";
import { webPageSchema } from "@/lib/seo/schema";

const title = `RUO Peptide Business Services | ${siteConfig.name}`;
const description =
  `${numberWord(services.length, true)} services for RUO peptide businesses: websites, payments, fulfillment, wholesale and 3PL, reporting, marketing, search, audits and compliance.`;

export const metadata: Metadata = buildMetadata({ title, description, path: "/services" });

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
            Everything a research-use-only peptide business needs to build, run, grow and check its operations, planned
            together so the pieces fit. Take one service or the whole set.
          </p>
        }
        actions={
          <ButtonLink href="/contact" size="lg">
            Tell us what you need
          </ButtonLink>
        }
      />

      <ShotStrip eager className="pb-[clamp(3rem,7vw,6rem)]" />

      {pillars.map((p, pi) => {
        const list = servicesByPillar(p.key);
        const start = pillars.slice(0, pi).reduce((n, q) => n + servicesByPillar(q.key).length, 1);
        return (
          <Section key={p.key} labelledBy={`pillar-${p.key}`} pad={false} className="pb-[clamp(3rem,7vw,6rem)]">
            <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-10">
              <Reveal className="lg:col-span-4">
                <div className="border-t border-ink/20 pt-4 lg:sticky lg:top-32">
                  <p className="label text-ink-soft">
                    {p.index} / {p.label}
                  </p>
                  <h2 id={`pillar-${p.key}`} className="display display-md mt-5">
                    {p.verb}
                  </h2>
                  <p className="mt-4 max-w-[32ch] text-ink-soft">{p.blurb}</p>
                </div>
              </Reveal>
              <div className="lg:col-span-8">
                <ServiceRows services={list} startAt={start} />
              </div>
            </div>
          </Section>
        );
      })}

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
