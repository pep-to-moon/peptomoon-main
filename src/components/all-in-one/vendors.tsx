import { Reveal } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const vendors: [string, string][] = [
  ["Web developer", "sees the site"],
  ["Payment broker", "sees the application"],
  ["3PL", "sees the parcels"],
  ["Lab", "sees the batch"],
  ["Marketing agency", "sees the ads"],
  ["SEO freelancer", "sees the rankings"],
];

/** Six separate vendors, each seeing one slice, set against one team that sees all of it. */
export function SixVendors() {
  return (
    <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
      <Reveal className="lg:col-span-5">
        <p
          role="img"
          aria-label="Six vendors become one team"
          className="font-display text-[clamp(7rem,3rem+15vw,15.5rem)] font-bold leading-[0.78] tracking-[-0.06em] text-blue"
        >
          <span aria-hidden>6</span>
          <span aria-hidden className="mx-[0.06em] text-[0.5em] font-medium tracking-normal text-ink-soft">
            to
          </span>
          <span aria-hidden>1</span>
        </p>
      </Reveal>
      <ol className="lg:col-span-7">
        {vendors.map(([name, sees], i) => (
          <Reveal as="li" delay={i} key={name} className="flex items-baseline justify-between gap-6 border-t border-ink/20 py-4">
            <span className="font-display text-[1.25rem] font-bold">{name}</span>
            <span className="text-right text-ink-soft">{sees}</span>
          </Reveal>
        ))}
        <Reveal as="li" delay={6} className={cn("flex items-baseline justify-between gap-6 rounded-2xl bg-navy px-5 py-5 text-white")}>
          <span className="font-display text-[1.35rem] font-bold">Peptomoon</span>
          <span className="text-right text-sky">sees the whole picture</span>
        </Reveal>
      </ol>
    </div>
  );
}
