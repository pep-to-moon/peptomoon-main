import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  canvas: "bg-canvas text-ink",
  sky: "bg-sky-soft text-ink",
  steel: "bg-steel text-ink",
  navy: "bg-navy text-white on-dark",
  blue: "bg-blue text-white on-dark",
  yellow: "bg-yellow text-ink",
} as const;

export type Tone = keyof typeof tones;

/**
 * A page section. With `panel`, the background becomes a large rounded card inset from the viewport edges, a pattern
 * used across the design references. Content inside should use .container-x for text and may bleed edge to edge.
 */
export function Section({
  id,
  tone = "canvas",
  className,
  children,
  labelledBy,
  pad = true,
  panel = false,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
  pad?: boolean;
  panel?: boolean;
}) {
  const section = (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "cv-auto relative",
        tones[tone],
        pad && "py-[clamp(3.5rem,7.5vw,6.5rem)]",
        panel && "panel overflow-clip",
        className,
      )}
    >
      {children}
    </section>
  );
  return panel ? <div className="px-2.5 py-1.5 sm:px-3">{section}</div> : section;
}

export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag data-reveal="" style={{ "--d": delay } as CSSProperties} className={className}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow", className)}>
      {index && <span aria-hidden>{index}</span>}
      <span>{children}</span>
    </p>
  );
}

export function SectionIntro({
  label,
  title,
  titleId,
  children,
  className,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  titleId: string;
  children?: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div className={cn("mb-[clamp(2.5rem,6vw,5rem)]", className)}>
      <Reveal className="border-t border-current/20 pt-4">
        <p className="eyebrow">{label}</p>
      </Reveal>
      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-8">
          <h2 id={titleId} className="display display-lg">
            {title}
          </h2>
        </Reveal>
        {children && (
          <Reveal delay={1} className="prose-article text-[1.0625rem] opacity-80 lg:col-span-4">
            {children}
          </Reveal>
        )}
      </div>
    </div>
  );
}
