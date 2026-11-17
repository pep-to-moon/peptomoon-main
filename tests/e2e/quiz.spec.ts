import { expect, test, type Page } from "@playwright/test";

test.use({ reducedMotion: "reduce", viewport: { width: 1280, height: 900 } });

/** Options are visually hidden inputs inside a label card, so a person clicks the card. Tests do the same. */
const choose = (page: Page, text: string | RegExp) =>
  page.locator("label").filter({ hasText: text }).first().click({ position: { x: 12, y: 12 } });

const next = (page: Page) => page.getByRole("button", { name: "Continue" }).click();

/** Answers the arithmetic quick check by reading its question from the label. */
async function solveQuickCheck(page: Page) {
  const input = page.getByLabel(/Quick check/);
  await expect(input).toBeVisible();
  const label = await page.locator("label").filter({ hasText: /Quick check/ }).innerText();
  const m = label.match(/(\d+)\s*([+\-\u00d7])\s*(\d+)/);
  if (!m) throw new Error(`could not read the quick check: ${label}`);
  const a = Number(m[1]);
  const b = Number(m[3]);
  await input.fill(String(m[2] === "+" ? a + b : m[2] === "-" ? a - b : a * b));
}

/** Fills only what is required: one service, a name, an email and consent. */
async function fillRequired(page: Page) {
  await page.goto("/contact");
  await choose(page, "Payment processing");
  await next(page);
  await page.getByLabel("Your name").fill("Test Person");
  await page.getByLabel("Email", { exact: true }).fill("test@example.com");
  await page.locator("label").filter({ hasText: /I agree/ }).click({ position: { x: 4, y: 4 } });
  await expect(page.getByRole("checkbox", { name: /I agree/ })).toBeChecked();
  await solveQuickCheck(page);
}

test("the form has two short steps and validates the first before moving on", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByText("Step 1 of 2: What you need")).toBeVisible();

  await next(page);
  await expect(page.getByRole("alert").filter({ hasText: /at least one service/i })).toBeVisible();

  await choose(page, "Payment processing");
  await next(page);
  await expect(page.getByText("Step 2 of 2: Where to reply")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Where should we reply/ })).toBeVisible();
});

test("only a name, an email and consent are required on the last step", async ({ page }) => {
  await page.goto("/contact");
  await choose(page, "Payment processing");
  await next(page);
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByLabel("Your name")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText(/Enter a valid email address/)).toBeVisible();
  await expect(page.getByText(/Please agree so we can contact you/)).toBeVisible();
  // The optional fields raise no complaints when left empty.
  await expect(page.getByText(/web address/)).toHaveCount(0);
});

test("the website address is optional for every situation and is only checked when given", async ({ page }) => {
  await page.route("**/api/inquiry", (route) => route.fulfill({ status: 202, contentType: "application/json", body: JSON.stringify({ ok: true }) }));
  await page.goto("/contact");
  await choose(page, /I already have a website/i);
  await choose(page, "Website redesign");
  await next(page);

  // Submitting with no website at all works, even though the visitor said they already have one.
  await page.getByLabel("Your name").fill("Test Person");
  await page.getByLabel("Email", { exact: true }).fill("test@example.com");
  await page.locator("label").filter({ hasText: /I agree/ }).click({ position: { x: 4, y: 4 } });
  await solveQuickCheck(page);

  // A malformed address is flagged, and the optional section opens so the message is visible.
  await page.getByText("Add more detail").click();
  await page.getByLabel("Website address").fill("not a url");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByText(/does not look like a web address/)).toBeVisible();

  // A bare domain is accepted, and so is nothing at all.
  await page.getByLabel("Website address").fill("example.com");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByText("Thank you. We have your enquiry.")).toBeVisible();
});

test("a phone number is optional and only checked when given", async ({ page }) => {
  await page.route("**/api/inquiry", (route) => route.fulfill({ status: 202, contentType: "application/json", body: JSON.stringify({ ok: true }) }));
  await fillRequired(page);
  const phone = page.getByLabel("Phone number");
  await expect(phone).toBeVisible();
  await phone.fill("not a number");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByText(/Enter a phone number with its country code/)).toBeVisible();
  await phone.fill("+1 555 010 0100");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByText("Thank you. We have your enquiry.")).toBeVisible();
});

test("choosing complete infrastructure clears the other services", async ({ page }) => {
  await page.goto("/contact");
  await choose(page, "Payment processing");
  await choose(page, "Email marketing");
  await expect(page.getByRole("checkbox", { name: "Payment processing" })).toBeChecked();
  await choose(page, "Complete business infrastructure");
  await expect(page.getByRole("checkbox", { name: "Payment processing" })).not.toBeChecked();
  await expect(page.getByRole("checkbox", { name: "Email marketing" })).not.toBeChecked();
  await expect(page.getByRole("checkbox", { name: "Complete business infrastructure" })).toBeChecked();
});

test("a service page can preselect its service, and the situation question is optional", async ({ page }) => {
  await page.goto("/contact?service=payment-processing&status=new-business");
  await expect(page.getByRole("checkbox", { name: "Payment processing" })).toBeChecked();
  await expect(page.getByRole("radio", { name: /launching something new/i })).toBeChecked();
  // Clicking the chosen situation again clears it.
  await page.locator("label").filter({ hasText: /launching something new/i }).click();
  await expect(page.getByRole("radio", { name: /launching something new/i })).not.toBeChecked();
});

test("success is shown only after the backend accepts the submission", async ({ page }) => {
  await page.route("**/api/inquiry", (route) => route.fulfill({ status: 202, contentType: "application/json", body: JSON.stringify({ ok: true }) }));
  await fillRequired(page);
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByText("Thank you. We have your enquiry.")).toBeVisible();
});

test("a backend failure shows an honest error and keeps the answers", async ({ page }) => {
  await page.route("**/api/inquiry", (route) =>
    route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ ok: false, error: "not_configured" }) }),
  );
  await fillRequired(page);
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByRole("alert").filter({ hasText: "nothing was submitted" })).toBeVisible();
  await expect(page.getByText("Thank you. We have your enquiry.")).toHaveCount(0);
  await expect(page.getByLabel("Your name")).toHaveValue("Test Person");
});

test("a network failure is also reported honestly", async ({ page }) => {
  await page.route("**/api/inquiry", (route) => route.abort("failed"));
  await fillRequired(page);
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByRole("alert").filter({ hasText: "nothing was submitted" })).toBeVisible();
  await expect(page.getByText("Thank you. We have your enquiry.")).toHaveCount(0);
});

test("consent is required", async ({ page }) => {
  await fillRequired(page);
  await page.locator("label").filter({ hasText: /I agree/ }).click({ position: { x: 4, y: 4 } });
  await expect(page.getByRole("checkbox", { name: /I agree/ })).not.toBeChecked();
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByText(/Please agree so we can contact you/)).toBeVisible();
});
