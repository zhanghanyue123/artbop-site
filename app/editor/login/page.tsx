"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditorLoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/editor/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(result.message || "登录失败");
      return;
    }

    router.replace("/editor");
  }

  return (
    <main className="min-h-screen bg-neutral-100 px-6 py-20 text-neutral-900">
      <form
        onSubmit={login}
        className="mx-auto max-w-md rounded-[32px] bg-white p-8 shadow-sm"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
          ArtBOP
        </p>
        <h1 className="mt-4 text-3xl font-semibold">编辑后台</h1>
        <p className="mt-2 text-sm leading-6 text-neutral-500">
          使用 Supabase 中创建的编辑账号登录。
        </p>
        <label className="mt-8 block text-sm font-medium">邮箱</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3"
        />
        <label className="mt-5 block text-sm font-medium">密码</label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3"
        />
        {message && (
          <p className="mt-4 text-sm text-red-600">{message}</p>
        )}
        <button
          disabled={loading}
          className="mt-7 w-full rounded-xl bg-black px-5 py-3 text-white disabled:opacity-50"
        >
          {loading ? "登录中…" : "登录"}
        </button>
      </form>
    </main>
  );
}
