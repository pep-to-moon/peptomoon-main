import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { buildHtml, buildSubject, buildText } from "../../src/lib/notifiers/email-template";
import { LOGO_ATTACHMENT, LOGO_CID } from "../../src/lib/notifiers/email-logo";
import type { InquiryValues } from "../../src/lib/inquiry-schema";

const meta = { logoSrc: "cid:peptomoon-logo", brand: "Peptomoon", receivedAt: new Date("2026-11-17T14:05:00Z") };

const base: InquiryValues = {
  status: "new-business",
  services: ["payment-processing", "website-creation"],
  websiteUrl: "example.com",
  requirements: "We need a processor.\nSecond line.",
  challenges: "Our last provider closed the account.",
  name: "Test Person",
  business: "Test Labs",
  email: "test@example.com",
  phone: "+1 555 010 0100",
  consent: true,
};

test("the lead email shows the enquiry clearly", () => {
  const html = buildHtml(base, meta);
  expect(buildSubject(base)).toBe("New enquiry: Test Person, Test Labs (Payment processing +1)");
  for (const part of ["Test Person", "Test Labs", "Payment processing", "Website creation", "test@example.com", "+1 555 010 0100", "Their notes", "Current challenges", "Reply to Test"]) {
    expect(html, part).toContain(part);
  }
  expect(html).toContain('href="mailto:test@example.com"');
  expect(html).toContain('href="tel:+15550100100"');
  expect(html).toContain('href="https://example.com"');
  expect(html).toContain("We need a processor.<br>Second line.");
  expect(html).toContain('src="cid:peptomoon-logo"');
  expect(html).not.toContain("—");
});

test("optional parts are left out when empty", () => {
  const html = buildHtml({ ...base, phone: "", websiteUrl: "", business: "", requirements: "", challenges: "", status: undefined }, meta);
  expect(html).not.toContain("tel:");
  expect(html).not.toContain("Their notes");
  expect(html).not.toContain("Current challenges");
  expect(html).not.toContain("Where they are");
  expect(buildText({ ...base, phone: "" }, meta)).not.toContain("Phone:");
});

test("anything a visitor types is escaped and cannot add markup or links", () => {
  const evil = { ...base, name: '<script>alert(1)</script>', business: '"><img src=x onerror=alert(1)>', requirements: "<b>bold</b> & more", websiteUrl: "javascript:alert(1)" };
  const html = buildHtml(evil, meta);
  expect(html).not.toContain("<script>");
  expect(html).not.toContain("<img src=x");
  expect(html).not.toContain("<b>bold</b>");
  expect(html).toContain("&lt;script&gt;");
  expect(html).toContain("&lt;b&gt;bold&lt;/b&gt; &amp; more");
  expect(html).not.toContain('href="javascript:');
});

test("a plain-text version is provided for apps that do not show HTML", () => {
  const text = buildText(base, meta);
  for (const part of ["NEW ENQUIRY: Test Person, Test Labs", "- Payment processing", "Email: test@example.com", "Phone: +1 555 010 0100", "THEIR NOTES"]) {
    expect(text, part).toContain(part);
  }
});

test("the logo travels inside the email, not as a link to the website", () => {
  const logo = fs.readFileSync(path.join(process.cwd(), "public/brand/peptomoon-wordmark-light.png"));
  expect(LOGO_ATTACHMENT.contentId).toBe(LOGO_CID);
  expect(Buffer.from(LOGO_ATTACHMENT.content, "base64").equals(logo)).toBe(true);
  const html = buildHtml(base, { ...meta, logoSrc: `cid:${LOGO_CID}` });
  expect(html).not.toMatch(/src="https?:/);
});
