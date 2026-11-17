import type { ComponentType } from "react";
import {
  ClipboardCheck,
  CreditCard,
  FlaskConical,
  Megaphone,
  Search,
  Stethoscope,
  Store,
  Truck,
  Hammer,
  Cog,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { pillarBar, softShadow, type Pillar } from "./ui";

type Chip = { label: string; href: string; icon: ComponentType<{ className?: string; strokeWidth?: number }>; pillar: Pillar; peer: string; line: string };

/** Eight satellites. Class strings are written out in full so Tailwind can see them. */
const chips: Chip[] = [
  { label: "Website", href: "#services", icon: Store, pillar: "build", peer: "peer/a", line: "peer-hover/a:text-blue peer-focus-visible/a:text-blue" },
  { label: "Telehealth", href: "#offerings", icon: Stethoscope, pillar: "build", peer: "peer/b", line: "peer-hover/b:text-blue peer-focus-visible/b:text-blue" },
  { label: "Payments", href: "#payments", icon: CreditCard, pillar: "run", peer: "peer/c", line: "peer-hover/c:text-blue peer-focus-visible/c:text-blue" },
  { label: "Fulfillment", href: "#services", icon: Truck, pillar: "run", peer: "peer/d", line: "peer-hover/d:text-blue peer-focus-visible/d:text-blue" },
  { label: "COAs", href: "#services", icon: FlaskConical, pillar: "verify", peer: "peer/e", line: "peer-hover/e:text-blue peer-focus-visible/e:text-blue" },
  { label: "Compliance", href: "#services", icon: ClipboardCheck, pillar: "verify", peer: "peer/f", line: "peer-hover/f:text-blue peer-focus-visible/f:text-blue" },
  { label: "SEO/GEO/AEO", href: "#search", icon: Search, pillar: "grow", peer: "peer/g", line: "peer-hover/g:text-blue peer-focus-visible/g:text-blue" },
  { label: "Ads & Email", href: "#services", icon: Megaphone, pillar: "grow", peer: "peer/h", line: "peer-hover/h:text-blue peer-focus-visible/h:text-blue" },
];

/** Left and right columns of four, so chips never overlap at any width. */
const ys = [11, 37, 63, 89];
const place = (i: number) => (i < 4 ? { x: 20, y: ys[i], edge: 37 } : { x: 80, y: ys[i - 4], edge: 63 });

function ChipBody({ c }: { c: Chip }) {
  const Icon = c.icon;
  return (
    <>
      <span aria-hidden className={cn("absolute inset-x-5 top-0 h-[3px] rounded-b-full", pillarBar[c.pillar])} />
      <Icon aria-hidden className="size-[1.15rem] shrink-0 text-blue" strokeWidth={1.5} />
      <span className="font-display text-[0.74rem] font-bold uppercase leading-tight tracking-[0.04em]">{c.label}</span>
    </>
  );
}

const chipBase =
  "relative flex min-h-11 items-center gap-2 rounded-xl bg-white px-3 py-2.5 ring-1 ring-line transition-shadow hover:ring-blue/50 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-blue";

/**
 * The 5-second explainer. On sm and up, one navy tile joined by thin lines to eight chips. On phones the lines are dropped
 * and the chips form a 2 x 4 grid under the logo tile, so everything is still visible at once.
 */
export function HeroHub() {
  return (
    <figure aria-label="Peptomoon at the centre of eight connected services: website, telehealth, payments, fulfillment, COAs, compliance, search and advertising">
      <div className="relative mx-auto hidden aspect-square w-full max-w-[34rem] sm:block">
        {chips.map((c, i) => {
          const p = place(i);
          return (
            <div key={c.label} className="contents">
              <a
                href={c.href}
                className={cn(chipBase, c.peer, "absolute z-10 w-[34%] -translate-x-1/2 -translate-y-1/2")}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <ChipBody c={c} />
              </a>
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                className={cn("pointer-events-none absolute inset-0 size-full text-ink/20 transition-colors", c.line)}
              >
                <line
                  x1={50}
                  y1={50}
                  x2={p.edge}
                  y2={p.y}
                  stroke="currentColor"
                  strokeWidth={0.5}
                  pathLength={100}
                  className="aio-draw"
                  style={{ "--d": i } as React.CSSProperties}
                />
              </svg>
            </div>
          );
        })}
        <div className={cn("absolute left-1/2 top-1/2 z-10 grid w-[30%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[1.25rem] bg-navy p-4", softShadow)}>
          <Logo tone="light" className="h-9 w-auto sm:h-9" />
        </div>
      </div>

      <div className="sm:hidden">
        <div className={cn("mx-auto grid w-48 place-items-center rounded-[1.25rem] bg-navy p-5", softShadow)}>
          <Logo tone="light" className="h-9 w-auto" />
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-2">
          {chips.map((c) => (
            <li key={c.label}>
              <a href={c.href} className={chipBase}>
                <ChipBody c={c} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="sr-only">Build, run, grow and verify services, all handled by one team.</figcaption>
    </figure>
  );
}

/** Faint line-art version of the hub, used behind the closing call to action. */
export function HubLines({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={cn("pointer-events-none", className)} fill="none" stroke="currentColor" strokeWidth={0.4}>
      {chips.map((_, i) => {
        const p = place(i);
        return <line key={i} x1={50} y1={50} x2={p.edge} y2={p.y} />;
      })}
      {chips.map((_, i) => {
        const p = place(i);
        return <rect key={`r${i}`} x={p.x - 17} y={p.y - 5} width={34} height={10} rx={3} />;
      })}
      <rect x={35} y={43} width={30} height={14} rx={4} />
    </svg>
  );
}

const pillarTiles: { t: string; d: string; icon: ComponentType<{ className?: string; strokeWidth?: number }>; pillar: Pillar }[] = [
  { t: "Build", d: "Custom e-commerce and telehealth platforms", icon: Hammer, pillar: "build" },
  { t: "Run", d: "Payments, fulfillment, support, dashboards", icon: Cog, pillar: "run" },
  { t: "Grow", d: "SEO, GEO, AEO, email, affiliates, ads", icon: TrendingUp, pillar: "grow" },
  { t: "Verify", d: "Suppliers, COAs, compliance-oriented review", icon: ShieldCheck, pillar: "verify" },
];

export function PillarTiles() {
  return (
    <ul className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {pillarTiles.map((p) => {
        const Icon = p.icon;
        return (
          <li key={p.t} className="relative overflow-hidden rounded-[1.25rem] bg-white p-5 ring-1 ring-line">
            <span aria-hidden className={cn("absolute inset-x-0 top-0 h-1", pillarBar[p.pillar])} />
            <Icon aria-hidden className="size-6 text-blue" strokeWidth={1.5} />
            <span className="mt-3 block font-display font-bold uppercase tracking-[0.06em]">{p.t}</span>
            <span className="mt-1 block text-[0.88rem] text-ink-soft">{p.d}</span>
          </li>
        );
      })}
    </ul>
  );
}
