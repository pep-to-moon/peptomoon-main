import { serviceLabels, type InquiryValues } from "@/lib/inquiry-schema";
import { BLUE, BLUE_DEEP, CANVAS, FONT, INK, LINE, NAVY, OUTER, SKY_SOFT, SOFT, esc } from "./email-template";

/**
 * The confirmation the person who filled in the form receives straight away. It is short on purpose: it says we have
 * the enquiry, that a person is reviewing it, and points to our work while they wait.
 *
 * It repeats only the services they ticked (fixed labels), never their free-text answers, so the form cannot be used to
 * send arbitrary text to someone else's inbox. Everything dynamic is escaped.
 */

export type ConfirmationMeta = {
  /** Where the logo image comes from: `cid:...` for the inline attachment, or a full image address. */
  logoSrc: string;
  /** The brand name shown in the header and footer. */
  brand: string;
  /** Public address of the site, used for the links. */
  siteUrl: string;
  /** The address replies are sent to. */
  replyEmail: string;
};

const firstName = (i: InquiryValues) => (i.name.split(/\s+/)[0] || "there").slice(0, 40);
const base = (m: ConfirmationMeta) => m.siteUrl.replace(/\/+$/, "");

const links = [
  { title: "Case studies", text: "A selection of the sites we have designed, built and maintain.", path: "/case-studies" },
  { title: "Services", text: "Websites, payments, search, audits and the rest of what we do.", path: "/services" },
  { title: "Guides", text: "Sourced guides on payments, store architecture and search for peptide businesses.", path: "/resources" },
] as const;

export function buildConfirmationSubject(): string {
  return "We have received your enquiry";
}

export function buildConfirmationHtml(i: InquiryValues, meta: ConfirmationMeta): string {
  const root = base(meta);
  const name = firstName(i);
  const chips = i.services
    .map((s) => `<span style="display:inline-block;margin:0 6px 8px 0;padding:8px 14px;border-radius:999px;background:${SKY_SOFT};border:1px solid #cfe6f0;font:600 13px ${FONT};color:${BLUE_DEEP};">${esc(serviceLabels[s])}</span>`)
    .join("");

  const linkRows = links
    .map(
      (l) => `<tr><td style="padding:14px 0;border-top:1px solid ${LINE};">
        <a href="${esc(root + l.path)}" style="font:700 15px ${FONT};color:${BLUE};text-decoration:underline;">${l.title}</a>
        <div style="padding-top:4px;font:400 14px/1.5 ${FONT};color:${SOFT};">${l.text}</div>
      </td></tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(buildConfirmationSubject())}</title>
</head>
<body style="margin:0;padding:0;background:${OUTER};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">Our team is reviewing it now and will reply by email shortly.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${OUTER};">
<tr><td align="center" style="padding:28px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:${CANVAS};border:1px solid ${LINE};border-radius:18px;overflow:hidden;">

    <tr><td style="background:${NAVY};padding:24px 32px;">
      <img src="${esc(meta.logoSrc)}" width="150" alt="${esc(meta.brand)}" style="display:block;border:0;height:auto;font:700 18px ${FONT};color:#ffffff;">
    </td></tr>

    <tr><td style="padding:34px 32px 8px;">
      <div style="font:600 12px ${FONT};letter-spacing:0.12em;text-transform:uppercase;color:${BLUE};">Enquiry received</div>
      <div style="padding-top:10px;font:700 30px/1.15 ${FONT};color:${INK};">Thanks, ${esc(name)}. We have your enquiry.</div>
      <div style="padding-top:16px;font:400 16px/1.6 ${FONT};color:${INK};">Our team is reviewing it now and will reply to you by email shortly. There is nothing more you need to do.</div>
    </td></tr>

    <tr><td style="padding:22px 32px 6px;">
      <div style="font:600 11px ${FONT};letter-spacing:0.1em;text-transform:uppercase;color:${SOFT};padding-bottom:10px;">What you asked about</div>
      <div>${chips}</div>
    </td></tr>

    <tr><td style="padding:18px 32px 6px;">
      <div style="font:600 11px ${FONT};letter-spacing:0.1em;text-transform:uppercase;color:${SOFT};padding-bottom:6px;">While you wait</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid ${LINE};">${linkRows}</table>
    </td></tr>

    <tr><td style="padding:22px 32px 30px;">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="background:${BLUE};border-radius:999px;"><a href="${esc(root + "/case-studies")}" style="display:inline-block;white-space:nowrap;padding:15px 28px;font:700 13px ${FONT};letter-spacing:0.08em;text-transform:uppercase;color:#ffffff;text-decoration:none;">See our work</a></td>
      </tr></table>
      <div style="padding-top:18px;font:400 14px/1.6 ${FONT};color:${SOFT};">Want to add something? Reply to this email and it will reach our team at <a href="mailto:${esc(meta.replyEmail)}" style="color:${BLUE};text-decoration:underline;">${esc(meta.replyEmail)}</a>.</div>
    </td></tr>

    <tr><td style="background:#ffffff;border-top:1px solid ${LINE};padding:18px 32px;font:400 12px/1.6 ${FONT};color:${SOFT};">
      You are receiving this message because this email address was used in the contact form on <a href="${esc(root)}" style="color:${SOFT};text-decoration:underline;">${esc(meta.brand)}</a>. If that was not you, you can ignore it.
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>`;
}

export function buildConfirmationText(i: InquiryValues, meta: ConfirmationMeta): string {
  const root = base(meta);
  return [
    `Thanks, ${firstName(i)}. We have your enquiry.`,
    "",
    "Our team is reviewing it now and will reply to you by email shortly. There is nothing more you need to do.",
    "",
    "WHAT YOU ASKED ABOUT",
    ...i.services.map((s) => `- ${serviceLabels[s]}`),
    "",
    "WHILE YOU WAIT",
    ...links.map((l) => `${l.title}: ${root}${l.path}`),
    "",
    `Want to add something? Reply to this email and it will reach our team at ${meta.replyEmail}.`,
    "",
    `You are receiving this message because this email address was used in the contact form on ${meta.brand} (${root}). If that was not you, you can ignore it.`,
  ].join("\n");
}
