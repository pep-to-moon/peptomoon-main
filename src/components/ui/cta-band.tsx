import type { ReactNode } from "react";
import { Section } from "@/components/ui/section";

/**
 * Closing call to action for inner pages. It sits on the same canvas as the rest of the page (a white rounded card with
 * a soft blue glow), so the page does not change background colour before the footer.
 */
export function CtaBand({
  id,
  title,
  children,
  actions,
}: {
  id: string;
  title: ReactNode;
  children?: ReactNode;
  actions: ReactNode;
}) {
  return (
    <Section labelledBy={id} pad={false} className="py-[clamp(3rem,7vw,6rem)]">
      <div className="container-x">
        <div className="border-t border-ink/20 pt-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 id={id} className="display display-xl max-w-[16ch]">
                {title}
              </h2>
              <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>
            </div>
            {children && <div className="text-ink-soft lg:col-span-5">{children}</div>}
          </div>
        </div>
      </div>
    </Section>
  );
}
