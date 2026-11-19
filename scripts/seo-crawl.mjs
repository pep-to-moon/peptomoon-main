/**
 * Free SEO crawl: fetches every URL in the sitemap as Googlebot (mobile), follows redirects by hand and writes one JSON record
 * per page: status, redirect hops, title, description, canonical, robots, H1 to H3, word counts, body links (inside <main>, with
 * <nav> blocks such as breadcrumbs excluded), all internal links, tables, FAQs, images, JSON-LD types and whether GA4 and Clarity load.
 * It uses only Node's built-in fetch, so it costs nothing and needs no install. See docs/seo/ for how the results are used.
 *
 *   node scripts/seo-crawl.mjs https://peptomoon.com scratch/crawl.json [/extra-path,/another]
 *
 * Point it at a local production build (pnpm build, then pnpm start -p 3300) to check a change before it ships: the sitemap's host
 * is rewritten to the base URL you pass. Write the output under scratch/ (git-ignored); do not commit it.
 */
import fs from "node:fs";
const base = process.argv[2];
const out = process.argv[3];
const UA = "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const strip = (h) => decode(h.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const attr = (tag, name) => { const m = tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i")); return m ? decode(m[2] ?? m[3] ?? "") : null; };

async function get(url) {
  const hops = []; let cur = url;
  for (let i = 0; i < 8; i++) {
    const r = await fetch(cur, { redirect: "manual", headers: { "user-agent": UA, accept: "text/html" } });
    hops.push({ url: cur, status: r.status, location: r.headers.get("location") });
    if (r.status >= 300 && r.status < 400 && r.headers.get("location")) { cur = new URL(r.headers.get("location"), cur).toString(); continue; }
    return { hops, final: cur, status: r.status, headers: Object.fromEntries(r.headers.entries()), body: await r.text() };
  }
  return { hops, final: cur, status: 0, headers: {}, body: "" };
}

function analyse(html) {
  const head = (html.match(/<head[\s\S]*?<\/head>/i) || [""])[0];
  const title = decode((head.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "");
  const metas = [...html.matchAll(/<meta\s[^>]*>/gi)].map((m) => m[0]);
  const meta = (n) => { const t = metas.find((m) => (attr(m, "name") || attr(m, "property") || "").toLowerCase() === n); return t ? attr(t, "content") : null; };
  const links = [...html.matchAll(/<link\s[^>]*>/gi)].map((m) => m[0]);
  const canonical = (() => { const l = links.find((x) => (attr(x, "rel") || "").toLowerCase() === "canonical"); return l ? attr(l, "href") : null; })();
  const body = (html.match(/<body[\s\S]*<\/body>/i) || [html])[0];
  const mainHtml = (body.match(/<main[\s\S]*<\/main>/i) || [""])[0];
  const headingsOf = (h) => [...h.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({ level: +m[1], text: strip(m[2]) }));
  const headings = headingsOf(body);
  const mainHeadings = headingsOf(mainHtml);
  const origin = new URL(base).origin;
  const anchorsOf = (h) => [...h.matchAll(/<a\s[^>]*>([\s\S]*?)<\/a>/gi)].map((m) => ({ href: attr(m[0], "href"), text: strip(m[1]), rel: attr(m[0], "rel"), target: attr(m[0], "target") })).filter((a) => a.href);
  const norm = (h) => h.replace(origin, "").split("#")[0].replace(/\?.*$/, "") || "/";
  const isInt = (a) => (a.href.startsWith("/") && !a.href.startsWith("//")) || a.href.startsWith(origin);
  const mainNoNav = mainHtml.replace(/<nav[\s\S]*?<\/nav>/gi, "");
  const allA = anchorsOf(body), mainA = anchorsOf(mainNoNav);
  const ld = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => { try { return JSON.parse(m[1]); } catch { return { __invalid: 1 }; } });
  const types = []; const walk = (o) => { if (!o) return; if (Array.isArray(o)) return o.forEach(walk); if (typeof o === "object") { if (o["@type"]) types.push([].concat(o["@type"]).join("+")); Object.values(o).forEach(walk); } }; ld.forEach(walk);
  const imgs = [...body.matchAll(/<img\s[^>]*>/gi)].map((m) => ({ alt: attr(m[0], "alt"), loading: attr(m[0], "loading"), src: attr(m[0], "src") }));
  const text = strip(body), mainText = strip(mainHtml);
  return {
    title, titleLen: title.length, description: meta("description"), descLen: (meta("description") || "").length,
    robotsMeta: meta("robots"), canonical, lang: (html.match(/<html[^>]*lang="([^"]*)"/i) || [])[1] || null,
    ogTitle: meta("og:title"), ogImage: meta("og:image"), twitterCard: meta("twitter:card"),
    h1: headings.filter((h) => h.level === 1).map((h) => h.text),
    h1Aria: [...body.matchAll(/<h1[^>]*aria-label="([^"]*)"/gi)].map((m) => decode(m[1])),
    mainH2: mainHeadings.filter((h) => h.level === 2).map((h) => h.text),
    mainH3: mainHeadings.filter((h) => h.level === 3).map((h) => h.text),
    words: text.split(/\s+/).filter(Boolean).length, mainWords: mainText.split(/\s+/).filter(Boolean).length,
    mainText,
    allInternal: allA.filter(isInt).map((a) => ({ href: norm(a.href), text: a.text })),
    mainInternal: mainA.filter(isInt).map((a) => ({ href: norm(a.href), text: a.text })),
    mainExternal: mainA.filter((a) => /^https?:/.test(a.href) && !a.href.startsWith(origin)).map((a) => ({ href: a.href, text: a.text, rel: a.rel })),
    details: (mainHtml.match(/<details/g) || []).length, tables: (mainHtml.match(/<table/g) || []).length,
    ol: (mainHtml.match(/<ol/g) || []).length, ul: (mainHtml.match(/<ul/g) || []).length,
    imgCount: imgs.length, imgEmptyAlt: imgs.filter((i) => i.alt === "").length, imgNoAlt: imgs.filter((i) => i.alt === null).length,
    ldTypes: [...new Set(types)], ldCount: ld.length,
    gaPresent: /googletagmanager/.test(html), clarityPresent: /clarity\.ms/.test(html),
    htmlBytes: html.length,
  };
}

const sm = await fetch(base + "/sitemap.xml").then((r) => r.text());
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, base).replace(/\/$/, ""));
const extra = (process.argv[4] || "").split(",").filter(Boolean).map((p) => base + p);
const all = [...new Set([...urls, ...extra])];
const results = [];
for (const u of all) {
  try { const r = await get(u); const a = r.status === 200 && /html/.test(r.headers["content-type"] || "") ? analyse(r.body) : {}; results.push({ url: u, status: r.status, hops: r.hops, xrobots: r.headers["x-robots-tag"] || null, ...a }); }
  catch (e) { results.push({ url: u, error: String(e) }); }
}
fs.writeFileSync(out, JSON.stringify(results, null, 1));
console.log("crawled", results.length, "->", out);
