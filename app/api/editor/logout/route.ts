import { NextResponse } from "next/server";
import { EDITOR_COOKIE } from "@/lib/editor-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(EDITOR_COOKIE, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return response;
}
