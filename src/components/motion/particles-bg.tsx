"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import type { ParticlesProps } from "./particles";

// WebGL is loaded only where it is shown, so no page that lacks it pays for the shader code.
const Particles = dynamic(() => import("./particles"), { ssr: false });

const query = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const canRun = () => {
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  return window.matchMedia(query).matches && !saveData;
};

// While the home page's intro is on screen (and while it hands over) the hero is covered or still arriving, so the
// field waits and starts once the page is settled.
const introBusy = () => {
  const c = document.documentElement.classList;
  return c.contains("intro-active") || c.contains("intro-exit");
};
const subscribeIntro = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => mo.disconnect();
};

/**
 * A drifting field of particles. Tablet and desktop only, off for reduced motion and data-saver connections, and
 * decorative: hidden from assistive technology and never takes pointer events.
 */
export function ParticlesBg({ className, heightClass = "h-full", ...props }: ParticlesProps & { heightClass?: string }) {
  const on = useSyncExternalStore(subscribe, canRun, () => false);
  const waiting = useSyncExternalStore(subscribeIntro, introBusy, () => false);
  if (!on || waiting) return null;
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 ${heightClass} ${className ?? ""}`}>
      <Particles {...props} />
    </div>
  );
}
