"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLanguage } from "../../components/LanguageContext";

const content = {
  en: {
    eyebrow: "Submission",
    title: "Submit your project",
    description:
      "Share your work with the ArtBop community. Projects can be published to the community stream or submitted for editorial review.",
    formTitle: "Project Information",
    projectName: "Project title",
    category: "Category",
    author: "Author / Studio",
    email: "Email",
    descriptionLabel: "Project description",
    image: "Upload cover image",
    submit: "Submit Project",
    draft: "Save Draft",
    note: "Official editorial features are reviewed separately from community submissions.",
    categories: [
      "Art",
      "Design",
      "Architecture",
      "Visual Culture",
      "Moving Image",
      "Technology",
    ],
  },
  zh: {
    eyebrow: "投稿",
    title: "提交你的项目",
    description:
      "将你的作品发布到 ArtBop 社区。项目可以直接发布到社区内容流，或提交给编辑部进行精选审核。",
    formTitle: "项目信息",
    projectName: "项目标题",
    category: "分类",
    author: "作者 / 工作室",
    email: "邮箱",
    descriptionLabel: "项目描述",
    image: "上传封面图片",
    submit: "提交项目",
    draft: "保存草稿",
    note: "官方编辑精选与社区投稿会采用不同的审核流程。",
    categories: ["艺术", "设计", "建筑", "视觉文化", "动态影像", "技术"],
  },
};

export default function SubmitPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header />

      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-4">
          {t.eyebrow}
        </div>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-none max-w-3xl">
          {t.title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-neutral-600 leading-8">
          {t.description}
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-white border border-neutral-200 rounded-[32px] p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">{t.formTitle}</h2>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t.projectName}
              </label>
              <input
                type="text"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none focus:border-black"
                placeholder={t.projectName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t.category}
              </label>
              <select className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none focus:border-black bg-white">
                {t.categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t.author}
              </label>
              <input
                type="text"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none focus:border-black"
                placeholder={t.author}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t.email}
              </label>
              <input
                type="email"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none focus:border-black"
                placeholder={t.email}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t.descriptionLabel}
              </label>
              <textarea
                rows={6}
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3 outline-none focus:border-black resize-none"
                placeholder={t.descriptionLabel}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t.image}
              </label>
              <input
                type="file"
                className="block w-full text-sm text-neutral-600"
              />
            </div>

            <p className="text-sm text-neutral-500 leading-7">{t.note}</p>

            <div className="flex gap-4 pt-2">
              <button
                type="button"
                className="px-5 py-3 rounded-2xl bg-black text-white text-sm"
              >
                {t.submit}
              </button>
              <button
                type="button"
                className="px-5 py-3 rounded-2xl border border-neutral-300 text-sm"
              >
                {t.draft}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}