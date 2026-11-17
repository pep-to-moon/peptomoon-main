import type { Notifier } from "./types";

/**
 * WhatsApp notifier: intentionally a no-op until configured. To enable later:
 * 1. Create a WhatsApp Business Cloud API app and an approved message template for new enquiries.
 * 2. Set WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_ACCESS_TOKEN and WHATSAPP_NOTIFY_TO.
 * 3. Implement the send call below (a POST to the Cloud API messages endpoint using the template) and return its id.
 * Business-initiated WhatsApp messages need a template, so this is not guessed at here.
 * The form, the API route and the email path do not change when this is added.
 */
export const whatsappNotifier: Notifier = {
  channel: "whatsapp",
  async send() {
    const configured = Boolean(
      process.env.WHATSAPP_PHONE_NUMBER_ID && process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_NOTIFY_TO,
    );
    if (!configured) return { channel: "whatsapp", ok: false, skipped: true, error: "not_configured" };
    return { channel: "whatsapp", ok: false, skipped: true, error: "not_implemented" };
  },
};
