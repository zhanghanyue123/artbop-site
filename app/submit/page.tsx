"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAuth } from "../../components/AuthContext";
import {
  createProjectSubmission,
  uploadUserMedia,
} from "../../lib/community-browser";

const categories = [
  "当代艺术",
  "互动装置",
  "数字艺术",
  "声音艺术",
  "影像与动画",
  "创意科技",
  "建筑与空间",
  "其他",
];

export default function SubmitPage() {
  const { loading, user, session } = useAuth();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>, status: "draft" | "pending_review") {
    event.preventDefault();
    if (!session) return;
    setBusy(true);
    setMessage("");

    try {
      const form = new FormData(event.currentTarget);
      const files = form
        .getAll("images")
        .filter((value): value is File => value instanceof File && value.size > 0)
        .slice(0, 10);
      const imageUrls = [];
      for (const file of files) {
        imageUrls.push(
          await uploadUserMedia(session, "submission-media", file),
        );
      }
      await createProjectSubmission(session, {
        projectTitle: String(form.get("projectTitle") || ""),
        category: String(form.get("category") || ""),
        authorOrStudio: String(form.get("authorOrStudio") || ""),
        contactEmail: String(form.get("contactEmail") || ""),
        description: String(form.get("description") || ""),
        institution: String(form.get("institution") || ""),
        projectUrl: String(form.get("projectUrl") || ""),
        imageUrls,
        rightsConfirmed: form.get("rightsConfirmed") === "on",
        status,
      });
      event.currentTarget.reset();
      setMessage(
        status === "draft"
          ? "草稿已保存。"
          : "投稿已收到，编辑审核后会更新状态。",
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "提交失败");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-neutral-950">
      <Header />
      <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-8 border-b border-neutral-300 pb-10 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-neutral-500">
              Project Submission
            </div>
            <h1 className="text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
              提交你的项目
            </h1>
          </div>
          <p className="max-w-xl text-lg leading-8 text-neutral-600">
            欢迎艺术家、工作室、学校与文化机构提交真实项目。编辑审核通过后，作品将以 ArtBOP 正式项目页面发布。
          </p>
        </div>
      </section>

      {!loading && !user ? (
        <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-8">
          <div className="border-t border-neutral-400 pt-6">
            <h2 className="text-3xl font-semibold">登录后开始投稿</h2>
            <div className="mt-6 flex gap-3">
              <Link href="/login" className="rounded-full bg-black px-5 py-3 text-sm text-white">
                登录
              </Link>
              <Link href="/register" className="rounded-full border border-neutral-400 px-5 py-3 text-sm">
                创建账号
              </Link>
            </div>
          </div>
        </section>
      ) : session ? (
        <section className="mx-auto max-w-4xl px-5 pb-24 md:px-8">
          <form
            onSubmit={(event) => submit(event, "pending_review")}
            className="space-y-8 border-t border-neutral-400 pt-8"
          >
            <div className="grid gap-7 md:grid-cols-2">
              <Field label="项目名称" name="projectTitle" required />
              <label className="block">
                <span className="mb-2 block text-sm">分类</span>
                <select name="category" className="w-full border-b border-neutral-400 bg-transparent py-3 outline-none">
                  {categories.map((category) => <option key={category}>{category}</option>)}
                </select>
              </label>
              <Field label="艺术家 / 团队 / 工作室" name="authorOrStudio" required />
              <Field label="学校、机构或展馆（可选）" name="institution" />
              <Field label="联系邮箱" name="contactEmail" type="email" required defaultValue={user?.email || ""} />
              <Field label="项目链接（可选）" name="projectUrl" type="url" />
            </div>

            <label className="block">
              <span className="mb-2 block text-sm">项目介绍</span>
              <textarea name="description" required minLength={100} rows={10} className="w-full resize-none border border-neutral-400 bg-transparent p-4 leading-7 outline-none focus:border-black" />
              <span className="mt-2 block text-xs text-neutral-500">至少 100 字，请说明作品背景、体验、方法和创作者信息。</span>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm">项目图片（最多 10 张）</span>
              <input name="images" type="file" multiple required accept="image/jpeg,image/png,image/webp" />
            </label>

            <label className="flex gap-3 text-sm leading-6">
              <input name="rightsConfirmed" type="checkbox" required className="mt-1" />
              <span>我确认拥有提交文字和图片的使用权，并授权 ArtBOP 在审核通过后用于项目展示与推广。</span>
            </label>

            {message && <p className="border-l-2 border-black pl-4 text-sm leading-6">{message}</p>}
            <div className="flex flex-wrap gap-3">
              <button disabled={busy} className="rounded-full bg-black px-6 py-3 text-sm text-white disabled:opacity-50">
                {busy ? "提交中…" : "提交审核"}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={(event) => {
                  const form = event.currentTarget.form;
                  if (form) submit({ preventDefault() {}, currentTarget: form } as unknown as FormEvent<HTMLFormElement>, "draft");
                }}
                className="rounded-full border border-neutral-400 px-6 py-3 text-sm disabled:opacity-50"
              >
                保存草稿
              </button>
            </div>
          </form>
        </section>
      ) : null}
      <Footer />
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="w-full border-b border-neutral-400 bg-transparent py-3 outline-none focus:border-black"
      />
    </label>
  );
}
