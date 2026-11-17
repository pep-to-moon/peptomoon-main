import { expect, test } from "@playwright/test";

test.describe("desktop navigation and components", () => {
  test.use({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });

  test("services menu opens, lists services and closes with Escape", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Services" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const link = page.locator("#mega-menu").getByRole("link", { name: /Payment processing and merchant infrastructure/ });
    await expect(link).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(link).toBeHidden();
  });

  test("the services menu closes after navigating", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Services" }).click();
    await page.locator("#mega-menu").getByRole("link", { name: /Fulfillment and logistics/ }).click();
    await expect(page).toHaveURL(/\/services\/fulfillment-logistics$/);
    await expect(page.getByRole("button", { name: "Services" })).toHaveAttribute("aria-expanded", "false");
  });

  test("the skip link is the first focusable element and works", async ({ page }) => {
    await page.goto("/about");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
  });

  test("problem list expands one item at a time and is keyboard operable", async ({ page }) => {
    await page.goto("/");
    const first = page.getByRole("button", { name: /Payment processing uncertainty/ });
    const second = page.getByRole("button", { name: /Unreliable suppliers/ });
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await second.focus();
    await page.keyboard.press("Enter");
    await expect(second).toHaveAttribute("aria-expanded", "true");
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByText("We never invent supplier relationships, results or certifications.")).toBeVisible();
  });

  test("the portfolio keeps live links that open safely, with motion reduced", async ({ page }) => {
    await page.goto("/");
    const live = page.getByRole("link", { name: "Visit veracuelabs.com" });
    await live.scrollIntoViewIfNeeded();
    await expect(live).toHaveAttribute("href", "https://veracuelabs.com/");
    await expect(live).toHaveAttribute("rel", /noopener/);
    await expect(live).toHaveAttribute("target", "_blank");
  });

  test("dashboard demo tabs respond to the arrow keys and are labelled as sample data", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Illustrative sample data, not real results")).toBeVisible();
    const orders = page.getByRole("tab", { name: "Orders" });
    await orders.focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("tab", { name: "Payments" })).toHaveAttribute("aria-selected", "true");
  });

  test("case study pages show verified sections and never a pending marker in a production build", async ({ page }) => {
    await page.goto("/case-studies/veracue-labs");
    await expect(page.getByRole("heading", { name: "Website architecture" })).toBeVisible();
    await expect(page.getByText(/Needs confirmation/)).toHaveCount(0);
    await expect(page.getByText(/\[\[CONFIRM/)).toHaveCount(0);
  });

  test("unpublished case studies and regulatory articles return 404 in a production build", async ({ request }) => {
    expect((await request.get("/case-studies/helix-bio-chem")).status()).toBe(404);
    expect((await request.get("/resources/503a-503b-and-ruo-retail")).status()).toBe(404);
  });
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });

  test("menu opens as a dialog, lists services and closes after choosing a link", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await dialog.getByText("Services", { exact: true }).click();
    await dialog.getByRole("link", { name: "Payment processing and merchant infrastructure" }).click();
    await expect(page).toHaveURL(/\/services\/payment-processing$/);
    await expect(dialog).toBeHidden();
  });

  test("Escape closes the mobile menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
  });
});
