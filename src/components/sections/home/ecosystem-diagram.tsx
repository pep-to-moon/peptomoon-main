"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  Globe,
  Headset,
  LayoutDashboard,
  Mail,
  Megaphone,
  PackageCheck,
  Search,
  Share2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { HoverPreview } from "@/components/ui/hover-preview";
import { media } from "@/content/media";
import { serviceMedia } from "@/content/service-media";
import { cn } from "@/lib/utils";

type Node = { label: string; hint: string; href: string; icon: LucideIcon };

const left: Node[] = [
  { label: "Website", hint: "Custom store build", href: "/services/ruo-peptide-website-development", icon: Globe },
  { label: "Payments", hint: "High-risk processing", href: "/services/payment-processing", icon: CreditCard },
  { label: "Fulfillment", hint: "US shipping and 3PL", href: "/services/peptide-3pl", icon: PackageCheck },
  { label: "Dashboards", hint: "One reporting layer", href: "/services/business-dashboards", icon: LayoutDashboard },
  { label: "Support", hint: "Order-aware helpdesk", href: "/services/customer-support", icon: Headset },
  { label: "Site audits", hint: "A written fix list", href: "/services/site-audits", icon: ClipboardCheck },
];
const right: Node[] = [
  { label: "Meta tracking", hint: "Pixel and server events", href: "/services/meta-advertising", icon: Megaphone },
  { label: "Affiliates", hint: "Referral tracking", href: "/services/affiliate-management", icon: Share2 },
  { label: "Email", hint: "Flows and retention", href: "/services/email-marketing", icon: Mail },
  { label: "Search and AI answers", hint: "SEO, GEO and AEO", href: "/services/seo-geo-aeo", icon: Search },
  { label: "Suppliers", hint: "COAs and batch records", href: "/services/supplier-verification", icon: ShieldCheck },
  { label: "Compliance review", hint: "Copy and records", href: "/services/compliance-support", icon: FileCheck2 },
];

/** The service's photograph, shown beside the cursor while the node is hovered. */
const previewFor = (href: string) => {
  const m = serviceMedia[href.split("/").pop() ?? ""];
  return m ? `/_next/image?url=${encodeURIComponent(`/images/${media[m.hero].file}.webp`)}&w=640&q=75` : undefined;
};

function NodeLink({
  node,
  align,
  onActive,
}: {
  node: Node;
  align: "left" | "right";
  onActive?: (on: boolean) => void;
}) {
  return (
    <Link
      href={node.href}
      data-preview={previewFor(node.href)}
      onPointerEnter={() => onActive?.(true)}
      onPointerLeave={() => onActive?.(false)}
      onFocus={() => onActive?.(true)}
      onBlur={() => onActive?.(false)}
      className={cn(
        "group flex items-center gap-3.5 rounded-full bg-[#1a3149] py-2.5 pl-2.5 pr-5 ring-1 ring-white/20 transition-[background-color,color,box-shadow] duration-300 hover:bg-white hover:text-ink hover:ring-white focus-visible:bg-white focus-visible:text-ink",
        align === "right" && "flex-row-reverse pl-5 pr-2.5 text-right",
      )}
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sky text-ink transition-colors duration-300 group-hover:bg-blue group-hover:text-white group-focus-visible:bg-blue group-focus-visible:text-white">
        <node.icon aria-hidden className="size-5" />
      </span>
      <span className="min-w-0">
        <span className="block font-display text-[0.98rem] font-bold uppercase leading-tight tracking-[0.04em]">{node.label}</span>
        <span className="mt-0.5 block text-[0.78rem] leading-tight text-white/60 transition-colors duration-300 group-hover:text-ink-soft group-focus-visible:text-ink-soft">
          {node.hint}
        </span>
      </span>
      <ArrowUpRight
        aria-hidden
        className={cn(
          "size-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
          align === "right" && "translate-x-1 group-hover:translate-x-0",
        )}
      />
    </Link>
  );
}

export function EcosystemDiagram() {
  const container = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const refs = useMemo(() => Array.from({ length: left.length + right.length }, () => ({ current: null as HTMLDivElement | null })), []);
  // The beams animate only while the diagram is on screen; endless off-screen SVG animation made scrolling stutter.
  const [active, setActive] = useState(false);
  // The node under the pointer or keyboard focus. Its beam lights up and the rest dim.
  const [focus, setFocus] = useState<number | null>(null);
  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const set = (i: number) => (on: boolean) => setFocus((cur) => (on ? i : cur === i ? null : cur));

  return (
    <>
      {/* Desktop: animated beams run from every service into one shared order and data record. */}
      <HoverPreview>
        <div ref={container} className="relative mx-auto hidden max-w-[1180px] grid-cols-[1fr_auto_1fr] items-center gap-x-16 py-6 lg:grid">
          <div className="flex flex-col items-start gap-6">
            {left.map((n, i) => (
              <div key={n.label} ref={refs[i]} className="relative z-10">
                <NodeLink node={n} align="left" onActive={set(i)} />
              </div>
            ))}
          </div>

          {/* One flat disc in the same color as the nodes, with a single thin ring that brightens when a node is active.
              It is opaque, so the beams meet its edge instead of running underneath it. */}
          <div ref={hub} className="relative z-10 grid size-40 place-items-center">
            <span
              aria-hidden
              className={cn("absolute inset-0 rounded-full ring-1 transition-colors duration-500", focus === null ? "ring-white/15" : "ring-sky/70")}
            />
            <div className="relative grid size-32 place-items-center rounded-full bg-[#1a3149] text-center text-white ring-1 ring-white/25">
              <span className="display block text-[1.35rem] leading-[1.08]">
                Orders
                <br />&amp; data
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-6">
            {right.map((n, i) => (
              <div key={n.label} ref={refs[i + left.length]} className="relative z-10">
                <NodeLink node={n} align="right" onActive={set(i + left.length)} />
              </div>
            ))}
          </div>

          {refs.map((r, i) => (
            <AnimatedBeam
              key={i}
              containerRef={container}
              fromRef={r}
              toRef={hub}
              active={active}
              reverse={i >= left.length}
              curvature={((i % left.length) - 2.5) * 24}
              duration={focus === i ? 2.4 : 4 + (i % 3)}
              delay={i * 0.25}
              pathColor="#ffffff"
              pathOpacity={focus === null ? 0.16 : focus === i ? 0.75 : 0.06}
              pathWidth={focus === i ? 3 : 2}
              gradientStartColor="#99D6EA"
              gradientStopColor="#FDC921"
            />
          ))}
        </div>
      </HoverPreview>

      {/* Phones and tablets: a simple grid of the same links. */}
      <ul className="grid gap-3 sm:grid-cols-2 lg:hidden">
        {[...left, ...right].map((n) => (
          <li key={n.label}>
            <NodeLink node={n} align="left" />
          </li>
        ))}
      </ul>
    </>
  );
}
