import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Section } from "@/components/ui/section";

const paths = [
  {
    href: "/start-a-peptide-business",
    kicker: "New founder",
    title: "I'm starting a peptide business",
    text: "A step-by-step map from business model and suppliers to your store, payments, shipping and launch.",
    cta: "Read the founder guide",
  },
  {
    href: "/services",
    kicker: "Existing brand",
    title: "I already run a peptide brand",
    text: "Fix payments, supplier documents, advertising or your website. Pick your situation and see where to start.",
    cta: "Find the right service",
  },
];

/**
 * Two doors near the top of the homepage, because new founders and existing owners search for different things. The
 * founder guide answers "how do I start", and the services page answers "I have this problem".
 */
export function StartHere() {
  return (
    <Section labelledBy="start-title" pad={false} className="pt-[clamp(2.5rem,6vw,5rem)]">
      <div className="container-x">
        <Reveal className="border-t border-ink/20 pt-4">
          <p className="eyebrow">Where are you?</p>
          <h2 id="start-title" className="display display-md mt-5 max-w-[24ch]">
            Start a peptide business, or fix the one you have.
          </h2>
        </Reveal>
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {paths.map((p, i) => (
            <Reveal as="li" key={p.href} delay={i}>
              <Link
                href={p.href}
                className="group flex h-full flex-col rounded-[1.25rem] bg-white p-6 ring-1 ring-ink/10 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-30px_rgba(13,34,54,0.5)] focus-visible:ring-2 focus-visible:ring-blue motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8"
              >
                <span className="label text-blue-deep">{p.kicker}</span>
                <span className="mt-3 font-display text-[clamp(1.4rem,1.1rem+1.2vw,2rem)] font-bold leading-tight">{p.title}</span>
                <span className="mt-3 max-w-[46ch] text-ink-soft">{p.text}</span>
                <span className="mt-auto flex items-center gap-2 pt-6 font-display text-[0.8rem] font-bold uppercase tracking-[0.06em] text-blue">
                  {p.cta}
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-ink-soft">
          Payment account shut down?{" "}
          <Link href="/resources/payment-processor-shut-down-account" className="text-blue underline underline-offset-4">
            Read what to do in the first 72 hours
          </Link>
          .
        </p>
      </div>
    </Section>
  );
}
