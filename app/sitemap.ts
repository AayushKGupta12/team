import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://vfound.in",
      lastModified: new Date(),
    },
    {
      url: "https://vfound.in/ai-resume-analysis",
      lastModified: new Date(),
    },
    {
      url: "https://vfound.in/cover-letter",
      lastModified: new Date(),
    },
    {
      url: "https://vfound.in/it-jobs",
      lastModified: new Date(),
    },
    {
      url: "https://vfound.in/blog",
      lastModified: new Date(),
    },
  ];
}
