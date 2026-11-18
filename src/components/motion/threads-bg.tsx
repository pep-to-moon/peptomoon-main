"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import type { ThreadsProps } from "./threads";

// WebGL is loaded only where it is shown, so no page that lacks it pays for the shader code.
const Threads = dynamic(() => import("./threads"), { ssr: false });

const query = "(min-width: 768px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const canRun = () => {
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  return window.matchMedia(query).matches && !saveData;
};

/**
 * A faint animated line field for dark sections. Tablet and desktop only, and skipped on data-saver connections, so
 * phones keep the plain navy. Decorative: hidden from assistive technology and never takes pointer events.
 */
export function ThreadsBg({ className, heightClass = "h-full", ...props }: ThreadsProps & { heightClass?: string }) {
  const on = useSyncExternalStore(subscribe, canRun, () => false);
  if (!on) return null;
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 ${heightClass} ${className ?? ""}`}>
      <Threads {...props} />
    </div>
  );
}
