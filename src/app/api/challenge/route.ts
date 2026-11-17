import { NextResponse } from "next/server";
import { createChallenge } from "@/lib/challenge";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

/** Issues a fresh arithmetic question and its signed token for the contact form. */
export function GET(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limit = rateLimit(`challenge:${ip}`, 120, 10 * 60_000);
  if (!limit.ok) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
  return NextResponse.json(createChallenge(), { headers: { "Cache-Control": "no-store" } });
}
