import type { InquiryValues } from "@/lib/inquiry-schema";

export type NotifyResult = {
  channel: string;
  ok: boolean;
  skipped?: boolean;
  id?: string;
  error?: string;
};

/**
 * A notifier delivers one new enquiry to one channel. Email is primary: an enquiry counts as accepted only when
 * the email notifier confirms. Additional channels (for example WhatsApp) run alongside and may skip themselves
 * when they are not configured, so adding one never requires changing the form.
 */
export type Notifier = {
  channel: string;
  primary?: boolean;
  send: (inquiry: InquiryValues) => Promise<NotifyResult>;
};
