import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/work";
import { SITE_URL as siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((s) => ({
      url: `${siteUrl}/work/${s.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: s.featured ? 0.8 : 0.6,
    })),
    { url: `${siteUrl}/certifications`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];
}
