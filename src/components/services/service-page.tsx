import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { FaqList } from "@/components/ui/faq-list";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Section } from "@/components/ui/section";
import { getArticle } from "@/content/articles";
import { getCaseStudy } from "@/content/case-studies";
import { getPortfolioItem } from "@/content/portfolio";
import { getService } from "@/content/services";
import type { Service } from "@/content/types";
import { pillars } from "@/content/pillars";
import { serviceSchema } from "@/lib/seo/schema";
import { ServiceVisual } from "./service-visual";

const statusLabel: Record<Service["status"], string> = {
  established: "Established service",
  "by-engagement": "Scoped by engagement",
  planned: "Planned",
};

function Rule({ children }: { children: React.ReactNode }) {
  return <div className="border-t border-ink/20 pt-4">{children}</div>;
}

function LinkRow({ href, kicker, title }: { href: string; kicker?: string; title: string }) {
  return (
    <li className="border-t border-ink/20 last:border-b">
      <Link href={href} className="group -mx-3 flex min-h-20 items-center rounded-2xl justify-between gap-4 px-3 py-4 transition-colors hover:bg-sky-soft">
        <span>
          {kicker && <span className="label block text-ink-soft">{kicker}</span>}
          <span className="font-display text-[1.2rem] font-bold leading-snug">{title}</span>
        </span>
        <ArrowUpRight aria-hidden className="size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
      </Link>
    </li>
  );
}

export function ServicePage({ service }: { service: Service }) {
  const pillar = pillars.find((p) => p.key === service.pillar)!;
  const articles = service.articles.map((s) => getArticle(s)).filter((a) => a !== undefined);
  const studies = service.caseStudies.map((s) => getCaseStudy(s)).filter((c) => c !== undefined);
  const related = service.related.map((s) => getService(s)).filter((s) => s !== undefined);

  return (
    <>
      <JsonLd data={serviceSchema(service)} />

      <PageHero
        id="service-title"
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
        chip={
          <span className="label text-ink-soft">
            {pillar.index} / {pillar.label} · {statusLabel[service.status]}
          </span>
        }
        title={service.h1}
        titleClassName="display-lg max-w-[24ch]"
        lead={<p>{service.lead}</p>}
        actions={
          <>
            <ButtonLink href={`/contact?service=${service.slug}`} size="lg">
              {service.cta.label}
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary" size="lg">
              All services
            </ButtonLink>
          </>
        }
      />

      <Section labelledBy="what-title" className="pt-0">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="min-w-0 lg:col-span-6">
            <Rule>
              <h2 id="what-title" className="display display-md">
                What it is
              </h2>
            </Rule>
            <div className="prose-article mt-7">
              {service.what.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={1} className="min-w-0 lg:col-span-6">
            <ServiceVisual kind={service.visual} />
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="why-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Rule>
                <h2 id="why-title" className="display display-md">
                  Why RUO businesses need it
                </h2>
              </Rule>
            </div>
          </Reveal>
          <ol className="lg:col-span-7">
            {service.why.map((t, i) => (
              <Reveal as="li" delay={i} key={t} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-ink/20 py-6 last:border-b">
                <span className="font-display text-[0.95rem] font-semibold text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[1.0625rem]">{t}</p>
              </Reveal>
            ))}
            {service.sources && (
              <li className="list-none pt-5 text-[0.9rem] text-ink-soft">
                <span className="label">Sources, checked {service.sources[0].checked}: </span>
                {service.sources.map((s, i) => (
                  <span key={s.url}>
                    {i > 0 && "; "}
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue underline underline-offset-4">
                      {s.label}
                    </a>
                  </span>
                ))}
              </li>
            )}
          </ol>
        </div>
      </Section>

      <Section labelledBy="problems-title">
        <div className="container-x">
          <Reveal>
            <Rule>
              <h2 id="problems-title" className="display display-md">
                What usually goes wrong
              </h2>
            </Rule>
          </Reveal>
          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {service.problems.map((p, i) => (
              <Reveal key={p.title} delay={i % 2} className="border-t border-ink/20 pt-6">
                <h3 className="heading-sm">{p.title}</h3>
                <p className="mt-3 max-w-[52ch] text-ink-soft">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section labelledBy="approach-title">
        <div className="container-x">
          <Reveal>
            <Rule>
              <h2 id="approach-title" className="display display-md">
                How we approach it
              </h2>
            </Rule>
          </Reveal>
          <ol className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {service.approach.map((a, i) => (
              <Reveal as="li" delay={i % 3} key={a.title} className="border-t border-ink/20 pt-6">
                <span className="font-display text-[0.95rem] font-semibold text-blue">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="heading-sm mt-3">{a.title}</h3>
                <p className="mt-3 text-ink-soft">{a.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section labelledBy="included-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Rule>
              <h2 id="included-title" className="display display-md">
                What is included
              </h2>
            </Rule>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {service.included.map((item) => (
                <li key={item} className="py-3.5">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={1} className="lg:col-span-6">
            <Rule>
              <h2 className="display display-md">Process</h2>
            </Rule>
            <ol className="mt-8 border-l border-ink/25">
              {service.process.map((p, i) => (
                <li key={p.title} className="pb-9 pl-8 last:pb-0">
                  <span aria-hidden className="font-display text-[0.8rem] font-semibold tabular-nums text-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-display text-[1.2rem] font-bold">{p.title}</h3>
                  <p className="mt-1 text-ink-soft">{p.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="tech-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Rule>
              <h2 id="tech-title" className="display display-md">
                Under the hood
              </h2>
            </Rule>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {service.technical.map((t) => (
                <li key={t} className="py-3.5">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={1} className="lg:col-span-6">
            <Rule>
              <h2 className="display display-md">What we do not do, and cannot promise</h2>
            </Rule>
            <ul className="mt-8 divide-y divide-line border-y border-line text-ink-soft">
              {service.limits.map((t) => (
                <li key={t} className="py-3.5">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {(studies.length > 0 || articles.length > 0) && (
        <Section labelledBy="proof-title">
          <div className="container-x grid gap-14 lg:grid-cols-2">
            {studies.length > 0 && (
              <Reveal>
                <Rule>
                  <h2 id="proof-title" className="display display-md">
                    Sites we built
                  </h2>
                </Rule>
                <ul className="mt-8">
                  {studies.map((c) => {
                    const item = getPortfolioItem(c.slug);
                    return <LinkRow key={c.slug} href={`/case-studies/${c.slug}`} kicker={item?.category} title={item?.name ?? c.slug} />;
                  })}
                </ul>
              </Reveal>
            )}
            {articles.length > 0 && (
              <Reveal delay={1}>
                <Rule>
                  <h2 className="display display-md">Read next</h2>
                </Rule>
                <ul className="mt-8">
                  {articles.map((a) => (
                    <LinkRow key={a.slug} href={`/resources/${a.slug}`} kicker={a.topic} title={a.title} />
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
          {studies.length === 0 && (
            <h2 id="proof-title" className="sr-only">
              Guides
            </h2>
          )}
        </Section>
      )}

      <Section labelledBy="faq-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Rule>
                <h2 id="faq-title" className="display display-md">
                  Questions about {service.name.toLowerCase()}
                </h2>
              </Rule>
            </div>
          </Reveal>
          <Reveal delay={1} className="lg:col-span-8">
            <FaqList items={service.faqs} />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        id="related-title"
        title="Start with a short conversation."
        actions={
          <ButtonLink href={`/contact?service=${service.slug}`} size="lg">
            {service.cta.label}
          </ButtonLink>
        }
      >
        <p className="label">Related services</p>
        <ul className="mt-3 divide-y divide-line border-y border-line">
          {related.map((r) => (
            <li key={r.slug}>
              <Link href={`/services/${r.slug}`} className="group flex min-h-12 items-center justify-between gap-3 font-display font-bold text-ink">
                {r.name}
                <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <TextLink href="/services">View the full ecosystem</TextLink>
        </div>
      </CtaBand>
    </>
  );
}
