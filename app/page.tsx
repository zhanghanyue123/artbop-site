import HomePageContent from "../components/HomePageContent";
import { getPublicArticles } from "../lib/supabase-rest";
import type { ArticleRecord } from "../lib/articles";

export const revalidate = 60;

export default async function HomePage() {
  let articles: ArticleRecord[] = [];

  try {
    articles = await getPublicArticles();
  } catch (error) {
    console.error("Unable to render public articles", error);
  }

  return <HomePageContent articles={articles} />;
}
