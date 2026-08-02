"use client";

import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import { useLanguage } from "./LanguageContext";

export type OpportunityDetail = {
  type: string;
  typeZh: string;
  backHref: string;
  title: string;
  titleZh?: string;
  organization: string;
  summary: string;
  summaryZh?: string;
  location: string;
  deadline?: string;
  details: { label: string; labelZh: string; value: string }[];
  tags: string[];
  sourceUrl: string;
  sections: { title: string; titleZh: string; body: string; bodyZh: string }[];
};

export default function OpportunityDetailPage({ item }: { item: OpportunityDetail }) {
  const { language } = useLanguage();
  const zh = language === "zh";

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-neutral-950">
      <Header />
      <section className="mx-auto max-w-[1440px] px-5 py-10 md:px-8 md:py-16">
        <Link href={item.backHref} className="text-sm text-neutral-500 hover:text-black">
          ← {zh ? `返回${item.typeZh}` : `Back to ${item.type}`}
        </Link>

        <div className="mt-10 border-b border-neutral-400 pb-10">
          <div className="mb-5 text-xs uppercase tracking-[0.2em] text-neutral-500">
            {item.organization} · {zh ? item.typeZh : item.type}
          </div>
          <h1 className="max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-0.045em] md:text-7xl">
            {zh ? item.titleZh || item.title : item.title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-8 text-neutral-600 md:text-2xl md:leading-10">
            {zh ? item.summaryZh || item.summary : item.summary}
          </p>
        </div>

        <div className="grid gap-12 py-12 md:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.65fr)] md:gap-20">
          <article className="max-w-3xl">
            {item.sections.map((section, index) => (
              <section key={section.title} className={index ? "mt-12 border-t border-neutral-300 pt-10" : ""}>
                <div className="mb-4 text-xs uppercase tracking-[0.18em] text-neutral-400">0{index + 1}</div>
                <h2 className="text-2xl font-semibold tracking-[-0.025em] md:text-3xl">
                  {zh ? section.titleZh : section.title}
                </h2>
                <p className="mt-5 whitespace-pre-line text-lg leading-8 text-neutral-700">
                  {zh ? section.bodyZh : section.body}
                </p>
              </section>
            ))}

            <div className="mt-12 flex flex-wrap gap-2 border-t border-neutral-300 pt-8">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-neutral-300 px-3 py-1.5 text-sm text-neutral-600">{tag}</span>
              ))}
            </div>
          </article>

          <aside>
            <div className="sticky top-8 border-t-2 border-black bg-[#ecebe6] p-6 md:p-7">
              <h2 className="text-xl font-semibold">{zh ? "申请信息" : "Application details"}</h2>
              <dl className="mt-6 space-y-5 text-sm">
                <div><dt className="text-neutral-500">{zh ? "主办机构" : "Organization"}</dt><dd className="mt-1.5 leading-6">{item.organization}</dd></div>
                <div><dt className="text-neutral-500">{zh ? "地点" : "Location"}</dt><dd className="mt-1.5 leading-6">{item.location}</dd></div>
                {item.deadline && <div><dt className="text-neutral-500">{zh ? "截止日期" : "Deadline"}</dt><dd className="mt-1.5 text-base font-semibold">{item.deadline}</dd></div>}
                {item.details.map((detail) => (
                  <div key={detail.label}><dt className="text-neutral-500">{zh ? detail.labelZh : detail.label}</dt><dd className="mt-1.5 leading-6">{detail.value}</dd></div>
                ))}
              </dl>
              <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="mt-8 flex w-full justify-center rounded-full bg-black px-5 py-3.5 text-sm text-white">
                {zh ? "前往官网申请 ↗" : "Apply on official site ↗"}
              </a>
              <p className="mt-4 text-xs leading-5 text-neutral-500">
                {zh ? "信息核对于 2026 年 8 月 2 日。申请前请以主办方官网最新说明为准。" : "Verified 2 August 2026. Confirm the latest terms on the official website before applying."}
              </p>
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}
