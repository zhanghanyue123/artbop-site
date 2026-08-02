"use client";

import Header from "./Header";
import Footer from "./Footer";
import ArticleCard from "./ArticleCard";
import { useLanguage } from "./LanguageContext";
import type { ArticleRecord } from "../lib/articles";

export default function FeaturesContent({ articles }: { articles: ArticleRecord[] }) {
  const { language } = useLanguage();
  return (
    <main className="min-h-screen bg-[#f4f3ef] text-neutral-950">
      <Header />
      <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-8 border-b border-neutral-300 pb-10 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-neutral-500">Project Archive</div>
            <h1 className="text-5xl font-semibold tracking-[-0.05em] md:text-7xl">项目</h1>
          </div>
          <p className="max-w-xl text-lg leading-8 text-neutral-600">持续收录当代艺术、互动装置、数字艺术与跨学科创作项目。</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-8">
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              slug={article.slug}
              title={language === "zh" ? article.title_zh : article.title_en}
              category={language === "zh" ? article.category_zh : article.category_en}
              excerpt={language === "zh" ? article.excerpt_zh : article.excerpt_en}
              image={article.cover_url || article.images[0]}
            />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
