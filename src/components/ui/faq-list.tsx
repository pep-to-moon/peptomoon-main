import { Plus } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import type { Faq } from "@/content/types";
import { faqPageSchema } from "@/lib/seo/schema";

/**
 * Native details elements: accessible, no JavaScript. Emits FAQPage markup built from the very items it renders, so the
 * structured data can never drift from what visitors read. Use one FaqList per page.
 */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <>
      <JsonLd data={faqPageSchema(items)} />
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
    </>
  );
}
