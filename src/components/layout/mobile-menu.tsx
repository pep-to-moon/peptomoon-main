"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { primaryCta } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type Column = {
  key: string;
  index: string;
  label: string;
  blurb: string;
  items: { name: string; href: string; summary: string }[];
};

type Phase = "closed" | "open" | "closing";

const OPEN_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const CLOSE_EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Phone and tablet menu. The sheet grows out of the Menu button as an expanding circle and shrinks back into it on
 * close, so it reads as the button opening and closing. Its top bar sits exactly where the header pill is, so the pill
 * appears to turn into the menu. Rows rise in one after another. With reduced motion it simply appears and disappears.
 */
export function MobileMenu({ columns, nav }: { columns: Column[]; nav: { label: string; href: string }[] }) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const busy = useRef(false);
  const [phase, setPhase] = useState<Phase>("closed");
  const [servicesOpen, setServicesOpen] = useState(false);
  const email = siteConfig.contact.email;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const origin = useCallback(() => {
    const r = openerRef.current?.getBoundingClientRect();
    const x = r ? r.left + r.width / 2 : window.innerWidth - 56;
    const y = r ? r.top + r.height / 2 : 40;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 16;
    return { x, y, radius };
  }, []);
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const open = useCallback(async () => {
    const d = dialogRef.current;
    if (!d || busy.current || d.open) return;
    busy.current = true;
    const { x, y, radius } = origin();
    document.documentElement.style.overflow = "hidden";
    d.showModal();
    setPhase("open");
    if (!reduced()) {
      const a = d.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 680, easing: OPEN_EASE },
      );
      await a.finished.catch(() => {});
    }
    busy.current = false;
  }, [origin]);

  const close = useCallback(async () => {
    const d = dialogRef.current;
    if (!d || !d.open || busy.current) return;
    busy.current = true;
    setPhase("closing");
    if (!reduced()) {
      const { x, y, radius } = origin();
      const a = d.animate(
        { clipPath: [`circle(${radius}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`] },
        { duration: 520, easing: CLOSE_EASE, fill: "forwards" },
      );
      await a.finished.catch(() => {});
    }
    d.close();
    d.getAnimations().forEach((a) => a.cancel());
    document.documentElement.style.overflow = "";
    setPhase("closed");
    setServicesOpen(false);
    busy.current = false;
  }, [origin]);

  // If the window grows to desktop size while the sheet is open, drop it at once.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      const d = dialogRef.current;
      if (mq.matches && d?.open) {
        d.getAnimations().forEach((a) => a.cancel());
        d.close();
        document.documentElement.style.overflow = "";
        busy.current = false;
        setPhase("closed");
        setServicesOpen(false);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const rows = nav.length;

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        onClick={open}
        aria-label="Open menu"
        aria-haspopup="dialog"
        className="flex h-11 w-[6.5rem] items-center justify-center gap-2 rounded-full bg-ink font-display text-[0.78rem] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-navy lg:hidden"
      >
        Menu
        <span aria-hidden className="flex gap-0.5">
          <span className="size-1 rounded-full bg-white" />
          <span className="size-1 rounded-full bg-white" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className="sheet"
        aria-label="Menu"
        data-state={phase}
        onCancel={(e) => {
          e.preventDefault();
          void close();
        }}
        onClose={() => {
          document.documentElement.style.overflow = "";
        }}
      >
        <div className="on-dark flex h-full flex-col overflow-y-auto overscroll-contain pb-8" data-lenis-prevent>
          {/* Same geometry as the header pill, so the pill seems to become the menu. */}
          <div className="container-x mt-3 shrink-0 sm:mt-4">
            <div className="flex h-14 items-center justify-between pl-5 pr-1.5 sm:h-[3.75rem]">
            <Logo tone="light" />
            <button
              type="button"
              onClick={() => void close()}
              aria-label="Close menu"
              className="flex h-11 w-[6.5rem] items-center justify-center gap-2 rounded-full bg-white font-display text-[0.78rem] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-sky"
            >
              Close
              <X aria-hidden className="size-4" />
            </button>
            </div>
          </div>

          <nav aria-label="Mobile" className="container-x mt-8 flex-1">
            <ul className="border-t border-white/20">
              {nav.map((item, i) => {
                const num = String(i + 1).padStart(2, "0");
                const label = "font-display text-[clamp(1.9rem,8.6vw,2.7rem)] font-bold uppercase leading-none";
                if (item.href === "/services") {
                  return (
                    <li key={item.href} data-stagger style={stagger(i)} className="border-b border-white/20">
                      <button
                        type="button"
                        aria-expanded={servicesOpen}
                        aria-controls="mobile-services"
                        onClick={() => setServicesOpen((v) => !v)}
                        className="flex min-h-[4.75rem] w-full items-center gap-4 text-left"
                      >
                        <span aria-hidden className="w-7 font-display text-[0.8rem] font-semibold tabular-nums text-white/50">
                          {num}
                        </span>
                        <span className={cn(label, servicesOpen && "text-sky")}>{item.label}</span>
                        <ChevronDown
                          aria-hidden
                          className={cn("ml-auto size-6 shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)]", servicesOpen && "rotate-180")}
                        />
                      </button>
                      <div
                        id="mobile-services"
                        className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]"
                        style={{ gridTemplateRows: servicesOpen ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden" inert={!servicesOpen}>
                          <div className="space-y-7 pb-7 pl-11 pt-1">
                            {columns.map((col) => (
                              <div key={col.key}>
                                <p className="label text-white/55">{col.label}</p>
                                <ul className="mt-1">
                                  {col.items.map((s) => (
                                    <li key={s.href}>
                                      <Link
                                        href={s.href}
                                        onClick={() => void close()}
                                        aria-current={isActive(s.href) ? "page" : undefined}
                                        className={cn(
                                          "flex min-h-12 items-center text-[1.05rem] font-semibold text-white/90 transition-colors hover:text-sky",
                                          isActive(s.href) && "text-sky",
                                        )}
                                      >
                                        {s.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                            <Link
                              href="/services"
                              onClick={() => void close()}
                              className="inline-flex min-h-12 items-center gap-2 font-display text-[0.82rem] font-bold uppercase tracking-[0.06em] underline underline-offset-[6px]"
                            >
                              All services
                              <ArrowUpRight aria-hidden className="size-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }
                return (
                  <li key={item.href} data-stagger style={stagger(i)} className="border-b border-white/20">
                    <Link
                      href={item.href}
                      onClick={() => void close()}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="group flex min-h-[4.75rem] items-center gap-4"
                    >
                      <span aria-hidden className="w-7 font-display text-[0.8rem] font-semibold tabular-nums text-white/50">
                        {num}
                      </span>
                      <span className={cn(label, "transition-colors group-hover:text-sky", isActive(item.href) && "text-sky")}>{item.label}</span>
                      <ArrowUpRight
                        aria-hidden
                        className="ml-auto size-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div data-stagger style={stagger(rows)} className="container-x mt-10">
            <ButtonLink href={primaryCta.href} onClick={() => void close()} size="lg" variant="light" className="w-full justify-between">
              {primaryCta.label}
            </ButtonLink>
            <p className="mt-5 max-w-[34ch] text-[0.9rem] text-white/60">{siteConfig.tagline}</p>
            {email && (
              <a href={`mailto:${email}`} className="mt-4 inline-flex min-h-11 items-center text-[0.95rem] font-semibold underline underline-offset-4">
                {email}
              </a>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
