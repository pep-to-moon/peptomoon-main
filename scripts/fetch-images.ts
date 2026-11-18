/**
 * Replaces the placeholder art with real, free-licence photographs from Unsplash, through Unsplash's official API.
 *
 * Setup: create a free app at https://unsplash.com/developers and copy its Access Key.
 * Usage: UNSPLASH_ACCESS_KEY=xxxx pnpm fetch:images            (fills every slot that has no real photo yet)
 *        UNSPLASH_ACCESS_KEY=xxxx pnpm fetch:images lab-bench  (one slot, replacing its photo)
 *
 * Each photo is cropped to its slot's size, saved as /public/images/<key>.webp, and recorded in
 * src/content/media-credits.json with its photographer and true alt text. The key is read from the environment only
 * and is never written anywhere. Unsplash photos may be used commercially without attribution, and the credits file
 * keeps the record anyway. The API's download endpoint is pinged for every photo used, as Unsplash's guidelines ask.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { media, type MediaKey } from "../src/content/media";
import credits from "../src/content/media-credits.json";

const key = process.env.UNSPLASH_ACCESS_KEY;
if (!key) {
  console.error("Set UNSPLASH_ACCESS_KEY (a free key from https://unsplash.com/developers) and run again.");
  process.exit(1);
}
const headers = { Authorization: `Client-ID ${key}`, "Accept-Version": "v1" };
const only = process.argv[2] as MediaKey | undefined;
const outDir = path.join(process.cwd(), "public", "images");
const creditsFile = path.join(process.cwd(), "src", "content", "media-credits.json");
const book = credits as Record<string, { alt: string; credit: string; creditUrl: string; photoUrl: string }>;

type Photo = {
  id: string;
  width: number;
  height: number;
  alt_description: string | null;
  description: string | null;
  urls: { raw: string };
  links: { html: string; download_location: string };
  user: { name: string; links: { html: string } };
};

async function api<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url.split("?")[0]}`);
  return (await res.json()) as T;
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const keys = (only ? [only] : (Object.keys(media) as MediaKey[]).filter((k) => !(k in book))) as MediaKey[];
  const used = new Set(Object.values(book).map((b) => b.photoUrl));
  for (const k of keys) {
    const slot = media[k];
    if (!slot) {
      console.error(`Unknown slot: ${k}`);
      continue;
    }
    const orientation = slot.w > slot.h ? "landscape" : "portrait";
    const found = await api<{ results: Photo[] }>(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(slot.query)}&orientation=${orientation}&per_page=12&content_filter=high`,
    );
    const pick = found.results.find((p) => !used.has(p.links.html) && p.width >= slot.w && p.height >= slot.h * 0.8);
    if (!pick) {
      console.warn(`${k}: no suitable photo for "${slot.query}"`);
      continue;
    }
    void fetch(pick.links.download_location, { headers }); // required by Unsplash's API guidelines
    const img = await fetch(`${pick.urls.raw}&w=${slot.w * 2}&fm=jpg&q=82`);
    const buf = Buffer.from(await img.arrayBuffer());
    await sharp(buf).resize(slot.w, slot.h, { fit: "cover", position: "attention" }).webp({ quality: 78 }).toFile(path.join(outDir, `${slot.file}.webp`));
    used.add(pick.links.html);
    book[k] = {
      alt: (pick.alt_description || pick.description || "").replace(/^\w/, (c) => c.toUpperCase()),
      credit: pick.user.name,
      creditUrl: `${pick.user.links.html}?utm_source=peptomoon&utm_medium=referral`,
      photoUrl: pick.links.html,
    };
    await fs.writeFile(creditsFile, JSON.stringify(book, null, 2) + "\n");
    console.log(`${k}: ${pick.user.name} (${pick.links.html})`);
  }
}

void main();
