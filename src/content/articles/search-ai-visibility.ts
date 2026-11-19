import { siteConfig } from "@/config/site";
import type { Article } from "../types";
import { callout, h2, ol, p, table, ul } from "./helpers";

const brand = siteConfig.name;
const checked = "2026-11-19";

export const searchAiVisibility: Article = {
  slug: "search-and-ai-visibility-for-ruo-peptide-stores",
  title: "Search and AI visibility for RUO peptide stores: what Google, Bing and OpenAI document",
  seo: {
    title: `Search and AI Visibility for RUO Peptide Stores | ${brand}`,
    description:
      "What Google, Bing, OpenAI and Perplexity actually document about SEO, GEO and AEO for RUO stores: crawlers, llms.txt, sitemaps, FAQ markup and measurement.",
  },
  primaryKeyword: "search and AI visibility for RUO stores",
  excerpt:
    "A great deal of advice about being cited by AI assistants is folklore. This guide separates what the search engines and AI companies actually document from what they do not, and applies it to an RUO store.",
  topic: "SEO, GEO and AEO",
  published: "2026-11-19",
  updated: "2026-11-19",
  service: "seo-geo-aeo",
  related: ["peptide-store-architecture", "infrastructure-behind-an-ruo-peptide-business"],
  needsCounselReview: false,
  quickAnswer:
    "Google says AI Overviews and AI Mode need no special optimization: pages must be indexed and snippet-eligible, with crawling allowed at robots.txt and your host. You do not need llms.txt, chunking or special schema for Google. Allow OAI-SearchBot and PerplexityBot to appear in those products, keep sitemap dates accurate and measure in Search Console and Bing.",
  takeaways: [
    "Google treats GEO and AEO as SEO. Its AI features use the same index and ranking systems and add no technical requirements of their own.",
    "Indexing comes first. A page that is not indexed and eligible for a snippet cannot appear in Google's AI features.",
    "llms.txt, content chunking and special AI markup are not used by Google. Keep them if you wish, but do not expect reach from them.",
    "Crawler access is a policy choice for each product: OAI-SearchBot for ChatGPT search, GPTBot for training, PerplexityBot for Perplexity.",
    "Accurate sitemap dates help Bing and Copilot decide what to recrawl. Google and Bing both ignore priority and changefreq.",
    "Measure with free tools, and be wary of any promise of a citation. No outside tool has access to a search engine's internal ranking systems.",
  ],
  blocks: [
    p(
      "Operators of RUO peptide stores are being sold a new vocabulary: SEO, GEO and AEO, AI visibility, answer engine optimization. Some of what is sold is real work. Much of it is not documented anywhere by the companies whose systems it claims to influence. This guide goes to the primary sources, the documentation published by Google, Bing, OpenAI and Perplexity, and separates what they say from what they do not.",
    ),
    p(
      "Every statement below was checked against the source linked at the end, on the date shown there. Where a claim comes from a research paper or from the trade press instead of the company itself, the text says so. Nothing here is a ranking promise, and none can be: search engines and AI products decide for themselves what to show.",
    ),

    h2("What is documented, and what is folklore"),
    p(
      "A useful rule is to ask who published the claim. A search engine describing its own requirements is documentation. A vendor describing what it believes search engines want is opinion, however confident. A single research benchmark is evidence about that benchmark. The table sorts the most common claims accordingly.",
    ),
    table(
      "Common claims about AI visibility, sorted by who documents them",
      ["Claim", "What the primary source says", "Treat it as"],
      ["Google needs special optimization for AI Overviews and AI Mode", "No. Pages need to be indexed and eligible for a snippet, with no additional technical requirements", "Documented: not needed"],
      ["An llms.txt file improves visibility", "Google Search does not use it. It is fine to publish one for other services, and it neither helps nor harms in Google", "Documented: no effect in Google"],
      ["Break content into small chunks for AI", "Not required. Google says its systems can understand several topics on one page and that there is no ideal page length", "Documented: not needed"],
      ["Create a page for every phrasing of a question", "Doing this mainly to manipulate rankings or AI answers can violate the scaled content abuse policy", "Documented: a risk"],
      ["FAQ markup earns a rich result", "Google no longer shows the FAQ rich result", "Documented: no longer true"],
      ["IndexNow gets you into ChatGPT", "OpenAI documents OAI-SearchBot and its IP ranges for ChatGPT search. We found no statement that IndexNow submissions feed it", "Unsupported"],
      ["Adding citations, quotations and statistics raises visibility in generative answers", "One academic benchmark reported gains of up to 40 percent, in its own test setting", "Research evidence, not a Google or ChatGPT guarantee"],
    ),

    h2("Step one: be indexed"),
    p(
      "Google's technical requirements are short. A page is eligible to be indexed if Googlebot is not blocked, the page returns an HTTP 200 status code and it has indexable content that does not violate the spam policies. Meeting the requirements does not guarantee indexing, and Google says so plainly.",
    ),
    p(
      "For an RUO store this is where many problems start. Pages hidden behind an acceptance gate that returns a different page to crawlers, product pages that exist only as filtered views, documents that load only after a script runs, or a staging site left open can each keep content out of the index. Check the important pages one at a time with the URL Inspection tool in Search Console, which shows the HTML Google actually fetched, rather than assuming that a page in the sitemap is indexed.",
    ),
    ol(
      "Confirm each important page returns 200 and carries no noindex directive.",
      "Confirm the content is in the HTML that Google fetches, using the URL Inspection live test.",
      "Submit the sitemap in Search Console and read the indexing report for the reason behind each excluded page.",
      "Repeat for Bing Webmaster Tools. Bing indexes separately and feeds Copilot.",
    ),

    h2("What Google says about AI Overviews and AI Mode"),
    p(
      "Google's page on AI features states that there are no additional requirements to appear in AI Overviews and AI Mode and no special optimization is needed. To be shown as a supporting link, a page must be indexed and eligible to show with a snippet. The foundations it lists are ordinary ones: make sure crawling is allowed in robots.txt and by your CDN or hosting, make content easy to find through internal links, put important content in text, support text with good images, and keep structured data matching the visible text.",
    ),
    p(
      "Two practical points follow. First, the CDN or host matters as much as robots.txt: a firewall rule that blocks a crawler produces the same result as a disallow line, and it is easier to miss. Second, snippet controls apply. If you use nosnippet, data-nosnippet or a small max-snippet value to limit what search shows, you also limit what AI features can quote. Google also describes Google-Extended as the control for limiting use of content for AI training and grounding in some other Google systems.",
    ),
    callout(
      "Google's view of the vocabulary",
      "In its guide to optimizing for generative AI features, Google says that from its perspective optimizing for generative AI search is optimizing for the search experience, and so it is still SEO. It advises evaluating third-party GEO and AEO services against its own guidance.",
    ),

    h2("What you can safely ignore"),
    p(
      "The same guide lists practices that Google says you do not need for Google Search. If the goal is visibility in Google, money spent on them is money not spent on the work that counts.",
    ),
    ul(
      "llms.txt and other special machine-readable or AI text files. Google Search does not use them. Publishing one will neither harm nor help your visibility in Google, so a short file is harmless if another service you care about reads it.",
      "Chunking content into tiny pieces. There is no requirement, and there is no ideal page length. Make pages for your audience.",
      "Rewriting content in a special way for AI systems. Google says its systems understand synonyms and meaning, so you do not need every long-tail variant.",
      "Seeking inauthentic mentions across the web. Google says these are not as helpful as they seem, and that its spam systems work alongside its generative features.",
      "Over-focusing on structured data. It is not required for generative AI search and no special schema.org markup is needed, although accurate structured data remains useful for rich results.",
    ),
    p(
      "The scaled content abuse policy deserves separate attention. Google defines it as generating many pages primarily to manipulate rankings, including with generative AI, without adding value for readers. Its AI guide specifically warns against creating separate content for every possible phrasing of a query, or for the related queries an AI system might run, mainly to influence rankings or AI answers. A store with a hundred near-duplicate pages about one peptide category is the kind of pattern the policy is aimed at.",
    ),

    h2("FAQ markup and other rich results"),
    p(
      "Google no longer shows the FAQ rich result in Search. Its documentation for the feature was removed after a notice in May 2026. Marking up questions that are visible on the page does no harm and can be generated from the same content, but it no longer earns a special display, so it should not appear in a plan as a way to gain visibility.",
    ),
    p(
      "The useful part of an FAQ is the writing. A short, direct answer to a real question, stated once and sourced where it makes a factual claim, helps readers and gives any system that quotes the page a clean passage to quote. Count that as the benefit, and treat the markup as optional housekeeping.",
    ),

    h2("Crawlers: who to allow"),
    p(
      "Each AI company publishes its own crawler names and says what blocking them does. The important distinction, stated by OpenAI and Perplexity, is between crawlers that build search results and crawlers used for training. They are separate settings, so a store can allow one and disallow the other.",
    ),
    table(
      "AI and search crawlers documented by their operators",
      ["Crawler", "Operator and purpose", "What its documentation says"],
      ["OAI-SearchBot", "OpenAI: surfaces sites in ChatGPT search", "Sites that opt out are not shown in ChatGPT search answers, though they can still appear as navigational links. OpenAI recommends allowing it and its published IP ranges. A robots.txt change can take about 24 hours to take effect"],
      ["GPTBot", "OpenAI: training of generative models", "Independent of OAI-SearchBot. Disallowing it signals that content should not be used for training"],
      ["PerplexityBot", "Perplexity: surfaces sites in Perplexity search results", "Not used to crawl content for AI foundation models. Perplexity recommends allowing it and its published IP ranges, and notes that a firewall may need an explicit allow rule"],
      ["Perplexity-User", "Perplexity: fetches a page when a person asks a question", "Because a user requested the fetch, it generally ignores robots.txt rules"],
      ["Googlebot, Google-Extended", "Google: crawling for Search; a separate control token for AI training and grounding in some other Google systems", "Googlebot access is what matters for Search and its AI features. Google-Extended is a separate choice"],
      ["Bingbot", "Microsoft: crawling for Bing and Copilot", "Allow it and keep sitemaps accurate"],
    ),
    p(
      "Whether to allow training crawlers is a business decision, and it can reasonably go either way. What matters is that robots.txt, the host's firewall and any bot-protection setting say the same thing. A store that lists a crawler as allowed in robots.txt and blocks it at the firewall has made no decision at all.",
    ),

    h2("Sitemaps, lastmod and IndexNow"),
    p(
      "A sitemap is still the most reliable way to tell search engines which URLs exist. Two details are worth getting right. Google ignores the priority and changefreq values, and it uses lastmod only if it is consistently and verifiably accurate. Bing's webmaster blog says the same about changefreq and priority, and calls lastmod a key signal that helps Bing decide which URLs to recrawl or skip, especially for AI-powered results that update quickly.",
    ),
    p(
      "Bing recommends ISO 8601 dates and, where possible, a time as well, and it warns against setting lastmod to the time the sitemap was generated unless the page itself changed. For a store that rebuilds on every deploy, that is a real trap: if every URL shows today's date, the signal carries no information and may be discounted.",
    ),
    p(
      "IndexNow is a different tool. Under that protocol a site submits a changed URL to a participating search engine, proves ownership with a key file on its host, and the engines share submissions among themselves. It is a notification mechanism and does not replace a sitemap, crawlable links or good content. It is useful for Bing and other participating engines. Do not describe it as a way to appear in ChatGPT: OpenAI's crawler documentation covers OAI-SearchBot, not IndexNow.",
    ),

    h2("Structured data and content that earns citations"),
    p(
      "Structured data helps search engines understand a page and can qualify it for some rich results. Google is explicit that none is required for generative AI features. The rule that matters is accuracy: markup must match what a reader sees. Mark up the organization, the articles and the breadcrumbs where they are real, and leave out anything the page does not show.",
    ),
    p(
      "What does help is the unglamorous part. Google asks for non-commodity content, meaning content with a point of view or first-hand knowledge that cannot be produced by restating what is already online. An academic benchmark of generative engines, GEO: Generative Engine Optimization, reported that adding citations, quotations and statistics improved how often a source appeared in responses, by up to 40 percent in its own test. That is one study on its own benchmark, not a measurement of Google or ChatGPT, but it points the same way as Google's advice: be specific, be sourced and be quotable.",
    ),
    ul(
      "State each definition once, plainly, near the top of the page that defines it.",
      "Cite a primary source for every regulatory, payment-network or technical claim, and show the date you checked it.",
      "Put comparisons and thresholds in tables, with units and dates.",
      "Say what you do not know. A page that marks its own limits is easier to trust and to quote correctly.",
    ),

    h2("What is different for an RUO store"),
    p(
      "Google says trust is the most important element of experience, expertise, authoritativeness and trust, and that its systems give even more weight to strong signals on what it calls Your Money or Your Life topics, where accuracy matters most. A store in this category sits close to such topics, which raises the bar for the basics: clear sourcing, a visible accountable publisher and statements that are accurate for the jurisdiction they describe.",
    ),
    p(
      "Two cautions apply. Do not chase visibility for queries about personal use, dosing or health benefits. Those are the wrong audience, they can invite policy problems on advertising and payment platforms, and they pull a business-to-business site toward health topics where trust carries extra weight. And do not copy the tactics of sites that promise approval or rankings by disguising what a page is. They are the opposite of a durable plan, and in the test questions we ran for this guide, the AI-written answers about this industry nearly all ended with a warning to verify everything.",
    ),
    p(
      `If you want help applying this to your own store, ${brand} describes how it approaches search, answer-engine and AI-assistant visibility on its [SEO, GEO and AEO service page](/services/seo-geo-aeo), and the structural side in the guide to [peptide store architecture](/resources/peptide-store-architecture).`,
    ),

    h2("Measure it with free tools"),
    p(
      "Search Console is the primary measurement tool. Google says traffic from its AI features is counted in the normal Search Console performance data, and its AI guide also points to a Generative AI performance report. Bing Webmaster Tools offers its own reporting; the trade press reports an AI Performance report, in public preview at the time of writing, that shows how often Copilot and Bing cite a site's pages. Check the tool itself for the current state, because it is changing.",
    ),
    p(
      "Beyond those two, keep a monthly log. Ask the same short list of questions that a buyer would ask in each assistant you care about, record whether your site appears, what is said about you and which sources are cited instead. It is slow and manual, and it is honest. Google also cautions that no third-party tool has access to its internal ranking or AI systems, so treat any paid score of AI visibility as a hypothesis, not a measurement.",
    ),

    h2("A practical checklist"),
    table(
      "An evidence-based checklist for RUO store search and AI visibility",
      ["Task", "Why", "Where it comes from"],
      ["Make sure important pages return 200, are not noindexed and show their content in the fetched HTML", "Indexing is required before any search or AI feature can use a page", "Google technical requirements, AI features"],
      ["Allow Googlebot, Bingbot, OAI-SearchBot and PerplexityBot in robots.txt and at the firewall, or record why not", "Blocking at either layer removes the page from that product", "Google, OpenAI and Perplexity documentation"],
      ["Decide separately about training crawlers such as GPTBot and Google-Extended", "They are independent of search crawlers", "OpenAI and Google documentation"],
      ["Link every important page from at least one other page in the body text", "Internal links are how crawlers and readers find content", "Google AI features"],
      ["Give each URL an honest lastmod and drop priority and changefreq", "Bing and Google use lastmod only if it is accurate and ignore the others", "Google sitemap documentation, Bing webmaster blog"],
      ["Write non-commodity, sourced content with dates and a named publisher", "It is the main lever Google names, and it matches the research evidence", "Google AI optimization guide, GEO paper"],
      ["Keep structured data identical to the visible text, and do not rely on FAQ markup for display", "Accuracy is required; the FAQ rich result is gone", "Google documentation updates"],
      ["Verify in Search Console and Bing Webmaster Tools and keep a monthly question log", "Measurement is first-party and free", "Google and Bing tools"],
    ),
  ],
  faqs: [
    {
      q: "Do I need an llms.txt file?",
      a: "Not for Google. Its guide says Google Search does not use llms.txt or similar files, and that creating one will neither help nor harm. If another service you care about reads it, a short file costs little to maintain. Do not spend budget expecting reach from it.",
    },
    {
      q: "Does IndexNow help me appear in ChatGPT?",
      a: "IndexNow tells participating search engines that a URL changed. OpenAI's crawler documentation describes OAI-SearchBot and published IP ranges for ChatGPT search, and we found no statement that IndexNow submissions feed it. Treat IndexNow as a convenience for Bing and similar engines, not a ChatGPT lever.",
    },
    {
      q: "Should I block GPTBot?",
      a: "That is a business choice. OpenAI treats GPTBot, used for training, and OAI-SearchBot, used for ChatGPT search, as independent settings, so you can allow search visibility and disallow training. Decide with your own advisers and keep robots.txt and any firewall rules consistent with the decision.",
    },
    {
      q: "Does FAQ markup still help?",
      a: "Google no longer shows the FAQ rich result and removed that documentation after a May 2026 notice. Marking up questions that are visible on the page is harmless, but it earns no special display. Write the answers for readers and judge them by whether they are clear, specific and sourced.",
    },
    {
      q: "How can I measure AI visibility for free?",
      a: "Use Search Console, where traffic from AI features is part of the normal performance data, and the AI reporting in Bing Webmaster Tools. Add a monthly log of the same buyer questions asked in each assistant, noting whether you appear and who is cited. No free tool can promise a citation.",
    },
    {
      q: "Should I buy AI visibility or mention services?",
      a: "Be cautious. Google says no third-party tool has access to its internal ranking or AI systems, and that seeking inauthentic mentions is not as helpful as it seems. Sourced content, real partner mentions and sound technical foundations are slower, but they are the approaches the documentation supports.",
    },
  ],
  sources: [
    { label: "Google: Optimizing your website for generative AI features on Google Search", url: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide", checked },
    { label: "Google: AI features and your website", url: "https://developers.google.com/search/docs/appearance/ai-features", checked },
    { label: "Google: Search technical requirements", url: "https://developers.google.com/search/docs/essentials/technical", checked },
    { label: "Google: Build and submit a sitemap", url: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap", checked },
    { label: "Google: Spam policies for Google web search", url: "https://developers.google.com/search/docs/essentials/spam-policies", checked },
    { label: "Google: Search Central documentation updates (FAQ rich result)", url: "https://developers.google.com/search/updates", checked },
    { label: "OpenAI: Overview of OpenAI crawlers", url: "https://developers.openai.com/api/docs/bots", checked },
    { label: "Perplexity: Perplexity crawlers", url: "https://docs.perplexity.ai/guides/bots", checked },
    { label: "Bing Webmaster Blog: Keeping content discoverable with sitemaps in AI powered search", url: "https://blogs.bing.com/webmaster/July-2025/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search", checked },
    { label: "IndexNow documentation", url: "https://www.indexnow.org/documentation", checked },
    { label: "Aggarwal et al.: GEO: Generative Engine Optimization (KDD 2024)", url: "https://arxiv.org/abs/2311.09735", checked },
  ],
};
