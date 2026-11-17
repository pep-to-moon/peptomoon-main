import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { FaqSection } from "@/components/ui/faq-section";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import type { Faq } from "@/content/types";
import { buildMetadata } from "@/lib/seo/metadata";
import { webPageSchema } from "@/lib/seo/schema";

const brand = siteConfig.name;
const title = `Why Choose ${brand} | RUO Peptide Store Partner`;
const description = `Round-the-clock technical and customer support, a store built for your brand, and the essentials built in instead of rented. Why RUO brands choose ${brand}.`;

export const metadata: Metadata = buildMetadata({ title, description, path: "/why-peptomoon" });

const pillars = [
  {
    t: "Support at any hour",
    d: "Technical and customer support is available 24 hours a day, 7 days a week. A checkout that stops working or a customer who cannot get an answer does not wait for office hours, so neither do we. We do not promise a fixed response or fix time, because the cause decides the time. We do promise that a person is reachable.",
    link: { href: "/services/customer-support", label: "Customer support" },
  },
  {
    t: "Built for your brand, not adapted from a template",
    d: "Your store is designed and built around your products, your catalogue and your documentation. It is not a generic theme with a logo added. Product pages, batch records and research-use notices are built into the structure, so they stay consistent as the catalogue grows.",
    link: { href: "/services/ruo-peptide-website-development", label: "Website development" },
  },
  {
    t: "Built in, not bolted on",
    d: "Reporting, order handling, notices, affiliate tracking and search foundations are part of the build. You are not renting a separate plugin or app for each one, and you are not left with a pile of tools that disagree with each other.",
    link: { href: "/services/business-dashboards", label: "Business dashboards" },
  },
  {
    t: "No filler",
    d: "Every page says something specific about your business, and a person reviews it before it goes live. We do not mass-produce generic pages, copy-and-paste product text or padded articles. Thin, repetitive content weakens a site with search engines, payment reviewers and customers alike.",
    link: { href: "/resources", label: "Our guides" },
  },
  {
    t: "One accountable team",
    d: "The website, payments, fulfillment, reporting and marketing systems are planned together by one team. When something breaks between two of them, there is one place to call and nobody to pass the problem to.",
    link: { href: "/services", label: "All services" },
  },
  {
    t: "Limits stated up front",
    d: "No one can promise payment approval, search rankings or advertising acceptance, and we do not. We tell you what we can do, what we cannot and what depends on others, in writing, before you commit.",
    link: { href: "/about", label: "How we work" },
  },
];

const compare = [
  ["How features are added", "Each need becomes another plugin, app or subscription.", "Core functions are part of your site's own build."],
  ["Who maintains it", "Each tool has its own vendor, update cycle and support queue.", "One team maintains the whole system."],
  ["Where problems come from", "From the joins between tools that were never designed together.", "From one codebase we know, which we can fix directly."],
  ["What you see on the invoice", "A growing list of small recurring charges.", "What you need is named and priced before you start."],
  ["Look and feel", "A theme that thousands of other stores also use.", "A design made for your brand and your products."],
  ["When you need help", "You work out which vendor to ask.", "You ask us, at any hour."],
];

const builtIn = [
  ["A store built for your catalogue", "Product pages, variants and batch documentation as structured data.", "/services/ruo-peptide-website-development"],
  ["Reporting in one place", "Orders, payments, stock, fulfillment and support in one view.", "/services/business-dashboards"],
  ["Order and stock handling", "Orders routed, stock counted once and tracking sent to the customer.", "/services/fulfillment-logistics"],
  ["Affiliate tracking", "Partner links, attribution and payout records.", "/services/affiliate-management"],
  ["Search foundations", "Structure, metadata and markup that search engines and answer tools can read.", "/services/seo-geo-aeo"],
  ["Customer support systems", "A defined way to receive, answer and track customer questions.", "/services/customer-support"],
];

const faqs: Faq[] = [
  {
    q: "Is support really available 24 hours a day?",
    a: `Yes. ${brand} provides technical and customer support 24 hours a day, 7 days a week. We do not promise a fixed response or fix time, because it depends on the problem and on third parties such as your payment provider or host.`,
  },
  {
    q: "What does support cover?",
    a: "Technical support covers your site, its integrations and the systems we built or maintain. Customer support covers the questions your own customers send, handled to the process we agree with you. Anything that depends on a third party, such as a processor decision, is something we help you work through but cannot decide.",
  },
  {
    q: "Will I still need other subscriptions?",
    a: "Fewer, and you will know which ones before you start. Core functions are built into your site, so you are not renting a plugin for each one. Some third parties are unavoidable, for example your payment processor, your domain and an email-sending service. We list them and their costs up front.",
  },
  {
    q: "Will my store look like a template?",
    a: "No. The design and structure are built for your brand and your catalogue. Many stores in this industry run on the same few themes, and customers and reviewers can tell.",
  },
  {
    q: "Can you promise payment approval or rankings?",
    a: "No, and no one honestly can. Approval depends on the processor, and rankings depend on search engines. We make your business and your site clear, accurate and well documented, which is what a reviewer or a search engine looks for.",
  },
  {
    q: "Do you sell to consumers?",
    a: `No. ${brand} works with businesses in the research-use-only peptide industry. Research-use-only products are labelled for laboratory research use only and are not for human or veterinary use.`,
  },
];

export default function WhyPage() {
  return (
    <>
      <JsonLd data={webPageSchema("WebPage", `Why choose ${brand}`, description, "/why-peptomoon")} />
      <PageHero
        id="why-title"
        crumbs={[{ name: `Why ${brand}`, path: "/why-peptomoon" }]}
        title={<>Why RUO brands choose {brand}.</>}
        lead={
          <p>
            Support at any hour. A store built for your brand. The essentials built in instead of rented. One team that answers for the whole
            system.
          </p>
        }
        actions={
          <ButtonLink href="/contact" size="lg">
            Tell us what you need
          </ButtonLink>
        }
      />

      <Section labelledBy="why-pillars">
        <div className="container-x">
          <Reveal className="border-t border-ink/20 pt-4">
            <h2 id="why-pillars" className="display display-md max-w-[20ch]">
              What you get.
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal as="li" delay={i % 2} key={p.t} className="border-t border-ink/20 pt-6">
                <span className="font-display text-[0.95rem] font-semibold text-blue">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="heading-sm mt-3">{p.t}</h3>
                <p className="mt-3 max-w-[52ch] text-ink-soft">{p.d}</p>
                <p className="mt-4">
                  <Link href={p.link.href} className="text-blue underline underline-offset-4">
                    {p.link.label}
                  </Link>
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="why-compare">
        <div className="container-x">
          <Reveal className="border-t border-ink/20 pt-4">
            <h2 id="why-compare" className="display display-md max-w-[24ch]">
              A custom build compared with a stack of plugins and subscriptions.
            </h2>
          </Reveal>
          <Reveal>
            <div className="mt-10 overflow-x-auto" tabIndex={0} role="region" aria-label="A custom build compared with a stack of plugins and subscriptions">
              <table className="w-full min-w-[40rem] border-collapse text-left text-[1rem] leading-snug">
                <caption className="sr-only">A custom build compared with a stack of plugins and subscriptions</caption>
                <thead>
                  <tr className="border-y border-ink/25">
                    <th scope="col" className="label px-3 py-3 first:pl-0">
                      &nbsp;
                    </th>
                    <th scope="col" className="label px-3 py-3 text-ink-soft">
                      A typical plugin stack
                    </th>
                    <th scope="col" className="label px-3 py-3 text-blue">
                      {brand}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compare.map(([k, a, b]) => (
                    <tr key={k} className="border-b border-ink/15 align-top">
                      <th scope="row" className="py-4 pl-0 pr-3 font-display font-bold">
                        {k}
                      </th>
                      <td className="px-3 py-4 text-ink-soft">{a}</td>
                      <td className="px-3 py-4 font-semibold">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="why-builtin">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="border-t border-ink/20 pt-4">
              <h2 id="why-builtin" className="display display-md">
                What &ldquo;built in&rdquo; covers.
              </h2>
              <p className="mt-5 max-w-[44ch] text-ink-soft">
                These are part of the build, not separate products you rent. A few third parties remain unavoidable, such as your payment
                processor, your domain and an email-sending service. We name them and their costs before you start.
              </p>
            </div>
          </Reveal>
          <Reveal delay={1} className="lg:col-span-7">
            <ul className="divide-y divide-line border-y border-line">
              {builtIn.map(([name, what, href]) => (
                <li key={name} className="py-5">
                  <Link href={href} className="font-display text-[1.15rem] font-bold text-ink underline-offset-4 hover:text-blue hover:underline">
                    {name}
                  </Link>
                  <p className="mt-1 text-ink-soft">{what}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <FaqSection id="why-faq" title="Questions about working with us" items={faqs} />

      <CtaBand
        id="why-cta"
        title={<>See how it fits your business.</>}
        actions={
          <ButtonLink href="/contact" size="lg">
            Tell us what you need
          </ButtonLink>
        }
      >
        <p>Tell us where you are and what is not working. We will say what we would change and what it involves.</p>
        <p className="mt-4">
          <Link href="/case-studies" className="text-blue underline underline-offset-4">
            See the case studies
          </Link>
        </p>
      </CtaBand>
    </>
  );
}
