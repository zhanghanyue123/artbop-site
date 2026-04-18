"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLanguage } from "../../components/LanguageContext";

const content = {
  en: {
    title: "Courses",
    description: "Selected courses, workshops, and learning opportunities across art, design, and visual culture.",
  },
  zh: {
    title: "课程",
    description: "围绕艺术、设计与视觉文化的精选课程、工作坊与学习机会。",
  },
};

export default function CoursesPage() {
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