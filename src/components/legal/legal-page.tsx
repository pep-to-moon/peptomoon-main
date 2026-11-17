import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { type LegalDoc } from "@/content/legal";
import { webPageSchema } from "@/lib/seo/schema";
import { formatDate } from "@/lib/utils";
import { ConsentReset } from "./consent-reset";

/** Anchor for a section heading, so other pages can link straight to it, for example /editorial-policy#corrections. */
const sectionId = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const path = `/${doc.slug}`;
  return (
    <>
      <JsonLd data={webPageSchema("WebPage", doc.title, doc.description, path)} />
      <section aria-labelledby="legal-title" className="pb-[clamp(4rem,9vw,8rem)] pt-[clamp(6.25rem,8.5vw,7.75rem)]">
        <div className="container-x">
          <Breadcrumbs items={[{ name: doc.title, path }]} />
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <h1 id="legal-title" className="display display-lg">
                  {doc.title}
                </h1>
                <p className="label mt-6 text-ink-soft">
                  Last updated <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
                </p>
              </div>
            </div>
            <div className="min-w-0 lg:col-span-8">
              <div className="prose-article">
                <p className="text-[1.1875rem]">{doc.intro}</p>
                {doc.sections.map((s) => (
                  <section key={s.heading} id={sectionId(s.heading)} className="mt-10 scroll-mt-28 border-t border-line pt-8">
                    <h2 className="heading-sm">{s.heading}</h2>
                    {s.paragraphs?.map((p) => (
                      <p key={p} className="mt-4">
                        {p}
                      </p>
                    ))}
                    {s.table && (
                      <div className="mt-6 overflow-x-auto" tabIndex={0} role="region" aria-label={s.table.caption}>
                        <table className="w-full min-w-[34rem] border-collapse text-left text-[0.95rem] leading-snug">
                          <caption className="sr-only">{s.table.caption}</caption>
                          <thead>
                            <tr className="border-y border-ink/25">
                              {s.table.head.map((h) => (
                                <th key={h} scope="col" className="label px-3 py-3 first:pl-0">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {s.table.rows.map((row) => (
                              <tr key={row[0]} className="border-b border-ink/15 align-top">
                                {row.map((cell, i) => (
                                  <td key={cell} className={i === 0 ? "py-3 pl-0 pr-3 font-semibold" : "px-3 py-3 text-ink-soft"}>
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {s.list && (
                      <ul className="mt-4 list-disc space-y-2.5 pl-6 marker:text-ink-soft">
                        {s.list.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
                {doc.slug === "cookie-policy" && (
                  <div className="mt-10">
                    <ConsentReset />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
