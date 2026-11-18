"use client";

import { useEffect, useRef } from "react";

/** How far, and for how long, the strip slides in addition to its own marquee motion. Keep in step with the head script. */
const SLIDE_PX = 1400;
const SLIDE_MS = 2000;
const SLIDE_EASING = "cubic-bezier(0.45, 0.28, 0.4, 1)";
/** The dissolve starts this long after the strip starts moving, when the slide has nearly eased out. */
const EXIT_AT = 1700;
/** If the page is still not ready this long after that, the hand-off begins anyway. */
const SLOW_LOAD_MS = 2600;
/** The wordmark's flight to the header. The CSS fade of the navy and the strip's glide are the same length. */
const EXIT_MS = 1200;

/**
 * The entrance for the home page, and it is built out of the hero itself. On a navy screen the hero's own strip of the
 * six sites we have built runs fast through the middle of the screen, larger than life, easing down to its normal pace,
 * then glides down into its place in the hero and shrinks to its real size while the navy dissolves, the headline lines
 * rise through it, the header fades in, and the wordmark flies up into the header's logo spot and becomes it. Nothing is
 * swapped at the end: the strip that was running across the middle of the screen is the strip that stays in the hero.
 *
 * The speed is a single slide laid over the strip's normal marquee motion (the `translate` property, which the browser
 * runs off the main thread), so it stays smooth while the page is busy loading, and there is no per-frame script. The
 * slide eases out to nothing, leaving the marquee at its normal pace with no stop in between.
 *
 * Whether it runs at all is decided by a tiny script in the document head, before first paint (see src/app/layout.tsx):
 * home page only, once per browser session, never for reduced motion, data-saver connections or automated browsers.
 * That script also centres the strip and starts the slide the moment the strip is parsed, so it is moving from the first
 * paint. Without its html.intro-active class this renders nothing visible. A click or Escape, Enter or Space skips it,
 * and a failsafe in the head clears it after about five seconds whatever happens. The page's text is in the HTML
 * throughout; this layer is decorative and hidden from assistive technology.
 */
export function SiteIntro() {
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const logo = mark.current;
    const html = document.documentElement;
    if (!el || !logo || !html.classList.contains("intro-active")) return;
    try {
      window.sessionStorage.setItem("pm-intro", "1"); // set now, so a quick reload does not replay it
    } catch {
      /* storage can be unavailable; the head script's failsafe still applies */
    }
    window.scrollTo(0, 0);

    const strip = document.querySelector<HTMLElement>("[data-hero-strip]");
    const w = window as unknown as { __introT0?: number };

    // The head script has usually centred the strip and started its slide already, before first paint. This re-measures
    // (the strip's natural place is its current place minus the offset already applied) and nudges it if the fonts moved
    // things a little, and starts the slide itself if the head script did not get to it.
    const centre = () => {
      if (!strip) return;
      const current = parseFloat(html.style.getPropertyValue("--strip-dy")) || 0;
      const r = strip.getBoundingClientRect();
      const dy = window.innerHeight / 2 - (r.top + r.height / 2 - current);
      const on = html.classList.contains("intro-strip-on");
      if (Math.abs(dy - current) > 0.5 || !on) {
        html.style.setProperty("--strip-dy", `${dy}px`);
        if (!on) {
          void strip.offsetWidth; // settle the position before the fade-in starts
          html.classList.add("intro-strip-on");
        }
      }
    };
    centre();
    if (strip && w.__introT0 === undefined) {
      for (const g of strip.querySelectorAll<HTMLElement>(".animate-marquee")) {
        g.animate([{ translate: "0 0" }, { translate: `-${SLIDE_PX}px 0` }], { duration: SLIDE_MS, easing: SLIDE_EASING, fill: "forwards" });
      }
      w.__introT0 = performance.now();
    }
    const t0 = w.__introT0 ?? performance.now();

    let raf = 0;
    let landTimer = 0;
    let done = false;
    let fontsReady = !document.fonts;
    void document.fonts?.ready.then(() => {
      fontsReady = true;
      if (!done) centre();
    });

    const land = () => {
      html.classList.remove("intro-landing", "intro-exit", "intro-skip", "intro-strip-on");
      html.style.removeProperty("--strip-dy");
      el.dataset.phase = "done";
    };

    const finish = (fast = false) => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      if (fast) html.classList.add("intro-skip");
      el.dataset.phase = fast ? "fast" : "exit";
      html.classList.add("intro-ran", "intro-exit");
      html.classList.remove("intro-active"); // the hero's entrance starts now and the strip glides down

      // Measure after the page has settled back to its normal layout (the scrollbar gutter), then fly.
      const target = document.querySelector<HTMLElement>("[data-header-logo] img");
      const from = logo.getBoundingClientRect();
      const to = target?.getBoundingClientRect();
      const fly = !fast && !!to && to.width > 0 && from.width > 0;
      if (fly && to) {
        html.classList.add("intro-landing"); // the header's wordmark waits, the flying one becomes it
        const scale = to.width / from.width;
        const flight = logo.animate(
          [{ transform: "translate(0, 0) scale(1)" }, { transform: `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${scale})` }],
          { duration: EXIT_MS, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" },
        );
        flight.finished.then(land, land);
      } else {
        landTimer = window.setTimeout(land, fast ? 900 : EXIT_MS);
      }
    };

    const tick = (now: number) => {
      if (!html.classList.contains("intro-active")) {
        // The head script's failsafe already cleared it; stop quietly.
        done = true;
        land();
        return;
      }
      const ready = fontsReady && document.readyState === "complete";
      const waited = now - t0;
      if ((ready && waited >= EXIT_AT) || waited > EXIT_AT + SLOW_LOAD_MS) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const skip = () => finish(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") skip();
    };
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) skip(); // coming back through the browser's back button
    };
    el.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pageshow", onShow);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(landTimer);
      el.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pageshow", onShow);
      // Leaving the home page mid-intro must not leave the page locked. React's development double-mount runs this
      // cleanup too, but the overlay is still in the document then, so the check waits one tick and looks.
      window.setTimeout(() => {
        if (!el.isConnected) {
          html.classList.remove("intro-active", "intro-landing", "intro-exit", "intro-skip", "intro-strip-on");
          html.style.removeProperty("--strip-dy");
        }
      }, 0);
    };
  }, []);

  return (
    <div ref={root} className="intro" aria-hidden="true" data-phase="run">
      <div className="intro-panel" />
      <div ref={mark} className="intro-logo">
        {/* eslint-disable @next/next/no-img-element -- decorative, shown for about a second, wants no optimizer round trip */}
        <img className="intro-logo-light" src="/brand/peptomoon-wordmark-intro-light.webp" alt="" width={480} height={137} decoding="async" fetchPriority="high" />
        <img className="intro-logo-dark" src="/brand/peptomoon-wordmark-intro-dark.webp" alt="" width={480} height={137} decoding="async" fetchPriority="low" />
        {/* eslint-enable @next/next/no-img-element */}
      </div>
    </div>
  );
}
