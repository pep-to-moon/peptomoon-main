import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import { buildHtml, buildSubject, buildText } from "./email-template";
import { LOGO_ATTACHMENT, LOGO_CID } from "./email-logo";
import { leadRecipients, senderFor } from "./sender";
import type { Notifier, NotifyResult } from "./types";

export const emailNotifier: Notifier = {
  channel: "email",
  primary: true,
  async send(inquiry): Promise<NotifyResult> {
    const key = process.env.RESEND_API_KEY;
    const from = senderFor("leads");
    const to = leadRecipients();
    if (!key || !from || to.length === 0) return { channel: "email", ok: false, error: "not_configured" };
    try {
      const meta = { logoSrc: `cid:${LOGO_CID}`, brand: siteConfig.name, receivedAt: new Date() };
      const resend = new Resend(key);
      const { data, error } = await resend.emails.send({
        from,
        to,
        replyTo: inquiry.email,
        subject: buildSubject(inquiry),
        html: buildHtml(inquiry, meta),
        text: buildText(inquiry, meta),
        attachments: [LOGO_ATTACHMENT],
      });
      if (error || !data?.id) return { channel: "email", ok: false, error: error?.message ?? "no_message_id" };
      return { channel: "email", ok: true, id: data.id };
    } catch (e) {
      return { channel: "email", ok: false, error: e instanceof Error ? e.message : "send_failed" };
    }
  },
};
