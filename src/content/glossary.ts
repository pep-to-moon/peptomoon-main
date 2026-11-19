export type GlossaryTerm = {
  slug: string;
  term: string;
  /** One standalone definition of 25 to 60 words, so it can be quoted without the rest of the page. */
  definition: string;
  /** Slug of a guide or service page that goes deeper, when there is one. */
  see?: { label: string; href: string };
};

/** Plain definitions only. No product use, dosing or outcome content, and no legal conclusions. */
export const glossary: GlossaryTerm[] = [
  {
    slug: "batch-number",
    term: "Batch number (lot number)",
    definition:
      "An identifier for one production run of a product. A laboratory report is only meaningful for the batch it names, so the batch number on the report, the label and your order should all match.",
    see: { label: "How to review a supplier's documentation", href: "/resources/review-a-peptide-suppliers-documentation" },
  },
  {
    slug: "chargeback",
    term: "Chargeback",
    definition:
      "A payment a customer disputes through their card issuer instead of asking the seller for a refund. The amount is reversed and the seller usually pays a fee. A high rate of chargebacks is one of the main reasons processors restrict an account.",
  },
  {
    slug: "chargeback-ratio",
    term: "Chargeback ratio",
    definition:
      "The number of chargebacks in a period compared with the number of transactions in that period, shown as a percentage. Processors and card networks watch it closely, and each sets its own thresholds, so read the current terms of your provider.",
    see: { label: "RUO payment processing: underwriting guide", href: "/resources/payment-processing-for-ruo-stores" },
  },
  {
    slug: "certificate-of-analysis",
    term: "COA (certificate of analysis)",
    definition:
      "A document from a laboratory that reports the results of tests on a specific batch of a product. A useful COA names the laboratory, ties to a batch number, states the method and shows the underlying data, not only a purity figure.",
    see: { label: "How to review a supplier's documentation", href: "/resources/review-a-peptide-suppliers-documentation" },
  },
  {
    slug: "chromatogram",
    term: "Chromatogram",
    definition:
      "The chart that a chromatography test produces. Each peak represents a component of the sample. A report that shows the chromatogram lets a reader check the purity claim for themselves instead of trusting a single number.",
  },
  {
    slug: "dropshipping",
    term: "Dropshipping",
    definition:
      "A model where a store takes the order and payment while a partner holds the stock and ships it straight to the customer. The seller never handles the product. Whether it is permitted depends on the products, the partners and the contracts involved.",
    see: { label: "Wholesale, dropshipping or 3PL", href: "/resources/wholesale-vs-dropshipping-vs-3pl-for-ruo-brands" },
  },
  {
    slug: "geo",
    term: "GEO (generative engine optimization)",
    definition:
      "Making a website easy for AI answer tools to find, understand and cite. It relies on clear, sourced, well-structured content and a consistent description of who you are. It does not guarantee that any tool will mention you.",
    see: { label: "SEO, GEO and AEO", href: "/services/seo-geo-aeo" },
  },
  {
    slug: "aeo",
    term: "AEO (answer engine optimization)",
    definition:
      "Writing pages so that search features and assistants can lift a direct answer from them, for example a short definition, a numbered list or a table. The aim is to answer the question plainly near the top of the page.",
    see: { label: "SEO, GEO and AEO", href: "/services/seo-geo-aeo" },
  },
  {
    slug: "hosted-checkout",
    term: "Hosted checkout",
    definition:
      "A payment page run by the payment provider rather than by your own website. The customer enters card details on the provider's page, which keeps those details off your servers and reduces what your own site has to protect.",
  },
  {
    slug: "hplc",
    term: "HPLC (high-performance liquid chromatography)",
    definition:
      "A laboratory method that separates the components of a sample so each can be measured. For peptides it is commonly used to estimate purity, shown as the share of the total signal that belongs to the main peak.",
    see: { label: "How to review a supplier's documentation", href: "/resources/review-a-peptide-suppliers-documentation" },
  },
  {
    slug: "high-risk-merchant-account",
    term: "High-risk merchant account",
    definition:
      "A merchant account for a business that a processor sees as carrying a higher chance of disputes, regulatory scrutiny or account closure. These accounts often come with stricter review, higher fees and a reserve. Approval is never guaranteed.",
    see: { label: "Payment processing", href: "/services/payment-processing" },
  },
  {
    slug: "iso-17025",
    term: "ISO/IEC 17025",
    definition:
      "An international standard for the competence of testing and calibration laboratories. A laboratory can be accredited to it for a defined scope of tests. Check that the accreditation covers the test performed and can be verified with the accrediting body.",
  },
  {
    slug: "kyc",
    term: "KYC (know your customer)",
    definition:
      "The checks a business, bank or payment provider performs to confirm who a customer is and what they do. In payments it usually means identity documents, company records and a description of the business model.",
  },
  {
    slug: "mcc",
    term: "MCC (merchant category code)",
    definition:
      "A four-digit code that card networks use to classify the type of business a merchant runs. It affects fees and how a processor reviews you. It should describe what you really do, so it is never a matter of picking the cheapest code.",
  },
  {
    slug: "mass-spectrometry",
    term: "Mass spectrometry (MS)",
    definition:
      "A laboratory method that measures the mass of molecules in a sample. For a peptide it is used to check identity, by comparing the measured mass with the expected mass. Purity and identity are separate questions, and a complete report answers both.",
    see: { label: "How to review a supplier's documentation", href: "/resources/review-a-peptide-suppliers-documentation" },
  },
  {
    slug: "match-list",
    term: "MATCH list",
    definition:
      "A Mastercard system where acquiring banks record merchants and principal owners they have terminated, and check new applicants. Mastercard's documentation says a record is added within five days of a termination and that searches cover the past five years. Its current system is called MATCH Pro.",
    see: { label: "The MATCH list explained", href: "/resources/match-list-peptide-sellers" },
  },
  {
    slug: "purity",
    term: "Purity",
    definition:
      "The share of a sample that is the target compound, measured by a stated method such as HPLC. A purity figure says nothing about safety, sterility or suitability for any use, and it only means something with the method and data behind it.",
  },
  {
    slug: "rolling-reserve",
    term: "Rolling reserve",
    definition:
      "A portion of each day's sales that a processor holds back for a set period as protection against refunds and chargebacks. The terms are in your processing agreement, so read the percentage and the holding period before you sign.",
    see: { label: "Rolling reserve explained", href: "/resources/rolling-reserve-explained" },
  },
  {
    slug: "ruo",
    term: "RUO (research use only)",
    definition:
      "A label meaning a product is intended for laboratory research and is not for human or veterinary use. The label does not make a product, its marketing or its sale compliant by itself, so take advice from qualified counsel.",
    see: { label: "About our limits and approach", href: "/about" },
  },
  {
    slug: "threepl",
    term: "3PL (third-party logistics)",
    definition:
      "A provider that stores a brand's inventory and picks, packs and ships its orders. The brand still owns the stock. A store connects to the provider so that orders and tracking flow between them automatically.",
    see: { label: "Wholesale, dropshipping or 3PL", href: "/resources/wholesale-vs-dropshipping-vs-3pl-for-ruo-brands" },
  },
  {
    slug: "underwriting",
    term: "Underwriting",
    definition:
      "The review a payment processor or bank performs on a business before it approves an account, and often again later. It looks at the business model, the website, the products, the owners and the dispute history.",
    see: { label: "RUO payment processing: underwriting guide", href: "/resources/payment-processing-for-ruo-stores" },
  },
  {
    slug: "wholesale",
    term: "Wholesale",
    definition:
      "Buying a product in volume from a supplier at a lower unit price, then storing it and selling or shipping it yourself. The buyer owns the stock from delivery. In this industry wholesale is for business customers, not consumers.",
    see: { label: "Wholesale, dropshipping or 3PL", href: "/resources/wholesale-vs-dropshipping-vs-3pl-for-ruo-brands" },
  },
];
