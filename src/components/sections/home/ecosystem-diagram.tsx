"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import {
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
import { cn } from "@/lib/utils";

type Node = { label: string; href: string; icon: LucideIcon };

const left: Node[] = [
  { label: "Website", href: "/services/ruo-peptide-website-development", icon: Globe },
  { label: "Payments", href: "/services/payment-processing", icon: CreditCard },
  { label: "Fulfillment", href: "/services/fulfillment-logistics", icon: PackageCheck },
  { label: "Dashboards", href: "/services/business-dashboards", icon: LayoutDashboard },
  { label: "Support", href: "/services/customer-support", icon: Headset },
  { label: "Site audits", href: "/services/site-audits", icon: ClipboardCheck },
];
const right: Node[] = [
  { label: "Meta tracking", href: "/services/meta-advertising", icon: Megaphone },
  { label: "Affiliates", href: "/services/affiliate-management", icon: Share2 },
  { label: "Email", href: "/services/email-marketing", icon: Mail },
  { label: "Search and AI answers", href: "/services/seo-geo-aeo", icon: Search },
  { label: "Suppliers", href: "/services/supplier-verification", icon: ShieldCheck },
  { label: "Compliance review", href: "/services/compliance-support", icon: FileCheck2 },
];

function NodeLink({ node, align }: { node: Node; align: "left" | "right" }) {
  return (
    <Link
      href={node.href}
      className={cn(
        "group flex items-center gap-3 rounded-full bg-white/[0.08] py-2.5 pl-2.5 pr-6 ring-1 ring-white/20 transition-colors duration-300 hover:bg-white hover:text-ink",
        align === "right" && "flex-row-reverse pl-6 pr-2.5",
      )}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sky text-ink transition-colors group-hover:bg-blue group-hover:text-white">
        <node.icon aria-hidden className="size-5" />
      </span>
      <span className="font-display text-[1rem] font-bold uppercase tracking-[0.04em]">{node.label}</span>
    </Link>
  );
}

export function EcosystemDiagram() {
  const container = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const refs = useMemo(() => Array.from({ length: left.length + right.length }, () => ({ current: null as HTMLDivElement | null })), []);

  return (
    <>
      {/* Desktop: animated beams run from every service into one shared order and data record. */}
      <div ref={container} className="relative mx-auto hidden max-w-[1180px] grid-cols-[1fr_auto_1fr] items-center gap-x-16 py-6 lg:grid">
        <div className="flex flex-col items-start gap-6">
          {left.map((n, i) => (
            <div key={n.label} ref={refs[i]} className="relative z-10">
              <NodeLink node={n} align="left" />
            </div>
          ))}
        </div>

        <div ref={hub} className="relative z-10 grid size-44 place-items-center">
          <span aria-hidden className="absolute inset-3 rounded-full ring-1 ring-white/25" />
          <div className="relative grid size-32 place-items-center rounded-full bg-white text-center text-ink">
            <span className="font-display text-[0.95rem] font-extrabold uppercase leading-tight tracking-[0.04em]">
              Orders
              <br />& data
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-6">
          {right.map((n, i) => (
            <div key={n.label} ref={refs[i + left.length]} className="relative z-10">
              <NodeLink node={n} align="right" />
            </div>
          ))}
        </div>

        {refs.map((r, i) => (
          <AnimatedBeam
            key={i}
            containerRef={container}
            fromRef={r}
            toRef={hub}
            reverse={i >= left.length}
            curvature={((i % left.length) - 2.5) * 24}
            duration={4 + (i % 3)}
            delay={i * 0.25}
            pathColor="#ffffff"
            pathOpacity={0.16}
            pathWidth={2}
            gradientStartColor="#99D6EA"
            gradientStopColor="#FDC921"
          />
        ))}
      </div>

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
