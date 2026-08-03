"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { requestPasswordReset, updatePassword } from "../lib/auth-browser";

export default function PasswordRecoveryShell({ mode }: { mode: "request" | "reset" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);
  const isReset = mode === "reset";

  useEffect(() => {
    if (!isReset) return;
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const token = params.get("access_token") || "";
    const error = params.get("error_description");
    setAccessToken(token);
    if (error) setMessage(decodeURIComponent(error.replace(/\+/g, " ")));
    else if (!token) setMessage("重置链接无效或已经过期，请重新申请。 ");
  }, [isReset]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      if (!isReset) {
        await requestPasswordReset(email, `${window.location.origin}/reset-password`);
        setSuccess(true);
        setMessage("重置邮件已发送。如果该邮箱已注册，请检查收件箱和垃圾邮件。 ");
      } else {
        if (!accessToken) throw new Error("重置链接无效或已经过期，请重新申请。");
        if (password.length < 8) throw new Error("新密码至少需要 8 个字符。");
        if (password !== confirmation) throw new Error("两次输入的密码不一致。");
        await updatePassword(accessToken, password);
        setSuccess(true);
        setMessage("密码已更新，现在可以使用新密码登录。 ");
        window.history.replaceState(null, "", "/reset-password");
      }
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
          <div className="mb-5 text-[11px] uppercase tracking-[0.28em] text-neutral-500">ArtBOP Account</div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
            {isReset ? "设置新密码。" : "找回账号。"}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-600">
            {isReset ? "输入新的登录密码，完成后即可返回 ArtBOP。" : "输入注册邮箱，我们会向你发送安全的密码重置链接。"}
          </p>
        </div>

        <form onSubmit={submit} className="border-t border-neutral-400 pt-7 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          {!isReset ? (
            <label className="mb-8 block">
              <span className="mb-2 block text-sm">注册邮箱</span>
              <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" className="w-full border-b border-neutral-500 bg-transparent py-3 text-lg outline-none focus:border-black" />
            </label>
          ) : (
            <>
              <label className="mb-6 block">
                <span className="mb-2 block text-sm">新密码</span>
                <input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" className="w-full border-b border-neutral-500 bg-transparent py-3 text-lg outline-none focus:border-black" />
              </label>
              <label className="mb-8 block">
                <span className="mb-2 block text-sm">再次输入新密码</span>
                <input required minLength={8} type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} autoComplete="new-password" className="w-full border-b border-neutral-500 bg-transparent py-3 text-lg outline-none focus:border-black" />
              </label>
            </>
          )}

          {message && <p className={`mb-6 border-l-2 pl-4 text-sm leading-6 ${success ? "border-green-700" : "border-neutral-900"}`}>{message}</p>}

          {!success && (
            <button type="submit" disabled={busy || (isReset && !accessToken)} className="rounded-full bg-black px-6 py-3 text-sm text-white disabled:opacity-40">
              {busy ? "处理中…" : isReset ? "更新密码" : "发送重置邮件"}
            </button>
          )}

          <p className="mt-8 text-sm text-neutral-600">
            <Link href="/login" className="underline underline-offset-4">返回登录</Link>
          </p>
        </form>
      </section>
      <Footer />
    </main>
  );
}
