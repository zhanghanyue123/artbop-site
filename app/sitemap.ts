import type { MetadataRoute } from "next";
import { getPublicArticles } from "../lib/supabase-rest";
import type { ArticleRecord } from "../lib/articles";

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
    ...articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.updated_at || article.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
