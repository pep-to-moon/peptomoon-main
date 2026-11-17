import type { Faq } from "@/content/types";
import { FaqList } from "./faq-list";
import { Reveal, Section } from "./section";

/** A titled block of questions in the same two-column layout the service pages use. */
export function FaqSection({ id, title, items, className }: { id: string; title: string; items: Faq[]; className?: string }) {
  return (
    <Section labelledBy={id} className={className}>
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <div className="border-t border-ink/20 pt-4">
              <h2 id={id} className="display display-md">
                {title}
              </h2>
            </div>
          </div>
        </Reveal>
        <Reveal delay={1} className="lg:col-span-8">
          <FaqList items={items} />
        </Reveal>
      </div>
    </Section>
  );
}
