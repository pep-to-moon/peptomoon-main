import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { siteConfig, absoluteUrl } from "@/config/site";
import { glossary } from "@/content/glossary";
import { buildMetadata } from "@/lib/seo/metadata";

const title = `RUO Peptide Business Glossary | ${siteConfig.name}`;
const description =
  "Plain definitions of RUO, COA, HPLC, high-risk merchant accounts, chargebacks, 3PL and other terms used by research-use-only peptide businesses.";

export const metadata: Metadata = buildMetadata({ title, description, path: "/glossary" });

const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));

export default function GlossaryPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${absoluteUrl("/glossary")}#termset`,
    name: "RUO peptide business glossary",
    url: absoluteUrl("/glossary"),
    hasDefinedTerm: sorted.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      url: `${absoluteUrl("/glossary")}#${t.slug}`,
      inDefinedTermSet: `${absoluteUrl("/glossary")}#termset`,
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        id="glossary-title"
        crumbs={[{ name: "Glossary", path: "/glossary" }]}
        title={<>Glossary for RUO peptide businesses.</>}
        lead={
          <p>
            Short, plain definitions of the terms that come up when you build, fund and run a research-use-only store. Each one stands on its own,
            and where we have a guide that goes deeper, we link to it.
          </p>
        }
        actions={
          <ButtonLink href="/contact" size="lg">
            Tell us what you need
          </ButtonLink>
        }
      />

      <Section labelledBy="glossary-terms">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <nav aria-label="Jump to a term" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="label">Terms</p>
              <ul className="mt-4 space-y-2 text-[0.95rem]">
                {sorted.map((t) => (
                  <li key={t.slug}>
                    <a href={`#${t.slug}`} className="text-ink-soft underline-offset-4 hover:text-blue hover:underline">
                      {t.term}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="min-w-0 lg:col-span-8 lg:col-start-5">
            <h2 id="glossary-terms" className="sr-only">
              Definitions
            </h2>
            <dl>
              {sorted.map((t) => (
                <div key={t.slug} id={t.slug} className="scroll-mt-28 border-t border-ink/20 py-8 first:border-t-0 first:pt-0">
                  <dt className="font-display text-[1.35rem] font-bold leading-tight">{t.term}</dt>
                  <dd className="mt-3 max-w-[62ch] text-[1.0625rem] leading-relaxed">
                    {t.definition}
                    {t.see && (
                      <>
                        {" "}
                        <Link href={t.see.href} className="text-blue underline underline-offset-4">
                          {t.see.label}
                        </Link>
                        .
                      </>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 border-t border-ink/20 pt-6 text-[0.95rem] text-ink-soft">
              These definitions are general information. They are not legal, regulatory or financial advice, and they do not say that any product or
              practice is permitted for your business.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
