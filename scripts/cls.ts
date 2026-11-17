/**
 * Measures cumulative layout shift while scrolling the whole page, which Lighthouse's static load does not do.
 * Usage: pnpm tsx scripts/cls.ts /route 390
 */
import { chromium } from "@playwright/test";

const [, , route = "/", widthArg = "390"] = process.argv;
const width = Number(widthArg);
const base = process.env.SHOOT_BASE ?? "http://localhost:3100";

async function main() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext({ viewport: { width, height: width < 700 ? 844 : 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.addInitScript(() => {
    (window as unknown as { __cls: number }).__cls = 0;
    new PerformanceObserver((list) => {
      for (const e of list.getEntries() as unknown as { value: number; hadRecentInput: boolean }[]) {
        if (!e.hadRecentInput) (window as unknown as { __cls: number }).__cls += e.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 250) {
    await page.mouse.wheel(0, 250);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(800);
  const cls = await page.evaluate(() => (window as unknown as { __cls: number }).__cls);
  console.log(JSON.stringify({ route, width, scrolledPx: height, cls: Number(cls.toFixed(4)) }));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
