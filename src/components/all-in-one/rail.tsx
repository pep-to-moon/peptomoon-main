"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Phone-only bar. It appears once the hero has scrolled away and hides again while the closing call to action is on screen.
 * (The side dot rail that used to sit here was removed: on wide screens it crowded the page edge and the dark panels.)
 */
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
