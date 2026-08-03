"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "./AuthContext";

export default function AuthShell({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const { login, register } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const isRegister = mode === "register";

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      if (isRegister) {
        const result = await register(email, password, displayName);
        if (result.confirmationRequired) {
          setMessage("注册成功，请前往邮箱完成验证后登录。");
          return;
        }
      } else {
        await login(email, password);
      }
      router.push("/account");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "请求失败，请稍后再试");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-neutral-950">
      <Header />
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1fr_0.8fr] md:px-8 md:py-24">
        <div>
          <div className="mb-5 text-[11px] uppercase tracking-[0.28em] text-neutral-500">
            ArtBOP Community
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
            {isRegister ? "加入 ArtBOP 社区。" : "欢迎回来。"}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-600">
            {isRegister
              ? "建立个人资料，分享创作动态，并向编辑部提交你的艺术与创意科技项目。"
              : "登录后继续管理个人资料、动态和项目投稿。"}
          </p>
        </div>

        <form
          onSubmit={submit}
          className="border-t border-neutral-400 pt-7 md:border-l md:border-t-0 md:pl-10 md:pt-0"
        >
          {isRegister && (
            <label className="mb-6 block">
              <span className="mb-2 block text-sm">显示名称</span>
              <input
                required
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                className="w-full border-b border-neutral-500 bg-transparent px-0 py-3 text-lg outline-none focus:border-black"
                autoComplete="name"
              />
            </label>
          )}

          <label className="mb-6 block">
            <span className="mb-2 block text-sm">邮箱</span>
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full border-b border-neutral-500 bg-transparent px-0 py-3 text-lg outline-none focus:border-black"
              autoComplete="email"
            />
          </label>

          <label className="mb-8 block">
            <span className="mb-2 block text-sm">密码</span>
            <input
              required
              minLength={8}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border-b border-neutral-500 bg-transparent px-0 py-3 text-lg outline-none focus:border-black"
              autoComplete={isRegister ? "new-password" : "current-password"}
            />
            {isRegister && (
              <span className="mt-2 block text-xs text-neutral-500">
                至少 8 个字符
              </span>
            )}
          </label>

          {!isRegister && (
            <div className="-mt-5 mb-8 text-right text-sm">
              <Link href="/forgot-password" className="underline underline-offset-4">
                忘记密码？
              </Link>
            </div>
          )}

          {message && (
            <p className="mb-6 border-l-2 border-neutral-900 pl-4 text-sm leading-6">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-black px-6 py-3 text-sm text-white disabled:opacity-50"
          >
            {busy ? "处理中…" : isRegister ? "创建账号" : "登录"}
          </button>

          <p className="mt-8 text-sm text-neutral-600">
            {isRegister ? "已经有账号？" : "还没有账号？"}{" "}
            <Link
              href={isRegister ? "/login" : "/register"}
              className="underline underline-offset-4"
            >
              {isRegister ? "登录" : "立即注册"}
            </Link>
          </p>
        </form>
      </section>
      <Footer />
    </main>
  );
}
