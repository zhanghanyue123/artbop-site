import FeaturesContent from "../../components/FeaturesContent";
import { getPublicArticles } from "../../lib/supabase-rest";
import type { ArticleRecord } from "../../lib/articles";

export const metadata = {
  title: "项目",
  description: "浏览 ArtBOP 编辑发布的当代艺术与创意科技项目。",
};

export const revalidate = 60;

export default async function FeaturesPage() {
  let articles: ArticleRecord[] = [];
  try {
    articles = await getPublicArticles();
  } catch (error) {
    console.error("Unable to load project archive", error);
  }
  return <FeaturesContent articles={articles} />;
}
