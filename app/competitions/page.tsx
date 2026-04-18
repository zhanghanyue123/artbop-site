"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLanguage } from "../../components/LanguageContext";

const content = {
  en: {
    title: "Competitions",
    description: "Open calls, awards, and competition listings for artists, designers, and students.",
  },
  zh: {
    title: "竞赛",
    description: "面向艺术家、设计师与学生的开放征集、奖项与竞赛信息。",
  },
};

export default function CompetitionsPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header />
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-6 text-lg text-neutral-600 leading-8 max-w-2xl">{t.description}</p>
      </section>
      <Footer />
    </main>
  );
}