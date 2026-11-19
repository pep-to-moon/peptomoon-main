import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { DashboardDemo } from "./dashboard-demo";
import { DashboardScroll } from "./dashboard-scroll";

export function Dashboards() {
  return (
    <Section labelledBy="dash-title">
      <div className="container-x">
        <DashboardScroll
          heading={
            <div className="mx-auto max-w-[56rem] text-center">
              <p className="eyebrow">Reporting and operations</p>
              <h2 id="dash-title" className="display display-xl mt-6">
                Peptide business dashboards: one reporting layer for everything.
              </h2>
              <p className="mx-auto mt-6 max-w-[56ch] text-[1.1rem] text-ink-soft">
                One reporting layer across orders, payments, inventory, affiliates, fulfillment and support, built on a shared
                order record so the same number means the same thing everywhere.
              </p>
            </div>
          }
        >
          <DashboardDemo />
        </DashboardScroll>
        <div className="mt-12 flex justify-center">
          <ButtonLink href="/services/business-dashboards" size="lg">
            See business dashboards
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
