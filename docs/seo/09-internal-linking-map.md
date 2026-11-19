# 09. Internal linking map and plan

Measured 19 November 2026 from the live crawl. "Body links" are links inside `<main>` excluding `<nav>` blocks (so breadcrumbs, the table of contents and the header and footer menus are not counted). Source: `edges.json` produced by the crawl script; summary below.

## 1. Current structure

```
Home
 ├─ Services hub ── 15 service pages ── "Read next" guides, "Partner-built sites" case studies, related services
 ├─ Case studies hub ── 3 case studies (each links to its services)
 ├─ Resources hub ── 6 guides (each links to its service; guides link to each other)
 ├─ All-in-one, Why Peptomoon, Glossary, About, Contact, 5 legal pages  (header/footer only)
```

Maximum click depth is 2. No orphan pages. No broken internal links. Hierarchy is clear and flat.

## 2. What the graph shows

| Finding | Evidence | Verdict |
|---|---|---|
| Service ↔ guide links are bidirectional | Every guide links to its service and the service links back; the pillar guide links to 10 services | Good: keep |
| **`/why-peptomoon` has 0 body links** | Only in the footer | Add from home and About (L-01) |
| **`/glossary` has 0 body links** | 22 anchored definitions, no guide or service links any term | Wasted: the definitions are the most citable entity content on the site (L-01) |
| `/resources` has 1 body link; `/case-studies` 3; `/about` 2 | Hubs are reached through the header | Add "All guides" and "All case studies" links from the service template (L-02) |
| Weakest destinations: telehealth service 3, wholesale guide 3, vial label 4 | Few service pages mention them | Add contextual mentions where genuinely relevant (L-01) |
| Service copy cannot carry inline links | `service-page.tsx` renders `what`, `why`, `problems`, `approach` as plain text; only guides use `Inline` | Template change (L-02) |
| Anchor text | Navigation anchors dominate counts (e.g. "Business dashboards and operations" appears on 82 pages via the mega menu): expected. Contextual anchors are descriptive, but "all-in-one peptide business infrastructure" repeats exactly 14 times (one template sentence) and "Tell us what you need" 9 times to `/contact` | Acceptable; low priority (L-03) |
| Irrelevant links | None found | |
| Excessive links | Homepage has about 150 internal links, almost all menu | Not a problem |

Contextual flow by page type (counts of body links): service→service 54, service→page 30, service→guide 20, guide→guide 16, home→service 15, guide→service 15, service→case 10, case→service 7, hub→service 15.

## 3. Rules for new links

1. Link where the reader would want the next step, using the destination's real name or a descriptive phrase. No keyword-stuffed anchors, no sitewide footer link blocks added for SEO.
2. One link per destination per page unless a second sits in a clearly different context.
3. Informational pages link to the commercial page that solves the problem, and commercial pages link to the one guide that explains the decision. Do not link every guide from every service.
4. Link the **first mention** of a glossary term in a guide, not every mention.
5. Never add a link to a hidden (unpublished) guide. The renderer already degrades those to plain text.

## 4. Template-level changes (implemented, see doc 15)

| ID | Change | Where | Effect |
|---|---|---|---|
| L-02a | Service copy renders inline `[label](/path)` links through the existing `Inline` component | `components/services/service-page.tsx` | Services can carry contextual links; FAQ text is left plain so FAQPage markup stays exact |
| L-02b | "Read next" block gains an "All guides" link; "Partner-built sites" gains "All case studies" | same | Gives the hubs body links from all 15 services |
| L-01a | Guides link the first mention of 12 glossary terms to `/glossary#term` | `components/resources/rich-text.tsx` | Glossary receives contextual links from every guide; definitions become reachable from the context that needs them |

Glossary term mapping used by the auto-linker (first mention only, case-insensitive, never inside an existing link):

| Text matched | Destination |
|---|---|
| certificate of analysis, COA | `/glossary#certificate-of-analysis` |
| HPLC | `/glossary#hplc` |
| mass spectrometry | `/glossary#mass-spectrometry` |
| rolling reserve | `/glossary#rolling-reserve` |
| chargeback ratio | `/glossary#chargeback-ratio` |
| MATCH list | `/glossary#match-list` |
| underwriting | `/glossary#underwriting` |
| high-risk merchant account | `/glossary#high-risk-merchant-account` |
| 3PL | `/glossary#threepl` |
| dropshipping | `/glossary#dropshipping` |
| batch number, lot number | `/glossary#batch-number` |
| ISO/IEC 17025 | `/glossary#iso-17025` |

## 5. Link-by-link plan

Priority: P1 do now, P2 soon, P3 when convenient. Status as of this document.

| # | Source | Destination | Exact anchor text | Placement | Reason | Priority | Status |
|---|---|---|---|---|---|---|---|
| 1 | `/` | `/why-peptomoon` | See why RUO brands choose Peptomoon | Under the "One accountable team instead of five vendors" heading (why-us section) | Page has 0 body links; the section already makes the argument | P1 | Implemented |
| 2 | `/about` | `/why-peptomoon` | why RUO brands choose Peptomoon | In the "why one partner" paragraph | Same | P1 | Implemented |
| 3 | `/about` | `/glossary` | glossary of RUO terms | In the principles or limits paragraph | Glossary has 0 body links; About is where visitors check credibility | P2 | Implemented |
| 4 | `/about` | `/editorial-policy` | editorial policy | Where the page describes how content is written | Surfaces the trust page from the trust page | P2 | Implemented if not already present |
| 5 | `/services/fulfillment-logistics` | `/resources/wholesale-vs-dropshipping-vs-3pl-for-ruo-brands` | how to choose between wholesale, dropshipping and 3PL | After the "Choose the model" step text | The guide is the weakest-linked asset (3 body links) and answers exactly this decision | P1 | Implemented |
| 6 | `/services/payment-processing` | `/resources/payment-processor-shut-down-account` | what to do in the first 72 hours | Appended to the paragraph that starts "If your payment processor has shut down your account" | Highest-intent informational page; link at the moment of need | P1 | Implemented |
| 7 | `/services/payment-processing` | `/resources/payment-processing-for-ruo-stores` | how underwriting works for RUO stores | In the paragraph on conventional providers restricting the category | Connects service to the underwriting guide in context | P2 | Implemented |
| 8 | `/services/seo-geo-aeo` | `/glossary#geo`, `/glossary#aeo` | GEO, AEO | First mention in the opening paragraph | Entity definitions; the page defines both terms in-line | P2 | Implemented |
| 9 | `/services/wholesale-dropshipping-3pl` | `/services/fulfillment-logistics` | fulfillment coordination | In the opening paragraph, where it describes US fulfillment | Resolves the one intent overlap by naming each page's role | P2 | Implemented |
| 10 | `/resources` | `/glossary` | glossary of RUO terms | Under the hub intro | Glossary discoverability from the guides hub | P2 | Implemented |
| 11 | `/services/*` (all 15) | `/resources`, `/case-studies` | All guides, All case studies | Heading blocks "Read next", "Partner-built sites" | Hubs get body links from every service | P2 | Implemented (template) |
| 12 | Every guide | `/glossary#...` | per mapping above | First mention | Glossary links (L-01a) | P2 | Implemented (template) |
| 13 | `/services/ruo-peptide-website-development` | `/services/vial-label-design` | vial label design | One sentence after the batch documents paragraph | Weak destination (4 body links) and a natural pairing | P3 | Not implemented: needs owner wording |
| 14 | `/resources/review-a-peptide-suppliers-documentation` | `/services/vial-label-design` | label design | Where it discusses vial labels matching batch records | Relevant mention if present | P3 | Not implemented |
| 15 | `/services/telehealth-platform-development` | inbound | n/a | No relevant service text mentions telehealth, so none added | Do not force links to a Tier 3 page | n/a | Decision: leave at 3 |
| 16 | New guides (doc 11) | their service pages and the pillar guide | per brief | at publication | Every new guide ships with its three links in and out | P1 | Pending guides |

## 6. Measurement

After deployment re-run the crawl and check: `/why-peptomoon` and `/glossary` body links above 0; `/resources` and `/case-studies` above 10; the wholesale guide above 6. In Search Console (Links report) confirm the same internal-link ranking.
