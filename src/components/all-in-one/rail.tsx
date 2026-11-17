"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stops = [
  { id: "overview", label: "Overview" },
  { id: "payments", label: "Payments" },
  { id: "services", label: "Services" },
  { id: "offerings", label: "Builds" },
  { id: "search", label: "Search" },
  { id: "compare", label: "Compare" },
  { id: "process", label: "Process" },
  { id: "faq", label: "FAQ" },
];

/** Slim progress rail on wide screens. The section nearest the middle of the viewport is the active one. */
export function SectionRail() {
  const [active, setActive] = useState("overview");
  useEffect(() => {
    const els = stops.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => e !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Page sections" className="fixed left-2 top-1/2 z-30 hidden -translate-y-1/2 xl:block 2xl:left-6">
      <ul className="space-y-1">
        {stops.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className="group flex min-h-8 items-center gap-3 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              <span
                aria-hidden
                className={cn("size-2.5 rounded-full ring-1 transition-all", active === s.id ? "scale-125 bg-blue ring-blue" : "bg-white ring-ink/30 group-hover:ring-blue")}
              />
              <span
                className={cn(
                  "rounded-full bg-white px-2.5 py-0.5 font-display text-[0.68rem] font-bold uppercase tracking-[0.06em] text-ink ring-1 ring-line transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100",
                  "opacity-0 shadow-sm",
                )}
              >
                {s.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Phone-only bar. It appears once the hero has scrolled away and hides again while the closing call to action is on screen. */
export function MobileStickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("overview");
    const end = document.getElementById("aio-cta");
    const ios: IntersectionObserver[] = [];
    if (hero) {
      const io = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0));
      io.observe(hero);
      ios.push(io);
    }
    if (end) {
      const io = new IntersectionObserver(([e]) => setAtEnd(e.isIntersecting));
      io.observe(end);
      ios.push(io);
    }
    return () => ios.forEach((i) => i.disconnect());
  }, []);
  const show = pastHero && !atEnd;
  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-white/95 px-3 pt-3 backdrop-blur transition-transform duration-300 md:hidden",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        show ? "translate-y-0" : "translate-y-full",
      )}
    >
      <ButtonLink href="/contact?topic=all-in-one" size="md" className="flex-1 justify-between">
        Start a project
      </ButtonLink>
      <ButtonLink href="#payments" size="md" variant="secondary" arrow={false} className="flex-1">
        Check eligibility
      </ButtonLink>
    </div>
  );
}
