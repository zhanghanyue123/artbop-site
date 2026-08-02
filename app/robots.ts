import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/editor", "/api/"],
    },
    sitemap: "https://www.artbop.xyz/sitemap.xml",
    host: "https://www.artbop.xyz",
  };
}
