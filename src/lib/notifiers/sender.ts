import { siteConfig } from "@/config/site";

/**
 * Who our emails come from. RESEND_FROM_EMAIL can be a bare address or "Name <address>". Only the address is used, and the
 * sender name is set here, so every email shows a proper name in the inbox instead of a bare address.
 *
 *   leads   the alert we receive for each enquiry:  "Peptomoon Website <address>"
 *   visitor the confirmation the visitor receives:  "Peptomoon <address>"
 */
export type SenderRole = "leads" | "visitor";

const names: Record<SenderRole, string> = {
  leads: `${siteConfig.name} Website`,
  visitor: siteConfig.name,
};

/** The sending address from RESEND_FROM_EMAIL, or null when it is missing or not a valid address. */
export function senderAddress(raw = process.env.RESEND_FROM_EMAIL): string | null {
  const value = raw?.trim();
  if (!value) return null;
  const address = (value.match(/<([^<>]+)>/)?.[1] ?? value).trim();
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(address) ? address : null;
}

/**
 * Where enquiries are delivered: INQUIRY_TO_EMAIL (one address, or several separated by commas), or inquiry@peptomoon.com
 * when it is empty. To keep a backup copy elsewhere, list both: "inquiry@peptomoon.com,peptomoon@gmail.com".
 */
export function leadRecipients(raw = process.env.INQUIRY_TO_EMAIL): string[] {
  const list = (raw?.trim() ? raw : siteConfig.contact.deliveryFallback)
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
  return list;
}

/** The full "Name <address>" value for the From header, or null when no valid sending address is set. */
export function senderFor(role: SenderRole, raw = process.env.RESEND_FROM_EMAIL): string | null {
  const address = senderAddress(raw);
  return address ? `${names[role]} <${address}>` : null;
}
