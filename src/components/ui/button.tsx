import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn, isExternal } from "@/lib/utils";

const base =
  "group relative inline-flex shrink-0 items-center justify-center gap-3 overflow-hidden rounded-full font-display font-bold uppercase tracking-[0.05em] whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-300 select-none disabled:opacity-50";

const variants = {
  primary: "bg-blue text-white hover:bg-navy",
  secondary: "bg-white text-ink ring-1 ring-ink/15 hover:ring-ink/45",
  light: "bg-white text-ink hover:bg-sky",
  sky: "bg-sky text-ink hover:bg-white",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
  dark: "bg-ink text-white hover:bg-blue",
  onDark: "bg-white/10 text-white ring-1 ring-white/30 hover:bg-white hover:text-ink",
  accent: "bg-yellow text-ink hover:bg-yellow-soft",
  // Names used by shadcn-style components installed from component libraries.
  default: "bg-blue text-white hover:bg-navy",
  outline: "bg-white text-ink ring-1 ring-ink/15 hover:ring-ink/45",
} as const;

const circles: Record<keyof typeof variants, string> = {
  primary: "bg-white text-blue",
  secondary: "bg-ink text-white",
  light: "bg-blue text-white",
  sky: "bg-ink text-white",
  ghost: "bg-ink/10 text-ink",
  dark: "bg-white/15 text-white",
  onDark: "bg-white text-ink",
  accent: "bg-ink text-white",
  default: "bg-white text-blue",
  outline: "bg-ink text-white",
};

const sizes = {
  sm: { box: "h-10 text-[0.74rem]", withArrow: "pl-5 pr-1", noArrow: "px-5", circle: "size-8" },
  md: { box: "h-12 text-[0.8rem]", withArrow: "pl-6 pr-1.5", noArrow: "px-6", circle: "size-9" },
  lg: { box: "h-14 text-[0.86rem]", withArrow: "pl-7 pr-2", noArrow: "px-7", circle: "size-10" },
  icon: { box: "size-10", withArrow: "", noArrow: "", circle: "size-8" },
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

export function buttonVariants({
  variant = "primary",
  size = "md",
  arrow = true,
  className,
}: {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
}) {
  const s = sizes[size];
  return cn(base, variants[variant], s.box, arrow ? s.withArrow : s.noArrow, className);
}

function Inner({
  children,
  arrow,
  variant,
  size,
  external,
}: {
  children: ReactNode;
  arrow: boolean;
  variant: Variant;
  size: Size;
  external?: boolean;
}) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <>
      <span className="relative">{children}</span>
      {arrow && (
        <span
          aria-hidden
          className={cn(
            "relative grid place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45",
            sizes[size].circle,
            circles[variant],
          )}
        >
          <Icon className="size-[1.05em]" />
        </span>
      )}
    </>
  );
}

type Shared = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  arrow?: boolean;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  arrow = true,
  ...rest
}: Shared & { href: string; onClick?: () => void }) {
  const external = isExternal(href);
  const cls = buttonVariants({ variant, size, arrow, className });
  const inner = (
    <Inner arrow={arrow} variant={variant} size={size} external={external}>
      {children}
    </Inner>
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  arrow = false,
  ...rest
}: Shared & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonVariants({ variant, size, arrow, className })} {...rest}>
      <Inner arrow={arrow} variant={variant} size={size}>
        {children}
      </Inner>
    </button>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const external = isExternal(href);
  const cls = cn(
    "group inline-flex min-h-8 items-center gap-2 font-display text-[0.85rem] font-bold uppercase tracking-[0.06em] underline decoration-1 underline-offset-[6px] decoration-current/30 hover:decoration-current",
    className,
  );
  const Icon = external ? ArrowUpRight : ArrowRight;
  const icon = <Icon aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />;
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
      {icon}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
      {icon}
    </Link>
  );
}
