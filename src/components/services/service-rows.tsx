import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/section";
import { pillars } from "@/content/pillars";
import type { Service } from "@/content/types";

/**
 * An editorial index of services: hairline rules, a number, a name and a short summary. Rows fill on hover and the
 * arrow turns, so the list feels interactive without turning every item into a card.
 */
export function ServiceRows({ services, startAt = 1, showPillar = false }: { services: Service[]; startAt?: number; showPillar?: boolean }) {
  return (
    <ul className="border-b border-ink/20">
      {services.map((s, i) => {
        const pillar = pillars.find((p) => p.key === s.pillar);
        return (
          <Reveal as="li" key={s.slug} delay={i % 3} className="border-t border-ink/20">
            <Link
              href={`/services/${s.slug}`}
              className="group -mx-3 grid rounded-2xl items-start gap-x-8 gap-y-2 px-3 py-7 transition-colors duration-300 hover:bg-sky-soft sm:-mx-5 sm:px-5 lg:grid-cols-12 lg:items-center"
            >
              <span className="font-display text-[0.95rem] font-semibold text-ink-soft lg:col-span-1">{String(startAt + i).padStart(2, "0")}</span>
              <span className="font-display text-[clamp(1.35rem,1rem+1.3vw,2.1rem)] font-bold leading-tight lg:col-span-5">{s.name}</span>
              <span className="max-w-[52ch] text-ink-soft lg:col-span-4">{s.summary}</span>
              <span className="flex items-center justify-between gap-4 lg:col-span-2 lg:justify-end">
                {showPillar && pillar && <span className="label text-ink-soft lg:hidden xl:inline">{pillar.label}</span>}
                <ArrowUpRight aria-hidden className="size-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue" />
              </span>
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
