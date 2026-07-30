import { NextResponse } from "next/server";
import { requireEditor } from "@/lib/editor-auth";
import {
  createEditorArticle,
  getEditorArticles,
} from "@/lib/supabase-rest";

export async function GET() {
  if (!(await requireEditor())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json(await getEditorArticles());
  } catch (error) {
    console.error("Unable to list editor articles:", error);
    return NextResponse.json(
      { message: "无法读取文章，请检查 Supabase 配置" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!(await requireEditor())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json(
      await createEditorArticle(await request.json()),
      { status: 201 },
    );
  } catch (error) {
    console.error("Unable to create article:", error);
    return NextResponse.json(
      { message: "保存失败，请检查必填项和 slug 是否重复" },
      { status: 400 },
    );
  }
}
