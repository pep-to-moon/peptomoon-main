"use client";

import { useMemo, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Reveal, Section, SectionIntro } from "@/components/ui/section";
import type { GscPoint, GscShare, GscSite } from "@/content/gsc";
import { cn } from "@/lib/utils";

type Metric = "clicks" | "impressions" | "ctr" | "position";

const METRICS: { key: Metric; label: string; color: string; dash?: string }[] = [
  { key: "clicks", label: "Total clicks", color: "#2f5f8a" },
  { key: "impressions", label: "Total impressions", color: "#0d2236", dash: "7 5" },
  { key: "ctr", label: "Average CTR", color: "#4b7ba3", dash: "2 4" },
  { key: "position", label: "Average position", color: "#46566a", dash: "9 4 2 4" },
];

const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
const whole = new Intl.NumberFormat("en");
const fmt = (m: Metric, v: number) =>
  m === "ctr" ? `${(v * 100).toFixed(1)}%` : m === "position" ? v.toFixed(1) : compact.format(v);
const fmtFull = (m: Metric, v: number) => (m === "clicks" || m === "impressions" ? whole.format(v) : fmt(m, v));
const day = new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const month = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" });
const pretty = (iso: string) => day.format(new Date(`${iso}T00:00:00Z`));

type Totals = { clicks: number; impressions: number; ctr: number; position: number; from: string; to: string };

function combine(sites: GscSite[]): { totals: Totals; series: GscPoint[] } {
  const map = new Map<string, { clicks: number; impressions: number; pos: number }>();
  for (const s of sites) {
    for (const p of s.weekly) {
      const b = map.get(p.date) ?? { clicks: 0, impressions: 0, pos: 0 };
      b.clicks += p.clicks;
      b.impressions += p.impressions;
      b.pos += p.position * p.impressions;
      map.set(p.date, b);
    }
  }
  const series = [...map.entries()]
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([date, b]) => ({
      date,
      clicks: b.clicks,
      impressions: b.impressions,
      ctr: b.impressions ? b.clicks / b.impressions : 0,
      position: b.impressions ? b.pos / b.impressions : 0,
    }));
  const clicks = sites.reduce((s, x) => s + x.clicks, 0);
  const impressions = sites.reduce((s, x) => s + x.impressions, 0);
  const pos = sites.reduce((s, x) => s + x.position * x.impressions, 0);
  return {
    series,
    totals: {
      clicks,
      impressions,
      ctr: impressions ? clicks / impressions : 0,
      position: impressions ? pos / impressions : 0,
      from: sites.reduce((m, x) => (x.from < m ? x.from : m), sites[0].from),
      to: sites.reduce((m, x) => (x.to > m ? x.to : m), sites[0].to),
    },
  };
}

function mergeShares(lists: GscShare[][]): GscShare[] {
  const map = new Map<string, GscShare>();
  for (const list of lists) {
    for (const i of list) {
      const cur = map.get(i.name) ?? { name: i.name, clicks: 0, impressions: 0 };
      cur.clicks += i.clicks;
      cur.impressions += i.impressions;
      map.set(i.name, cur);
    }
  }
  return [...map.values()].sort((a, b) => b.clicks - a.clicks);
}

function ShareList({ title, items, total }: { title: string; items: GscShare[]; total: number }) {
  return (
    <div>
      <h3 className="heading-sm">{title}</h3>
      <ul className="mt-4 border-b border-ink/15">
        {items.map((i) => {
          const share = total ? i.clicks / total : 0;
          return (
            <li key={i.name} className="border-t border-ink/15 py-3">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-semibold">{i.name}</span>
                <span className="tabular-nums text-ink-soft">
                  {(share * 100).toFixed(share < 0.1 ? 1 : 0)}% · {whole.format(i.clicks)} clicks
                </span>
              </div>
              <span aria-hidden className="mt-2 block h-1 bg-ink/10">
                <span className="block h-full bg-blue" style={{ width: `${Math.max(1, share * 100)}%` }} />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const W = 800;
const H = 280;
const PAD = { l: 44, r: 44, t: 16, b: 28 };

export function GscReach({ sites }: { sites: GscSite[] }) {
  const data = sites;

  const [selected, setSelected] = useState<string>("all");
  const [active, setActive] = useState<Metric[]>(["clicks", "impressions"]);
  const [hover, setHover] = useState<number | null>(null);

  const site = data.length === 1 ? data[0] : selected === "all" ? undefined : data.find((s) => s.id === selected);
  const view = useMemo(() => {
    if (data.length === 0) return null;
    if (site) return { series: site.weekly, totals: { clicks: site.clicks, impressions: site.impressions, ctr: site.ctr, position: site.position, from: site.from, to: site.to } };
    return combine(data);
  }, [data, site]);

  if (!view) return null;
  const { series, totals } = view;
  const n = series.length;

  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;
  const x = (i: number) => PAD.l + (n === 1 ? plotW / 2 : (i / (n - 1)) * plotW);

  const scale = (m: Metric) => {
    const vals = series.map((p) => p[m]);
    const max = Math.max(...vals, m === "position" ? 1 : 0.000001);
    const min = m === "position" ? Math.min(...vals) : 0;
    const span = max - min || 1;
    return (v: number) => (m === "position" ? PAD.t + ((v - min) / span) * plotH : PAD.t + plotH - ((v - min) / span) * plotH);
  };
  const axes = active.map((m) => {
    const vals = series.map((p) => p[m]);
    return { m, max: Math.max(...vals), min: m === "position" ? Math.min(...vals) : 0 };
  });

  const toggle = (m: Metric) => setActive((cur) => (cur.includes(m) ? (cur.length > 1 ? cur.filter((k) => k !== m) : cur) : [...cur, m]));

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const vx = ((e.clientX - r.left) / r.width) * W;
    setHover(Math.max(0, Math.min(n - 1, Math.round(((vx - PAD.l) / plotW) * (n - 1)))));
  };
  const key = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") setHover((h) => Math.min(n - 1, (h ?? -1) + 1));
    else if (e.key === "ArrowLeft") setHover((h) => Math.max(0, (h ?? n) - 1));
    else if (e.key === "Escape") setHover(null);
    else return;
    e.preventDefault();
  };

  const labelEvery = Math.max(1, Math.round(n / 8));
  const point = hover !== null ? series[hover] : null;

  return (
    <Section labelledBy="reach-title" id="reach">
      <div className="container-x">
        <SectionIntro label="Search reach" titleId="reach-title" title={<>What one of our stores reaches in Google.</>}>
          <p>Real figures from Google Search Console for an RUO store in our portfolio. The dates are shown beneath.</p>
        </SectionIntro>

        <Reveal>
          <div className={cn("flex flex-wrap gap-2", data.length < 2 && "hidden")} role="group" aria-label="Store">
            {[{ id: "all", label: "All stores" }, ...data].map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={selected === s.id}
                onClick={() => {
                  setSelected(s.id);
                  setHover(null);
                }}
                className={cn(
                  "min-h-11 rounded-full px-4 text-[0.85rem] font-semibold ring-1 transition-colors",
                  selected === s.id ? "bg-ink text-white ring-ink" : "bg-transparent text-ink ring-ink/25 hover:bg-sky-soft",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          <p className="label mt-6 text-ink-soft">
            {pretty(totals.from)} to {pretty(totals.to)}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-px bg-ink/15 ring-1 ring-ink/15 lg:grid-cols-4" role="group" aria-label="Metrics shown on the chart">
            {METRICS.map((m) => {
              const on = active.includes(m.key);
              return (
                <button
                  key={m.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(m.key)}
                  style={on ? { backgroundColor: m.color } : undefined}
                  className={cn("min-h-28 px-5 py-4 text-left transition-colors", on ? "text-white" : "bg-canvas text-ink hover:bg-sky-soft")}
                >
                  <span className="block text-[0.82rem] font-semibold">{m.label}</span>
                  <span className="mt-3 block font-display text-[clamp(1.8rem,1.3rem+1.6vw,2.7rem)] font-bold leading-none tabular-nums">
                    {fmt(m.key, totals[m.key])}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className="relative mt-6 touch-pan-y select-none outline-offset-4"
            tabIndex={0}
            role="img"
            aria-label={`Weekly ${active.join(", ")} from ${pretty(totals.from)} to ${pretty(totals.to)}. Use the left and right arrow keys to read each week, or open the table below.`}
            onPointerMove={move}
            onPointerLeave={() => setHover(null)}
            onKeyDown={key}
            onBlur={() => setHover(null)}
          >
            <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" aria-hidden>
              {[0, 1, 2, 3, 4].map((g) => {
                const y = PAD.t + (g / 4) * plotH;
                return <line key={g} x1={PAD.l} x2={W - PAD.r} y1={y} y2={y} stroke="#0b1623" strokeOpacity={0.12} />;
              })}
              {axes[0] &&
                [0, 1, 2, 3, 4].map((g) => {
                  const a = axes[0];
                  const v = a.m === "position" ? a.min + (g / 4) * (a.max - a.min) : a.max * (1 - g / 4);
                  return (
                    <text key={g} x={PAD.l - 8} y={PAD.t + (g / 4) * plotH + 4} textAnchor="end" fontSize="11" fill={METRICS.find((k) => k.key === a.m)?.color}>
                      {fmt(a.m, v)}
                    </text>
                  );
                })}
              {axes[1] &&
                [0, 1, 2, 3, 4].map((g) => {
                  const a = axes[1];
                  const v = a.m === "position" ? a.min + (g / 4) * (a.max - a.min) : a.max * (1 - g / 4);
                  return (
                    <text key={g} x={W - PAD.r + 8} y={PAD.t + (g / 4) * plotH + 4} fontSize="11" fill={METRICS.find((k) => k.key === a.m)?.color}>
                      {fmt(a.m, v)}
                    </text>
                  );
                })}
              {series.map((p, i) =>
                i % labelEvery === 0 ? (
                  <text key={p.date} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="#46566a">
                    {month.format(new Date(`${p.date}T00:00:00Z`))}
                  </text>
                ) : null,
              )}
              {active.map((m) => {
                const sy = scale(m);
                const meta = METRICS.find((k) => k.key === m)!;
                const d = series.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${sy(p[m]).toFixed(1)}`).join(" ");
                return <path key={m} d={d} fill="none" stroke={meta.color} strokeWidth={2.25} strokeDasharray={meta.dash} strokeLinejoin="round" />;
              })}
              {hover !== null && point && (
                <>
                  <line x1={x(hover)} x2={x(hover)} y1={PAD.t} y2={PAD.t + plotH} stroke="#0b1623" strokeOpacity={0.4} />
                  {active.map((m) => (
                    <circle key={m} cx={x(hover)} cy={scale(m)(point[m])} r={4} fill="#fffdf7" stroke={METRICS.find((k) => k.key === m)?.color} strokeWidth={2} />
                  ))}
                </>
              )}
            </svg>

            {hover !== null && point && (
              <div
                className="pointer-events-none absolute top-2 z-10 min-w-44 border border-ink/20 bg-white px-3.5 py-3 text-[0.85rem]"
                style={{ left: `clamp(0.5rem, calc(${(x(hover) / W) * 100}% - 5.5rem), calc(100% - 12rem))` }}
              >
                <p className="font-semibold">Week of {pretty(point.date)}</p>
                <ul className="mt-2 space-y-1">
                  {active.map((m) => {
                    const meta = METRICS.find((k) => k.key === m)!;
                    return (
                      <li key={m} className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-2">
                          <span aria-hidden className="inline-block h-0.5 w-4" style={{ backgroundColor: meta.color }} />
                          {meta.label.replace("Total ", "").replace("Average ", "")}
                        </span>
                        <span className="font-semibold tabular-nums">{fmtFull(m, point[m])}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          <details className="mt-4">
            <summary className="label inline-flex min-h-11 cursor-pointer items-center underline underline-offset-4">View as a table</summary>
            <div className="mt-3 max-h-80 overflow-auto" tabIndex={0} role="region" aria-label="Weekly figures">
              <table className="w-full min-w-[30rem] text-left text-[0.9rem]">
                <caption className="sr-only">Weekly Search Console figures</caption>
                <thead className="sticky top-0 bg-canvas">
                  <tr className="border-y border-ink/25">
                    <th scope="col" className="label py-2 pr-3">Week of</th>
                    {METRICS.map((m) => (
                      <th key={m.key} scope="col" className="label px-3 py-2 text-right">{m.label.replace("Total ", "").replace("Average ", "")}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {series.map((p) => (
                    <tr key={p.date} className="border-b border-ink/10">
                      <th scope="row" className="py-2 pr-3 font-normal">{pretty(p.date)}</th>
                      {METRICS.map((m) => (
                        <td key={m.key} className="px-3 py-2 text-right tabular-nums">{fmtFull(m.key, p[m.key])}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>

          <div className="mt-12 grid gap-x-14 gap-y-12 lg:grid-cols-2">
            <ShareList
              title="Where the clicks come from"
              items={(site ? site.countries : mergeShares(data.map((d) => d.countries))).slice(0, 6)}
              total={totals.clicks}
            />
            <ShareList title="Devices" items={site ? site.devices : mergeShares(data.map((d) => d.devices))} total={totals.clicks} />
          </div>

          {!site && (
            <div className="mt-12">
                <h3 className="heading-sm">By store</h3>
                <div className="mt-4 overflow-x-auto" tabIndex={0} role="region" aria-label="Figures by site">
                  <table className="w-full min-w-[34rem] text-left text-[0.95rem]">
                    <caption className="sr-only">Search Console figures by store</caption>
                    <thead>
                      <tr className="border-y border-ink/25">
                        <th scope="col" className="label py-3 pr-3">Store</th>
                        {(["clicks", "impressions", "ctr", "position"] as const).map((k) => (
                          <th key={k} scope="col" className="label px-3 py-3 text-right">{k === "ctr" ? "CTR" : k}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((s) => (
                        <tr key={s.id} className="border-b border-ink/15 transition-colors hover:bg-sky-soft">
                          <th scope="row" className="py-3 pr-3 font-semibold">{s.label}</th>
                          <td className="px-3 py-3 text-right tabular-nums">{whole.format(s.clicks)}</td>
                          <td className="px-3 py-3 text-right tabular-nums">{whole.format(s.impressions)}</td>
                          <td className="px-3 py-3 text-right tabular-nums">{fmt("ctr", s.ctr)}</td>
                          <td className="px-3 py-3 text-right tabular-nums">{fmt("position", s.position)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </div>
          )}

          <p className="mt-8 max-w-[70ch] text-[0.85rem] text-ink-soft">
            Source: Google Search Console performance report (search results), exported by the store owner
            {` on ${data.map((s) => s.exportedOn).sort().slice(-1)[0] ?? ""}.`} Weekly figures add up each day&apos;s clicks and
            impressions, and average position is weighted by impressions. The figures describe the store shown and not every store in the portfolio. Individual
            search terms are not published.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
