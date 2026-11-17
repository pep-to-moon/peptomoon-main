import type { Metadata } from "next";
import { Suspense } from "react";
import { Quiz } from "@/components/quiz/quiz";
import { ButtonLink } from "@/components/ui/button";
import { FaqSection } from "@/components/ui/faq-section";
import { contactFaqs } from "@/content/page-faqs";

import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { webPageSchema } from "@/lib/seo/schema";

const title = `Contact ${siteConfig.name} | Start a Project`;
const description =
  "Tell us about your RUO peptide business in two short steps. We read every answer and reply to you directly.";

export const metadata: Metadata = buildMetadata({ title, description, path: "/contact" });

const next = [
  ["We read it", "A person reads your answers and, if you share a website, looks at it."],
  ["We reply directly", "With questions or a suggested next step."],
  ["You decide", "Nothing is agreed until you say so, and nothing is sold in this form."],
];

const emailAsks = [
  "What you need: a website, payments, fulfillment, search visibility, an audit, or something else.",
  "Where you are: a new business, an existing site, or one specific problem.",
  "Your name, and your website if you have one. A website address is never required.",
];

/** Shown on the live site while the online questionnaire cannot deliver yet, so nobody fills in a form that cannot send. */
function EmailPanel({ email }: { email: string }) {
  const body = "Hello,\n\nWhat I need:\n\nWhere I am (new business, existing site, or a specific problem):\n\nMy website (optional):\n\nName:\n";
  const href = `mailto:${email}?subject=${encodeURIComponent("Project enquiry")}&body=${encodeURIComponent(body)}`;
  return (
    <div className="rounded-[1.25rem] bg-white p-6 ring-1 ring-ink/15 sm:p-9">
      <h2 className="display display-md">Email us your enquiry</h2>
      <p className="mt-4 max-w-[52ch] text-ink-soft">Our online questionnaire is being set up. For now a short email is all we need, and we reply to you directly.</p>
      <p className="label mt-8 text-ink-soft">What to include</p>
      <ul className="mt-3 border-b border-ink/15">
        {emailAsks.map((t) => (
          <li key={t} className="border-t border-ink/15 py-3">
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <ButtonLink href={href} size="lg">
          Write to {email}
        </ButtonLink>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const email = siteConfig.contact.email;
  // On the live site the form is offered only when online delivery is set up. Elsewhere it always shows, for testing.
  const live = process.env.VERCEL_ENV === "production";
  const showForm = !live || Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
  return (
    <>
      <JsonLd data={webPageSchema("ContactPage", "Contact", description, "/contact")} />
      <section aria-labelledby="contact-title" className="pb-[clamp(4rem,9vw,8rem)] pt-[clamp(6.25rem,8.5vw,7.75rem)]">
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
          <div className="mt-8 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h1 id="contact-title" className="display display-xl max-w-[10ch]">
                Tell us what you need.
              </h1>
              <p className="mt-7 max-w-[44ch] text-[1.125rem] text-ink/80">
                {showForm ? "Two short steps. Pick what you need, leave a name and an email, and we will take it from there." : "Send us a short email and we will take it from there."}
              </p>
              <ol className="mt-10 border-b border-ink/20">
                {next.map(([t, d], i) => (
                  <li key={t} className="grid grid-cols-[2.75rem_1fr] items-start gap-4 border-t border-ink/20 py-5">
                    <span className="font-display text-[0.95rem] font-semibold text-blue">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-display font-bold">{t}</p>
                      <p className="text-ink-soft">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {showForm && email && (
                <p className="mt-8 text-[0.95rem] text-ink-soft">
                  Prefer email? Write to{" "}
                  <a href={`mailto:${email}`} className="font-semibold text-blue underline underline-offset-4">
                    {email}
                  </a>
                  .
                </p>
              )}
            </div>
            <div className="lg:col-span-7">
              {showForm ? (
                <Suspense fallback={<div className="min-h-[30rem] rounded-[1.25rem] bg-white ring-1 ring-ink/10" aria-busy="true" />}>
                  <Quiz fallbackEmail={email} />
                </Suspense>
              ) : (
                <EmailPanel email={email} />
              )}
            </div>
          </div>
        </div>
      </section>
      <FaqSection id="contact-faq" title="Before you send it" items={contactFaqs} className="pt-0" />
    </>
  );
}
