import type { ComponentType } from "react";
import { Activity, Bell, Check, CreditCard, FileText, GitBranch, Globe, LifeBuoy, Lock, Receipt, Repeat, Scale, ShieldCheck, X } from "lucide-react";
import { paymentCompare, paymentIncluded, paymentStats } from "@/content/all-in-one";
import { cn } from "@/lib/utils";
import { CountUp } from "./count-up";
import { softShadow } from "./ui";

/** An illustrative settlement card. The asterisks point at the fine print printed under the section. */
export function SettlementCard() {
  const orders = [
    ["Order A", "$128.00"],
    ["Order B", "$64.50"],
    ["Order C", "$212.00"],
  ];
  return (
    <figure aria-label="Illustrative settlement card showing processing from 3% and a rolling reserve of zero for qualifying merchants" className="float-slow">
      <div className={cn("rounded-[1.5rem] bg-white p-5 text-ink sm:p-6", softShadow)}>
        <div className="flex items-center justify-between gap-3">
          <p className="font-display text-[0.95rem] font-bold uppercase tracking-[0.04em]">Today&apos;s settlement</p>
          <CreditCard aria-hidden className="size-5 text-blue" strokeWidth={1.5} />
        </div>
        <ul className="mt-4 divide-y divide-line text-[0.9rem]">
          {orders.map(([o, a]) => (
            <li key={o} className="flex justify-between py-2">
              <span className="text-ink-soft">{o}</span>
              <span className="font-semibold tabular-nums">{a}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-3 grid gap-2 rounded-xl bg-sky-soft p-3 text-[0.88rem]">
          <div className="flex justify-between">
            <dt className="text-ink-soft">Processing rate</dt>
            <dd className="font-semibold">from 3%*</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">Rolling reserve</dt>
            <dd className="font-semibold tabular-nums">$0.00*</dd>
          </div>
        </dl>
        <div className="mt-5">
          <div className="flex h-8 items-center rounded-lg bg-blue px-3 text-[0.78rem] font-bold uppercase tracking-[0.04em] text-white">Paid to your bank</div>
          <div className="mt-3 flex h-6 overflow-hidden rounded-lg bg-ink/5">
            <span className="w-[85%] bg-ink/10" />
            <span className="w-[15%] bg-[repeating-linear-gradient(45deg,rgba(11,22,35,0.25)_0_3px,transparent_3px_6px)]" />
          </div>
          <p className="mt-1.5 text-[0.75rem] text-ink-soft">Typical high-risk: 5–15% held 3–6 months</p>
        </div>
        <p className="mt-4 text-[0.7rem] text-ink-soft">Illustrative example, not a real account.</p>
      </div>
    </figure>
  );
}

export function PaymentStats() {
  return (
    <ul className="mt-10 grid gap-px overflow-hidden rounded-[1.25rem] bg-white/15 ring-1 ring-white/15 md:grid-cols-3">
      {paymentStats.map((s) => {
        const n = Number.parseInt(s.num, 10);
        const suffix = s.num.replace(String(n), "");
        return (
          <li key={s.label} className="bg-navy p-7">
            <p className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-bold leading-none">
              <CountUp value={n} suffix={suffix} />
              {s.star && <sup className="text-[0.45em] text-sky">*</sup>}
            </p>
            <p className="label mt-3 text-sky">{s.label}</p>
            <p className="mt-2 text-[0.92rem] text-white/80">{s.text}</p>
          </li>
        );
      })}
    </ul>
  );
}

export function CompareCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section aria-labelledby="cmp-typical" className="rounded-[1.25rem] bg-white/5 p-6 ring-1 ring-white/15">
        <h4 id="cmp-typical" className="label text-white/70">
          Typical high-risk account
        </h4>
        <ul className="mt-4 divide-y divide-white/10">
          {paymentCompare.map(([k, a]) => (
            <li key={k} className="flex gap-3 py-2.5">
              <X aria-hidden className="mt-0.5 size-4 shrink-0 text-white/50" strokeWidth={2} />
              <span>
                <span className="block text-[0.78rem] font-semibold uppercase tracking-[0.05em] text-white/60">{k}</span>
                <span className="text-[0.95rem] text-white/80">{a}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="cmp-us" className="rounded-[1.25rem] bg-white/10 p-6 ring-2 ring-sky shadow-[0_0_44px_-14px_rgba(153,214,234,0.55)]">
        <h4 id="cmp-us" className="label text-sky">
          Arranged through Peptomoon*
        </h4>
        <ul className="mt-4 divide-y divide-white/15">
          {paymentCompare.map(([k, , b]) => (
            <li key={k} className="flex gap-3 py-2.5">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-sky" strokeWidth={2.25} />
              <span>
                <span className="block text-[0.78rem] font-semibold uppercase tracking-[0.05em] text-white/70">{k}</span>
                <span className="text-[0.95rem] font-semibold">{b}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/** One icon per item of paymentIncluded, in the same order. */
const includedIcons: ComponentType<{ className?: string; strokeWidth?: number }>[] = [
  ShieldCheck,
  FileText,
  Globe,
  CreditCard,
  Repeat,
  Lock,
  Bell,
  Activity,
  Scale,
  LifeBuoy,
  GitBranch,
  Receipt,
];

export function IncludedGrid() {
  return (
    <ul className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {paymentIncluded.map((t, i) => {
        const Icon = includedIcons[i];
        return (
          <li key={t} className="flex items-start gap-3 rounded-xl bg-white/5 p-3.5 ring-1 ring-white/15">
            <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-sky" strokeWidth={1.5} />
            <span className="text-[0.92rem] leading-snug">{t}</span>
          </li>
        );
      })}
    </ul>
  );
}
