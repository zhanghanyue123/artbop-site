import { NextResponse } from "next/server";
import { requireEditor } from "@/lib/editor-auth";
import { uploadArticleImage } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  if (!(await requireEditor())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    const slug = String(form.get("slug") || "uploads")
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-|-$/g, "");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { message: "请选择图片" },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/") || file.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { message: "仅支持 20MB 以内的图片" },
        { status: 400 },
      );
    }

    const extension =
      file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") ||
      "jpg";
    const path = `${slug || "uploads"}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
    return NextResponse.json({
      url: await uploadArticleImage(path, file),
    });
  } catch (error) {
    console.error("Image upload failed:", error);
    return NextResponse.json(
      { message: "图片上传失败，请检查存储配置" },
      { status: 500 },
    );
  }
}
