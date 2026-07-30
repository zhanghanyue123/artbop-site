"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type {
  ArticleInput,
  ArticleRecord,
  ArticleStatus,
} from "@/lib/articles";

type Props = { email: string };

const emptyArticle: ArticleInput = {
  slug: "",
  status: "draft",
  publish_at: null,
  title_en: "",
  title_zh: "",
  excerpt_en: "",
  excerpt_zh: "",
  body_en: [],
  body_zh: [],
  category_en: "",
  category_zh: "",
  author: "",
  team: "",
  source_name: "",
  source_url: "",
  cover_url: "",
  images: [],
  xhs_title: "",
  xhs_content: "",
  hashtags: [],
};

const statusLabels: Record<ArticleStatus, string> = {
  draft: "草稿",
  pending_review: "待审核",
  scheduled: "定时发布",
  published: "已发布",
};

function toInput(article: ArticleRecord): ArticleInput {
  const { id: _id, created_at: _created, updated_at: _updated, ...input } =
    article;
  void _id;
  void _created;
  void _updated;
  return input;
}

export default function EditorWorkspace({ email }: Props) {
  const [articles, setArticles] = useState<ArticleRecord[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ArticleInput>(emptyArticle);
  const [message, setMessage] = useState("正在读取内容…");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const selected = useMemo(
    () => articles.find((article) => article.id === selectedId),
    [articles, selectedId],
  );

  async function loadArticles() {
    const response = await fetch("/api/editor/articles", {
      cache: "no-store",
    });

    if (response.status === 401) {
      window.location.href = "/editor/login";
      return;
    }

    const result = await response.json();
    if (!response.ok) {
      setMessage(result.message || "读取失败");
      return;
    }

    setArticles(result);
    setMessage(result.length ? "" : "还没有文章，可以新建第一篇。");
  }

  useEffect(() => {
    fetch("/api/editor/articles", { cache: "no-store" })
      .then(async (response) => {
        if (response.status === 401) {
          window.location.href = "/editor/login";
          return null;
        }

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "读取失败");
        }
        return result as ArticleRecord[];
      })
      .then((result) => {
        if (!result) return;
        setArticles(result);
        setMessage(result.length ? "" : "还没有文章，可以新建第一篇。");
      })
      .catch((error: Error) => setMessage(error.message));
  }, []);

  function chooseArticle(article: ArticleRecord) {
    setSelectedId(article.id);
    setDraft(toInput(article));
    setMessage("");
  }

  function setField<K extends keyof ArticleInput>(
    key: K,
    value: ArticleInput[K],
  ) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function saveArticle(statusOverride?: ArticleStatus) {
    if (!draft.slug || !draft.title_en || !draft.title_zh) {
      setMessage("请至少填写 slug、中英文标题。");
      return;
    }

    const nextStatus = statusOverride || draft.status;
    if (nextStatus === "scheduled" && !draft.publish_at) {
      setMessage("选择定时发布时必须填写发布时间。");
      return;
    }

    const payload = {
      ...draft,
      status: nextStatus,
      publish_at:
        nextStatus === "scheduled" ? draft.publish_at : null,
    };
    setSaving(true);
    setMessage(
      nextStatus === "published"
        ? "正在发布到网站…"
        : "正在保存草稿…",
    );
    const response = await fetch(
      selectedId
        ? `/api/editor/articles/${selectedId}`
        : "/api/editor/articles",
      {
        method: selectedId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const result = await response.json();
    setSaving(false);

    if (!response.ok) {
      setMessage(result.message || "保存失败");
      return;
    }

    setSelectedId(result.id);
    setDraft(toInput(result));
    setMessage(
      result.status === "published"
        ? "保存成功，文章已在网站公开。"
        : "保存成功。",
    );
    await loadArticles();
  }

  async function deleteArticle() {
    if (!selectedId || !window.confirm("确定删除这篇文章吗？")) {
      return;
    }

    const response = await fetch(`/api/editor/articles/${selectedId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setMessage("删除失败");
      return;
    }

    setSelectedId(null);
    setDraft(emptyArticle);
    setMessage("文章已删除。");
    await loadArticles();
  }

  async function upload(
    event: ChangeEvent<HTMLInputElement>,
    asCover: boolean,
  ) {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setUploading(true);
    setMessage("正在上传原图…");
    const urls: string[] = [];

    for (const file of files) {
      const form = new FormData();
      form.append("file", file);
      form.append("slug", draft.slug || "new-article");
      const response = await fetch("/api/editor/upload", {
        method: "POST",
        body: form,
      });
      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "上传失败");
        setUploading(false);
        return;
      }
      urls.push(result.url);
    }

    setDraft((current) => ({
      ...current,
      cover_url: asCover ? urls[0] : current.cover_url,
      images: asCover ? current.images : [...current.images, ...urls],
    }));
    setUploading(false);
    setMessage("图片上传完成，记得保存文章。");
    event.target.value = "";
  }

  async function logout() {
    await fetch("/api/editor/logout", { method: "POST" });
    window.location.href = "/editor/login";
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-sm";
  const labelClass = "block text-sm font-medium text-neutral-700";

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-900">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 bg-white px-6 py-5">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
            ArtBOP Editor
          </p>
          <h1 className="mt-1 text-2xl font-semibold">内容发布后台</h1>
        </div>
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <span>{email}</span>
          <Link href="/" className="rounded-xl border px-4 py-2">查看网站</Link>
          <button onClick={logout} className="rounded-xl border px-4 py-2">
            退出
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-6 p-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-3xl bg-white p-4 shadow-sm">
          <button
            onClick={() => {
              setSelectedId(null);
              setDraft(emptyArticle);
              setMessage("");
            }}
            className="w-full rounded-xl bg-black px-4 py-3 text-sm text-white"
          >
            ＋ 新建文章
          </button>
          <div className="mt-4 space-y-2">
            {articles.map((article) => (
              <button
                key={article.id}
                onClick={() => chooseArticle(article)}
                className={`w-full rounded-2xl border p-4 text-left ${
                  selectedId === article.id
                    ? "border-black bg-neutral-50"
                    : "border-neutral-200"
                }`}
              >
                <span className="text-xs text-neutral-500">
                  {statusLabels[article.status]}
                </span>
                <strong className="mt-1 block text-sm leading-5">
                  {article.title_zh || article.title_en}
                </strong>
              </button>
            ))}
          </div>
        </aside>

        <section className="rounded-3xl bg-white p-5 shadow-sm md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <label className={labelClass}>
              Slug（网址英文名）
              <input
                value={draft.slug}
                onChange={(event) => setField("slug", event.target.value)}
                className={inputClass}
                placeholder="replica-algorithmic-identity"
              />
            </label>
            <label className={labelClass}>
              状态
              <select
                value={draft.status}
                onChange={(event) =>
                  setField("status", event.target.value as ArticleStatus)
                }
                className={inputClass}
              >
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>
            {draft.status === "scheduled" && (
              <label className={labelClass}>
                定时发布时间
                <input
                  type="datetime-local"
                  value={draft.publish_at?.slice(0, 16) || ""}
                  onChange={(event) =>
                    setField(
                      "publish_at",
                      event.target.value
                        ? new Date(event.target.value).toISOString()
                        : null,
                    )
                  }
                  className={inputClass}
                />
              </label>
            )}
            <label className={labelClass}>
              中文标题
              <input value={draft.title_zh} onChange={(event) => setField("title_zh", event.target.value)} className={inputClass} />
            </label>
            <label className={labelClass}>
              英文标题
              <input value={draft.title_en} onChange={(event) => setField("title_en", event.target.value)} className={inputClass} />
            </label>
            <label className={labelClass}>
              中文分类
              <input value={draft.category_zh} onChange={(event) => setField("category_zh", event.target.value)} className={inputClass} />
            </label>
            <label className={labelClass}>
              英文分类
              <input value={draft.category_en} onChange={(event) => setField("category_en", event.target.value)} className={inputClass} />
            </label>
            <label className={`${labelClass} md:col-span-2`}>
              中文摘要
              <textarea value={draft.excerpt_zh} onChange={(event) => setField("excerpt_zh", event.target.value)} className={`${inputClass} min-h-24`} />
            </label>
            <label className={`${labelClass} md:col-span-2`}>
              英文摘要
              <textarea value={draft.excerpt_en} onChange={(event) => setField("excerpt_en", event.target.value)} className={`${inputClass} min-h-24`} />
            </label>
            <label className={`${labelClass} md:col-span-2`}>
              中文正文（每段之间空一行）
              <textarea value={draft.body_zh.join("\n\n")} onChange={(event) => setField("body_zh", event.target.value.split(/\n\s*\n/).filter(Boolean))} className={`${inputClass} min-h-56`} />
            </label>
            <label className={`${labelClass} md:col-span-2`}>
              英文正文（每段之间空一行）
              <textarea value={draft.body_en.join("\n\n")} onChange={(event) => setField("body_en", event.target.value.split(/\n\s*\n/).filter(Boolean))} className={`${inputClass} min-h-56`} />
            </label>
            <label className={labelClass}>
              作者
              <input value={draft.author} onChange={(event) => setField("author", event.target.value)} className={inputClass} />
            </label>
            <label className={labelClass}>
              团队
              <input value={draft.team} onChange={(event) => setField("team", event.target.value)} className={inputClass} />
            </label>
            <label className={labelClass}>
              来源名称
              <input value={draft.source_name} onChange={(event) => setField("source_name", event.target.value)} className={inputClass} />
            </label>
            <label className={labelClass}>
              来源网址
              <input value={draft.source_url} onChange={(event) => setField("source_url", event.target.value)} className={inputClass} />
            </label>
          </div>

          <div className="mt-7 rounded-2xl bg-neutral-50 p-5">
            <h2 className="font-semibold">图片</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <label className="cursor-pointer rounded-xl bg-black px-4 py-2 text-sm text-white">
                上传合成封面
                <input type="file" accept="image/*" onChange={(event) => upload(event, true)} className="hidden" />
              </label>
              <label className="cursor-pointer rounded-xl border bg-white px-4 py-2 text-sm">
                上传正文原图
                <input type="file" accept="image/*" multiple onChange={(event) => upload(event, false)} className="hidden" />
              </label>
              {uploading && <span className="text-sm text-neutral-500">上传中…</span>}
            </div>
            {draft.cover_url && (
              <div className="mt-4">
                <p className="mb-2 text-xs text-neutral-500">封面</p>
                <img src={draft.cover_url} alt="" className="h-40 rounded-xl object-cover" />
              </div>
            )}
            <div className="mt-4 grid grid-cols-3 gap-3 md:grid-cols-6">
              {draft.images.map((url, index) => (
                <button
                  key={`${url}-${index}`}
                  title="点击移除"
                  onClick={() => setField("images", draft.images.filter((_, itemIndex) => itemIndex !== index))}
                >
                  <img src={url} alt="" className="aspect-square w-full rounded-xl object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 rounded-2xl border p-5">
            <h2 className="font-semibold">网站文章标签</h2>
            <p className="mt-1 text-sm text-neutral-500">
              用空格分隔多个标签，例如：#ArtBOP #数字艺术 #交互设计
            </p>
            <label className={`${labelClass} mt-4`}>
              # 标签（空格分隔）
              <input
                value={draft.hashtags.join(" ")}
                onChange={(event) =>
                  setField(
                    "hashtags",
                    event.target.value.split(/\s+/).filter(Boolean),
                  )
                }
                className={inputClass}
              />
            </label>
          </div>

          {message && <p className="mt-5 text-sm text-neutral-600">{message}</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              disabled={saving}
              onClick={() => saveArticle("draft")}
              className="rounded-xl border border-neutral-300 px-6 py-3 text-sm disabled:opacity-50"
            >
              {saving ? "处理中…" : "保存草稿"}
            </button>
            <button
              disabled={saving}
              onClick={() => saveArticle("published")}
              className="rounded-xl bg-black px-6 py-3 text-sm text-white disabled:opacity-50"
            >
              {saving ? "处理中…" : "发布到网站"}
            </button>
            {selected && (
              <>
                <a href={`/articles/${selected.slug}`} target="_blank" className="rounded-xl border px-6 py-3 text-sm">预览文章</a>
                <button onClick={deleteArticle} className="rounded-xl border border-red-200 px-6 py-3 text-sm text-red-600">删除</button>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
