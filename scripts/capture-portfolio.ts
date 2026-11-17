/**
 * Captures real screenshots of the six live portfolio sites.
 * Usage: pnpm capture:portfolio            (all sites)
 *        pnpm capture:portfolio helix      (one site, matched by slug substring)
 * Uses the installed Microsoft Edge (no browser download). Dismisses each site's own age gate by
 * clicking its confirm button, then writes WebP files to public/portfolio/<slug>/ and a manifest.
 */
import { chromium, type Page } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sites = [
  { slug: "99-purity-peptides", home: "https://99puritypeptides.com/", shop: "https://99puritypeptides.com/shop" },
  { slug: "veracue-labs", home: "https://veracuelabs.com/", shop: "https://veracuelabs.com/shop" },
  { slug: "helix-bio-chem", home: "https://helixbiochem.com/", shop: "https://helixbiochem.com/shop" },
  { slug: "primetime-bio-labs", home: "https://www.primetimebiolabs.com/", shop: "https://www.primetimebiolabs.com/shop" },
  { slug: "certified-aminos", home: "https://certified-aminos.com/", shop: "https://certified-aminos.com/shop" },
  { slug: "amino-based", home: "https://www.aminobased.com/", shop: "https://www.aminobased.com/shop" },
];

const only = process.argv[2];
const outRoot = path.join(process.cwd(), "public", "portfolio");
const GATE = /(i am )?(21|18)\+?\s*(or\s+)?older/i;

async function dismissGate(page: Page) {
  const button = page.getByRole("button", { name: GATE }).first();
  try {
    await button.waitFor({ state: "visible", timeout: 7000 });
    await button.click({ timeout: 3000 });
    await page.waitForTimeout(1500);
    return true;
  } catch {
    return false;
  }
}

async function shoot(page: Page, file: string, width: number) {
  const buf = await page.screenshot({ type: "png" });
  await sharp(buf).resize({ width }).webp({ quality: 82 }).toFile(file);
}

async function main() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const manifest: Record<string, unknown> = {};
  const capturedAt = new Date().toISOString().slice(0, 10);

  for (const site of sites) {
    if (only && !site.slug.includes(only)) continue;
    const dir = path.join(outRoot, site.slug);
    await fs.mkdir(dir, { recursive: true });
    console.log(`\n== ${site.slug}`);

    // Desktop: homepage and shop
    const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const dp = await desktop.newPage();
    await dp.goto(site.home, { waitUntil: "domcontentloaded", timeout: 60000 });
    await dp.waitForTimeout(3000);
    const gated = await dismissGate(dp);
    await dp.waitForTimeout(gated ? 4500 : 6500);
    await shoot(dp, path.join(dir, "desktop.webp"), 1440);
    console.log("  desktop home ok, gate dismissed:", gated);

    await dp.goto(site.shop, { waitUntil: "domcontentloaded", timeout: 60000 });
    await dp.waitForTimeout(5000);
    await dismissGate(dp);
    await dp.waitForTimeout(2500);
    await shoot(dp, path.join(dir, "shop.webp"), 1440);
    console.log("  desktop shop ok");
    await desktop.close();

    // Mobile: homepage
    const mobile = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const mp = await mobile.newPage();
    await mp.goto(site.home, { waitUntil: "domcontentloaded", timeout: 60000 });
    await mp.waitForTimeout(3000);
    const mgated = await dismissGate(mp);
    await mp.waitForTimeout(mgated ? 4500 : 6500);
    await shoot(mp, path.join(dir, "mobile.webp"), 780);
    console.log("  mobile home ok, gate dismissed:", mgated);
    await mobile.close();

    manifest[site.slug] = { capturedAt, home: site.home, shop: site.shop, desktop: [1440, 900], mobile: [780, 1688], shopSize: [1440, 900] };
  }

  await browser.close();
  const file = path.join(outRoot, "manifest.json");
  let existing: Record<string, unknown> = {};
  try {
    existing = JSON.parse(await fs.readFile(file, "utf8"));
  } catch {}
  await fs.writeFile(file, JSON.stringify({ ...existing, ...manifest }, null, 2));
  console.log("\nManifest written:", file);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
