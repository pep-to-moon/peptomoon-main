import { ButtonLink } from "@/components/ui/button";
import { portfolio } from "@/content/portfolio";
import { PortfolioPin } from "./portfolio-pin";

export function PortfolioShowcase() {
  return (
    <section id="work" aria-labelledby="portfolio-title" className="py-[clamp(4.5rem,9vw,8rem)]">
      <PortfolioPin items={portfolio} />
      <div className="container-x mt-10 flex flex-wrap items-center justify-between gap-6">
        <p className="max-w-[60ch] text-[0.85rem] text-ink-soft">
          Screenshots captured 17 November 2026. Counts reflect each site&apos;s sitemap on that date.
        </p>
        <ButtonLink href="/case-studies" variant="dark">
          All case studies
        </ButtonLink>
      </div>
    </section>
  );
}
