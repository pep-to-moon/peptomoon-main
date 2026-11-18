import type { ReactNode } from "react";
import { Check } from "lucide-react";
import type { ServiceVisualKey } from "@/content/types";
import { DashboardDemo } from "@/components/sections/home/dashboard-demo";
import { cn } from "@/lib/utils";

function Panel({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <figure className="rounded-[0.875rem] bg-sky-soft p-6 sm:p-8">
      <figcaption className="label flex flex-wrap items-center justify-between gap-2">
        <span>{title}</span>
        {note && <span className="rounded-full bg-white px-3 py-1 text-[0.68rem] text-blue-deep ring-1 ring-blue/20">{note}</span>}
      </figcaption>
      <div className="mt-6">{children}</div>
    </figure>
  );
}

function Chip({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "label inline-block rounded-full px-3.5 py-2",
        dark ? "bg-blue text-white" : "bg-white text-ink ring-1 ring-ink/10",
      )}
    >
      {children}
    </span>
  );
}

function Steps({ steps }: { steps: { t: string; d: string }[] }) {
  return (
    <ol>
      {steps.map((s, i) => (
        <li key={s.t} className="grid grid-cols-[2.25rem_1fr] gap-4">
          <div className="flex flex-col items-center">
            <span aria-hidden className="font-display text-[0.9rem] font-bold tabular-nums text-blue">
              {String(i + 1).padStart(2, "0")}
            </span>
            {i < steps.length - 1 && <span aria-hidden className="mt-1 w-px flex-1 bg-ink/20" />}
          </div>
          <div className="pb-6">
            <p className="font-display font-bold">{s.t}</p>
            <p className="text-[0.95rem] text-ink-soft">{s.d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="max-w-full overflow-x-auto rounded-2xl bg-white ring-1 ring-ink/10" role="region" aria-label="Table, scrolls horizontally on small screens" tabIndex={0}>
      <table className="w-full min-w-[26rem] text-left text-[0.95rem]">
        <thead>
          <tr className="label border-b border-line">
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="border-b border-line align-top last:border-0">
              {r.map((c, i) =>
                i === 0 ? (
                  <th key={c} scope="row" className="px-4 py-3 font-display font-bold">
                    {c}
                  </th>
                ) : (
                  <td key={c} className="px-4 py-3 text-ink-soft">
                    {c}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** A fixed, decorative pattern that stands in for a QR code in the label diagram. It encodes nothing. */
const LABEL_CODE = [1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1];

function Block({ title, text, accent }: { title: string; text: string; accent?: boolean }) {
  return (
    <div className={cn("rounded-2xl p-4 ring-1", accent ? "bg-blue text-white ring-blue" : "bg-white ring-ink/10")}>
      <p className="font-display font-bold">{title}</p>
      <p className={cn("text-[0.95rem]", accent ? "text-white/85" : "text-ink-soft")}>{text}</p>
    </div>
  );
}

export function ServiceVisual({ kind }: { kind: ServiceVisualKey }) {
  switch (kind) {
    case "architecture":
      return (
        <Panel title="From content to page">
          <div className="space-y-3">
            <Block title="Content" text="Products, batches, documents, articles" />
            <div aria-hidden className="mx-auto h-4 w-px bg-blue/40" />
            <Block title="Templates" text="Server-rendered Next.js pages and components" accent />
            <div aria-hidden className="mx-auto h-4 w-px bg-blue/40" />
            <Block title="Pages" text="Fast HTML, sitemaps, canonical tags, structured data" />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Compound", "Format", "Size", "Batch", "Document"].map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
        </Panel>
      );
    case "payments":
      return (
        <Panel title="From assessment to operation">
          <Steps
            steps={[
              { t: "Assess", d: "Model, volumes, history" },
              { t: "Prepare", d: "Site, policies, documents" },
              { t: "Select", d: "Providers compared on terms" },
              { t: "Integrate", d: "Checkout, webhooks, order logic" },
              { t: "Operate", d: "Monitoring and reconciliation" },
            ]}
          />
          <p className="label mt-2">Underwriters read: website, products, policies, entity, volumes</p>
        </Panel>
      );
    case "meta":
      return (
        <Panel title="Three layers, kept apart">
          <div className="grid gap-3">
            <Block title="Infrastructure" text="We build it: accounts, events, reporting" accent />
            <Block title="Management" text="Only where agreed in scope" />
            <Block title="Eligibility" text="Meta decides. Nobody can promise it" />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {["ViewContent", "AddToCart", "InitiateCheckout", "Purchase"].map((e) => (
              <Chip key={e}>{e}</Chip>
            ))}
          </div>
        </Panel>
      );
    case "supplier":
      return (
        <Panel title="Supplier scorecard" note="Illustrative">
          <Table
            head={["Check", "Result"]}
            rows={[
              ["Batch reference matches", "Present"],
              ["Laboratory named", "Present"],
              ["Method and chromatogram", "Gap: ask"],
              ["Identity data", "Present"],
              ["Dates consistent", "Present"],
            ]}
          />
        </Panel>
      );
    case "fulfillment":
      return (
        <Panel title="Order lifecycle">
          <div className="flex flex-wrap items-center gap-2">
            {["Paid", "Picked", "Packed", "Shipped", "Tracked", "Delivered"].map((s) => (
              <span key={s} className="flex items-center gap-2">
                <Chip>{s}</Chip>
              </span>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-blue/40 bg-white/60 p-4">
            <p className="label">Exception queue</p>
            <p className="mt-1 text-[0.95rem] text-ink-soft">Address problem, delay, damage, return. Each has an owner and a customer message.</p>
          </div>
        </Panel>
      );
    case "compliance":
      return (
        <Panel title="Review output" note="Illustrative example">
          <Table
            head={["Page", "Observation", "Action"]}
            rows={[
              ["Product page", "Notice differs from the site footer", "Align wording, raise with counsel"],
              ["FAQ", "Language that points to personal use", "Flag for review"],
              ["Email template", "Claim not on the website", "Remove or review"],
            ]}
          />
        </Panel>
      );
    case "affiliate":
      return (
        <Panel title="Programme rules">
          <Table
            head={["Rule", "Defined as"]}
            rows={[
              ["Attribution", "Stored on the order, with its source"],
              ["Commissionable amount", "Net sales, excluding refunds, chargebacks, taxes"],
              ["Reversals", "Automatic on refund or chargeback"],
              ["Payout state", "Approved, pending, paid"],
            ]}
          />
        </Panel>
      );
    case "email":
      return (
        <Panel title="Authentication ladder">
          <div className="flex flex-wrap gap-2">
            {["SPF", "DKIM", "DMARC"].map((c) => (
              <Chip key={c} dark>
                {c}
              </Chip>
            ))}
          </div>
          <p className="label mt-6">DMARC policy, staged</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {["Monitor", "Quarantine", "Reject"].map((s) => (
              <span key={s} className="flex items-center gap-2">
                <Chip>{s}</Chip>
              </span>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 text-[0.95rem]">
            <div className="rounded-2xl bg-white p-3 ring-1 ring-ink/10">Transactional stream</div>
            <div className="rounded-2xl bg-white p-3 ring-1 ring-ink/10">Marketing stream</div>
          </div>
        </Panel>
      );
    case "dashboard":
      return <DashboardDemo />;
    case "support":
      return (
        <Panel title="Ticket taxonomy and macros">
          <ul className="space-y-2.5">
            {["Order status", "Payment question", "Document request", "Shipping exception", "Usage question: reviewed deflection reply"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <Check aria-hidden className="size-4 shrink-0 text-blue" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Panel>
      );
    case "audit":
      return (
        <Panel title="What the audit looks at" note="Ranked by effect">
          <ul className="border-b border-ink/15">
            {[
              ["Compliance content", "Claims, notices, consistency"],
              ["SEO, GEO and AEO", "Crawl, structure, answers"],
              ["Payments and checkout", "Flow, failures, reviewer view"],
              ["Speed and phones", "Loading, response, layout shift"],
              ["Tracking", "Pixel, server events, consent"],
              ["Details", "Accessibility, security, policies"],
            ].map(([k, d]) => (
              <li key={k} className="grid grid-cols-[1fr_1.2fr] items-baseline gap-3 border-t border-ink/15 py-3">
                <span className="font-display font-bold">{k}</span>
                <span className="text-ink-soft">{d}</span>
              </li>
            ))}
          </ul>
          <p className="label mt-6">Every finding is marked</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {["Fix now", "Plan", "Watch"].map((c, i) => (
              <span key={c} className="flex items-center gap-2">
                <Chip dark={i === 0}>{c}</Chip>
              </span>
            ))}
          </div>
        </Panel>
      );
    case "label":
      return (
        <Panel title="Anatomy of a vial label" note="Layout only">
          <div className="mx-auto max-w-[19rem] rounded-xl bg-white p-4 ring-1 ring-ink/15">
            <div className="flex items-center justify-between border-b border-ink/15 pb-3">
              <span className="font-display text-[0.8rem] font-bold uppercase tracking-[0.08em]">Brand</span>
              <span className="label text-ink-soft">Range colour</span>
            </div>
            <div className="mt-3 grid grid-cols-[1fr_4.5rem] gap-3">
              <div>
                <p className="font-display text-[1.15rem] font-bold leading-tight">Product name</p>
                <p className="mt-1 text-[0.85rem] text-ink-soft">Quantity in the vial</p>
                <p className="mt-3 font-display text-[0.8rem] font-semibold tabular-nums">LOT 000000</p>
              </div>
              <div aria-hidden className="grid aspect-square grid-cols-5 gap-px bg-ink p-1">
                {LABEL_CODE.map((on, i) => (
                  <span key={i} className={on ? "bg-white" : "bg-ink"} />
                ))}
              </div>
            </div>
            <p className="mt-3 border-t border-ink/15 pt-2 text-[0.68rem] uppercase tracking-[0.08em] text-ink-soft">Research-use notice, worded by your counsel</p>
          </div>
          <ul className="mt-6 border-b border-ink/15">
            {[
              ["Product name and brand", "One system for the whole range"],
              ["Lot or batch reference", "Matches your records and the COA"],
              ["QR code", "Opens the batch's COA page"],
              ["Research-use notice", "Placed where your counsel specifies"],
            ].map(([k, d]) => (
              <li key={k} className="grid grid-cols-[1fr_1.2fr] items-baseline gap-3 border-t border-ink/15 py-3">
                <span className="font-display font-bold">{k}</span>
                <span className="text-ink-soft">{d}</span>
              </li>
            ))}
          </ul>
        </Panel>
      );
    case "telehealth":
      return (
        <Panel title="One visit, end to end" note="One shared record">
          <Steps
            steps={[
              { t: "Intake and consent", d: "Questions, eligibility rules and signed policies" },
              { t: "Clinician review", d: "Your licensed provider decides, never the software" },
              { t: "Visit and messages", d: "Video or audio, then secure follow-up" },
              { t: "Prescription route", d: "Handed to your pharmacy partner by your prescriber" },
              { t: "Plan and billing", d: "Subscription status follows the care plan" },
            ]}
          />
          <p className="label mt-2">Three areas, three permission sets</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Patient", "Provider", "Admin"].map((c, i) => (
              <Chip key={c} dark={i === 1}>
                {c}
              </Chip>
            ))}
          </div>
          <p className="mt-5 text-[0.9rem] text-ink-soft">Patient data lives in hosting accounts you own, under agreements you sign.</p>
        </Panel>
      );
    case "search":
      return (
        <Panel title="Three ways to be found" note="One foundation">
          <ul className="border-b border-ink/15">
            {[
              ["SEO", "Ranking in search results"],
              ["AEO", "Being the direct answer to a question"],
              ["GEO", "Being cited accurately by AI assistants"],
            ].map(([k, d]) => (
              <li key={k} className="grid grid-cols-[3.5rem_1fr] items-baseline gap-3 border-t border-ink/15 py-3.5">
                <span className="font-display text-[1.15rem] font-bold text-blue">{k}</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <p className="label mt-6">Underneath all three</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Crawlable", "Structured data", "Sourced", "Consistent"].map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
        </Panel>
      );
  }
}
