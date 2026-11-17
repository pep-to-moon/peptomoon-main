"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * The dashboard starts tilted back and settles flat as you scroll, while the heading drifts up. This is the
 * "container scroll" pattern popularised by Aceternity, written without the library. Reduced motion gets a flat card.
 */
export function DashboardScroll({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const lift = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <div ref={ref} className="[perspective:1200px]">
      <motion.div style={{ y: lift }} className="motion-reduce:!transform-none">
        {heading}
      </motion.div>
      <motion.div
        style={{ rotateX: rotate, scale, transformOrigin: "center top" }}
        className="mt-12 rounded-[1.5rem] bg-ink/90 p-2.5 sm:p-4 motion-reduce:![transform:none]"
      >
        <div className="overflow-hidden rounded-[1.125rem] bg-white">{children}</div>
      </motion.div>
    </div>
  );
}
