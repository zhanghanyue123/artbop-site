export type ArticleStatus =
  | "draft"
  | "pending_review"
  | "scheduled"
  | "published";

export type ArticleRecord = {
  id: string;
  slug: string;
  status: ArticleStatus;
  publish_at: string | null;
  title_en: string;
  title_zh: string;
  excerpt_en: string;
  excerpt_zh: string;
  body_en: string[];
  body_zh: string[];
  category_en: string;
  category_zh: string;
  author: string;
  team: string;
  source_name: string;
  source_url: string;
  cover_url: string;
  images: string[];
  xhs_title: string;
  xhs_content: string;
  hashtags: string[];
  created_at: string;
  updated_at: string;
};

export type ArticleInput = Omit<
  ArticleRecord,
  "id" | "created_at" | "updated_at"
>;

export function isPublicArticle(article: ArticleRecord) {
  if (article.status === "published") {
    return true;
  }

  return (
    article.status === "scheduled" &&
    Boolean(article.publish_at) &&
    new Date(article.publish_at as string).getTime() <= Date.now()
  );
}
