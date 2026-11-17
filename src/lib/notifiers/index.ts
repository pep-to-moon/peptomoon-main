import type { InquiryValues } from "@/lib/inquiry-schema";
import { emailNotifier } from "./email";
import type { Notifier, NotifyResult } from "./types";
import { whatsappNotifier } from "./whatsapp";

const notifiers: Notifier[] = [emailNotifier, whatsappNotifier];

/** Runs every notifier. The enquiry is accepted only if a primary notifier confirms delivery. */
export async function notifyInquiry(inquiry: InquiryValues): Promise<{ accepted: boolean; results: NotifyResult[] }> {
  const settled = await Promise.allSettled(notifiers.map((n) => n.send(inquiry)));
  const results: NotifyResult[] = settled.map((s, i) =>
    s.status === "fulfilled" ? s.value : { channel: notifiers[i].channel, ok: false, error: "threw" },
  );
  const accepted = notifiers.every((n, i) => !n.primary || results[i].ok);
  return { accepted, results };
}
