"use client";

import Link from "next/link";
import Header from "./Header";
import ArticleCard from "./ArticleCard";
import Footer from "./Footer";
import { useLanguage } from "./LanguageContext";
import type { ArticleRecord } from "../lib/articles";

const content = {
  en: {
    eyebrow: "Contemporary art, technology, and visual culture",
    title: "Discover how artists are shaping new ways of seeing.",
    description:
      "ArtBOP publishes edited stories about contemporary art, creative technology, installations, and cross-disciplinary practices.",
    publish: "Submit a Project",
    latest: "Browse Latest",
    featured: "Latest Stories",
    empty: "New editorial stories are being prepared.",
  },
  zh: {
    eyebrow: "当代艺术、创意科技与视觉文化",
    title: "发现艺术家如何创造新的观看方式。",
    description:
      "ArtBOP 持续编辑和发布当代艺术、创意科技、装置与跨学科实践，让值得被看见的项目获得更清晰的中文介绍。",
    publish: "提交项目",
    latest: "浏览最新内容",
    featured: "最新内容",
    empty: "新的编辑内容正在准备中。",
  },
};

export default function HomePageContent({
  articles,
}: {
  articles: ArticleRecord[];
}) {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-4 text-xs uppercase tracking-[0.25em] text-neutral-500">
          {t.eyebrow}
        </div>
        <h1 className="max-w-5xl text-5xl font-semibold leading-none tracking-tight md:text-7xl">
          {t.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-600">
          {t.description}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/submit"
            className="rounded-2xl bg-black px-5 py-3 text-sm text-white"
          >
            {t.publish}
          </Link>
          <Link
            href="#latest"
            className="rounded-2xl border border-neutral-300 px-5 py-3 text-sm"
          >
            {t.latest}
          </Link>
        </div>
      </section>

      <section id="latest" className="mx-auto max-w-7xl px-6 pb-14">
        <h2 className="mb-6 text-2xl font-semibold">{t.featured}</h2>
        {articles.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                slug={article.slug}
                title={
                  language === "zh" ? article.title_zh : article.title_en
                }
                category={
                  language === "zh"
                    ? article.category_zh
                    : article.category_en
                }
                excerpt={
                  language === "zh"
                    ? article.excerpt_zh
                    : article.excerpt_en
                }
                image={article.cover_url || article.images[0]}
              />
            ))}
          </div>
        ) : (
          <p className="text-neutral-500">{t.empty}</p>
        )}
      </section>

      <Footer />
    </main>
  );
}
