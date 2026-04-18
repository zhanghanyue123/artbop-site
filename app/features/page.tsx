"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArticleCard from "../../components/ArticleCard";
import { useLanguage } from "../../components/LanguageContext";

const content = {
  en: {
    eyebrow: "Features",
    title: "Editorial features and curated stories",
    description:
      "A growing archive of official features, essays, and visual culture stories across art, design, architecture, and moving image.",
    posts: [
      {
        slug: "atmospheric-interfaces",
        title: "Atmospheric Interfaces in Public Space",
        category: "Official Feature",
        excerpt:
          "A curated editorial story exploring interactive installations, urban media systems, and sensory design in contemporary public space.",
      },
      {
        slug: "material-futures",
        title: "Material Futures and Spatial Experiments",
        category: "Design",
        excerpt:
          "Independent practices, tactile surfaces, and spatial publishing from emerging studios across art, design, and architecture.",
      },
      {
        slug: "game-space-visual-culture",
        title: "Game Space, Image Systems, and New Visual Culture",
        category: "Visual Culture",
        excerpt:
          "Projects and essays connecting digital worlds, image-making, and narrative environments.",
      },
    ],
  },
  zh: {
    eyebrow: "精选内容",
    title: "编辑精选与策展式内容",
    description:
      "一个持续扩展的内容档案，收录官方精选、文章与围绕艺术、设计、建筑和视觉文化的策展型内容。",
    posts: [
      {
        slug: "atmospheric-interfaces",
        title: "公共空间中的氛围界面",
        category: "官方精选",
        excerpt:
          "一篇围绕互动装置、城市媒介系统与公共空间感知设计的策展式内容文章。",
      },
      {
        slug: "material-futures",
        title: "材料未来与空间实验",
        category: "设计",
        excerpt:
          "关于新兴工作室在艺术、设计与建筑之间进行材料与空间表达的独立实践。",
      },
      {
        slug: "game-space-visual-culture",
        title: "游戏空间、图像系统与新视觉文化",
        category: "视觉文化",
        excerpt:
          "连接数字世界、图像生产与叙事环境的项目与文章内容。",
      },
    ],
  },
};

export default function FeaturesPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-4">
          {t.eyebrow}
        </div>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-none max-w-4xl">
          {t.title}
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-neutral-600 leading-8">
          {t.description}
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-14">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {t.posts.map((post) => (
            <ArticleCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              category={post.category}
              excerpt={post.excerpt}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}