import type { ReactNode } from "react";
import { ParticlesBg } from "@/components/motion/particles-bg";
import { Section } from "@/components/ui/section";

/**
 * Closing call to action for inner pages. It sits on the same canvas as the rest of the page (a white rounded card with
 * a soft blue glow), so the page does not change background color before the footer.
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
    <Section labelledBy={id} pad={false} className="overflow-clip py-[clamp(3rem,7vw,6rem)]">
      <ParticlesBg
        lightMode
        particleCount={36}
        particleColors={["#2f5f8a", "#6798c0"]}
        connections
        connectionDistance={130}
        hoverEffect="repel"
        hoverRadius={150}
        speed={0.05}
        opacity={0.4}
        glow={0}
        pixelRatio={1}
        clickBurst={false}
        disableRotation
      />
      <div className="container-x relative">
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
