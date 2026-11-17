import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, Section, SectionIntro } from "@/components/ui/section";
import { pillars } from "@/content/pillars";
import { servicesByPillar } from "@/content/services";
import { EcosystemDiagram } from "./ecosystem-diagram";

export function Ecosystem() {
  return (
    <Section tone="navy" panel labelledBy="ecosystem-title">
      <div className="container-x">
        <SectionIntro
          label="The connected ecosystem"
          titleId="ecosystem-title"
          title={
            <>
              Beyond the storefront. Thirteen systems, one partner.
            </>
          }
        >
          <p className="text-white/75">
            Payments, orders, fulfillment, affiliates, email and support are not separate projects. They share one order
            record and one view of the customer, so we plan and maintain them together.
          </p>
        </SectionIntro>

        <Reveal>
          <EcosystemDiagram />
        </Reveal>

        <div className="mt-20 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.key} className="border-t border-white/25 pt-6">
              <p className="label flex items-center gap-3 text-sky">
                <span aria-hidden>{p.index}</span>
                <span>{p.label}</span>
              </p>
              <p className="display mt-4 text-[1.45rem]">{p.verb}</p>
              <ul className="mt-5 space-y-0.5">
                {servicesByPillar(p.key).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex min-h-10 items-center justify-between gap-3 text-[0.95rem] text-white/80 transition-colors hover:text-white"
                    >
                      {s.name}
                      <ArrowRight aria-hidden className="size-4 shrink-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <ButtonLink href="/services" variant="light" size="lg">
            Explore our services
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
