"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLanguage } from "../../components/LanguageContext";

const content = {
  en: {
    eyebrow: "About",
    title: "An editorial platform for art, design, and visual culture",
    description:
      "ArtBop Site is a publishing platform that brings together official editorial features, curated stories, and community submissions in one clean system.",
    section1Title: "What the platform does",
    section1Body:
      "The site functions as both a digital magazine and a publishing framework. Official features can present selected projects with a more editorial voice, while users can submit and publish their own work through a structured submission flow.",
    section2Title: "Who it is for",
    section2Body:
      "It is designed for artists, designers, architects, students, studios, and image-makers who want to publish projects in a context that feels more thoughtful and curated than a standard portfolio feed.",
    section3Title: "Editorial direction",
    section3Body:
      "The platform focuses on projects, essays, visual research, and cultural observations across art, design, architecture, moving image, and digital environments.",
  },
  zh: {
    eyebrow: "关于",
    title: "一个面向艺术、设计与视觉文化的编辑平台",
    description:
      "ArtBop Site 是一个发布平台，将官方编辑内容、策展式故事与社区投稿整合进同一套清晰系统中。",
    section1Title: "平台在做什么",
    section1Body:
      "这个网站既是数字杂志，也是一个发布框架。官方精选内容可以以更偏 editorial 的方式呈现项目，而用户也可以通过清晰的投稿流程提交并发布自己的作品。",
    section2Title: "面向谁",
    section2Body:
      "它面向艺术家、设计师、建筑从业者、学生、工作室以及各类图像创作者，适合那些希望在比普通作品集流更有内容感和策展感的环境中发布项目的人。",
    section3Title: "编辑方向",
    section3Body:
      "平台关注艺术、设计、建筑、动态影像与数字环境相关的项目、文章、视觉研究和文化观察。",
  },
};

export default function AboutPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header />

      <section className="max-w-5xl mx-auto px-6 py-12">
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

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid gap-6">
          <div className="bg-white border border-neutral-200 rounded-[28px] p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">{t.section1Title}</h2>
            <p className="text-neutral-700 leading-8">{t.section1Body}</p>
          </div>

          <div className="bg-white border border-neutral-200 rounded-[28px] p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">{t.section2Title}</h2>
            <p className="text-neutral-700 leading-8">{t.section2Body}</p>
          </div>

          <div className="bg-white border border-neutral-200 rounded-[28px] p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">{t.section3Title}</h2>
            <p className="text-neutral-700 leading-8">{t.section3Body}</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}