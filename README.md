# Peptomoon website

Marketing and lead-generation site for an infrastructure and growth partner serving RUO peptide businesses.
Peptomoon (peptomoon.com) is the confirmed name. Strategy, research and decisions live in [docs/strategy](docs/strategy/00-executive-summary.md).

## Stack

Next.js 16 (App Router, Turbopack), React 19, TypeScript 6, Tailwind CSS 4, Motion, GSAP with ScrollTrigger, Lenis,
React Hook Form with Zod, Resend. Package manager: pnpm. Node 20.9 or newer.

TypeScript is pinned to 6 because `typescript-eslint` does not support TypeScript 7 yet. Revisit when it does.

## Run it

```bash
pnpm install
cp .env.example .env.local      # dummy values are fine for local work
pnpm dev                        # http://localhost:3000
```

| Command | What it does |
|---|---|
| `pnpm check` | Type check, lint and content checks |
| `pnpm build` / `pnpm start` | Production build (runs the placeholder guard first) and server |
| `pnpm test:e2e` | Builds, serves on :3100, runs the Playwright and axe suite in Microsoft Edge |
| `pnpm capture:portfolio` | Re-captures the six portfolio screenshots from the live sites |
| `pnpm shoot /route 1440 scratch/name` | Visual QA screenshots of a local route, sliced for review |

## Where things live

```
src/app/            routes (home, services, case-studies, resources, about, contact, legal, api/inquiry)
src/components/     ui primitives, layout, home sections, services, portfolio, quiz, seo, motion
src/content/        typed content: services, articles, case studies, portfolio, legal
src/config/         site.ts (brand and business details), nav.ts
src/lib/            seo helpers, schema generators, routes registry, form schema, notifiers
scripts/            capture-portfolio, check-content, check-placeholders, shoot
tests/e2e/          site-wide and quiz tests
docs/strategy/      research, strategy, design and technology decisions
```

## Changing the brand or business details

Edit `src/config/site.ts` (name, legal name, contact, analytics) and replace
`src/components/ui/logo.tsx` and `src/app/icon.svg`. Colours are tokens at the top of `src/app/globals.css`.

## Settings and the launch check

Nothing on the site is a made-up value. The contact email defaults to `inquiry@peptomoon.com` and can be overridden with
`NEXT_PUBLIC_CONTACT_EMAIL`. Optional settings: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GSC_VERIFICATION`, `FORM_SECRET`.

Online enquiries need `RESEND_API_KEY` and `RESEND_FROM_EMAIL` (an address on a domain verified in Resend, for example
`noreply@peptomoon.com`). They arrive at `INQUIRY_TO_EMAIL` (one address or a comma-separated list) or, when that is not
set, at `inquiry@peptomoon.com`. The site sets the sender name itself: the alert we receive comes from "Peptomoon Website"
and the confirmation the visitor receives comes from "Peptomoon", with replies going to `inquiry@peptomoon.com`. The spam
check is a simple arithmetic question that the site's own server issues and verifies, so there are no other keys to set up.

`pnpm check:placeholders` runs before every build. On the live deploy it blocks only a wrong `NEXT_PUBLIC_SITE_URL` (leave it
unset, or use `https://peptomoon.com`). Missing email settings only print a warning, and until they exist the live contact
page offers a plain email link instead of the form. Set `STRICT_LAUNCH_CHECK=1` to make missing email settings block the build.

## Content rules enforced by `pnpm check:content`

No em dashes, no risky claim phrases (for example "FDA compliant"), unique primary keywords, valid relations and links,
title and description lengths, and case studies that match the portfolio data.

Case study fields carry `value`, `source`, `verifiedOn` and `status`. Fields marked `needs-confirmation` render only in
development and never in production. Dummy evidence items follow the same rule.

Regulatory articles (`needsCounselReview: true`) are excluded from production until `counselReviewedOn` is set on them.

## Contact form

`POST /api/inquiry` validates with the same Zod schema as the browser, checks a honeypot, minimum fill time, rate limit and
a simple arithmetic question signed by the server, then sends through Resend. It returns success only when Resend accepts the message. Add WhatsApp later by
implementing `src/lib/notifiers/whatsapp.ts`. The form and route do not change.

## Search Console reach section

The "Search reach" section on the home page and the case studies page shows real Google Search Console figures. It renders
nothing until a Search Console export is added. Put the downloaded Excel file in a neutral folder such as `data/gsc/store-1/`,
run `pnpm import:gsc`, then rebuild. Stores are shown anonymously and search queries are never published. The step by step guide is in [data/gsc/README.md](data/gsc/README.md).

## Running the end to end tests

`pnpm test:e2e` builds and starts the site on port 3100 by itself. If that launcher fails on your machine, run
`pnpm build`, then `pnpm start -p 3100`, then `E2E_BASE=http://localhost:3100 pnpm test:e2e`.

## Search, AI and share-image files

- `/robots.txt` is generated by `src/app/robots.ts`. It welcomes search bots, AI crawlers and agents (list in that file).
- `/llms.txt` and `/llms-full.txt` are generated from the content modules by `src/lib/llms.ts`. Nothing to maintain by hand.
- `public/og/*.jpg` are the share images, one per route. Run `pnpm make:og` with the dev server up after changing titles or the logo.
- The www to bare-domain redirect is set in Vercel. The canonical address is `https://peptomoon.com`.
