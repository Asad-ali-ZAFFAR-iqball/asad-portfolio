import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";

// Required for output: "export"; without it the dev server answers /sitemap.xml with a 500.
export const dynamic = "force-static";

/**
 * Generates a sitemap for search engine crawlers. One-page site, so one URL (#anchors are ignored by crawlers).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
