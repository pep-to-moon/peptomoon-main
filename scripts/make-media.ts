/**
 * Draws placeholder art for every photo slot that does not have a real photo yet.
 * Usage: pnpm make:media          (skips slots that already have a file or a credit entry)
 *        pnpm make:media --force  (redraws every placeholder, but never a slot with a real photo)
 *
 * The art is a soft blue grain gradient, so pages look finished and keep their exact layout. Replace the files with
 * real photos (pnpm fetch:images) and nothing else needs to change.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { media, type MediaKey } from "../src/content/media";
import credits from "../src/content/media-credits.json";

const force = process.argv.includes("--force");
const outDir = path.join(process.cwd(), "public", "images");

function rng(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hsl(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const x = (v: number) => Math.round(v * 255).toString(16).padStart(2, "0");
  return `#${x(f(0))}${x(f(8))}${x(f(4))}`;
}

/** Dark duotone with one of four compositions (rings, horizon arcs, dot field, diagonal lines), a solid disc and one yellow dot. */
function art(key: string, w: number, h: number, hue: number) {
  const r = rng(key);
  const m = Math.max(w, h);
  const variant = [...key].reduce((s, ch) => s + ch.charCodeAt(0), 0) % 4;
  const line = hsl(hue + 18, 75, 78);
  let pattern = "";
  let ax = 0;
  let ay = 0;
  if (variant === 0 || variant === 1) {
    // Concentric rings, centred inside the frame (0) or rising from below it (1).
    const cx = Math.round(w * (variant === 0 ? 0.28 + r() * 0.44 : 0.3 + r() * 0.4));
    const cy = Math.round(variant === 0 ? h * (0.3 + r() * 0.4) : h * 1.08);
    const step = Math.round(m * (variant === 0 ? 0.055 + r() * 0.02 : 0.085 + r() * 0.02));
    pattern = Array.from({ length: 11 }, (_, i) => {
      const op = (0.4 - i * 0.028).toFixed(3);
      return `<circle cx="${cx}" cy="${cy}" r="${step * (i + 2)}" fill="none" stroke="${line}" stroke-width="${i % 4 === 0 ? 2.2 : 1.2}" opacity="${op}"/>`;
    }).join("");
    ax = cx + Math.round(step * 6.2 * Math.cos(r() * 6.28));
    ay = cy + Math.round(step * 6.2 * Math.sin(r() * 6.28));
    if (variant === 1) ay = Math.round(h * (0.25 + r() * 0.4));
  } else if (variant === 2) {
    pattern = `<mask id="mk"><rect width="${w}" height="${h}" fill="url(#rg)"/></mask><rect width="${w}" height="${h}" fill="url(#dots)" mask="url(#mk)"/>`;
    ax = Math.round(w * (0.2 + r() * 0.6));
    ay = Math.round(h * (0.2 + r() * 0.6));
  } else {
    pattern = `<mask id="mk"><rect width="${w}" height="${h}" fill="url(#lg)"/></mask><rect width="${w}" height="${h}" fill="url(#lines)" mask="url(#mk)"/>`;
    ax = Math.round(w * (0.25 + r() * 0.5));
    ay = Math.round(h * (0.25 + r() * 0.5));
  }
  const dx = Math.round(w * (0.12 + r() * 0.76));
  const dy = Math.round(h * (0.12 + r() * 0.76));
  const dr = Math.round(m * (0.1 + r() * 0.07));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${hsl(hue, 52, 9)}"/><stop offset="1" stop-color="${hsl(hue + 10, 46, 21)}"/></linearGradient>
      <linearGradient id="d" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${hsl(hue + 12, 72, 72)}"/><stop offset="1" stop-color="${hsl(hue - 4, 62, 44)}"/></linearGradient>
      <radialGradient id="rg" cx="0.5" cy="0.5" r="0.62"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
      <linearGradient id="lg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000"/><stop offset="0.7" stop-color="#fff"/><stop offset="1" stop-color="#fff"/></linearGradient>
      <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="1.8" fill="${line}" opacity="0.5"/></pattern>
      <pattern id="lines" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(32)"><rect width="1.3" height="22" fill="${line}" opacity="0.32"/></pattern>
      <filter id="n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 0.55"/></feComponentTransfer></filter>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    ${pattern}
    <circle cx="${dx}" cy="${dy}" r="${dr}" fill="url(#d)" opacity="0.92"/>
    <circle cx="${ax}" cy="${ay}" r="${Math.round(m * 0.014)}" fill="#fdc921"/>
    <rect width="${w}" height="${h}" filter="url(#n)" opacity="0.4"/>
  </svg>`;
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  let drawn = 0;
  for (const key of Object.keys(media) as MediaKey[]) {
    const file = path.join(outDir, `${media[key].file}.webp`);
    const real = key in (credits as Record<string, unknown>);
    const exists = await fs.stat(file).then(() => true, () => false);
    if (real || (exists && !force)) continue;
    const { w, h, hue } = media[key];
    await sharp(Buffer.from(art(key, w, h, hue))).webp({ quality: 72 }).toFile(file);
    drawn++;
  }
  console.log(`make-media: drew ${drawn} placeholder image(s) in public/images`);
}

void main();
