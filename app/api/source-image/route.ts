import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set([
  "platformdali.org",
  "showcase.cgge.media",
  "cdn.prod.website-files.com",
  "ual-media-res.cloudinary.com",
  "rca-media2.rca.ac.uk",
]);

export async function GET(request: NextRequest) {
  const value = request.nextUrl.searchParams.get("url");

  if (!value) {
    return new NextResponse("Missing image URL", { status: 400 });
  }

  let imageUrl: URL;
  try {
    imageUrl = new URL(value);
  } catch {
    return new NextResponse("Invalid image URL", { status: 400 });
  }

  if (imageUrl.protocol !== "https:" || !ALLOWED_HOSTS.has(imageUrl.hostname)) {
    return new NextResponse("Image host is not allowed", { status: 403 });
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        Accept: "image/avif,image/webp,image/png,image/jpeg,*/*",
        "User-Agent": "ArtBOP image preview/1.0",
      },
      next: { revalidate: 86400 },
    });

    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !contentType.startsWith("image/")) {
      return new NextResponse("Source image unavailable", { status: 404 });
    }

    return new NextResponse(response.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new NextResponse("Source image unavailable", { status: 502 });
  }
}
