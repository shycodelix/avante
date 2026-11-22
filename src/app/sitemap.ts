import type { MetadataRoute } from "next";

import { getArticles } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

const HUBS: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/news", priority: 0.9 },
  { path: "/matches", priority: 0.9 },
  { path: "/leagues", priority: 0.8 },
  { path: "/transfers", priority: 0.8 },
  { path: "/cosplay", priority: 0.7 },
  { path: "/events", priority: 0.7 },
  { path: "/gaming-tech", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();

  return [
    ...HUBS.map((hub) => ({
      url: `${SITE_URL}${hub.path}`,
      changeFrequency: "daily" as const,
      priority: hub.priority,
    })),
    ...articles.map((article) => ({
      url: `${SITE_URL}/news/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
