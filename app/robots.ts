import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["Baiduspider", "Baiduspider-render"],
        allow: "/",
        disallow: ["/editor", "/api/", "/account", "/login", "/register", "/forgot-password", "/reset-password"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/editor", "/api/", "/account", "/login", "/register", "/forgot-password", "/reset-password"],
      },
    ],
    sitemap: "https://www.artbop.xyz/sitemap.xml",
    host: "https://www.artbop.xyz",
  };
}
