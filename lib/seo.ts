import type { Metadata } from "next";

export const siteUrl = "https://www.artbop.xyz";

export function opportunityMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      siteName: "ArtBOP",
      locale: "zh_CN",
      title,
      description,
      url: `${siteUrl}${path}`,
      images: image ? [{ url: image, alt: title }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
