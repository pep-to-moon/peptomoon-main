import { Reveal, Section, SectionIntro } from "@/components/ui/section";
import { siteConfig } from "@/config/site";

const rows = [
  ["Industry knowledge", "General e-commerce experience", "Sites built and maintained inside this industry"],
  ["Scope", "One system at a time, handed between vendors", "Website, payments, fulfillment and reporting planned together"],
  ["Documentation", "Left for you to manage", "Treated as data tied to products and batches"],
  ["Compliance", "A disclaimer and a promise", "A review, clear limits and coordination with your counsel"],
  ["After launch", "A handover and a goodbye", "Maintenance, audits and monitoring"],
];

/** A plain comparison table: the honest way to compare, and the least decorated. */
export function WhyUs() {
  return (
    <Section labelledBy="why-title">
      <div className="container-x">
        <SectionIntro label={`Why ${siteConfig.name}`} titleId="why-title" title={<>One accountable team instead of five vendors.</>} />

        <Reveal>
          <div role="table" aria-label={`${siteConfig.name} compared with coordinating several vendors`} className="text-[1.0625rem]">
            <div role="row" className="hidden grid-cols-12 gap-8 border-t border-ink/20 py-4 lg:grid">
              <span role="columnheader" className="label col-span-3 text-ink-soft">
                &nbsp;
              </span>
              <span role="columnheader" className="label col-span-4 text-ink-soft">
                What we often see elsewhere
              </span>
              <span role="columnheader" className="label col-span-5 text-blue">
                {siteConfig.name}
              </span>
            </div>
            {rows.map(([k, a, b]) => (
              <div key={k} role="row" className="grid gap-x-8 gap-y-2 border-t border-ink/20 py-6 lg:grid-cols-12">
                <span role="rowheader" className="font-display text-[1.2rem] font-bold lg:col-span-3">
                  {k}
                </span>
                <span role="cell" className="text-ink-soft lg:col-span-4">
                  <span className="label mr-2 lg:hidden">Elsewhere</span>
                  {a}
                </span>
                <span role="cell" className="font-semibold lg:col-span-5">
                  <span className="label mr-2 text-blue lg:hidden">{siteConfig.name}</span>
                  {b}
                </span>
              </div>
            ))}
            <div className="border-t border-ink/20" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
