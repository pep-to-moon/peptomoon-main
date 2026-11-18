# Peptomoon: Phase 1 + 2 Executive Summary

Prepared 2026-11-17. Status: research and strategy complete, no site code written yet.
Read this file first. The other five files hold the detail.

| File | Contents |
|---|---|
| 00-executive-summary.md | This file: findings, decisions made, questions that block build |
| 01-research.md | Market, competitors, regulatory and platform findings, design reference findings, typeface identification |
| 02-portfolio-audit.md | All six existing sites analysed individually, issues found, case-study readiness |
| 03-strategy.md | Positioning, messaging, service ecosystem, sitemap, homepage, service pages, internal linking, quiz, portfolio presentation |
| 04-seo.md | Keyword clusters, intent map, cannibalization rules, schema plan, technical SEO, Core Web Vitals, measurement |
| 05-design-and-tech.md | Design system, motion rules, technology architecture, build phases |

## Evidence legend used in every file

- **[V]** Verified this session from a primary source (the owner's own documentation or page).
- **[O]** Observed directly: live HTML, HTTP headers, sitemaps, screenshots, or the local project folders.
- **[R]** Reported by a secondary source (law-firm blog, search summary, vendor page). Not independently confirmed.
- **[A]** Assumption or recommendation. Not a fact.

## The findings that matter most

1. **The project folder was empty** apart from the brief. Nothing to preserve or overwrite.
2. **Your real stack is already established.** Response headers on all six live sites say `X-Powered-By: Next.js, Payload` [O]. Five are on Vercel, Amino Based is on Railway [O]. Local repos (99 Purity, Veracue, PrimeTime) use Next.js 16, Payload 3, Postgres, Resend, Cloudflare R2, GSAP, Lenis and Motion [O]. The brief's stack matches what the team already ships.
3. **All six portfolio sites carry a "Designed & Developed by Belk Digital" credit** linking to belkdigital.com [O]. That supports "we designed and developed these". It does not by itself prove "client" or "actively maintaining". Maintenance evidence found: sitemap lastmod dates in Oct and Nov 2026 on several sites, and dated SEO audit files (2026-09-26 to 09-28) in the PrimeTime repo [O].
4. **Ownership overlap needs your confirmation before anything is published.** Vanta Foundry (one of the two "business model reference" sites) names Veracue Labs, Helix Bio Chem and PrimeTime BioLabs as its own sister brands [O]. Your local `vanta-foundry/CLAUDE.md` says website development "for every industry moves to a separate, more premium site", which reads like this project. If three of the six are operated by the same group, calling all six "clients" would be inaccurate. See question 1.
5. **The regulatory climate moved sharply in 2026, and the portfolio sites sit inside it.** Secondary sources report FDA warning letters (Dec 2024, Mar 2026, four on 2026-08-24) that reject "research use only" disclaimers when the surrounding marketing shows human-use intent, citing bacteriostatic water, reconstitution supplies, peptide calculators and dosing guidance [R]. I could not re-read the FDA pages directly (they returned 404 to my fetcher), so treat this as reported, not verified. Observed on the six sites [O]: peptide calculator pages (Helix, PrimeTime, Amino Based, Veracue, and a reconstitution-guide article on 99 Purity), bacteriostatic water products (Veracue, Certified Aminos, Amino Based), reconstitution steps (Veracue FAQ), and several outcome-leaning phrases. This is not legal advice and I am not concluding any site is non-compliant. It does mean Peptomoon cannot present these sites as compliance exemplars, and you should get qualified counsel to review them before they become the centrepiece of a "compliance-oriented" brand. See question 5.
6. **FAQ structured data no longer earns rich results for anyone.** Google's own changelog states the FAQ rich result feature is no longer shown and its documentation was removed (May 2026 entry) [V]. All six portfolio sites still ship FAQ markup [O]. Decision changed on 18 November 2026: the owner asked to keep FAQPage markup on every page that shows FAQs. It costs nothing, carries no penalty and is generated from the same items the page displays, so it cannot drift. A test checks that every marked-up question and answer is visible on its page.
7. **No keyword volume data exists in this report, by design.** Semrush returned "no API units left" and Ahrefs returned "Insufficient plan" [V]. Per the brief, I did qualitative SERP and competitor research instead and invented no metrics. Google Trends data [V via TrendsMCP]: US interest in "research peptides" rose from roughly 5 (2024 average) to a peak of 100 in the week of 2026-04-18, and sits near 24 now. Demand is volatile and tied to regulatory news, so the site should not be positioned around a peak.
8. **The competitive gap is real.** Hardproof sells a high-ticket "store in a box" to individual operators and publishes no content or proof. Vanta Foundry is vertically integrated with a large guide library but its proof is affiliated brands and unnamed clients. Freelancer listings promise "FDA compliant" sites, a claim Peptomoon should never make. Nobody visible combines a verifiable portfolio, serious engineering, an honest compliance posture and a connected service ecosystem [O/R].
9. **The unitedcarriers.com typeface is identified [O].** Headings use BT Steinhart (Medium 500 and Bold 700), labels and nav use BT Steinhart Mono, body uses Helvetica Neue, all self-hosted subset woff2 files on a Webflow site. These are commercial fonts with no licence we can verify, so the plan uses a free alternative chosen by specimen test in Phase 3.
10. **Structural SEO gaps common to all six portfolio sites [O]:** no category URLs in any sitemap (filters are `?category=` query strings), blog posts missing from sitemaps on Amino Based (zero blog URLs) and Veracue (three homepage posts absent), product and statistic claims that disagree between pages. Details in file 02.

## Decisions I have made (recommended defaults, all reversible)

| Decision | Choice | Why |
|---|---|---|
| Central message | "One partner. Every moving part of your RUO peptide business." | Most concrete, names the audience, separates us from "just websites". |
| Organising model | Four pillars: Build, Run, Grow, Verify | Turns ten services into one connected ecosystem. "Verify" is honest about reviewing, where "Protect" would imply a guarantee. |
| Homepage | 15 sections, not 18 | The brief's separate problem and solution, payment, supplier and fulfilment, and portfolio and case-study sections overlap. Merged so each section has one job. |
| Service URLs | Exactly as specified in the brief | No extra service pages until search evidence justifies them. |
| Case studies | Template for six, publish only those with enough verified material, others stay noindex | Brief forbids thin case studies. |
| Content source | Typed file-based content now, Payload-ready interface | Brief: CMS-ready without premature infrastructure. Team already runs Payload, so the later swap is cheap. |
| Animation | GSAP + ScrollTrigger for pinned storytelling, Motion for UI, Lenis on desktop only, no Three.js | Matches reference sites and your repos. A 3D library adds weight without a real need. |
| Form | Route Handler, Zod, Resend, Cloudflare Turnstile plus honeypot, notifier adapter for WhatsApp later | Success shown only after Resend accepts the message. |
| Schema | Organization, WebSite, Service, BreadcrumbList, Article, WebPage subtypes, and FAQPage on every page with visible FAQs. No ratings, no prices | Matches visible content and current Google rules. |
| Language | English only at launch | One language done well. |
| Prices | None published | Both reference sites publish none, and nothing is confirmed. |

## Questions that block build (details and defaults in 03-strategy.md section 12)

1. What is the exact relationship between Peptomoon or Belk Digital, Vanta Foundry, and each of the six sites (owner, client, group brand)? How should each be described, and does each owner consent to being featured?
2. Which of the ten services are delivered today versus planned? The site must separate established capabilities from planned ones.
3. Do you work with a named qualified regulatory professional or counsel for the compliance service? Do you receive referral compensation from processors, suppliers or 3PLs? (If yes, the site must disclose it.)
4. Will counsel review the six live sites before they are showcased (point 5 above)?
5. Can you give read-only Google Search Console access, or exported data, for the six sites, and confirm which results may be published?
6. Where are the repos or project records for Helix Bio Chem, Certified Aminos and Amino Based? I found no obviously matching folder.
7. Legal entity name, address, contact email, WhatsApp number, domain, and the destination address for form submissions.
8. Imagery: your Foundry notes say you rejected stock photos twice. Approve the plan of real screenshots, original diagrams and very little stock?
9. Will you pay for BT Steinhart, or go with a free alternative?
10. Do you want to unblock real keyword data (top up Semrush API units or provide an Ahrefs plan)?

## Update, 2026-11-17: answers received and build started

Answers to the blocking questions:

| Question | Answer | Effect on the build |
|---|---|---|
| Relationship to the six sites, consent | Owners agree to be featured. Do not add Vanta Foundry | Vanta Foundry is not named or linked anywhere. Copy says "sites we designed, developed and maintain". No testimonials |
| Which services are delivered | All ten | Every service is marked "established". Guardrails and limits still apply |
| Counsel and referral fees | No named counsel. Read as no referral fees | Compliance copy says "alongside your own counsel". The claim "we receive no referral fees" is NOT published until stated plainly |
| Search Console data | Proceed with dummy values | Evidence section uses sample items that render only outside production |
| Stock imagery | Free-licence provider images are allowed | None added yet: Unsplash and Pexels block automated retrieval. Needs an API key or the Unsplash connector authorised |

Everything else used the defaults in 03-strategy.md section 12. Dummy business details are marked `[[CONFIRM: ...]]` or
use `.example` addresses. They are allowed in development and preview builds and they block a production build until
replaced (see the README).

Build state: Phases 3 and 4 are implemented (design system, homepage, services, case studies, resources, about, contact
quiz with API, legal drafts, SEO infrastructure). Phase 5 and 6 checks are being run and recorded in the final report.

Deviations from the plan, with reasons:
- Typeface chosen by specimen test: Archivo (wide, weight 800) for display, Instrument Sans for body, Geist Mono for labels.
- TypeScript pinned to 6, because `typescript-eslint` does not support TypeScript 7.
- Regulatory articles are hidden in production until counsel review is recorded on them.
- Six articles at launch instead of eight (two of the planned wave-1 pieces move to wave 2).
