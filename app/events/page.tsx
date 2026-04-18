"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLanguage } from "../../components/LanguageContext";
import { events } from "../../data/events";

const content = {
  en: {
    title: "Events",
    description:
      "Talks, exhibitions, screenings, workshops, and community gatherings.",
    empty: "No events yet.",
    source: "Source",
    organizer: "Organizer",
    location: "Location",
  },
  zh: {
    title: "活动",
    description: "讲座、展览、放映、工作坊与社区活动。",
    empty: "暂时还没有活动内容。",
    source: "来源",
    organizer: "主办方",
    location: "地点",
  },
};

export default function EventsPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header />

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
          {t.title}
        </h1>
        <p className="mt-6 text-lg text-neutral-600 leading-8 max-w-2xl">
          {t.description}
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        {events.length === 0 ? (
          <div className="border border-neutral-200 bg-white rounded-[24px] p-8 text-neutral-500">
            {t.empty}
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((item) => (
              <article
                key={item.id}
                className="border border-neutral-200 bg-white rounded-[24px] p-6"
              >
                <div className="text-xs uppercase tracking-[0.22em] text-neutral-500 mb-3">
                  {item.category}
                </div>

                <h2 className="text-2xl font-semibold tracking-tight">
                  {language === "zh" && item.title_zh ? item.title_zh : item.title}
                </h2>

                <p className="mt-4 text-neutral-700 leading-8">
                  {language === "zh" && item.summary_zh
                    ? item.summary_zh
                    : item.summary}
                </p>

                <div className="mt-5 space-y-2 text-sm text-neutral-500">
                  <div>
                    {t.organizer}: {item.organizer}
                  </div>
                  <div>
                    {t.location}: {item.location}
                  </div>
                  {item.start_date && <div>Date: {item.start_date}</div>}
                </div>

                <a
                  href={item.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-5 text-sm underline underline-offset-4 text-neutral-700"
                >
                  {t.source}
                </a>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}