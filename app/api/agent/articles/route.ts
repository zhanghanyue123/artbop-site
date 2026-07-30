import { NextResponse } from "next/server";
import { isAgentAuthorized } from "@/lib/agent-auth";
import { upsertEditorArticle } from "@/lib/supabase-rest";
import type { ArticleInput } from "@/lib/articles";

export async function POST(request: Request) {
  if (!isAgentAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const input = (await request.json()) as ArticleInput;

    if (!input.slug || !input.title_en || !input.title_zh) {
      return NextResponse.json(
        { message: "slug、title_en 和 title_zh 为必填项" },
        { status: 400 },
      );
    }

    input.status = "pending_review";
    input.publish_at = null;

    return NextResponse.json(await upsertEditorArticle(input), {
      status: 201,
    });
  } catch (error) {
    console.error("Agent ingest failed:", error);
    return NextResponse.json(
      { message: "Agent 稿件写入失败" },
      { status: 400 },
    );
  }
}
