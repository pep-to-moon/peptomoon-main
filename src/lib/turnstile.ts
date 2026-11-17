const isProduction = () => (process.env.VERCEL_ENV ?? process.env.NODE_ENV) === "production";

export type TurnstileResult = "passed" | "failed" | "misconfigured" | "skipped";

/** Verifies a Cloudflare Turnstile token on the server. In development without keys the check is skipped. */
export async function verifyTurnstile(token: string | undefined, ip: string): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return isProduction() ? "misconfigured" : "skipped";
  if (!token) return "failed";
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip && ip !== "unknown") body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success ? "passed" : "failed";
  } catch {
    return "failed";
  }
}
