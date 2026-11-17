import { Check, Minus, X } from "lucide-react";
import { vendorCompare } from "@/content/all-in-one";
import { cn } from "@/lib/utils";

type Status = "yes" | "partial" | "no";

const noValues = new Set(["No", "Often restricted for this category", "Separate agency", "Separate contract", "Your responsibility"]);
const statusOf = (v: string): Status => (v === "Yes" || v === "Built in" || v === "Reviewed" || v === "Included foundation" ? "yes" : noValues.has(v) ? "no" : "partial");

function Cell({ v, us = false }: { v: string; us?: boolean }) {
  const s: Status = us ? "yes" : statusOf(v);
  const Icon = s === "yes" ? Check : s === "no" ? X : Minus;
  return (
    <span className="flex items-start gap-2">
      <Icon
        aria-hidden
        strokeWidth={2.25}
        className={cn("mt-0.5 size-4 shrink-0", s === "yes" ? "text-blue" : s === "no" ? "text-ink-soft/60" : "text-steel")}
      />
      <span className={cn(us ? "font-semibold text-blue" : "text-ink-soft")}>{v}</span>
    </span>
  );
}

/**
 * Comparison matrix. The Peptomoon column is tinted and capped. Icons sit beside the words, never in place of them.
 * Narrow screens scroll sideways inside the table with the first column pinned; wider screens keep a sticky header.
 */
export function ComparisonMatrix() {
  return (
    <div className="relative mt-8">
      <div className="overflow-x-auto rounded-[1.25rem] bg-white ring-1 ring-line lg:overflow-visible" tabIndex={0} role="region" aria-label="All-in-one vs separate vendors vs DIY">
        <table className="w-full min-w-[46rem] border-separate border-spacing-0 text-left text-[0.95rem] leading-snug">
          <caption className="sr-only">Peptomoon all-in-one compared with separate vendors and a DIY hosted platform</caption>
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 top-0 z-20 rounded-tl-[1.25rem] bg-white py-3 pl-4 pr-3 lg:top-20">
                <span className="sr-only">Feature</span>
              </th>
              <th scope="col" className="sticky top-0 z-10 bg-sky-soft px-3 pb-3 pt-0 align-bottom lg:top-20">
                <span className="mb-2 block w-fit -translate-y-px rounded-b-lg bg-blue px-3 py-1 font-display text-[0.65rem] font-bold uppercase tracking-[0.08em] text-white">
                  Recommended
                </span>
                <span className="label text-blue">Peptomoon all-in-one</span>
              </th>
              <th scope="col" className="label sticky top-0 z-10 bg-white px-3 py-3 lg:top-20">
                Separate vendors
              </th>
              <th scope="col" className="label sticky top-0 z-10 rounded-tr-[1.25rem] bg-white px-3 py-3 lg:top-20">
                DIY hosted platform
              </th>
            </tr>
          </thead>
          <tbody>
            {vendorCompare.map(([k, us, vendors, diy], i) => {
              const last = i === vendorCompare.length - 1;
              const b = last ? "" : "border-b border-line";
              return (
                <tr key={k} className="align-top">
                  <th scope="row" className={cn("sticky left-0 z-10 bg-white py-3.5 pl-4 pr-3 font-medium", b, last && "rounded-bl-[1.25rem]")}>
                    {k}
                  </th>
                  <td className={cn("bg-sky-soft px-3 py-3.5", b)}>
                    <Cell v={us} us />
                  </td>
                  <td className={cn("px-3 py-3.5", b)}>
                    <Cell v={vendors} />
                  </td>
                  <td className={cn("px-3 py-3.5", b)}>
                    <Cell v={diy} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-8 rounded-r-[1.25rem] bg-gradient-to-l from-canvas to-transparent lg:hidden" />
    </div>
  );
}
