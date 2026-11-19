# Peptomoon SEO, GEO and AEO reference

The working record of the organic-search project started on 19 November 2026 from the brief in `docs/strategy/peptomoon-audit-prompt.txt`. It builds on the first audit in `docs/strategy/06-seo-audit-2026-11-18.md`, which this folder supersedes where they differ.

**Ground rules held throughout:** free tools only; no invented metrics, rankings or search volumes; no fabricated people, credentials, testimonials or approvals; no claim that something was implemented unless it was implemented and validated; no confusing a partner store's Search Console data with Peptomoon's own.

## The two facts to know first

1. **There is no search data for Peptomoon.** Search Console is not verified (no TXT record) and the connector would not connect, so indexing, impressions, rankings and clicks are unknown. Doc 13 says exactly what access is needed. Until then, anything about ranking potential is a hypothesis.
2. **This pass is in the working tree and not yet deployed.** Doc 15 lists every change, doc 16 the validation. Nothing is committed; you commit and push.

## Documents

| # | Document | What it holds |
|---|---|---|
| 01 | [Project and business context](01-project-and-business-context.md) | Stack, routes, templates, positioning verdict, service tiers |
| 02 | [Official SEO research](02-official-seo-research.md) | What Google, Bing, OpenAI and Perplexity document, evidence classes, free-tool register |
| 03 | [Complete URL inventory](03-complete-url-inventory.md) | All 38 live URLs with title, description, H1, keyword, canonical, link status, action |
| 04 | [Technical SEO audit](04-technical-seo-audit.md) | Crawl, rendering, metadata, performance baseline, structured data, issues T-01 to T-13 |
| 05 | [Content and on-page audit](05-content-and-onpage-audit.md) | On-page results, US/UK spelling, brand voice, terminology and writing guideline, resources audit |
| 06 | [Keyword research](06-keyword-research.md) | Free-source demand evidence, keyword-to-URL map, geography decision |
| 07 | [Competitor analysis](07-competitor-analysis.md) | Direct and indirect competitors, Domain Ratings, gaps and opportunities |
| 08 | [Service pages, homepage and case studies](08-service-page-audit.md) | 15 service audits, homepage, portfolio, verified Search Console figures and their attribution |
| 09 | [Internal linking map](09-internal-linking-map.md) | Current graph, rules, link-by-link plan with anchors |
| 10 | [GEO and AEO audit](10-geo-aeo-audit.md) | AI-answer tests, entity, accuracy of Peptomoon's own AI claims |
| 11 | [Content gap analysis](11-content-gap-analysis.md) | Gaps, briefs G-01 to G-06, editorial standard |
| 12 | [Off-page and authority](12-offpage-and-authority.md) | Evidence, legitimate tactics, what not to do |
| 13 | [Search performance baseline](13-search-performance-baseline.md) | Access status, the seven stages, first data pull checklist |
| 14 | [Prioritised action plan and tracker](14-prioritized-action-plan.md) | The live issue tracker with priority and status |
| 15 | [Implementation log](15-implementation-log.md) | Every change made, why, files, what was deliberately left alone |
| 16 | [Validation report](16-validation-report.md) | Checks run, before and after, what could not be verified |
| 17 | [Growth roadmap](17-organic-growth-roadmap.md) | 7-day, 30-day, 90-day and 6-month plan with KPIs |
| 18 | [Measurement and conversion](18-measurement-and-conversion.md) | Tracking gaps, conversion journey, free dashboard, KPIs |
| 19 | [Trust, E-E-A-T and compliance](19-trust-eeat-and-compliance.md) | Trust signals, owner decisions, editorial framework, RUO scan |

## Owner decisions waiting (all in doc 14)

Search Console verification (T-01); Bing confirmation (T-02); named accountability or entity-led trust (E-01); telehealth positioning (POS-02, K-03); reconstitution calculators (K-02, counsel); case-study evidence (C-09); supplier-independence disclosure (K-06); GA4 key event and AI channel group (M-01, M-06); partner-store links and a directory profile (O-01).

## Keeping it alive

- Update the Status column in doc 14 when a change ships; log the change in doc 15.
- Refresh docs 03 and 16 with `node scripts/seo-crawl.mjs https://peptomoon.com scratch/live.json` (Node only, no install).
- Change `PAGE_UPDATED` in `src/lib/routes.ts` whenever a page changes in substance.
- When Search Console exists, replace the demand proxies in doc 06 with real impressions and re-score doc 14.
- Re-run the keyword and SERP research quarterly; it takes a few hours with free sources.
