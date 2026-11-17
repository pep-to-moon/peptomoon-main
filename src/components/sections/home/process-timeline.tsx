"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

type Step = { n: string; title: string; text: string; need: string };

/** A vertical timeline whose line fills as you scroll, in the manner of the Aceternity tracing beam. */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div className="relative">
      <div aria-hidden className="absolute bottom-0 left-[1.4rem] top-2 w-px bg-line" />
      <motion.div
        aria-hidden
        style={{ scaleY: fill, transformOrigin: "top" }}
        className="absolute bottom-0 left-[1.4rem] top-2 w-[2px] bg-gradient-to-b from-blue via-blue to-sky motion-reduce:!scale-y-100"
      />
      <ol ref={ref} className="space-y-4">
        {steps.map((s) => (
          <li key={s.n} className="relative pl-[4.5rem]">
            <span className="absolute left-0 top-1 grid size-11 place-items-center rounded-full bg-canvas font-display text-[0.9rem] font-bold ring-1 ring-ink/30">
              {s.n}
            </span>
            <div className="border-t border-ink/20 pt-6 pb-4">
              <h3 className="display display-md">{s.title}</h3>
              <p className="mt-3 max-w-[48ch] text-ink-soft">{s.text}</p>
              <p className="mt-4 text-[0.92rem]">
                <span className="eyebrow mr-2 text-blue-deep">We need from you</span>
                <span>{s.need}</span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
