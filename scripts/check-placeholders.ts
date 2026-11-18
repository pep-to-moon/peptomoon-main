/**
 * Checks launch settings. Run before every build.
 *
 * - The site address, when set on the live deploy, must be the real https address. This always blocks, because a wrong
 *   address would put the wrong canonical URLs and sitemap in front of search engines.
 * - Email delivery settings only warn by default. Until they exist, the live contact page offers a plain email link
 *   instead of the form. Set STRICT_LAUNCH_CHECK=1 to make missing email settings block the build as well.
 *
 * "Live" means VERCEL_ENV=production (the real domain on Vercel).
 */
const live = process.env.VERCEL_ENV === "production";
const strict = process.env.STRICT_LAUNCH_CHECK === "1";

const blocking: string[] = [];
const warnings: string[] = [];

const url = process.env.NEXT_PUBLIC_SITE_URL ?? "";
if (live && url && (!url.startsWith("https://") || url.includes("localhost"))) {
  blocking.push("NEXT_PUBLIC_SITE_URL must be the live https address, or be left unset (it defaults to https://peptomoon.com)");
}

// A GA4 measurement ID looks like G-XXXXXXXXXX. A "UA-" ID (old Universal Analytics), a bare stream number or a typo
// would load nothing useful, so stop the build instead of shipping silent, empty analytics.
const gaId = (process.env.NEXT_PUBLIC_GA_ID ?? "").trim();
if (gaId && !/^G-[A-Z0-9]{6,}$/.test(gaId)) {
  blocking.push(`NEXT_PUBLIC_GA_ID must be a GA4 measurement ID like G-XXXXXXXXXX, but it is "${gaId}"`);
}

// A Microsoft Clarity project ID is a short code of letters and digits, like zf8lqke71d.
const clarityId = (process.env.NEXT_PUBLIC_CLARITY_ID ?? "").trim();
if (clarityId && !/^[a-z0-9]{6,20}$/i.test(clarityId)) {
  blocking.push(`NEXT_PUBLIC_CLARITY_ID must be a Clarity project ID like zf8lqke71d, but it is "${clarityId}"`);
}

for (const key of ["RESEND_API_KEY", "RESEND_FROM_EMAIL"]) {
  if (!process.env[key]) warnings.push(`${key} is not set, so the online contact form cannot send yet`);
}

if (blocking.length === 0 && warnings.length === 0) {
  console.log("check-placeholders: all launch settings are present.");
  process.exit(0);
}
if (blocking.length) console.log(`check-placeholders: BUILD BLOCKED\n - ${blocking.join("\n - ")}`);
if (warnings.length) {
  console.log(
    `check-placeholders: ${live && strict ? "BUILD BLOCKED" : "warning"}\n - ${warnings.join("\n - ")}\n   Until then the contact page shows a plain email link instead of the form.`,
  );
}
process.exit(blocking.length || (live && strict && warnings.length) ? 1 : 0);
