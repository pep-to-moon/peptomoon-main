/**
 * Renders the social share (Open Graph) images into public/og. Run with the dev server up: pnpm make:og
 *
 * The images are drawn with the site's own fonts by injecting a 1200x630 layout into a live page and taking a
 * screenshot, so the type matches the site exactly. One template covers the home page, every hub, each service,
 * each guide and each case study. Re-run it whenever titles or the logo change.
 */
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { allArticles, readingMinutes } from "../src/content/articles";
import { caseStudies } from "../src/content/case-studies";
import { pillars } from "../src/content/pillars";
import { portfolio } from "../src/content/portfolio";
import { services } from "../src/content/services";

const base = process.env.OG_BASE ?? "http://localhost:3000";
const outDir = path.join(process.cwd(), "public", "og");
fs.mkdirSync(outDir, { recursive: true });

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const INK = "#0b1623";
const SOFT = "#46566a";
const BLUE = "#2f5f8a";
const NAVY = "#0d2236";
const YELLOW = "#fdc921";

type Card = {
  file: string;
  kicker: string;
  title: string;
  /** Characters of the title to colour blue, taken from the end. Used on the home image only. */
  accent?: string;
  subtitle?: string;
  /** "strip" shows four portfolio screenshots along the bottom, "shot" shows one large screenshot. */
  visual?: "strip" | "shot";
  shot?: string;
};

/** The first sentence, or a clean cut at a word boundary when that sentence is long. Never ends in an ellipsis. */
function brief(text: string, max = 150) {
  const first = text.split(/(?<=[.!?])\s+/)[0] ?? text;
  if (first.length <= max) return first;
  const cut = first.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "") + ".";
}

const shots = ["99-purity-peptides", "veracue-labs", "helix-bio-chem", "primetime-bio-labs"].map((s) => `/portfolio/${s}/desktop.webp`);

function titleSize(n: number, narrow: boolean) {
  if (narrow) return n <= 14 ? 84 : n <= 24 ? 68 : n <= 40 ? 56 : 46;
  return n <= 24 ? 96 : n <= 40 ? 80 : n <= 60 ? 66 : n <= 90 ? 54 : 46;
}

function markup(c: Card) {
  const strip = c.visual === "strip";
  const shot = c.visual === "shot";
  const size = strip ? 58 : titleSize(c.title.length, shot);
  const titleHtml = c.accent
    ? `${esc(c.title.replace(c.accent, "").trimEnd())} <span style="color:${BLUE}">${esc(c.accent)}</span>`
    : esc(c.title);
  const maxW = shot ? 560 : 1072;

  const stripHtml = strip
    ? `<div style="position:absolute;left:64px;right:64px;top:394px;display:flex;gap:24px">
         ${shots
           .slice(0, 3)
           .map(
             (src) =>
               `<div style="flex:1 1 0;aspect-ratio:16/9;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 0 0 2px rgba(11,22,35,.14)"><img src="${src}" style="width:100%;height:100%;object-fit:cover;object-position:top"/></div>`,
           )
           .join("")}
       </div>`
    : "";
  const shotHtml = shot
    ? `<div style="position:absolute;right:-60px;top:196px;width:620px;aspect-ratio:16/9;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 0 0 2px rgba(11,22,35,.16)"><img src="${c.shot}" style="width:100%;height:100%;object-fit:cover;object-position:top"/></div>`
    : "";
  const footer = strip
    ? ""
    : `<div style="position:absolute;left:64px;right:64px;bottom:52px;display:flex;justify-content:space-between;align-items:center;font:600 22px var(--font-sans);color:${INK};letter-spacing:.02em"><span>peptomoon.com</span>${shot ? "" : `<span style="color:${SOFT};font-weight:500">RUO peptide business infrastructure</span>`}</div>
       <div style="position:absolute;left:0;right:0;bottom:0;height:16px;background:${NAVY}"></div>
       <div style="position:absolute;right:0;bottom:0;height:16px;width:140px;background:${YELLOW}"></div>`;

  return `
  <div style="position:absolute;inset:0;padding:48px 64px;font-family:var(--font-sans),system-ui,sans-serif">
    <div style="display:flex;justify-content:space-between;align-items:center;height:60px">
      <img src="/brand/peptomoon-wordmark.webp" style="height:76px;width:auto"/>
      <span style="font:600 20px var(--font-sans);letter-spacing:.16em;text-transform:uppercase;color:${SOFT}">${esc(c.kicker)}</span>
    </div>
    <div style="margin-top:26px;border-top:2px solid rgba(11,22,35,.2)"></div>
    <h1 style="margin:${strip ? 34 : 44}px 0 0;max-width:${maxW}px;font:700 ${size}px/1.0 var(--font-display),sans-serif;font-variation-settings:'wdth' 110;letter-spacing:-.012em;text-transform:uppercase;color:${INK};text-wrap:balance">${titleHtml}</h1>
    ${
      c.subtitle && !strip
        ? `<p style="margin:26px 0 0;max-width:${shot ? 520 : 940}px;font:400 27px/1.38 var(--font-sans);color:${SOFT};display:-webkit-box;-webkit-line-clamp:${shot ? 4 : 2};-webkit-box-orient:vertical;overflow:hidden">${esc(c.subtitle)}</p>`
        : ""
    }
    ${stripHtml}${shotHtml}
  </div>
  ${footer}`;
}

const cards: Card[] = [
  { file: "default", kicker: "RUO peptide business infrastructure", title: "One partner. Every moving part of your RUO peptide business.", accent: "RUO peptide business.", visual: "strip" },
  { file: "services", kicker: "Services", title: "Thirteen services. One partner.", visual: "strip" },
  { file: "case-studies", kicker: "Case studies", title: "Selected work from 50+ sites.", visual: "strip" },
  { file: "resources", kicker: "Guides and resources", title: "Guides for the business behind RUO.", visual: "strip" },
  { file: "about", kicker: "About", title: "Built for the business behind RUO.", visual: "strip" },
  { file: "contact", kicker: "Contact", title: "Tell us what you need.", visual: "strip" },
  ...services.map((s): Card => ({
    file: `service-${s.slug}`,
    kicker: `Service · ${pillars.find((p) => p.key === s.pillar)?.label ?? ""}`,
    title: s.name,
    subtitle: brief(s.summary),
  })),
  ...allArticles.map((a): Card => ({
    file: `article-${a.slug}`,
    kicker: `Guide · ${readingMinutes(a)} min read`,
    title: a.title,
    subtitle: brief(a.excerpt),
  })),
  ...caseStudies.map((c): Card => {
    const item = portfolio.find((p) => p.slug === c.slug)!;
    return { file: `case-${c.slug}`, kicker: "Case study", title: item.name, subtitle: brief(item.blurb, 170), visual: "shot", shot: item.images.desktop.src };
  }),
];

async function main() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await (await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, reducedMotion: "reduce" })).newPage();
  await page.goto(`${base}/about`, { waitUntil: "networkidle", timeout: 120000 });
  await page.addStyleTag({ content: "nextjs-portal,#__next-build-watcher,[data-nextjs-toast]{display:none!important}html{overflow:hidden!important}" });
  await page.evaluate(() => document.fonts.ready);

  for (const c of cards) {
    await page.evaluate(
      ([html]) => {
        let el = document.getElementById("__og");
        if (!el) {
          el = document.createElement("div");
          el.id = "__og";
          document.body.appendChild(el);
        }
        el.setAttribute("style", "position:fixed;left:0;top:0;width:1200px;height:630px;z-index:2147483000;background:#fffdf7;overflow:hidden");
        el.innerHTML = html;
      },
      [markup(c)],
    );
    await page.waitForFunction(() => [...document.querySelectorAll("#__og img")].every((i) => (i as HTMLImageElement).complete && (i as HTMLImageElement).naturalWidth > 0), null, { timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } });
    await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(outDir, `${c.file}.jpg`));
    console.log("og", c.file);
  }
  await browser.close();
  console.log(`make-og: wrote ${cards.length} images to public/og`);
}

void main();
