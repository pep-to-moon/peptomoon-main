import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/ui/faq-section";
import { resourcesFaqs } from "@/content/page-faqs";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { getArticles, readingMinutes } from "@/content/articles";
import { buildMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils";
import { webPageSchema } from "@/lib/seo/schema";

const title = `RUO Peptide Business Guides and Resources | ${siteConfig.name}`;
const description =
  "Sourced guides for RUO peptide businesses on infrastructure, payments, supplier documentation, store architecture and compliance, with dates and sources.";

export const metadata: Metadata = buildMetadata({ title, description, path: "/resources" });

export default function ResourcesPage() {
  const articles = getArticles();
  const topics = Array.from(new Set(articles.map((a) => a.topic)));
  const [featured, ...rest] = articles;
  return (
    <>
      <JsonLd data={webPageSchema("CollectionPage", "Resources", description, "/resources", articles.map((a) => ({ name: a.title, path: `/resources/${a.slug}` })))} />
      <PageHero
        id="resources-title"
        crumbs={[{ name: "Resources", path: "/resources" }]}
        title={
          <>
            Guides for the business behind RUO.
          </>
        }
        lead={
          <p>
            Plain, sourced guidance on the systems behind an RUO peptide business. Regulatory statements carry dates and primary
            sources, and we say when something has not been verified. New to the terms? Start with the{" "}
            <Link href="/glossary" className="text-blue underline underline-offset-4">
              glossary of RUO terms
            </Link>
            .
          </p>
        }
      >
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Topics">
          {topics.map((t) => (
            <li key={t} className="label rounded-full bg-white px-4 py-2 ring-1 ring-ink/10">
              {t}
            </li>
          ))}
        </ul>
      </PageHero>

      <Section pad={false} className="pb-[clamp(4rem,8vw,7rem)]" labelledBy="articles-title">
        <div className="container-x">
          <h2 id="articles-title" className="sr-only">
            Articles
          </h2>

          {featured && (
            <Reveal className="border-y border-ink/20">
              <Link
                href={`/resources/${featured.slug}`}
                className="group grid gap-8 rounded-[1.25rem] py-10 transition-colors hover:bg-sky-soft sm:-mx-5 sm:px-5 lg:grid-cols-12 lg:items-end"
              >
                <div className="lg:col-span-9">
                  <p className="label text-blue">
                    Start here · {featured.topic} · {formatDate(featured.updated)}
                  </p>
                  <h3 className="display mt-5 text-[clamp(1.8rem,1.2rem+2.4vw,3.4rem)] leading-[1.02]">{featured.title}</h3>
                  <p className="mt-5 max-w-[62ch] text-ink-soft">{featured.excerpt}</p>
                  <p className="label mt-6 text-ink-soft">{readingMinutes(featured)} minute read</p>
                </div>
                <span aria-hidden className="grid size-14 place-items-center rounded-full bg-blue text-white transition-transform duration-300 group-hover:rotate-45 lg:col-span-3 lg:justify-self-end">
                  <ArrowUpRight className="size-6" />
                </span>
              </Link>
            </Reveal>
          )}

          <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal as="li" delay={i % 3} key={a.slug}>
                <Link
                  href={`/resources/${a.slug}`}
                  className="group relative flex h-full min-h-[18rem] flex-col rounded-[1.25rem] bg-white p-7 ring-1 ring-ink/10 transition-all duration-300 hover:-translate-y-1 hover:ring-blue/40 sm:p-8"
                >
                  <p className="label text-ink-soft">
                    {a.topic} · {formatDate(a.updated)}
                  </p>
                  <h3 className="heading-sm mt-4 text-[1.35rem] leading-tight">{a.title}</h3>
                  <p className="mt-3 text-[0.95rem] text-ink-soft">{a.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between pt-6">
                    <p className="label text-ink-soft">{readingMinutes(a)} minute read</p>
                    <span aria-hidden className="grid size-10 place-items-center rounded-full bg-ink/5 transition-all duration-300 group-hover:rotate-45 group-hover:bg-blue group-hover:text-white">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>
      <FaqSection id="resources-faq" title="Questions about these guides" items={resourcesFaqs} className="pt-0" />
    </>
  );
}
