"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLanguage } from "../../components/LanguageContext";

const content = {
  en: {
    title: "Jobs",
    description: "Creative roles, freelance opportunities, internships, and studio openings.",
  },
  zh: {
    title: "招聘",
    description: "创意岗位、自由职业机会、实习与工作室招聘信息。",
  },
};

export default function JobsPage() {
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