import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";

/**
 * Crawlers that fetch pages for AI search, chat answers and agents, plus the training crawlers of the main AI companies.
 * All are explicitly welcome. A crawler that has its own group ignores the "*" group, so each group repeats the rules.
 * Keep this list current: when a new AI crawler is documented by its operator, add its user agent here.
 */
const aiAgents = [
  // OpenAI: search index, user-triggered browsing, training
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  // Anthropic: search index, user-triggered browsing, training, older names
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  // Google: AI training and grounding control token, other Google fetchers
  "Google-Extended",
  "GoogleOther",
  // Microsoft
  "Bingbot",
  "BingPreview",
  // Perplexity: search index and user-triggered browsing
  "PerplexityBot",
  "Perplexity-User",
  // Apple
  "Applebot",
  "Applebot-Extended",
  // Meta
  "meta-externalagent",
  "meta-externalfetcher",
  "FacebookBot",
  // Amazon
  "Amazonbot",
  "Amzn-SearchBot",
  "Amzn-User",
  // DuckDuckGo, You.com, Mistral, Cohere, Brave and others
  "DuckAssistBot",
  "DuckDuckBot",
  "YouBot",
  "MistralAI-User",
  "cohere-ai",
  "cohere-training-data-crawler",
  "Diffbot",
  "Ai2Bot",
  "CCBot",
  "Bytespider",
  "PetalBot",
  "Timpibot",
  "omgili",
  "omgilibot",
  // Link-preview fetchers used when a page is shared
  "Twitterbot",
  "LinkedInBot",
  "Slackbot",
  "Discordbot",
  "WhatsApp",
  "TelegramBot",
];

const keepOut = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  // Preview and development deployments are never indexed. VERCEL_ENV is "production" only on the live domain.
  const live = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : process.env.NODE_ENV === "production";
  if (!live) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: keepOut },
      { userAgent: aiAgents, allow: "/", disallow: keepOut },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
