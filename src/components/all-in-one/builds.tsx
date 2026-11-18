"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { offerings } from "@/content/all-in-one";
import type { MediaKey } from "@/content/media";
import { cn } from "@/lib/utils";

const extra: { photo: MediaKey; href: string; link: string }[] = [
  { photo: "website", href: "/services/ruo-peptide-website-development", link: "Read about website development" },
  { photo: "telehealth-dashboard", href: "/services/telehealth-platform-development", link: "Read about telehealth platform development" },
  { photo: "process", href: "/contact?topic=all-in-one", link: "Talk about a combined build" },
];

/**
 * Three ways to start, as tabs. Every panel is in the server HTML and a tab only hides the others in the browser, so
 * the content stays readable without JavaScript. Arrow keys, Home and End move between tabs.
 */
export function BuildTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    const last = offerings.length - 1;
    const next =
      e.key === "ArrowRight" ? (active === last ? 0 : active + 1) : e.key === "ArrowLeft" ? (active === 0 ? last : active - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="mt-14">
      <div role="tablist" aria-label="Core builds" onKeyDown={onKey} className="flex flex-col border-b border-ink/20 sm:flex-row sm:gap-x-8 lg:gap-x-12">
        {offerings.map((o, i) => (
          <button
            key={o.t}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`build-tab-${i}`}
            type="button"
            aria-selected={active === i}
            aria-controls={`build-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "relative -mb-px py-3 pl-4 text-left font-display text-[1.15rem] font-bold transition-colors max-sm:border-l-2 sm:shrink-0 sm:whitespace-nowrap sm:border-b-2 sm:py-4 sm:pl-0 sm:text-[1.15rem] lg:text-[1.4rem]",
              active === i ? "border-blue text-ink" : "border-transparent text-ink-soft hover:text-ink",
            )}
          >
            <span className="label mr-3 align-middle text-ink-soft">{o.index}</span>
            {o.t}
          </button>
        ))}
      </div>

      {offerings.map((o, i) => (
        <div
          key={o.t}
          role="tabpanel"
          id={`build-panel-${i}`}
          aria-labelledby={`build-tab-${i}`}
          hidden={active !== i}
          className="grid gap-12 pt-12 lg:grid-cols-12 lg:gap-16"
        >
          <div className="lg:col-span-5">
            <Photo name={extra[i].photo} ratio="4 / 3" sizes="(min-width: 1024px) 38vw, 100vw" radius="1.25rem" reveal={false} />
            <p className="label mt-6 text-blue">{o.tag}</p>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink/85">{o.intro}</p>
            {o.note && <p className="mt-4 border-l-2 border-blue/40 pl-4 text-[0.95rem] text-ink-soft">{o.note}</p>}
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href="/contact?topic=all-in-one" size="md">
                Start a project
              </ButtonLink>
              <TextLink href={extra[i].href}>{extra[i].link}</TextLink>
            </div>
          </div>
          <ul className="grid content-start gap-x-10 sm:grid-cols-2 lg:col-span-7">
            {o.items.map((item) => (
              <li key={item} className="border-t border-ink/20 py-3.5 text-[0.98rem]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
