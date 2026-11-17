import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { BrowserFrame, PhoneFrame, Shot } from "@/components/ui/frame";
import { Reveal, Section } from "@/components/ui/section";
import {
  caseStudies,
  caseStudyFieldLabels,
  caseStudyFieldOrder,
  getCaseStudy,
  shouldRender,
} from "@/content/case-studies";
import { getPortfolioItem } from "@/content/portfolio";
import { getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return buildMetadata({
    title: study.seo.title,
    description: study.seo.description,
    path: `/case-studies/${study.slug}`,
    type: "article",
    publishedTime: "2026-11-17",
    modifiedTime: "2026-11-17",
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const item = getPortfolioItem(slug);
  if (!study || !item) notFound();

  const services = study.services.map((s) => getService(s)).filter((s) => s !== undefined);
  const related = study.related.map((s) => getPortfolioItem(s)).filter((s) => s !== undefined);
  const path = `/case-studies/${study.slug}`;

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: study.headline,
          description: study.seo.description,
          path,
          published: "2026-11-17",
          updated: "2026-11-17",
        })}
      />

      <PageHero
        id="case-title"
        crumbs={[
          { name: "Case studies", path: "/case-studies" },
          { name: item.name, path },
        ]}
        chip={<span className="label rounded-full bg-blue px-3.5 py-2 text-white">{item.category}</span>}
        title={study.headline}
        titleClassName="display-lg max-w-[24ch]"
        lead={shouldRender(study.intro.status) ? <p>{study.intro.value}</p> : undefined}
        actions={
          <>
            <ButtonLink href={item.url} size="lg">
              Visit {item.host}
            </ButtonLink>
            <p className="label text-ink-soft">Screenshots captured {item.captured}</p>
          </>
        }
      />

      <Section labelledBy="shots-title" pad={false} className="pb-[clamp(3rem,7vw,6rem)]">
        <h2 id="shots-title" className="sr-only">
          Screenshots
        </h2>
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-9">
            <BrowserFrame host={item.host}>
              <Shot image={item.images.desktop} alt={item.alt.desktop} sizes="(min-width: 1024px) 66vw, 92vw" priority />
            </BrowserFrame>
          </Reveal>
          <Reveal delay={1} className="mx-auto w-[46%] max-w-[15rem] lg:col-span-3 lg:mx-0 lg:w-full lg:max-w-[16rem]">
            <PhoneFrame image={item.images.mobile} alt={item.alt.mobile} sizes="256px" />
          </Reveal>
        </div>
        {item.images.shop && (
          <div className="container-x mt-12 lg:mt-16">
            <Reveal>
              <BrowserFrame host={`${item.host}/shop`} className="lg:w-[72%]">
                <Shot image={item.images.shop} alt={item.alt.shop ?? item.alt.desktop} sizes="(min-width: 1024px) 52vw, 92vw" />
              </BrowserFrame>
            </Reveal>
          </div>
        )}
      </Section>

      <Section labelledBy="details-title">
        <div className="container-x">
          <h2 id="details-title" className="sr-only">
            Project details
          </h2>
          <div>
            {caseStudyFieldOrder.map((key, i) => {
              const field = study[key];
              if (!shouldRender(field.status)) return null;
              return (
                <Reveal key={key} className="grid gap-6 border-t border-ink/20 py-10 last:border-b lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-4">
                    <span className="font-display text-[0.95rem] font-semibold text-blue">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="display mt-3 text-[clamp(1.4rem,1.1rem+1.4vw,2.1rem)]">{caseStudyFieldLabels[key]}</h3>
                  </div>
                  <div className="lg:col-span-8">
                    <ul className="space-y-3">
                      {field.value.map((line) => (
                        <li key={line} className="flex gap-3">
                          <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-ink/60" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="label mt-5 text-ink-soft">
                      Source: {field.source}. Checked {field.verifiedOn}.
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      <Section labelledBy="used-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="border-t border-ink/20 pt-4">
              <h2 id="used-title" className="display display-md">
                Services used on this project
              </h2>
            </div>
          </div>
          <ul className="lg:col-span-7">
            {services.map((s) => (
              <li key={s.slug} className="border-t border-ink/20 last:border-b">
                <Link href={`/services/${s.slug}`} className="group -mx-3 flex min-h-20 items-center rounded-2xl justify-between gap-4 px-3 py-4 transition-colors hover:bg-sky-soft">
                  <span>
                    <span className="label block text-ink-soft">{s.primaryKeyword}</span>
                    <span className="font-display text-[1.25rem] font-bold">{s.name}</span>
                  </span>
                  <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1 group-hover:text-blue" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand
        id="next-title"
        title={
          <>
            Want a build like this?
          </>
        }
        actions={
          <ButtonLink href="/contact" size="lg">
            Discuss your project
          </ButtonLink>
        }
      >
        <p className="label">More work</p>
        <ul className="mt-3 divide-y divide-line border-y border-line">
          {related.map((r) => (
            <li key={r.slug}>
              <Link
                href={r.caseStudy ? `/case-studies/${r.slug}` : "/case-studies"}
                className="group flex min-h-12 items-center justify-between gap-3 font-display font-bold text-ink"
              >
                {r.name}
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </CtaBand>
    </>
  );
}
