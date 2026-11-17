import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Pillar colours drawn from the existing palette: Build blue, Run navy, Grow steel, Verify sky. */
export const pillarBar = { build: "bg-blue", run: "bg-navy", grow: "bg-steel", verify: "bg-sky" } as const;
export type Pillar = keyof typeof pillarBar;

export const softShadow = "shadow-[0_44px_100px_-44px_rgba(13,34,54,0.55)]";

/** Top rule with an optional aria-hidden section number, the site's "NN / Label" style. */
export function Rule({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("border-t border-current/20 pt-4", className)}>{children}</div>;
}

export function Eyebrow({ n, children, className }: { n?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow", className)}>
      {n && (
        <span aria-hidden className="mr-2 opacity-70">
          {n} /
        </span>
      )}
      {children}
    </p>
  );
}

/** Short rule used as the bullet for every checklist. */
export function Ticks({ items, cols = 2, dark = false, className }: { items: string[]; cols?: 1 | 2; dark?: boolean; className?: string }) {
  return (
    <ul className={cn("mt-4 gap-x-8", cols === 2 && "sm:columns-2", className)}>
      {items.map((t) => (
        <li key={t} className="relative break-inside-avoid py-1.5 pl-6 text-[0.95rem]">
          <span aria-hidden className={cn("absolute left-0 top-[0.95rem] h-0.5 w-3", dark ? "bg-sky" : "bg-blue")} />
          {t}
        </li>
      ))}
    </ul>
  );
}
