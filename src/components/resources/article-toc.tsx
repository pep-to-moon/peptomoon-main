"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; label: string };

/**
 * "On this page". A sticky list beside the article on large screens that marks the section being read, and a
 * collapsible list above the article on small screens. Plain anchor links, so it works without scripting.
 */
export function ArticleToc({ items }: { items: TocItem[] }) {
  const [current, setCurrent] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const targets = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;
    let frame = 0;
    // The current section is the last heading that has reached the upper part of the screen.
    const update = () => {
      frame = 0;
      let id = targets[0].id;
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.3) id = el.id;
        else break;
      }
      setCurrent(id);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  const list = (
    <ol className="space-y-0.5">
      {items.map((item, i) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={current === item.id ? "true" : undefined}
            className={cn(
              "flex gap-3 border-l-2 py-1.5 pl-3 text-[0.92rem] leading-snug transition-colors hover:text-blue",
              current === item.id ? "border-blue font-semibold text-ink" : "border-transparent text-ink-soft",
            )}
          >
            <span aria-hidden className="w-5 shrink-0 font-display text-[0.75rem] tabular-nums text-ink-soft">
              {String(i + 1).padStart(2, "0")}
            </span>
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <nav aria-label="On this page">
      <details className="group border-y border-ink/20 py-3 lg:hidden">
        <summary className="label flex min-h-11 cursor-pointer items-center justify-between">
          On this page
          <span aria-hidden className="text-[1.1rem] transition-transform group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="pt-3">{list}</div>
      </details>
      <div className="hidden lg:block">
        <p className="label mb-3 text-ink-soft">On this page</p>
        {list}
      </div>
    </nav>
  );
}
