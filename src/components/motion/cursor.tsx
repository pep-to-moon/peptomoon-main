"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = 'a[href], button, summary, [role="button"], label[for], select, [data-cursor]';
const TEXT_FIELD = 'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]), textarea';

/**
 * A soft ring that trails the mouse. It grows over links and buttons, names what a photo does ("View") and steps
 * aside over text fields. Mouse devices only, off for reduced motion, and the normal pointer is never hidden.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ring.current;
    const text = label.current;
    if (!fine || reduce || !el || !text) return;

    let tx = -100;
    let ty = -100;
    let x = -100;
    let y = -100;
    let raf = 0;
    const loop = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (el.dataset.state === "off") el.dataset.state = "idle";
      tx = e.clientX;
      ty = e.clientY;
      wake();
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      if (target.closest(TEXT_FIELD)) {
        el.dataset.state = "off";
        return;
      }
      const hit = target.closest<HTMLElement>(INTERACTIVE);
      const word = hit?.dataset.cursor ?? "";
      text.textContent = word;
      el.dataset.state = word ? "label" : hit ? "link" : "idle";
    };
    const onLeave = () => {
      el.dataset.state = "off";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ring} aria-hidden data-state="off" className="cursor-ring">
      <span ref={label} />
    </div>
  );
}
