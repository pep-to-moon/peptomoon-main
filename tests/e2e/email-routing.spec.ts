import { expect, test } from "@playwright/test";
import { sendConfirmation } from "../../src/lib/notifiers/confirmation";
import { emailNotifier } from "../../src/lib/notifiers/email";
import { leadRecipients, senderAddress, senderFor } from "../../src/lib/notifiers/sender";
import type { InquiryValues } from "../../src/lib/inquiry-schema";

// These tests change process.env and fetch, so they run one after another and always restore both.
test.describe.configure({ mode: "serial" });

const inquiry: InquiryValues = {
  status: "new-business",
  services: ["payment-processing"],
  websiteUrl: "",
  requirements: "Hello",
  challenges: "",
  name: "Alex Morgan",
  business: "Example Labs",
  email: "alex@examplestore.com",
  phone: "",
  consent: true,
};

test("sender names are proper for the alert and for the visitor's confirmation", () => {
  expect(senderFor("leads", "noreply@peptomoon.com")).toBe("Peptomoon Website <noreply@peptomoon.com>");
  expect(senderFor("visitor", "noreply@peptomoon.com")).toBe("Peptomoon <noreply@peptomoon.com>");
  // A name already present in the setting is replaced, so the inbox name is always the right one.
  expect(senderFor("visitor", "Some Other Name <noreply@peptomoon.com>")).toBe("Peptomoon <noreply@peptomoon.com>");
  expect(senderAddress("  inquiry@peptomoon.com ")).toBe("inquiry@peptomoon.com");
  for (const bad of [undefined, "", "   ", "not an email", "Peptomoon <>"]) expect(senderFor("leads", bad), String(bad)).toBeNull();
});

test("leads go to inquiry@peptomoon.com unless told otherwise", () => {
  expect(leadRecipients(undefined)).toEqual(["inquiry@peptomoon.com"]);
  expect(leadRecipients("")).toEqual(["inquiry@peptomoon.com"]);
  expect(leadRecipients("   ")).toEqual(["inquiry@peptomoon.com"]);
  expect(leadRecipients("inquiry@peptomoon.com, peptomoon@gmail.com")).toEqual(["inquiry@peptomoon.com", "peptomoon@gmail.com"]);
});

type Sent = { url: string; body: Record<string, unknown> };

/** Runs `fn` with a fake email provider and returns every message it tried to send. Nothing leaves this machine. */
async function withFakeProvider(env: Record<string, string | undefined>, fn: () => Promise<void>): Promise<Sent[]> {
  const sent: Sent[] = [];
  const realFetch = globalThis.fetch;
  const saved: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(env)) {
    saved[k] = process.env[k];
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    sent.push({ url: String(input), body: JSON.parse(String(init?.body ?? "{}")) });
    return new Response(JSON.stringify({ id: `fake-${sent.length}` }), { status: 200, headers: { "content-type": "application/json" } });
  }) as typeof fetch;
  try {
    await fn();
  } finally {
    globalThis.fetch = realFetch;
    for (const [k, v] of Object.entries(saved)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
  return sent;
}

test("the alert arrives at inquiry@peptomoon.com from 'Peptomoon Website', and replying reaches the visitor", async () => {
  const sent = await withFakeProvider({ RESEND_API_KEY: "re_fake", RESEND_FROM_EMAIL: "noreply@peptomoon.com", INQUIRY_TO_EMAIL: undefined }, async () => {
    const result = await emailNotifier.send(inquiry);
    expect(result.ok).toBe(true);
  });
  expect(sent).toHaveLength(1);
  const body = sent[0].body;
  expect(body.from).toBe("Peptomoon Website <noreply@peptomoon.com>");
  expect(body.to).toEqual(["inquiry@peptomoon.com"]);
  expect(body.reply_to).toBe("alex@examplestore.com");
  expect(String(body.subject)).toContain("New enquiry: Alex Morgan, Example Labs");
  expect(JSON.stringify(body.attachments)).toContain("peptomoon-logo");
});

test("the visitor's confirmation comes from 'Peptomoon' and replies reach inquiry@peptomoon.com", async () => {
  const sent = await withFakeProvider({ RESEND_API_KEY: "re_fake", RESEND_FROM_EMAIL: "noreply@peptomoon.com" }, async () => {
    const result = await sendConfirmation(inquiry);
    expect(result.ok).toBe(true);
  });
  expect(sent).toHaveLength(1);
  const body = sent[0].body;
  expect(body.from).toBe("Peptomoon <noreply@peptomoon.com>");
  expect(body.to).toEqual(["alex@examplestore.com"]);
  expect(body.reply_to).toBe("inquiry@peptomoon.com");
  expect(body.subject).toBe("We have received your enquiry");
  expect(JSON.stringify(body.attachments)).toContain("peptomoon-logo");
  expect(JSON.stringify(body.headers)).toContain("auto-replied");
});

test("INQUIRY_TO_EMAIL can add a backup copy alongside inquiry@peptomoon.com", async () => {
  const sent = await withFakeProvider(
    { RESEND_API_KEY: "re_fake", RESEND_FROM_EMAIL: "noreply@peptomoon.com", INQUIRY_TO_EMAIL: "inquiry@peptomoon.com,peptomoon@gmail.com" },
    async () => {
      await emailNotifier.send(inquiry);
    },
  );
  expect(sent[0].body.to).toEqual(["inquiry@peptomoon.com", "peptomoon@gmail.com"]);
});
