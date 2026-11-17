import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import type { InquiryValues } from "@/lib/inquiry-schema";
import { buildConfirmationHtml, buildConfirmationSubject, buildConfirmationText } from "./confirmation-template";
import { LOGO_ATTACHMENT, LOGO_CID } from "./email-logo";
import { senderFor } from "./sender";
import type { NotifyResult } from "./types";

/**
 * Sends the "we have your enquiry" confirmation to the person who filled in the form.
 *
 * This is best effort. By the time it runs the enquiry has already reached us, so a failure here (for example a test
 * sender that can only deliver to the account owner) never changes what the visitor sees. Replies go to our own mailbox.
 */
export async function sendConfirmation(inquiry: InquiryValues): Promise<NotifyResult> {
  const key = process.env.RESEND_API_KEY;
  const from = senderFor("visitor");
  if (!key || !from) return { channel: "confirmation", ok: false, error: "not_configured" };
  try {
    const meta = { logoSrc: `cid:${LOGO_CID}`, brand: siteConfig.name, siteUrl: siteConfig.url, replyEmail: siteConfig.contact.email };
    const { data, error } = await new Resend(key).emails.send({
      from,
      to: [inquiry.email],
      replyTo: siteConfig.contact.email,
      subject: buildConfirmationSubject(),
      html: buildConfirmationHtml(inquiry, meta),
      text: buildConfirmationText(inquiry, meta),
      attachments: [LOGO_ATTACHMENT],
      // Marks this as an automatic message, so other auto-responders do not answer it.
      headers: { "Auto-Submitted": "auto-replied" },
    });
    if (error || !data?.id) return { channel: "confirmation", ok: false, error: error?.message ?? "no_message_id" };
    return { channel: "confirmation", ok: true, id: data.id };
  } catch (e) {
    return { channel: "confirmation", ok: false, error: e instanceof Error ? e.message : "send_failed" };
  }
}
