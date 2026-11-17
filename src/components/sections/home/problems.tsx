import { Section, SectionIntro } from "@/components/ui/section";
import { ProblemList } from "./problem-list";

export type Problem = {
  n: string;
  title: string;
  see: string;
  do: string;
  wont: string;
  href: string;
  linkLabel: string;
};

const problems: Problem[] = [
  {
    n: "01",
    title: "Payment processing uncertainty",
    see: "Accounts restricted without warning, balances held, settlement delayed, and a business model that does not fit a provider's terms.",
    do: "We assess underwriting requirements, identify providers whose terms genuinely support your model, integrate supported systems and set up monitoring and reporting.",
    wont: "We cannot promise approval or uninterrupted processing.",
    href: "/services/payment-processing",
    linkLabel: "Payment infrastructure",
  },
  {
    n: "02",
    title: "Unreliable suppliers",
    see: "Suppliers you cannot verify, specifications that change between batches, and documents that do not match the product.",
    do: "Supplier verification, documentation review, sourcing transparency and structured quality-control records.",
    wont: "We never invent supplier relationships, results or certifications.",
    href: "/services/supplier-verification",
    linkLabel: "Supplier verification",
  },
  {
    n: "03",
    title: "Regulatory uncertainty",
    see: "A research-use label mistaken for compliance, with content elsewhere on the site that tells a different story.",
    do: "Compliance-oriented website and content reviews, documentation organisation and coordination with qualified professionals.",
    wont: "We are not a law firm, and a review is not an approval.",
    href: "/services/compliance-support",
    linkLabel: "Compliance support",
  },
  {
    n: "04",
    title: "Poor website infrastructure",
    see: "Outdated, slow sites with weak product organisation and category pages that search engines cannot see.",
    do: "Custom e-commerce with strong architecture, technical SEO, performance and conversion-focused design.",
    wont: "We cannot promise rankings or sales.",
    href: "/services/ruo-peptide-website-development",
    linkLabel: "Website development",
  },
  {
    n: "05",
    title: "Fragmented operations",
    see: "Payments, orders, affiliates, email, fulfillment and support running in tools that do not agree with each other.",
    do: "Integrated operational infrastructure and dashboards built on one shared order record.",
    wont: "A dashboard shows what your systems record. It cannot fix bad source data.",
    href: "/services/business-dashboards",
    linkLabel: "Business dashboards",
  },
  {
    n: "06",
    title: "Marketing and growth limits",
    see: "Messy advertising accounts, tracking that misses events, and affiliate and email programmes run by hand.",
    do: "Coordinated tracking, reporting, email systems and affiliate tools that share one view of the customer.",
    wont: "Whether an advertising platform accepts your category is not ours to promise.",
    href: "/services/meta-advertising",
    linkLabel: "Marketing infrastructure",
  },
];

export function Problems() {
  return (
    <Section labelledBy="problems-title">
      <div className="container-x">
        <SectionIntro
          label="Problems and solutions"
          titleId="problems-title"
          title={
            <>
              The RUO industry is complicated. Your infrastructure doesn&apos;t have to be.
            </>
          }
        >
          <p>
            Six problems come up again and again. For each one: what we see, what we do about it, and what we will not
            promise.
          </p>
        </SectionIntro>
        <ProblemList problems={problems} />
      </div>
    </Section>
  );
}
