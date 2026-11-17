import { expect, test } from "@playwright/test";
import { buildConfirmationHtml, buildConfirmationSubject, buildConfirmationText } from "../../src/lib/notifiers/confirmation-template";
import { sendConfirmation } from "../../src/lib/notifiers/confirmation";
import type { InquiryValues } from "../../src/lib/inquiry-schema";

const meta = { logoSrc: "cid:peptomoon-logo", brand: "Peptomoon", siteUrl: "https://peptomoon.com", replyEmail: "inquiry@peptomoon.com" };

const base: InquiryValues = {
  status: "new-business",
  services: ["payment-processing", "seo-geo-aeo"],
  websiteUrl: "example.com",
  requirements: "PRIVATE-NOTE-SHOULD-NOT-APPEAR",
  challenges: "PRIVATE-CHALLENGE-SHOULD-NOT-APPEAR",
  name: "Test Person",
  business: "Test Labs",
  email: "test@example.com",
  phone: "+1 555 010 0100",
  consent: true,
};

test("the confirmation greets the visitor and says we are reviewing their enquiry", () => {
  const html = buildConfirmationHtml(base, meta);
  expect(buildConfirmationSubject()).toBe("We have received your enquiry");
  for (const part of ["Thanks, Test. We have your enquiry.", "reviewing it now", "reply to you by email shortly", "Payment processing", "SEO, GEO and AEO", "See our work"]) {
    expect(html, part).toContain(part);
  }
  expect(html).toContain('src="cid:peptomoon-logo"');
  expect(html).toContain('href="https://peptomoon.com/case-studies"');
  expect(html).toContain('href="https://peptomoon.com/services"');
  expect(html).toContain('href="https://peptomoon.com/resources"');
  expect(html).toContain('href="mailto:inquiry@peptomoon.com"');
  expect(html).not.toContain("—");
});

test("the confirmation never repeats the visitor's free-text answers", () => {
  const html = buildConfirmationHtml(base, meta);
  const text = buildConfirmationText(base, meta);
  for (const body of [html, text]) {
    expect(body).not.toContain("PRIVATE-NOTE-SHOULD-NOT-APPEAR");
    expect(body).not.toContain("PRIVATE-CHALLENGE-SHOULD-NOT-APPEAR");
    expect(body).not.toContain("+1 555 010 0100");
  }
});

test("the visitor's name cannot inject markup into the confirmation", () => {
  const html = buildConfirmationHtml({ ...base, name: '<img src=x onerror=alert(1)> Eve' }, meta);
  expect(html).not.toContain("<img src=x");
  expect(html).toContain("&lt;img");
});

test("the confirmation has a plain-text version with the same links", () => {
  const text = buildConfirmationText(base, meta);
  expect(text).toContain("Thanks, Test. We have your enquiry.");
  expect(text).toContain("- Payment processing");
  expect(text).toContain("Case studies: https://peptomoon.com/case-studies");
  expect(text).toContain("inquiry@peptomoon.com");
  expect(text).not.toContain("<");
});

test("sending the confirmation without an email provider fails quietly", async () => {
  const saved = { key: process.env.RESEND_API_KEY, from: process.env.RESEND_FROM_EMAIL };
  delete process.env.RESEND_API_KEY;
  delete process.env.RESEND_FROM_EMAIL;
  try {
    const result = await sendConfirmation(base);
    expect(result).toEqual({ channel: "confirmation", ok: false, error: "not_configured" });
  } finally {
    if (saved.key !== undefined) process.env.RESEND_API_KEY = saved.key;
    if (saved.from !== undefined) process.env.RESEND_FROM_EMAIL = saved.from;
  }
});
