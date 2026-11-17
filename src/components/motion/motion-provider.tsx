"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Progressive motion layer.
 * - Reveals use IntersectionObserver only (no library) and run on every device.
 * - GSAP ScrollTrigger and Lenis load only on desktop pointer devices without reduced motion.
 * - Content is visible by default. See the .js [data-reveal] rules in globals.css and the failsafe in layout.tsx.
 */
export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    // Content that appears after the first render (client-only sections) is picked up here, so it can never stay hidden.
    const whenAdded = (apply: (el: HTMLElement) => void) => {
      const mo = new MutationObserver((records) => {
        for (const r of records) {
          r.addedNodes.forEach((node) => {
            if (!(node instanceof HTMLElement)) return;
            if (node.matches("[data-reveal]")) apply(node);
            node.querySelectorAll<HTMLElement>("[data-reveal]").forEach(apply);
          });
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
      return mo;
    };

    if (reduce) {
      targets.forEach((el) => el.classList.add("is-in"));
      root.classList.add("motion-ready");
      const mo = whenAdded((el) => el.classList.add("is-in"));
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    targets.forEach((el) => io.observe(el));
    const mo = whenAdded((el) => io.observe(el));
    root.classList.add("motion-ready");

    let cancelled = false;
    let teardown: () => void = () => {};

    const desktop = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches;
    if (desktop) {
      const start = async () => {
        const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({ anchors: true, lerp: 0.11 });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax) || 6;
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        teardown = () => {
          gsap.ticker.remove(tick);
          ScrollTrigger.getAll().forEach((t) => t.kill());
          lenis.destroy();
        };
        ScrollTrigger.refresh();
      };
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
      if (idle) idle(() => void start());
      else setTimeout(() => void start(), 200);
    }

    return () => {
      cancelled = true;
      mo.disconnect();
      io.disconnect();
      teardown();
    };
  }, [pathname]);

  return null;
}
