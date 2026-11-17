import { defineConfig } from "@playwright/test";

/**
 * Runs against a production build on port 3100 (built and started automatically), or against any URL via E2E_BASE.
 * Uses the installed Microsoft Edge, so no browser download is needed.
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
        url: "http://localhost:3100",
        reuseExistingServer: true,
        timeout: 360_000,
      },
});
