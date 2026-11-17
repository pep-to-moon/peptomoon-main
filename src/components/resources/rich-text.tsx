import Link from "next/link";
import type { ReactNode } from "react";
import { getArticle } from "@/content/articles";
import type { Block } from "@/content/types";

/** Inline links in the form [label](url). Links to unpublished articles degrade to plain text. */
export function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
  while ((match = LINK.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
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
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-article text-[1.125rem] leading-[1.7]">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="mt-5">
                <Inline text={b.text} />
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
                    <Inline text={t} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-5 list-decimal space-y-3 pl-7 marker:font-display marker:font-bold marker:text-blue">
                {b.items.map((t) => (
                  <li key={t} className="pl-1.5">
                    <Inline text={t} />
                  </li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <aside key={i} className="mt-9 border-y border-ink/25 py-6">
                <p className="label text-blue-deep">{b.title}</p>
                <p className="mt-2 text-[1.0625rem] leading-relaxed">
                  <Inline text={b.text} />
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
