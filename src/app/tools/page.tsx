import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { BudgetTool, ChecklistTool, ScorecardTool } from "@/components/tools/founder-tools";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/schema";
import { formatDate } from "@/lib/utils";

const brand = siteConfig.name;
const title = `Free Peptide Business Tools | ${brand}`;
const description = "Three free tools for founders: a startup budget worksheet, a supplier scorecard and a launch checklist. They run in your browser and store nothing.";
const published = "2026-11-19";
const updated = "2026-11-19";

export const metadata: Metadata = buildMetadata({ title, description, path: "/tools", type: "article", publishedTime: published, modifiedTime: updated });

const tools = [
  {
    id: "budget",
    title: "Startup budget worksheet",
    text: "Ten cost areas, one total. You enter your own figures, so the result reflects your quotes and plans and not our guess. Our guide explains what sits behind each line.",
    guide: { href: "/resources/cost-to-start-a-peptide-business", label: "Read: what it costs to start" },
    Tool: BudgetTool,
  },
  {
    id: "scorecard",
    title: "Supplier scorecard",
    text: "Score up to three suppliers against the same six lines after you have seen their documents. Write your standard first, then let the table show where each one falls short.",
    guide: { href: "/resources/how-to-find-a-peptide-supplier", label: "Read: how to find a supplier" },
    Tool: ScorecardTool,
  },
  {
    id: "checklist",
    title: "Launch checklist",
    text: "Eighteen things to have covered before you apply for payments or send traffic. Tick them off as you go.",
    guide: { href: "/start-a-peptide-business", label: "Read: the nine-step start guide" },
    Tool: ChecklistTool,
  },
] as const;

export default function ToolsPage() {
  return (
    <>
      <JsonLd data={articleSchema({ headline: "Free peptide business tools", description, path: "/tools", published, updated, section: "Tools" })} />
      <PageHero
        id="tools-title"
        crumbs={[{ name: "Tools", path: "/tools" }]}
        title={<>Free tools for founders.</>}
        lead={
          <p>
            A budget worksheet, a supplier scorecard and a launch checklist. They run in your browser, store nothing and contain no benchmarks or prices,
            so they only ever show your own numbers and notes. They are planning aids, not legal advice.
          </p>
        }
        actions={
          <ButtonLink href="/contact" size="lg">
            Talk to the team
          </ButtonLink>
        }
      >
        <p className="label mt-8 text-ink-soft">
          By the {brand} team. Updated <time dateTime={updated}>{formatDate(updated)}</time>.
        </p>
      </PageHero>

      {tools.map(({ id, title: t, text, guide, Tool }, i) => (
        <Section key={id} tone={i % 2 ? "sky" : undefined} labelledBy={`tool-${id}`}>
          <div className="container-x">
            <Reveal className="border-t border-ink/20 pt-4">
              <h2 id={`tool-${id}`} className="display display-md max-w-[24ch]">
                {t}
              </h2>
              <p className="mt-4 max-w-[58ch] text-ink-soft">{text}</p>
              <p className="mt-3">
                <Link href={guide.href} className="text-blue underline underline-offset-4">
                  {guide.label}
                </Link>
              </p>
            </Reveal>
            <div className="mt-10">
              <Tool />
            </div>
          </div>
        </Section>
      ))}
    </>
  );
}
