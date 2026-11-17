import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="label w-fit rounded-full bg-white px-4 py-2 text-ink-soft ring-1 ring-ink/10">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((item, i) => {
            const last = i === all.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-ink">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className="transition-colors hover:text-blue">
                    {item.name}
                  </Link>
                )}
                {!last && <ChevronRight aria-hidden className="size-3.5" />}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}
