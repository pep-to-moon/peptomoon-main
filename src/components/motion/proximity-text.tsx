"use client";

import { useEffect, useRef } from "react";

/**
 * Headline letters grow heavier and a little wider as the mouse passes near them (the idea behind React Bits'
 * Variable Proximity; Saira is a variable font, so one file does it). Each letter's width is locked when the effect
 * starts, so the heavier glyphs never push their neighbours and the page never shifts. Desktop with a mouse only. The
 * letters are hidden from assistive technology, so the HEADING that contains this component must carry the full text
 * as its aria-label (aria-label is not allowed on a plain span). Everything is plain text without the effect.
 */
export function ProximityText({ text, radius = 170 }: { text: string; radius?: number }) {
  const root = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ok = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;

    let cancelled = false;
    let raf = 0;
    let mx = -9999;
    let my = -9999;
    let letters: HTMLElement[] = [];

    const lock = () => {
      letters = Array.from(el.querySelectorAll<HTMLElement>("[data-l]"));
      for (const l of letters) {
        l.style.width = "";
        l.style.display = "inline-block";
      }
      const widths = letters.map((l) => l.getBoundingClientRect().width);
      letters.forEach((l, i) => {
        l.style.width = `${widths[i]}px`;
        l.style.textAlign = "center";
      });
    };
    void document.fonts?.ready.then(() => !cancelled && lock());

    const paint = () => {
      raf = 0;
      let active = false;
      for (const l of letters) {
        const r = l.getBoundingClientRect();
        const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2));
        const k = Math.max(0, 1 - d / radius);
        const eased = k * k * (3 - 2 * k);
        if (eased > 0.001) active = true;
        l.style.fontVariationSettings = eased > 0.001 ? `"wght" ${Math.round(600 + eased * 240)}, "wdth" ${Math.round(104 + eased * 10)}` : "";
      }
      if (active) raf = requestAnimationFrame(paint);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onResize = () => lock();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [radius]);

  return (
    <span ref={root} aria-hidden>
      {text.split(" ").map((word, wi, words) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {[...word].map((ch, ci) => (
            <span key={ci} data-l>
              {ch}
            </span>
          ))}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
