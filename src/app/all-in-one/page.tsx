import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal, Section } from "@/components/ui/section";
import { ThreadsBg } from "@/components/motion/threads-bg";
import { absoluteUrl, siteConfig } from "@/config/site";
import { allInOneFaqs, limits, paymentsOfferQualifier } from "@/content/all-in-one";
import { FaqFilter } from "@/components/all-in-one/faq-filter";
import { AioHead } from "@/components/all-in-one/heading";
import { AioHero } from "@/components/all-in-one/hero";
import { BuildTabs } from "@/components/all-in-one/builds";
import { LayerRows } from "@/components/all-in-one/layers";
import { ComparisonMatrix } from "@/components/all-in-one/matrix";
import { PaymentsSection } from "@/components/all-in-one/payments";
import { Process } from "@/components/all-in-one/process";
import { MobileStickyCta } from "@/components/all-in-one/rail";
import { AddOns, Programs, SearchFoundation } from "@/components/all-in-one/search";
import { SixVendors } from "@/components/all-in-one/vendors";
import { buildMetadata } from "@/lib/seo/metadata";

const path = "/all-in-one";
const title = "All-in-One Peptide & Telehealth Business Partner | Peptomoon";
const description =
  "Websites, high-risk payment processing from 3% (no rolling reserve for qualifying merchants), COAs and SEO, GEO and AEO for RUO peptide and telehealth businesses.";
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
            ["Telehealth platform development", "/services/telehealth-platform-development"],
            ["High-risk payment processing and merchant infrastructure", "/services/payment-processing"],
            ["Wholesale, dropshipping and 3PL", "/services/wholesale-peptides"],
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

const pad = "py-[clamp(4rem,8vw,7rem)]";

export default function AllInOnePage() {
  return (
    <>
      <JsonLd data={graph()} />
      <MobileStickyCta />

      <AioHero />

      <Section labelledBy="aio-why" className={pad}>
        <div className="container-x">
          <AioHead id="aio-why" label="Why one partner" title="Six vendors is how most peptide businesses break" />
          <SixVendors />
          <Reveal className="mt-16 grid gap-6 text-ink/80 lg:grid-cols-2 lg:gap-16">
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

      <PaymentsSection />

      <Section id="services" labelledBy="aio-layers" className={`scroll-mt-24 ${pad}`}>
        <div className="container-x">
          <AioHead
            id="aio-layers"
            label="Everything in one place"
            title="Every layer of a peptide or telehealth business, built to fit together"
            lead="Pick the whole stack or start with the layer that hurts most. In either case, each service is built on the same foundation, so anything you add later connects cleanly."
          />
          <LayerRows />
        </div>
      </Section>

      <Section id="offerings" labelledBy="aio-offerings" className={`scroll-mt-24 ${pad}`}>
        <div className="container-x">
          <AioHead
            id="aio-offerings"
            label="Core builds"
            title="Three ways to start"
            lead="Every build is quoted after a short scoping call, so you only pay for what your business needs."
          />
          <BuildTabs />
        </div>
      </Section>

      <Section id="search" labelledBy="aio-search" className={`scroll-mt-24 ${pad}`}>
        <div className="container-x">
          <AioHead
            id="aio-search"
            label="Grow · Search"
            title="Built to rank in Google and get cited by AI"
            lead="Every build ships with a technical SEO foundation, so you do not have to retrofit it later. After launch, monthly growth programs add content, links and AI search visibility."
          />
          <SearchFoundation />
          <Programs />
        </div>
      </Section>

      <Section labelledBy="aio-addons" className={pad}>
        <div className="container-x">
          <AioHead id="aio-addons" label="Add-ons" title="Add what you need, when you need it" />
          <AddOns />
        </div>
      </Section>

      <Section id="compare" labelledBy="aio-compare" className={`scroll-mt-24 ${pad}`}>
        <div className="container-x">
          <AioHead id="aio-compare" label="Compare" title="All-in-one vs separate vendors vs DIY" />
          <ComparisonMatrix />
          <p className="mt-5 max-w-[90ch] text-[0.8rem] text-ink-soft">{paymentsOfferQualifier}</p>
        </div>
      </Section>

      <Section id="process" labelledBy="aio-process" className={`scroll-mt-24 ${pad}`}>
        <div className="container-x">
          <AioHead id="aio-process" label="How we work" title="From first call to ongoing growth" />
          <Process />
        </div>
      </Section>

      <Section labelledBy="aio-limits" className={pad}>
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <AioHead id="aio-limits" label="Straight answers" title="What we do not promise" />
          </div>
          <ul className="lg:col-span-7">
            {limits.map((t, i) => (
              <Reveal as="li" delay={i % 3} key={t} className="border-t border-ink/20 py-5 text-[1.0625rem] text-ink/85 last:border-b">
                {t}
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="faq" labelledBy="aio-faq" className={`scroll-mt-24 ${pad}`}>
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <AioHead id="aio-faq" label="FAQ" title="Questions about all-in-one setup and high-risk payments" />
              <Reveal delay={1}>
                <p className="mt-6 text-ink-soft">
                  Cannot find your question?{" "}
                  <Link href="/contact" className="text-blue underline underline-offset-4">
                    Ask us directly.
                  </Link>
                </p>
              </Reveal>
            </div>
          </div>
          <Reveal delay={1} className="min-w-0 lg:col-span-8">
            <FaqFilter items={allInOneFaqs} />
          </Reveal>
        </div>
      </Section>

      <Section id="aio-cta" tone="navy" panel labelledBy="aio-cta-title" className={pad}>
        <ThreadsBg
          color={[0.6, 0.84, 0.92]}
          accentColor={[0.18, 0.37, 0.54]}
          amplitude={1.5}
          distance={0.55}
          lineCount={70}
          thickness={0.5}
          speed={0.3}
          opacity={0.5}
          fade={0.1}
          angle={-18}
          enableMouseInteraction
          parting={0.5}
        />
        <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <AioHead
              dark
              id="aio-cta-title"
              label="Start here"
              title="One conversation covers everything"
              lead="Tell us what you sell, where you are stuck and what you want to launch. In one call, we will show you what to fix first. We will also tell you whether you are likely to qualify for processing from 3% with no rolling reserve."
            />
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Magnetic>
              <ButtonLink href="/contact?topic=all-in-one" size="lg" variant="light">
                Start a project
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="/services" size="lg" variant="onDark">
              All services
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
