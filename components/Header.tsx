"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext";

const navText = {
  en: {
    projects: "Projects",
    activity: "Activity",
    submit: "Submit",
    shop: "Shop",
    about: "About",
  },
  zh: {
    projects: "项目",
    activity: "动态",
    submit: "投稿",
    shop: "商店",
    about: "关于",
  },
};

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const t = navText[language];

  return (
    <header className="border-b border-neutral-300 bg-[#f4f3ef]">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-5 py-5 md:px-8">
        <Link
          href="/"
          className="text-3xl font-bold tracking-[-0.05em] md:text-4xl"
        >
          ArtBOP
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden items-center gap-6 text-sm text-neutral-700 sm:flex">
            <Link href="/#latest" className="hover:text-black">
              {t.projects}
            </Link>
            <Link href="/activity" className="hover:text-black">
              {t.activity}
            </Link>
            <Link href="/submit" className="hover:text-black">
              {t.submit}
            </Link>
            <Link href="/shop" className="hover:text-black">
              {t.shop}
            </Link>
            <Link href="/about" className="hover:text-black">
              {t.about}
            </Link>
          </nav>

          <div className="flex overflow-hidden rounded-full border border-neutral-400 text-[11px]">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 ${
                language === "en" ? "bg-black text-white" : "text-black"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("zh")}
              className={`px-2.5 py-1 ${
                language === "zh" ? "bg-black text-white" : "text-black"
              }`}
            >
              中文
            </button>
          </div>
        </div>

        <nav className="flex w-full items-center justify-between border-t border-neutral-300 pt-4 text-sm text-neutral-700 sm:hidden">
          <Link href="/#latest">{t.projects}</Link>
          <Link href="/activity">{t.activity}</Link>
          <Link href="/submit">{t.submit}</Link>
          <Link href="/shop">{t.shop}</Link>
          <Link href="/about">{t.about}</Link>
        </nav>
      </div>
    </header>
  );
}
