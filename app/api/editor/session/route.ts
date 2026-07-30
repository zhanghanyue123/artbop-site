import { NextResponse } from "next/server";
import { requireEditor } from "@/lib/editor-auth";

export async function GET() {
  const user = await requireEditor();

  if (!user) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 },
    );
  }

  return NextResponse.json({
    authenticated: true,
    email: user.email,
  });
}
