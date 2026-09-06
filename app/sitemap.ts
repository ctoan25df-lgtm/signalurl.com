import type { MetadataRoute } from "next";
import { SITE } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(`${SITE.reviewedAt}T00:00:00+09:00`),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
