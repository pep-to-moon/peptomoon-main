import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Img = { src: string; width: number; height: number };

/** Browser-style frame for real screenshots. */
export function BrowserFrame({
  host,
  children,
  className,
}: {
  host: string;
  children: ReactNode;
  className?: string;
  /** Kept for older call sites. Shadows are now always soft. */
  shadow?: "yellow" | "ink" | "none";
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[0.875rem] bg-white ring-1 ring-ink/15",
        className,
      )}
    >
      <p className="truncate border-b border-ink/10 px-4 py-2.5 text-[0.72rem] font-medium tracking-[0.04em] text-ink-soft">{host}</p>
      {children}
    </div>
  );
}

export function PhoneFrame({
  image,
  alt,
  sizes,
  className,
  priority,
}: {
  image: Img;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("overflow-hidden rounded-[1.9rem] border-[5px] border-ink bg-ink", className)}>
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full"
      />
    </div>
  );
}

export function Shot({
  image,
  alt,
  sizes,
  priority,
  className,
}: {
  image: Img;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt={alt}
      sizes={sizes}
      priority={priority}
      className={cn("block h-auto w-full", className)}
    />
  );
}
