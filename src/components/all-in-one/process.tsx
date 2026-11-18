import { Reveal } from "@/components/ui/section";
import { processSteps } from "@/content/all-in-one";

/** Eight steps down one long line. Large numerals do the pacing; no icons, no cards. */
export function Process() {
  return (
    <ol className="mt-14 border-t border-ink/20">
      {processSteps.map((s, i) => (
        <Reveal as="li" key={s.t} className="grid items-baseline gap-x-8 gap-y-2 border-b border-ink/20 py-6 sm:grid-cols-[6.5rem_minmax(0,16rem)_1fr] lg:grid-cols-[8rem_minmax(0,22rem)_1fr]">
          <span aria-hidden className="font-display text-[clamp(2.4rem,1.5rem+2.4vw,3.8rem)] font-bold leading-none tracking-[-0.03em] tabular-nums text-blue/90">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-[1.35rem] font-bold leading-snug">{s.t}</h3>
          <p className="text-ink-soft">{s.d}</p>
        </Reveal>
      ))}
    </ol>
  );
}
