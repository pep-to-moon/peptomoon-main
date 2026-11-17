import type { ComponentType } from "react";
import { BadgeCheck, Bot, FlaskConical, Megaphone, Mic, Search, Truck } from "lucide-react";
import { addOns, programs } from "@/content/all-in-one";
import { cn } from "@/lib/utils";
import { softShadow } from "./ui";

/** Three surfaces where a brand is found: a search result, an AI answer and a spoken answer. */
export function SurfacesVisual() {
  return (
    <figure aria-label="Three places your brand can be found: a top search result, a cited AI answer and a spoken answer" className="space-y-3">
      <div className="rounded-[1.25rem] bg-white p-4 ring-1 ring-line">
        <p className="label text-blue">SEO</p>
        <div className="mt-3 flex items-start gap-3">
          <span className="rounded-md bg-blue px-2 py-1 text-[0.7rem] font-bold text-white">#1</span>
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="h-2 w-1/3 rounded bg-blue/40" />
            <div className="h-1.5 w-full rounded bg-ink/15" />
            <div className="h-1.5 w-4/5 rounded bg-ink/15" />
          </div>
          <Search aria-hidden className="size-4 text-ink-soft" strokeWidth={1.5} />
        </div>
      </div>
      <div className={cn("ml-4 rounded-[1.25rem] bg-navy p-4 text-white", softShadow)}>
        <p className="label text-sky">GEO</p>
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-full rounded bg-white/30" />
          <div className="h-1.5 w-11/12 rounded bg-white/30" />
          <div className="h-1.5 w-2/3 rounded bg-white/30" />
        </div>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[0.7rem] font-semibold ring-1 ring-white/25">
          <BadgeCheck aria-hidden className="size-3.5 text-sky" strokeWidth={1.75} />
          Sources: yourstore.com
        </span>
      </div>
      <div className="mr-8 rounded-[1.25rem] bg-sky-soft p-4 ring-1 ring-line">
        <p className="label text-blue">AEO</p>
        <div className="mt-3 flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-blue text-white">
            <Mic aria-hidden className="size-4" strokeWidth={1.75} />
          </span>
          <div className="space-y-1.5 rounded-xl rounded-bl-none bg-white px-3 py-2.5 ring-1 ring-line">
            <div className="h-1.5 w-36 rounded bg-ink/15" />
            <div className="h-1.5 w-24 rounded bg-ink/15" />
          </div>
        </div>
      </div>
    </figure>
  );
}

/** The three programs as cards of rising visual weight; the last is navy. */
export function TierCards() {
  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-3">
      {programs.map(([name, what], i) => (
        <article
          key={name}
          className={cn(
            "flex flex-col rounded-[1.25rem] p-6",
            i === 0 && "bg-white ring-1 ring-line",
            i === 1 && "bg-white ring-2 ring-blue",
            i === 2 && cn("bg-navy text-white", softShadow),
          )}
        >
          <div aria-hidden className="flex gap-1">
            {[0, 1, 2].map((d) => (
              <span key={d} className={cn("h-1.5 w-8 rounded-full", d <= i ? (i === 2 ? "bg-sky" : "bg-blue") : i === 2 ? "bg-white/20" : "bg-ink/10")} />
            ))}
          </div>
          <h3 className={cn("mt-4 font-display text-[1.15rem] font-bold uppercase tracking-[0.02em]", i === 2 && "text-white")}>{name}</h3>
          <p className={cn("mt-2 text-[0.95rem]", i === 2 ? "text-white/80" : "text-ink-soft")}>{what}</p>
        </article>
      ))}
    </div>
  );
}

const addOnIcons: ComponentType<{ className?: string; strokeWidth?: number }>[] = [FlaskConical, Megaphone, Bot, Truck];

/** Four compact icon cards in one row. */
export function AddOnCards() {
  return (
    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {addOns.map((a, i) => {
        const Icon = addOnIcons[i];
        return (
          <li
            key={a.t}
            className="rounded-[1.25rem] bg-white p-6 ring-1 ring-line transition duration-300 hover:-translate-y-1 hover:shadow-[0_44px_100px_-44px_rgba(13,34,54,0.55)]"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-sky-soft text-blue">
              <Icon aria-hidden className="size-5" strokeWidth={1.5} />
            </span>
            <span className="label mt-4 block text-blue">{a.n}</span>
            <h3 className="heading-sm mt-1">{a.t}</h3>
            <p className="mt-2 text-[0.95rem] text-ink-soft">{a.d}</p>
          </li>
        );
      })}
    </ul>
  );
}
