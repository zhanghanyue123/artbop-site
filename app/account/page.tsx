"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAuth } from "../../components/AuthContext";

export default function AccountPage() {
  const router = useRouter();
  const { loading, user, logout } = useAuth();

  if (loading) {
    return <main className="min-h-screen bg-[#f4f3ef] p-8">加载中…</main>;
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#f4f3ef] text-neutral-950">
        <Header />
        <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-8">
          <h1 className="text-5xl font-semibold tracking-[-0.04em]">
            请先登录
          </h1>
          <Link
            href="/login"
            className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm text-white"
          >
            前往登录
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  const displayName =
    typeof user.user_metadata?.display_name === "string"
      ? user.user_metadata.display_name
      : "ArtBOP 用户";

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-neutral-950">
      <Header />
      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-24">
        <div className="border-b border-neutral-300 pb-10">
          <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-neutral-500">
            Account
          </div>
          <h1 className="text-5xl font-semibold tracking-[-0.04em] md:text-7xl">
            {displayName}
          </h1>
          <p className="mt-4 text-neutral-600">{user.email}</p>
        </div>

        <div className="grid gap-6 py-10 md:grid-cols-3">
          <Link href="/activity" className="border-t border-neutral-400 pt-4">
            <h2 className="text-2xl font-semibold">我的动态</h2>
            <p className="mt-2 text-sm text-neutral-600">查看和管理社区发布</p>
          </Link>
          <Link href="/submit" className="border-t border-neutral-400 pt-4">
            <h2 className="text-2xl font-semibold">项目投稿</h2>
            <p className="mt-2 text-sm text-neutral-600">提交作品并查看审核状态</p>
          </Link>
          <button
            onClick={async () => {
              await logout();
              router.push("/");
            }}
            className="border-t border-neutral-400 pt-4 text-left"
          >
            <h2 className="text-2xl font-semibold">退出登录</h2>
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
