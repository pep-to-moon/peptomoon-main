import type { ComponentType } from "react";
import { CreditCard, FileText, Hammer, Palette, Rocket, Search, TrendingUp, Compass } from "lucide-react";
import { Reveal } from "@/components/ui/section";
import { processSteps } from "@/content/all-in-one";
import { cn } from "@/lib/utils";

const icons: ComponentType<{ className?: string; strokeWidth?: number }>[] = [Compass, Palette, Hammer, CreditCard, FileText, Search, Rocket, TrendingUp];

/**
 * Eight numbered nodes on one line. Desktop: one row of eight, the line drawing left to right. Tablet: two rows of four.
 * Phone: a vertical line on the left. Step 04 carries a branch note, because payments run alongside the build.
 */
export function ProcessTimeline() {
  return (
    <ol className="mt-12 grid gap-y-8 md:grid-cols-4 md:gap-y-12 xl:grid-cols-8">
      {processSteps.map((s, i) => {
        const Icon = icons[i];
        const mdStart = i % 4 === 0;
        const mdEnd = i % 4 === 3;
        return (
          <Reveal as="li" key={s.t} delay={i} className="group relative pl-14 md:px-2 md:pl-0 md:pt-0">
            {/* Horizontal connector, desktop and tablet. Trimmed at the ends of each row. */}
            <span
              aria-hidden
              className={cn(
                "aio-tl-line absolute top-5 hidden h-px bg-ink/25 md:block",
                mdStart ? "md:left-1/2" : "md:left-0",
                mdEnd ? "md:right-1/2" : "md:right-0",
                i === 0 ? "xl:left-1/2" : "xl:left-0",
                i === 7 ? "xl:right-1/2" : "xl:right-0",
              )}
            />
            {/* Vertical connector, phone. */}
            {i < processSteps.length - 1 && <span aria-hidden className="absolute bottom-[-2rem] left-5 top-10 w-px bg-ink/25 md:hidden" />}
            <span className="absolute left-0 top-0 z-10 grid size-10 place-items-center rounded-full bg-white ring-1 ring-blue md:relative md:mx-auto">
              <Icon aria-hidden className="size-[1.15rem] text-blue" strokeWidth={1.5} />
            </span>
            <div className="md:mt-4 md:text-center">
              <span className="font-display text-[0.8rem] font-bold text-blue">{String(i + 1).padStart(2, "0")}</span>
              <p className="font-display font-bold uppercase tracking-[0.04em]">{s.t}</p>
              <p className="mt-1 text-[0.92rem] text-ink-soft">{s.d}</p>
              {i === 3 && (
                <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[0.72rem] font-semibold text-blue ring-1 ring-blue/30">
                  <span aria-hidden className="h-px w-3 bg-blue" />
                  Runs in parallel with the build
                </p>
              )}
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
