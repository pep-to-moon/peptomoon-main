import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { ShotStrip } from "@/components/portfolio/shot-strip";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { FaqSection } from "@/components/ui/faq-section";
import { aboutFaqs } from "@/content/page-faqs";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { webPageSchema } from "@/lib/seo/schema";

const brand = siteConfig.name;
const title = `About ${brand} | RUO Peptide Infrastructure Partner`;
const description = `${brand} builds and maintains the systems behind RUO peptide businesses. How we work, what we will not do, and why one partner beats five vendors.`;

export const metadata: Metadata = buildMetadata({ title, description, path: "/about" });

const principles = [
  {
    t: "Evidence before adjectives",
    d: "We point to live sites, dated sources and documents. If we cannot show it, we do not claim it.",
  },
  {
    t: "Limits are part of the service",
    d: "No one can promise payment approval, search rankings or regulatory outcomes. We say so up front and design around it.",
  },
  {
    t: "Systems, not pages",
    d: "A store is a set of connected systems. We plan how they hand over to each other, because that is where things break.",
  },
  {
    t: "Maintained, not delivered and forgotten",
    d: "Rules, platforms and catalogs change. We stay on the work after launch.",
  },
];

const limits = [
  "We are not a law firm or a regulator. We work alongside your own qualified professionals.",
  "We do not promise merchant approval, search rankings, advertising acceptance or business results.",
  "We never suggest misrepresenting products, hiding business activities or bypassing underwriting.",
  "We do not write dosing, usage or outcome content, and we do not advise on disguising intent or evading enforcement.",
  "Research products offered by us or by our clients are labeled for laboratory research use only, not for human or veterinary use.",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageSchema("AboutPage", "About", description, "/about")} />
      <PageHero
        id="about-title"
        crumbs={[{ name: "About", path: "/about" }]}
        title={
          <>
            Built for the business behind RUO.
          </>
        }
        lead={
          <p>
            {brand} is an infrastructure and growth partner for research-use-only peptide businesses. We build and maintain
            the websites, payment and fulfillment systems, reporting, marketing infrastructure and documentation that sit
            behind a store, and we review content and records for avoidable risk.
          </p>
        }
        actions={
          <ButtonLink href="/contact" size="lg">
            Tell us what you need
          </ButtonLink>
        }
      />

      <ShotStrip className="pb-[clamp(3rem,7vw,6rem)]" />

      <Section labelledBy="why-one-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 id="why-one-title" className="display display-md border-t border-ink/20 pt-4">
              An industry partner beats disconnected providers.
            </h2>
          </Reveal>
          <Reveal delay={1} className="prose-article text-[1.125rem] lg:col-span-7">
            <p>
              A general web agency, a separate payments consultant, a logistics partner and a marketing freelancer can each do
              good work. The trouble is the joins. Nobody owns the moment a payment confirms but an order is not created, the
              inventory number that differs between checkout and warehouse, or the product claim that disagrees with a supplier
              document.
            </p>
            <p>
              In this industry those joins also carry regulatory and platform risk. A partner who understands the whole picture
              can plan the pieces together, spot the contradictions and keep one record of what was decided. That is the value
              of working with one team that plans the whole system together.
            </p>
            <p>
              Read{" "}
              <Link href="/why-peptomoon" className="text-blue underline underline-offset-4">
                why RUO brands choose {brand}
              </Link>
              , look up unfamiliar terms in the{" "}
              <Link href="/glossary" className="text-blue underline underline-offset-4">
                glossary of RUO terms
              </Link>
              , or see how we research and correct our guides in the{" "}
              <Link href="/editorial-policy" className="text-blue underline underline-offset-4">
                editorial policy
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="principles-title">
        <div className="container-x">
          <Reveal className="border-t border-ink/20 pt-4">
            <h2 id="principles-title" className="display display-md max-w-[18ch]">
              How we work
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal as="li" delay={i % 2} key={p.t} className="border-t border-ink/20 pt-6">
                <span className="font-display text-[0.95rem] font-semibold text-blue">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="heading-sm mt-3">{p.t}</h3>
                <p className="mt-3 max-w-[48ch] text-ink-soft">{p.d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="limits-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="border-t border-ink/20 pt-4">
              <h2 id="limits-title" className="display display-md">
                What we do not do
              </h2>
            </div>
          </Reveal>
          <Reveal delay={1} className="lg:col-span-7">
            <ul className="divide-y divide-line border-y border-line">
              {limits.map((t) => (
                <li key={t} className="py-5 text-[1.0625rem]">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <FaqSection id="about-faq" title="What people ask us about us" items={aboutFaqs} />

      <CtaBand
        id="about-cta"
        title={
          <>
            See the work, then talk to us.
          </>
        }
        actions={
          <ButtonLink href="/contact" size="lg">
            Tell us what you need
          </ButtonLink>
        }
      >
        <p>Live sites to look at first.</p>
        <p className="mt-4">
          <TextLink href="/case-studies">
            Case studies
          </TextLink>
        </p>
      </CtaBand>
    </>
  );
}
