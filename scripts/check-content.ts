/**
 * Content and SEO integrity checks. Run with: pnpm check:content
 * Fails on: em dashes, risky claim phrases, broken relations, duplicate primary keywords, unknown internal links,
 * unlinked static pages, and case studies that disagree with the portfolio data.
 */
import fs from "node:fs";
import path from "node:path";
import { allArticles, articleWordCount } from "../src/content/articles";
import { caseStudies } from "../src/content/case-studies";
import { portfolio } from "../src/content/portfolio";
import { servicePaths } from "../src/content/service-paths";
import { headingsFor } from "../src/content/service-headings";
import { services } from "../src/content/services";
import { getStaticRoutes } from "../src/lib/routes";

const root = process.cwd();
const failures: string[] = [];
const fail = (msg: string) => failures.push(msg);

function walk(dir: string, out: string[] = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}
const files = walk(path.join(root, "src"));
const rel = (f: string) => path.relative(root, f).replace(/\\/g, "/");

// 1. Em dashes and risky phrases (a negation on the same line makes a phrase acceptable).
const banned = [
  /fda[- ]compliant/i,
  /fda[- ]approved/i,
  /fully compliant/i,
  /guarantee[sd]?\s+(approval|ranking|results|payment|processing|compliance|placement)/i,
  /\bundetectable\b/i,
  /\bbypass(?:ing|es)?\b/i,
  /\bevad(?:e|es|ing)\b/i,
];
// A negation, or a question mark (a question that asks about a guarantee is not making one), makes a phrase acceptable.
const negation = /\b(cannot|can't|never|not|no one|nobody|without|don't|doesn't|neither|nor)\b|\?/i;
for (const file of files) {
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    if (line.includes("—")) fail(`${rel(file)}:${i + 1} contains an em dash`);
    for (const re of banned) if (re.test(line) && !negation.test(line)) fail(`${rel(file)}:${i + 1} risky phrase ${re}: ${line.trim().slice(0, 80)}`);
  });
}

// 2. Unique primary keywords.
const seen = new Map<string, string>();
const keywordOwners: [string, string][] = [
  ...services.map((s): [string, string] => [s.primaryKeyword, `service:${s.slug}`]),
  ...allArticles.map((a): [string, string] => [a.primaryKeyword, `article:${a.slug}`]),
  ...caseStudies.map((c): [string, string] => [c.primaryKeyword, `case-study:${c.slug}`]),
];
for (const [kw, owner] of keywordOwners) {
  const k = kw.toLowerCase();
  if (seen.has(k)) fail(`duplicate primary keyword "${kw}" on ${owner} and ${seen.get(k)}`);
  seen.set(k, owner);
}

// 3. Title and description lengths for content-driven pages.
const metas: [string, string, string][] = [
  ...services.map((s): [string, string, string] => [`service:${s.slug}`, s.seo.title, s.seo.description]),
  ...allArticles.map((a): [string, string, string] => [`article:${a.slug}`, a.seo.title, a.seo.description]),
  ...caseStudies.map((c): [string, string, string] => [`case-study:${c.slug}`, c.seo.title, c.seo.description]),
];
for (const [who, title, desc] of metas) {
  if (title.length > 62) fail(`${who}: title is ${title.length} characters (max 62): ${title}`);
  if (desc.length < 70 || desc.length > 165) fail(`${who}: description is ${desc.length} characters (70 to 165)`);
}

// 4. Relations.
const serviceSlugs = new Set(services.map((s) => s.slug));
for (const p of servicePaths) p.slugs.forEach((r) => !serviceSlugs.has(r) && fail(`service path ${p.id}: unknown service ${r}`));
const articleSlugs = new Set(allArticles.map((a) => a.slug));
const studySlugs = new Set(caseStudies.map((c) => c.slug));
const portfolioSlugs = new Set(portfolio.map((p) => p.slug));
for (const s of services) {
  s.related.forEach((r) => !serviceSlugs.has(r) && fail(`service ${s.slug}: unknown related service ${r}`));
  s.caseStudies.forEach((r) => !studySlugs.has(r) && fail(`service ${s.slug}: unknown case study ${r}`));
  s.articles.forEach((r) => !articleSlugs.has(r) && fail(`service ${s.slug}: unknown article ${r}`));
  if (s.problems.length < 3 || s.included.length < 4 || s.faqs.length < 6) fail(`service ${s.slug}: content too thin`);
}
// Service section headings must be distinct across services. A shared heading is the identical-template problem this
// guard prevents, and a new service without its own entry in service-headings.ts falls back to the shared defaults and fails here.
const headingOwners = new Map<string, string>();
for (const s of services) {
  const h = headingsFor(s.slug);
  for (const t of [h.what, s.whyTitle ?? h.why, h.problems, h.approach, h.included, h.tech]) {
    const k = t.toLowerCase();
    const owner = headingOwners.get(k);
    if (owner) fail(`service ${s.slug}: section heading "${t}" is also used by ${owner}`);
    else headingOwners.set(k, s.slug);
  }
}
for (const a of allArticles) {
  if (!serviceSlugs.has(a.service)) fail(`article ${a.slug}: unknown service ${a.service}`);
  a.related.forEach((r) => !articleSlugs.has(r) && fail(`article ${a.slug}: unknown related article ${r}`));
  // Guides must be substantial: a quick answer, takeaways, tables, enough sections and real questions.
  const words = articleWordCount(a);
  if (words < 2000) fail(`article ${a.slug}: only ${words} words (minimum 2000)`);
  if (a.quickAnswer.trim().length < 150) fail(`article ${a.slug}: quick answer is too short`);
  if (a.takeaways.length < 4 || a.takeaways.length > 6) fail(`article ${a.slug}: needs four to six key takeaways`);
  if (a.blocks.filter((b) => b.type === "h2").length < 8) fail(`article ${a.slug}: needs at least eight sections`);
  if (a.blocks.filter((b) => b.type === "table").length < 2) fail(`article ${a.slug}: needs at least two tables`);
  if (a.faqs.length < 5) fail(`article ${a.slug}: needs at least five questions`);
}
for (const c of caseStudies) {
  c.services.forEach((r) => !serviceSlugs.has(r) && fail(`case study ${c.slug}: unknown service ${r}`));
  c.related.forEach((r) => !portfolioSlugs.has(r) && fail(`case study ${c.slug}: unknown related ${r}`));
  const item = portfolio.find((p) => p.slug === c.slug);
  if (!item?.caseStudy) fail(`case study ${c.slug}: portfolio entry is not flagged caseStudy`);
  const fields = ["overview", "requirements", "design", "architecture", "ecommerce", "technical", "seoNotes", "maintenance"] as const;
  const verified = fields.filter((f) => c[f].status === "verified").length;
  if (verified < fields.length) fail(`case study ${c.slug}: only ${verified}/${fields.length} core sections verified`);
}
for (const p of portfolio) if (p.caseStudy && !studySlugs.has(p.slug)) fail(`portfolio ${p.slug}: flagged caseStudy but no case study exists`);

// 5. Internal links: every literal internal path must resolve to a known route.
const known = new Set<string>([
  ...getStaticRoutes().map((r) => r.path),
  ...services.map((s) => `/services/${s.slug}`),
  ...caseStudies.map((c) => `/case-studies/${c.slug}`),
  ...allArticles.map((a) => `/resources/${a.slug}`),
]);
const literal = /(?:["'`]|\]\()(\/[A-Za-z0-9\-_/]*)(?:\?[^"'`)\s]*)?(?:["'`]|\))/g;
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  let m: RegExpExecArray | null;
  while ((m = literal.exec(text)) !== null) {
    const p = m[1].replace(/\/$/, "") || "/";
    if (p.startsWith("/api") || p.startsWith("/portfolio") || p.startsWith("/icon") || p.startsWith("/_next") || p === "/") continue;
    if (/^\/(services|resources|case-studies)$/.test(p) || known.has(p)) continue;
    // Ignore obvious non-routes such as regular expression fragments and Tailwind-like tokens.
    if (!/^\/(services|resources|case-studies|about|contact|glossary|why-peptomoon|all-in-one|privacy-policy|terms-of-service|disclaimer|cookie-policy|editorial-policy)(\/|$)/.test(p)) continue;
    fail(`${rel(file)}: link to unknown route ${p}`);
  }
}

// 6. Static pages must be linked from somewhere other than the route table.
for (const route of getStaticRoutes()) {
  if (route.path === "/") continue;
  const used = files.some((f) => !f.endsWith("routes.ts") && fs.readFileSync(f, "utf8").includes(`"${route.path}"`));
  if (!used) fail(`static page ${route.path} is not linked from anywhere`);
}

if (failures.length) {
  console.error(`check-content: ${failures.length} problem(s)\n - ${failures.join("\n - ")}`);
  process.exit(1);
}
console.log(
  `check-content: ok (${services.length} services, ${allArticles.length} articles, ${caseStudies.length} case studies, ${portfolio.length} portfolio items, ${files.length} source files scanned)`,
);
