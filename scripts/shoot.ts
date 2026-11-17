/**
 * Visual QA helper: full-page screenshot of a local route, sliced into tall chunks for review.
 * Usage: pnpm shoot /services 1440 scratch/services        (writes scratch/services-1.png, -2.png, ...)
 * Reduced motion is emulated so every reveal is visible in a single capture. Also reports console errors
 * and horizontal overflow (scrollWidth greater than clientWidth), which indicates a responsive bug.
 */
import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [, , route = "/", widthArg = "1440", outBase = "scratch/shot", sliceArg = "1500"] = process.argv;
const width = Number(widthArg);
const sliceHeight = Number(sliceArg);
const base = process.env.SHOOT_BASE ?? "http://localhost:3000";

async function main() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext({
    viewport: { width, height: width < 700 ? 844 : 900 },
    reducedMotion: process.env.SHOOT_MOTION ? "no-preference" : "reduce",
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const problems: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") problems.push(`[${m.type()}] ${m.text()}`.slice(0, 300));
  });
  page.on("pageerror", (e) => problems.push(`[pageerror] ${e.message}`.slice(0, 300)));

  // External reference sites often never reach network idle, so SHOOT_WAIT=load is available for them.
  const wait = process.env.SHOOT_WAIT === "load" ? "load" : "networkidle";
  await page.goto(`${base}${route}`, { waitUntil: wait, timeout: 120000 });
  await page.waitForTimeout(wait === "load" ? 5000 : 0);
  if (process.env.SHOOT_VIEWPORT) {
    // Viewport-only capture with motion left running, used to judge hero and 3D.
    await page.waitForTimeout(Number(process.env.SHOOT_VIEWPORT) || 4000);
    await fs.mkdir(path.dirname(outBase), { recursive: true });
    await page.screenshot({ path: `${outBase}-1.png` });
    console.log(JSON.stringify({ route, width, viewportOnly: true, problems }, null, 2));
    await browser.close();
    return;
  }
  // Scroll through the page so lazy-loaded images and reveal observers fire before the capture.
  await page.evaluate(async () => {
    const step = Math.max(300, Math.floor(window.innerHeight * 0.7));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 140));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => undefined);
  await page.waitForTimeout(1000);

  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    height: document.documentElement.scrollHeight,
    h1: Array.from(document.querySelectorAll("h1")).map((h) => h.textContent?.trim().slice(0, 80)),
  }));

  await fs.mkdir(path.dirname(outBase), { recursive: true });
  let i = 1;
  const from = Number(process.argv[5] ?? 0);
  if (metrics.height > 15000 || from > 0) {
    // Chromium wraps full-page captures taller than about 16,000px, so capture viewport strips instead.
    await page.setViewportSize({ width, height: sliceHeight });
    for (let top = from; top < metrics.height; top += sliceHeight) {
      await page.evaluate((y) => window.scrollTo(0, y), top);
      await page.waitForTimeout(250);
      await page.screenshot({ path: `${outBase}-${i}.png`, type: "png" });
      i++;
    }
  } else {
    const full = await page.screenshot({ fullPage: true, type: "png" });
    const meta = await sharp(full).metadata();
    const total = meta.height ?? 0;
    for (let top = 0; top < total; top += sliceHeight) {
      const h = Math.min(sliceHeight, total - top);
      await sharp(full).extract({ left: 0, top, width: meta.width ?? width, height: h }).toFile(`${outBase}-${i}.png`);
      i++;
    }
  }
  console.log(JSON.stringify({ route, width, slices: i - 1, ...metrics, overflowX: metrics.scrollWidth > metrics.clientWidth, problems }, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
