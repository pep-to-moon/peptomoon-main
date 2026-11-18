import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { ProximityText } from "@/components/motion/proximity-text";
import { Magnetic } from "@/components/ui/magnetic";
import { Marquee } from "@/components/ui/marquee";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/section";
import { heroBadges, pillarsStrip, verticals } from "@/content/all-in-one";
import { cn } from "@/lib/utils";

/** Opening of /all-in-one: the headline beside a stack of two photographs, then the four layers as an index. */
export function AioHero() {
  return (
    <section id="overview" aria-labelledby="aio-title" className="pb-[clamp(2rem,4vw,3.5rem)] pt-[clamp(6.25rem,8.5vw,7.75rem)]">
      <div className="container-x">
        <Breadcrumbs items={[{ name: "All-in-one", path: "/all-in-one" }]} schema={false} />

        <div className="mt-8 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 lg:pt-6">
            <h1
              id="aio-title"
              aria-label="All-in-one infrastructure for RUO peptide and telehealth businesses"
              className="display-sentence hero-rise max-w-[17ch] text-[clamp(2.4rem,0.7rem+4.7vw,5.2rem)]"
            >
              <ProximityText text="All-in-one infrastructure for RUO peptide and telehealth businesses" />
            </h1>
            <Reveal delay={1} eager>
              <p className="mt-8 max-w-[56ch] text-[1.1875rem] leading-relaxed text-ink/80">
                <strong className="font-semibold text-ink">One team builds and runs your whole business.</strong> That includes your website or telehealth
                platform and high-risk payment processing from 3% with no rolling reserve for qualifying merchants. It also covers fulfillment, COA
                documentation and SEO, GEO and AEO growth. Everything is built to work together from the first day.
              </p>
            </Reveal>
            <Reveal delay={2} eager>
              <ul aria-label="At a glance" className="label mt-8 flex flex-wrap gap-x-7 gap-y-2 text-ink-soft">
                {heroBadges.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={3} eager>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <ButtonLink href="/contact?topic=all-in-one" size="lg">
                    Start a project
                  </ButtonLink>
                </Magnetic>
                <a
                  href="#payments"
                  className="group inline-flex h-14 shrink-0 items-center gap-3 whitespace-nowrap rounded-full pl-5 pr-2 font-display text-[0.86rem] font-bold uppercase tracking-[0.05em] text-ink"
                >
                  <span className="link-draw pb-0.5">See payment processing</span>
                  <span aria-hidden className="grid size-10 place-items-center rounded-full bg-ink text-white">
                    <ArrowDown className="size-[1.05em] transition-transform group-hover:translate-y-0.5" />
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          <div className="relative lg:col-span-5">
            <Photo
              name="lab-bench"
              ratio="4 / 5"
              priority
              eager
              sizes="(min-width: 1024px) 40vw, 100vw"
              radius="1.5rem"
              topic="illustrating the laboratory documentation behind an all-in-one RUO peptide business"
            />
            <Photo
              name="vials-macro"
              topic="representing batch-matched COAs and supplier records for RUO peptide brands"
              ratio="4 / 3"
              reveal={false}
              parallax={9}
              sizes="(min-width: 1024px) 20vw, 50vw"
              radius="1rem"
              className="absolute -bottom-8 -left-3 w-[46%] ring-[10px] ring-canvas sm:-left-8"
            />
          </div>
        </div>

        <ul className="mt-20 grid border-t border-ink/20 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {pillarsStrip.map((p, i) => (
            <li key={p.t} className="min-w-0 border-b border-ink/15 sm:border-b-0">
              <a
                href={`#layer-${p.t.toLowerCase()}`}
                className={cn(
                  "group flex h-full flex-col gap-2 py-6 pr-6 transition-colors hover:bg-sky-soft",
                  // Every cell has room on its left. The text of the first cell in each row still lines up with the
                  // headline above, because the hover fill bleeds into the page margin instead of pushing the text in.
                  "max-sm:-ml-4 max-sm:pl-4",
                  i % 2 === 0 ? "sm:max-lg:-ml-5 sm:max-lg:pl-5" : "sm:max-lg:pl-5",
                  i === 0 ? "lg:-ml-6 lg:pl-6" : "lg:pl-6",
                  i < pillarsStrip.length - 1 && "lg:border-r lg:border-ink/15",
                )}
              >
                <span className="label text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex items-center justify-between gap-3 font-display text-[1.7rem] font-semibold tracking-[-0.02em]">
                  {p.t}
                  <ArrowUpRight aria-hidden className="size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
                </span>
                <span className="text-[0.95rem] text-ink-soft">{p.d}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div aria-hidden className="mt-10 overflow-hidden">
        <Marquee pauseOnHover repeat={3} className="[--duration:60s] [--gap:3rem]">
          {verticals.map((v, i) => (
            <span key={v} className="flex items-center gap-12">
              <span className={cn("marquee-word", i % 2 === 1 && "marquee-outline")}>{v}</span>
              <span className="size-3 rounded-full bg-yellow sm:size-4" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
