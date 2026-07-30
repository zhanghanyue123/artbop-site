import { NextResponse } from "next/server";
import { getPublicArticle } from "@/lib/supabase-rest";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await context.params;
    const article = await getPublicArticle(slug);

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Public article unavailable:", error);
    return NextResponse.json(
      { message: "Article not found" },
      { status: 404 },
    );
  }
}
