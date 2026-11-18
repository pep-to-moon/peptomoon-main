"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Hovering an item that carries data-preview="<image address>" floats that photograph beside the cursor, easing toward
 * the pointer (in the spirit of the React Bits image-trail and flowing-menu effects). Mouse only and off for reduced
 * motion. The photograph is decorative, so it is hidden from assistive technology and nothing depends on it.
 */
export function HoverPreview({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = wrap.current;
    const el = box.current;
    const pic = img.current;
    if (!fine || reduce || !root || !el || !pic) return;

    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    let shown = false;
    const loop = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const show = (on: boolean) => {
      if (shown === on) return;
      shown = on;
      el.dataset.on = String(on);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const hit = (e.target as Element | null)?.closest<HTMLElement>("[data-preview]");
      if (!hit || !root.contains(hit)) {
        show(false);
        return;
      }
      const src = hit.dataset.preview ?? "";
      if (src && !pic.src.endsWith(src)) pic.src = src;
      if (!shown) {
        x = tx = e.clientX + 28;
        y = ty = e.clientY - 90;
      }
      tx = e.clientX + 28;
      ty = Math.min(window.innerHeight - 260, Math.max(12, e.clientY - 90));
      show(true);
      wake();
    };
    const onLeave = () => show(false);

    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrap}>
      {children}
      <div ref={box} aria-hidden data-on="false" className="hover-preview">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative, sized by CSS, loaded on demand */}
        <img ref={img} alt="" width={640} height={480} decoding="async" />
      </div>
    </div>
  );
}
