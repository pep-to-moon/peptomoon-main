import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ArticleToc, type TocItem } from "@/components/resources/article-toc";
import { HowWeResearch } from "@/components/resources/how-we-research";
import { Inline, RichText } from "@/components/resources/rich-text";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { FaqList } from "@/components/ui/faq-list";
import { PageHero } from "@/components/ui/page-hero";
import { siteConfig } from "@/config/site";
import { articleWordCount, getArticle, getArticles, readingMinutes } from "@/content/articles";
import { getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/schema";
import { formatDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.seo.title,
    description: article.seo.description,
    path: `/resources/${article.slug}`,
    type: "article",
    publishedTime: article.published,
    modifiedTime: article.updated,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const path = `/resources/${article.slug}`;
  const service = getService(article.service);
  const related = article.related.map((s) => getArticle(s)).filter((a) => a !== undefined);
  const toc: TocItem[] = [
    ...article.blocks.flatMap((b) => (b.type === "h2" ? [{ id: b.id, label: b.text }] : [])),
    ...(article.faqs.length > 0 ? [{ id: "common-questions", label: "Common questions" }] : []),
    ...(article.sources.length > 0 ? [{ id: "sources", label: "Sources" }] : []),
  ];

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: article.title,
          description: article.seo.description,
          path,
          published: article.published,
          updated: article.updated,
          wordCount: articleWordCount(article),
          section: article.topic,
        })}
      />
      <article>
        <PageHero
          id="article-title"
          crumbs={[
            { name: "Resources", path: "/resources" },
            { name: article.title, path },
          ]}
          chip={<span className="label rounded-full bg-blue px-3.5 py-2 text-white">{article.topic}</span>}
          title={article.title}
          titleClassName="display-lg max-w-[26ch]"
          lead={<p>{article.excerpt}</p>}
        >
          <p className="label mt-8 text-ink-soft">
            By the {siteConfig.name} team (<Link href="/editorial-policy" className="underline underline-offset-4">editorial policy</Link>). Updated <time dateTime={article.updated}>{formatDate(article.updated)}</time>.{" "}
            {readingMinutes(article)} minute read.
          </p>
        </PageHero>

        <section aria-label="Summary" className="container-x pb-[clamp(2.5rem,5vw,4rem)]">
          <div className="grid gap-10 border-y border-ink/20 py-10 lg:grid-cols-12 lg:gap-14 lg:py-12">
            <div className="lg:col-span-7">
              <p className="label text-blue-deep">Quick answer</p>
              <p className="mt-4 text-[clamp(1.2rem,1rem+0.7vw,1.55rem)] leading-[1.45]">
                <Inline text={article.quickAnswer} />
              </p>
            </div>
            <div className="lg:col-span-5">
              <h2 className="label text-blue-deep">Key takeaways</h2>
              <ul className="mt-4 border-b border-ink/15">
                {article.takeaways.map((t) => (
                  <li key={t} className="border-t border-ink/15 py-3 text-[1rem] leading-snug">
                    <Inline text={t} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="container-x grid gap-x-12 gap-y-8 pb-[clamp(3rem,7vw,6rem)] lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <ArticleToc items={toc} />
            </div>
          </aside>
          <div className="min-w-0 lg:col-span-8 lg:col-start-5">
            <RichText blocks={article.blocks} />

            {article.faqs.length > 0 && (
              <section aria-labelledby="common-questions" className="mt-16">
                <h2 id="common-questions" className="display display-md scroll-mt-28">
                  Common questions
                </h2>
                <div className="mt-6">
                  <FaqList items={article.faqs} />
                </div>
              </section>
            )}

            <HowWeResearch article={article} />

            {article.sources.length > 0 && (
              <section aria-labelledby="sources" className="mt-14 border-t border-ink/20 pt-8">
                <h2 id="sources" className="label scroll-mt-28">
                  Sources
                </h2>
                <ul className="mt-4 space-y-2 text-[0.95rem]">
                  {article.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue underline underline-offset-4">
                        {s.label}
                      </a>
                      <span className="text-ink-soft">. Checked {formatDate(s.checked)}.</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </article>

      <CtaBand
        id="after-title"
        title={
          <>
            Want help applying this to your business?
          </>
        }
        actions={
          <>
            {service && (
              <ButtonLink href={`/services/${service.slug}`} size="lg">
                {service.name}
              </ButtonLink>
            )}
            <ButtonLink href="/contact" variant="secondary" size="lg">
              Tell us what you need
            </ButtonLink>
          </>
        }
      >
        {related.length > 0 && (
          <>
            <p className="label">Related guides</p>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/resources/${r.slug}`} className="group flex min-h-12 items-center justify-between gap-3 py-2 font-display font-bold leading-snug text-ink">
                    {r.title}
                    <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </CtaBand>
    </>
  );
}
