import { absoluteUrl } from "@/config/site";
import { media, type MediaKey } from "@/content/media";
import { serviceMedia } from "@/content/service-media";

/** Absolute address of a photograph, using its descriptive file name. */
export const photoUrl = (key: MediaKey) => absoluteUrl(`/images/${media[key].file}.webp`);

/** The photographs a page shows, for the image sitemap and structured data. */
export function pageImages(path: string): string[] {
  const keys: MediaKey[] = [];
  if (path === "/") keys.push("lab-wide", "compliance", "team");
  else if (path === "/all-in-one") keys.push("lab-bench", "vials-macro", "layer-build", "layer-run", "layer-grow", "layer-verify", "website", "telehealth-dashboard", "process");
  else if (path === "/why-peptomoon") keys.push("process");
  else if (path.startsWith("/services/")) {
    const m = serviceMedia[path.slice("/services/".length)];
    if (m) keys.push(m.hero, m.band);
  }
  return keys.map(photoUrl);
}
