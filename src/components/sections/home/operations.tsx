import { TextLink } from "@/components/ui/button";
import { Section, SectionIntro } from "@/components/ui/section";
import { cn } from "@/lib/utils";

type Step = { name: string; text: string };

/**
 * A numbered ledger: each step has a name and one line on what actually happens, separated by hairline rules.
 * It sits directly on the panel, with no card inside the card.
 */
function Ledger({ caption, steps, note }: { caption: string; steps: Step[]; note: { label: string; text: string } }) {
  return (
    <div>
      <p className="label text-blue-deep">{caption}</p>
      <ol className="mt-4 border-b border-ink/20">
        {steps.map((s, i) => (
          <li key={s.name} className="grid grid-cols-[2.25rem_1fr] items-baseline gap-x-3 border-t border-ink/20 py-3.5">
            <span className="font-display text-[0.85rem] font-semibold tabular-nums text-blue">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="font-display text-[1.1rem] font-bold leading-tight">{s.name}</p>
              <p className="mt-0.5 text-[0.93rem] leading-snug text-ink-soft">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-[0.95rem] leading-snug">
        <span className="label mr-2 text-blue-deep">{note.label}</span>
        {note.text}
      </p>
    </div>
  );
}

const chapters = [
  {
    n: "01",
    title: "Payments that survive scrutiny",
    text: "Underwriting is a document review. We prepare the business and the website for it, choose providers on their terms rather than only their price, integrate checkout properly and watch the numbers afterwards.",
    link: { href: "/services/payment-processing", label: "Payment infrastructure" },
    visual: (
      <Ledger
        caption="From application to payout"
        steps={[
          { name: "Prepare", text: "Review the site, policies and documents a provider will read." },
          { name: "Apply", text: "Describe the business accurately and consistently." },
          { name: "Integrate", text: "Hosted checkout and signed webhooks." },
          { name: "Monitor", text: "Declines, refunds and disputes watched every week." },
          { name: "Reconcile", text: "Payouts matched to orders, refunds and fees." },
        ]}
        note={{ label: "Note", text: "Approval is the provider's decision. We never promise it." }}
      />
    ),
  },
  {
    n: "02",
    title: "Suppliers you can evidence",
    text: "A documentation standard, a review against it and records you can retrieve. We review documents and never invent supplier relationships or results.",
    link: { href: "/services/supplier-verification", label: "Supplier verification" },
    visual: (
      <Ledger
        caption="What every batch is checked for"
        steps={[
          { name: "Batch match", text: "The report, the label and your order carry the same batch number." },
          { name: "Named laboratory", text: "A real, independent laboratory you can contact." },
          { name: "Method and data", text: "A chromatogram and an identity result, not a single figure." },
          { name: "Consistent details", text: "Dates, names and quantities agree across every document." },
          { name: "Records kept", text: "Filed by supplier and batch, and retrievable in minutes." },
        ]}
        note={{ label: "Note", text: "We review documents. We do not test samples unless a project says so." }}
      />
    ),
  },
  {
    n: "03",
    title: "Fulfillment customers can feel",
    text: "Order processing, inventory, shipping integrations and tracking, with a defined route for the exceptions that decide whether customers return.",
    link: { href: "/services/peptide-3pl", label: "3PL and fulfillment" },
    visual: (
      <Ledger
        caption="From order to doorstep"
        steps={[
          { name: "Paid", text: "Payment confirmed before anything ships." },
          { name: "Picked", text: "Stock reserved and picked against one inventory record." },
          { name: "Packed", text: "Packed to the product's handling information." },
          { name: "Shipped", text: "Carrier and service set when the order is placed." },
          { name: "Tracked", text: "Tracking sent to the customer and visible to support." },
          { name: "Delivered", text: "Delivery confirmed and the order closed." },
        ]}
        note={{ label: "Exceptions", text: "Address, delay, damage and return each have a defined route." }}
      />
    ),
  },
];

export function Operations() {
  return (
    <Section labelledBy="ops-title">
      <div className="container-x">
        <SectionIntro label="Run the operation" titleId="ops-title" title={<>Peptide payments, supplier checks and fulfillment that hold up under pressure.</>}>
          <p>Three systems where businesses in this industry most often get hurt.</p>
        </SectionIntro>
        <div className="space-y-6 pb-[10vh]">
          {chapters.map((c, i) => (
            <article
              key={c.n}
              className={cn(
                "grid gap-8 rounded-[1.25rem] border border-ink/10 bg-sky-soft p-7 sm:p-12 lg:sticky lg:min-h-[26rem] lg:grid-cols-12 lg:gap-16",
              )}
              style={{ top: `calc(6.5rem + ${i * 1.25}rem)` }}
            >
              <div className="flex flex-col lg:col-span-5">
                <span className="font-display text-[5rem] font-bold leading-none text-blue lg:text-[7rem]">{c.n}</span>
                <h3 className="display display-md mt-auto pt-6">{c.title}</h3>
                <p className="mt-4 max-w-[48ch] text-[1.02rem]">{c.text}</p>
                <div className="mt-6">
                  <TextLink href={c.link.href}>{c.link.label}</TextLink>
                </div>
              </div>
              <div className="flex items-center lg:col-span-7">
                <div className="w-full">{c.visual}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
