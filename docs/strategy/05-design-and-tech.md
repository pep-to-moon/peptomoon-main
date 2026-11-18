# 05. Design system and technology architecture

Legend: [V] verified, [O] observed, [A] assumption or recommendation. Contrast ratios below are calculated from the WCAG formula and must be re-checked with a tool in Phase 3.

## 1. Design direction

Premium infrastructure company, not an agency template. Spacious, confident, art-directed. Light warm canvas, one strong yellow, calm blues, near-black type.

**Signature motif: the baseline.** A thin ink line with calibration ticks, like a bench ruler or a measurement scale. It anchors section headings, draws across as sections reveal, becomes the connectors in the ecosystem diagram and the track of the process steps. It suits the name and still works if the name changes. Section numbers (01, 02) and small mono labels support it.

Avoid: generic SaaS cards, rounded-everything, glassmorphism, gradients for decoration, stock handshakes, AI illustration styles, repeated split layouts.

## 2. Colour tokens

Brand palette exactly as specified, plus a small derived set for text and lines (derived values are marked).

| Token | Value | Use |
|---|---|---|
| `--canvas` | #FFFDF7 | Main background |
| `--yellow` | #FDC921 | Primary CTAs, highlights, markers |
| `--yellow-soft` | #FDD85D | Hover state, secondary highlights, underline marks |
| `--sky` | #99D6EA | Secondary section backgrounds |
| `--steel` | #6798C0 | Supporting graphics, diagram strokes, large accents |
| `--ink` | #15140F (derived) | Text, lines, the one dark section |
| `--ink-soft` | #4A483F (derived) | Secondary text |
| `--line` | #E6E0CE (derived) | Hairlines on canvas |
| `--steel-ink` | #2F5F8A (derived) | Links and small text that needs blue |

Calculated contrast (WCAG ratio, approximate):

| Pair | Ratio | Rule |
|---|---|---|
| ink on canvas | about 18:1 | All body text |
| ink on yellow | about 11.9:1 | Button labels |
| ink on sky | about 11.5:1 | Text on blue sections |
| ink on steel | about 6.0:1 | Text on steel panels |
| white on steel | about 3.1:1 | Fails for body text. Only large display text (24px and up) allowed |
| steel on canvas | about 3.0:1 | Graphics and large type only, never small text |
| yellow on canvas | about 1.5:1 | Never as text. Fill or marker only |
| steel-ink on canvas | about 6.6:1 | Links and small blue text |

Usage balance: canvas dominant, one yellow moment per screen, sky for two or three sections, steel sparingly, ink for type and one dark section for rhythm. Not every colour in every section.

## 3. Typography

Reference [O]: unitedcarriers.com uses BT Steinhart (heavy squared grotesque, Medium and Bold) for headings, BT Steinhart Mono for nav, buttons and labels, and Helvetica Neue for body. These are commercial fonts with no licence we can verify, so we do not use them.

Direction: very large, bold, confident display headings, small mono labels, clean grotesque body. No italics by default, no condensed faces, no tiny text.

Phase 3 specimen test, rendering the same hero line and a paragraph in each finalist beside a screenshot of the reference. All are SIL Open Font License families available through `next/font` (confirm each licence at install):

| Role | Finalists |
|---|---|
| Display | Archivo (use its width axis for a wide, squared feel), Space Grotesk, Familjen Grotesk |
| Mono labels | Geist Mono, JetBrains Mono |
| Body | Instrument Sans, Hanken Grotesk |

Scale and rhythm:
- Display XL: `clamp(3rem, 1.2rem + 7vw, 8rem)`, line height 0.95, letter spacing -0.02em, weight 700 or 800. Uppercase only for the hero and select display lines.
- H2: `clamp(2rem, 1rem + 3.5vw, 4rem)`. H3 around 1.5 to 2rem. Body 17 to 18px at line height 1.6, reading width about 68 characters.
- Mono labels 13 to 14px minimum, uppercase, letter spacing +0.06em.
- Three font files at most per page, subset to Latin.

## 4. Grid, spacing and breakpoints

- 12 columns desktop, 8 tablet, 4 mobile. Container up to 1440px with fluid gutters (16, 24, 32). Full-bleed sections allowed.
- Spacing scale on a 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192. Section padding `clamp(5rem, 12vw, 11rem)`.
- Breakpoints (Tailwind defaults): 640, 768, 1024, 1280, 1536. Mobile has its own compositions, not shrunken desktop: stacked chapters instead of pinned panels, accordions instead of sticky lists, one large card per swipe in the portfolio, 16px side gutters, tap targets of at least 44px.

## 5. Components

- **Buttons.** Primary: yellow fill, ink label, 6px radius, arrow that slides on hover. Secondary: ink outline. Text link: underline with offset. Visible focus ring in ink with a yellow outline. No tiny pill buttons.
- **Navigation.** Transparent over the hero, solid canvas after scroll. Services opens a four-column disclosure menu grouped by Build, Run, Grow, Verify. A yellow "Tell us what you need" button is always present. Mobile uses a full-screen sheet with large links. Keyboard and screen reader accessible, focus trapped in the sheet.
- **Cards.** Flat, 1px `--line` border, 6px radius, no heavy shadows. Layouts vary: numbered rows, split panels, bento with mixed sizes, so no screen is a repeated grid of identical cards.
- **Footer.** Large wordmark, sitemap columns, a short notice that Peptomoon serves businesses and does not sell products, links to legal pages.
- **Section separation.** Alternating backgrounds and hairlines, consistent vertical rhythm.

## 6. Motion rules

- Library roles: GSAP with ScrollTrigger for pinned and scrubbed storytelling (at most two pinned sections), Motion for UI transitions (quiz steps, menus, hovers), Lenis for smooth scrolling on desktop pointer devices only. These are the combination used by most reference sites [O] and already in your repos.
- Entrances: text lines reveal from a mask, 60ms stagger. Images reveal by clip-path. Easing `cubic-bezier(0.22, 1, 0.36, 1)`, 600 to 900ms. UI hover and press 150 to 250ms.
- Parallax limited to the hero visual and two images, at most about 8 percent travel.
- Numbers animate only when they are verified figures.
- No constant floating elements, no marquees (if one is ever added it needs a pause control), nothing that delays reading.
- Reduced motion: no pinning, no parallax, no Lenis, no stagger. Elements simply appear.
- Content is visible by default. Elements start hidden only after JavaScript confirms it will animate them, so a failed script never leaves a blank page.
- Pinned storytelling runs only at 1024px and up via GSAP `matchMedia`. Smaller screens get stacked chapters.
- Only `transform` and `opacity` animate. Space is reserved before reveal to protect CLS.

## 7. Imagery

- Hero and portfolio use real screenshots of the six sites, captured by script, converted to AVIF and WebP, with capture dates.
- Diagrams are original SVG (ecosystem, timelines, event map, dashboard sample).
- Stock photography is an open decision (file 03, question 9). If approved, a small number of macro laboratory, logistics and architectural images from Unsplash or Pexels, each with licence and source logged in `public/brand/IMAGE-LICENSES.md`, no handshakes or generic offices. The Unsplash connector needs authorisation before it can be used here.
- All images have intrinsic dimensions or aspect ratios, lazy loading below the fold, and accurate alt text.

## 7b. Visual review of the six design references (2026-11-17)

Phase 1 inspected these sites through their code only. On 2026-11-17 all six were captured in a real browser and reviewed
(sohub.digital loaded this time). Shared traits, with what the build did about each:

| Trait seen on the references | Where seen | Decision in the build |
|---|---|---|
| Image-led layouts, large rounded image cards and strips | motorium, sohub, fixa, awsmd, medusmo | Real portfolio screenshots in rounded frames, a screenshot strip on Services and About, portfolio cards on colour tiles. Stock photography is the one gap (see below) |
| Soft radii, about 16px, and pill buttons | all six | Cards, frames and inputs moved from 6px to 16px (12px in the quiz). Buttons are pills |
| Scroll-linked text that goes from grey to dark | awsmd, fixa, medusmo | `ScrollText` on the homepage statement and the About lead. Desktop pointer devices with motion allowed only. Text is solid for everyone else |
| Numbered sections with small labels and hairline rules | awsmd, medusmo, mistral | Already present: `01 / Label`, mono labels, the baseline ruler |
| Metrics or proof strip near the top | motorium, awsmd, medusmo | Hero proof strip with verified facts only |
| Light neutral canvas with quiet secondary text | sohub, motorium, fixa, mistral | Warm canvas with ink-soft secondary text. Strong colour blocks are used for rhythm, more saturated than the references because the brief's palette is yellow and blue |
| Medium-weight, tightly tracked large type | sohub, motorium, fixa, mistral | Not adopted for headings: the brief's typography reference (unitedcarriers) is heavy and squared, so display type is Archivo wide at 800. Body copy stays light |
| Floating pill navigation, marquees, before/after sliders, client logo walls | fixa, sohub, awsmd, motorium, medusmo | Not built. Logo walls and before/after claims would need verified client material, marquees need pause controls, and a floating header was judged lower value than the work above |

Remaining gap against the references: they rely on rich photography and 3D or illustrated imagery. The build is
screenshot-, type- and diagram-led. Adding photography needs images from a free-licence provider, and Unsplash and Pexels
block automated retrieval, so it needs an API key, the Unsplash connector authorised, or images chosen by you.

## 8. Technology architecture

Package versions checked on the npm registry on 2026-11-17 [V]. Re-check at install, and read the Next.js docs bundled in `node_modules/next/dist/docs/` before using unfamiliar Next 16 APIs.

| Area | Choice | Notes |
|---|---|---|
| Framework | Next.js 16.4.x, App Router, React 19.3.x, TypeScript strict | Server Components by default |
| Styling | Tailwind CSS 4.3.x (CSS-first `@theme` tokens) | Your older repos use Tailwind 3, so the config style differs |
| UI primitives | shadcn/ui components copied in only where needed (dialog or sheet, accordion, tabs, checkbox, radio group), restyled | Not the whole kit |
| Animation | `motion`, `gsap` with `@gsap/react`, `lenis` | Verify GSAP licence terms at install |
| Icons | `lucide-react` | Import per icon |
| Forms | `react-hook-form`, `zod`, `@hookform/resolvers` | One schema on client and server |
| Email | `resend` | Success only on accepted message id |
| Spam | Cloudflare Turnstile plus honeypot plus rate limit | Rate limit store: Upstash if configured, in-memory fallback |
| Analytics | `@next/third-parties/google` (GA4) | Loads on every page when `NEXT_PUBLIC_GA_ID` is set; no cookie banner |
| Session recordings | Microsoft Clarity (`next/script`) | Loads on every page when `NEXT_PUBLIC_CLARITY_ID` is set; the contact form is masked from recordings |
| Images | `next/image`, `sharp` | AVIF and WebP |
| Hosting | Vercel | Domain and email sending domain pending |
| Dev tools | ESLint, Prettier, Vitest, Playwright with axe-core, bundle analyzer | pnpm, matching your repos |
| Not installed | Three.js and React Three Fiber (no genuine need), Swiper (CSS scroll-snap plus GSAP is enough), Payload (deferred), next-intl, auth, Stripe, global state libraries | Add only on a real requirement |

### Content and CMS readiness

Content lives in typed files now (TypeScript modules and MDX for articles), validated by Zod schemas, behind a repository interface (`getServices`, `getCaseStudies`, `getArticles`, `getEvidence`). A Payload adapter can replace the file source later with the same schemas as collections, a move your team already knows from the six sites. Trigger for the move: publishing cadence beyond what a developer can comfortably edit, or non-developers needing to publish.

### Project structure

```
src/
  app/            routes: (site)/page, services, case-studies, resources, about, contact, legal
                  api/inquiry/route.ts, sitemap.ts, robots.ts, not-found.tsx, error.tsx, global-error.tsx
  components/     ui, layout, sections/home, services, portfolio, case-study, quiz, motion, seo
  content/        services/*.ts, case-studies/*.ts, articles/*.mdx, portfolio.ts, evidence.ts, faq.ts
  config/         site.ts (name, legal entity, domain, contact), brand.ts, nav.ts, seo-map.ts
  lib/            seo (metadata, schema), content (repository), notifiers, env.ts, utils
  hooks/  types/
scripts/          capture-portfolio.ts, check-placeholders.ts, check-copy.ts, check-links.ts, check-seo-map.ts
public/           portfolio/, brand/
docs/strategy/    these files
```

Service pages use one route template. Each service has its own content module with unique sections and its own signature component, so no page is a reworded copy of another.

### Brand modularity

- Name, legal name, domain, tagline, contact details and social links live only in `config/site.ts`. Content refers to the brand through a token.
- The logo is one SVG component plus a file. The favicon and app icons come from a single source. Colours are tokens in CSS.
- A check script fails if the working name appears hard-coded outside config. Renaming means editing the config and replacing the logo.

### Quality gates

- `pnpm check`: type check, lint, copy lint (em dashes, denylist such as "guaranteed" and "FDA compliant"), SEO map uniqueness, link graph, and in production builds the `[[CONFIRM]]` placeholder check.
- `pnpm test:e2e`: Playwright with axe-core on every template at mobile and desktop widths, quiz flow including failure states.
- Production build must pass with zero TypeScript, lint and hydration warnings before each checkpoint.

## 9. Build phases and checkpoints

| Phase | Work | Checkpoint for you |
|---|---|---|
| 3. Design system | Tokens, type specimen test, component library page, motion primitives, one real homepage hero plus one section in the browser | Approve look, type and motion before the full build |
| 4a. Foundation | Scaffold, config, layout, navigation, footer, environment validation, check scripts, CI | None |
| 4b. Homepage | All 15 sections | Review on desktop and phone |
| 4c. Services | Hub plus ten pages with their unique components and content | Review copy, delivery statuses and guardrails |
| 4d. Portfolio | Screenshot capture, homepage scroller, hub, first three case studies | Confirm screenshots and every case-study fact |
| 4e. Resources and About | Hub and wave 1 articles, About | Review sources and dated regulatory statements |
| 4f. Contact | Quiz, API route, notifier, spam protection | Send a real test submission |
| 4g. Legal | Drafts using `[[CONFIRM]]` tokens | Counsel review |
| 5. SEO implementation | Metadata audit, schema validation, sitemap and robots, analytics and Search Console readiness | Verify in Search Console after deploy |
| 6. Testing | Viewport matrix (360, 390, 768, 1024, 1280, 1440, 1920), keyboard and screen reader pass, reduced motion, PageSpeed Insights on mobile and desktop, link and schema checks, production build | Sign-off |

Definition of done follows the brief's Phase 6 list. The site is not called finished until those checks have been run and their results recorded.


---

## Design revision, 17 November 2026 (supersedes the colour, type and component notes above)

The first build was judged too generic and too far from the six references. The visual system was rebuilt:

- **Type.** Saira (display, width axis, uppercase, weight 700) for headlines, taken from the typography reference, with Inter for body text. Sentence-case Saira for card and row titles.
- **Colour.** Blue led: ink #0b1623, blue #2f5f8a for buttons and links, navy #0d2236 for the single dark section and the footer, sky #99D6EA and sky-soft for hover fills and quiet surfaces. Yellow #FDC921 survives only as a tiny "Live" dot on portfolio cards. One continuous canvas (#FFFDF7) runs through the page, with two dark moments (the ecosystem diagram and the footer), so backgrounds do not change from section to section.
- **Layout.** Editorial rather than boxed: hairline rules, large numerals, asymmetric 12-column grids, comparison as a plain table, services as an indexed list that fills on hover, FAQ as ruled disclosure rows. Full-width, image-led work (marquee strip, pinned horizontal portfolio, sticky screenshot reveal).
- **Motion.** Scroll-linked word reveal, GSAP pinned portfolio (desktop pointer only, native swipe elsewhere), sticky stacking slabs, sticky screenshot cross-fade, animated beams from ten services to one order record, marquee strips, Lenis smooth scroll on desktop. All fall back to static layouts for reduced motion.
- **Removed on purpose.** The 3D helix, border beams, cursor spotlight cards, glare tilt, pinging dots, glow blobs, grid-line textures, drop shadows on cards, icon-in-square tiles, numbered circles, check-circle bullets, a dot eyebrow above every heading and a highlighted last word in every headline. These are the common tells of template-generated sites.
- **Contact.** Two steps. Required: one service, a name, an email and consent. Website, business, WhatsApp, situation and notes are optional, and the website is never required.
- **Open gap.** Photography. The references lean on rich photography and video; this build uses only real screenshots of the six live sites. Closing the gap needs licensed photography or footage supplied by the owner.
