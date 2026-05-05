import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Optional: disallow admin/private pages
        // disallow: ["/admin", "/api", "/private"],
      },
      // Specific rules for Google bot
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      // Specific rules for Bing bot
      {
        userAgent: "Bingbot",
        allow: "/",
      },
    ],
    // FIXED: Use www.tauzand.in instead of tauzand.in
    sitemap: "https://www.tauzand.in/sitemap.xml",
  };
}