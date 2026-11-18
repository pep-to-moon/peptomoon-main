import Image from "next/image";
import type { CSSProperties } from "react";
import { ParticlesBg } from "@/components/motion/particles-bg";
import { ProximityText } from "@/components/motion/proximity-text";
import { ButtonLink } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { portfolio } from "@/content/portfolio";
import { cn } from "@/lib/utils";

const style = (d: number) => ({ "--d": d }) as CSSProperties;

/** The strip is dealt in card by card; every card past the visible ones shares the last delay. */
const dealt = (i: number, rise: string) => ({ "--i": Math.min(i, 7), "--rise": rise }) as CSSProperties;

/** Interleaves wide desktop captures and tall phone captures so the strip has a varied, photographic rhythm. */
const cards = portfolio.flatMap((p, i) => [
  {
    key: `${p.slug}-d`,
    src: p.images.desktop.src,
    alt: p.alt.desktop,
    kind: "wide" as const,
    offset: i % 2 === 0 ? "self-start" : "self-end",
  },
  {
    key: `${p.slug}-m`,
    src: p.images.mobile.src,
    alt: p.alt.mobile,
    kind: "tall" as const,
    offset: i % 2 === 0 ? "self-end" : "self-start",
  },
]);

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pb-6 sm:pb-8">
      <ParticlesBg
        lightMode
        particleCount={60}
        particleColors={["#2f5f8a", "#6798c0"]}
        connections
        connectionDistance={140}
        hoverEffect="repel"
        hoverRadius={160}
        speed={0.05}
        opacity={0.5}
        glow={0}
        pixelRatio={1}
        clickBurst={false}
        disableRotation
        heightClass="h-[560px]"
      />
      <div className="container-x relative pt-[clamp(6.25rem,8.5vw,7.75rem)]">
        <p className="hero-fade eyebrow" style={style(0)}>
          Infrastructure for RUO peptide businesses
        </p>

        <h1 id="hero-title" aria-label="One partner. Every moving part of your RUO peptide business." className="display display-hero mt-5 max-w-[27ch]">
          {/* Each line rises out of its own mask: the outer span clips, the inner one moves. */}
          <span className="hero-line" style={style(1)}>
            <span className="hero-line-in">
              <ProximityText text="One partner." />
            </span>
          </span>{" "}
          <span className="hero-line" style={style(2)}>
            <span className="hero-line-in">
              <ProximityText text="Every moving part of your" />
            </span>
          </span>{" "}
          <span className="hero-line marker" style={style(3)}>
            <span className="hero-line-in">
              <ProximityText text="RUO peptide business." />
            </span>
          </span>
        </h1>

        <div className="hero-fade mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" style={style(5)}>
          <p className="max-w-[52ch] text-[1.125rem] leading-relaxed text-ink/80">
            Websites, payments, supplier documentation, fulfillment, compliance review, marketing systems and reporting,
            planned and maintained together by one accountable team.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <ButtonLink href="/contact" size="lg">
                Tell us what you need
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="/case-studies" size="lg" variant="secondary">
              See our work
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* A strip of real work moving across the page. Decorative: the same projects are described in the portfolio section. */}
      <div aria-hidden data-hero-strip className="hero-strip relative mt-8 sm:mt-10">
        <Marquee repeat={2} className="[--duration:90s] [--gap:1.25rem] p-0 sm:[--gap:1.5rem]">
          {cards.map((c, i) => (
            <div
              key={c.key}
              style={dealt(i, c.kind === "wide" ? "3.5rem" : "6rem")}
              className={cn(
                "hero-card relative shrink-0 overflow-hidden rounded-[1.125rem] bg-white ring-1 ring-ink/10",
                c.kind === "wide" ? "h-[13.5rem] w-[20rem] sm:h-[16.5rem] sm:w-[25rem]" : "h-[17rem] w-[8.5rem] sm:h-[20rem] sm:w-[10rem]",
                c.offset,
              )}
            >
              <Image
                src={c.src}
                alt=""
                fill
                sizes={c.kind === "wide" ? "(min-width: 640px) 464px, 352px" : "184px"}
                className="object-cover object-top"
                priority={cards.indexOf(c) < 4}
              />
            </div>
          ))}
        </Marquee>
      </div>

      <div className="hero-fade container-x mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.9rem] text-ink-soft" style={style(11)}>
        <p className="flex items-center gap-3">
          <span className="font-display text-[2.4rem] font-bold leading-none text-ink">
            <NumberTicker value={6} />
          </span>
          partner-built RUO stores in our portfolio
        </p>
        <p>Next.js and a headless CMS behind every one of them</p>
      </div>
    </section>
  );
}
