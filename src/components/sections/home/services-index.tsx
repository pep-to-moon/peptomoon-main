import { ServiceRows } from "@/components/services/service-rows";
import { Section, SectionIntro } from "@/components/ui/section";
import { services } from "@/content/services";
import { pillars } from "@/content/pillars";

/** Every service as one ordered index, grouped by the four pillars. */
export function ServicesIndex() {
  return (
    <Section labelledBy="services-index-title">
      <div className="container-x">
        <SectionIntro label="What we do" titleId="services-index-title" title={<>Thirteen services, one team.</>}>
          <p>Four groups: build, run, grow and verify. Take one service, or the whole set.</p>
        </SectionIntro>

        <div className="space-y-14">
          {pillars.map((p, pi) => {
            const list = services.filter((s) => s.pillar === p.key);
            const start = pillars.slice(0, pi).reduce((sum, q) => sum + services.filter((s) => s.pillar === q.key).length, 1);
            return (
              <div key={p.key} className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-3">
                  <p className="label text-ink-soft">{p.label}</p>
                  <p className="heading-sm mt-2">{p.verb}</p>
                </div>
                <div className="lg:col-span-9">
                  <ServiceRows services={list} startAt={start} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
