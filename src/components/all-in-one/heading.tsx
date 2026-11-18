import type { ReactNode } from "react";
import { ScrambleText } from "@/components/motion/scramble-text";
import { SplitHeading } from "@/components/motion/split-heading";
import { Reveal } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/** The opening of an /all-in-one section: an optional small label, a large sentence-case headline and a lead. */
export function AioHead({
  id,
  label,
  title,
  lead,
  dark = false,
  className,
}: {
  id: string;
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-[64rem]", className)}>
      {label && (
        <Reveal>
          <p className={cn("label", dark ? "text-sky" : "text-blue")}>
            <ScrambleText text={label} />
          </p>
        </Reveal>
      )}
      <SplitHeading id={id} className="display-sentence mt-4 text-[clamp(2.1rem,0.9rem+3.6vw,4.25rem)]">
        {title}
      </SplitHeading>
      {lead && (
        <Reveal delay={1}>
          <p className={cn("mt-6 max-w-[62ch] text-[1.125rem] leading-relaxed", dark ? "text-white/75" : "text-ink-soft")}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
