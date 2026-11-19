# 18. Tracking, measurement and conversion

Reviewed 19 November 2026 from the code (`layout/analytics.tsx`, `lib/analytics.ts`, `quiz/quiz.tsx`, `services/service-page.tsx`) and the live site. Evidence tags as in doc 04. **Correction to my 18 November notes:** service call-to-action buttons already link to `/contact?service=<slug>`, which pre-selects the service in the form, so a visitor's originating service is carried into the enquiry. My earlier count of "15 generic `/contact` links" counted only literal hrefs.

## 1. What is installed

| Item | State |
|---|---|
| Google Search Console verification | **Not done** (doc 13). The site supports a verification meta tag through `NEXT_PUBLIC_GSC_VERIFICATION`, currently unset |
| GA4 | Loads on every page via `@next/third-parties` (confirmed on all 38 live pages). Page views and GA4's built-in enhanced measurement depend on the web-stream settings, not on the code |
| Microsoft Clarity | Loads on every page via an inline script (confirmed live). The form carries a masking attribute so typed details stay out of recordings |
| Google Tag Manager | Not used |
| Consent handling | No banner (an owner decision on 18 November; the policies were rewritten to match and flagged for counsel for EEA and UK visitors). Clarity limits itself for EEA, UK and Swiss visitors without a consent signal |
| Conversion event | `generate_lead` fires once on a successful enquiry with `form_name` and the selected service names (no personal data) |
| Other events | `contact_launcher_open`, `contact_launcher_option`, `contact_launcher_reminder` |
| Duplicate events | None found: one call site per event |
| Cross-domain tracking | Not needed (single domain; the contact form posts to the same origin) |

## 2. Gaps

| ID | Gap | Why it matters | Fix |
|---|---|---|---|
| M-01 | `generate_lead` is not confirmed as a **key event** in GA4 | Without it GA4 does not count conversions in acquisition reports | Mark it a key event in GA4 Admin (OWNER) |
| M-02 | No events between landing and submission: `quiz_start`, step completion, abandonment | Cannot see whether organic visitors begin and abandon the form | Add `quiz_start` and `quiz_step_complete` through the existing `trackEvent` helper |
| M-03 | No CTA or case-study click events | Cannot say which page, CTA or proof block drives enquiries | Add `cta_click` with a `location` label for hero, band and launcher CTAs, and `case_study_click`; GA4 enhanced measurement already records outbound clicks if enabled |
| M-04 | The lead event carries service names but not the page the visitor came from | Attribution to a landing page requires joining reports | GA4's landing-page dimension plus the `service` parameter covers it; add a `source_path` parameter if reports prove clumsy |
| M-05 | No documented UTM convention | Referral and campaign traffic will fragment | Use the convention in section 4 |
| M-06 | No AI-referral grouping | Visits from chatgpt.com, perplexity.ai, copilot.microsoft.com, gemini.google.com and claude.ai appear as generic referrals | Create a custom channel group in GA4 (OWNER) |
| M-07 | Search Console and GA4 are not linked | Landing-page conversions cannot be combined with query data | Link them in GA4 Admin once Search Console is verified (OWNER) |
| M-08 | No dashboard | Reporting depends on opening four tools | Build the free Looker Studio dashboard in section 5 (OWNER accounts) |
| M-09 | Intrusive prompt risk | A contact launcher opens by itself 10 seconds into a visit and again 90 seconds after closing | Not a Google "intrusive interstitial" (it is a small corner panel), but watch Clarity for dismissal and rage clicks and GA4 for engagement; remove the automatic reopening if it depresses engagement |

Items M-02 and M-03 are small code changes; they are listed in doc 14 and implemented only if the owner confirms the event names, because the event schema is the owner's reporting contract.

## 3. Conversion journey assessment

| Step | Observation |
|---|---|
| Search intent versus landing page | Service pages answer a commercial intent; guides answer informational intent and each ends with a service call to action |
| Messaging and clarity | Strong: each page states what it is, what is included and what it does not do |
| Calls to action | One primary CTA per service ("Start a project" style labels from `service.cta.label`), plus a contact band and a bottom-right launcher. Consistent |
| Form | Two steps. Required: at least one service, name, email and consent. Phone and details are optional. Low friction. Arithmetic spam check and honeypot instead of a CAPTCHA |
| Form accessibility | Step progress is announced (`aria-current="step"`), errors move focus, labels present (read from code; a screen-reader test was not run here) |
| Mobile usability | CLS near zero; the partner store's audience is 80.5 percent mobile, so the form must be tested on a real phone |
| Trust at the point of decision | The weakest part: no named person, no results, no entity (doc 19) |
| Proof placement | Case studies sit on service pages under "Partner-built sites", below the fold |

Recommendations (without sacrificing search relevance): (1) on Tier 1 service pages place the case-study proof closer to the first call to action; (2) add one line under the form saying what happens next and when, using only commitments Peptomoon will keep; (3) keep the service pre-selection (it works); (4) measure before changing the form.

## 4. UTM convention (free, consistent)

`utm_source` lowercase platform (`linkedin`, `newsletter`, `partner-<name>`), `utm_medium` (`social`, `email`, `referral`, `directory`), `utm_campaign` a short slug (`2026q4-payments-guide`). Never use UTMs on internal links. Never put personal data in a parameter.

## 5. Free reporting structure (Looker Studio)

Build one report with five pages and connect Search Console, GA4 and a Google Sheet.

| Page | Contents | Primary metric |
|---|---|---|
| Overview | Organic users, non-branded impressions, clicks, CTR, qualified enquiries, organic conversion rate | The five primary KPIs |
| Queries | Branded versus non-branded (regex on brand), positions 1 to 3, 4 to 10, 11 to 20, CTR per band | Non-branded impressions |
| Pages | Landing pages with impressions, clicks, key events; Tier 1 pages pinned | Tier 1 page performance |
| Indexing | Manual weekly entry: submitted, indexed, reasons not indexed (Sheet) | Indexed commercial pages |
| AI and Bing | Bing clicks and impressions, Bing AI citations (manual from the AI Performance report), GA4 AI-referral sessions, the prompt log result | AI visibility |

## 6. KPIs

**Primary:** non-branded impressions; rankings for the keyword-to-URL map (doc 06) tracked monthly by hand in a Sheet from Search Console; organic clicks; qualified organic enquiries (a lead marked qualified by the owner, recorded in a Sheet with the landing page); organic conversion rate (key events over organic sessions).

**Secondary:** indexed commercial pages (target all Tier 1 and Tier 2 pages); CTR by position band; distinct query coverage; organic landing-page engagement; branded search growth; relevant AI search visibility; AI-referral sessions.

Not used as success measures: raw pageviews, sessions without a qualified-lead check, Domain Rating, keyword-count vanity metrics.
