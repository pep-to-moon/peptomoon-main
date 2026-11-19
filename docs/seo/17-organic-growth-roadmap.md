# 17. 90-day and 6-month organic growth roadmap

Prepared 19 November 2026 (Thursday). All tools are free. Rules: no deploys on Fridays or on 26 and 27 November; at most one redirect batch a week (none are planned); at most one new guide a fortnight until Search Console shows what earns impressions. Targets are goals to reset after the first 28 days of real data, not predictions.

Tools: Search Console (SC), Bing Webmaster Tools (BWT), GA4, Clarity, Looker Studio, Ahrefs Webmaster Tools (AWT), Google Trends, autocomplete, the project crawl script (`scripts/seo-crawl.mjs`), Playwright lab test, manual AI prompt log.

## First 7 days (19 to 26 November): fix what blocks measurement and visibility

| Task | Priority | Expected output | Depends on | Tools | KPI |
|---|---|---|---|---|---|
| Verify the domain in Search Console (DNS TXT), submit the sitemap (T-01) | P0 | Verified property, sitemap read | DNS access | SC | Property verified; sitemap status "Success" |
| Confirm Bing verification, submit the sitemap, run Site Scan (T-02) | P1 | Bing data flowing | T-01 | BWT | Sitemap read; 0 critical Site Scan errors |
| Review and commit this pass; fetch and merge `origin/main`; deploy Tuesday 24 November (not 26 or 27) | P1 | Changes live | Your review | git, Vercel | Build green; crawl shows 39 URLs |
| Inspect and request indexing for the 8 priority URLs | P1 | First indexing requests | T-01 | SC | URLs "Indexed" or an explicit reason |
| Mark `generate_lead` a key event; add a GA4 AI-referral channel group (M-01, M-06) | P2 | Conversions visible | GA4 access | GA4 | Key event visible in reports |
| Decide E-01 (named accountability), POS-02 (telehealth), K-02 (reconstitution calculators) | P1 | Decisions recorded in doc 14 | You and counsel | n/a | Three decisions logged |
| Capture the first data baseline in doc 13 | P1 | Dated baseline table | T-01 | SC, BWT, GA4 | Baseline recorded |

## First 30 days (to 19 December): foundation and measurement

| Task | Priority | Expected output | Depends on | Tools | KPI |
|---|---|---|---|---|---|
| Resolve every "not indexed" reason for the 39 URLs | P1 | Coverage fixed or explained | T-01, SC data | SC | Indexed commercial pages: all Tier 1 and 2 pages |
| Build the Looker Studio report (doc 18) and link SC to GA4 (M-07, M-08) | P2 | One dashboard | Accounts | Looker Studio | Report live, weekly use |
| Ask the six partner stores for a credit or case-study link; create a directory profile if reviews exist (O-01) | P1 | First genuine links | Owner outreach | AWT, BWT | Referring domains above 0 |
| Run the case-study questionnaire with the three featured owners (C-09) | P1 | Challenges and outcomes with evidence | Owners | n/a | 3 case studies with outcome data |
| Add primary sources to the three guides without any (E-02) and to Tier 1 services | P1 | Sourced pages | Reading time | Browser | Sources on every guide |
| Counsel route for G-01 and G-02 agreed; draft G-01 | P2 | Brief approved | Counsel | n/a | Draft ready |
| Collect the first Core Web Vitals field data; check homepage LCP (T-13) | P2 | Field verdict | Traffic | SC | LCP at or under 2.5 s, INP under 200 ms at the 75th percentile |
| Manual AI prompt log, month 1 (10 questions across ChatGPT, Perplexity, Google AI Mode, Copilot) | P2 | Baseline of AI representation | None | Manual | Appearance count; accuracy notes |
| Verify Vercel firewall allows OAI-SearchBot and PerplexityBot (T-11) | P3 | Confirmed | Vercel access | Vercel | Confirmed |

## Days 31 to 60 (20 December to 18 January): content clusters and proof

| Task | Priority | Expected output | Depends on | Tools | KPI |
|---|---|---|---|---|---|
| Publish G-01 and G-02 if counsel and disclosure decisions are done (one a fortnight) | P2 | Two guides with sources | Counsel, owner | `pnpm check:content` | Both indexed within 14 days |
| Add the processor scorecard and cold-chain sections (G-03, G-04) | P3 | Richer existing pages | Research | n/a | Pages updated, `updated` and `lastmod` accurate |
| Query-led rewrites: pages ranking 4 to 20, and pages with impressions but low CTR | P1 | Titles and intros rewritten from real queries | 28+ days of data | SC | CTR per position band up |
| Cannibalisation check on the wholesale pair and the three payments URLs | P2 | Decision per pair | Data | SC | One URL per query |
| Add the case-study outcomes and the improved Search reach presentation | P2 | Stronger proof | C-09 | n/a | Case-study engagement in GA4 |
| Complete AI prompt log month 2 | P3 | Trend | None | Manual | Appearances |
| Add `quiz_start`, step and `cta_click` events with agreed names (M-02, M-03) | P2 | Funnel visibility | Owner | GA4 | Form start to submit rate |

## Days 61 to 90 (19 January to 18 February): refine and strengthen authority

| Task | Priority | Expected output | Depends on | Tools | KPI |
|---|---|---|---|---|---|
| Refine Tier 1 pages from Search Console queries; stop targeting phrases with no impressions | P1 | Evidence-led edits | Data | SC | Non-branded impressions up |
| Expert collaboration: counsel review credit on regulatory guides (doc 12 tactic 5) | P3 | One credited review | Counsel | n/a | Review published |
| A citable resource: supplier-documentation scorecard and anonymised partner data with permission | P3 | One downloadable asset | Owners | Sheets | Citations or links to it |
| Repeat the Rich Results Test and crawl; refresh docs 03 and 16 | P2 | Updated inventory and validation | None | Crawl script | No new errors |
| Review whether UK, Australia or Canada impressions justify jurisdiction sections | P3 | Decision | Country data | SC | Share of non-US impressions |

**Day-90 targets (goals):** all Tier 1 and Tier 2 pages indexed; brand query ranks first; at least 50 distinct queries with impressions and 5 in the top 20; first appearance in the AI prompt log; at least 5 genuine referring domains; case studies with outcomes; 6 or more guides carrying primary sources.

## Months 4 to 6 (to mid-August 2027): sustainable authority

| Task | Priority | Expected output | Tools | KPI |
|---|---|---|---|---|
| Expand the clusters that proved themselves in Search Console; add one guide a fortnight only where impressions justify it | P2 | Topical depth | SC, autocomplete | Qualified enquiries from organic |
| Quarterly review of payments and regulatory content with counsel; update dates only on real change | P2 | Fresh, accurate guides | Counsel | No outdated regulatory statement |
| Build genuine recognition: industry commentary, partner mentions, directory reviews | P3 | External mentions | Manual | Referring domains, branded search |
| Re-score this audit and re-run the keyword research with real Search Console data | P2 | Updated docs 06, 14 | SC | Score trend |
| Evaluate adding original research from several stores' anonymised data | P3 | A citable dataset | Owners' permission | Citations |

## KPIs by phase

Primary: non-branded impressions; rankings for the keyword map; organic clicks; qualified organic enquiries; organic conversion rate. Secondary: indexed commercial pages; CTR by position band; query coverage; landing-page engagement; branded search; AI visibility; AI-referral sessions. No vanity metrics as targets.
