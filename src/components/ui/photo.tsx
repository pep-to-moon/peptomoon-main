import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { media, type MediaKey } from "@/content/media";
import credits from "@/content/media-credits.json";
import { cn } from "@/lib/utils";

const book = credits as Record<string, { alt?: string }>;

/**
 * One photograph from the media registry. It reveals with a clip-path wipe as it scrolls into view, drifts slightly
 * against the scroll on desktop (data-parallax, handled by the motion layer) and shows a cursor label on hover.
 * Alt text is the real photo's description, or empty while the slot still holds placeholder art.
 */
export function Photo({
  name,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  eager = false,
  reveal = true,
  parallax = 5,
  ratio,
  cursor,
  radius = "1.25rem",
  topic,
  className,
  children,
}: {
  name: MediaKey;
  sizes?: string;
  /** Marks the photo as the likely largest paint of the page: it loads first (eager, high fetch priority). */
  priority?: boolean;
  /** For photos in the first screen. The wipe then runs from CSS alone instead of waiting for scripts to load. */
  eager?: boolean;
  reveal?: boolean;
  parallax?: number;
  /** CSS aspect-ratio, for example "4 / 5". Defaults to the photo's own ratio. */
  ratio?: string;
  /** A short word shown inside the cursor ring while hovering this photo. */
  cursor?: string;
  radius?: string;
  /** Page-specific context for the alt text, such as "illustrating payment processing for telehealth merchants". */
  topic?: string;
  className?: string;
  children?: ReactNode;
}) {
  const m = media[name];
  // "<what the photo shows>, <what it illustrates on this page>". Empty while the slot still holds placeholder art.
  const described = book[name]?.alt ?? "";
  const alt = described ? `${described}, ${topic ?? m.topic}` : "";
  return (
    <figure
      data-reveal={reveal ? "mask" : undefined}
      data-eager={reveal && eager ? "" : undefined}
      data-cursor={cursor}
      className={cn("photo", className)}
      style={{ aspectRatio: ratio ?? `${m.w} / ${m.h}`, "--r": radius } as CSSProperties}
    >
      {/* The figure itself is never clipped (an observer would see zero area and never reveal it); the wipe is on the layer inside. */}
      <div className="photo-clip absolute inset-0">
        <div className="photo-scale absolute inset-0">
          <div data-parallax={parallax > 0 ? parallax : undefined} className={parallax > 0 ? "absolute inset-x-0 -inset-y-[7%]" : "absolute inset-0"}>
            <Image
              src={`/images/${m.file}.webp`}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              fetchPriority={priority ? "high" : undefined}
              className="object-cover"
            />
          </div>
        </div>
      </div>
      {children}
    </figure>
  );
}
