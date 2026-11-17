import { ButtonLink } from "@/components/ui/button";
import { Reveal, Section, SectionIntro } from "@/components/ui/section";
import { getPortfolioItem } from "@/content/portfolio";

const steps = [
  {
    title: "Catalogue architecture",
    text: "Product models for compounds, blends, sizes and formats, with categories and filters that stay fast and clear past a hundred products.",
    site: "helix-bio-chem",
  },
  {
    title: "Batch documentation pages",
    text: "Certificate hubs and per-batch document links, modelled as data so the product page always shows the current record.",
    site: "99-purity-peptides",
  },
  {
    title: "Research-use notices and gates",
    text: "Age and research acknowledgements and consistent notices, placed once and applied everywhere.",
    site: "veracue-labs",
  },
  {
    title: "Performance and search foundations",
    text: "Canonical tags, sitemaps, structured data and optimised images generated from the same content that renders the page.",
    site: "primetime-bio-labs",
  },
];

export function WhatWeBuild() {
  return (
    <Section labelledBy="build-title">
      <div className="container-x">
        <SectionIntro label="What we build" titleId="build-title" title={<>A store that behaves like a documented catalogue.</>}>
          <p>Four things we get right in every build, each one seen on a site we made.</p>
        </SectionIntro>

        <ol className="border-b border-ink/20">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i % 3} className="border-t border-ink/20">
              <div className="group -mx-3 grid rounded-2xl items-start gap-x-8 gap-y-3 px-3 py-9 transition-colors duration-300 hover:bg-sky-soft sm:-mx-5 sm:px-5 lg:grid-cols-12 lg:py-11">
                <span className="font-display text-[0.95rem] font-semibold text-ink-soft lg:col-span-1 lg:pt-2">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display display-md lg:col-span-5">{s.title}</h3>
                <p className="max-w-[52ch] text-[1.05rem] text-ink-soft lg:col-span-4 lg:pt-1">{s.text}</p>
                <p className="label text-ink-soft lg:col-span-2 lg:pt-2 lg:text-right">
                  Seen on
                  <span className="mt-1 block text-ink">{getPortfolioItem(s.site)?.name}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-10">
          <ButtonLink href="/services/ruo-peptide-website-development" size="lg">
            See website development
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
