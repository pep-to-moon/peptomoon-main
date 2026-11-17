import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { cn } from "@/lib/utils";

/**
 * Opening block for every inner page. Leaves room for the floating header, then a breadcrumb pill, a large display
 * headline and a lead paragraph with its actions beside it, the same rhythm as the homepage hero.
 */
export function PageHero({
  id,
  crumbs,
  chip,
  title,
  lead,
  actions,
  className,
  titleClassName,
  children,
  crumbSchema = true,
}: {
  id: string;
  crumbs: { name: string; path: string }[];
  chip?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
  /** False when the page emits its own BreadcrumbList. */
  crumbSchema?: boolean;
}) {
  return (
    <section aria-labelledby={id} className={cn("pb-[clamp(2.5rem,6vw,5rem)] pt-[clamp(6.25rem,8.5vw,7.75rem)]", className)}>
      <div className="container-x">
        <div className="flex flex-wrap items-center gap-3">
          <Breadcrumbs items={crumbs} schema={crumbSchema} />
          {chip}
        </div>
        <h1 id={id} className={cn("display display-xl mt-6 max-w-[20ch]", titleClassName)}>
          {title}
        </h1>
        {(lead || actions) && (
          <div className="mt-7 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            {lead && <div className="max-w-[60ch] text-[1.125rem] leading-relaxed text-ink/80">{lead}</div>}
            {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
