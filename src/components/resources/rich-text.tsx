import Link from "next/link";
import type { ReactNode } from "react";
import { getArticle } from "@/content/articles";
import type { Block } from "@/content/types";

/**
 * Terms that have an entry in the glossary. The first mention of each term in a guide links to its definition, so the
 * glossary receives contextual links from the pages that need it. Slugs match src/content/glossary.ts.
 */
const GLOSSARY_TERMS: { re: RegExp; slug: string }[] = [
  { re: /\bchargeback ratios?\b/i, slug: "chargeback-ratio" },
  { re: /\b(?:certificates? of analysis|COAs?)\b/, slug: "certificate-of-analysis" },
  { re: /\bHPLC\b/, slug: "hplc" },
  { re: /\bmass spectrometry\b/i, slug: "mass-spectrometry" },
  { re: /\brolling reserves?\b/i, slug: "rolling-reserve" },
  { re: /\bMATCH list\b/, slug: "match-list" },
  { re: /\bunderwriting\b/i, slug: "underwriting" },
  { re: /\bhigh-risk merchant accounts?\b/i, slug: "high-risk-merchant-account" },
  { re: /\b3PL\b/, slug: "threepl" },
  { re: /\bdropshipping\b/i, slug: "dropshipping" },
  { re: /\b(?:batch|lot) numbers?\b/i, slug: "batch-number" },
  { re: /\bISO\/IEC 17025\b/, slug: "iso-17025" },
];

const linkClass = "text-blue underline underline-offset-4 decoration-1 hover:decoration-2";

/** Splits plain text and links the first mention of each glossary term not yet linked on this page. */
function withGlossary(text: string, used: Set<string>, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  let rest = text;
  let n = 0;
  while (rest) {
    let best: { index: number; length: number; slug: string } | null = null;
    for (const g of GLOSSARY_TERMS) {
      if (used.has(g.slug)) continue;
      const m = g.re.exec(rest);
      if (m && (!best || m.index < best.index)) best = { index: m.index, length: m[0].length, slug: g.slug };
    }
    if (!best) {
      out.push(rest);
      break;
    }
    if (best.index > 0) out.push(rest.slice(0, best.index));
    used.add(best.slug);
    out.push(
      <Link key={`${keyBase}-g${n++}`} href={`/glossary#${best.slug}`} className={`${linkClass} decoration-dotted`}>
        {rest.slice(best.index, best.index + best.length)}
      </Link>,
    );
    rest = rest.slice(best.index + best.length);
  }
  return out;
}

/**
 * Inline links in the form [label](url). Links to unpublished articles degrade to plain text.
 * Pass `glossary` (a Set shared across one page) to also link the first mention of each glossary term.
 */
export function Inline({ text, glossary }: { text: string; glossary?: Set<string> }) {
  const parts: ReactNode[] = [];
  const plain = (s: string, key: string) => (glossary ? parts.push(...withGlossary(s, glossary, key)) : parts.push(s));
  let last = 0;
  let match: RegExpExecArray | null;
  const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
  while ((match = LINK.exec(text)) !== null) {
    if (match.index > last) plain(text.slice(last, match.index), `t${match.index}`);
    const [, label, url] = match;
    const external = /^https?:\/\//.test(url);
    const articleSlug = url.startsWith("/resources/") ? url.replace("/resources/", "") : null;
    if (articleSlug && !getArticle(articleSlug)) {
      parts.push(label);
    } else if (external) {
      parts.push(
        <a key={match.index} href={url} target="_blank" rel="noopener noreferrer" className="text-blue underline underline-offset-4 decoration-1 hover:decoration-2">
          {label}
        </a>,
      );
    } else {
      parts.push(
        <Link key={match.index} href={url} className="text-blue underline underline-offset-4 decoration-1 hover:decoration-2">
          {label}
        </Link>,
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) plain(text.slice(last), "tail");
  return <>{parts}</>;
}

export function RichText({ blocks }: { blocks: Block[] }) {
  // Glossary terms already linked in this guide. The first mention is linked, later ones stay plain text.
  const glossary = new Set<string>();
  return (
    <div className="prose-article text-[1.125rem] leading-[1.7]">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="mt-5">
                <Inline text={b.text} glossary={glossary} />
              </p>
            );
          case "h2":
            return (
              <h2 key={i} id={b.id} className="display display-md mt-14 scroll-mt-28">
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="heading-sm mt-9">
                {b.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="mt-5 list-disc space-y-2.5 pl-6 marker:text-ink-soft">
                {b.items.map((t) => (
                  <li key={t}>
                    <Inline text={t} glossary={glossary} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-5 list-decimal space-y-3 pl-7 marker:font-display marker:font-bold marker:text-blue">
                {b.items.map((t) => (
                  <li key={t} className="pl-1.5">
                    <Inline text={t} glossary={glossary} />
                  </li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <aside key={i} className="mt-9 border-y border-ink/25 py-6">
                <p className="label text-blue-deep">{b.title}</p>
                <p className="mt-2 text-[1.0625rem] leading-relaxed">
                  <Inline text={b.text} glossary={glossary} />
                </p>
              </aside>
            );
          case "table":
            return (
              <div key={i} className="not-prose mt-9 overflow-x-auto" tabIndex={0} role="region" aria-label={b.caption}>
                <table className="w-full min-w-[36rem] border-collapse text-left text-[0.98rem] leading-snug">
                  <caption className="label pb-3 text-left text-ink-soft">{b.caption}</caption>
                  <thead>
                    <tr className="border-y border-ink/30">
                      {b.head.map((h) => (
                        <th key={h} scope="col" className="label px-3 py-3 first:pl-0">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row) => (
                      <tr key={row[0]} className="border-b border-ink/15 align-top">
                        {row.map((cell, c) => (
                          <td key={c} className={c === 0 ? "py-3.5 pl-0 pr-3 font-semibold" : "px-3 py-3.5 text-ink-soft"}>
                            <Inline text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
