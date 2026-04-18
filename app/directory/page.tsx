"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLanguage } from "../../components/LanguageContext";

const content = {
  en: {
    title: "Design Directory",
    description: "A directory of studios, practitioners, image-makers, and creative services.",
  },
  zh: {
    title: "设计名录",
    description: "一个关于工作室、创作者、图像制作者与创意服务的目录。",
  },
};

export default function DirectoryPage() {
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