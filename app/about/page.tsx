"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLanguage } from "../../components/LanguageContext";

const sections = {
  zh: [
    ["我们在做什么", "ArtBOP 是一个关注当代艺术、创意科技与视觉文化的编辑和社区平台。我们以中文为主要阅读语言，整理值得被看见的国际项目，同时保留必要的英文信息与原始来源。"],
    ["谁可以参与", "艺术家、工作室、研究团队、学生、学校、展馆与文化机构都可以创建账号、分享动态并提交项目。正式项目经过编辑审核后发布。"],
    ["编辑原则", "我们尊重创作者署名与图片权利，区分原始事实和编辑判断，不照抄来源文章，也不使用夸张技术营销语言。"],
  ],
  en: [
    ["What we do", "ArtBOP is an editorial and community platform focused on contemporary art, creative technology, and visual culture. We publish primarily in Chinese while retaining essential English information and original sources."],
    ["Who can participate", "Artists, studios, research teams, students, schools, museums, and cultural institutions can create accounts, share updates, and submit projects for editorial review."],
    ["Editorial principles", "We respect credits and image rights, distinguish facts from editorial judgment, rewrite rather than copy source material, and avoid inflated technology marketing language."],
  ],
};

export default function AboutPage() {
  const { language } = useLanguage();
  return (
    <main className="min-h-screen bg-[#f4f3ef] text-neutral-950">
      <Header />
      <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
        <div className="border-b border-neutral-300 pb-12">
          <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-neutral-500">About ArtBOP</div>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-8xl">
            {language === "zh" ? "连接作品、创作者与新的观看方式。" : "Connecting projects, creators, and new ways of seeing."}
          </h1>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-8">
        {sections[language].map(([title, body], index) => (
          <div key={title} className="grid gap-5 border-t border-neutral-300 py-8 md:grid-cols-[0.25fr_1fr]">
            <div className="text-sm text-neutral-500">0{index + 1}</div>
            <div className="grid gap-5 md:grid-cols-[0.55fr_1fr]">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="max-w-2xl text-lg leading-8 text-neutral-600">{body}</p>
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </main>
  );
}
