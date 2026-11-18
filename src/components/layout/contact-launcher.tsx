"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, Mail, MessagesSquare, ShieldCheck, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const KEY = "pm-launcher";
/** First reminder after this long in the visit, then one more this long after the card was closed. Never a third. */
const FIRST_MS = 10_000;
const SECOND_MS = 90_000;

type State = { t0: number; shown: number; last: number; done: boolean };
const load = (): State => {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as State;
  } catch {
    /* storage can be unavailable; the reminder then simply follows the page timer */
  }
  return { t0: Date.now(), shown: 0, last: 0, done: false };
};
const save = (s: State) => {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* harmless */
  }
};

/**
 * A fixed contact button in the bottom-right corner. Ten seconds into a visit it opens a short card with the ways to get
 * in touch, and once more ninety seconds after the card is closed. The timer follows the visit across pages, not one
 * page, and it stops for good once a visitor uses an option or opens the card themselves. Nothing is announced or focused
 * automatically, the card closes with Escape, the X or a click elsewhere, and it never appears on the contact page.
 */
export function ContactLauncher() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(true); // the small dot on the button, until the card has been opened once
  const root = useRef<HTMLDivElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const hidden = pathname === "/contact";

  const close = useCallback(() => {
    setOpen(false);
    save({ ...load(), last: Date.now() }); // the second reminder counts from here
  }, []);

  // The reminder. The schedule lives in the visit (sessionStorage), so moving between pages does not restart it.
  useEffect(() => {
    if (hidden) return;
    const s = load();
    save(s);
    if (s.done || s.shown >= 2) return;
    const due = s.shown === 0 ? s.t0 + FIRST_MS : s.last + SECOND_MS;
    const t = window.setTimeout(() => {
      const cur = load();
      if (cur.done || cur.shown >= 2) return;
      setOpen(true);
      setNudge(false);
      save({ ...cur, shown: cur.shown + 1, last: Date.now() });
      trackEvent("contact_launcher_reminder");
    }, Math.max(800, due - Date.now()));
    return () => window.clearTimeout(t);
  }, [hidden, pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, close]);

  if (hidden) return null;

  const email = siteConfig.contact.email;
  const options = [
    { href: "/contact", label: "Start a project", note: "A short form, two minutes", icon: ArrowRight, id: "project", primary: true },
    { href: "/contact?topic=payments", label: "Check payment eligibility", note: "For RUO and telehealth merchants", icon: ShieldCheck, id: "payments" },
    { href: `mailto:${email}`, label: "Email us", note: email, icon: Mail, id: "email" },
  ];

  return (
    <div
      ref={root}
      className={cn(
        "fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:right-6",
        // On the all-in-one page phones already show a sticky call-to-action bar along the bottom.
        pathname === "/all-in-one" && "max-md:bottom-24",
      )}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            id="contact-launcher-card"
            role="dialog"
            aria-label="Ways to get in touch"
            initial={reduce ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 28 }}
            style={{ transformOrigin: "100% 100%" }}
            className="w-[min(22.5rem,calc(100vw-2rem))] rounded-[1.5rem] bg-white p-5 shadow-[0_30px_70px_-30px_rgba(13,34,54,0.55)] ring-1 ring-ink/10 sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="label text-blue">Let&apos;s connect</p>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="-mr-2 -mt-2 grid size-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-sky-soft hover:text-ink"
              >
                <X aria-hidden className="size-[1.15rem]" />
              </button>
            </div>
            <p className="display mt-2 text-[1.55rem] leading-[1.08]">Still working out your setup?</p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
              Tell us what you sell and where you are stuck. We read every enquiry and reply by email.
            </p>
            <ul className="mt-5 border-t border-ink/15">
              {options.map((o, i) => {
                const Icon = o.icon;
                const external = o.href.startsWith("mailto:");
                const Tag = external ? "a" : Link;
                return (
                  <li key={o.id} className="border-b border-ink/15">
                    <Tag
                      ref={i === 0 ? firstLink : undefined}
                      href={o.href}
                      onClick={() => {
                        trackEvent("contact_launcher_option", { option: o.id });
                        save({ ...load(), done: true });
                        setOpen(false);
                      }}
                      className="group flex items-center justify-between gap-4 py-3.5"
                    >
                      <span className="min-w-0">
                        <span className="block font-display text-[1.02rem] font-bold leading-tight">{o.label}</span>
                        <span className="mt-0.5 block truncate text-[0.82rem] text-ink-soft">{o.note}</span>
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5",
                          o.primary ? "bg-blue text-white" : "bg-sky-soft text-blue",
                        )}
                      >
                        {external ? <ArrowUpRight className="size-4" /> : <Icon className="size-4" />}
                      </span>
                    </Tag>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-expanded={open}
        aria-controls="contact-launcher-card"
        onClick={() => {
          const next = !open;
          setOpen(next);
          setNudge(false);
          if (next) {
            save({ ...load(), done: true }); // they found it themselves, so no further reminders
            trackEvent("contact_launcher_open");
            window.setTimeout(() => firstLink.current?.focus(), 60);
          } else {
            close();
          }
        }}
        whileHover={reduce ? undefined : { y: -2 }}
        whileTap={reduce ? undefined : { scale: 0.97 }}
        className="group relative flex h-14 items-center gap-3 rounded-full bg-navy pl-5 pr-2 text-white shadow-[0_20px_44px_-18px_rgba(13,34,54,0.7)] ring-1 ring-white/15 transition-colors duration-300 hover:bg-blue"
      >
        <span className="font-display text-[0.8rem] font-bold uppercase tracking-[0.07em]">Let&apos;s talk</span>
        <span className="relative grid size-10 place-items-center rounded-full bg-white text-navy transition-colors duration-300 group-hover:text-blue">
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={open ? "close" : "open"}
              initial={reduce ? false : { rotate: -60, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { rotate: 60, opacity: 0, scale: 0.7 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
              className="grid place-items-center"
            >
              {open ? <X aria-hidden className="size-[1.15rem]" /> : <MessagesSquare aria-hidden className="size-[1.15rem]" />}
            </motion.span>
          </AnimatePresence>
        </span>
        {nudge && !open && <span aria-hidden className="absolute -right-0.5 -top-0.5 size-3.5 rounded-full bg-yellow ring-2 ring-canvas" />}
      </motion.button>
    </div>
  );
}
