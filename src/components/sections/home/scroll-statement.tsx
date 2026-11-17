"use client";

import { Fragment, useRef } from "react";
import { motion, type MotionValue, useScroll, useTransform } from "motion/react";

/**
 * Words fill from grey to solid as you scroll while the statement stays pinned. The pattern comes from the design
 * references (awsmd, fixa, medusmo) and the Magic UI text-reveal component. The text is plain HTML and is fully solid for
 * people who prefer reduced motion.
 */
export function ScrollStatement({ text, label }: { text: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = text.split(" ");

  return (
    <div ref={ref} className="relative h-[210vh] motion-reduce:h-auto motion-reduce:py-[clamp(4rem,9vw,8rem)] lg:h-[240vh]">
      <div className="sticky top-0 flex h-svh items-center motion-reduce:static motion-reduce:h-auto">
        <div className="container-x">
          <p className="eyebrow">{label}</p>
          <p className="mt-8 flex max-w-[62rem] flex-wrap gap-x-[0.28em] gap-y-[0.1em] font-display text-[clamp(1.9rem,0.9rem+3.6vw,4.4rem)] font-bold uppercase leading-[1.04] tracking-[-0.01em] [font-variation-settings:'wdth'_108]">
            {words.map((w, i) => {
              const start = (i / words.length) * 0.85;
              const end = start + 0.9 / words.length;
              return (
                <Fragment key={`${w}-${i}`}>
                  {/* Whitespace between flex items is not rendered, but it keeps the words apart in extracted text. */}
                  {i > 0 ? " " : null}
                  <Word progress={scrollYProgress} range={[start, end]}>
                    {w}
                  </Word>
                </Fragment>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.5, 1]);
  return (
    <motion.span style={{ opacity }} className="motion-reduce:!opacity-100">
      {children}
    </motion.span>
  );
}
