import type { Metadata } from "next";
import { getPublicArticle } from "../../../lib/supabase-rest";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await getPublicArticle(slug);
    if (!article) return {};

    const title = article.title_zh || article.title_en;
    const description = article.excerpt_zh || article.excerpt_en;
    const image = article.cover_url || article.images[0];
    const url = `/articles/${article.slug}`;

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        title,
        description,
        url,
        publishedTime: article.publish_at || article.created_at,
        modifiedTime: article.updated_at,
        images: image ? [{ url: image, alt: title }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: image ? [image] : undefined,
      },
    };
  } catch (error) {
    console.error("Unable to build article metadata", error);
    return {};
  }
}

export default function ArticleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
