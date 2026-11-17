import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, Minus, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, Section } from "@/components/ui/section";
import { absoluteUrl, siteConfig } from "@/config/site";
import { allInOneFaqs, heroBadges, limits, paymentsOfferQualifier, searchTicks, verticals } from "@/content/all-in-one";
import { BentoServices } from "@/components/all-in-one/bento";
import { FaqFilter } from "@/components/all-in-one/faq-filter";
import { HeroHub, HubLines, PillarTiles } from "@/components/all-in-one/hub";
import { ComparisonMatrix } from "@/components/all-in-one/matrix";
import { OfferingCards } from "@/components/all-in-one/offerings";
import { CompareCards, IncludedGrid, PaymentStats, SettlementCard } from "@/components/all-in-one/payments";
import { MobileStickyCta, SectionRail } from "@/components/all-in-one/rail";
import { AddOnCards, SurfacesVisual, TierCards } from "@/components/all-in-one/search";
import { ProcessTimeline } from "@/components/all-in-one/timeline";
import { Eyebrow, Rule, Ticks } from "@/components/all-in-one/ui";
import { VendorBeforeAfter } from "@/components/all-in-one/vendors";
import { buildMetadata } from "@/lib/seo/metadata";

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

export default function AllInOnePage() {
  return (
    <>
      <JsonLd data={graph()} />
      <SectionRail />
      <MobileStickyCta />

      {/* 00 Hero: the hub explains the business at a glance */}
      <section id="overview" aria-labelledby="aio-title" className="pb-[clamp(2.5rem,6vw,5rem)] pt-[clamp(6.25rem,8.5vw,7.75rem)]">
        <div className="container-x">
          <div className="flex flex-wrap items-center gap-3">
            <Breadcrumbs items={[{ name: "All-in-one", path }]} schema={false} />
            <span className="label text-blue">00 / All-in-one · Build · Run · Grow · Verify</span>
          </div>
          <div className="mt-6 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 id="aio-title" className="display display-lg max-w-[24ch]">
                All-in-one infrastructure for RUO peptide and telehealth businesses
              </h1>
              <p className="mt-7 max-w-[60ch] border-l-[3px] border-blue pl-5 text-[1.125rem] leading-relaxed text-ink">
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
              <div className="mt-8 flex flex-wrap items-center gap-3">
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
              </div>
            </div>
            <div className="lg:col-span-5">
              <HeroHub />
            </div>
          </div>
          <PillarTiles />
        </div>
      </section>

      {/* 01 Why one partner */}
      <Section labelledBy="aio-why" className="pt-0 pb-[clamp(3rem,5.5vw,4.5rem)]">
        <div className="container-x">
          <Reveal>
            <Rule>
              <Eyebrow n="01">Why one partner</Eyebrow>
            </Rule>
            <h2 id="aio-why" className="display display-md mt-6 max-w-[22ch]">
              Six vendors is how most peptide businesses break
            </h2>
          </Reveal>
          <Reveal>
            <VendorBeforeAfter />
          </Reveal>
          <Reveal className="mt-10 grid gap-6 text-ink/80 lg:grid-cols-2 lg:gap-12">
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

      {/* 02 Payments showpiece */}
      <Section id="payments" tone="navy" panel labelledBy="aio-payments" className="scroll-mt-24 py-[clamp(3rem,5.5vw,4.5rem)]">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <Rule>
                <p className="eyebrow text-sky">02 / Run · High-risk payment processing</p>
              </Rule>
              <h2 id="aio-payments" className="display display-lg mt-6 max-w-[22ch]">
                High-risk payment processing from 3%, with no rolling reserve
              </h2>
              <p className="mt-6 max-w-[68ch] text-white/80">
                Peptide, RUO and telehealth businesses are routinely declined, frozen or shut down by mainstream payment platforms. We set up high-risk
                merchant accounts through acquiring partners who underwrite your category on purpose. For qualifying merchants, that means processing
                from 3% and no rolling reserve. Your revenue reaches your bank instead of sitting in a reserve for months.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Verticals we support">
                {verticals.map((v) => (
                  <li key={v} className="label rounded-full px-3.5 py-1.5 ring-1 ring-sky/50 shadow-[0_0_20px_-8px_rgba(153,214,234,0.6)]">
                    {v}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={1} className="lg:col-span-5">
              <SettlementCard />
            </Reveal>
          </div>

          <PaymentStats />

          <div className="mt-12">
            <h3 className="heading-sm">How it compares</h3>
            <div className="mt-4">
              <CompareCards />
            </div>
          </div>

          <div className="mt-12">
            <h3 className="heading-sm">What is included</h3>
            <IncludedGrid />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact?topic=payments" variant="light">
                Check your eligibility
              </ButtonLink>
              <ButtonLink href="/services/payment-processing" variant="onDark">
                Payment processing details
              </ButtonLink>
            </div>
          </div>

          <p className="mt-10 max-w-[90ch] text-[0.82rem] leading-relaxed text-white/75">{paymentsOfferQualifier}</p>
        </div>
      </Section>

      {/* 03 Every layer, as a bento grid */}
      <Section id="services" labelledBy="aio-layers" className="scroll-mt-24 py-[clamp(3rem,5.5vw,4.5rem)]">
        <div className="container-x">
          <Reveal>
            <Rule>
              <Eyebrow n="03">Everything in one place</Eyebrow>
            </Rule>
            <h2 id="aio-layers" className="display display-md mt-6 max-w-[24ch]">
              Every layer of a peptide or telehealth business, built to fit together
            </h2>
            <p className="mt-5 max-w-[68ch] text-ink-soft">
              Pick the whole stack or start with the layer that hurts most. In either case, each service is built on the same foundation, so anything
              you add later connects cleanly.
            </p>
          </Reveal>
          <BentoServices />
        </div>
      </Section>

      {/* 04 Core builds */}
      <Section id="offerings" tone="sky" labelledBy="aio-offerings" className="scroll-mt-24 py-[clamp(3rem,5.5vw,4.5rem)]">
        <div className="container-x">
          <Reveal>
            <Rule>
              <Eyebrow n="04">Core builds</Eyebrow>
            </Rule>
            <h2 id="aio-offerings" className="display display-md mt-6">
              Three ways to start
            </h2>
            <p className="mt-5 max-w-[68ch] text-ink-soft">Every build is quoted after a short scoping call, so you only pay for what your business needs.</p>
          </Reveal>
          <OfferingCards />
        </div>
      </Section>

      {/* 05 Search */}
      <Section id="search" labelledBy="aio-search" className="scroll-mt-24 py-[clamp(3rem,5.5vw,4.5rem)]">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <Rule>
                <Eyebrow>03 / Grow · Search</Eyebrow>
              </Rule>
              <h2 id="aio-search" className="display display-md mt-6">
                Built to rank in Google and get cited by AI
              </h2>
              <p className="mt-5 max-w-[60ch] text-ink-soft">
                Every build ships with a technical SEO foundation, so you don&apos;t have to retrofit it later. After launch, monthly growth programs
                add content, links and AI search visibility.
              </p>
              <Ticks items={searchTicks} cols={1} />
            </Reveal>
            <Reveal delay={1}>
              <SurfacesVisual />
            </Reveal>
          </div>
          <TierCards />
          <p className="mt-4 text-[0.85rem] text-ink-soft">We do not guarantee rankings or AI citations. We report what changed and why.</p>
        </div>
      </Section>

      {/* 06 Add-ons */}
      <Section tone="sky" labelledBy="aio-addons" className="py-[clamp(3rem,5.5vw,4.5rem)]">
        <div className="container-x">
          <Reveal>
            <Rule>
              <Eyebrow n="06">Add-ons</Eyebrow>
            </Rule>
            <h2 id="aio-addons" className="display display-md mt-6">
              Add what you need, when you need it
            </h2>
          </Reveal>
          <AddOnCards />
        </div>
      </Section>

      {/* 07 Compare */}
      <Section id="compare" labelledBy="aio-compare" className="scroll-mt-24 py-[clamp(3rem,5.5vw,4.5rem)]">
        <div className="container-x">
          <Reveal>
            <Rule>
              <Eyebrow n="07">Compare</Eyebrow>
            </Rule>
            <h2 id="aio-compare" className="display display-md mt-6">
              All-in-one vs separate vendors vs DIY
            </h2>
          </Reveal>
          <ComparisonMatrix />
          <p className="mt-4 max-w-[90ch] text-[0.8rem] text-ink-soft">{paymentsOfferQualifier}</p>
        </div>
      </Section>

      {/* 08 Process */}
      <Section id="process" tone="sky" labelledBy="aio-process" className="scroll-mt-24 py-[clamp(3rem,5.5vw,4.5rem)]">
        <div className="container-x">
          <Reveal>
            <Rule>
              <Eyebrow n="08">How we work</Eyebrow>
            </Rule>
            <h2 id="aio-process" className="display display-md mt-6">
              From first call to ongoing growth
            </h2>
          </Reveal>
          <ProcessTimeline />
        </div>
      </Section>

      {/* 09 Limits, as a trust panel */}
      <Section labelledBy="aio-limits" className="py-[clamp(3rem,5.5vw,4.5rem)]">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl rounded-[1.5rem] bg-white p-7 ring-1 ring-line sm:p-9">
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sky-soft text-blue">
                <ShieldCheck aria-hidden className="size-6" strokeWidth={1.5} />
              </span>
              <div>
                <Eyebrow n="09">Straight answers</Eyebrow>
                <h2 id="aio-limits" className="display display-md mt-1">
                  What we do not promise
                </h2>
              </div>
            </div>
            <ul className="mt-6 divide-y divide-line">
              {limits.map((t) => (
                <li key={t} className="flex gap-3 py-3.5">
                  <Minus aria-hidden className="mt-1 size-4 shrink-0 text-steel" strokeWidth={2.25} />
                  <span className="text-ink/85">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* 10 FAQ */}
      <Section id="faq" tone="sky" labelledBy="aio-faq" className="scroll-mt-24 py-[clamp(3rem,5.5vw,4.5rem)]">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="min-w-0 lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Rule>
                <Eyebrow n="10">FAQ</Eyebrow>
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
              <div className="mt-6 hidden rounded-[1.25rem] bg-white p-5 ring-1 ring-line lg:block">
                <p className="font-display font-bold uppercase tracking-[0.04em]">Talk to us</p>
                <div className="mt-4">
                  <ButtonLink href="/contact?topic=all-in-one" size="md">
                    Start a project
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={1} className="min-w-0 lg:col-span-8">
            <FaqFilter items={allInOneFaqs} />
          </Reveal>
        </div>
      </Section>

      {/* 11 Closing call to action, with a faint hub behind it */}
      <Section id="aio-cta" tone="navy" panel labelledBy="aio-cta-title" className="py-[clamp(3rem,5.5vw,4.5rem)]">
        <HubLines className="absolute -right-10 top-1/2 hidden aspect-square h-[130%] -translate-y-1/2 text-white opacity-[0.12] lg:block" />
        <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-sky">Start here</p>
            <h2 id="aio-cta-title" className="display display-lg mt-5">
              One conversation covers everything
            </h2>
            <p className="mt-5 max-w-[60ch] text-white/80">
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
