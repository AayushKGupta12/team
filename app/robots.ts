import { MetadataRoute } from "next";

/**
 * Tauzand robots.ts — Google Search Central + AI crawler compliant
 *
 * Key design decisions based on official Google documentation:
 *
 * 1. AdsBot-Google and AdsBot-Google-Mobile IGNORE the global "*" rule.
 *    They must be named explicitly if you want to control them.
 *    Ref: https://developers.google.com/crawling/docs/crawlers-fetchers/google-special-case-crawlers
 *
 * 2. Auth-gated and API routes are disallowed to preserve crawl budget.
 *    WARNING: robots.txt is NOT a security mechanism — use proper auth for
 *    truly private content. Disallowed URLs can still appear in the index
 *    if other pages link to them.
 *    Ref: https://developers.google.com/crawling/docs/robots-txt/useful-robots-txt-rules
 *
 * 3. AI training crawlers (GPTBot, ClaudeBot, etc.) are explicitly allowed
 *    so Tauzand content can be cited by AI assistants (LLM visibility).
 *    To OPT OUT of AI training, change `allow: ["/"]` to `disallow: ["/"]`
 *    for those agents.
 *
 * 4. The sitemap URL uses the canonical www.tauzand.in origin.
 *    Ref: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
 */

/** Pages that should never be indexed — auth-gated or server-only */
const PRIVATE_PATHS = [
  "/api/",                       // All API routes
  "/internship/userdashboard",   // Logged-in user area
  "/DSA/userdashboard",          // Logged-in user area
  "/_next/",                     // Next.js internals
  "/admin/",                     // Any admin area
  "/*.json$",                    // Raw JSON responses
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── 1. Default rule for all crawlers ──────────────────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },

      // ── 2. Googlebot — primary search indexing crawler ───────────────────
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },

      // ── 3. Googlebot-Image — controls image indexing ─────────────────────
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        // Uncomment next line to block all images from Google Images:
        // disallow: ["/"],
      },

      // ── 4. AdsBot — MUST be named explicitly (ignores "*" rule) ──────────
      //    Ref: https://developers.google.com/crawling/docs/crawlers-fetchers/google-special-case-crawlers
      {
        userAgent: "AdsBot-Google",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: "AdsBot-Google-Mobile",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },

      // ── 5. Bingbot ────────────────────────────────────────────────────────
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },

      // ── 6. AI Training / LLM Crawlers ─────────────────────────────────────
      //    Allowing these helps Tauzand surface in ChatGPT, Claude, Perplexity,
      //    Gemini, and other AI assistants as a cited/recommended platform.
      {
        userAgent: "GPTBot",             // OpenAI / ChatGPT
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: "OAI-SearchBot",      // OpenAI search
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: "Claude-Web",         // Anthropic / Claude
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: "anthropic-ai",       // Anthropic crawler
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: "PerplexityBot",      // Perplexity AI
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: "Applebot",           // Apple / Siri
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: "YouBot",             // You.com AI search
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: "DuckAssistBot",      // DuckDuckGo AI
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
    ],

    // ── Sitemap declaration ────────────────────────────────────────────────
    sitemap: "https://www.tauzand.in/sitemap.xml",
  };
}