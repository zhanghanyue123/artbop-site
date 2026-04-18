"use client";

import Header from "../components/Header";
import ArticleCard from "../components/ArticleCard";
import Footer from "../components/Footer";
import { useLanguage } from "../components/LanguageContext";

const content = {
  en: {
    eyebrow: "Art, design, architecture, and visual culture",
    title:
      "A publishing platform with official features and community submissions.",
    description:
      "ArtBop Site is an editorial-style platform for projects, essays, and curated visual stories. Official features and user submissions can live in the same clean system.",
    publish: "Publish Project",
    latest: "View Latest",
    featured: "Featured Stories",
    viewAll: "View all",
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
    eyebrow: "艺术、设计、建筑与视觉文化",
    title: "一个结合官方编辑内容与社区投稿发布的平台。",
    description:
      "ArtBop Site 是一个偏 editorial 风格的发布平台，用于展示项目、文章与策展式视觉内容。官方精选与用户投稿可以共存在同一套清晰系统中。",
    publish: "发布项目",
    latest: "查看最新",
    featured: "精选内容",
    viewAll: "查看全部",
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

export default function HomePage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-4">
          {t.eyebrow}
        </div>

        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-none max-w-5xl">
          {t.title}
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-neutral-600 leading-8">
          {t.description}
        </p>

        <div className="mt-10 flex gap-4">
          <button className="px-5 py-3 rounded-2xl bg-black text-white text-sm">
            {t.publish}
          </button>
          <button className="px-5 py-3 rounded-2xl border border-neutral-300 text-sm">
            {t.latest}
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-14">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-semibold">{t.featured}</h2>
          <a
            href="#"
            className="text-sm text-neutral-600 underline underline-offset-4"
          >
            {t.viewAll}
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
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