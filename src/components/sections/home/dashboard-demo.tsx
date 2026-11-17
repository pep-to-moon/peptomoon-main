"use client";

import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ArrowDownRight, ArrowUpRight, CreditCard, Minus, PackageCheck, Share2, ShoppingBag, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * An illustrative reporting dashboard in the shape of a real app: side navigation, a header with the date range, KPI
 * cards, a chart, a "needs attention" list and a records table. Every figure is generated sample data and the header
 * says so. Nothing here is a real result.
 */

type Tone = "good" | "neutral" | "watch";
type Kpi = { label: string; value: string; delta: string; dir: "up" | "down" | "flat"; good: boolean; spark: number[] };
type Tab = {
  key: string;
  label: string;
  icon: LucideIcon;
  kpis: Kpi[];
  chart: { title: string; values: number[]; prev: number[]; fmt: (v: number) => string };
  attention: { text: string; meta: string; tone: Tone }[];
  table: { title: string; columns: string[]; statusCol: number; rows: string[][] };
};

/** Small seeded generator so the sample series are stable between renders. */
function series(seed: number, base: number, amp: number, trend: number, n = 30) {
  let s = seed * 9301 + 49297;
  const rnd = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
  return Array.from({ length: n }, (_, i) => Math.max(1, Math.round(base + trend * i + amp * Math.sin(i / 3.1 + seed) + (rnd() - 0.5) * amp * 0.9)));
}
const spark = (seed: number, base: number, amp: number, trend: number) => series(seed, base, amp, trend, 14);

const count = (v: number) => new Intl.NumberFormat("en").format(v);
const money = (v: number) => `$${v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v}`;

const tabs: Tab[] = [
  {
    key: "orders",
    label: "Orders",
    icon: ShoppingBag,
    kpis: [
      { label: "Orders today", value: "128", delta: "8.2%", dir: "up", good: true, spark: spark(1, 90, 12, 2) },
      { label: "Revenue today", value: "$14,260", delta: "5.4%", dir: "up", good: true, spark: spark(2, 70, 10, 1.4) },
      { label: "Awaiting shipment", value: "23", delta: "12%", dir: "down", good: true, spark: spark(3, 40, 9, -1.2) },
      { label: "Refund requests", value: "4", delta: "1", dir: "up", good: false, spark: spark(4, 6, 2, 0.1) },
    ],
    chart: { title: "Orders per day", values: series(3, 96, 18, 1.4), prev: series(8, 88, 15, 0.8), fmt: count },
    attention: [
      { text: "23 orders waiting more than 24 hours", meta: "Fulfillment", tone: "watch" },
      { text: "4 refund requests to review", meta: "Support", tone: "watch" },
      { text: "2 orders need an address check", meta: "Fulfillment", tone: "neutral" },
    ],
    table: {
      title: "Recent orders",
      columns: ["Order", "Account", "Status", "Total", "Placed"],
      statusCol: 2,
      rows: [
        ["ORD-10482", "Account 4821", "Paid", "$214.00", "4 min ago"],
        ["ORD-10481", "Account 2907", "Packed", "$96.50", "18 min ago"],
        ["ORD-10480", "Account 5513", "Refund requested", "$328.00", "41 min ago"],
        ["ORD-10479", "Account 1186", "In transit", "$142.75", "1 h ago"],
        ["ORD-10478", "Account 3340", "Delivered", "$57.00", "2 h ago"],
        ["ORD-10477", "Account 7702", "Paid", "$289.00", "2 h ago"],
      ],
    },
  },
  {
    key: "payments",
    label: "Payments",
    icon: CreditCard,
    kpis: [
      { label: "Settled this week", value: "$48,920", delta: "6.1%", dir: "up", good: true, spark: spark(5, 60, 9, 1.2) },
      { label: "Pending release", value: "$6,430", delta: "3.2%", dir: "down", good: true, spark: spark(6, 30, 6, -0.6) },
      { label: "Decline rate", value: "2.1%", delta: "0.3 pts", dir: "down", good: true, spark: spark(7, 24, 5, -0.4) },
      { label: "Chargeback ratio", value: "0.4%", delta: "0.1 pts", dir: "up", good: false, spark: spark(8, 5, 2, 0.15) },
    ],
    chart: { title: "Settled volume per day", values: series(5, 1650, 380, 22), prev: series(11, 1500, 320, 12), fmt: money },
    attention: [
      { text: "1 chargeback needs evidence by Friday", meta: "Disputes", tone: "watch" },
      { text: "Reserve release due in 6 days", meta: "Provider", tone: "neutral" },
      { text: "Declines up on one card brand", meta: "Checkout", tone: "watch" },
    ],
    table: {
      title: "Payouts and disputes",
      columns: ["Reference", "Type", "Status", "Amount", "Matched"],
      statusCol: 2,
      rows: [
        ["PAY-3391", "Payout", "Settled", "$6,812.40", "31 orders"],
        ["PAY-3390", "Payout", "Pending", "$4,205.10", "Awaiting release"],
        ["DSP-0072", "Chargeback", "Open", "$214.00", "Evidence due"],
        ["PAY-3389", "Payout", "Settled", "$5,938.25", "27 orders"],
        ["REF-0418", "Refund", "Settled", "$96.50", "1 order"],
        ["PAY-3388", "Payout", "Settled", "$7,044.80", "33 orders"],
      ],
    },
  },
  {
    key: "affiliates",
    label: "Affiliates",
    icon: Share2,
    kpis: [
      { label: "Referred orders", value: "312", delta: "14%", dir: "up", good: true, spark: spark(9, 40, 8, 1.1) },
      { label: "Commission owed", value: "$3,860", delta: "9%", dir: "up", good: true, spark: spark(10, 35, 7, 0.9) },
      { label: "Conversion rate", value: "3.8%", delta: "0.4 pts", dir: "up", good: true, spark: spark(11, 28, 6, 0.6) },
      { label: "Reversals", value: "6", delta: "2", dir: "down", good: true, spark: spark(12, 9, 3, -0.2) },
    ],
    chart: { title: "Referred orders per day", values: series(9, 38, 9, 1.1), prev: series(14, 33, 8, 0.6), fmt: count },
    attention: [
      { text: "1 partner flagged for a self-referral check", meta: "Review", tone: "watch" },
      { text: "Payout run due Friday", meta: "Finance", tone: "neutral" },
      { text: "Guidelines acknowledged by 14 of 15 partners", meta: "Content", tone: "neutral" },
    ],
    table: {
      title: "Partners",
      columns: ["Partner", "Referrals", "Status", "Commission", "Next step"],
      statusCol: 2,
      rows: [
        ["Partner 0012", "64", "Approved", "$812.00", "Payout due"],
        ["Partner 0007", "48", "Approved", "$604.50", "Paid"],
        ["Partner 0031", "39", "Review", "$498.00", "Self-referral check"],
        ["Partner 0004", "33", "Approved", "$421.25", "Payout due"],
        ["Partner 0019", "27", "Approved", "$355.00", "Paid"],
        ["Partner 0023", "21", "Approved", "$268.75", "Payout due"],
      ],
    },
  },
  {
    key: "fulfillment",
    label: "Fulfillment",
    icon: PackageCheck,
    kpis: [
      { label: "Average time to ship", value: "1.4 days", delta: "0.2 d", dir: "down", good: true, spark: spark(13, 34, 6, -0.5) },
      { label: "On-time rate", value: "96.2%", delta: "1.1 pts", dir: "up", good: true, spark: spark(14, 55, 5, 0.4) },
      { label: "Open exceptions", value: "5", delta: "2", dir: "up", good: false, spark: spark(15, 6, 2, 0.15) },
      { label: "Low-stock items", value: "3", delta: "0", dir: "flat", good: true, spark: spark(16, 5, 1, 0) },
    ],
    chart: { title: "Shipments per day", values: series(13, 92, 16, 1.2), prev: series(17, 86, 14, 0.7), fmt: count },
    attention: [
      { text: "2 address checks waiting on the customer", meta: "Exceptions", tone: "watch" },
      { text: "3 items below reorder level", meta: "Inventory", tone: "watch" },
      { text: "1 carrier delay on one route", meta: "Carrier", tone: "neutral" },
    ],
    table: {
      title: "Shipments",
      columns: ["Shipment", "Carrier", "Status", "Items", "Updated"],
      statusCol: 2,
      rows: [
        ["SHP-7716", "Carrier A", "In transit", "3", "12 min ago"],
        ["SHP-7715", "Carrier B", "Exception", "1", "38 min ago"],
        ["SHP-7714", "Carrier A", "Delivered", "2", "1 h ago"],
        ["SHP-7713", "Carrier B", "Exception", "4", "2 h ago"],
        ["SHP-7712", "Carrier A", "Packed", "2", "3 h ago"],
        ["SHP-7711", "Carrier A", "Delivered", "1", "4 h ago"],
      ],
    },
  },
];

const statusTone: Record<string, Tone> = {
  Paid: "good",
  Settled: "good",
  Delivered: "good",
  Approved: "good",
  Packed: "neutral",
  "In transit": "neutral",
  Pending: "neutral",
  "Refund requested": "watch",
  Open: "watch",
  Exception: "watch",
  Review: "watch",
};

const dot: Record<Tone, string> = { good: "bg-blue", neutral: "bg-steel", watch: "bg-yellow" };

function Badge({ children }: { children: string }) {
  const tone = statusTone[children] ?? "neutral";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.76rem] font-semibold",
        tone === "good" && "bg-sky-soft text-blue-deep",
        tone === "neutral" && "bg-ink/[0.06] text-ink-soft",
        tone === "watch" && "bg-yellow/25 text-ink",
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", dot[tone])} />
      {children}
    </span>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const w = 84;
  const h = 30;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const pts = values.map((v, i) => `${((i / (values.length - 1)) * w).toFixed(1)},${(h - 2 - ((v - min) / (max - min || 1)) * (h - 4)).toFixed(1)}`);
  return (
    <svg aria-hidden viewBox={`0 0 ${w} ${h}`} className="h-7 w-[5.25rem] shrink-0">
      <polyline points={pts.join(" ")} fill="none" stroke="#2f5f8a" strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function Delta({ k }: { k: Kpi }) {
  const Icon = k.dir === "up" ? ArrowUpRight : k.dir === "down" ? ArrowDownRight : Minus;
  return (
    <span className={cn("inline-flex items-center gap-1 text-[0.8rem] font-semibold", k.good ? "text-blue-deep" : "text-[#7a5600]")}>
      <Icon aria-hidden className="size-3.5" />
      {k.delta}
    </span>
  );
}

const CW = 640;
const CH = 230;
const P = { l: 46, r: 12, t: 12, b: 26 };
const startDate = Date.UTC(2026, 9, 19);
const dayLabel = (i: number) => new Intl.DateTimeFormat("en", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(startDate + i * 86_400_000));

function AreaChart({ chart }: { chart: Tab["chart"] }) {
  const gid = useId().replace(/:/g, "");
  const [hover, setHover] = useState<number | null>(null);
  const { values, prev, fmt } = chart;
  const n = values.length;
  const max = Math.max(...values, ...prev) * 1.08;
  const x = (i: number) => P.l + (i / (n - 1)) * (CW - P.l - P.r);
  const y = (v: number) => P.t + (1 - v / max) * (CH - P.t - P.b);
  const line = (arr: number[]) => arr.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = `${line(values)} L${x(n - 1).toFixed(1)} ${y(0)} L${x(0).toFixed(1)} ${y(0)} Z`;
  const total = values.reduce((s, v) => s + v, 0);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const vx = ((e.clientX - r.left) / r.width) * CW;
    setHover(Math.max(0, Math.min(n - 1, Math.round(((vx - P.l) / (CW - P.l - P.r)) * (n - 1)))));
  };

  return (
    <div className="min-w-0 rounded-xl border border-line p-4 @xl:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[0.95rem] font-semibold">{chart.title}</p>
          <p className="mt-0.5 text-[0.8rem] text-ink-soft">Last 30 days, total {fmt(total)}</p>
        </div>
        <ul className="flex items-center gap-4 text-[0.78rem] text-ink-soft">
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="h-0.5 w-4 bg-blue" />
            This period
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="h-0.5 w-4 border-t-2 border-dashed border-steel" />
            Previous
          </li>
        </ul>
      </div>

      <div className="relative mt-3 touch-pan-y select-none" onPointerMove={move} onPointerLeave={() => setHover(null)} aria-hidden>
        <svg viewBox={`0 0 ${CW} ${CH}`} className="block w-full">
          <defs>
            <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#2f5f8a" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#2f5f8a" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3, 4].map((g) => {
            const gy = P.t + (g / 4) * (CH - P.t - P.b);
            return (
              <g key={g}>
                <line x1={P.l} x2={CW - P.r} y1={gy} y2={gy} stroke="#0b1623" strokeOpacity={0.08} />
                <text x={P.l - 8} y={gy + 4} textAnchor="end" className="text-[21px] @md:text-[11px]" fill="#46566a">
                  {fmt(Math.round(max * (1 - g / 4)))}
                </text>
              </g>
            );
          })}
          {values.map((_, i) =>
            i % 7 === 0 ? (
              <text key={i} x={x(i)} y={CH - 6} textAnchor="middle" className="text-[21px] @md:text-[11px]" fill="#46566a">
                {dayLabel(i)}
              </text>
            ) : null,
          )}
          <path d={area} fill={`url(#${gid})`} />
          <path d={line(prev)} fill="none" stroke="#6798c0" strokeWidth="1.75" strokeDasharray="5 4" />
          <path d={line(values)} fill="none" stroke="#2f5f8a" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          {hover !== null && (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={P.t} y2={CH - P.b} stroke="#0b1623" strokeOpacity={0.25} />
              <circle cx={x(hover)} cy={y(values[hover])} r={4.5} fill="#fff" stroke="#2f5f8a" strokeWidth="2.5" />
            </g>
          )}
        </svg>
        {hover !== null && (
          <div
            className="pointer-events-none absolute top-1 z-10 min-w-36 rounded-lg border border-line bg-white px-3 py-2 text-[0.8rem] shadow-[0_12px_30px_-16px_rgba(13,34,54,0.45)]"
            style={{ left: `clamp(0.25rem, calc(${(x(hover) / CW) * 100}% - 4.5rem), calc(100% - 9.5rem))` }}
          >
            <p className="font-semibold">{dayLabel(hover)}</p>
            <p className="mt-1 flex justify-between gap-4">
              <span className="text-ink-soft">This period</span>
              <span className="font-semibold tabular-nums">{fmt(values[hover])}</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-ink-soft">Previous</span>
              <span className="tabular-nums">{fmt(prev[hover])}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function DashboardDemo() {
  const base = useId();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = tabs[active];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const forward = e.key === "ArrowRight" || e.key === "ArrowDown";
    const back = e.key === "ArrowLeft" || e.key === "ArrowUp";
    if (!forward && !back) return;
    e.preventDefault();
    const next = (i + (forward ? 1 : -1) + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="@container bg-white text-ink">
      <div className="grid grid-cols-1 @3xl:grid-cols-[13.5rem_minmax(0,1fr)]">
        <aside className="flex min-w-0 flex-col border-b border-line bg-canvas @3xl:border-b-0 @3xl:border-r">
          <div className="hidden px-5 pb-2 pt-5 @3xl:block">
            <p className="label text-ink-soft">Workspace</p>
            <p className="mt-1 font-display text-[1.05rem] font-bold">Your store</p>
          </div>
          <div role="tablist" aria-label="Dashboard views" aria-orientation="vertical" className="flex gap-1 overflow-x-auto p-2 @3xl:flex-col @3xl:p-3">
            {tabs.map((t, i) => (
              <button
                key={t.key}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                role="tab"
                id={`${base}-tab-${t.key}`}
                aria-selected={active === i}
                aria-controls={`${base}-panel`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "flex min-h-11 shrink-0 items-center gap-2.5 rounded-lg px-3.5 text-[0.9rem] font-semibold transition-colors @3xl:w-full",
                  active === i ? "bg-white text-blue-deep shadow-[0_0_0_1px_rgba(11,22,35,0.1)]" : "text-ink-soft hover:bg-white/70 hover:text-ink",
                )}
              >
                <t.icon aria-hidden className={cn("size-[1.05rem]", active === i && "text-blue")} />
                {t.label}
              </button>
            ))}
          </div>
          <p className="mt-auto hidden px-5 pb-5 pt-8 text-[0.78rem] leading-snug text-ink-soft @3xl:block">
            All figures on this screen are generated for illustration.
          </p>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3.5 @xl:px-7">
            <div>
              <p className="font-display text-[1.15rem] font-bold leading-tight">{tab.label}</p>
              <p className="text-[0.8rem] text-ink-soft">Last 30 days, compared with the 30 before</p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span aria-hidden className="hidden rounded-lg bg-canvas px-3 py-1.5 text-[0.8rem] text-ink-soft ring-1 ring-ink/15 @xl:inline-block">
                Oct 19 to Nov 17
              </span>
              <p className="label rounded-full bg-sky-soft px-3.5 py-1.5 text-[0.7rem] text-blue-deep ring-1 ring-blue/20">Illustrative sample data, not real results</p>
            </div>
          </div>

          <div role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-tab-${tab.key}`} className="space-y-4 p-3 @xl:p-6">
            <dl className="grid grid-cols-2 gap-3 @5xl:grid-cols-4">
              {tab.kpis.map((k) => (
                <div key={k.label} className="min-w-0 rounded-xl border border-line p-3.5 @xl:p-4">
                  <dt className="text-[0.8rem] text-ink-soft">{k.label}</dt>
                  <dd className="mt-2">
                    <span className="flex flex-wrap items-end justify-between gap-x-2 gap-y-2">
                      <span className="font-display text-[clamp(1.35rem,1rem+1vw,1.9rem)] font-bold leading-none tabular-nums" style={{ fontVariationSettings: '"wdth" 108' }}>
                        {k.value}
                      </span>
                      <Sparkline values={k.spark} />
                    </span>
                    <span className="mt-2.5 flex items-center gap-1.5">
                      <Delta k={k} />
                      <span className="text-[0.76rem] text-ink-soft">vs previous</span>
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="grid gap-4 @5xl:grid-cols-[1.7fr_1fr]">
              <AreaChart key={tab.key} chart={tab.chart} />
              <div className="min-w-0 rounded-xl border border-line p-4 @xl:p-5">
                <p className="text-[0.95rem] font-semibold">Needs attention</p>
                <ul className="mt-3">
                  {tab.attention.map((a) => (
                    <li key={a.text} className="flex gap-3 border-t border-line py-3 first:border-t-0 first:pt-1">
                      <span aria-hidden className={cn("mt-1.5 size-2 shrink-0 rounded-full", dot[a.tone])} />
                      <div>
                        <p className="text-[0.9rem] leading-snug">{a.text}</p>
                        <p className="mt-0.5 text-[0.76rem] text-ink-soft">{a.meta}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-line">
              <p className="border-b border-line bg-canvas px-5 py-3 text-[0.95rem] font-semibold">{tab.table.title}</p>
              <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={`${tab.table.title}, scrollable`}>
              <table className="w-full text-left text-[0.9rem]">
                <caption className="sr-only">{tab.table.title}, sample records</caption>
                <thead>
                  <tr className="text-[0.76rem] text-ink-soft">
                    {tab.table.columns.map((c, i) => (
                      <th key={c} scope="col" className={cn("whitespace-nowrap px-3 py-2.5 font-medium @xl:px-5", i === 3 && "hidden text-right @md:table-cell", i >= 4 && "hidden @xl:table-cell")}>
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tab.table.rows.map((row) => (
                    <tr key={row[0]} className="border-t border-line transition-colors hover:bg-canvas">
                      {row.map((cell, i) => (
                        <td
                          key={i}
                          className={cn(
                            "whitespace-nowrap px-3 py-3 @xl:px-5",
                            i === 0 && "font-semibold tabular-nums",
                            i > 0 && i !== tab.table.statusCol && "text-ink-soft",
                            i === 3 && "hidden text-right tabular-nums @md:table-cell",
                            i >= 4 && "hidden tabular-nums @xl:table-cell",
                          )}
                        >
                          {i === tab.table.statusCol ? <Badge>{cell}</Badge> : cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
