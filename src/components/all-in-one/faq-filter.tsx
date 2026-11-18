"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/content/types";
import { cn } from "@/lib/utils";

/** Question numbers (1 based) behind each chip. */
const groups = [
  { label: "All", has: () => true },
  { label: "Payments", has: (n: number) => n >= 2 && n <= 12 },
  { label: "Building", has: (n: number) => n === 1 || (n >= 13 && n <= 15) },
  { label: "Telehealth", has: (n: number) => n === 16 || n === 17 },
  { label: "Search & ads", has: (n: number) => n >= 18 && n <= 22 },
  { label: "Pricing & process", has: (n: number) => n >= 23 && n <= 25 },
];

/**
 * All 25 answers are in the server HTML. A chip only hides the questions outside its group in the browser. Native details
 * elements keep the accordion working without JavaScript; the first one starts open.
 */
export function FaqFilter({ items }: { items: Faq[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div role="group" aria-label="Filter questions by topic" className="-mx-5 flex gap-x-6 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {groups.map((g, i) => (
          <button
            key={g.label}
            type="button"
            aria-pressed={active === i}
            onClick={() => setActive(i)}
            className={cn(
              "min-h-11 shrink-0 border-b-2 px-0.5 font-display text-[0.78rem] font-bold uppercase tracking-[0.06em] transition-colors focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-blue",
              active === i ? "border-blue text-ink" : "border-transparent text-ink-soft hover:text-ink",
            )}
          >
            {g.label}
          </button>
        ))}
      </div>
      <div className="border-b border-ink/20">
        {items.map((f, i) => (
          <details key={f.q} open={i === 0} hidden={!groups[active].has(i + 1)} className="aio-faq group border-t border-ink/20">
            <summary className="flex min-h-[3.5rem] cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-[1.05rem] font-bold leading-snug transition-colors group-hover:text-blue focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-blue [&::-webkit-details-marker]:hidden">
              <span>{f.q}</span>
              <Plus aria-hidden className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="max-w-[68ch] pb-5 text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
