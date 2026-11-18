import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PhotoLens } from "@/components/ui/photo-lens";
import { Reveal } from "@/components/ui/section";
import { layers } from "@/content/all-in-one";
import type { MediaKey } from "@/content/media";
import { cn } from "@/lib/utils";

const photoFor: Record<string, MediaKey> = {
  Build: "layer-build",
  Run: "layer-run",
  Grow: "layer-grow",
  Verify: "layer-verify",
};

/**
 * The four layers as cards that stack as you scroll (the idea behind React Bits' Scroll Stack): each card sticks near
 * the top of the screen and the next one slides over it. It is plain CSS position: sticky, so nothing changes layout
 * during scroll. Cards share one minimum height so the one underneath is always fully covered, and the stacking only
 * applies on screens tall enough to hold a card; elsewhere (phones, short laptops) the cards simply follow one another. Each photograph carries a magnifying lens.
 */
export function LayerRows() {
  return (
    <div className="mt-16 space-y-6">
      {layers.map((layer, i) => (
        <div key={layer.name} id={`layer-${layer.name.toLowerCase()}`} className="scroll-mt-28 [@media(min-width:1024px)_and_(min-height:820px)]:sticky" style={{ top: `calc(6.5rem + ${i} * 1.4rem)` }}>
          <div className="grid gap-8 rounded-[1.75rem] bg-white p-5 ring-1 ring-ink/10 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-14 lg:p-10 [@media(min-width:1024px)_and_(min-height:820px)]:min-h-[41rem]">
            <div className={cn("lg:col-span-6", i % 2 === 1 && "lg:order-2")}>
              <PhotoLens name={photoFor[layer.name]} ratio="4 / 3" sizes="(min-width: 1024px) 44vw, 100vw" radius="1.25rem" />
            </div>
            <div className={cn("min-w-0 lg:col-span-6", i % 2 === 1 && "lg:order-1")}>
              <Reveal>
                <p className="label text-ink-soft">{layer.index}</p>
                <h3 className="display-sentence mt-2 text-[clamp(2.4rem,1.2rem+3.6vw,4.4rem)]">{layer.name}</h3>
              </Reveal>
              <ul className="mt-6 border-b border-ink/20">
                {layer.cards.map((c, j) => (
                  <Reveal as="li" delay={j} key={c.t} className="border-t border-ink/20">
                    <Link href={c.href} className="group -mx-3 flex items-start justify-between gap-6 rounded-2xl px-3 py-4 transition-colors hover:bg-sky-soft">
                      <span className="min-w-0">
                        <span className="label block text-blue">{c.n}</span>
                        <span className="mt-0.5 block font-display text-[1.15rem] font-bold leading-snug">{c.t}</span>
                        <span className="mt-1 block max-w-[50ch] text-[0.95rem] text-ink-soft">{c.d}</span>
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="mt-1 size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue"
                      />
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
