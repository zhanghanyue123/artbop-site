"use client";

import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import { useLanguage } from "./LanguageContext";

type LocalizedCopy = {
  eyebrow: string;
  title: string;
  description: string;
  scopeTitle: string;
  scope: string[];
  notice: string;
};

export default function ListingLanding({
  copy,
}: {
  copy: { zh: LocalizedCopy; en: LocalizedCopy };
}) {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-neutral-950">
      <Header />
      <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-8 border-b border-neutral-300 pb-10 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-neutral-500">
              {t.eyebrow}
            </div>
            <h1 className="text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
              {t.title}
            </h1>
          </div>
          <p className="max-w-xl text-lg leading-8 text-neutral-600">
            {t.description}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-24 md:grid-cols-[0.7fr_1.5fr] md:px-8">
        <div className="border-t border-neutral-400 pt-5">
          <h2 className="text-2xl font-semibold">{t.scopeTitle}</h2>
        </div>
        <div>
          {t.scope.map((item, index) => (
            <div
              key={item}
              className="grid grid-cols-[44px_1fr] border-t border-neutral-300 py-5"
            >
              <span className="text-sm text-neutral-500">0{index + 1}</span>
              <span className="text-lg">{item}</span>
            </div>
          ))}
          <div className="mt-10 border-l-2 border-neutral-900 pl-5">
            <p className="max-w-2xl leading-7 text-neutral-600">{t.notice}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="rounded-full bg-black px-5 py-3 text-sm text-white"
              >
                {language === "zh" ? "创建账号" : "Create account"}
              </Link>
              <Link
                href="/submit"
                className="rounded-full border border-neutral-400 px-5 py-3 text-sm"
              >
                {language === "zh" ? "提交项目" : "Submit a project"}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
