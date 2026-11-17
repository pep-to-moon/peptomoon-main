import { ButtonLink, TextLink } from "@/components/ui/button";
import { Reveal, Section } from "@/components/ui/section";
import { getArticle } from "@/content/articles";

const reviews = [
  "Website and product copy, page by page",
  "Disclaimers and notices, and whether they match the rest of the page",
  "Product labelling considerations, raised for your counsel",
  "Marketing claims across site, email, affiliates and social",
  "Documentation: policies, supplier records and review notes",
  "Dated follow-up reviews as rules change",
];

const wont = [
  "We are not a law firm and we do not give legal advice.",
  "We do not issue approvals, certifications or guarantees of compliance.",
  "We do not advise on disguising intent or avoiding regulators.",
  "We do not imply an ordinary RUO retailer qualifies for 503A or 503B.",
];

export function Verify() {
  const guide = getArticle("ruo-label-is-not-a-compliance-strategy");
  return (
    <Section labelledBy="verify-title">
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow border-t border-ink/20 pt-4 w-full">Verify the details</p>
          <h2 id="verify-title" className="display display-xl mt-8 max-w-[20ch]">
            A research-use label is not a compliance strategy.
          </h2>
          <p className="mt-8 max-w-[60ch] text-[1.15rem] text-ink-soft">
            Adding a disclaimer does not make a product, a business or its marketing compliant. How things are described and
            presented matters as much. We review what you have, organise the documentation and work alongside your own
            qualified professionals.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-12 gap-y-12 lg:grid-cols-2">
          <Reveal className="border-t border-ink/20 pt-6">
            <h3 className="heading-sm">What we review</h3>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {reviews.map((r) => (
                <li key={r} className="py-3.5">
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={1} className="border-t border-ink/20 pt-6">
            <h3 className="heading-sm">What we do not do</h3>
            <ul className="mt-6 divide-y divide-line border-y border-line text-ink-soft">
              {wont.map((r) => (
                <li key={r} className="py-3.5">
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <ButtonLink href="/services/compliance-support" size="lg">
            Discuss a content review
          </ButtonLink>
          {guide && <TextLink href={`/resources/${guide.slug}`}>Read: why a label is not a strategy</TextLink>}
        </div>
      </div>
    </Section>
  );
}
