import AxeBuilder from "@axe-core/playwright";
import { chromium, expect, test } from "@playwright/test";

/**
 * Checks for the redesign: the all-in-one page, the telehealth service page, photographs, the header at its tightest
 * width, the cursor and the motion layer. Each test states the failure it exists to catch.
 */

test.describe("all-in-one page", () => {
  test.use({ reducedMotion: "reduce" });

  test("has no horizontal overflow at any common width", async ({ page }) => {
    for (const width of [360, 390, 768, 1024, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/all-in-one", { waitUntil: "networkidle" });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(0);
    }
  });

  test("the three build tabs switch panels and respond to the arrow keys", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/all-in-one", { waitUntil: "networkidle" });
    const tabs = page.getByRole("tab");
    await expect(tabs).toHaveCount(3);
    await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
    await tabs.nth(0).focus();
    await page.keyboard.press("ArrowRight");
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel")).toContainText("Patient, provider and admin dashboards");
    await page.keyboard.press("End");
    await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("Home");
    await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
  });

  test("the telehealth card and tab lead to the real telehealth page", async ({ page }) => {
    await page.goto("/all-in-one", { waitUntil: "networkidle" });
    const hrefs = await page.locator('a[href="/services/telehealth-platform-development"]').count();
    expect(hrefs, "links to the telehealth service page").toBeGreaterThanOrEqual(2);
  });

  test("the payments qualifier stays on the page wherever the 3% claim is made", async ({ page }) => {
    await page.goto("/all-in-one", { waitUntil: "networkidle" });
    await expect(page.getByText(/Peptomoon is not a bank or payment processor/).first()).toBeVisible();
  });

  test("every photograph loads and carries a detailed alt text and a descriptive file name", async ({ page }) => {
    await page.goto("/all-in-one", { waitUntil: "networkidle" });
    // Photographs below the fold are lazy-loaded, so scroll the whole page to load them all before checking.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
    });
    await page.waitForLoadState("networkidle");
    const imgs = await page.locator("figure.photo img").evaluateAll((els) =>
      (els as HTMLImageElement[])
        // Photographs inside a collapsed tab are lazy and never load, which is the intended behaviour, so only check displayed ones.
        .filter((i) => i.offsetParent !== null && !i.closest("[hidden]"))
        .map((i) => ({ src: i.currentSrc, ok: i.complete && i.naturalWidth > 0, alt: i.getAttribute("alt") })),
    );
    expect(imgs.length).toBeGreaterThanOrEqual(4);
    for (const i of imgs) {
      expect(i.ok, `image failed to load: ${i.src}`).toBe(true);
      expect(i.alt, `alt attribute missing on ${i.src}`).not.toBeNull();
      // Detailed, natural alt text: what the photo shows plus what it illustrates, not a bare label or a keyword list.
      expect(i.alt!.length, `alt too short: "${i.alt}"`).toBeGreaterThanOrEqual(60);
      expect(i.alt!.length, `alt too long: "${i.alt}"`).toBeLessThanOrEqual(230);
      expect(i.alt, `alt should not start with a filler word: "${i.alt}"`).not.toMatch(/^(image|photo|picture|graphic) of\b/i);
      expect(decodeURIComponent(i.src), `file name should describe the photo: ${i.src}`).toMatch(/[a-z]+-[a-z]+-[a-z]+.*\.webp/);
    }
    const alts = imgs.map((i) => i.alt);
    expect(new Set(alts).size, "each photograph on a page needs its own alt text").toBe(alts.length);
  });

  test("passes the accessibility scan on desktop and phone", async ({ page }) => {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/all-in-one", { waitUntil: "networkidle" });
      await page.addStyleTag({ content: "*{content-visibility:visible !important}" });
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.help} e.g. ${v.nodes[0]?.target.join(" ")}`), `at ${width}px`).toEqual([]);
    }
  });
});

test.describe("telehealth service page", () => {
  test.use({ reducedMotion: "reduce" });
  const path = "/services/telehealth-platform-development";

  test("states its limits plainly and marks up its FAQs", async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toContainText("Telehealth platform development");
    const body = ((await page.evaluate(() => document.body.textContent)) ?? "").replace(/\s+/g, " ");
    for (const phrase of [
      "We do not provide medical care",
      "HIPAA compliance belongs to your organisation",
      "Research-use-only products are not part of a clinical offering",
    ]) {
      expect(body, phrase).toContain(phrase);
    }
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks.join(" ")).toContain("FAQPage");
    expect(blocks.join(" ")).toContain("Licensed telehealth and clinical businesses");
  });

  test("the contact form offers a telehealth option and the page preselects it", async ({ page }) => {
    await page.goto(`/contact?service=telehealth-platform-development`, { waitUntil: "networkidle" });
    await expect(page.getByRole("checkbox", { name: /Telehealth platform/ })).toBeChecked();
  });

  test("is listed in the services menu, the footer and the sitemap", async ({ page, request }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator('footer a[href="/services/telehealth-platform-development"]')).toHaveCount(1);
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain("/services/telehealth-platform-development");
  });
});

test.describe("header", () => {
  test("the call to action stays inside the viewport at the tightest desktop width", async ({ page }) => {
    for (const width of [1024, 1100, 1180, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/", { waitUntil: "networkidle" });
      const cta = page.locator("header").getByRole("link", { name: /start a project/i }).first();
      const box = await cta.boundingBox();
      expect(box, `cta at ${width}px`).not.toBeNull();
      expect(box!.x + box!.width, `cta right edge at ${width}px`).toBeLessThanOrEqual(width);
    }
  });
});

test.describe("motion and cursor", () => {
  test("photographs reveal when they scroll into view", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/all-in-one", { waitUntil: "networkidle" });
    const first = page.locator('figure.photo[data-reveal="mask"]').first();
    await expect(first).toHaveClass(/is-in/, { timeout: 10_000 });
  });

  test("the cursor ring follows a mouse and is absent for reduced motion", async ({ browser }) => {
    const motion = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "no-preference" });
    const p = await motion.newPage();
    await p.goto("/", { waitUntil: "networkidle" });
    await p.mouse.move(400, 300);
    await p.mouse.move(420, 320);
    await expect(p.locator(".cursor-ring")).toHaveAttribute("data-state", /idle|link|label/);
    await motion.close();

    const reduced = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
    const q = await reduced.newPage();
    await q.goto("/", { waitUntil: "networkidle" });
    await q.mouse.move(400, 300);
    await expect(q.locator(".cursor-ring")).toBeHidden();
    await reduced.close();
  });
});

test.describe("image SEO", () => {
  test("the sitemap lists each page's photographs by their descriptive file names", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).toContain("<image:image>");
    expect(xml).toContain("/images/gloved-hands-pipette-laboratory-bench.webp");
    expect(xml).toContain("/images/stethoscope-laptop-telehealth.webp");
  });

  test("a service page's alt text names the service it illustrates", async ({ page }) => {
    await page.goto("/services/payment-processing", { waitUntil: "networkidle" });
    const alt = await page.locator("figure.photo img").first().getAttribute("alt");
    expect(alt).toMatch(/peptide payment processing/i);
  });

  test("service structured data carries the service's photographs", async ({ page }) => {
    await page.goto("/services/telehealth-platform-development", { waitUntil: "networkidle" });
    const blocks = (await page.locator('script[type="application/ld+json"]').allTextContents()).join(" ");
    expect(blocks).toContain("/images/stethoscope-laptop-telehealth.webp");
  });
});

test.describe("vial label design service", () => {
  test.use({ reducedMotion: "reduce" });
  const path = "/services/vial-label-design";

  test("states what it does not do and is wired into the form, footer, sitemap and all-in-one", async ({ page, request }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toContainText("Vial label design");
    const body = ((await page.evaluate(() => document.body.textContent)) ?? "").replace(/\s+/g, " ");
    expect(body).toContain("We do not write dosing, usage or human-use text");
    expect(body).toContain("a label cannot make a product or a business compliant");
    await page.goto("/contact?service=vial-label-design", { waitUntil: "networkidle" });
    await expect(page.getByRole("checkbox", { name: /Vial label design/ })).toBeChecked();
    await page.goto("/all-in-one", { waitUntil: "networkidle" });
    expect(await page.locator('a[href="/services/vial-label-design"]').count()).toBeGreaterThanOrEqual(1);
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain("/services/vial-label-design");
  });
});

test.describe("interaction polish", () => {
  test("hovering a service row floats its photograph beside the cursor, and leaving hides it", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
    const page = await ctx.newPage();
    await page.goto("/services", { waitUntil: "networkidle" });
    const row = page.locator("a[data-preview]").first();
    await row.scrollIntoViewIfNeeded();
    const preview = page.locator(".hover-preview").first();
    await row.hover();
    await expect(preview).toHaveAttribute("data-on", "true");
    await expect(preview.locator("img")).toHaveAttribute("src", /_next\/image/);
    await page.mouse.move(5, 5);
    await expect(preview).toHaveAttribute("data-on", "false");
    await ctx.close();
  });

  test("the comparison table header is not sticky, so it never covers rows", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/all-in-one", { waitUntil: "networkidle" });
    const positions = await page.locator("#compare thead th").evaluateAll((els) => els.map((e) => getComputedStyle(e).position));
    // Only the first column may be sticky (for sideways scrolling on phones); nothing may stick to the top.
    const tops = await page.locator("#compare thead th").evaluateAll((els) => els.map((e) => getComputedStyle(e).top));
    expect(positions.filter((p) => p === "sticky").length).toBeLessThanOrEqual(1);
    for (const top of tops) expect(["auto", "0px"]).toContain(top);
  });
});

test.describe("the six interactions and the animated backgrounds", () => {
  const motion = { viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" as const };

  test("animated backgrounds draw on desktop, and are absent on phones and for reduced motion", async ({ browser }) => {
    const desk = await browser.newContext(motion);
    const p = await desk.newPage();
    await p.goto("/", { waitUntil: "networkidle" });
    await expect.poll(() => p.locator("canvas").count(), { timeout: 10_000 }).toBeGreaterThanOrEqual(1);
    await desk.close();

    const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "no-preference" });
    const q = await phone.newPage();
    await q.goto("/", { waitUntil: "networkidle" });
    await q.waitForTimeout(1200);
    expect(await q.locator("canvas").count(), "no WebGL on phones").toBe(0);
    await phone.close();

    const reduced = await browser.newContext({ ...motion, reducedMotion: "reduce" });
    const r = await reduced.newPage();
    await r.goto("/", { waitUntil: "networkidle" });
    await r.waitForTimeout(1200);
    expect(await r.locator("canvas").count(), "no WebGL for reduced motion").toBe(0);
    await reduced.close();
  });

  test("the contact launcher is always there, opens with its three options and closes with Escape", async ({ page }) => {
    await page.goto("/services", { waitUntil: "networkidle" });
    const button = page.getByRole("button", { name: "Let's talk" });
    await expect(button).toBeVisible();
    await button.click();
    const card = page.getByRole("dialog", { name: "Ways to get in touch" });
    await expect(card).toBeVisible();
    await expect(card.getByRole("link")).toHaveCount(3);
    await expect(card.getByRole("link", { name: /Start a project/ })).toHaveAttribute("href", "/contact");
    await expect(card.getByRole("link", { name: /Email us/ })).toHaveAttribute("href", /^mailto:/);
    await page.keyboard.press("Escape");
    await expect(card).toBeHidden();
  });

  test("the launcher opens by itself after ten seconds, reminds once more later, and never a third time", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    await p.clock.install();
    await p.goto("/about", { waitUntil: "networkidle" });
    // aria-expanded mirrors the card's state, and unlike the exit animation it does not depend on the clock.
    const toggle = p.getByRole("button", { name: "Let's talk" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await p.clock.fastForward(11_000);
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(p.getByRole("dialog", { name: "Ways to get in touch" })).toBeVisible();
    await p.getByRole("button", { name: "Close" }).click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    // The schedule follows the visit, not the page: moving on does not restart it, and it stays quiet until due.
    await p.goto("/why-peptomoon", { waitUntil: "networkidle" });
    await p.clock.fastForward(40_000);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await p.clock.fastForward(60_000);
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await p.getByRole("button", { name: "Close" }).click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await p.clock.fastForward(600_000);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await ctx.close();
  });

  test("using an option stops the reminders, and the contact page never shows the launcher", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    await p.clock.install();
    await p.goto("/about", { waitUntil: "networkidle" });
    await p.getByRole("button", { name: "Let's talk" }).click();
    await p.getByRole("dialog", { name: "Ways to get in touch" }).getByRole("link", { name: /Check payment eligibility/ }).click();
    await p.waitForURL(/\/contact/);
    await expect(p.getByRole("button", { name: "Let's talk" })).toHaveCount(0);
    await ctx.close();
  });

  test("a layer photograph magnifies under the mouse, and the stack sticks only on tall screens", async ({ browser }) => {
    const ctx = await browser.newContext(motion);
    const p = await ctx.newPage();
    await p.goto("/all-in-one", { waitUntil: "networkidle" });
    const photo = p.locator("#layer-build figure.photo").first();
    await photo.scrollIntoViewIfNeeded();
    await p.waitForTimeout(1200);
    const box = (await photo.boundingBox())!;
    await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 5 });
    await expect(p.locator("#layer-build .photo-lens")).toHaveAttribute("data-on", "true");
    expect(await p.locator("#layer-build").evaluate((e) => getComputedStyle(e).position)).toBe("sticky");
    await ctx.close();

    const short = await browser.newContext({ viewport: { width: 1440, height: 700 }, reducedMotion: "no-preference" });
    const q = await short.newPage();
    await q.goto("/all-in-one", { waitUntil: "networkidle" });
    expect(await q.locator("#layer-build").evaluate((e) => getComputedStyle(e).position), "short screens do not stack").toBe("static");
    await short.close();
  });

  test("scrambled labels and proximity headlines keep their real text for readers and search engines", async ({ browser }) => {
    const ctx = await browser.newContext(motion);
    const p = await ctx.newPage();
    await p.goto("/all-in-one", { waitUntil: "networkidle" });
    // The headline's accessible name is the full sentence, and its visible letters spell the same words.
    const h1 = p.locator("h1");
    expect(await h1.getAttribute("aria-label")).toBe("All-in-one infrastructure for RUO peptide and telehealth businesses");
    expect(((await h1.textContent()) ?? "").replace(/\u00a0/g, " ").trim()).toBe("All-in-one infrastructure for RUO peptide and telehealth businesses");
    // A label scrolls in, scrambles, then settles on its real text.
    const label = p.locator("#aio-payments").locator("xpath=preceding::p[contains(@class,'label')][1]");
    await label.scrollIntoViewIfNeeded();
    await p.waitForTimeout(2500);
    expect(((await label.locator("span[aria-hidden='true']").first().textContent()) ?? "").trim()).toBe("Run · High-risk payment processing");
    expect(((await label.locator(".sr-only").first().textContent()) ?? "").trim()).toBe("Run · High-risk payment processing");
    await ctx.close();
  });
});

test.describe("search reach map", () => {
  test("the rings around the markers ripple while the map is on screen, and are off for reduced motion", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
    const p = await ctx.newPage();
    await p.goto("/", { waitUntil: "networkidle" });
    await p.locator("#reach").scrollIntoViewIfNeeded();
    await p.locator("#reach [role='img']").first().scrollIntoViewIfNeeded();
    const ripple = p.locator(".reach-ripple").first();
    await expect.poll(() => ripple.evaluate((e) => getComputedStyle(e).animationName)).toBe("reach-ripple");
    expect(await p.locator(".reach-ripple").count(), "two ripples per marker").toBeGreaterThanOrEqual(4);
    await ctx.close();

    const reduced = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const q = await reduced.newPage();
    await q.goto("/", { waitUntil: "networkidle" });
    await q.locator("#reach [role='img']").first().scrollIntoViewIfNeeded();
    expect(await q.locator(".reach-ripple").first().evaluate((e) => getComputedStyle(e).display)).toBe("none");
    await reduced.close();
  });
});

test.describe("home entrance", () => {
  const motion = { viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" as const };
  const anim = (p: import("@playwright/test").Page, selector: string) =>
    p.locator(selector).first().evaluate((e) => getComputedStyle(e).animationName);

  test("the hero performs its own entrance from the first paint, with no loader in front of it", async ({ browser }) => {
    const ctx = await browser.newContext(motion);
    const p = await ctx.newPage();
    const errors: string[] = [];
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto("/", { waitUntil: "load" });
    // Nothing covers the page and nothing blocks scrolling.
    expect(await p.locator(".intro").evaluate((e) => getComputedStyle(e).display), "no intro on a plain automated visit").toBe("none");
    expect(await p.evaluate(() => document.documentElement.classList.contains("intro-active"))).toBe(false);
    expect(await p.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe("hidden");
    // The headline lines rise out of their masks, the strip is dealt in, the header fades in.
    expect(await anim(p, ".hero-line-in")).toBe("hero-line-in");
    expect(await p.locator(".hero-line-in").count()).toBe(3);
    expect(await anim(p, ".hero-card")).toBe("hero-card-in");
    expect(await p.locator(".hero-card").count()).toBeGreaterThanOrEqual(8);
    expect(await anim(p, "body > header")).toBe("hero-header-in");
    // Once finished, everything rests fully visible and in place.
    await expect.poll(() => p.evaluate(() => document.getAnimations().filter((a) => /hero-/.test((a as CSSAnimation).animationName ?? "")).length), { timeout: 6000 }).toBe(0);
    for (const sel of [".hero-line-in", ".hero-card", ".hero-fade", "body > header"]) {
      const s = await p.locator(sel).first().evaluate((e) => {
        const cs = getComputedStyle(e);
        return { opacity: cs.opacity, transform: cs.transform };
      });
      expect(s.opacity, sel).toBe("1");
      expect(s.transform, sel).toBe("none");
    }
    expect(errors).toEqual([]);
    await ctx.close();
  });

  test("it is switched off for reduced motion and still finishes without JavaScript", async ({ browser }) => {
    const reduced = await browser.newContext({ ...motion, reducedMotion: "reduce" });
    const a = await reduced.newPage();
    await a.goto("/", { waitUntil: "load" });
    for (const sel of [".hero-line-in", ".hero-fade", ".hero-card", "body > header"]) expect(await anim(a, sel), sel).toBe("none");
    await expect(a.locator("h1")).toBeVisible();
    await reduced.close();

    // Pure CSS: with scripts off the same entrance plays and ends in the same place.
    const noJs = await browser.newContext({ ...motion, javaScriptEnabled: false });
    const b = await noJs.newPage();
    await b.goto("/", { waitUntil: "load" });
    await b.waitForTimeout(3500);
    await expect(b.locator("h1")).toBeVisible();
    expect(await b.locator(".hero-card").first().evaluate((e) => getComputedStyle(e).opacity)).toBe("1");
    expect(await b.locator(".hero-line-in").first().evaluate((e) => getComputedStyle(e).transform)).toBe("none");
    await noJs.close();
  });

  test("the entrance does not hurt layout stability", async ({ browser }) => {
    const ctx = await browser.newContext(motion);
    const p = await ctx.newPage();
    await p.addInitScript(() => {
      (window as unknown as { __cls: number }).__cls = 0;
      new PerformanceObserver((l) => {
        for (const e of l.getEntries() as unknown as { value: number; hadRecentInput: boolean }[]) if (!e.hadRecentInput) (window as unknown as { __cls: number }).__cls += e.value;
      }).observe({ type: "layout-shift", buffered: true });
    });
    await p.goto("/", { waitUntil: "load" });
    await p.waitForTimeout(3500);
    const cls = await p.evaluate(() => (window as unknown as { __cls: number }).__cls);
    expect(cls, "cumulative layout shift while the entrance plays").toBeLessThan(0.05);
    await ctx.close();
  });
});

test.describe("intro: the hero's strip of sites runs fast, slows, and dissolves into the hero", () => {
  const motion = { viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" as const };
  const up = (p: import("@playwright/test").Page) => p.evaluate(() => document.documentElement.classList.contains("intro-active"));
  // The page skips the intro for browsers that announce they are automated, so tests present as a real visitor.
  const asVisitor = (ctx: import("@playwright/test").BrowserContext) => ctx.addInitScript(() => Object.defineProperty(navigator, "webdriver", { get: () => false }));

  test("the first visit in a session runs the strip fast through the middle, slows it, hands over to the hero and leaves it in place", async ({ browser }) => {
    const ctx = await browser.newContext(motion);
    await asVisitor(ctx);
    const p = await ctx.newPage();
    const errors: string[] = [];
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto("/", { waitUntil: "commit" });
    await expect(p.locator(".intro")).toBeVisible();
    expect(await up(p)).toBe(true);
    expect(await p.locator(".intro").getAttribute("aria-hidden")).toBe("true");
    expect(await p.evaluate(() => getComputedStyle(document.body).overflow), "page is locked while it plays").toBe("hidden");
    // The hero's own strip is lifted above the navy, centred on the screen and running far faster than normal.
    await expect.poll(() => p.evaluate(() => document.documentElement.classList.contains("intro-strip-on"))).toBe(true);
    const during = await p.locator("[data-hero-strip]").evaluate((e) => {
      const r = e.getBoundingClientRect();
      // The fast part is a slide laid over the marquee, run by the browser off the main thread (no per-frame script).
      const slides = e.getAnimations({ subtree: true }).filter((a) => !(a instanceof CSSAnimation) && a.playState === "running");
      // The hero's own first moments are held until the intro hands over (checked in the same instant, so load cannot skew it).
      const held = document.getAnimations().some((a) => /hero-line-in/.test((a as CSSAnimation).animationName ?? "") && a.playState === "paused");
      return { centre: r.top + r.height / 2, view: window.innerHeight / 2, z: getComputedStyle(e).zIndex, slides: slides.length, held };
    });
    expect(Math.abs(during.centre - during.view), "strip is centred on the screen").toBeLessThan(4);
    expect(during.z).toBe("310");
    expect(during.slides, "the fast slide is running on both marquee groups").toBeGreaterThanOrEqual(2);
    expect(during.held, "the hero waits behind the intro").toBe(true);
    const card = p.locator(".hero-card").first();
    const x1 = await card.evaluate((e) => e.getBoundingClientRect().left);
    await p.waitForTimeout(150);
    const x2 = await card.evaluate((e) => e.getBoundingClientRect().left);
    expect(Math.abs(x2 - x1) / 0.15, "strip is really moving fast (px per second)").toBeGreaterThan(100);
    // It hands over on its own, and everything ends where the hero normally has it.
    await expect.poll(() => up(p), { timeout: 10000 }).toBe(false);
    await expect(p.locator(".intro")).toBeHidden({ timeout: 6000 });
    await expect.poll(() => p.evaluate(() => document.getAnimations().filter((a) => /hero-/.test((a as CSSAnimation).animationName ?? "")).length), { timeout: 6000 }).toBe(0);
    const after = await p.locator("[data-hero-strip]").evaluate((e) => ({
      transform: getComputedStyle(e).transform,
      z: getComputedStyle(e).zIndex,
      rate: Math.max(...e.getAnimations({ subtree: true }).filter((a) => (a as CSSAnimation).animationName === "marquee").map((a) => a.playbackRate)),
      slides: e.getAnimations({ subtree: true }).filter((a) => !(a instanceof CSSAnimation) && a.playState === "running").length,
    }));
    expect(after.transform, "strip is back in its place in the hero").toBe("none");
    expect(after.z).toBe("auto");
    expect(after.rate, "the marquee itself never changed pace, so it cannot stall").toBe(1);
    expect(after.slides, "the fast slide has finished").toBe(0);
    for (const cls of ["intro-active", "intro-exit", "intro-landing", "intro-skip"]) expect(await p.evaluate((k) => document.documentElement.classList.contains(k), cls), cls).toBe(false);
    expect(await p.locator("[data-header-logo] img").evaluate((e) => getComputedStyle(e).opacity)).toBe("1");
    expect(await p.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe("hidden");
    expect(await p.evaluate(() => sessionStorage.getItem("pm-intro"))).toBe("1");
    // The cards were not dealt in a second time.
    expect(await p.locator(".hero-card").first().evaluate((e) => getComputedStyle(e).animationName)).toBe("none");
    await expect(p.locator("h1")).toBeVisible();
    expect(errors).toEqual([]);
    await ctx.close();
  });

  test("a click skips it quickly", async ({ browser }) => {
    const ctx = await browser.newContext(motion);
    await asVisitor(ctx);
    const p = await ctx.newPage();
    await p.goto("/", { waitUntil: "commit" });
    await expect(p.locator(".intro")).toBeVisible();
    await expect.poll(() => p.evaluate(() => sessionStorage.getItem("pm-intro"))).toBe("1"); // hydrated and running
    const started = Date.now();
    await p.mouse.click(700, 120);
    await expect(p.locator(".intro")).toBeHidden({ timeout: 3000 });
    expect(Date.now() - started, "skipping is faster than the full hand-over").toBeLessThan(3500);
    expect(await up(p)).toBe(false);
    expect(await p.locator("[data-hero-strip]").evaluate((e) => getComputedStyle(e).transform)).toBe("none");
    await ctx.close();
  });

  test("it never runs for reduced motion, without JavaScript, on other pages, or twice in a session", async ({ browser }) => {
    const reduced = await browser.newContext({ ...motion, reducedMotion: "reduce" });
    await asVisitor(reduced);
    const a = await reduced.newPage();
    await a.goto("/", { waitUntil: "networkidle" });
    expect(await up(a)).toBe(false);
    expect(await a.locator(".intro").evaluate((e) => getComputedStyle(e).display)).toBe("none");
    await expect(a.locator("h1")).toBeVisible();
    await reduced.close();

    const noJs = await browser.newContext({ ...motion, javaScriptEnabled: false });
    await asVisitor(noJs);
    const b = await noJs.newPage();
    await b.goto("/", { waitUntil: "load" });
    expect(await b.locator(".intro").evaluate((e) => getComputedStyle(e).display)).toBe("none");
    await expect(b.locator("h1")).toBeVisible();
    await noJs.close();

    const other = await browser.newContext(motion);
    await asVisitor(other);
    const c = await other.newPage();
    await c.goto("/services", { waitUntil: "networkidle" });
    expect(await c.locator(".intro").count()).toBe(0);
    expect(await up(c)).toBe(false);
    await other.close();

    const twice = await browser.newContext(motion);
    await asVisitor(twice);
    const d = await twice.newPage();
    await d.goto("/", { waitUntil: "commit" });
    // First wait until the visit has really been recorded (the intro is "not active" before the page has even started).
    await expect.poll(() => d.evaluate(() => sessionStorage.getItem("pm-intro")), { timeout: 15000 }).toBe("1");
    await expect.poll(() => up(d), { timeout: 10000 }).toBe(false);
    await d.goto("/", { waitUntil: "networkidle" });
    expect(await up(d)).toBe(false);
    await twice.close();
  });

  test("with a real scrollbar the layout does not jump and the wordmark lands exactly on the header logo", async ({ baseURL }) => {
    // Headless browsers hide the scrollbar, which would hide the problem, so launch one that shows it.
    const browser = await chromium.launch({ channel: "msedge", ignoreDefaultArgs: ["--hide-scrollbars"] });
    const ctx = await browser.newContext({ baseURL, ...motion });
    await asVisitor(ctx);
    const page = await ctx.newPage();
    const layout = () => page.evaluate(() => ({ body: Math.round(document.body.getBoundingClientRect().width), left: document.querySelector("h1")!.getBoundingClientRect().left }));
    await page.goto("/", { waitUntil: "commit" });
    await expect.poll(() => up(page)).toBe(true);
    await expect(page.locator("h1")).toBeAttached();
    const during = await layout();
    // Follow the flying wordmark until the hand-off completes, remembering where it was last.
    const last = await page.evaluate(
      () =>
        new Promise<{ left: number; top: number; width: number } | null>((res) => {
          let r: { left: number; top: number; width: number } | null = null;
          const t0 = performance.now();
          const step = () => {
            const i = document.querySelector<HTMLElement>(".intro");
            const m = document.querySelector<HTMLElement>(".intro-logo");
            if (!i || !m || i.dataset.phase === "done" || performance.now() - t0 > 12000) return res(r);
            if (i.dataset.phase === "exit") {
              const b = m.getBoundingClientRect();
              r = { left: b.left, top: b.top, width: b.width };
            }
            requestAnimationFrame(step);
          };
          step();
        }),
    );
    expect(last, "the wordmark flew").not.toBeNull();
    const header = await page.locator("[data-header-logo] img").evaluate((e) => {
      const b = e.getBoundingClientRect();
      return { left: b.left, top: b.top, width: b.width };
    });
    expect(Math.abs(last!.left - header.left), "lands on the header logo (left)").toBeLessThan(3);
    expect(Math.abs(last!.top - header.top), "lands on the header logo (top)").toBeLessThan(3);
    expect(Math.abs(last!.width - header.width), "lands on the header logo (size)").toBeLessThan(3);
    const after = await layout();
    expect(after.body, "the page keeps its width").toBe(during.body);
    expect(Math.abs(after.left - during.left), "the headline does not jump sideways").toBeLessThan(2);
    await browser.close();
  });
});
