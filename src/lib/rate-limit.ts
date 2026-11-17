/**
 * Small in-memory limiter. It is per server instance, so it slows down casual abuse but is not a hard guarantee
 * on serverless platforms. The arithmetic check and the honeypot do the heavy lifting. Swap this for Redis (for example
 * Upstash) if the form ever sees sustained abuse.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  entry.count += 1;
  if (entry.count > limit) return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  return { ok: true, retryAfter: 0 };
}

// Keep the map from growing forever.
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
}, 60_000).unref?.();
