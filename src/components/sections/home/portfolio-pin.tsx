"use client";

import { useEffect, useRef } from "react";
import { ProjectCard } from "@/components/portfolio/project-card";
import type { PortfolioItem } from "@/content/types";

/**
 * Full-bleed portfolio. On large screens with motion allowed the section pins and the cards slide sideways as you
 * scroll (as on the motorium and medusmo references). Everywhere else it is a native horizontal swipe row.
 * Keyboard focus on a card scrolls the page to the matching position, so nothing is ever unreachable.
 */
export function PortfolioPin({ items }: { items: PortfolioItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let revert = () => {};

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      // matchMedia sets the pin up when the screen qualifies and tears it down again when it stops qualifying
      // (a resized window, a rotated tablet), so a narrow screen can never be left with the desktop pin.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const rootEl = root.current;
        const trackEl = track.current;
        if (!rootEl || !trackEl) return;
        rootEl.classList.add("is-pinned");

        const distance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth + 120);
        const tween = gsap.to(trackEl, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: rootEl,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const onFocus = (e: FocusEvent) => {
          const st = tween.scrollTrigger;
          const card = (e.target as HTMLElement).closest<HTMLElement>("[data-card]");
          if (!st || !card) return;
          const progress = Math.min(1, Math.max(0, (card.offsetLeft - 80) / Math.max(1, distance())));
          window.scrollTo({ top: st.start + (st.end - st.start) * progress });
        };
        rootEl.addEventListener("focusin", onFocus);
        ScrollTrigger.refresh();

        return () => {
          rootEl.removeEventListener("focusin", onFocus);
          rootEl.classList.remove("is-pinned");
          gsap.set(trackEl, { clearProps: "transform" });
          requestAnimationFrame(() => ScrollTrigger.refresh());
        };
      });
      revert = () => mm.revert();
    })();

    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  return (
    <div ref={root} className="pin-root relative">
      <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow">Our work</p>
          <h2 id="portfolio-title" className="display display-lg mt-5">
            RUO stores built by our partner.
          </h2>
        </div>
        <p className="text-[1.05rem] text-ink-soft lg:col-span-4">
          Our partner has designed and built websites for brands operating in the RUO peptide and
          research-product space. A selection of live work is below.
        </p>
      </div>

      <div
        className="hscroll mt-6 snap-x snap-proximity overflow-x-auto overscroll-x-contain scroll-pl-[clamp(1rem,0.4rem+2.6vw,2.75rem)] lg:[.is-pinned_&]:snap-none lg:[.is-pinned_&]:overflow-visible"
        tabIndex={-1}
      >
        <div
          ref={track}
          className="flex w-max items-start gap-5 px-[clamp(1rem,0.4rem+2.6vw,2.75rem)] pb-4 will-change-transform sm:gap-8"
        >
          {items.map((item, i) => (
            <ProjectCard
              key={item.slug}
              item={item}
              priority={i < 2}
              sizes="(min-width: 1024px) 672px, (min-width: 640px) 544px, 82vw"
              className="w-[82vw] shrink-0 sm:w-[34rem] lg:w-[clamp(26rem,calc((100svh-32rem)*16/9),40rem)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
