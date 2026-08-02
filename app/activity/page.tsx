"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAuth } from "../../components/AuthContext";
import {
  CommunityPost,
  createCommunityPost,
  getPublishedCommunityPosts,
  uploadUserMedia,
} from "../../lib/community-browser";

export default function ActivityPage() {
  const { loading, user, session } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [content, setContent] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getPublishedCommunityPosts().then(setPosts).catch(() => setPosts([]));
  }, []);

  async function publish(event: FormEvent) {
    event.preventDefault();
    if (!session) return;
    setBusy(true);
    setMessage("");

    try {
      const imageUrls = file
        ? [await uploadUserMedia(session, "community-media", file)]
        : [];
      await createCommunityPost(session, { content, linkUrl, imageUrls });
      setContent("");
      setLinkUrl("");
      setFile(null);
      setMessage("动态已提交，审核通过后会公开显示。");
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
              Community Activity
            </div>
            <h1 className="text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
              社区动态
            </h1>
          </div>
          <p className="max-w-xl text-lg leading-8 text-neutral-600">
            分享项目、创作过程、研究线索与值得讨论的艺术科技内容。所有新动态先经过审核。
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-24 md:grid-cols-[0.8fr_1.6fr] md:px-8">
        <aside>
          {!loading && !user && (
            <div className="border-t border-neutral-400 pt-5">
              <h2 className="text-2xl font-semibold">加入讨论</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                注册后可以发布动态并提交自己的项目。
              </p>
              <Link
                href="/register"
                className="mt-6 inline-flex rounded-full bg-black px-5 py-3 text-sm text-white"
              >
                创建账号
              </Link>
            </div>
          )}

          {session && (
            <form onSubmit={publish} className="border-t border-neutral-400 pt-5">
              <h2 className="mb-5 text-2xl font-semibold">发布动态</h2>
              <textarea
                required
                maxLength={2000}
                rows={7}
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="分享项目、研究或创作过程……"
                className="w-full resize-none border border-neutral-400 bg-transparent p-4 outline-none focus:border-black"
              />
              <input
                type="url"
                value={linkUrl}
                onChange={(event) => setLinkUrl(event.target.value)}
                placeholder="相关链接（可选）"
                className="mt-3 w-full border-b border-neutral-400 bg-transparent py-3 outline-none focus:border-black"
              />
              <label className="mt-5 block text-sm">
                <span className="mb-2 block">图片（可选）</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(event) => setFile(event.target.files?.[0] || null)}
                />
              </label>
              {message && <p className="mt-4 text-sm leading-6">{message}</p>}
              <button
                disabled={busy}
                className="mt-5 rounded-full bg-black px-5 py-3 text-sm text-white disabled:opacity-50"
              >
                {busy ? "提交中…" : "提交审核"}
              </button>
            </form>
          )}
        </aside>

        <div className="space-y-10">
          {posts.length === 0 ? (
            <div className="border-t border-neutral-400 py-8 text-neutral-500">
              还没有公开动态，成为第一位分享者。
            </div>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="border-t border-neutral-400 pt-5">
                <div className="flex items-center justify-between text-sm text-neutral-500">
                  <span>
                    {post.profiles?.display_name ||
                      post.profiles?.username ||
                      "ArtBOP 用户"}
                  </span>
                  <time>{new Date(post.created_at).toLocaleDateString("zh-CN")}</time>
                </div>
                <p className="mt-5 whitespace-pre-wrap text-lg leading-8">
                  {post.content}
                </p>
                {post.image_urls[0] && (
                  <img
                    src={post.image_urls[0]}
                    alt="社区动态图片"
                    className="mt-6 max-h-[680px] w-full bg-neutral-200 object-contain"
                  />
                )}
                {post.link_url && (
                  <a
                    href={post.link_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-block break-all text-sm underline underline-offset-4"
                  >
                    {post.link_url}
                  </a>
                )}
              </article>
            ))
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
