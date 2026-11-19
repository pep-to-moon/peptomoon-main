# 14. Prioritised action plan and issue tracker

This is the living tracker. Update the Status column when a change ships and record the detail in doc 15. Prepared 19 November 2026; statuses updated after implementation on the same day.

**Priority:** P0 prevents crawling, indexing or basic visibility or blocks all measurement. P1 major technical, content, architecture, positioning or conversion problems. P2 topical authority, internal linking, service content, case studies, GEO and AEO. P3 long-term growth.
**Status:** Open, Planned (will be changed in this pass), Implemented (code or copy changed, see doc 15), Fixed (live and verified), Owner (needs a decision or account access from you), Blocked, Recommendation (documented, no change made by me).

## 1. Confirmed issues versus hypotheses

**Confirmed** (measured or read directly): Search Console not verified; keyword-free identical H2 skeleton; UK spelling on a US site; zero body links to `/why-peptomoon` and `/glossary`; partner-store figures attributed as "our stores"; three guides and twelve services without sources; unqualified 3% claim in a description; challenges and outcomes missing from all case studies; GEO claims that outrun the documentation; shared sitemap `lastmod`; no event tracking between landing and enquiry.

**Hypotheses that need data**: whether any page is indexed; INP on low-end phones; which Tier 1 phrases carry enough volume to matter; whether named accountability changes rankings; whether AI systems will cite the guides; whether the wholesale pair cannibalise; whether Core Web Vitals pass in the field.

## 2. Tracker

| ID | Description | Priority | Status | Affected pages | Evidence | Proposed fix | Dependencies |
|---|---|---|---|---|---|---|---|
| T-01 | Search Console not verified or connected | P0 | **Owner** | Domain | DNS TXT only SPF; no meta; connector refused | Domain property, TXT record, sitemap submit (doc 13) | DNS access |
| T-02 | Bing Webmaster verification and sitemap status unknown | P1 | Owner | Domain | `BingSiteAuth.xml` live, no access | Confirm, submit sitemap, run Site Scan | T-01 |
| C-01 | Same keyword-free 17-H2 skeleton on all 15 services | P1 | **Implemented** 19 Nov (doc 15) | 15 service pages | Crawl: identical H2 sets | Page-specific heading map in `src/content/service-headings.ts` | None |
| C-02 | US-targeted site uses UK spelling (`catalogue` 76, `organisation` 32, `programme` 17) including titles | P1 | **Implemented** 19 Nov (doc 15) | ~40 content files, 4 metadata strings | Counts doc 05; autocomplete "peptide catalog" 10 vs 1 | Convert in prose and metadata, never in identifiers, slugs or legal text | None |
| C-03 | Partner-store Search Console block attributed to "our stores" | P1 | **Implemented** 19 Nov (doc 15) | `/`, `/case-studies` | Doc 08 | Retitle and re-word the intro | None |
| C-04 | Content gaps: start a business, white label, cold chain, ad policy, AI visibility | P1 | **Partly implemented**: G-05 written 19 Nov; G-01 and G-02 blocked | New guides | Docs 06, 07, 11 | Write G-05 now; G-01 and G-02 after counsel and disclosure decisions | Counsel; owner |
| C-09 | Case studies have no challenges or outcomes | P1 | Owner | 3 case studies | Content statuses `needs-confirmation` | Owner questionnaire (doc 08) | Owner interviews |
| L-01 | `/why-peptomoon` and `/glossary` have 0 body links; low counts elsewhere | P1 | **Implemented** 19 Nov (doc 15) | `/`, `/about`, `/resources`, guides | Doc 09 | Contextual links per doc 09 | None |
| E-01 | No named accountable person or entity | P1 | **Owner** | Whole site | Doc 19 | Choose named or entity-led accountability | Owner facts |
| E-02 | 3 of 6 guides and 12 of 15 services cite no sources | P1 | Recommendation | Guides, services | Doc 05 | Add dated primary sources after reading each; new guide ships with 7 | Research time |
| K-01 | /all-in-one description states "from 3% with no rolling reserve" without qualifier | P1 | **Implemented** 19 Nov (doc 15) | `/all-in-one` | Live meta | Add "for qualifying merchants" | None |
| K-02 | Reconstitution calculators listed as a deliverable | P1 | **Owner** (counsel) | `/all-in-one` | 3 mentions | Counsel decides | Counsel |
| POS-01 | 15 equal-priority services for a DR 0 domain | P1 | Recommendation | Services, home | Doc 01 tiers | Tier 1 emphasis in links and content; no URL change | None |
| POS-02 | Telehealth joined to the RUO identity (title, home) | P1 | **Owner** | `/all-in-one`, telehealth page | Doc 01 | Keep or separate; not changed by me | Owner |
| O-01 | Domain Rating 0.0, no known inbound links | P1 | Owner (ongoing) | Domain | Doc 12 | Partner-store links, directory profile, own backlink reports | Owner outreach |
| T-03 | Sitemap `lastmod` one shared date; `priority` and `changefreq` ignored | P2 | **Implemented** 19 Nov (doc 15) | Sitemap | Doc 04 | Per-page real dates; drop ignored fields | None |
| T-04 | Possible INP risk from main-thread work | P2 | Open (hypothesis) | `/` and all pages | Lab long tasks 0.7 to 1.5 s | Read field data after traffic; act only if it fails | T-01, traffic |
| T-13 | Homepage LCP is variable in lab (2.2 s live, 4.0 s in one local run) because the largest paint is the intro strip; field effect unknown | P2 | Open (hypothesis) | `/` | Doc 16 performance table | Read field LCP for `/` in Search Console after traffic; if it fails, shorten the intro or let a text block paint first (owner design decision) | T-01, traffic |
| T-07 | `sameAs` empty; Article author is an Organization | P2 | Blocked | All | Schema | Real profiles and `Person` author | E-01 |
| C-05 | Wholesale guide and service titles nearly identical | P2 | **Implemented** 19 Nov (doc 15) | Guide and service | Titles | Retitle the guide to the question form | None |
| C-06 | Limits repeated 133 times, tone reads defensive | P2 | Recommendation | Site-wide copy | Doc 05 | Keep dedicated section; trim repeats during edits | Owner and counsel comfort |
| C-07 | GEO claims outrun documentation (ChatGPT via IndexNow; "earns citations") | P2 | **Implemented** 19 Nov (doc 15) | `/all-in-one` | Doc 10 | Reword to documented facts | None |
| C-11 | SEO service title leads with jargon, not the searched phrase | P2 | **Implemented** 19 Nov (doc 15) | `/services/seo-geo-aeo` | 'seo for peptide' 3 suggestions | Retitle | None |
| C-12 | "Our guide explains the difference" points to an unpublished guide | P2 | **Implemented** 19 Nov (doc 15) | `/services/compliance-support` | Live text | Reword | None |
| L-02 | Service copy cannot carry inline links; hubs get few body links | P2 | **Implemented** 19 Nov (doc 15) | Service template | Doc 09 | Use `Inline`; add "All guides", "All case studies" | None |
| M-01 | `generate_lead` not confirmed as a key event | P2 | Owner | GA4 | Doc 18 | Mark key event | GA4 access |
| M-02 | No form-step or abandonment events | P2 | Recommendation | Quiz | Doc 18 | Add with owner-approved names | Owner |
| M-03 | No CTA or case-study click events | P2 | Recommendation | Site-wide | Doc 18 | Add `cta_click`, `case_study_click` | Owner |
| M-05 to M-08 | UTM convention, AI channel group, GSC-GA4 link, Looker Studio report | P2 | Owner | Accounts | Doc 18 | Set up | Accounts |
| K-03 | RUO and telehealth in one title | P2 | Owner | `/all-in-one` | Doc 19 | See POS-02 | Owner |
| K-04 | HIPAA wording must match contracts | P2 | Owner | Telehealth page | Doc 19 | Confirm | Owner |
| K-06 | Supplier-independence disclosure | P2 | Owner | Supplier and wholesale pages | Doc 19 | One-line disclosure | Owner |
| C-14 | Unsourced rate and reserve ranges in the comparison table | P2 | Owner | `/all-in-one` | Doc 19 | Source or remove | Research |
| G-05 | Guide: search and AI visibility for RUO stores | P1 | **Implemented** 19 Nov | New `/resources/search-and-ai-visibility-for-ruo-peptide-stores` | Docs 10, 11 | Written from 11 primary sources, each read on 19 Nov | None |
| G-01 | Guide: how to start an RUO business | P2 | Blocked | New | Doc 11 | Write after counsel route agreed | Counsel |
| G-02 | Guide: white label and private label | P2 | Blocked | New | Doc 11 | Write after disclosure decision | Owner |
| T-05 | `http://www.` two-hop redirect | P3 | Owner | Host | Doc 04 | Vercel domain redirect | Vercel |
| T-06 | No IndexNow | P3 | Open | Domain | Doc 04 | Key file and deploy ping | T-02 |
| T-11 | CDN allowance for AI crawlers unverified | P3 | Owner | Vercel | Doc 10 | Check firewall rules | Vercel access |
| T-12 | Rich Results Test and Schema Validator not run | P3 | Owner | One URL per template | Doc 04 | Run and log | None |
| C-10 | Three descriptions are long (cosmetic; Google sets no limit) | P3 | **Implemented** 19 Nov (doc 15) | 3 pages | Doc 04 | Trim | None |
| IMG-01 | 26 image alts over 125 characters | P3 | Open | Photo-led pages | Doc 05 | Shorten | None |
| L-03 | Same anchor repeated 14 times | P3 | Open | 15 services | Doc 09 | Vary if edited | None |
| G-03 | Cold-chain coverage | P3 | Open | Fulfilment, wholesale guide | Doc 11 | Add sections; guide only if demand shows | Research |
| G-04 | Processor scorecard section | P3 | Open | Underwriting guide | Doc 11 | Add section | None |
| G-06 | Ad-platform policy explainer | P3 | Open | New | Doc 11 | Research then write | Research |
| G-08 | Original anonymised data | P3 | Open | New | Doc 11 | After more stores and permission | Owners |
| T-08 | `llms-full.txt` linked to a hidden guide | P2 | **Fixed** 18 Nov | `/llms-full.txt` | 3 dead links | Done and verified live | None |
| T-09 | `legalName` repeated the brand | P2 | **Fixed** 18 Nov | All | Schema | Done | None |
| T-10 | Late LCP on photo-led pages (4.0 to 4.8 s) | P1 | **Fixed** 18 Nov | 4 pages | Lab | Eager mode; live LCP 1.6 to 2.2 s | None |

## 3. Sequence

1. **Done in this pass (in the working tree, not yet committed or deployed):** C-01, C-02, C-03, C-05, C-07, C-10, C-11, C-12, K-01, L-01, L-02, T-03, G-05. Detail in doc 15, validation in doc 16.
2. **Owner, this week:** T-01 (Search Console), T-02 (Bing), M-01, E-01 decision, POS-02 decision, K-02 with counsel.
3. **After data exists:** T-04, cannibalisation checks, query-driven rewrites, G-03.
4. **Ongoing:** O-01, case-study evidence (C-09), sources (E-02).

Dependencies, free tools and KPIs per phase are in doc 17.
