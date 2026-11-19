import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const googleAds: Service = {
  slug: "google-ads",
  name: "Google Ads for peptide brands",
  pillar: "grow",
  summary: "A policy-honest review of whether Google Ads fits your business, and the channels to plan instead.",
  status: "by-engagement",
  primaryKeyword: "can you advertise peptides on google",
  seo: {
    title: `Can You Advertise Peptides on Google? | ${brand}`,
    description:
      "Google Ads and peptide brands: what the unapproved substances policy says, why we promise nothing, and the channels to plan instead.",
  },
  h1: "Can you advertise peptides on Google? A policy-honest review for RUO brands",
  lead: "Google's unapproved substances policy says it does not allow promotion of certain products regardless of claims of legality, and Google may review your website as well as your ads. The policy pages we read do not name peptides, so outcomes cannot be predicted. We review your position honestly, promise nothing and plan channels that do not depend on Google Ads.",
  what: [
    "Google restricts advertising for unapproved substances and for some healthcare content. Its unapproved substances policy says it does not allow promotion of certain products regardless of claims of legality, including products on a non-exhaustive list of examples and products subject to government or regulatory action or warning. The pages we read do not mention peptides or research use only, so how Google treats a given store is Google's decision.",
    "Google also says it may review information from multiple sources, including your ad, your website, your accounts and third-party sources. So the website matters as much as the ad copy. We cannot promise that any campaign will be approved or stay approved, and we never help change what a business sells or says in order to pass a review.",
    "What we can do is give you an honest read of your position, set up measurement that works on any channel, and build the channels that do not depend on one ad platform: search visibility, email and SMS, partner programs and a store that earns trust.",
  ],
  why: [
    "Ad accounts can be limited or suspended, and a business that depends on one platform carries that risk.",
    "Google can apply its policy to your website as well as your ads, so a gap between what a business says and what it sells is a risk on any platform.",
    "Plan for no Google Ads, and treat any approval as a bonus. Organic and owned channels are slower to build but harder to switch off.",
  ],
  problems: [
    { title: "Rejected or limited ads", text: "A rejection tells you little about why. We help you read the notice against the published policy and decide honestly whether the campaign is realistic." },
    { title: "Account suspension risk", text: "Repeated violations can put an account at risk. We never help hide what a business sells, because that makes the risk worse." },
    { title: "A site that does not match the ad", text: "Google may review the website as well as the ad. We check that your pages, policies and notices tell the same accurate story." },
    { title: "Reliance on one channel", text: "A business whose sales depend on one ad platform has no plan for the day it is switched off. We build the alternatives alongside." },
  ],
  approach: [
    { title: "Read the current policy", text: "Compare Google's published text with your products, your store and your ad ideas, and record the date we read it." },
    { title: "Review your store", text: "Look for content that points beyond research use, missing notices and claims your documents do not support." },
    { title: "Decide honestly", text: "Tell you whether a campaign looks realistic, and say so plainly when it does not." },
    { title: "Set up measurement", text: "Tracking that matches real orders, so any channel you use can be judged on evidence." },
    { title: "Build the fallback channels", text: "Search visibility, email and SMS, and partner programs, planned together." },
  ],
  included: [
    "Policy fit review against Google's published text",
    "Website and landing page review",
    "Measurement and tag setup",
    "Channel plan that does not depend on Google Ads",
    "Search visibility, email and partner program foundations",
    "Written summary with the date of each policy read",
  ],
  process: [
    { title: "Brief", text: "Your products, your store and what you hoped to advertise." },
    { title: "Read", text: "Google's current published policy, compared with your position." },
    { title: "Review", text: "Your website and ad ideas checked for mismatches." },
    { title: "Report", text: "A plain recommendation, with what to do next." },
    { title: "Plan", text: "The channels to build so sales do not depend on one platform." },
  ],
  technical: [
    "Tag and event setup that matches real orders.",
    "Search Console and analytics set up for organic channels.",
    "Consistent campaign tagging for any paid channel you run.",
    "A dated record of which policy pages were read.",
  ],
  limits: [
    "We cannot promise that Google will approve any ad or account, or keep approving it.",
    "We do not help hide what a business sells, rename products to avoid review or run ads for products a platform does not allow.",
    "A policy review is a snapshot on the date it is done. Policies change, so read the current text before you act.",
    "We are not a law firm. A policy review is not an approval from Google and not legal advice.",
  ],
  sources: [
    { label: "Google Ads policy: Unapproved substances", url: "https://support.google.com/adspolicy/answer/15595718", checked: "2026-11-19" },
    { label: "Google Ads policy: Healthcare and medicines", url: "https://support.google.com/adspolicy/answer/176031", checked: "2026-11-19" },
  ],
  visual: "search",
  faqs: [
    { q: "Can I run Google Ads for research peptides?", a: "Google's policy says it does not allow promotion of certain unapproved products regardless of claims of legality, and it decides what falls under that. The pages we read do not name peptides, so we cannot predict a decision. We review your position honestly and plan channels that do not depend on Google Ads." },
    { q: "Does Google review my website, or only my ads?", a: "Google's healthcare policy page says it may review information from multiple sources, including your ad, your website, your accounts and third-party sources. So your website matters as much as the ad copy, and a store that says one thing while its ads say another is a risk on any platform." },
    { q: "Can I get past a rejection with a different landing page or product name?", a: "No. Hiding what a business sells in order to pass review is misrepresentation, and it puts the account at risk. We never help with it. If an ad is rejected, we help you read the notice and decide honestly whether the campaign is realistic." },
    { q: "What should I plan instead of Google Ads?", a: "Plan for search visibility, email and SMS you own, partner and affiliate programs, and a store that earns trust, so that sales do not depend on one ad platform. Treat any paid approval as a bonus. These channels are slower to build, but they are much harder to switch off." },
    { q: "Do you run Google Ads campaigns?", a: "Only where a campaign looks realistic after we have read the current policy and reviewed your store. We promise no approvals, and we do not run ads for products a platform does not allow. Often the better first step is measurement and the organic channels." },
    { q: "What does a policy review include?", a: "A written read of Google's current published policy against your products, store and ad ideas, a website review for mismatches, a measurement plan and a channel plan that does not need Google Ads. It is a snapshot on the date of the review, because policies change." },
    { q: "Is this legal advice?", a: "No. We read published policies and review your store, but we are not a law firm. A policy review is not an approval from Google, and the rules for your products should be checked with qualified counsel before you act." },
  ],
  related: ["meta-advertising", "seo-geo-aeo", "email-marketing", "site-audits"],
  caseStudies: [],
  articles: ["search-and-ai-visibility-for-ruo-peptide-stores"],
  cta: { label: "Get an honest policy review" },
};
