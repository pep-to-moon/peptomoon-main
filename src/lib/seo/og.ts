import fs from "node:fs";
import path from "node:path";
import { absoluteUrl } from "@/config/site";

/**
 * Picks the share image for a page. Images are drawn by `pnpm make:og` into public/og. A page without its own image
 * falls back to the default one, so a link is never broken.
 */
export function ogImageFor(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  let file = "default";
  if (parts[0] === "services") file = parts[1] ? `service-${parts[1]}` : "services";
  else if (parts[0] === "case-studies") file = parts[1] ? `case-${parts[1]}` : "case-studies";
  else if (parts[0] === "resources") file = parts[1] ? `article-${parts[1]}` : "resources";
  else if (parts[0] === "about") file = "about";
  else if (parts[0] === "contact") file = "contact";
  else if (parts[0] === "all-in-one") file = "all-in-one";
  if (!fs.existsSync(path.join(process.cwd(), "public", "og", `${file}.jpg`))) file = "default";
  return absoluteUrl(`/og/${file}.jpg`);
}

export const ogSize = { width: 1200, height: 630 } as const;
