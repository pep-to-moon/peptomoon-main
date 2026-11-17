import type { Block } from "../types";

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const p = (text: string): Block => ({ type: "p", text });
export const h2 = (text: string): Block => ({ type: "h2", text, id: slug(text) });
export const h3 = (text: string): Block => ({ type: "h3", text });
export const ul = (...items: string[]): Block => ({ type: "ul", items });
export const ol = (...items: string[]): Block => ({ type: "ol", items });
export const callout = (title: string, text: string): Block => ({ type: "callout", title, text });
export const table = (caption: string, head: string[], ...rows: string[][]): Block => ({ type: "table", caption, head, rows });
