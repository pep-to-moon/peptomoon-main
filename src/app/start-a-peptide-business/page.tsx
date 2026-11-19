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
import { articleSchema } from "@/lib/seo/schema";
import { formatDate } from "@/lib/utils";

const brand = siteConfig.name;
const title = `How to Start a Peptide Business: A US Guide | ${brand}`;
const description =
  "A step-by-step guide to starting a research-use-only peptide business in the US: model, suppliers, store, payments, shipping and marketing.";
const published = "2026-11-19";
const updated = "2026-11-19";

export const metadata: Metadata = buildMetadata({ title, description, path: "/start-a-peptide-business", type: "article", publishedTime: published, modifiedTime: updated });

type Step = { title: string; text: string; links: { href: string; label: string }[] };

const steps: Step[] = [
  {
    title: "Choose your business model",
    text: "Most founders pick one of four routes: buy wholesale and resell, launch your own brand with your own labels, dropship so a partner ships each order, or use a 3PL to store and ship your stock. Each one trades control against capital and workload, so decide before you spend on a store.",
    links: [
      { href: "/resources/wholesale-vs-dropshipping-vs-3pl-for-ruo-brands", label: "Wholesale, dropshipping or 3PL" },
      { href: "/services/wholesale-peptides", label: "Wholesale peptides" },
      { href: "/services/peptide-dropshipping", label: "Peptide dropshipping" },
      { href: "/services/peptide-3pl", label: "3PL and fulfillment" },
    ],
  },
  {
    title: "Set up the business and get advice",
    text: "Form the business entity, open business banking, arrange insurance and take advice from qualified counsel before you sell. Requirements depend on your state, your products and how you market them. We do not give legal advice, and nothing here is a substitute for it.",
    links: [{ href: "/services/compliance-support", label: "Compliance-oriented review" }],
  },
  {
    title: "Find and verify your suppliers",
    text: "Ask every supplier for batch-specific documents that name the laboratory, show the method and the underlying data, and match the vial you receive. A purity figure on its own is only a claim. Write your standard down before you talk to suppliers, then score each one against it.",
    links: [
      { href: "/resources/review-a-peptide-suppliers-documentation", label: "How to review a supplier's documentation" },
      { href: "/services/supplier-verification", label: "Supplier sourcing and verification" },
      { href: "/glossary#certificate-of-analysis", label: "What a COA is" },
    ],
  },
  {
    title: "Design your labels and packaging",
    text: "Labels carry the research-use wording and the batch details, and every claim on them has to agree with your documents and your website. Settle the wording early, because changing it later means reprinting stock and rewriting pages.",
    links: [{ href: "/services/vial-label-design", label: "Vial label design and packaging" }],
  },
  {
    title: "Build a store that describes products accurately",
    text: "A research-peptide store is closer to a documented catalog than a lifestyle shop. Each product has sizes, batch records and notices that must stay consistent on every page. Build the structure from records, not by typing each page by hand, and place the research-use notices in the layout.",
    links: [
      { href: "/resources/peptide-store-architecture", label: "Peptide store architecture" },
      { href: "/services/ruo-peptide-website-development", label: "Website development" },
    ],
  },
  {
    title: "Plan your payments before you launch",
    text: "Many mainstream platforms and processors restrict this category, and a specialist provider will review your business, your website and your documents before it approves you. Make the application and the live site tell the same accurate story. No one can promise approval, and you should plan for the day a provider changes its mind.",
    links: [
      { href: "/resources/payment-processing-for-ruo-stores", label: "Underwriting guide" },
      { href: "/resources/payment-processor-shut-down-account", label: "If your processor shuts you down" },
      { href: "/services/payment-processing", label: "Payment processing" },
      { href: "/all-in-one", label: "All-in-one setup" },
    ],
  },
  {
    title: "Organize fulfillment and support",
    text: "Decide who holds stock, who ships and who answers when an order goes wrong, and write it down. Connect your store to your shipper so orders, stock counts and tracking move on their own, and give your team one consistent way to answer customer questions without straying into usage advice.",
    links: [
      { href: "/services/peptide-3pl", label: "3PL and fulfillment" },
      { href: "/services/customer-support", label: "Customer support" },
    ],
  },
  {
    title: "Plan marketing and tracking",
    text: "Advertising platforms set their own rules for this category: Meta, for example, decides what counts as an unsafe product at its sole discretion. So plan search, email and partner programs alongside any paid channel, and make sure your tracking matches real orders from the first day.",
    links: [
      { href: "/resources/search-and-ai-visibility-for-ruo-peptide-stores", label: "Search and AI visibility" },
      { href: "/services/seo-geo-aeo", label: "SEO, GEO and AEO" },
      { href: "/services/meta-advertising", label: "Meta advertising infrastructure" },
      { href: "/services/email-marketing", label: "Email marketing" },
    ],
  },
  {
    title: "Check everything before you launch",
    text: "Read your own site as a payment reviewer would. Look for copy that points toward personal use, notices that are missing on some pages, claims your documents do not support, and policies that disagree with what you actually do. Fix those before you apply for payments or send traffic.",
    links: [
      { href: "/services/site-audits", label: "Website audit" },
      { href: "/services/compliance-support", label: "Compliance-oriented review" },
    ],
  },
];

const models = [
  ["Buy wholesale and resell", "You", "Medium: you choose the supplier and how products are presented", "Storage, packing and documents for every batch"],
  ["Launch your own brand", "You", "High: your labels, packaging and positioning", "Every claim on a label has to match the batch records and the website"],
  ["Dropship", "Your partner", "Low: the partner controls shipping and often packaging", "Errors you cannot see or fix, and label wording you do not own"],
  ["Use a 3PL", "You, stored by the provider", "High: you set the instructions and the provider carries them out", "Integration, and stock counts that drift between two systems"],
];

const readiness = [
  ["Business", "Is the entity formed, and have you taken advice on your state and products?", "Compliance-oriented review"],
  ["Supply", "Do you have batch-specific documents for every product you will list?", "Supplier verification"],
  ["Labels", "Does every label claim match your documents and your site?", "Vial label design"],
  ["Store", "Are notices, batch records and policies consistent on every page?", "Website development"],
  ["Payments", "Do your application and your live site tell the same accurate story?", "Payment processing"],
  ["Fulfillment", "Who holds stock, who ships and who pays for a wrong order?", "Fulfillment and 3PL"],
  ["Support", "Is there a consistent answer for questions about use?", "Customer support"],
  ["Marketing", "Does tracking match real orders, and is there a plan beyond paid ads?", "SEO, email and affiliates"],
];

const mistakes = [
  "Copying a competitor's product claims, which can point toward personal use even when the label says research only.",
  "Paying for a store before you know which payment provider will accept the business.",
  "Taking a supplier's purity number on trust, without a named laboratory, a method and a batch match.",
  "Building on a platform that restricts the category, then losing the store and the customer list together.",
  "Having no plan for a processor shutdown, so held funds and a dead checkout arrive at once.",
  "Letting policies, labels and site copy say different things.",
];

const faqs: Faq[] = [
  {
    q: "Is it legal to start a research peptide business?",
    a: "It depends on what you sell, how you label and market it, and where you operate, so take advice from qualified counsel before you start. FDA warning letters to peptide sellers have turned on website claims, so how a product is described matters as much as the research-use label.",
  },
  {
    q: "How much does it cost to start a peptide business?",
    a: "There is no single figure. Cost depends on your model, how much stock you hold, your store, your payment setup, your testing and your packaging. We do not publish fixed prices, but we can list your cost drivers and show where money goes first.",
  },
  {
    q: "Can I use Shopify or Stripe for a peptide store?",
    a: "Many mainstream platforms and processors restrict this category, and their policies change, so read each one's current terms before you build on it. We help you plan around that. We never help misrepresent a business to a provider, and we cannot promise any approval.",
  },
  {
    q: "How long does it take to launch?",
    a: "It depends mainly on supplier documents and on payment underwriting, which the provider controls, so we give no timelines. Plan the store, the labels and the paperwork in parallel, so that nothing waits on a single step and a delay in one does not stall the rest.",
  },
  {
    q: "Do I need a lab report for every batch?",
    a: "You should hold a batch-specific report from a named laboratory for every lot you sell, with the method and underlying data, and a way to check that it matches the vial. Whether you also test samples yourself is your decision. Our supplier guide shows what a complete record looks like.",
  },
  {
    q: "I already have a store. Where should I start?",
    a: "Start with the problem in front of you: payments, supplier documents, site content or advertising. A site audit shows what to fix first, and the situation picker on our services page suggests an order. You can take one service or several.",
  },
];

const sources = [
  {
    label: "FDA warning letter to Summit Research Peptides, 10 December 2024",
    url: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/summit-research-peptides-695607-12102024",
    checked: "2026-11-17",
  },
  {
    label: "FDA warning letter to Wholesale Peptide, 17 June 2026",
    url: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/wholesale-peptide-729447-06172026",
    checked: "2026-11-17",
  },
  {
    label: "Meta Advertising Standards: Drugs and Pharmaceuticals",
    url: "https://transparency.meta.com/policies/ad-standards/restricted-goods-services/drugs-pharmaceuticals/",
    checked: "2026-11-17",
  },
];

export default function StartPage() {
  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: "How to start a peptide business",
          description,
          path: "/start-a-peptide-business",
          published,
          updated,
          section: "Start a peptide business",
        })}
      />
      <PageHero
        id="start-title"
        crumbs={[{ name: "Start a peptide business", path: "/start-a-peptide-business" }]}
        title={<>How to start a peptide business.</>}
        lead={
          <p>
            To start a research-use-only (RUO) peptide business, decide your model first, then verify your suppliers, build a store that
            describes products accurately, secure payments you can keep, set up fulfillment and add marketing. Take legal advice early. Each
            step below links to a guide or service that goes deeper.
          </p>
        }
        actions={
          <ButtonLink href="/contact" size="lg">
            Tell us where you are
          </ButtonLink>
        }
      >
        <p className="label mt-8 text-ink-soft">
          By the {brand} team. Updated <time dateTime={updated}>{formatDate(updated)}</time>. US focus.
        </p>
      </PageHero>

      <Section labelledBy="start-steps">
        <div className="container-x">
          <Reveal className="border-t border-ink/20 pt-4">
            <h2 id="start-steps" className="display display-md max-w-[22ch]">
              Nine steps from idea to launch.
            </h2>
            <p className="mt-4 max-w-[58ch] text-ink-soft">
              A research-use-only label states an intended use. It does not make a product, a business or its marketing compliant, and no one can
              promise approval, rankings or results. The steps below are in the order most founders need them.
            </p>
          </Reveal>
          <ol className="mt-12 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i % 2} className="border-t border-ink/20 pt-6">
                <span className="font-display text-[0.95rem] font-semibold text-blue">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="heading-sm mt-3">{s.title}</h3>
                <p className="mt-3 max-w-[54ch] text-ink-soft">{s.text}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-blue underline underline-offset-4">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="sky" labelledBy="start-models">
        <div className="container-x">
          <Reveal className="border-t border-ink/20 pt-4">
            <h2 id="start-models" className="display display-md max-w-[24ch]">
              Which business model fits you?
            </h2>
            <p className="mt-4 max-w-[58ch] text-ink-soft">
              Terms such as white label and private label are used differently by different suppliers, so ask each one exactly what you can
              customize before you commit.
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-10 overflow-x-auto" tabIndex={0} role="region" aria-label="Business models compared">
              <table className="w-full min-w-[44rem] border-collapse text-left text-[1rem] leading-snug">
                <caption className="sr-only">Four common peptide business models compared on who holds stock, control and the main watch-out</caption>
                <thead>
                  <tr className="border-y border-ink/25">
                    {["Model", "Who holds the stock", "Your control", "Main watch-out"].map((h) => (
                      <th key={h} scope="col" className="label px-3 py-3 first:pl-0">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {models.map((row) => (
                    <tr key={row[0]} className="border-b border-ink/15 align-top">
                      <th scope="row" className="py-4 pl-0 pr-3 font-display font-bold">
                        {row[0]}
                      </th>
                      {row.slice(1).map((cell) => (
                        <td key={cell} className="px-3 py-4 text-ink-soft">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="start-ready">
        <div className="container-x">
          <Reveal className="border-t border-ink/20 pt-4">
            <h2 id="start-ready" className="display display-md max-w-[24ch]">
              Launch readiness checklist.
            </h2>
            <p className="mt-4 max-w-[58ch] text-ink-soft">
              Answer each question honestly before you apply for payments or send traffic. A &quot;no&quot; tells you what to fix first.
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-10 overflow-x-auto" tabIndex={0} role="region" aria-label="Launch readiness checklist">
              <table className="w-full min-w-[40rem] border-collapse text-left text-[1rem] leading-snug">
                <caption className="sr-only">Eight areas to check before launch, the question for each and where we can help</caption>
                <thead>
                  <tr className="border-y border-ink/25">
                    {["Area", "Question to answer", "Where we help"].map((h) => (
                      <th key={h} scope="col" className="label px-3 py-3 first:pl-0">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {readiness.map((row) => (
                    <tr key={row[0]} className="border-b border-ink/15 align-top">
                      <th scope="row" className="py-4 pl-0 pr-3 font-display font-bold">
                        {row[0]}
                      </th>
                      <td className="px-3 py-4 text-ink-soft">{row[1]}</td>
                      <td className="px-3 py-4">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section labelledBy="start-cost">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="border-t border-ink/20 pt-4">
              <h2 id="start-cost" className="display display-md">
                What it costs and how long it takes.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={1} className="prose-article text-[1.0625rem] lg:col-span-7">
            <p>
              There is no honest single number. What you spend depends on your model, how much stock you hold, how much of the store and the
              labels you have built for you, how you test, and which payment provider accepts you. We do not publish fixed prices, but we can
              list your cost drivers and show where money goes first.
            </p>
            <p>
              Timing depends mainly on two things you do not fully control: supplier documents and payment underwriting. We give no timelines,
              because no one can promise an approval date. Run the store, the labels and the paperwork in parallel so that a delay in one does
              not stall the rest.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="sky" labelledBy="start-mistakes">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="border-t border-ink/20 pt-4">
              <h2 id="start-mistakes" className="display display-md">
                Mistakes we see most often.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={1} className="lg:col-span-7">
            <ul className="divide-y divide-ink/15 border-y border-ink/15">
              {mistakes.map((m) => (
                <li key={m} className="py-4 text-[1.0625rem]">
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <FaqSection id="start-faq" title="Questions founders ask first" items={faqs} />

      <Section pad={false} className="pb-[clamp(3rem,7vw,6rem)]" labelledBy="start-sources">
        <div className="container-x">
          <section aria-labelledby="start-sources" className="border-t border-ink/20 pt-8">
            <h2 id="start-sources" className="label">
              Sources
            </h2>
            <ul className="mt-4 space-y-2 text-[0.95rem]">
              {sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue underline underline-offset-4">
                    {s.label}
                  </a>
                  <span className="text-ink-soft">. Checked {formatDate(s.checked)}.</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.95rem] text-ink-soft">
              This is general information, not legal, regulatory or financial advice. See our{" "}
              <Link href="/editorial-policy" className="text-blue underline underline-offset-4">
                editorial policy
              </Link>{" "}
              for how we check what we publish.
            </p>
          </section>
        </div>
      </Section>

      <CtaBand
        id="start-cta"
        title={<>Starting out? Tell us where you are.</>}
        actions={
          <ButtonLink href="/contact" variant="light" size="lg">
            Tell us what you need
          </ButtonLink>
        }
      >
        <p>A short questionnaire is enough. We read every answer and reply to you directly.</p>
        <p className="mt-4">
          <Link href="/services" className="underline underline-offset-4">
            Browse all services
          </Link>
        </p>
      </CtaBand>
    </>
  );
}
