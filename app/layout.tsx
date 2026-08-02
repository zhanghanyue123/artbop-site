import "./globals.css";
import { LanguageProvider } from "../components/LanguageContext";
import { AuthProvider } from "../components/AuthContext";
import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.artbop.xyz"),
  title: {
    default: "ArtBOP｜当代艺术与创意科技内容平台",
    template: "%s｜ArtBOP",
  },
  description:
    "ArtBOP 关注当代艺术、创意科技、互动装置、数字艺术与跨学科实践，持续发布经过编辑的中英文项目介绍。",
  keywords: [
    "当代艺术",
    "数字艺术",
    "艺术科技",
    "互动装置",
    "创意科技",
    "新媒体艺术",
    "ArtBOP",
  ],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
    siteName: "ArtBOP",
    title: "ArtBOP｜当代艺术与创意科技内容平台",
    description:
      "发现当代艺术、数字艺术、互动装置与跨学科创作项目。",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArtBOP｜当代艺术与创意科技内容平台",
    description:
      "发现当代艺术、数字艺术、互动装置与跨学科创作项目。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <JsonLd data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "ArtBOP",
            alternateName: "ArtBOP 艺术科技内容平台",
            url: "https://www.artbop.xyz/",
            inLanguage: ["zh-CN", "en"],
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ArtBOP",
            url: "https://www.artbop.xyz/",
            description: "关注当代艺术、创意科技、数字艺术与跨学科实践的内容平台。",
          },
        ]} />
        <AuthProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
