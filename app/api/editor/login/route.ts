import { NextResponse } from "next/server";
import { EDITOR_COOKIE } from "@/lib/editor-auth";
import { supabaseConfig } from "@/lib/supabase-rest";

type LoginResult = {
  access_token?: string;
  expires_in?: number;
  user?: { email?: string };
  error_description?: string;
  msg?: string;
};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const allowedEmail = process.env.EDITOR_EMAIL?.toLowerCase();

    if (
      !email ||
      !password ||
      (allowedEmail && email.toLowerCase() !== allowedEmail)
    ) {
      return NextResponse.json(
        { message: "邮箱或密码不正确" },
        { status: 401 },
      );
    }

    const { url, anonKey } = supabaseConfig();
    const response = await fetch(
      `${url}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          apikey: anonKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );
    const result = (await response.json()) as LoginResult;

    if (!response.ok || !result.access_token) {
      return NextResponse.json(
        {
          message:
            result.error_description ||
            result.msg ||
            "邮箱或密码不正确",
        },
        { status: 401 },
      );
    }

    const output = NextResponse.json({ ok: true });
    output.cookies.set(EDITOR_COOKIE, result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: result.expires_in || 3600,
    });
    return output;
  } catch (error) {
    console.error("Editor login failed:", error);
    return NextResponse.json(
      { message: "登录服务暂不可用，请检查网站环境变量" },
      { status: 500 },
    );
  }
}
