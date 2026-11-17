import { Reveal } from "@/components/ui/section";
import { ScrollStatement } from "./scroll-statement";

const frictions = [
  {
    title: "Underwriting reads your website.",
    text: "Payment reviewers look at product copy, policies and notices before they decide. Inconsistencies cost time, and sometimes the account.",
  },
  {
    title: "Documentation is part of the product.",
    text: "Batch records and laboratory reports have to be findable, current and consistent with what the page says.",
  },
  {
    title: "Content rules shape every page.",
    text: "A research-use label does not settle how a product is treated. The whole presentation counts, including FAQs and emails.",
  },
];

export function Statement() {
  return (
    <section aria-labelledby="statement-title" className="relative">
      <h2 id="statement-title" className="sr-only">
        Why generic stores do not work for RUO peptide businesses
      </h2>
      <ScrollStatement
        label="Why generic does not work"
        text="Generic stores are built for generic problems. This industry has its own constraints, and they show up in the details: how a product is described, how a document is shown, how a payment is reviewed."
      />
      <div className="container-x pb-[clamp(4rem,9vw,8rem)]">
        <ul className="grid gap-x-10 gap-y-10 lg:grid-cols-3">
          {frictions.map((f, i) => (
            <Reveal as="li" delay={i} key={f.title} className="border-t border-ink/20 pt-6">
              <h3 className="heading-sm">{f.title}</h3>
              <p className="mt-3 max-w-[40ch] text-ink-soft">{f.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
