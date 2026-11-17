import { createHmac, randomInt, timingSafeEqual } from "node:crypto";

/**
 * A simple arithmetic question that tells people from basic form-filling bots, with no outside service and no accounts.
 *
 * The server issues a question together with a signed token that holds the answer and the time. The browser shows the
 * question and sends the token back with the visitor's answer, and the server checks the signature, the age and the
 * answer. Nothing is stored. This stops generic spam, and it works alongside the hidden field, the minimum fill time
 * and the rate limit on the enquiry route. A determined, targeted bot can still solve arithmetic, so those other
 * protections stay in place.
 *
 * The signing key is FORM_SECRET when set. Otherwise it is built from values that exist on the deployment.
 */
const MAX_AGE_MS = 60 * 60_000;

const secret = () => process.env.FORM_SECRET || ["peptomoon-form", process.env.VERCEL_DEPLOYMENT_ID, process.env.RESEND_API_KEY].filter(Boolean).join(":");
const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

export type Challenge = { question: string; token: string };

export function createChallenge(): Challenge {
  const kind = randomInt(0, 3);
  let question: string;
  let answer: number;
  if (kind === 0) {
    const a = randomInt(2, 10);
    const b = randomInt(2, 10);
    question = `What is ${a} + ${b}?`;
    answer = a + b;
  } else if (kind === 1) {
    const a = randomInt(6, 16);
    const b = randomInt(2, a);
    question = `What is ${a} - ${b}?`;
    answer = a - b;
  } else {
    const a = randomInt(2, 7);
    const b = randomInt(2, 7);
    question = `What is ${a} × ${b}?`;
    answer = a * b;
  }
  const payload = `${answer}.${Date.now()}`;
  return { question, token: `${Buffer.from(payload).toString("base64url")}.${sign(payload)}` };
}

/** True only when the token is genuine, recent and the answer matches. */
export function verifyChallenge(token: string | undefined, given: string | undefined): boolean {
  if (!token || !given) return false;
  const [body, signature] = token.split(".");
  if (!body || !signature) return false;
  const payload = Buffer.from(body, "base64url").toString("utf8");
  const expected = Buffer.from(sign(payload));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return false;
  const [answer, issued] = payload.split(".");
  const age = Date.now() - Number(issued);
  if (!Number.isFinite(age) || age < 0 || age > MAX_AGE_MS) return false;
  const trimmed = given.trim();
  return /^-?\d{1,4}$/.test(trimmed) && Number(trimmed) === Number(answer);
}
