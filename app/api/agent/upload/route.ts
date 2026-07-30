import { NextResponse } from "next/server";
import { isAgentAuthorized } from "@/lib/agent-auth";
import { uploadArticleImage } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  if (!isAgentAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    const slug = String(form.get("slug") || "agent")
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-|-$/g, "");

    if (!(file instanceof File) || !file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "需要有效图片" },
        { status: 400 },
      );
    }

    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { message: "图片不能超过 20MB" },
        { status: 400 },
      );
    }

    const extension =
      file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") ||
      "jpg";
    const path = `${slug || "agent"}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
    return NextResponse.json({
      url: await uploadArticleImage(path, file),
    });
  } catch (error) {
    console.error("Agent image upload failed:", error);
    return NextResponse.json(
      { message: "Agent 图片上传失败" },
      { status: 500 },
    );
  }
}
