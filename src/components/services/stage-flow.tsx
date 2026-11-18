"use client";

import { motion, useReducedMotion } from "motion/react";

type Stage = { key: string; index: string; label: string; verb: string; blurb: string; count: number };

const dots = ["bg-sky", "bg-steel", "bg-yellow", "bg-blue"];
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The four stages as one journey. A line draws across as the section scrolls into view and each stage rises in turn.
 * The words are in the page's HTML for crawlers and screen readers. Like the site's other scroll reveals, they fade in once
 * scripts load, and reduced-motion visitors see them at once.
 */
export function StageFlow({ stages }: { stages: Stage[] }) {
  const reduced = useReducedMotion() ?? false;
  return (
    <div className="relative">
      <motion.div
        aria-hidden
        initial={{ scaleX: reduced ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: reduced ? 0 : 1.4, ease }}
        style={{ transformOrigin: "left" }}
        className="absolute left-0 right-0 top-[1.1rem] hidden h-px bg-gradient-to-r from-sky via-steel to-yellow lg:block"
      />
      <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
        {stages.map((s, i) => (
          <motion.li
            key={s.key}
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: reduced ? 0 : 0.6, ease, delay: reduced ? 0 : i * 0.12 }}
            className="relative"
          >
            <span className="relative z-10 inline-flex items-center gap-3 bg-sky-soft pr-4 font-display text-[0.95rem] font-semibold text-ink-soft">
              <span aria-hidden className={`size-3 rounded-full ring-4 ring-sky-soft ${dots[i % dots.length]}`} />
              {s.index}
            </span>
            <h3 className="mt-5 font-display text-[1.5rem] font-bold leading-tight">{s.verb}</h3>
            <p className="mt-2 max-w-[30ch] text-ink-soft">{s.blurb}</p>
            <p className="label mt-4 text-blue-deep">
              {s.count} {s.count === 1 ? "service" : "services"}
            </p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
