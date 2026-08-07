import type { MetadataRoute } from "next";
import { SITE } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/claims", "/names", "/signals", "/mirrors", "/desk"];
  const lastModified = new Date(SITE.reviewedAt);

  return paths.map((path) => ({
    url: path === "/" ? SITE.url : `${SITE.url}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
