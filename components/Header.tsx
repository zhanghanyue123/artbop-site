"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext";
import { useAuth } from "./AuthContext";

const navText = {
  en: {
    activity: "Activity",
    features: "Features",
    submissions: "Submissions & Listings",
    submitProject: "Submit a Project",
    competitions: "Competitions",
    events: "Events",
    residencies: "Residencies",
    directory: "Design Directory",
    jobs: "Jobs",
    study: "Schools & Admissions",
    shop: "Shop",
    login: "Log in",
    account: "Account",
  },
  zh: {
    activity: "动态",
    features: "精选内容",
    submissions: "投稿与列表",
    submitProject: "提交项目",
    competitions: "竞赛",
    events: "活动",
    residencies: "驻留",
    directory: "设计名录",
    jobs: "招聘",
    study: "院校申请",
    shop: "商店",
    login: "登录",
    account: "账号",
  },
};

const listingLinks = {
  en: [
    ["/submit", "Submit a Project"],
    ["/events", "Events"],
    ["/directory", "Design Directory"],
    ["/competitions", "Competitions"],
    ["/residencies", "Residencies"],
    ["/jobs", "Jobs"],
    ["/study", "Schools & Admissions"],
  ],
  zh: [
    ["/submit", "提交项目"],
    ["/events", "活动"],
    ["/directory", "设计名录"],
    ["/competitions", "竞赛"],
    ["/residencies", "驻留"],
    ["/jobs", "招聘"],
    ["/study", "院校申请"],
  ],
};

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const { loading, user } = useAuth();
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

        <div className="flex items-center gap-4 md:gap-7">
          <nav className="hidden items-center gap-6 text-sm text-neutral-700 md:flex">
            <Link href="/activity" className="hover:text-black">
              {t.activity}
            </Link>
            <Link href="/features" className="hover:text-black">
              {t.features}
            </Link>

            <div className="group relative">
              <button className="flex items-center gap-1 py-2 hover:text-black">
                <span>{t.submissions}</span>
                <span className="text-[10px]">▾</span>
              </button>
              <div className="invisible absolute left-0 top-full z-30 min-w-[210px] translate-y-1 border border-neutral-300 bg-[#f4f3ef] py-2 opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {listingLinks[language].map(([href, label]) => (
                  <Link
                    key={href}
                    href={href}
                    className="block px-4 py-2.5 text-sm hover:bg-neutral-200"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/shop" className="hover:text-black">
              {t.shop}
            </Link>
            {!loading && (
              <Link
                href={user ? "/account" : "/login"}
                className="hover:text-black"
              >
                {user ? t.account : t.login}
              </Link>
            )}
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

        <nav className="flex w-full gap-5 overflow-x-auto border-t border-neutral-300 pt-4 text-sm text-neutral-700 md:hidden">
          <Link href="/activity" className="shrink-0">{t.activity}</Link>
          <Link href="/features" className="shrink-0">{t.features}</Link>
          <Link href="/submit" className="shrink-0">{t.submitProject}</Link>
          <Link href="/events" className="shrink-0">{t.events}</Link>
          <Link href="/directory" className="shrink-0">{t.directory}</Link>
          <Link href="/competitions" className="shrink-0">{t.competitions}</Link>
          <Link href="/residencies" className="shrink-0">{t.residencies}</Link>
          <Link href="/jobs" className="shrink-0">{t.jobs}</Link>
          <Link href="/study" className="shrink-0">{t.study}</Link>
          <Link href="/shop" className="shrink-0">{t.shop}</Link>
          {!loading && (
            <Link href={user ? "/account" : "/login"} className="shrink-0">
              {user ? t.account : t.login}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
