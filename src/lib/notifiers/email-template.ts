import { serviceLabels, statusLabels, type InquiryValues } from "@/lib/inquiry-schema";

/**
 * The email you receive for each new enquiry. It is a self-contained HTML email (tables and inline styles, because
 * email apps ignore stylesheets) with a plain-text twin for apps that do not show HTML.
 * Everything a visitor typed is escaped, so nothing they write can change the layout or inject markup.
 */

export const INK = "#0b1623";
export const SOFT = "#46566a";
export const BLUE = "#2f5f8a";
export const BLUE_DEEP = "#244b70";
export const NAVY = "#0d2236";
export const SKY_SOFT = "#eaf6fb";
export const CANVAS = "#fffdf7";
export const OUTER = "#f1ede2";
export const LINE = "#e2ddcf";
export const FONT = "'Helvetica Neue',Helvetica,Arial,sans-serif";

export const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const multiline = (s: string) => esc(s).replace(/\r?\n/g, "<br>");

/** Only web addresses become links. Anything else is shown as plain text. */
function websiteHref(v: string): string | null {
  const href = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  return /^https?:\/\/[^\s"<>]+$/i.test(href) ? href : null;
}

export type EmailMeta = {
  /** Where the logo image comes from: `cid:...` for the inline attachment, or a full image address. */
  logoSrc: string;
  /** The brand name shown in the header and footer. */
  brand: string;
  /** When the enquiry arrived. */
  receivedAt: Date;
};

const when = (d: Date) => `${new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeStyle: "short", timeZone: "UTC" }).format(d)} UTC`;

export function buildSubject(i: InquiryValues): string {
  const who = i.business ? `${i.name}, ${i.business}` : i.name;
  const first = serviceLabels[i.services[0]];
  const more = i.services.length > 1 ? ` +${i.services.length - 1}` : "";
  return `New enquiry: ${who} (${first}${more})`;
}

function row(label: string, valueHtml: string) {
  return `<tr>
    <td style="padding:11px 0;border-top:1px solid ${LINE};width:118px;vertical-align:top;font:600 11px ${FONT};letter-spacing:0.1em;text-transform:uppercase;color:${SOFT};">${label}</td>
    <td style="padding:11px 0;border-top:1px solid ${LINE};vertical-align:top;font:400 15px/1.5 ${FONT};color:${INK};">${valueHtml}</td>
  </tr>`;
}

export function buildHtml(i: InquiryValues, meta: EmailMeta): string {
  const services = i.services.map((s) => serviceLabels[s]);
  const status = i.status ? statusLabels[i.status] : "";
  const href = i.websiteUrl ? websiteHref(i.websiteUrl) : null;
  const phoneHref = i.phone ? `tel:${i.phone.replace(/[^\d+]/g, "")}` : "";
  const replyHref = `mailto:${i.email}?subject=${encodeURIComponent(`Re: your enquiry to ${meta.brand}`)}`;
  const preheader = `${i.name} wrote in about ${services.join(", ")}.`;

  const chips = services
    .map((s) => `<span style="display:inline-block;margin:0 6px 8px 0;padding:8px 14px;border-radius:999px;background:${SKY_SOFT};border:1px solid #cfe6f0;font:600 13px ${FONT};color:${BLUE_DEEP};">${esc(s)}</span>`)
    .join("");

  const contactRows = [
    row("Name", `<strong>${esc(i.name)}</strong>`),
    i.business ? row("Business", esc(i.business)) : "",
    row("Email", `<a href="mailto:${esc(i.email)}" style="color:${BLUE};text-decoration:underline;">${esc(i.email)}</a>`),
    i.phone ? row("Phone", `<a href="${esc(phoneHref)}" style="color:${BLUE};text-decoration:underline;">${esc(i.phone)}</a>`) : "",
    i.websiteUrl
      ? row("Website", href ? `<a href="${esc(href)}" style="color:${BLUE};text-decoration:underline;">${esc(i.websiteUrl)}</a>` : esc(i.websiteUrl))
      : "",
  ].join("");

  const note = (title: string, text: string) => `
    <tr><td style="padding:0 32px 20px;">
      <div style="font:600 11px ${FONT};letter-spacing:0.1em;text-transform:uppercase;color:${SOFT};padding-bottom:8px;">${title}</div>
      <div style="border-left:4px solid ${BLUE};background:#ffffff;border-radius:0 12px 12px 0;padding:14px 18px;font:400 15px/1.6 ${FONT};color:${INK};">${multiline(text)}</div>
    </td></tr>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(buildSubject(i))}</title>
</head>
<body style="margin:0;padding:0;background:${OUTER};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${OUTER};">
<tr><td align="center" style="padding:28px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:${CANVAS};border:1px solid ${LINE};border-radius:18px;overflow:hidden;">

    <tr><td style="background:${NAVY};padding:24px 32px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="vertical-align:middle;"><img src="${esc(meta.logoSrc)}" width="150" alt="${esc(meta.brand)}" style="display:block;border:0;height:auto;font:700 18px ${FONT};color:#ffffff;"></td>
        <td align="right" style="vertical-align:middle;"><span style="display:inline-block;padding:7px 12px;border-radius:999px;background:#fdc921;font:700 11px ${FONT};letter-spacing:0.12em;text-transform:uppercase;color:${NAVY};">New enquiry</span></td>
      </tr></table>
    </td></tr>

    <tr><td style="padding:34px 32px 6px;">
      <div style="font:600 12px ${FONT};letter-spacing:0.12em;text-transform:uppercase;color:${BLUE};">From the contact form</div>
      <div style="padding-top:10px;font:700 30px/1.15 ${FONT};color:${INK};">${esc(i.name)}</div>
      <div style="padding-top:8px;font:400 14px ${FONT};color:${SOFT};">${i.business ? `${esc(i.business)} &middot; ` : ""}Received ${esc(when(meta.receivedAt))}</div>
    </td></tr>

    <tr><td style="padding:22px 32px 6px;">
      <div style="font:600 11px ${FONT};letter-spacing:0.1em;text-transform:uppercase;color:${SOFT};padding-bottom:10px;">What they need</div>
      <div>${chips}</div>
      ${status ? `<div style="padding-top:6px;font:400 14px ${FONT};color:${SOFT};">Where they are: <strong style="color:${INK};">${esc(status)}</strong></div>` : ""}
    </td></tr>

    <tr><td style="padding:14px 32px 10px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid ${LINE};">${contactRows}</table>
    </td></tr>

    ${i.requirements ? note("Their notes", i.requirements) : ""}
    ${i.challenges ? note("Current challenges", i.challenges) : ""}

    <tr><td style="padding:10px 32px 30px;">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="background:${BLUE};border-radius:999px;"><a href="${esc(replyHref)}" style="display:inline-block;white-space:nowrap;padding:15px 28px;font:700 13px ${FONT};letter-spacing:0.08em;text-transform:uppercase;color:#ffffff;text-decoration:none;">Reply to ${esc(i.name.split(/\s+/)[0] || "them")}</a></td>
      </tr></table>
      ${i.phone ? `<div style="padding-top:16px;font:400 14px ${FONT};color:${INK};">Prefer a call? <a href="${esc(phoneHref)}" style="font-weight:600;color:${BLUE};text-decoration:underline;white-space:nowrap;">${esc(i.phone)}</a></div>` : ""}
      <div style="padding-top:${i.phone ? 8 : 16}px;font:400 13px/1.5 ${FONT};color:${SOFT};">Replying to this email goes straight to ${esc(i.name)}.</div>
    </td></tr>

    <tr><td style="background:#ffffff;border-top:1px solid ${LINE};padding:18px 32px;font:400 12px/1.6 ${FONT};color:${SOFT};">
      They agreed to be contacted about this enquiry${i.consent ? "" : " (consent not recorded)"}. Sent by the contact form on ${esc(meta.brand)}. Nothing is stored on the website, so keep this email.
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>`;
}

export function buildText(i: InquiryValues, meta: EmailMeta): string {
  return [
    `NEW ENQUIRY: ${i.name}${i.business ? `, ${i.business}` : ""}`,
    `Received ${when(meta.receivedAt)}`,
    "",
    "WHAT THEY NEED",
    ...i.services.map((s) => `- ${serviceLabels[s]}`),
    ...(i.status ? ["", `Where they are: ${statusLabels[i.status]}`] : []),
    "",
    "CONTACT",
    `Name: ${i.name}`,
    ...(i.business ? [`Business: ${i.business}`] : []),
    `Email: ${i.email}`,
    ...(i.phone ? [`Phone: ${i.phone}`] : []),
    ...(i.websiteUrl ? [`Website: ${i.websiteUrl}`] : []),
    ...(i.requirements ? ["", "THEIR NOTES", i.requirements] : []),
    ...(i.challenges ? ["", "CURRENT CHALLENGES", i.challenges] : []),
    "",
    `Reply to this email to answer ${i.name} directly.`,
    `They agreed to be contacted about this enquiry. Sent by the contact form on ${meta.brand}.`,
  ].join("\n");
}
