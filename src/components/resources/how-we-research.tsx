import Link from "next/link";
import type { Article } from "@/content/types";
import { formatDate } from "@/lib/utils";

/**
 * A short, factual note under each guide on how it was researched. Every figure comes from the article's own data, so it
 * cannot drift from the page. The full standard lives on the editorial policy page.
 */
export function HowWeResearch({ article }: { article: Article }) {
  const checked = article.sources.map((s) => s.checked).sort();
  const latest = checked[checked.length - 1];
  const count = article.sources.length;

  return (
    <aside aria-labelledby="how-we-research" className="mt-14 rounded-[1.25rem] bg-sky-soft p-6 sm:p-8">
      <h2 id="how-we-research" className="label scroll-mt-28 text-blue-deep">
        How we researched this guide
      </h2>
      <ul className="mt-4 list-disc space-y-2.5 pl-6 text-[1rem] leading-snug marker:text-ink-soft">
        {count > 0 && (
          <li>
            It draws on {count} {count === 1 ? "source" : "sources"}, listed below. The most recent was checked on{" "}
            <time dateTime={latest}>{formatDate(latest)}</time>.
          </li>
        )}
        {count > 0 ? (
          <li>Statements about rules, platforms and regulation cite a source and the date we checked it. If we cannot verify one, we leave it out.</li>
        ) : (
          <li>
            This is practical guidance drawn from how we build and run these sites. It lists no outside sources, so check any rule or policy it
            mentions against the primary source.
          </li>
        )}
        <li>It contains no dosing, usage or outcome content, and no advice on getting around a processor, platform or regulator.</li>
        <li>
          Last updated <time dateTime={article.updated}>{formatDate(article.updated)}</time>. We change the date only when the content changes.
        </li>
      </ul>
      <p className="mt-5 text-[0.95rem]">
        <Link href="/editorial-policy#how-we-verify-claims" className="text-blue underline underline-offset-4">
          How we verify claims
        </Link>
        {" · "}
        <Link href="/editorial-policy#corrections" className="text-blue underline underline-offset-4">
          Report a correction
        </Link>
      </p>
    </aside>
  );
}
