import { FaqList } from "@/components/ui/faq-list";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import type { Faq } from "@/content/types";

const brand = siteConfig.name;

const items: Faq[] = [
  {
    q: `Does ${brand} also provide peptides?`,
    a: `${brand} is a business-to-business company and does not sell to consumers. Among its services for businesses are wholesale supply of research-use-only peptides, fulfillment, dropshipping and 3PL, alongside websites, payments, supplier documentation, reporting, marketing infrastructure and review. Research-use-only products are labeled for laboratory research use only and are not for human or veterinary use. Tell us what you are looking for through the questionnaire and we will reply directly.`,
  },
  {
    q: "Why do payment providers keep declining or limiting RUO stores, and what can we do about it?",
    a: "Many providers restrict this category in their policies, and a provider compares your application with your website, your policies and your behavior. Mismatches are the common trigger. Make the business identity, product descriptions and policies agree everywhere, read the contract for reserves and holds, watch your decline and chargeback rates and keep a plan for interruption. Nobody can promise approval, because the decision is the provider's.",
  },
  {
    q: "How do I know a supplier's lab report is real?",
    a: "Check that the report names a laboratory you can contact, ties to the exact batch on your vial, shows the method and the underlying data, and includes an identity result as well as a purity figure. Then confirm it with the laboratory using details you found yourself. A purity number with no laboratory, method or data is a claim, not evidence.",
  },
  {
    q: "What usually breaks first when an RUO store grows?",
    a: "Structure. Prices and stock disagree between the page and the cart, batch documents point to retired batches, notices differ from page to page and categories are not real pages search engines can find. Modeling the catalog as data, with batches and documents as part of it, prevents most of this, and it is far cheaper to build in than to repair later.",
  },
  {
    q: "Are you a law firm, and does your review make us compliant?",
    a: "We are not a law firm and we do not give legal advice. A review helps you find and organize avoidable risk. It is not an approval, and it does not make a business compliant. We work alongside your own qualified counsel.",
  },
  {
    q: "Can you guarantee payment approval or search rankings?",
    a: "No one can. Payment providers make their own risk decisions, and search engines decide their own rankings. We build the strongest foundation we can and tell you plainly what is outside our control.",
  },
  {
    q: "Can I start with a single service?",
    a: "Yes. Tell us what you need through the questionnaire, whether that is one system or the whole set. The first conversation decides the scope.",
  },
  {
    q: "We already have a website. Can you work with it?",
    a: "Yes. We can redesign it, migrate it, add systems around it or maintain it. For redesigns we plan the migration so existing search visibility is protected as far as possible.",
  },
  {
    q: "How do you handle regulatory information on your own site?",
    a: "We cite primary sources, date every statement and say when we have not verified something ourselves. Rules change, so treat anything we publish as a starting point for a conversation with qualified professionals.",
  },
  {
    q: "What do you need from us to begin?",
    a: "The short questionnaire on the contact page tells us about your situation. We read it and reply to you directly.",
  },
  {
    q: "What happens to the information I send?",
    a: "We use it to respond to your enquiry. The Privacy Policy explains what we collect, who processes it and how to ask for it to be removed.",
  },
];

export function HomeFaq() {
  return (
    <Section labelledBy="faq-title">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">Questions</p>
            <h2 id="faq-title" className="display display-lg mt-5">
              Questions we hear first.
            </h2>
            <p className="mt-5 max-w-[34ch] text-ink-soft">The things people ask us first, answered plainly.</p>
          </div>
        </div>
        <div className="lg:col-span-8">
          <FaqList items={items} />
        </div>
      </div>
    </Section>
  );
}
