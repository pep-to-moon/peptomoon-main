import Image from "next/image";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { portfolio } from "@/content/portfolio";
import { cn } from "@/lib/utils";

const style = (d: number) => ({ "--d": d }) as CSSProperties;

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
      <div className="container-x pt-[clamp(6.25rem,8.5vw,7.75rem)]">
        <p className="hero-rise eyebrow" style={style(0)}>
          Infrastructure for RUO peptide businesses
        </p>

        <h1 id="hero-title" className="display display-hero mt-5 max-w-[27ch]">
          <span className="hero-rise block" style={style(1)}>
            One partner.
          </span>{" "}
          <span className="hero-rise block" style={style(2)}>
            Every moving part of your
          </span>{" "}
          <span className="hero-rise marker block" style={style(3)}>
            RUO peptide business.
          </span>
        </h1>

        <div className="hero-rise mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" style={style(4)}>
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
      <div aria-hidden className="relative mt-8 sm:mt-10">
        <Marquee pauseOnHover repeat={2} className="[--duration:90s] [--gap:1.25rem] p-0 sm:[--gap:1.5rem]">
          {cards.map((c) => (
            <div
              key={c.key}
              className={cn(
                "relative shrink-0 overflow-hidden rounded-[1.125rem] bg-white ring-1 ring-ink/10",
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

      <div className="container-x mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.9rem] text-ink-soft">
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
