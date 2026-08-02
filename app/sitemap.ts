import type { MetadataRoute } from "next";
import { getPublicArticles } from "../lib/supabase-rest";
import type { ArticleRecord } from "../lib/articles";
import { competitions } from "../data/competitions";
import { residencies } from "../data/residencies";
import { jobs } from "../data/jobs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.artbop.xyz";
  let articles: ArticleRecord[] = [];

  try {
    articles = await getPublicArticles();
  } catch (error) {
    console.error("Unable to build article sitemap", error);
  }

  return [
    {
      url: baseUrl,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/submit`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...["competitions", "residencies", "jobs"].map((section) => ({
      url: `${baseUrl}/${section}`,
      lastModified: new Date("2026-08-02"),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...competitions.map((item) => ({
      url: `${baseUrl}/competitions/${item.slug}`,
      lastModified: new Date(item.published_at || "2026-08-02"),
      changeFrequency: "weekly" as const,
      priority: 0.65,
    })),
    ...residencies.map((item) => ({
      url: `${baseUrl}/residencies/${item.slug}`,
      lastModified: new Date(item.published_at || "2026-08-02"),
      changeFrequency: "weekly" as const,
      priority: 0.65,
    })),
    ...jobs.map((item) => ({
      url: `${baseUrl}/jobs/${item.slug}`,
      lastModified: new Date(item.published_at || "2026-08-02"),
      changeFrequency: "weekly" as const,
      priority: 0.65,
    })),
    ...articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.updated_at || article.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
