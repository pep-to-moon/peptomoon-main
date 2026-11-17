"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import type { ComponentType } from "react";
import {
  BarChart3,
  ClipboardCheck,
  CreditCard,
  FlaskConical,
  Gauge,
  Mail,
  Megaphone,
  MessageSquare,
  Search,
  Store,
  Stethoscope,
  Truck,
} from "lucide-react";
import { layers } from "@/content/all-in-one";
import { cn } from "@/lib/utils";
import { MiniVisual } from "./mini-visuals";
import { pillarBar, type Pillar } from "./ui";

const tabs = ["All", "Build", "Run", "Grow", "Verify"] as const;

const icons: Record<string, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  "RUO peptide e-commerce": Store,
  "Telehealth platforms": Stethoscope,
  "Business dashboards": BarChart3,
  "High-risk payment processing": CreditCard,
  "Fulfillment and 3PL": Truck,
  "Customer support": MessageSquare,
  "SEO, GEO and AEO": Search,
  "Email and affiliates": Mail,
  "Compliance-aware ads and AI lead generation": Megaphone,
  "Supplier and COA verification": FlaskConical,
  "Compliance-oriented review": ClipboardCheck,
  "Site audits": Gauge,
};

/** 12-column spans on desktop. Payments and search are the two large tiles. */
const spans: Record<string, string> = {
  "RUO peptide e-commerce": "lg:col-span-4",
  "Telehealth platforms": "lg:col-span-4",
  "Business dashboards": "lg:col-span-4",
  "High-risk payment processing": "lg:col-span-6",
  "Fulfillment and 3PL": "lg:col-span-3",
  "Customer support": "lg:col-span-3",
  "SEO, GEO and AEO": "lg:col-span-6",
  "Email and affiliates": "lg:col-span-3",
  "Compliance-aware ads and AI lead generation": "lg:col-span-3",
  "Supplier and COA verification": "lg:col-span-4",
  "Compliance-oriented review": "lg:col-span-4",
  "Site audits": "lg:col-span-4",
};

/**
 * Twelve services as a bento grid with pillar tabs. Every tile is in the server HTML. Choosing a tab only hides the
 * tiles of the other pillars in the browser.
 */
export function BentoServices() {
  const [active, setActive] = useState<(typeof tabs)[number]>("All");
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === "ArrowRight" ? (i + 1) % tabs.length : e.key === "ArrowLeft" ? (i + tabs.length - 1) % tabs.length : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(tabs[next]);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Filter services by group" className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
        {tabs.map((t, i) => (
          <button
            key={t}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`${id}-tab-${t}`}
            aria-selected={active === t}
            aria-controls={`${id}-panel`}
            tabIndex={active === t ? 0 : -1}
            onClick={() => setActive(t)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn(
              "min-h-11 shrink-0 rounded-full px-5 font-display text-[0.78rem] font-bold uppercase tracking-[0.06em] ring-1 transition-colors focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-blue",
              active === t ? "bg-blue text-white ring-blue" : "bg-white text-ink ring-ink/15 hover:ring-ink/40",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
        {layers.flatMap((g) =>
          g.cards.map((c) => {
            const Icon = icons[c.t];
            const hidden = active !== "All" && active !== g.name;
            const pillar = g.name.toLowerCase() as Pillar;
            return (
              <article
                key={c.t}
                hidden={hidden}
                className={cn(
                  "relative flex animate-[aio-fade_0.35s_ease-out] flex-col overflow-hidden rounded-[1.25rem] bg-white p-5 ring-1 ring-line transition-shadow hover:shadow-[0_44px_100px_-44px_rgba(13,34,54,0.55)]",
                  spans[c.t],
                  (c.t === "High-risk payment processing" || c.t === "SEO, GEO and AEO") && "md:col-span-2",
                )}
              >
                <span aria-hidden className={cn("absolute inset-x-0 top-0 h-1", pillarBar[pillar])} />
                <MiniVisual title={c.t} />
                <div className="flex items-center gap-2 text-blue">
                  {Icon && <Icon aria-hidden className="size-5" strokeWidth={1.5} />}
                  <span className="label">{c.n}</span>
                </div>
                <h4 className="heading-sm mt-2">{c.t}</h4>
                <p className="mt-2 flex-1 text-[0.95rem] text-ink-soft">{c.d}</p>
                <Link
                  href={c.href}
                  className="mt-4 inline-flex min-h-11 items-center font-display text-[0.78rem] font-bold uppercase tracking-[0.06em] text-blue hover:underline"
                >
                  {c.link} →
                </Link>
              </article>
            );
          }),
        )}
      </div>
    </div>
  );
}
