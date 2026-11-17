import { Check, ChevronDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { offerings } from "@/content/all-in-one";
import { cn } from "@/lib/utils";
import { softShadow } from "./ui";

const line = "rounded bg-ink/15";

function Browser() {
  return (
    <div className="w-full max-w-[15rem] overflow-hidden rounded-lg bg-white ring-1 ring-line">
      <div className="flex gap-1 border-b border-line px-2 py-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-1.5 rounded-full bg-ink/20" />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5 p-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i}>
            <div className="h-6 rounded bg-sky/70" />
            <div className={cn(line, "mt-1 h-1 w-3/4")} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Phone() {
  return (
    <div className="h-[8.5rem] w-[4.6rem] shrink-0 rounded-xl bg-white p-1.5 ring-1 ring-ink/20">
      <div className="space-y-1.5">
        <div className="h-4 rounded bg-blue" />
        <div className={cn(line, "h-1.5 w-full")} />
        <div className={cn(line, "h-1.5 w-2/3")} />
        <div className="grid grid-cols-2 gap-1 pt-1">
          <span className="h-6 rounded bg-sky/70" />
          <span className="h-6 rounded bg-steel/60" />
        </div>
      </div>
    </div>
  );
}

function Illustration({ kind }: { kind: number }) {
  return (
    <div aria-hidden className="flex h-44 items-center justify-center overflow-hidden rounded-xl bg-sky-soft ring-1 ring-line">
      {kind === 0 && <Browser />}
      {kind === 1 && <Phone />}
      {kind === 2 && (
        <div className="relative flex items-center">
          <div className="origin-right scale-90">
            <Browser />
          </div>
          <div className="-ml-12 mt-6 origin-left scale-90">
            <Phone />
          </div>
        </div>
      )}
    </div>
  );
}

const VISIBLE = 6;

/** Three product-style cards. The first six features show; the rest sit in a details element, always present in the HTML. */
export function OfferingCards() {
  return (
    <div className="mt-10 flex flex-col gap-4 md:snap-x md:snap-mandatory md:flex-row md:overflow-x-auto md:pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
      {offerings.map((o, i) => {
        const featured = o.t === "Combined build";
        const first = o.items.slice(0, VISIBLE);
        const rest = o.items.slice(VISIBLE);
        return (
          <article
            key={o.t}
            className={cn(
              "relative flex flex-col rounded-[1.5rem] p-5 sm:p-6 md:min-w-[22rem] md:snap-start lg:min-w-0",
              featured ? cn("bg-white ring-2 ring-blue", softShadow) : "bg-white ring-1 ring-line",
            )}
          >
            {featured && (
              <span className="absolute right-5 top-0 -translate-y-1/2 rounded-full bg-blue px-3 py-1 font-display text-[0.7rem] font-bold uppercase tracking-[0.06em] text-white">
                {o.tag}
              </span>
            )}
            <Illustration kind={i} />
            <p className="eyebrow mt-5">{o.index}</p>
            <h3 className="mt-1 font-display text-[1.4rem] font-bold uppercase leading-tight">{o.t}</h3>
            {!featured && <span className="label mt-3 w-fit rounded-full bg-sky-soft px-3 py-1 text-blue">{o.tag}</span>}
            <p className="mt-4 text-[0.95rem] text-ink-soft">{o.intro}</p>
            <ul className="mt-4 space-y-2">
              {first.map((t) => (
                <li key={t} className="flex gap-2.5 text-[0.92rem] leading-snug">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-blue" strokeWidth={2.25} />
                  {t}
                </li>
              ))}
            </ul>
            {rest.length > 0 && (
              <details className="group mt-2">
                <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 font-display text-[0.78rem] font-bold uppercase tracking-[0.06em] text-blue [&::-webkit-details-marker]:hidden">
                  Show all features
                  <ChevronDown aria-hidden className="size-4 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="mt-1 space-y-2">
                  {rest.map((t) => (
                    <li key={t} className="flex gap-2.5 text-[0.92rem] leading-snug">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-blue" strokeWidth={2.25} />
                      {t}
                    </li>
                  ))}
                </ul>
              </details>
            )}
            {o.note && <p className="mt-4 text-[0.82rem] text-ink-soft">{o.note}</p>}
            <div className="mt-auto pt-6">
              <ButtonLink href="/contact?topic=all-in-one" variant={featured ? "primary" : "secondary"} className="w-full justify-between">
                Start a project
              </ButtonLink>
            </div>
          </article>
        );
      })}
    </div>
  );
}
