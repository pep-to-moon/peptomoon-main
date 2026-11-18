import { sendGAEvent } from "@next/third-parties/google";
import { siteConfig } from "@/config/site";

type EventParams = Record<string, string | number | boolean>;

/**
 * Sends a GA4 event when a GA4 ID is configured. Call from client code only.
 * Never pass personal data (names, emails, phone numbers): Google's terms forbid it.
 */
export function trackEvent(name: string, params: EventParams = {}): void {
  if (!siteConfig.analytics.gaId) return;
  sendGAEvent("event", name, params);
}
