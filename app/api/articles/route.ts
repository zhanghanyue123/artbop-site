import { NextResponse } from "next/server";
import { getPublicArticles } from "@/lib/supabase-rest";

export async function GET() {
  try {
    return NextResponse.json(await getPublicArticles());
  } catch (error) {
    console.error("Public articles unavailable:", error);
    return NextResponse.json([]);
  }
}
