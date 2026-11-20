import { siteConfig } from "@/config/site";
import type { Service } from "../types";

const brand = siteConfig.name;

export const metaAdvertising: Service = {
  slug: "meta-advertising",
  name: "Meta advertising infrastructure",
  pillar: "grow",
  summary: "Business account structure, pixel and Conversions API tracking, event design and reporting.",
  status: "established",
  primaryKeyword: "Meta ads for peptides",
  seo: {
    title: `Peptide Facebook Ads: Meta Setup and Tracking | ${brand}`,
    description:
      "Meta ads for peptide brands: business account setup, Pixel and Conversions API tracking and help with rejected ads. Meta decides eligibility. No promises.",
  },
  h1: "Meta ads for peptide brands: account setup, tracking and rejected-ad help",
  lead: "Meta decides whether a peptide brand can advertise, so we focus on what you control: a clean business account, accurate Pixel and Conversions API tracking and reporting that matches real orders. If ads are rejected or an account is restricted, we help you read the notice and fix the cause. We promise no approvals.",
  what: [
    "Three things get confused in this topic. Infrastructure is the account structure, tracking and reporting that make advertising measurable. Management is running campaigns. Eligibility is whether Meta will accept your category and creative in the first place. We build and maintain infrastructure, and we run campaigns from our own agency ad account where that is agreed in scope. Eligibility belongs to Meta, and running ads from an agency account does not change what Meta allows.",
    "Good infrastructure matters even when advertising is limited. Clean event data improves every later decision, and a well-organized business account is easier to maintain and to hand over.",
    "Meta's published advertising standards say it will not run ads that promote the sale or use of unsafe substances, products or supplements, and that it decides what counts as unsafe at its sole discretion. The page we read does not name peptides, so no one can tell you in advance how Meta will treat a particular ad or store. That is why we plan marketing that does not depend on a single channel.",
  ],
  why: [
    "Advertising platforms apply restrictions to categories they consider sensitive and enforce them at their own discretion. Plan for that uncertainty instead of building a business that depends on one channel.",
    "Without accurate tracking you cannot tell which channels, affiliates or campaigns drive orders. Browser-only tracking also loses data, which is why server-side events matter.",
    "Messy account structure creates avoidable problems: unclear ownership, shared logins, unverified domains and events that fire twice.",
  ],
  problems: [
    { title: "Unclear account ownership", text: "Assets created on personal profiles or shared logins become a risk when people leave or accounts are reviewed. We set up assets under your business with clear roles." },
    { title: "Events that double count or go missing", text: "A pixel and a server feed that are not deduplicated inflate numbers, and browser-only tracking misses events. We design both together." },
    { title: "No view across channels", text: "Ad data, affiliate data and order data rarely agree on their own. We connect them with consistent campaign tagging and dashboards." },
    { title: "Policy surprises", text: "Platforms change rules and enforce them unevenly. We help you read the current policies and keep your setup clean, and we are honest that outcomes are not ours to promise." },
  ],
  approach: [
    { title: "Business structure", text: "Business portfolio organization, roles and permissions, domain verification and a setup where you own the assets." },
    { title: "Event design", text: "A short, deliberate event list covering view, add to cart, begin checkout and purchase, with consistent parameters." },
    { title: "Pixel and Conversions API", text: "Browser and server events sent together and deduplicated with event IDs, respecting consent." },
    { title: "Reporting", text: "Campaign tagging conventions and dashboards that connect ad data to orders and affiliates." },
    { title: "Troubleshooting", text: "Diagnosing event match quality, domain verification, account quality notices and delivery issues." },
  ],
  included: [
    "Meta Business Manager setup",
    "Campaign management from our agency ad account, where agreed",
    "Agency access and permission structure",
    "Advertising account infrastructure",
    "Business asset organization",
    "Meta Pixel implementation",
    "Conversions API implementation",
    "Event tracking design",
    "Campaign analytics and dashboards",
    "Account troubleshooting",
    "Conversion tracking configuration",
  ],
  process: [
    { title: "Audit", text: "Current accounts, assets, tracking and policies." },
    { title: "Structure", text: "Ownership, roles and domain verification." },
    { title: "Instrument", text: "Events implemented and tested in Meta's testing tools." },
    { title: "Report", text: "Dashboards connected to orders." },
    { title: "Maintain", text: "Periodic reviews as policies and the site change." },
  ],
  technical: [
    "Server-side events sent from your backend with a shared event ID for deduplication.",
    "Customer identifiers hashed according to Meta's documentation.",
    "Consent state respected before any event is sent.",
    "A tagging taxonomy applied consistently across channels.",
    "Events tested before launch and re-tested after site changes.",
  ],
  limits: [
    "We do not help circumvent Meta's restrictions, evade review or misrepresent a business or its products. Running ads from an agency account does not exempt a business or its creative from Meta's rules.",
    "We cannot promise that Meta will approve your account, creative or category, or keep them approved.",
    "We do not promise advertising results.",
  ],
  visual: "meta",
  faqs: [
    { q: "Why are my peptide ads being rejected?", a: "Meta says it will not run ads that promote the sale or use of unsafe substances, products or supplements, and it decides what counts as unsafe at its sole discretion. Its published page does not name peptides, so we cannot predict a decision. We help you read the notice, review the ad and its destination page, and plan channels that do not depend on Meta." },
    { q: "Do you run my ads?", a: "Yes, where it is agreed in scope. We run campaigns from our own agency ad account, and we also set up and work inside accounts that your business owns. Either way Meta's rules decide what can run, and an agency account does not change what is allowed for your category. We agree scope and reporting before anything goes live." },
    { q: "Should ads run from your agency account or from our own account?", a: "Both are common. An agency account can be quicker to start and keeps campaign operations in one place. An account your business owns keeps the history, audiences and payment relationship under your own name, which matters if you ever change agency. Whichever you choose, agree in writing who owns the pixel, the data and the audiences, how you will see results and what happens at the end of the engagement." },
    { q: "Can you set up accounts that will not be restricted?", a: "No. We do not promise that and we do not offer workarounds. We set up your own business assets correctly, with proper ownership, access and tracking, and keep them clean. Whether Meta accepts your category and creative is Meta's decision, and running ads from an agency account does not change what Meta allows." },
    { q: "Why Conversions API as well as the pixel?", a: "Browsers and privacy tools block or lose some pixel events. Sending events from your server as well, with deduplication so nothing is counted twice, gives a more complete record of real orders. That makes your reporting more accurate and gives the platform better data, although it does not affect whether ads are approved." },
    { q: "Meta reports conversions that do not match our orders. Why?", a: "Differences come from browsers blocking the pixel, duplicate events, delayed or missing server events, time zone and attribution window differences, and test orders. Setting up the Conversions API alongside the pixel, with deduplication, and reconciling a week of platform numbers against real orders usually closes most of the gap. Some difference always remains." },
    { q: "How do we judge whether ads are working when attribution is unreliable?", a: "Compare platform results with your own order data over the same period, by campaign where you can tag, and treat the platform as one view among several. Watch blended measures, such as total orders against total advertising spend, and use them to judge whether spend is paying off. The aim is a number you trust, not a perfect one." },
    { q: "What should we have in place before running ads at all?", a: "A verified business account, a domain you can verify, landing pages that match the ad and stay within what the platform allows, tracking that matches real orders and a plan for reviewing what you publish. Skipping any of these is a common reason a first campaign ends in a restriction." },
  ],
  related: ["affiliate-management", "business-dashboards", "email-marketing"],
  caseStudies: [],
  articles: ["meta-ad-account-disabled-peptides", "meta-health-and-wellness-restrictions", "infrastructure-behind-an-ruo-peptide-business"],
  cta: { label: "Discuss your tracking setup" },
};
