import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Project card: the real homepage capture sits in a 16:9 frame so it reads like a full browser screen, and the
 * details sit underneath it rather than over it.
 */
export function ProjectCard({
  item,
  priority,
  detailed = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
}: {
  item: PortfolioItem;
  priority?: boolean;
  /** Adds the first three facts and the delivered services under the summary. */
  detailed?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <article data-card="" className={cn("group snap-start", className)}>
      <div className="relative aspect-video overflow-hidden rounded-[1.125rem] bg-navy ring-1 ring-ink/15">
        <Image
          src={item.images.desktop.src}
          alt={item.alt.desktop}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
        />
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-ink">
            <span aria-hidden className="size-2 rounded-full bg-yellow" />
            Live
          </span>
          <span className="hidden rounded-full bg-navy/85 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-white ring-1 ring-white/25 backdrop-blur-md sm:inline-block">
            {item.category}
          </span>
        </div>
      </div>

      <div className="mt-5">
        <p className="label mb-2 text-ink-soft sm:hidden">{item.category}</p>
        <h3 className="display text-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)] leading-none">{item.name}</h3>
        <p className="mt-3 max-w-[64ch] text-[0.98rem] text-ink-soft">{item.blurb}</p>
        {detailed && (
          <>
            <ul className="mt-5 max-w-[56ch] border-b border-ink/15 text-[0.95rem]">
              {item.facts.slice(0, 3).map((f) => (
                <li key={f} className="border-t border-ink/15 py-2.5">
                  {f}
                </li>
              ))}
            </ul>
            <p className="label mt-4 text-ink-soft">Delivered: {item.services.slice(0, 3).join(", ")}</p>
          </>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2.5 rounded-full bg-blue pl-5 pr-1.5 font-display text-[0.78rem] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-navy"
          >
            Visit {item.host}
            <span className="grid size-8 place-items-center rounded-full bg-white text-blue transition-transform group-hover:rotate-45">
              <ArrowUpRight aria-hidden className="size-4" />
            </span>
          </a>
          {item.caseStudy && (
            <Link
              href={`/case-studies/${item.slug}`}
              className="inline-flex h-11 items-center rounded-full px-5 font-display text-[0.78rem] font-bold uppercase tracking-[0.06em] ring-1 ring-ink/30 transition-colors hover:bg-sky-soft"
            >
              Case study
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
