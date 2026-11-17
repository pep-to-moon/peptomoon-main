import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import { serviceLabels, statusLabels, type InquiryValues } from "@/lib/inquiry-schema";
import type { Notifier, NotifyResult } from "./types";

const who = (i: InquiryValues) => (i.business ? `${i.name} (${i.business})` : i.name);

function buildText(i: InquiryValues): string {
  return [
    `New enquiry from ${who(i)}`,
    "",
    `Situation: ${i.status ? statusLabels[i.status] : "not given"}`,
    `Services: ${i.services.map((s) => serviceLabels[s]).join(", ")}`,
    `Website: ${i.websiteUrl || "not given"}`,
    "",
    "Notes:",
    i.requirements || "not given",
    ...(i.challenges ? ["", "Current challenges:", i.challenges] : []),
    "",
    `Email: ${i.email}`,
    `Consent to be contacted: ${i.consent ? "yes" : "no"}`,
  ].join("\n");
}

export const emailNotifier: Notifier = {
  channel: "email",
  primary: true,
  async send(inquiry): Promise<NotifyResult> {
    const key = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const to = process.env.INQUIRY_TO_EMAIL || siteConfig.contact.email;
    if (!key || !from || !to) return { channel: "email", ok: false, error: "not_configured" };
    try {
      const resend = new Resend(key);
      const { data, error } = await resend.emails.send({
        from,
        to,
        replyTo: inquiry.email,
        subject: `New enquiry: ${inquiry.business || inquiry.name}`,
        text: buildText(inquiry),
      });
      if (error || !data?.id) return { channel: "email", ok: false, error: error?.message ?? "no_message_id" };
      return { channel: "email", ok: true, id: data.id };
    } catch (e) {
      return { channel: "email", ok: false, error: e instanceof Error ? e.message : "send_failed" };
    }
  },
};
