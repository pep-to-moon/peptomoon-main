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

## Photographs and motion

Every photograph is a slot in `src/content/media.ts` with a descriptive file name in `public/images`. The current photos are CC0 or public-domain stock found through the Openverse API and picked by eye. Their sources are recorded in `src/content/media-credits.json`. They are about 1000px wide, so they can look slightly soft on large retina screens. Three rules apply to every photo:

- **No recognisable faces.** Use hands, objects, environments, or people cropped at the neck.
- **Alt text is "what the photo shows, what it illustrates".** The first half is a true description in `media-credits.json`. The second half is the slot's `topic` in `media.ts`, or a page-specific one passed to `<Photo topic=...>` (service pages use the service's own keyword). Keep it natural and honest: no keyword lists, no "image of".
- **Descriptive file names.** Search engines read them, so a new photo gets a name like `card-tap-payment-terminal`, not `img-04`.

The sitemap lists each page's photographs, and service pages carry them in their structured data (`src/lib/page-images.ts`).

To swap any slot for a full-resolution Unsplash photo, create a free app at https://unsplash.com/developers and run `UNSPLASH_ACCESS_KEY=your-key pnpm fetch:images <slot>`. It uses Unsplash's official API and records the photographer and the photo's alt text. A script cannot check for faces, so look at the result before keeping it. `pnpm make:media` only draws placeholder art for slots that have no real photo.

Motion lives in `src/components/motion`: the scroll reveals and smooth scrolling (`motion-provider.tsx`), line-by-line headings (`split-heading.tsx`, desktop with a mouse only), the cursor ring (`cursor.tsx`) and the Threads WebGL background (`threads.tsx`, from React Bits under its MIT + Commons Clause licence, tablet and desktop only). All of it is off for visitors who prefer reduced motion, and content stays visible if scripts fail. The dotted map is Magic UI's Dotted Map (MIT) drawn with the `piri` package, and it only ever shows countries from the Search Console exports.

### The entrance

The home page opens on navy with the Peptomoon wordmark. The hero's own strip of the six sites we have built runs fast through the middle of the screen, slows to its normal pace, and then dissolves into the hero: a soft feathered edge sweeps the navy up and off, the headline lines rise through it, the strip glides down to its place, the header fades in, and the wordmark flies up into the header and becomes its logo (`src/components/layout/site-intro.tsx`, styles in `globals.css`, switch in the head script in `src/app/layout.tsx`). It is built from the real hero strip, so nothing is swapped at the end. Pure CSS plus a little script, no library. Without the intro (later visits, reduced motion) the hero performs a quieter version of the same entrance by itself: lines rise out of masks, the strip's cards are dealt in.

- **Home page only, once per browser session.** Coming back to the home page in the same tab does not replay it.
- **Never forced on anyone.** It is skipped for visitors who prefer reduced motion, who have data saver on, who have JavaScript off, and for automated browsers (so audits and tests see the real page). A click, Escape, Enter or Space skips it, and a failsafe in the head clears it after about five seconds whatever happens. Its wordmark is `aria-hidden`; the page underneath is in the HTML the whole time, so search engines and screen readers are unaffected.
- **To see it again:** open the site in a new tab or window (each tab is its own session), or clear the `pm-intro` key from the tab's session storage. There is no URL switch. Reduced motion always skips it.
- **Timing** is the constants at the top of `site-intro.tsx` (full speed, slow-down, when the dissolve starts) and the matching 1.2s durations in the intro block of `globals.css`. It never starts the dissolve before the fonts and page have really loaded.

## Settings and the launch check

Nothing on the site is a made-up value. The contact email defaults to `inquiry@peptomoon.com` and can be overridden with
`NEXT_PUBLIC_CONTACT_EMAIL`. Optional settings: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_GSC_VERIFICATION`, `FORM_SECRET`.

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
