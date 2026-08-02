"use client";

import Header from "./Header";
import Footer from "./Footer";
import { useLanguage } from "./LanguageContext";

export type Opportunity = {
  id: string;
  title: string;
  title_zh?: string;
  summary: string;
  summary_zh?: string;
  organization: string;
  location: string;
  deadline?: string;
  details: { label: string; label_zh: string; value: string }[];
  tags: string[];
  source_url: string;
};

export default function OpportunityListPage({
  eyebrow,
  title,
  titleEn,
  description,
  descriptionEn,
  items,
}: {
  eyebrow: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  items: Opportunity[];
}) {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-neutral-950">
      <Header />
      <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-8 border-b border-neutral-400 pb-10 md:grid-cols-2 md:items-end">
          <div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-neutral-500">
              {eyebrow}
            </div>
            <h1 className="text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
              {language === "zh" ? title : titleEn}
            </h1>
          </div>
          <p className="max-w-xl text-lg leading-8 text-neutral-600">
            {language === "zh" ? description : descriptionEn}
          </p>
        </div>

        <div className="flex items-center justify-between border-b border-neutral-300 py-5 text-xs text-neutral-500">
          <span>{language === "zh" ? `${items.length} 条开放机会` : `${items.length} open opportunities`}</span>
          <span>{language === "zh" ? "核对于 2026.08.02" : "Verified 02 Aug 2026"}</span>
        </div>

        <div>
          {items.map((item, index) => (
            <article key={item.id} className="grid gap-6 border-b border-neutral-300 py-9 md:grid-cols-[80px_1.35fr_0.85fr] md:py-12">
              <div className="text-sm text-neutral-400">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <div className="mb-3 text-xs uppercase tracking-[0.16em] text-neutral-500">{item.organization}</div>
                <h2 className="max-w-3xl text-2xl font-semibold leading-tight tracking-[-0.025em] md:text-4xl">
                  {language === "zh" ? item.title_zh || item.title : item.title}
                </h2>
                <p className="mt-5 max-w-2xl leading-7 text-neutral-600">
                  {language === "zh" ? item.summary_zh || item.summary : item.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-600">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="md:border-l md:border-neutral-300 md:pl-7">
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-neutral-400">{language === "zh" ? "地点" : "Location"}</dt>
                    <dd className="mt-1">{item.location}</dd>
                  </div>
                  {item.deadline && <div>
                    <dt className="text-neutral-400">{language === "zh" ? "截止日期" : "Deadline"}</dt>
                    <dd className="mt-1 font-medium">{item.deadline}</dd>
                  </div>}
                  {item.details.map((detail) => <div key={detail.label}>
                    <dt className="text-neutral-400">{language === "zh" ? detail.label_zh : detail.label}</dt>
                    <dd className="mt-1 leading-6">{detail.value}</dd>
                  </div>)}
                </dl>
                <a href={item.source_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full bg-black px-5 py-3 text-sm text-white">
                  {language === "zh" ? "查看官网并申请 ↗" : "Official details & apply ↗"}
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-6 text-neutral-500">
          {language === "zh" ? "ArtBOP 提供信息整理，不代表主办方。名额、费用和截止时间可能调整，提交申请前请再次查看官方网站。" : "ArtBOP curates these listings independently. Availability, fees, and deadlines may change; always confirm details on the official website before applying."}
        </p>
      </section>
      <Footer />
    </main>
  );
}
