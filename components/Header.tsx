"use client";

import { useLanguage } from "./LanguageContext";

const navText = {
  en: {
    label: "Editorial Platform",
    activity: "Activity",
    features: "Features",
    submissions: "Submissions & Listings",
    competitions: "Competitions",
    events: "Events",
    courses: "Courses",
    residencies: "Residencies",
    directory: "Design Directory",
    jobs: "Jobs",
    shop: "Shop",
    searchPlaceholder: "Search",
    siteName: "ArtBop",
  },
  zh: {
    label: "编辑平台",
    activity: "动态",
    features: "精选内容",
    submissions: "投稿与列表",
    competitions: "竞赛",
    events: "活动",
    courses: "课程",
    residencies: "驻留",
    directory: "设计名录",
    jobs: "招聘",
    shop: "商店",
    searchPlaceholder: "搜索",
    siteName: "ArtBop",
  },
};

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const t = navText[language];

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-500">
            {t.label}
          </div>
          <a
            href="/"
            className="text-3xl font-semibold tracking-tight hover:text-neutral-700"
          >
            {t.siteName}
          </a>
        </div>

        <div className="flex items-center gap-5">
          <nav className="flex items-center gap-5 text-sm text-neutral-700">
            <a href="/activity" className="hover:text-black">
              {t.activity}
            </a>

            <a href="/features" className="hover:text-black">
              {t.features}
            </a>

            <div className="relative group">
              <button className="hover:text-black flex items-center gap-1">
                <span>{t.submissions}</span>
                <span className="text-xs">▾</span>
              </button>

              <div className="absolute left-0 top-full pt-3 hidden group-hover:block z-20">
                <div className="min-w-[220px] border border-neutral-200 bg-white shadow-sm py-2">
                  <a
                    href="/events"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-black"
                  >
                    {t.events}
                  </a>
                  <a
                    href="/directory"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-black"
                  >
                    {t.directory}
                  </a>
                  <a
                    href="/competitions"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-black"
                  >
                    {t.competitions}
                  </a>

                  <div className="relative group/courses">
                    <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-black">
                      <span>{t.courses}</span>
                      <span className="text-xs">▸</span>
                    </button>

                    <div className="absolute left-full top-0 hidden group-hover/courses:block">
                      <div className="min-w-[180px] border border-neutral-200 bg-white shadow-sm py-2">
                        <a
                          href="http://localhost:3001"
                          target="_blank"
                          rel="noreferrer"
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-black"
                        >
                          BOP Academy
                        </a>
                      </div>
                    </div>
                  </div>

                  <a
                    href="/residencies"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-black"
                  >
                    {t.residencies}
                  </a>
                  <a
                    href="/jobs"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-black"
                  >
                    {t.jobs}
                  </a>
                </div>
              </div>
            </div>

            <a href="/shop" className="hover:text-black">
              {t.shop}
            </a>
          </nav>

          <div className="hidden md:flex items-center">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="w-40 px-3 py-2 text-sm border border-neutral-300 rounded-full outline-none focus:border-black placeholder:text-neutral-400"
            />
          </div>

          <div className="flex items-center border border-neutral-300 rounded-full overflow-hidden text-[11px]">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-0.5 ${
                language === "en" ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("zh")}
              className={`px-2 py-0.5 ${
                language === "zh" ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              中文
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}