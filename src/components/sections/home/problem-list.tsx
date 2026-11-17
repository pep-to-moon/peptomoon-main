"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Problem } from "./problems";

/**
 * Tabs on desktop (list on the left, one large panel on the right, as on mistral.ai) and an accordion on phones.
 * One DOM structure serves both: on large screens the wrappers use display: contents so the buttons and all
 * panels become cells of the same grid, and only the active panel is visible.
 */
export function ProblemList({ problems }: { problems: Problem[] }) {
  const base = useId();
  const [open, setOpen] = useState(0);

  return (
    <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-12">
      {problems.map((p, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const buttonId = `${base}-button-${i}`;
        return (
          <div key={p.n} className="lg:contents">
            <h3 className="lg:col-start-1">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(i)}
                className={cn(
                  "group flex w-full items-center gap-6 border-t py-5 text-left transition-colors duration-300",
                  isOpen ? "border-blue" : "border-ink/20 hover:border-ink/50",
                )}
              >
                <span className={cn("w-7 font-display text-[0.9rem] font-semibold transition-colors", isOpen ? "text-blue" : "text-ink-soft")}>
                  {p.n}
                </span>
                <span className={cn("font-display text-[1.2rem] font-bold leading-tight transition-colors sm:text-[1.4rem]", !isOpen && "text-ink/55 group-hover:text-ink")}>
                  {p.title}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "overflow-hidden transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] lg:col-start-2 lg:row-span-6 lg:row-start-1 lg:min-h-[30rem] lg:border-t lg:border-ink/20",
                isOpen ? "block" : "hidden lg:block lg:pointer-events-none lg:translate-y-3 lg:opacity-0",
              )}
            >
              <div className="flex h-full flex-col pb-6 pt-6 lg:pt-8">
                <p className="eyebrow text-ink-soft">What we see</p>
                <p className="mt-3 max-w-[48ch] text-[1.35rem] leading-snug">{p.see}</p>
                <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                  <div className="border-t border-ink/20 pt-4">
                    <p className="eyebrow text-blue">What we do</p>
                    <p className="mt-3 text-[0.98rem]">{p.do}</p>
                  </div>
                  <div className="border-t border-ink/20 pt-4">
                    <p className="eyebrow text-ink-soft">What we will not promise</p>
                    <p className="mt-3 text-[0.98rem] text-ink-soft">{p.wont}</p>
                  </div>
                </div>
                <Link
                  href={p.href}
                  className="group/link relative mt-auto inline-flex items-center gap-2 pt-8 font-display text-[0.85rem] font-bold uppercase tracking-[0.06em] text-blue"
                >
                  {p.linkLabel}
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
