import { MetadataRoute } from "next";

/**
 * Tauzand Sitemap — Google Search Central compliant
 * Guidelines followed:
 *  - Only publicly accessible, indexable URLs included (no auth-gated dashboards)
 *  - lastModified uses fixed ISO dates for static pages; `new Date()` only for
 *    high-churn pages (Google uses lastModified as a hint, not a guarantee)
 *  - priority values are hints only; Google may ignore them
 *  - changeFrequency reflects actual update cadence
 *  - All URLs use canonical www.tauzand.in origin
 * Ref: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
 */

const BASE_URL = "https://www.tauzand.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ─── Core / Flagship pages ─────────────────────────────────────────────
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/internship`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      // Company-wise DSA & coding round question sheets
      url: `${BASE_URL}/DSA`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // NOTE: /DSA/userdashboard is auth-gated — excluded intentionally.

    // ─── High-value product pages ───────────────────────────────────────────
    {
      url: `${BASE_URL}/ai-resume-analyser`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/cover-letter`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/extension`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },

    // ─── Internship sub-pages (public) ─────────────────────────────────────
    {
      // Public certificate validator — useful for recruiters; high crawl value
      url: `${BASE_URL}/internship/validate`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      // Publicly browsable project hub
      url: `${BASE_URL}/internship/project`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.85,
    },
    // NOTE: /internship/userdashboard is intentionally excluded —
    // it is auth-gated; indexing it offers no value and wastes crawl budget.

    // ─── Jobs & Discovery ──────────────────────────────────────────────────
    {
      url: `${BASE_URL}/it-jobs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    // ─── Content / Blog ────────────────────────────────────────────────────
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // ─── Company / Trust pages ─────────────────────────────────────────────
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "monthly",
      priority: 0.4,
    },

    // ─── Legal / Policy ────────────────────────────────────────────────────
    {
      url: `${BASE_URL}/term-of-use`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}