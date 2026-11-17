import { NextResponse } from "next/server";
import { z } from "zod";
import { requestSchema } from "@/lib/inquiry-schema";
import { notifyInquiry } from "@/lib/notifiers";
import { rateLimit } from "@/lib/rate-limit";
import { verifyChallenge } from "@/lib/challenge";

export const runtime = "nodejs";

const MAX_BODY = 24_000;
const MIN_FILL_MS = 3_000;

function reply(body: Record<string, unknown>, status: number, headers?: Record<string, string>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

/**
 * Success (202) is returned only after the primary notifier (email) confirms it accepted the message.
 * Every other outcome is an explicit error, so the form can never show a success the backend did not earn.
 */
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const limit = rateLimit(`inquiry:${ip}`, 5, 10 * 60_000);
  if (!limit.ok) return reply({ ok: false, error: "rate_limited" }, 429, { "Retry-After": String(limit.retryAfter) });

  const raw = await req.text();
  if (raw.length > MAX_BODY) return reply({ ok: false, error: "too_large" }, 413);

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return reply({ ok: false, error: "invalid_json" }, 400);
  }

  const parsed = requestSchema.safeParse(json);
  if (!parsed.success) {
    return reply({ ok: false, error: "validation", fieldErrors: z.flattenError(parsed.error).fieldErrors }, 400);
  }
  const data = parsed.data;

  // Anti-spam: a hidden field humans never fill, and a minimum time to complete the form.
  if (data.company_website) return reply({ ok: false, error: "rejected" }, 400);
  if (Date.now() - data.startedAt < MIN_FILL_MS) return reply({ ok: false, error: "too_fast" }, 400);

  // The arithmetic question: the token is signed by this server, so the answer cannot be forged.
  if (!verifyChallenge(data.captchaToken, data.captchaAnswer)) return reply({ ok: false, error: "captcha_failed" }, 400);

  const { accepted, results } = await notifyInquiry(data);
  if (!accepted) {
    const notConfigured = results.some((r) => r.channel === "email" && r.error === "not_configured");
    // Log channel and reason only. Never log the visitor's personal details.
    console.error("inquiry not delivered", results.map((r) => ({ channel: r.channel, ok: r.ok, error: r.error })));
    return reply({ ok: false, error: notConfigured ? "not_configured" : "delivery_failed" }, notConfigured ? 503 : 502);
  }

  return reply({ ok: true }, 202);
}
