"use client";

import { useLanguage } from "./LanguageContext";

const content = {
  en: {
    brand: "ArtBop Site",
    description:
      "An editorial platform for art, design, architecture, and visual culture.",
    navigation: "Navigation",
    pages: {
      home: "Home",
      features: "Features",
      submit: "Submit",
      about: "About",
    },
    publishing: "Publishing",
    publishingLinks: {
      community: "Community submissions",
      editorial: "Editorial features",
      archive: "Archive",
    },
    copyright: "© 2026 ArtBop Site. All rights reserved.",
  },
  zh: {
    brand: "ArtBop Site",
    description: "一个面向艺术、设计、建筑与视觉文化的编辑发布平台。",
    navigation: "导航",
    pages: {
      home: "首页",
      features: "精选内容",
      submit: "投稿",
      about: "关于",
    },
    publishing: "发布",
    publishingLinks: {
      community: "社区投稿",
      editorial: "官方精选",
      archive: "内容归档",
    },
    copyright: "© 2026 ArtBop Site. 保留所有权利。",
  },
};

export default function Footer() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <footer className="border-t border-neutral-200 bg-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-[1.4fr_0.8fr_0.8fr] gap-10">
          <div className="max-w-sm">
            <div className="text-lg font-semibold tracking-tight">
              {t.brand}
            </div>
            <p className="mt-3 text-sm leading-6 text-neutral-500">
              {t.description}
            </p>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.22em] text-neutral-400 mb-3">
              {t.navigation}
            </h3>
            <div className="space-y-2 text-sm text-neutral-600">
              <a href="/" className="block hover:text-black">
                {t.pages.home}
              </a>
              <a href="/features" className="block hover:text-black">
                {t.pages.features}
              </a>
              <a href="/submit" className="block hover:text-black">
                {t.pages.submit}
              </a>
              <a href="/about" className="block hover:text-black">
                {t.pages.about}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.22em] text-neutral-400 mb-3">
              {t.publishing}
            </h3>
            <div className="space-y-2 text-sm text-neutral-600">
              <div>{t.publishingLinks.community}</div>
              <div>{t.publishingLinks.editorial}</div>
              <div>{t.publishingLinks.archive}</div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-4 border-t border-neutral-100 text-xs text-neutral-400">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
}