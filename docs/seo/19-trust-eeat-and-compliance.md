# 19. Trust, E-E-A-T and RUO compliance safeguards

Reviewed 19 November 2026 (text scan of all 38 pages, code review, and the guidance in doc 02). Nothing here fabricates a person, credential, address, testimonial, certification or approval; where the site needs one, this document asks the owner for the real fact.

## 1. Trust signals: present and missing

| Signal | State | Evidence |
|---|---|---|
| About page | Present, substantive (principles, limits, what Peptomoon declines) | `/about` |
| Business identity | **Missing.** No named person, founder, team, registered entity, jurisdiction, address or phone | Text scan of all pages; `siteConfig` notes no public phone yet |
| Contact information | Email only (`inquiry@peptomoon.com`) in markup and footer | Live |
| Company description | Consistent across title, schema, `llms.txt` and About | Verified |
| Service responsibilities | Clear: each service states what is and is not included and what cannot be promised | Service pages |
| Case studies | Verified facts with dates and sources; challenges and outcomes unconfirmed (hidden) | Doc 08 |
| Client evidence | Six partner-built stores shown; no testimonials (correctly); the partner is unnamed | Live |
| Author information | **Missing.** Guides are published "under the team's name" by the editorial policy; Article schema author is the Organization | `editorial-policy` |
| Editorial responsibility | Present: editorial and corrections policy, "How we researched this guide", sources lists, dates | Guides |
| Sources | 3 of 6 guides cite none; 12 of 15 services cite none | Doc 05 |
| Review dates | Guides dated (published and updated); services have no visible date | Live |
| Policies | Privacy, terms, disclaimer, cookie and editorial policies present | Live |
| Business claims | "All services delivered", "owners agree to be featured" cannot be verified from outside | Owner-stated |
| External profiles | None; `sameAs` empty | Schema |

## 2. What the owner needs to decide (OWNER items)

Google's guidance asks "Who, How and Why" and treats trust as the most important element, with extra weight on topics touching payments and regulation. Choose one of:

1. **Named accountability (recommended).** Name the person accountable for the content and the business, with a short factual bio (role and experience they can show) and one real profile link. Put a byline and "reviewed by" on guides and a name and role on About. Add `Person` as the Article author and `sameAs` links.
2. **Anonymous by design.** If the owner prefers not to be named, say so plainly on About and the editorial policy, name the **legal entity and jurisdiction** instead, and rely on sources, dated reviews and counsel credits for trust. This is weaker for payments and regulatory pages.

Either way, supply: registered business name and country or state, and whether a business address or phone may be published; whether `legalName` differs from the brand (it is now omitted from markup); the real external profiles to list; whether Peptomoon's supply of RUO products (your statement) should be disclosed on the supplier-verification and wholesale pages. Disclosure protects the credibility of any supplier-review claim.

## 3. Source and editorial review framework (adopt for the resources section)

| Step | Rule |
|---|---|
| Intent | One sentence of search intent and one of business purpose before drafting |
| Sources | Primary first: statutes (eCFR, U.S. Code), regulator pages (FDA), platform and network policies (Stripe, card networks), standards bodies. Open every source before citing; record the date checked; label vendor claims as vendor claims |
| Jurisdiction | State it ("United States, federal") wherever a rule is described |
| Fact versus interpretation | Separate what a source says from what Peptomoon concludes; mark unsettled points |
| Uncertainty | Say what is not known and who decides (processor, regulator, counsel) |
| Sensitive subjects | Regulation, payments law, product classification: counsel review required; stay hidden until `counselReviewedOn` is set (existing mechanism) |
| Advice | Never present information as legal, medical or financial advice; keep the disclaimer |
| Dates | Publication and review dates visible; quarterly review for payments and regulation; change `updated` only on real edits |
| Corrections | Visible corrections log (policy exists; add a log section to the editorial policy page when the first correction occurs) |

## 4. RUO compliance scan

Scope: every title, meta description, H1, product name and body text of the 38 pages, plus the services code.

| Check | Result |
|---|---|
| Human-use framing (dosing, administration, "benefits for you", sexual, weight-loss, anti-aging, therapeutic claims) in titles, descriptions or H1s | **None found** |
| Body mentions of dosing or human use | All that I read in context are negations ("we do not write dosing or human-use text"); `pnpm check:content` guards risky phrases |
| Claims that an RUO label makes a business compliant | None; the hidden guide argues the opposite |
| Strategies to hide activity or bypass underwriting | None; copy states the opposite |
| Misleading transaction descriptions | None found |
| Unsupported compliance guarantees | None; heavy repetition of limits (doc 05) |
| Unsourced numerical claims | The /all-in-one comparison table quotes "commonly 3.5 to 6.5 percent" and "5 to 15 percent held 3 to 6 months" as industry estimates without sources |

### Items needing an owner or counsel decision

| ID | Item | Why | Suggested handling |
|---|---|---|---|
| K-01 | The /all-in-one meta description says "from 3% with no rolling reserve" without the qualifier the page carries ("for qualifying merchants"; the bank decides) | Snippets, ads reviewers and payment partners read the description first; a rate and reserve promise is the riskiest sentence on the site | Add the qualifier in the description (implemented, doc 15) |
| K-02 | "Reconstitution and concentration calculators" listed three times as a deliverable on /all-in-one | Such tools are commonly read as personal-use dosing aids, which sits against "we do not write dosing, usage or outcome content" | Counsel to decide; remove from public copy if in doubt. Not changed by me |
| K-03 | Title "All-in-One Peptide & Telehealth Business Partner" joins RUO products and a regulated clinical offering in one headline | Entity clarity and compliance optics; the telehealth page itself says they are kept apart | Owner decision (POS-02). Not changed by me |
| K-04 | Telehealth page says hosting "that supports HIPAA" | A HIPAA-related claim must match what is actually contracted (for example a signed business associate agreement with the host) | Owner to confirm the contracts match the wording |
| K-05 | The 3% figure and "0% rolling reserve" star on /all-in-one | Strong commercial claims; the on-page qualifier exists and is prominent | Keep the qualifier adjacent to every instance; counsel to review |
| K-06 | Supplier verification independence | Peptomoon also supplies RUO products (owner statement); a verification claim by a supplier needs disclosure | Add a one-line disclosure to the supplier-verification and wholesale pages |

## 5. What stays out of the site

Human dosing instructions, therapeutic claims, "RUO therefore compliant", hiding or disguising business activity, bypassing underwriting, "approval" promises, fabricated authors, testimonials, certifications, addresses or approvals.
