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
    title: "New ways of seeing, made visible.",
    description:
      "ArtBOP follows artists, studios, researchers, and institutions working across contemporary art and creative technology.",
    submit: "Submit a Project",
    lead: "Featured",
    latest: "Latest Projects",
    explore: "Explore by Field",
    community: "From the Community",
    communityText:
      "A space for artists and creative practitioners to share projects, research, references, and work in progress.",
    viewProject: "Read the story",
    viewAll: "View all projects",
    visitCommunity: "Visit activity",
    empty: "New editorial stories are being prepared.",
  },
  zh: {
    eyebrow: "当代艺术、创意科技与视觉文化",
    title: "让新的观看方式被看见。",
    description:
      "ArtBOP 持续关注活跃于当代艺术与创意科技之间的艺术家、工作室、研究者与文化机构。",
    submit: "提交项目",
    lead: "本期精选",
    latest: "最新项目",
    explore: "按领域浏览",
    community: "社区动态",
    communityText:
      "为艺术家与创意实践者提供分享项目、研究、灵感资料与创作过程的空间。",
    viewProject: "阅读项目",
    viewAll: "查看全部项目",
    visitCommunity: "进入动态",
    empty: "新的编辑内容正在准备中。",
  },
};

function localizedArticle(article: ArticleRecord, language: "en" | "zh") {
  return {
    ...article,
    title: language === "zh" ? article.title_zh : article.title_en,
    category:
      language === "zh" ? article.category_zh : article.category_en,
    excerpt: language === "zh" ? article.excerpt_zh : article.excerpt_en,
    image: article.cover_url || article.images[0],
  };
}

export default function HomePageContent({
  articles,
}: {
  articles: ArticleRecord[];
}) {
  const { language } = useLanguage();
  const t = content[language];
  const localized = articles.map((article) =>
    localizedArticle(article, language),
  );
  const lead = localized[0];
  const secondary = localized.slice(1, 3);
  const latest = localized.slice(3);
  const fields = Array.from(
    new Set(localized.map((article) => article.category).filter(Boolean)),
  ).slice(0, 8);

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-neutral-950">
      <Header />

      <section className="mx-auto max-w-[1440px] px-5 pb-12 pt-10 md:px-8 md:pb-16 md:pt-16">
        <div className="grid gap-8 border-b border-neutral-300 pb-10 md:grid-cols-[1.6fr_1fr] md:items-end md:pb-14">
          <div>
            <div className="mb-5 text-[11px] uppercase tracking-[0.28em] text-neutral-500">
              {t.eyebrow}
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-8xl">
              {t.title}
            </h1>
          </div>
          <div className="md:pb-1">
            <p className="max-w-xl text-base leading-7 text-neutral-600 md:text-lg md:leading-8">
              {t.description}
            </p>
            <Link
              href="/submit"
              className="mt-6 inline-flex rounded-full bg-neutral-950 px-5 py-3 text-sm text-white transition hover:bg-neutral-700"
            >
              {t.submit}
            </Link>
          </div>
        </div>
      </section>

      {lead ? (
        <section className="mx-auto max-w-[1440px] px-5 md:px-8">
          <div className="mb-5 flex items-center justify-between border-b border-neutral-300 pb-3">
            <h2 className="text-xs font-medium uppercase tracking-[0.24em]">
              {t.lead}
            </h2>
            <span className="text-xs text-neutral-500">01</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.9fr_1fr]">
            <Link
              href={`/articles/${lead.slug}`}
              className="group relative min-h-[480px] overflow-hidden bg-neutral-900 md:min-h-[650px]"
            >
              {lead.image && (
                <img
                  src={lead.image}
                  alt={lead.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-10">
                <div className="mb-4 text-xs uppercase tracking-[0.24em] text-white/70">
                  {lead.category}
                </div>
                <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
                  {lead.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 md:text-base md:leading-7">
                  {lead.excerpt}
                </p>
                <span className="mt-6 inline-block border-b border-white pb-1 text-sm">
                  {t.viewProject}
                </span>
              </div>
            </Link>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {secondary.map((article, index) => (
                <Link
                  href={`/articles/${article.slug}`}
                  key={article.slug}
                  className="group grid min-h-[250px] grid-cols-[1fr_1.15fr] overflow-hidden border-t border-neutral-300 pt-4 lg:min-h-0 lg:grid-cols-1 lg:border-0 lg:pt-0"
                >
                  {article.image && (
                    <div className="overflow-hidden bg-neutral-200 lg:aspect-[16/8]">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="pl-5 lg:pl-0 lg:pt-4">
                    <div className="mb-2 flex justify-between text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                      <span>{article.category}</span>
                      <span>0{index + 2}</span>
                    </div>
                    <h3 className="text-xl font-semibold leading-tight tracking-[-0.02em] md:text-2xl">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <p className="mx-auto max-w-[1440px] px-5 text-neutral-500 md:px-8">
          {t.empty}
        </p>
      )}

      {latest.length > 0 && (
        <section id="latest" className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 md:py-28">
          <div className="mb-8 flex items-end justify-between border-b border-neutral-300 pb-4">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {t.latest}
            </h2>
            <Link href="/features" className="text-sm underline underline-offset-4">
              {t.viewAll}
            </Link>
          </div>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {latest.map((article) => (
              <ArticleCard
                key={article.slug}
                slug={article.slug}
                title={article.title}
                category={article.category}
                excerpt={article.excerpt}
                image={article.image}
              />
            ))}
          </div>
        </section>
      )}

      {fields.length > 0 && (
        <section className="border-y border-neutral-300 bg-neutral-950 text-white">
          <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-14 md:grid-cols-[0.7fr_2fr] md:px-8 md:py-20">
            <h2 className="text-sm uppercase tracking-[0.24em] text-white/60">
              {t.explore}
            </h2>
            <div className="flex flex-wrap gap-x-3 gap-y-4">
              {fields.map((field) => (
                <span
                  key={field}
                  className="rounded-full border border-white/30 px-5 py-2.5 text-base md:text-lg"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-8 border-t border-neutral-300 pt-8 md:grid-cols-[1fr_1fr]">
          <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            {t.community}
          </h2>
          <div>
            <p className="max-w-xl text-lg leading-8 text-neutral-600">
              {t.communityText}
            </p>
            <Link
              href="/activity"
              className="mt-8 inline-flex rounded-full border border-neutral-400 px-5 py-3 text-sm"
            >
              {t.visitCommunity}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
