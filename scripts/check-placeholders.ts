/**
 * Blocks PRODUCTION deploys while required settings are missing (email delivery and the spam check).
 * Local and preview builds only print a warning, so work can continue without them.
 * "Production" means VERCEL_ENV=production (the live domain on Vercel).
 */
const isProd = process.env.VERCEL_ENV === "production";
const problems: string[] = [];

// Required production settings.
// INQUIRY_TO_EMAIL is optional: enquiries go to the contact email when it is not set.
const need = ["RESEND_API_KEY", "RESEND_FROM_EMAIL", "NEXT_PUBLIC_TURNSTILE_SITE_KEY", "TURNSTILE_SECRET_KEY"];
for (const key of need) if (!process.env[key]) problems.push(`environment: ${key} is not set`);
const url = process.env.NEXT_PUBLIC_SITE_URL ?? "";
if (url && (!url.startsWith("https://") || url.includes("localhost"))) problems.push("environment: NEXT_PUBLIC_SITE_URL must be the live https address");

if (problems.length === 0) {
  console.log("check-placeholders: all required settings are present.");
  process.exit(0);
}

const header = isProd ? "check-placeholders: PRODUCTION BUILD BLOCKED" : "check-placeholders: warning (allowed outside production)";
console.log(`${header}\n${problems.length} setting(s) to provide before launch:\n - ${problems.join("\n - ")}`);
process.exit(isProd ? 1 : 0);
