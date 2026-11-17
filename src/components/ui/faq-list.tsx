import { Plus } from "lucide-react";
import type { Faq } from "@/content/types";

/** Native details elements: accessible, no JavaScript. Deliberately no FAQPage markup (Google removed FAQ rich results). */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="border-b border-ink/20">
      {items.map((f) => (
        <details key={f.q} className="group border-t border-ink/20">
          <summary className="flex min-h-[4.5rem] cursor-pointer items-center justify-between gap-6 py-4 font-display text-[1.15rem] font-bold leading-snug transition-colors group-hover:text-blue">
            <span>{f.q}</span>
            <Plus aria-hidden className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="max-w-[68ch] pb-7 text-ink-soft">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
