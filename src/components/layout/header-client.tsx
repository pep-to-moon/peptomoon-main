"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";
import { primaryCta } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type Column = {
  key: string;
  index: string;
  label: string;
  verb: string;
  blurb: string;
  items: { name: string; href: string; summary: string }[];
};

/** Floating pill navigation. It tucks away while scrolling down and returns on scroll up. */
export function HeaderClient({ columns, nav }: { columns: Column[]; nav: { label: string; href: string }[] }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [megaAt, setMegaAt] = useState<string | null>(null);
  const mega = megaAt === pathname;
  const headerRef = useRef<HTMLElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 260 && !mega);
  });

  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaAt(null);
    };
    const onDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMegaAt(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [mega]);

  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <motion.header
      ref={headerRef}
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-3 z-50 sm:top-4"
    >
      <div className="container-x">
        <div className="relative">
        <div className="flex h-14 items-center justify-between gap-4 rounded-full bg-white/95 pl-5 pr-1.5 shadow-[0_18px_50px_-24px_rgba(13,34,54,0.55)] ring-1 ring-ink/10 sm:h-[3.75rem]">
          <Link href="/" aria-label={`${siteConfig.name} home`} className="shrink-0">
            <Logo priority />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) =>
              item.href === "/services" ? (
                <button
                  key={item.href}
                  type="button"
                  aria-expanded={mega}
                  aria-controls="mega-menu"
                  onClick={() => setMegaAt(mega ? null : pathname)}
                  className={cn(
                    "flex h-10 items-center gap-1.5 rounded-full px-4 font-display text-[0.8rem] font-bold uppercase tracking-[0.06em] transition-colors hover:bg-sky-soft",
                    (mega || active(item.href)) && "bg-sky-soft",
                  )}
                >
                  {item.label}
                  <ChevronDown aria-hidden className={cn("size-4 transition-transform", mega && "rotate-180")} />
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active(item.href) ? "page" : undefined}
                  className={cn(
                    "flex h-10 items-center rounded-full px-4 font-display text-[0.8rem] font-bold uppercase tracking-[0.06em] transition-colors hover:bg-sky-soft",
                    active(item.href) && "bg-sky-soft",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href={primaryCta.href} size="md" className="hidden sm:inline-flex">
              {primaryCta.label}
            </ButtonLink>
            <MobileMenu columns={columns} nav={nav} />
          </div>
        </div>

        {/* Desktop services menu */}
        <div
          id="mega-menu"
          hidden={!mega}
          className="mega-panel absolute inset-x-0 top-[calc(100%+0.65rem)] hidden overflow-hidden rounded-[1.5rem] bg-white shadow-[0_44px_100px_-44px_rgba(13,34,54,0.55)] ring-1 ring-ink/10 lg:block"
          style={{ display: mega ? undefined : "none" }}
        >
          <div className="grid grid-cols-4 divide-x divide-ink/10">
            {columns.map((col, ci) => (
              <div key={col.key} className="mega-col px-7 pb-6 pt-7" style={{ "--i": ci } as CSSProperties}>
                <p className="label text-ink-soft">
                  {col.index} / {col.label}
                </p>
                <p className="mt-3 font-display text-[1.3rem] font-bold leading-tight">{col.verb}</p>
                <p className="mt-1.5 text-[0.86rem] leading-snug text-ink-soft">{col.blurb}</p>
                <ul className="-mx-3 mt-5 space-y-0.5">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMegaAt(null)}
                        aria-current={active(item.href) ? "page" : undefined}
                        className={cn("group block rounded-xl px-3 py-2.5 transition-colors hover:bg-sky-soft", active(item.href) && "bg-sky-soft")}
                      >
                        <span className="flex items-center justify-between gap-2 font-display text-[0.95rem] font-bold leading-snug">
                          {item.name}
                          <ArrowUpRight
                            aria-hidden
                            className="size-4 shrink-0 -translate-x-1 translate-y-1 text-blue opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                          />
                        </span>
                        <span className="mt-0.5 line-clamp-2 block text-[0.8rem] leading-snug text-ink-soft">{item.summary}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-6 border-t border-ink/10 bg-sky-soft/60 px-7 py-4">
            <Link
              href="/services"
              onClick={() => setMegaAt(null)}
              className="group inline-flex items-center gap-2 font-display text-[0.82rem] font-bold uppercase tracking-[0.06em]"
            >
              View all {columns.reduce((n, c) => n + c.items.length, 0)} services
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <p className="text-[0.9rem] text-ink-soft">
              Not sure where to start?{" "}
              <Link href="/contact" onClick={() => setMegaAt(null)} className="font-semibold text-blue underline underline-offset-4">
                Tell us what you need
              </Link>
            </p>
          </div>
        </div>
        </div>
      </div>
    </motion.header>
  );
}
