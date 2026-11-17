import { defineConfig } from "@playwright/test";

/**
 * Runs against a production build on port 3100 (built and started automatically), or against any URL via E2E_BASE.
 * Uses the installed Microsoft Edge, so no browser download is needed.
 * When you start the server yourself and pass E2E_BASE, start it with RESEND_API_KEY= RESEND_FROM_EMAIL= so the tests
 * cannot send real email from your .env.local.
 */
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 60_000,
  fullyParallel: true,
  workers: 3,
  reporter: [["list"]],
  use: {
    baseURL: process.env.E2E_BASE ?? "http://localhost:3100",
    channel: "msedge",
  },
  webServer: process.env.E2E_BASE
    ? undefined
    : {
        command: "pnpm build && pnpm start -p 3100",
        // Tests must never send real email. Values set here win over .env.local, so the server under test has no
        // email provider and the contact API reports honestly that it cannot deliver.
        env: { RESEND_API_KEY: "", RESEND_FROM_EMAIL: "", INQUIRY_TO_EMAIL: "" },
        url: "http://localhost:3100",
        reuseExistingServer: true,
        timeout: 360_000,
      },
});
