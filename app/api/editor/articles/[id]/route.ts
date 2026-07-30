import { NextResponse } from "next/server";
import { requireEditor } from "@/lib/editor-auth";
import {
  deleteEditorArticle,
  updateEditorArticle,
} from "@/lib/supabase-rest";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await requireEditor())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    return NextResponse.json(
      await updateEditorArticle(id, await request.json()),
    );
  } catch (error) {
    console.error("Unable to update article:", error);
    return NextResponse.json(
      { message: "保存失败，请检查内容" },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await requireEditor())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    await deleteEditorArticle(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to delete article:", error);
    return NextResponse.json(
      { message: "删除失败" },
      { status: 400 },
    );
  }
}
