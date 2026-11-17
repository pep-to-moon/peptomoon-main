import AxeBuilder from "@axe-core/playwright";
import { expect, test, type APIRequestContext } from "@playwright/test";
import { allArticles } from "../../src/content/articles";
import { caseStudies } from "../../src/content/case-studies";
import { services } from "../../src/content/services";

const routes = [
  "/",
  "/services",
  ...services.map((s) => `/services/${s.slug}`),
  "/case-studies",
  ...caseStudies.map((c) => `/case-studies/${c.slug}`),
  "/resources",
  // Production builds hide regulatory articles until counsel review is recorded, so the tests expect the same.
  ...allArticles.filter((a) => !a.needsCounselReview || a.counselReviewedOn).map((a) => `/resources/${a.slug}`),
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
  "/disclaimer",
  "/cookie-policy",
];

/** Fetches a quick-check question from the API and answers it, as the form does. */
async function solvedChallenge(request: APIRequestContext) {
  const c = (await (await request.get("/api/challenge")).json()) as { question: string; token: string };
  const m = c.question.match(/(\d+)\s*([+\-\u00d7])\s*(\d+)/);
  if (!m) throw new Error(`unreadable question: ${c.question}`);
  const a = Number(m[1]);
  const b = Number(m[3]);
  return { captchaToken: c.token, captchaAnswer: String(m[2] === "+" ? a + b : m[2] === "-" ? a - b : a * b) };
}

// The API rate-limits per client address, so each API test presents its own address.
const uniqueIp = () => `203.0.113.${Math.floor(Math.random() * 250) + 1}`;

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

for (const vp of viewports) {
  test.describe(`${vp.name} basics`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height }, reducedMotion: "reduce" });

    for (const route of routes) {
      test(`${route}`, async ({ page }) => {
        const errors: string[] = [];
        page.on("console", (m) => {
          if (m.type() === "error") errors.push(m.text());
        });
        page.on("pageerror", (e) => errors.push(e.message));

        const res = await page.goto(route, { waitUntil: "networkidle" });
        expect(res?.status()).toBe(200);

        await expect(page.locator("h1")).toHaveCount(1);

        const title = await page.title();
        expect(title.length, `title length: ${title}`).toBeLessThanOrEqual(62);
        const desc = (await page.locator('meta[name="description"]').getAttribute("content")) ?? "";
        expect(desc.length, `description length ${desc.length}`).toBeGreaterThanOrEqual(70);
        expect(desc.length, `description length ${desc.length}`).toBeLessThanOrEqual(170);

        const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
        expect(canonical).toMatch(new RegExp(`${route === "/" ? "" : route.replace(/[/\\-]/g, "\\$&")}$`));

        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
        expect(overflow, "horizontal overflow").toBe(false);

        const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
        expect(blocks.length).toBeGreaterThan(0);
        for (const b of blocks) JSON.parse(b);
        expect(blocks.join(" ")).not.toContain("FAQPage");

        expect(errors, "console errors").toEqual([]);
      });
    }
  });
}

test.describe("accessibility (axe, WCAG 2.x A and AA)", () => {
  test.use({ reducedMotion: "reduce" });
  for (const vp of viewports) {
    for (const route of routes) {
      test(`${vp.name} ${route}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(route, { waitUntil: "networkidle" });
        // On phones, far-below-the-fold sections use content-visibility and are not rendered until near the viewport.
        // Contrast cannot be measured for content the browser has chosen not to render, so render everything for the scan.
        await page.addStyleTag({ content: "*{content-visibility:visible !important}" });
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
        const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
        expect(
          serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes) e.g. ${v.nodes[0]?.target.join(" ")}`),
        ).toEqual([]);
      });
    }
  }
});

test.describe("site infrastructure", () => {
  test("unknown page returns a real 404 with noindex", async ({ request, page }) => {
    const res = await request.get("/this-page-does-not-exist");
    expect(res.status()).toBe(404);
    await page.goto("/this-page-does-not-exist");
    await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
  });

  test("sitemap lists every indexable route and robots points to it", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const r of routes) expect(xml, r).toContain(r === "/" ? "<loc>http" : r);
    expect(xml).not.toContain("/api/");
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Sitemap:");
    expect(robots).toContain("Disallow: /api/");
  });

  test("robots welcomes search bots, AI crawlers and agents", async ({ request }) => {
    const robots = await (await request.get("/robots.txt")).text();
    for (const agent of ["OAI-SearchBot", "ChatGPT-User", "GPTBot", "Claude-SearchBot", "Claude-User", "ClaudeBot", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "CCBot", "Amazonbot"]) {
      expect(robots, agent).toMatch(new RegExp(`^User-agent: ${agent}$`, "im"));
    }
    expect(robots).toContain("Disallow: /api/");
    expect(robots).not.toMatch(/Disallow: \/\s*$/m);
  });

  test("llms.txt and llms-full.txt are served as plain text and cover every page", async ({ request }) => {
    for (const file of ["/llms.txt", "/llms-full.txt"]) {
      const res = await request.get(file);
      expect(res.status(), file).toBe(200);
      expect(res.headers()["content-type"], file).toContain("text/plain");
      const body = await res.text();
      expect(body.startsWith("# "), file).toBe(true);
      expect(body, file).not.toContain("\u2014");
      for (const s of services) expect(body, `${file} ${s.slug}`).toContain(`/services/${s.slug}`);
      for (const a of allArticles.filter((x) => !x.needsCounselReview || x.counselReviewedOn)) expect(body, `${file} ${a.slug}`).toContain(`/resources/${a.slug}`);
    }
    const index = await (await request.get("/llms.txt")).text();
    expect(index).toContain("## Services");
    expect(index).toContain("llms-full.txt");
  });

  test("the contact API never reports success when it cannot deliver", async ({ request }) => {
    const res = await request.post("/api/inquiry", {
      headers: { "x-forwarded-for": uniqueIp() },
      data: {
        status: "new-business",
        services: ["payment-processing"],
        websiteUrl: "",
        requirements: "Testing the failure path of the API.",
        challenges: "",
        name: "Test Person",
        business: "Test Business",
        email: "test@example.com",
        consent: true,
        startedAt: Date.now() - 10_000,
        ...(await solvedChallenge(request)),
      },
    });
    // No email provider is configured in the test build, so the only honest answers are 503 or 502.
    expect([502, 503]).toContain(res.status());
    expect((await res.json()).ok).toBe(false);
  });

  test("the quick check issues a question and rejects wrong or missing answers", async ({ request }) => {
    const c = (await (await request.get("/api/challenge")).json()) as { question: string; token: string };
    expect(c.question).toMatch(/^What is \d+ [+\-\u00d7] \d+\?$/);
    expect(c.token.length).toBeGreaterThan(20);
    const base = {
      status: "new-business",
      services: ["payment-processing"],
      websiteUrl: "",
      requirements: "",
      challenges: "",
      name: "Test Person",
      business: "",
      email: "test@example.com",
      consent: true,
      startedAt: Date.now() - 10_000,
    };
    const wrong = await request.post("/api/inquiry", { headers: { "x-forwarded-for": uniqueIp() }, data: { ...base, captchaToken: c.token, captchaAnswer: "999" } });
    expect(wrong.status()).toBe(400);
    expect((await wrong.json()).error).toBe("captcha_failed");
    const forged = await request.post("/api/inquiry", { headers: { "x-forwarded-for": uniqueIp() }, data: { ...base, captchaToken: `${c.token}x`, captchaAnswer: "1" } });
    expect((await forged.json()).error).toBe("captcha_failed");
    const missing = await request.post("/api/inquiry", { headers: { "x-forwarded-for": uniqueIp() }, data: base });
    expect((await missing.json()).error).toBe("captcha_failed");
  });

  test("the contact API rejects invalid input", async ({ request }) => {
    const res = await request.post("/api/inquiry", { headers: { "x-forwarded-for": uniqueIp() }, data: { status: "nope" } });
    expect(res.status()).toBe(400);
    expect((await res.json()).fieldErrors).toBeTruthy();
  });
});
