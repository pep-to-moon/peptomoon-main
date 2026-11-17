import { Check, CreditCard, FileText, Link2, Mail, MapPin, Package, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const frame = "mb-3 flex h-20 items-center justify-center overflow-hidden rounded-xl bg-sky-soft ring-1 ring-line";
const bar = "rounded bg-ink/15";

/** Tiny code-drawn pictures of each service working. Decorative, so hidden from assistive tech. */
export function MiniVisual({ title }: { title: string }) {
  let inner: React.ReactNode = null;
  switch (title) {
    case "RUO peptide e-commerce":
      inner = (
        <div className="grid w-full grid-cols-3 gap-2 px-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative rounded-md bg-white p-1.5 ring-1 ring-line">
              <div className="h-8 rounded bg-sky/70" />
              <div className={cn(bar, "mt-1.5 h-1 w-3/4")} />
              {i === 1 && <span className="absolute -right-1.5 -top-2 rounded-full bg-blue px-1.5 py-0.5 text-[0.55rem] font-bold text-white">COA ✓</span>}
            </div>
          ))}
        </div>
      );
      break;
    case "Telehealth platforms":
      inner = (
        <div className="flex w-full items-center gap-3 px-4">
          <div className="flex flex-col gap-2">
            <span className="size-6 rounded-full bg-blue" />
            <span className="size-6 rounded-full bg-steel" />
          </div>
          <div className="flex-1 space-y-1.5 rounded-md bg-white p-2 ring-1 ring-line">
            <div className={cn(bar, "h-1.5 w-2/3")} />
            <div className={cn(bar, "h-1.5 w-1/2")} />
            <div className="mt-2 grid grid-cols-4 gap-1">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={cn("h-3 rounded-sm", i === 2 ? "bg-blue" : "bg-sky/70")} />
              ))}
            </div>
          </div>
        </div>
      );
      break;
    case "Business dashboards":
      inner = (
        <div className="w-full px-4">
          <svg viewBox="0 0 100 24" className="h-8 w-full" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="2,20 18,14 32,17 48,8 64,12 80,4 98,7" className="text-blue" />
          </svg>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-4 rounded-md bg-white ring-1 ring-line" />
            ))}
          </div>
        </div>
      );
      break;
    case "High-risk payment processing":
      inner = (
        <div className="flex items-center gap-3">
          <CreditCard className="size-8 text-blue" strokeWidth={1.5} />
          <span className="rounded-full bg-navy px-3 py-1.5 text-[0.7rem] font-bold text-white">3%* · $0 reserve*</span>
        </div>
      );
      break;
    case "Fulfillment and 3PL":
      inner = (
        <div className="flex items-center gap-2 text-blue">
          <Package className="size-7" strokeWidth={1.5} />
          <span className="h-px w-5 border-t border-dashed border-blue" />
          <Truck className="size-7" strokeWidth={1.5} />
          <span className="h-px w-5 border-t border-dashed border-blue" />
          <MapPin className="size-7" strokeWidth={1.5} />
        </div>
      );
      break;
    case "Customer support":
      inner = (
        <div className="w-full space-y-2 px-5">
          <div className="w-2/3 rounded-lg rounded-bl-none bg-white px-2 py-2 ring-1 ring-line">
            <div className={cn(bar, "h-1.5 w-full")} />
          </div>
          <div className="ml-auto w-1/2 rounded-lg rounded-br-none bg-blue px-2 py-2">
            <div className="h-1.5 w-full rounded bg-white/70" />
          </div>
        </div>
      );
      break;
    case "SEO, GEO and AEO":
      inner = (
        <div className="w-full space-y-2 px-4">
          <div className="flex items-center gap-2 rounded-md bg-white px-2 py-2 ring-1 ring-line">
            <span className="rounded bg-blue px-1.5 py-0.5 text-[0.6rem] font-bold text-white">#1</span>
            <div className={cn(bar, "h-1.5 flex-1")} />
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-navy px-2.5 py-1 text-[0.62rem] font-bold text-white">
            <Check className="size-3 text-sky" strokeWidth={2.5} />
            AI answer · cited
          </span>
        </div>
      );
      break;
    case "Email and affiliates":
      inner = (
        <div className="flex items-center gap-3 text-blue">
          <Mail className="size-8" strokeWidth={1.5} />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-line">
            <Link2 className="size-3.5" strokeWidth={1.75} />
            <span className="h-1.5 w-10 rounded bg-ink/20" />
          </span>
        </div>
      );
      break;
    case "Compliance-aware ads and AI lead generation":
      inner = (
        <div className="w-full space-y-1.5 px-6">
          {["w-full", "w-3/4", "w-1/2"].map((w, i) => (
            <div key={w} className={cn("mx-auto h-3.5 rounded-sm", w, i === 0 ? "bg-sky" : i === 1 ? "bg-steel" : "bg-blue")} />
          ))}
        </div>
      );
      break;
    case "Supplier and COA verification":
      inner = (
        <div className="flex items-center gap-3 rounded-md bg-white px-4 py-3 ring-1 ring-line">
          <FileText className="size-7 text-blue" strokeWidth={1.5} />
          <div className="space-y-1 text-[0.65rem] font-bold text-ink-soft">
            <p className="flex items-center gap-1"><Check className="size-3 text-blue" strokeWidth={3} />HPLC</p>
            <p className="flex items-center gap-1"><Check className="size-3 text-blue" strokeWidth={3} />MS</p>
          </div>
        </div>
      );
      break;
    case "Compliance-oriented review":
      inner = (
        <div className="w-40 space-y-1.5 rounded-md bg-white p-3 ring-1 ring-line">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Check className="size-3 shrink-0 text-blue" strokeWidth={3} />
              <div className={cn(bar, "h-1.5 flex-1")} />
            </div>
          ))}
        </div>
      );
      break;
    case "Site audits":
      inner = (
        <div className="relative size-[4.5rem]">
          <svg viewBox="0 0 36 36" className="size-full -rotate-90" fill="none" strokeWidth={3.5} strokeLinecap="round">
            <circle cx="18" cy="18" r="15" className="stroke-white" />
            <circle cx="18" cy="18" r="15" pathLength={100} strokeDasharray="92 100" className="stroke-blue" />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-display text-lg font-bold">92</span>
        </div>
      );
      break;
  }
  return (
    <div aria-hidden className={frame}>
      {inner}
    </div>
  );
}
