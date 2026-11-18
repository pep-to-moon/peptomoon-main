"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, RotateCcw, Search, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { serviceIcons } from "@/components/services/service-icons";
import type { DeliveryStatus, PillarKey } from "@/content/types";
import { cn } from "@/lib/utils";

export type ExplorerService = {
  slug: string;
  name: string;
  summary: string;
  pillar: PillarKey;
  status: DeliveryStatus;
  /** Public path of the service's photograph. Decorative here: the card title says what the service is. */
  image?: string;
};
export type ExplorerPillar = { key: PillarKey; index: string; label: string; verb: string; blurb: string; count: number };
export type ExplorerPath = { id: string; label: string; hint: string; slugs: string[] };

type View = { kind: "pillar"; key: PillarKey | "all" } | { kind: "path"; id: string };

const statusLabel: Record<DeliveryStatus, string | null> = {
  established: null,
  "by-engagement": "By engagement",
  planned: "Planned",
};

const pillarDot: Record<PillarKey, string> = {
  build: "bg-sky",
  run: "bg-steel",
  grow: "bg-yellow",
  verify: "bg-blue",
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Browse the services by stage, by what you are trying to do, or by search. Every service renders in the first HTML
 * (the default view is "all"), so crawlers and visitors without scripts get every link. The filters only change which
 * cards are shown, and the layout animates between states. Reduced-motion visitors get the same states with no movement.
 */
export function ServiceExplorer({
  services,
  pillars,
  paths,
}: {
  services: ExplorerService[];
  pillars: ExplorerPillar[];
  paths: ExplorerPath[];
}) {
  const reduced = useReducedMotion() ?? false;
  const [view, setView] = useState<View>({ kind: "pillar", key: "all" });
  const [query, setQuery] = useState("");

  const ordered = useMemo(() => {
    const rank = new Map(pillars.map((p, i) => [p.key, i]));
    return [...services].sort((a, b) => (rank.get(a.pillar) ?? 0) - (rank.get(b.pillar) ?? 0));
  }, [services, pillars]);

  const activePath = view.kind === "path" ? paths.find((p) => p.id === view.id) : undefined;

  const visible = useMemo(() => {
    let list: ExplorerService[];
    if (activePath) {
      list = activePath.slugs.map((slug) => ordered.find((s) => s.slug === slug)).filter((s): s is ExplorerService => Boolean(s));
    } else if (view.kind === "pillar" && view.key !== "all") {
      list = ordered.filter((s) => s.pillar === view.key);
    } else {
      list = ordered;
    }
    const q = query.trim().toLowerCase();
    return q ? list.filter((s) => `${s.name} ${s.summary}`.toLowerCase().includes(q)) : list;
  }, [activePath, ordered, query, view]);

  const dirty = view.kind !== "pillar" || view.key !== "all" || query !== "";
  const reset = () => {
    setView({ kind: "pillar", key: "all" });
    setQuery("");
  };
  const first = activePath ? ordered.find((s) => s.slug === activePath.slugs[0]) : undefined;
  const t = { duration: reduced ? 0 : 0.4, ease };

  return (
    <div>
      <LayoutGroup>
        <div className="flex flex-col gap-5">
          <div>
            <p className="label text-ink-soft">Browse by stage</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Chip
                active={view.kind === "pillar" && view.key === "all"}
                onClick={() => setView({ kind: "pillar", key: "all" })}
                layoutId="chip-stage"
                reduced={reduced}
                count={services.length}
              >
                All services
              </Chip>
              {pillars.map((p) => (
                <Chip
                  key={p.key}
                  active={view.kind === "pillar" && view.key === p.key}
                  onClick={() => setView({ kind: "pillar", key: p.key })}
                  layoutId="chip-stage"
                  reduced={reduced}
                  count={p.count}
                  dot={pillarDot[p.key]}
                >
                  {p.label}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <p className="label text-ink-soft">Or start from where you are</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {paths.map((p) => (
                <Chip
                  key={p.id}
                  active={view.kind === "path" && view.id === p.id}
                  onClick={() => setView({ kind: "path", id: p.id })}
                  layoutId="chip-path"
                  reduced={reduced}
                  tone="yellow"
                >
                  {p.label}
                </Chip>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="relative block w-full max-w-md">
              <span className="sr-only">Search services</span>
              <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && setQuery("")}
                placeholder="Search services"
                className="h-12 w-full rounded-full border border-ink/15 bg-white pl-11 pr-11 text-base outline-none transition-colors placeholder:text-ink-soft/60 hover:border-ink/30 focus:border-blue"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-ink-soft transition-colors hover:bg-sky-soft hover:text-ink"
                >
                  <X aria-hidden className="size-4" />
                </button>
              )}
            </label>
            <AnimatePresence initial={false}>
              {dirty && (
                <motion.button
                  type="button"
                  onClick={reset}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={t}
                  className="inline-flex h-12 items-center gap-2 rounded-full px-4 font-display text-[0.8rem] font-bold uppercase tracking-[0.05em] text-blue transition-colors hover:bg-sky-soft"
                >
                  <RotateCcw aria-hidden className="size-4" />
                  Reset
                </motion.button>
              )}
            </AnimatePresence>
            <p role="status" aria-live="polite" className="label ml-auto text-ink-soft">
              Showing {visible.length} of {services.length}
            </p>
          </div>

          <AnimatePresence initial={false} mode="wait">
            {activePath && first && (
              <motion.div
                key={activePath.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={t}
                className="rounded-[1.25rem] bg-sky-soft p-5 sm:p-7"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-[62ch]">
                    <p className="label text-blue-deep">Suggested order</p>
                    <p className="mt-2 text-[1.0625rem]">{activePath.hint}</p>
                    <p className="mt-3 text-[0.95rem] text-ink-soft">
                      Step 1 is {first.name}. These are suggestions, not packages, so take one service or several.
                    </p>
                  </div>
                  <ButtonLink href={`/contact?service=${first.slug}`} size="lg">
                    Start with step 1
                  </ButtonLink>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((s, i) => (
              <Card
                key={s.slug}
                service={s}
                number={activePath ? undefined : String(ordered.findIndex((o) => o.slug === s.slug) + 1).padStart(2, "0")}
                step={activePath ? i + 1 : undefined}
                pillarLabel={pillars.find((p) => p.key === s.pillar)?.label ?? ""}
                reduced={reduced}
              />
            ))}
          </AnimatePresence>
        </ul>

        {visible.length === 0 && (
          <div className="mt-8 rounded-[1.25rem] border border-dashed border-ink/25 p-8 text-center">
            <p className="font-display text-[1.25rem] font-bold">No service matches that search.</p>
            <p className="mx-auto mt-2 max-w-[44ch] text-ink-soft">
              Try a shorter word, such as payments, email or shipping, or clear the filters to see all {services.length} services.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-blue px-6 font-display text-[0.8rem] font-bold uppercase tracking-[0.05em] text-white transition-colors hover:bg-navy"
            >
              <RotateCcw aria-hidden className="size-4" />
              Show all services
            </button>
          </div>
        )}
      </LayoutGroup>
    </div>
  );
}

function Chip({
  active,
  onClick,
  layoutId,
  reduced,
  count,
  dot,
  tone = "navy",
  children,
}: {
  active: boolean;
  onClick: () => void;
  layoutId: string;
  reduced: boolean;
  count?: number;
  dot?: string;
  tone?: "navy" | "yellow";
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "relative inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 font-display text-[0.8rem] font-bold uppercase tracking-[0.05em] ring-1 transition-colors duration-300",
        active
          ? tone === "navy"
            ? "text-white ring-transparent"
            : "text-ink ring-transparent"
          : "bg-white text-ink ring-ink/15 hover:text-blue hover:ring-ink/40",
      )}
    >
      {active && (
        <motion.span
          layoutId={layoutId}
          aria-hidden
          className={cn("absolute inset-0 rounded-full", tone === "navy" ? "bg-navy" : "bg-yellow")}
          transition={{ duration: reduced ? 0 : 0.45, ease }}
        />
      )}
      {dot && <span aria-hidden className={cn("relative size-2 rounded-full", dot)} />}
      <span className="relative">{children}</span>
      {count !== undefined && <span className="relative text-[0.7rem] opacity-60">{count}</span>}
    </button>
  );
}

function Card({
  service: s,
  number,
  step,
  pillarLabel,
  reduced,
}: {
  service: ExplorerService;
  number?: string;
  step?: number;
  pillarLabel: string;
  reduced: boolean;
}) {
  const Icon = serviceIcons[s.slug];
  const status = statusLabel[s.status];
  // The glow follows the pointer. It writes two CSS variables straight to the element, so it never triggers a re-render.
  const onMove = (e: ReactPointerEvent<HTMLLIElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.li
      layout={!reduced}
      initial={{ opacity: 0, y: reduced ? 0 : 14, scale: reduced ? 1 : 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: reduced ? 1 : 0.97 }}
      transition={{ duration: reduced ? 0 : 0.4, ease }}
      onPointerMove={onMove}
      className="group relative flex flex-col overflow-hidden rounded-[1.25rem] bg-white ring-1 ring-ink/10 transition-[box-shadow,transform] duration-300 focus-within:ring-2 focus-within:ring-blue hover:-translate-y-1 hover:shadow-[0_26px_50px_-30px_rgba(13,34,54,0.5)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-navy/10">
        {s.image && (
          <Image
            src={s.image}
            alt=""
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 640px) 46vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        )}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 font-display text-[0.7rem] font-bold uppercase tracking-[0.06em] text-ink backdrop-blur">
          <span aria-hidden className={cn("size-2 rounded-full", pillarDot[s.pillar])} />
          {pillarLabel}
        </span>
        {step !== undefined && (
          <span
            aria-label={`Step ${step}`}
            className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-yellow font-display text-[0.95rem] font-bold text-ink shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]"
          >
            {step}
          </span>
        )}
      </div>

      {/* Pointer glow, under the text so it never reduces contrast. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
        style={{ background: "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgba(153,214,234,0.28), transparent 65%)" }}
      />

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="font-display text-[0.95rem] font-semibold text-ink-soft">{number ?? `Step ${step}`}</span>
          <span className="flex items-center gap-3">
            {status && <span className="label rounded-full bg-sky-soft px-2.5 py-1 text-blue-deep">{status}</span>}
            {Icon && <Icon aria-hidden className="size-5 text-blue" />}
          </span>
        </div>
        <h3 className="mt-3 font-display text-[1.35rem] font-bold leading-tight">
          <Link
            href={`/services/${s.slug}`}
            className="outline-none after:absolute after:inset-0 after:z-10 after:content-['']"
          >
            {s.name}
          </Link>
        </h3>
        <p className="mt-2 text-ink-soft">{s.summary}</p>
        <span className="mt-auto flex items-center gap-2 pt-5 font-display text-[0.8rem] font-bold uppercase tracking-[0.06em] text-blue">
          Explore
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        </span>
      </div>
    </motion.li>
  );
}
