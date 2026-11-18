"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * A short label that resolves from random characters into its real text the first time it scrolls into view (the
 * idea behind React Bits' Decrypted Text). The real text is always in the HTML, so search engines and screen readers
 * read it as written (the animated copy is hidden from assistive technology and a plain copy stands in); the effect runs on desktop with a mouse, and never for reduced motion.
 */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ok = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const width = el.getBoundingClientRect().width;
        el.style.display = "inline-block";
        el.style.minWidth = `${width}px`; // keeps the line from jumping while characters change
        const start = performance.now();
        const total = 650 + text.length * 22;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / total);
          const settled = Math.floor(t * text.length);
          let out = "";
          for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            out += i < settled || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
          el.textContent = out;
          if (t < 1) raf = requestAnimationFrame(tick);
          else el.textContent = text;
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.8 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = text;
    };
  }, [text]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden>
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
