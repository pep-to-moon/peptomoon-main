# 13. Search performance baseline and data access

Prepared 19 November 2026. This is the most important gap in the whole project: **there is no search performance data for Peptomoon**, and I will not invent any.

## 1. Access status

| Source | Accessible? | Detail | What is needed |
|---|---|---|---|
| Google Search Console | **No** | The Search Console connector failed to connect (connection refused on three attempts). Independently, the domain looks unverified: DNS has only an SPF TXT record and no page carries a verification meta tag | Create a **Domain** property for `peptomoon.com`, add the TXT record at the DNS host, submit `https://peptomoon.com/sitemap.xml`. For me to read it, either fix the connector (re-run it, or reconnect through /mcp) or export the Performance report (queries, pages, countries, devices) and Indexing report as CSV into `data/gsc/peptomoon/` |
| Bing Webmaster Tools | Unknown | `BingSiteAuth.xml` is live, so verification was attempted; no tool access from here | Confirm the site shows as verified, submit the sitemap, then export Performance and the AI Performance report |
| Google Analytics 4 | Installed, not readable | Loads on all 38 pages (verified). One conversion event exists | Add the analyst as Viewer, or export Reports to CSV: Landing page by organic source, and the key-event report |
| Microsoft Clarity | Installed, not readable | Loads on all 38 pages | Share the project or export insights |
| Vercel analytics and firewall | Not accessed | Needs team access approval for the connector | Approve the connector; check firewall rules for OAI-SearchBot and PerplexityBot |
| AI platforms | Manual only | No API access | Monthly prompt log (doc 10) |

## 2. The seven stages: what is known

| Stage | Status | Evidence |
|---|---|---|
| 1. Technically crawlable | **Yes** | Robots, sitemap, 200s, static HTML (doc 04) |
| 2. Eligible for indexing | **Yes** | No noindex, self canonicals, snippets allowed |
| 3. Actually indexed | **Unknown** | No Search Console. A proxy search found nothing. Being in the sitemap proves nothing |
| 4. Receiving impressions | Unknown | |
| 5. Ranking competitively | Unknown | |
| 6. Receiving organic clicks | Unknown | GA4 installed since the 18 November deploy; no data read |
| 7. Generating qualified enquiries | Unknown | One conversion event, `generate_lead`, instrumented; confirm it is marked a key event |

## 3. Baseline captured so far (non-search)

| Metric | Value | Date and method |
|---|---|---|
| Domain Rating | 0.0 | 19 Nov 2026, Ahrefs free endpoint |
| Sitemap URLs | 38 | Live crawl |
| Indexable pages with unique titles, descriptions and H1 | 38 of 38 | Live crawl |
| Lab LCP on 7 templates | 1.64 to 2.21 s | Doc 04 |
| Lab CLS | 0 to 0.024 | Doc 04 |
| Body links to `/why-peptomoon`, `/glossary` | 0, 0 | Doc 09 |
| Guides with sources | 3 of 6 | Doc 05 |
| Partner-store Search Console (not Peptomoon) | 15,096 clicks, 643,123 impressions, CTR 2.35%, position 9.03, 92 days | Re-derived from the raw export; **never present this as Peptomoon's performance** |

## 4. First data pull checklist (do within 7 days of verification)

1. Search Console: Pages (Indexing) report: how many of 38 are indexed, and the reason for each that is not; Performance for the last 28 days by query and page; Sitemaps report status.
2. URL Inspection (live test) on: `/`, `/services`, `/services/payment-processing`, `/services/ruo-peptide-website-development`, `/resources/payment-processor-shut-down-account`, `/all-in-one`, `/case-studies`, `/about`. Check "View crawled page" shows full content and that the screenshot is not blank.
3. Request indexing for those eight only.
4. Bing Webmaster Tools: Site Scan, URL Inspection on the same eight, sitemap status, AI Performance report.
5. GA4: confirm `generate_lead` is a key event; create the organic and AI-referral views (doc 18).
6. Record everything in `docs/seo/13` as a dated table beneath this one.

## 5. What to look for once data exists

| Question | How |
|---|---|
| Which pages have impressions but poor CTR? | Performance, pages, filter position 1 to 10, sort by impressions |
| Which queries rank 4 to 20? | Performance, queries, position filter; these are the first rewrite targets |
| Branded versus non-branded | Query filter: regex `peptomoon|pep to moon`; the rest is non-branded |
| Query-to-page mismatches and cannibalisation | Pages report: any query where two Peptomoon URLs appear; first suspects are the wholesale pair and the three payments URLs |
| Country and device | Compare with the partner-store split in doc 06 |
| Pages with no impressions after 60 days | Candidates for stronger links or a rewrite, not for deletion |
| AI features | Search Console Web performance (AI features are included) and Bing's AI Performance report |

Until this data exists, every statement about ranking potential in docs 06 and 07 is a hypothesis.
