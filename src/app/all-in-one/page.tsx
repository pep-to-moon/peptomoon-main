import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq-list";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Section } from "@/components/ui/section";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  addOns,
  allInOneFaqs,
  heroBadges,
  layers,
  limits,
  offerings,
  paymentCompare,
  paymentIncluded,
  paymentsOfferQualifier,
  paymentStats,
  pillarsStrip,
  processSteps,
  programs,
  searchTicks,
  vendorCompare,
  verticals,
} from "@/content/all-in-one";
import { buildMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

const path = "/all-in-one";
const title = "All-in-One Peptide & Telehealth Business Partner | Peptomoon";
const description =
  "Custom websites, high-risk payment processing from 3% with no rolling reserve, COAs and SEO/GEO/AEO for RUO peptide and telehealth businesses.";
const ogTitle = "All-in-one infrastructure for RUO peptide and telehealth businesses";
const ogDescription =
  "One team for your website, high-risk payment processing, fulfillment, documentation and growth. Card processing from 3% with no rolling reserve for merchants who qualify.";

const base = buildMetadata({ title, description, path });
export const metadata: Metadata = {
  ...base,
  openGraph: { ...base.openGraph, title: ogTitle, description: ogDescription },
  twitter: { ...base.twitter, title: ogTitle, description: ogDescription },
};

function graph() {
  const url = absoluteUrl(path);
  const site = siteConfig.url;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: "All-in-One Peptide & Telehealth Business Partner",
        description:
          "Custom websites, high-risk payment processing, fulfillment, documentation and SEO/GEO/AEO growth for RUO peptide and telehealth businesses, delivered by one team.",
        isPartOf: { "@id": `${site}/#website` },
        about: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site },
          { "@type": "ListItem", position: 2, name: "All-in-one", item: url },
        ],
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: "All-in-one infrastructure for RUO peptide and telehealth businesses",
        serviceType: "Peptide business infrastructure",
        description:
          "One team for custom e-commerce and telehealth platforms, high-risk payment processing setup, fulfillment and 3PL, supplier and COA documentation, compliance-oriented review, SEO/GEO/AEO and paid growth.",
        url,
        provider: { "@type": "Organization", "@id": `${site}/#organization`, name: siteConfig.name, url: site },
        areaServed: { "@type": "Country", name: "United States" },
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Research-use-only (RUO) peptide, telehealth and other high-risk businesses",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "All-in-one services",
          itemListElement: [
            ["RUO peptide e-commerce website development", "/services/ruo-peptide-website-development"],
            ["Telehealth platform development", null],
            ["High-risk payment processing and merchant infrastructure", "/services/payment-processing"],
            ["Wholesale, dropshipping and 3PL", "/services/wholesale-dropshipping-3pl"],
            ["Supplier sourcing and COA verification", "/services/supplier-verification"],
            ["SEO, GEO and AEO", "/services/seo-geo-aeo"],
          ].map(([name, href]) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name, ...(href ? { url: absoluteUrl(href) } : {}) },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: allInOneFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

/** Two-column tick list with a short rule as the bullet, used for every checklist on this page. */
function Ticks({ items, cols = 2, dark = false, className }: { items: string[]; cols?: 1 | 2; dark?: boolean; className?: string }) {
  return (
    <ul className={cn("mt-4 gap-x-8", cols === 2 && "sm:columns-2", className)}>
      {items.map((t) => (
        <li key={t} className="relative break-inside-avoid py-1.5 pl-6 text-[0.95rem]">
          <span aria-hidden className={cn("absolute left-0 top-[0.95rem] h-0.5 w-3", dark ? "bg-sky" : "bg-blue")} />
          {t}
        </li>
      ))}
    </ul>
  );
}

function Rule({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("border-t border-current/20 pt-4", className)}>{children}</div>;
}

export default function AllInOnePage() {
  return (
    <>
      <JsonLd data={graph()} />

      <PageHero
        id="aio-title"
        crumbs={[{ name: "All-in-one", path }]}
        crumbSchema={false}
        chip={<span className="label text-blue">00 / All-in-one · Build · Run · Grow · Verify</span>}
        title="All-in-one infrastructure for RUO peptide and telehealth businesses"
        titleClassName="display-lg max-w-[24ch]"
        lead={
          <>
            <p className="border-l-[3px] border-blue pl-5 text-ink">
              <strong>One team builds and runs your whole business.</strong> That includes your website or telehealth platform and high-risk
              payment processing from 3% with no rolling reserve for qualifying merchants. It also covers fulfillment, COA documentation and SEO,
              GEO and AEO growth. Everything is built to work together from the first day.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="At a glance">
              {heroBadges.map((b) => (
                <li key={b} className="label rounded-full bg-white px-3.5 py-1.5 ring-1 ring-ink/10">
                  {b}
                </li>
              ))}
            </ul>
          </>
        }
        actions={
          <>
            <ButtonLink href="/contact?topic=all-in-one" size="lg">
              Start a project
            </ButtonLink>
            <a
              href="#payments"
              className="group inline-flex h-14 shrink-0 items-center gap-3 whitespace-nowrap rounded-full bg-white pl-7 pr-2 font-display text-[0.86rem] font-bold uppercase tracking-[0.05em] text-ink ring-1 ring-ink/15 transition-shadow hover:ring-ink/45"
            >
              See payment processing
              <span aria-hidden className="grid size-10 place-items-center rounded-full bg-ink text-white">
                <ArrowDown className="size-[1.05em] transition-transform group-hover:translate-y-0.5" />
              </span>
            </a>
          </>
        }
      >
        <ul className="mt-12 grid grid-cols-2 border-y border-ink/20 md:grid-cols-4">
          {pillarsStrip.map((p, i) => (
            <li key={p.t} className={cn("py-5 pr-4", i % 2 === 1 && "pl-4", i === 2 && "md:pl-4", i % 2 === 0 && "border-r border-ink/20", i === 1 && "md:border-r")}>
              <span className="block font-display font-bold uppercase tracking-[0.06em]">{p.t}</span>
              <span className="text-[0.88rem] text-ink-soft">{p.d}</span>
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Why one partner */}
      <Section labelledBy="aio-why" className="pt-0">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Rule>
              <p className="eyebrow">Why one partner</p>
              <h2 id="aio-why" className="display display-md mt-5 max-w-[18ch]">
                Six vendors is how most peptide businesses break
              </h2>
            </Rule>
          </Reveal>
          <Reveal delay={1} className="prose-article text-ink/80 lg:col-span-7">
            <p>
              A typical RUO peptide or telehealth launch involves a web developer, a payment broker, a 3PL, a lab, a marketing agency and an SEO
              freelancer. None of them see the whole picture. So the website says one thing, the merchant application says another and the ads say a
              third. That mismatch is exactly what underwriters, ad reviewers and search engines notice.
            </p>
            <p>
              An all-in-one partner removes the gaps. Your product copy, labels, policies, payment file and marketing all come from one source of
              truth. As a result, applications are consistent, launches are faster and problems get fixed by the people who built the system.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Payments spotlight */}
      <Section id="payments" tone="navy" panel labelledBy="aio-payments" className="scroll-mt-24">
        <div className="container-x">
          <Reveal>
            <Rule>
              <p className="eyebrow text-sky">02 / Run · High-risk payment processing</p>
            </Rule>
            <h2 id="aio-payments" className="display display-lg mt-6 max-w-[22ch]">
              High-risk payment processing from 3%, with no rolling reserve
            </h2>
            <p className="mt-6 max-w-[68ch] text-white/75">
              Peptide, RUO and telehealth businesses are routinely declined, frozen or shut down by mainstream payment platforms. We set up high-risk
              merchant accounts through acquiring partners who underwrite your category on purpose. For qualifying merchants, that means processing
              from 3% and no rolling reserve. Your revenue reaches your bank instead of sitting in a reserve for months.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Verticals we support">
              {verticals.map((v) => (
                <li key={v} className="label rounded-full px-3.5 py-1.5 ring-1 ring-white/25">
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-[1.25rem] bg-white/15 ring-1 ring-white/15 md:grid-cols-3">
            {paymentStats.map((s) => (
              <li key={s.label} className="bg-navy p-7">
                <p className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-bold leading-none">
                  {s.num}
                  {s.star && <sup className="text-[0.45em] text-sky">*</sup>}
                </p>
                <p className="label mt-3 text-sky">{s.label}</p>
                <p className="mt-2 text-[0.92rem] text-white/75">{s.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-12 xl:grid-cols-2">
            <div className="min-w-0">
              <h3 className="heading-sm">How it compares</h3>
              <div className="mt-4 overflow-x-auto" tabIndex={0} role="region" aria-label="How it compares">
                <table className="w-full min-w-[30rem] border-collapse text-left text-[0.95rem] leading-snug">
                  <caption className="sr-only">Typical high-risk account compared with an account arranged through Peptomoon</caption>
                  <thead>
                    <tr className="border-b border-white/15">
                      <th scope="col" className="py-3 pr-3">
                        <span className="sr-only">Term</span>
                      </th>
                      <th scope="col" className="label px-3 py-3">
                        Typical high-risk account
                      </th>
                      <th scope="col" className="label px-3 py-3 text-sky">
                        Arranged through Peptomoon*
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentCompare.map(([k, a, b]) => (
                      <tr key={k} className="border-b border-white/15 align-top">
                        <th scope="row" className="py-3.5 pr-3 font-medium">
                          {k}
                        </th>
                        <td className="px-3 py-3.5 text-white/80">{a}</td>
                        <td className="px-3 py-3.5 font-semibold">{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h3 className="heading-sm">What is included</h3>
              <Ticks items={paymentIncluded} dark />
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/contact?topic=payments" variant="light">
                  Check your eligibility
                </ButtonLink>
                <ButtonLink href="/services/payment-processing" variant="onDark">
                  Payment processing details
                </ButtonLink>
              </div>
            </div>
          </div>

          <p className="mt-10 max-w-[90ch] text-[0.8rem] text-white/65">{paymentsOfferQualifier}</p>
        </div>
      </Section>

      {/* Everything in one place */}
      <Section labelledBy="aio-layers">
        <div className="container-x">
          <Reveal>
            <Rule>
              <p className="eyebrow">Everything in one place</p>
            </Rule>
            <h2 id="aio-layers" className="display display-md mt-6 max-w-[24ch]">
              Every layer of a peptide or telehealth business, built to fit together
            </h2>
            <p className="mt-5 max-w-[68ch] text-ink-soft">
              Pick the whole stack or start with the layer that hurts most. In either case, each service is built on the same foundation, so anything
              you add later connects cleanly.
            </p>
          </Reveal>

          {layers.map((g) => (
            <div key={g.name} className="mt-12">
              <div className="flex items-baseline gap-4 border-b border-ink/20 pb-3">
                <span className="eyebrow">{g.index}</span>
                <h3 className="font-display text-[1.4rem] font-bold uppercase">{g.name}</h3>
              </div>
              <ul className="mt-6 grid gap-4 md:grid-cols-3">
                {g.cards.map((c) => (
                  <li key={c.t} className="flex flex-col rounded-[1.125rem] bg-white p-6 ring-1 ring-line">
                    <span className="label text-blue">{c.n}</span>
                    <h4 className="heading-sm mt-2">{c.t}</h4>
                    <p className="mt-2 flex-1 text-[0.95rem] text-ink-soft">{c.d}</p>
                    <Link href={c.href} className="mt-4 font-display text-[0.78rem] font-bold uppercase tracking-[0.06em] text-blue hover:underline">
                      {c.link} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Offerings */}
      <Section id="offerings" tone="sky" labelledBy="aio-offerings" className="scroll-mt-24">
        <div className="container-x">
          <Reveal>
            <Rule>
              <p className="eyebrow">Core builds</p>
            </Rule>
            <h2 id="aio-offerings" className="display display-md mt-6">
              Three ways to start
            </h2>
            <p className="mt-5 max-w-[68ch] text-ink-soft">
              Every build is quoted after a short scoping call, so you only pay for what your business needs.
            </p>
          </Reveal>
          <div className="mt-10 border-b border-ink/20">
            {offerings.map((o) => (
              <div key={o.t} className="grid gap-6 border-t border-ink/20 py-9 lg:grid-cols-[18rem_1fr] lg:gap-10">
                <div>
                  <span className="eyebrow">{o.index}</span>
                  <h3 className="mt-2 font-display text-[1.4rem] font-bold uppercase leading-tight">{o.t}</h3>
                  <span className="label mt-3 inline-block rounded-full bg-white px-3 py-1 text-blue">{o.tag}</span>
                </div>
                <div>
                  <p className="max-w-[68ch] text-ink/80">{o.intro}</p>
                  <Ticks items={o.items} />
                  {o.note && <p className="mt-5 max-w-[80ch] text-[0.85rem] text-ink-soft">{o.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SEO GEO AEO */}
      <Section labelledBy="aio-search">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <Rule>
              <p className="eyebrow">03 / Grow · Search</p>
            </Rule>
            <h2 id="aio-search" className="display display-md mt-6">
              Built to rank in Google and get cited by AI
            </h2>
            <p className="mt-5 max-w-[60ch] text-ink-soft">
              Every build ships with a technical SEO foundation, so you don&apos;t have to retrofit it later. After launch, monthly growth programs add
              content, links and AI search visibility.
            </p>
            <Ticks items={searchTicks} cols={1} />
          </Reveal>
          <Reveal delay={1} className="min-w-0">
            <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Growth programs">
              <table className="w-full border-collapse text-left text-[0.95rem] leading-snug">
                <caption className="sr-only">Monthly growth programs</caption>
                <thead>
                  <tr className="border-y border-ink/25">
                    <th scope="col" className="label py-3 pr-3">
                      Program
                    </th>
                    <th scope="col" className="label px-3 py-3">
                      Built for
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map(([name, what]) => (
                    <tr key={name} className="border-b border-ink/15 align-top">
                      <th scope="row" className="py-4 pr-3 font-display font-bold">
                        {name}
                      </th>
                      <td className="px-3 py-4 text-ink-soft">{what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[0.85rem] text-ink-soft">We do not guarantee rankings or AI citations. We report what changed and why.</p>
          </Reveal>
        </div>
      </Section>

      {/* Add-ons */}
      <Section tone="sky" labelledBy="aio-addons">
        <div className="container-x">
          <Reveal>
            <Rule>
              <p className="eyebrow">Add-ons</p>
            </Rule>
            <h2 id="aio-addons" className="display display-md mt-6">
              Add what you need, when you need it
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {addOns.map((a) => (
              <li key={a.t} className="rounded-[1.125rem] bg-white p-6 ring-1 ring-line">
                <span className="label text-blue">{a.n}</span>
                <h3 className="heading-sm mt-2">{a.t}</h3>
                <p className="mt-2 text-[0.95rem] text-ink-soft">{a.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Comparison */}
      <Section labelledBy="aio-compare">
        <div className="container-x">
          <Reveal>
            <Rule>
              <p className="eyebrow">Compare</p>
            </Rule>
            <h2 id="aio-compare" className="display display-md mt-6">
              All-in-one vs separate vendors vs DIY
            </h2>
          </Reveal>
          <Reveal>
            <div className="mt-8 overflow-x-auto" tabIndex={0} role="region" aria-label="All-in-one vs separate vendors vs DIY">
              <table className="w-full min-w-[44rem] border-collapse text-left text-[0.95rem] leading-snug">
                <caption className="sr-only">Peptomoon all-in-one compared with separate vendors and a DIY hosted platform</caption>
                <thead>
                  <tr className="border-y border-ink/25">
                    <th scope="col" className="py-3 pr-3">
                      <span className="sr-only">Feature</span>
                    </th>
                    <th scope="col" className="label px-3 py-3 text-blue">
                      Peptomoon all-in-one
                    </th>
                    <th scope="col" className="label px-3 py-3">
                      Separate vendors
                    </th>
                    <th scope="col" className="label px-3 py-3">
                      DIY hosted platform
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vendorCompare.map(([k, us, vendors, diy]) => (
                    <tr key={k} className="border-b border-ink/15 align-top">
                      <th scope="row" className="py-3.5 pr-3 font-medium">
                        {k}
                      </th>
                      <td className="px-3 py-3.5 font-semibold text-blue">{us}</td>
                      <td className="px-3 py-3.5 text-ink-soft">{vendors}</td>
                      <td className="px-3 py-3.5 text-ink-soft">{diy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-[90ch] text-[0.8rem] text-ink-soft">{paymentsOfferQualifier}</p>
          </Reveal>
        </div>
      </Section>

      {/* Process */}
      <Section tone="sky" labelledBy="aio-process">
        <div className="container-x">
          <Reveal>
            <Rule>
              <p className="eyebrow">How we work</p>
            </Rule>
            <h2 id="aio-process" className="display display-md mt-6">
              From first call to ongoing growth
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <li key={s.t} className="border-t-2 border-ink pt-4">
                <span className="font-display text-[0.8rem] font-bold text-blue">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-1 font-display font-bold uppercase tracking-[0.04em]">{s.t}</p>
                <p className="mt-1 text-[0.92rem] text-ink-soft">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Limits */}
      <Section labelledBy="aio-limits">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <Reveal>
            <Rule>
              <p className="eyebrow">Straight answers</p>
            </Rule>
            <h2 id="aio-limits" className="display display-md mt-6">
              What we do not promise
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <Ticks items={limits} cols={1} />
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="sky" labelledBy="aio-faq">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Rule>
                <p className="eyebrow">FAQ</p>
              </Rule>
              <h2 id="aio-faq" className="display display-md mt-6">
                Questions about all-in-one setup and high-risk payments
              </h2>
              <p className="mt-5 text-ink-soft">
                Can&apos;t find your question?{" "}
                <Link href="/contact" className="text-blue underline underline-offset-4">
                  Ask us directly.
                </Link>
              </p>
            </div>
          </Reveal>
          <Reveal delay={1} className="lg:col-span-8">
            <FaqList items={allInOneFaqs} />
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <Section tone="navy" panel labelledBy="aio-cta">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-sky">Start here</p>
            <h2 id="aio-cta" className="display display-lg mt-5">
              One conversation covers everything
            </h2>
            <p className="mt-5 max-w-[60ch] text-white/75">
              Tell us what you sell, where you are stuck and what you want to launch. In one call, we will show you what to fix first. We will also
              tell you whether you are likely to qualify for processing from 3% with no rolling reserve.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <ButtonLink href="/contact?topic=all-in-one" size="lg" variant="light">
              Start a project
            </ButtonLink>
            <ButtonLink href="/services" size="lg" variant="onDark">
              All services
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
