import { AlertTriangle, ArrowDown, ArrowRight, Check, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { softShadow } from "./ui";

const vendors = ["Web developer", "Payment broker", "3PL", "Lab", "Marketing agency", "SEO freelancer"];

/** Before and after: six scattered vendors with tangled lines, against the same six functions on one clean panel. */
export function VendorBeforeAfter() {
  return (
    <figure
      aria-label="Without Peptomoon, six vendors work separately and mismatch. With Peptomoon, the same six functions sit on one panel connected to your business."
      className="mt-10 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]"
    >
      <div className="relative rounded-[1.5rem] bg-white p-5 ring-1 ring-line sm:p-6">
        <p className="label text-ink-soft">Without Peptomoon</p>
        <div className="relative mt-5">
          <svg aria-hidden viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-0 size-full text-ink-soft/40" fill="none" stroke="currentColor" strokeWidth={0.5} strokeDasharray="2 2" vectorEffect="non-scaling-stroke">
            <path d="M17 12 L50 30 L83 12 M17 30 L83 48 M17 48 L50 12 L83 30 M50 48 L17 12 M83 48 L50 30" vectorEffect="non-scaling-stroke" />
          </svg>
          <ul className="relative grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3">
            {vendors.map((v, i) => (
              <li
                key={v}
                className={cn(
                  "relative rounded-xl bg-canvas px-3 py-3 text-[0.82rem] font-semibold text-ink-soft ring-1 ring-ink/15",
                  i % 2 ? "sm:translate-y-3" : "sm:-translate-y-1",
                )}
              >
                {v}
                {(i === 1 || i === 4) && (
                  <span className="absolute -right-1.5 -top-2.5 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.04em] text-ink-soft ring-1 ring-ink/20">
                    <AlertTriangle aria-hidden className="size-3" strokeWidth={1.75} />
                    {i === 1 ? "mismatch" : "no owner"}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div aria-hidden className="grid place-items-center text-blue">
        <ArrowRight className="hidden size-7 lg:block" strokeWidth={1.5} />
        <ArrowDown className="size-7 lg:hidden" strokeWidth={1.5} />
      </div>

      <div className={cn("relative rounded-[1.5rem] bg-navy p-5 text-white sm:p-6", softShadow)}>
        <p className="label text-sky">With Peptomoon</p>
        <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {vendors.map((v) => (
            <li key={v} className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-3 text-[0.82rem] font-semibold ring-1 ring-white/20">
              <Check aria-hidden className="size-3.5 shrink-0 text-sky" strokeWidth={2} />
              {v}
            </li>
          ))}
        </ul>
        <div aria-hidden className="mx-auto mt-4 h-6 w-px bg-sky/60" />
        <div className="flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-3 font-display text-[0.8rem] font-bold uppercase tracking-[0.05em] text-ink">
          <Store aria-hidden className="size-4 text-blue" strokeWidth={1.5} />
          Your business
        </div>
      </div>
    </figure>
  );
}
