"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * A heading whose lines rise out of a mask as it scrolls into view (GSAP SplitText). Desktop with a mouse only, and
 * only for headings that start below the fold. Everywhere else it is an ordinary heading that fades up like the
 * rest of the page, so nothing is ever hidden when the effect cannot run.
 */
export function SplitHeading({
  as: Tag = "h2",
  id,
  className,
  children,
}: {
  as?: ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!desktop || reduce) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return; // already on screen: the plain fade handles it

    let cancelled = false;
    let revert: (() => void) | undefined;
    void (async () => {
      const [{ default: gsap }, { SplitText }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/SplitText"),
        import("gsap/ScrollTrigger"),
      ]);
      await document.fonts?.ready;
      if (cancelled) return;
      gsap.registerPlugin(SplitText, ScrollTrigger);
      const ctx = gsap.context(() => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self: { lines: Element[] }) => {
            const tween = gsap.from(self.lines, {
              yPercent: 108,
              duration: 1.05,
              ease: "expo.out",
              stagger: 0.09,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
            el.classList.add("is-in"); // the lines now carry the entrance, so skip the whole-block fade
            return tween;
          },
        });
      }, el);
      revert = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <Tag ref={ref} id={id} data-reveal="" className={className}>
      {children}
    </Tag>
  );
}
