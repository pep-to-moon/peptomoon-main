/**
 * Minimal .xlsx reader for Search Console's "Download Excel" exports. An .xlsx file is a zip of XML parts, so this
 * reads the zip directory, inflates the parts it needs and returns every sheet as rows of text. No dependency.
 * It handles shared strings, inline strings and numbers, which is all a Search Console export uses.
 */
import fs from "node:fs";
import zlib from "node:zlib";

export type Sheet = { name: string; rows: string[][] };

function unzip(buf: Buffer): Map<string, Buffer> {
  const files = new Map<string, Buffer>();
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0; i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error("not a zip file");
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  for (let n = 0; n < count; n++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error("bad zip directory");
    const method = buf.readUInt16LE(p + 10);
    const compressed = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.toString("utf8", p + 46, p + 46 + nameLen);
    const dataStart = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const raw = buf.subarray(dataStart, dataStart + compressed);
    files.set(name, method === 0 ? raw : zlib.inflateRawSync(raw));
    p += 46 + nameLen + extraLen + commentLen;
  }
  return files;
}

const decode = (s: string) =>
  s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, d: string) => String.fromCodePoint(Number(d)))
    .replace(/&amp;/g, "&");

const textOf = (xml: string) => [...xml.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((m) => decode(m[1])).join("");

function columnIndex(ref: string) {
  let n = 0;
  for (const ch of ref.replace(/\d+/g, "")) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
}

export function readXlsx(file: string): Sheet[] {
  const parts = unzip(fs.readFileSync(file));
  const get = (name: string) => parts.get(name)?.toString("utf8") ?? "";

  const shared = [...get("xl/sharedStrings.xml").matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) => textOf(m[1]));
  const rels = new Map<string, string>();
  for (const m of get("xl/_rels/workbook.xml.rels").matchAll(/<Relationship\b[^>]*>/g)) {
    const id = /Id="([^"]+)"/.exec(m[0])?.[1];
    const target = /Target="([^"]+)"/.exec(m[0])?.[1];
    if (id && target) rels.set(id, target.replace(/^\//, "").replace(/^(?!xl\/)/, "xl/"));
  }

  const sheets: Sheet[] = [];
  for (const m of get("xl/workbook.xml").matchAll(/<sheet\b[^>]*>/g)) {
    const name = decode(/name="([^"]*)"/.exec(m[0])?.[1] ?? "");
    const rid = /r:id="([^"]+)"/.exec(m[0])?.[1] ?? "";
    const xml = get(rels.get(rid) ?? "");
    const rows: string[][] = [];
    for (const r of xml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
      const row: string[] = [];
      for (const c of r[1].matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
        const ref = /r="([A-Z]+\d+)"/.exec(c[1])?.[1];
        if (!ref) continue;
        const type = /t="([^"]+)"/.exec(c[1])?.[1];
        const body = c[2] ?? "";
        let value = "";
        if (type === "s") value = shared[Number(/<v>([\s\S]*?)<\/v>/.exec(body)?.[1])] ?? "";
        else if (type === "inlineStr") value = textOf(body);
        else value = decode(/<v>([\s\S]*?)<\/v>/.exec(body)?.[1] ?? "");
        row[columnIndex(ref)] = value;
      }
      rows.push(Array.from(row, (v) => v ?? ""));
    }
    sheets.push({ name, rows });
  }
  return sheets;
}
