"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const KEY = "pm-consent";
type Choice = "granted" | "denied" | "unset" | "unknown";

function subscribe(cb: () => void) {
  window.addEventListener("pm-consent", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("pm-consent", cb);
    window.removeEventListener("storage", cb);
  };
}

function snapshot(): Choice {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : "unset";
  } catch {
    return "unset";
  }
}

function useConsent(): Choice {
  return useSyncExternalStore(subscribe, snapshot, () => "unknown");
}

function save(value: "granted" | "denied") {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    /* storage can be unavailable; the banner simply reappears next visit */
  }
  window.dispatchEvent(new Event("pm-consent"));
}

/** Analytics loads only after an explicit opt-in. No analytics ID means nothing loads and no banner shows. */
export function AnalyticsLoader() {
  const choice = useConsent();
  if (!siteConfig.analytics.gaId || choice !== "granted") return null;
  return <GoogleAnalytics gaId={siteConfig.analytics.gaId} />;
}

export function ConsentBanner() {
  const choice = useConsent();
  if (!siteConfig.analytics.gaId || choice !== "unset") return null;
  return (
    <div
      role="region"
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-[1.125rem] bg-white p-5 ring-1 ring-ink/10 sm:p-6"
    >
      <p className="text-[0.95rem]">
        We use analytics cookies only if you agree, to understand which pages help visitors. Read the{" "}
        <Link href="/cookie-policy" className="text-blue underline underline-offset-4">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button onClick={() => save("granted")}>Accept analytics</Button>
        <Button variant="secondary" onClick={() => save("denied")}>
          Decline
        </Button>
      </div>
    </div>
  );
}
