import { Section } from "@/components/ui/section";
import { ProcessTimeline } from "./process-timeline";

const steps = [
  { n: "01", title: "Discover", text: "We map your business, current systems and goals.", need: "A short call and access to what exists." },
  { n: "02", title: "Architect", text: "Catalog, payments, documents and integrations planned on one page.", need: "Decisions on scope and priority." },
  { n: "03", title: "Build", text: "Typed, tested components with checks for accessibility and speed.", need: "Content, documents and review time." },
  { n: "04", title: "Launch", text: "Redirects, indexing checks, monitoring and a launch checklist.", need: "Final sign-off." },
  { n: "05", title: "Maintain", text: "Updates, audits and a clear route for change.", need: "A named contact for requests." },
];

export function Process() {
  return (
    <Section labelledBy="process-title">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">Process</p>
            <h2 id="process-title" className="display display-lg mt-6">
              How a project runs, in five steps.
            </h2>
            <p className="mt-6 max-w-[40ch] text-ink-soft">
              Every project follows the same path, so you always know where it stands and what we need from you next.
            </p>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ProcessTimeline steps={steps} />
        </div>
      </div>
    </Section>
  );
}
