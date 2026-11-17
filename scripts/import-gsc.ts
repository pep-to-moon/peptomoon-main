/**
 * Builds src/content/gsc-data.ts from Google Search Console performance exports. Run with: pnpm import:gsc
 *
 * Each folder in data/gsc/ is one store. Put the file from Search Console's "Export data" download in it, either the
 * Excel file (.xlsx, with its Chart and Queries sheets) or the CSV files (Dates.csv or Chart.csv, and Queries.csv).
 * Stores are shown as "Store 1", "Store 2" and so on, in folder order. No site name, domain or folder name is written
 * to the generated file, so nothing identifies a store. Every number comes from the export and nothing is invented.
 *
 * Individual search queries are never read or published: they can include product and usage terms, so only totals,
 * the weekly chart, countries and devices are used.
 */
import fs from "node:fs";
import path from "node:path";
import { readXlsx } from "./lib/xlsx-lite";

const root = process.cwd();
const dir = path.join(root, "data", "gsc");

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  const src = text.replace(/^﻿/, "");
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"' && src[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(cell);
      cell = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i++;
      row.push(cell);
      if (row.some((x) => x.trim() !== "")) rows.push(row);
      row = [];
      cell = "";
    } else cell += c;
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    if (row.some((x) => x.trim() !== "")) rows.push(row);
  }
  return rows;
}

const num = (v: string | undefined) => Number((v ?? "").replace(/[%,\s]/g, ""));

type Table = { head: string[]; body: string[][]; idx: (re: RegExp) => number; source: string };

function toTable(rows: string[][], source: string): Table {
  const [head, ...body] = rows;
  return { head, body, source, idx: (re) => head.findIndex((h) => re.test((h ?? "").trim().toLowerCase())) };
}

/** Finds a table in a store folder: first an .xlsx sheet by name, then a CSV file by name. */
function findTable(folder: string, sheetNames: RegExp, csvNames: string[]): Table | null {
  for (const f of fs.readdirSync(folder).filter((x) => /\.xlsx$/i.test(x) && !x.startsWith("~$"))) {
    const sheet = readXlsx(path.join(folder, f)).find((s) => sheetNames.test(s.name.trim()));
    if (sheet && sheet.rows.length > 1) return toTable(sheet.rows, path.join(folder, f));
  }
  for (const name of csvNames) {
    const file = path.join(folder, name);
    if (fs.existsSync(file)) return toTable(parseCsv(fs.readFileSync(file, "utf8")), file);
  }
  return null;
}

function mondayOf(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  const shift = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - shift);
  return d.toISOString().slice(0, 10);
}

const sites: unknown[] = [];
const problems: string[] = [];
const folders = fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort() : [];

folders.forEach((name, n) => {
  const folder = path.join(dir, name);
  const dates = findTable(folder, /^(chart|dates)$/i, ["Dates.csv", "Chart.csv"]);
  if (!dates) {
    problems.push(`${name}: no Chart or Dates data (an .xlsx with a Chart sheet, or Dates.csv)`);
    return;
  }
  const iDate = dates.idx(/^date/);
  const iClicks = dates.idx(/clicks/);
  const iImp = dates.idx(/impressions/);
  const iPos = dates.idx(/position/);
  if ([iDate, iClicks, iImp, iPos].some((i) => i < 0)) {
    problems.push(`${name}: the dates table needs Date, Clicks, Impressions and Position columns`);
    return;
  }

  const days = dates.body
    .map((r) => ({ date: (r[iDate] ?? "").trim(), clicks: num(r[iClicks]), impressions: num(r[iImp]), position: num(r[iPos]) }))
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d.date) && Number.isFinite(d.clicks) && Number.isFinite(d.impressions))
    .sort((a, b) => (a.date < b.date ? -1 : 1));
  if (days.length === 0) {
    problems.push(`${name}: no usable rows in the dates table`);
    return;
  }

  const buckets = new Map<string, { clicks: number; impressions: number; posWeight: number }>();
  for (const d of days) {
    const k = mondayOf(d.date);
    const b = buckets.get(k) ?? { clicks: 0, impressions: 0, posWeight: 0 };
    b.clicks += d.clicks;
    b.impressions += d.impressions;
    b.posWeight += (Number.isFinite(d.position) ? d.position : 0) * d.impressions;
    buckets.set(k, b);
  }
  const weekly = [...buckets.entries()].map(([date, b]) => ({
    date,
    clicks: b.clicks,
    impressions: b.impressions,
    ctr: b.impressions ? b.clicks / b.impressions : 0,
    position: b.impressions ? b.posWeight / b.impressions : 0,
  }));

  const clicks = days.reduce((s, d) => s + d.clicks, 0);
  const impressions = days.reduce((s, d) => s + d.impressions, 0);
  const posWeight = days.reduce((s, d) => s + (Number.isFinite(d.position) ? d.position : 0) * d.impressions, 0);

  // Reach breakdowns that are safe to publish. Individual search queries are deliberately not read or kept.
  const shares = (sheet: RegExp, csv: string, limit: number) => {
    const t = findTable(folder, sheet, [csv]);
    if (!t) return [];
    const ic = t.idx(/clicks/);
    const ii = t.idx(/impressions/);
    return t.body
      .map((r) => ({ name: (r[0] ?? "").trim(), clicks: num(r[ic]), impressions: num(r[ii]) }))
      .filter((r) => r.name && Number.isFinite(r.clicks))
      .sort((x, y) => y.clicks - x.clicks)
      .slice(0, limit);
  };
  const countries = shares(/^countries$/i, "Countries.csv", 6);
  const devices = shares(/^devices$/i, "Devices.csv", 4);

  const exportedOn = fs.statSync(dates.source).mtime.toISOString().slice(0, 10);
  sites.push({
    id: `store-${n + 1}`,
    label: `Store ${n + 1}`,
    from: days[0].date,
    to: days[days.length - 1].date,
    clicks,
    impressions,
    ctr: impressions ? clicks / impressions : 0,
    position: impressions ? posWeight / impressions : 0,
    weekly,
    countries,
    devices,
    exportedOn,
  });
  console.log(`store-${n + 1}: ${days.length} days, ${clicks} clicks, ${impressions} impressions, ${countries.length} countries, ${devices.length} devices`);
});

if (problems.length) {
  console.error(problems.map((p) => ` - ${p}`).join("\n"));
  process.exit(1);
}

const out = `// Generated by \`pnpm import:gsc\` from the Search Console exports in data/gsc. Do not edit by hand.
import type { GscSite } from "./gsc";

export const gscSites: GscSite[] = ${JSON.stringify(sites, null, 2)};
`;
fs.writeFileSync(path.join(root, "src", "content", "gsc-data.ts"), out);
console.log(`import-gsc: wrote ${sites.length} store(s) to src/content/gsc-data.ts`);
