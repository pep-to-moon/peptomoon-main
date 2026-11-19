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
import { journey } from "@/content/resource-journey";
import { buildMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils";
import { webPageSchema } from "@/lib/seo/schema";

const title = `RUO Peptide Business Guides and Resources | ${siteConfig.name}`;
const description =
  "Sourced guides for RUO peptide businesses on infrastructure, payments, supplier documentation, store architecture and compliance, with dates and sources.";

export const metadata: Metadata = buildMetadata({ title, description, path: "/resources" });

const startHere = [
  { kicker: "Start here", title: "How to start a peptide business", text: "Nine steps from idea to launch, with a guide for each.", href: "/start-a-peptide-business" },
  { kicker: "Free tools", title: "Budget, scorecard and checklist", text: "Three planning tools that run in your browser.", href: "/tools" },
  { kicker: "Reference", title: "Glossary of RUO terms", text: "Plain definitions you can quote.", href: "/glossary" },
];

export default function ResourcesPage() {
  const articles = getArticles();
  const topics = Array.from(new Set(articles.map((a) => a.topic)));
  const bySlug = new Map(articles.map((a) => [a.slug, a]));
  const used = new Set<string>();
  const groups = journey
    .map((st) => {
      const items = st.slugs.flatMap((slug) => {
        const a = bySlug.get(slug);
        if (!a) return [];
        used.add(slug);
        return [a];
      });
      return { id: st.id, title: st.title, blurb: st.blurb, items };
    })
    .filter((g) => g.items.length > 0);
  const others = articles.filter((a) => !used.has(a.slug));
  if (others.length) groups.push({ id: "more", title: "More guides", blurb: "Other guides on running a research-use business.", items: others });
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

      <Section pad={false} className="pb-[clamp(2rem,4vw,3rem)]" labelledBy="resources-start">
        <div className="container-x">
          <h2 id="resources-start" className="sr-only">
            Start here
          </h2>
          <Reveal className="border-y border-ink/20">
            <ul className="grid gap-px md:grid-cols-3">
              {startHere.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="group flex h-full items-start justify-between gap-4 py-8 transition-colors hover:bg-sky-soft md:px-6">
                    <span>
                      <span className="label text-blue">{s.kicker}</span>
                      <span className="heading-sm mt-3 block text-[1.35rem] leading-tight">{s.title}</span>
                      <span className="mt-2 block max-w-[34ch] text-[0.95rem] text-ink-soft">{s.text}</span>
                    </span>
                    <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-blue text-white transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <nav aria-label="Guides by stage" className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {groups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="label inline-block rounded-full bg-white px-4 py-2 ring-1 ring-ink/10 transition-colors hover:ring-blue/40">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Section>

      {groups.map((g, gi) => (
        <Section key={g.id} id={g.id} tone={gi % 2 ? "sky" : undefined} labelledBy={`stage-${g.id}`}>
          <div className="container-x">
            <Reveal className="border-t border-ink/20 pt-4">
              <p className="label text-blue">Stage {String(gi + 1).padStart(2, "0")}</p>
              <h2 id={`stage-${g.id}`} className="display display-md mt-2 max-w-[24ch]">
                {g.title}
              </h2>
              <p className="mt-4 max-w-[58ch] text-ink-soft">{g.blurb}</p>
            </Reveal>
            <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {g.items.map((a, i) => (
                <Reveal as="li" delay={i % 3} key={a.slug}>
                  <Link
                    href={`/resources/${a.slug}`}
                    className="group relative flex h-full min-h-[16rem] flex-col rounded-[1.25rem] bg-white p-7 ring-1 ring-ink/10 transition-all duration-300 hover:-translate-y-1 hover:ring-blue/40 sm:p-8"
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
      ))}
      <FaqSection id="resources-faq" title="Questions about these guides" items={resourcesFaqs} className="pt-0" />
    </>
  );
}
