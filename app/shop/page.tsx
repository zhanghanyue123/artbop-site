"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { useLanguage } from "../../components/LanguageContext";

const content = {
  en: {
    eyebrow: "Shop",
    title: "A catalog of publications, editions, objects, and collaborations.",
    sections: [
      {
        title: "Publications",
        description:
          "Books, printed matter, and editorial projects from ArtBop and collaborators.",
        items: [
          {
            slug: "publication-001",
            title: "ArtBop Issue 01: Visual Culture Notes",
            price: "CHF 38",
            status: "New",
            image:
              "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop",
          },
          {
            slug: "publication-002",
            title: "Publishing as Spatial Practice",
            price: "CHF 42",
            status: "Available",
            image:
              "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop",
          },
        ],
      },
      {
        title: "Artist Editions",
        description:
          "Small-run works, prints, and artist-led edition objects.",
        items: [
          {
            slug: "edition-001",
            title: "Soft Screen Print No. 3",
            price: "CHF 120",
            status: "Limited",
            image:
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
          },
          {
            slug: "edition-002",
            title: "Gradient Study Poster",
            price: "CHF 65",
            status: "Available",
            image:
              "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
          },
        ],
      },
      {
        title: "Objects",
        description:
          "Functional and collectible objects connected to the platform’s visual language.",
        items: [
          {
            slug: "object-001",
            title: "Studio Mug / Grey",
            price: "CHF 28",
            status: "Available",
            image:
              "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1200&auto=format&fit=crop",
          },
          {
            slug: "object-002",
            title: "Notebook Set",
            price: "CHF 24",
            status: "New",
            image:
              "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop",
          },
        ],
      },
      {
        title: "Limited Collaborations",
        description:
          "Occasional product collaborations with artists, studios, and institutions.",
        items: [
          {
            slug: "collab-001",
            title: "ArtBop × Studio Sample Tote",
            price: "CHF 55",
            status: "Limited",
            image:
              "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
          },
          {
            slug: "collab-002",
            title: "Editorial Tools Set",
            price: "CHF 72",
            status: "Sold out",
            image:
              "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
          },
        ],
      },
      {
        title: "Archive",
        description:
          "Past items, sold out editions, and historical releases kept as a public catalog.",
        items: [
          {
            slug: "archive-001",
            title: "Prototype Publication 2024",
            price: "Archived",
            status: "Sold out",
            image:
              "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1200&auto=format&fit=crop",
          },
          {
            slug: "archive-002",
            title: "Pilot Edition Object",
            price: "Archived",
            status: "Archived",
            image:
              "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop",
          },
        ],
      },
    ],
  },
  zh: {
    eyebrow: "商店",
    title: "一个关于出版物、艺术版次、物件与合作项目的目录式商店。",
    sections: [
      {
        title: "Publications",
        description: "来自 ArtBop 及合作方的书籍、印刷出版物与编辑项目。",
        items: [
          {
            slug: "publication-001",
            title: "ArtBop Issue 01: Visual Culture Notes",
            price: "CHF 38",
            status: "新品",
            image:
              "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop",
          },
          {
            slug: "publication-002",
            title: "Publishing as Spatial Practice",
            price: "CHF 42",
            status: "有货",
            image:
              "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop",
          },
        ],
      },
      {
        title: "Artist Editions",
        description: "小批量艺术作品、版画以及艺术家主导的限量版物件。",
        items: [
          {
            slug: "edition-001",
            title: "Soft Screen Print No. 3",
            price: "CHF 120",
            status: "限量",
            image:
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
          },
          {
            slug: "edition-002",
            title: "Gradient Study Poster",
            price: "CHF 65",
            status: "有货",
            image:
              "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
          },
        ],
      },
      {
        title: "Objects",
        description: "与平台视觉语言相关的功能性或收藏型物件。",
        items: [
          {
            slug: "object-001",
            title: "Studio Mug / Grey",
            price: "CHF 28",
            status: "有货",
            image:
              "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1200&auto=format&fit=crop",
          },
          {
            slug: "object-002",
            title: "Notebook Set",
            price: "CHF 24",
            status: "新品",
            image:
              "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop",
          },
        ],
      },
      {
        title: "Limited Collaborations",
        description: "与艺术家、工作室或机构展开的限量合作产品。",
        items: [
          {
            slug: "collab-001",
            title: "ArtBop × Studio Sample Tote",
            price: "CHF 55",
            status: "限量",
            image:
              "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
          },
          {
            slug: "collab-002",
            title: "Editorial Tools Set",
            price: "CHF 72",
            status: "售罄",
            image:
              "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
          },
        ],
      },
      {
        title: "Archive",
        description: "已售罄或过往发布物件的公共档案目录。",
        items: [
          {
            slug: "archive-001",
            title: "Prototype Publication 2024",
            price: "档案",
            status: "售罄",
            image:
              "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1200&auto=format&fit=crop",
          },
          {
            slug: "archive-002",
            title: "Pilot Edition Object",
            price: "档案",
            status: "归档",
            image:
              "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop",
          },
        ],
      },
    ],
  },
};

export default function ShopPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <Header />

      <section className="max-w-7xl mx-auto px-6 pt-10 pb-8">
        <div className="text-[12px] uppercase tracking-[0.26em] text-neutral-700 mb-2">
          ARTBOP SHOP
        </div>
        <div className="text-[11px] uppercase tracking-[0.22em] text-neutral-400 mb-3">
          {t.eyebrow}
        </div>
        <h1 className="text-[32px] md:text-[44px] font-normal tracking-tight leading-tight max-w-4xl">
          {t.title}
        </h1>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16 space-y-20">
        {t.sections.map((section) => (
          <div key={section.title} className="space-y-5">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 border-b border-neutral-200 pb-3">
              <div>
                <h2 className="text-[22px] md:text-[26px] font-normal tracking-tight">
                  {section.title}
                </h2>
                <p className="mt-1 text-[13px] leading-6 text-neutral-500 max-w-xl">
                  {section.description}
                </p>
              </div>
              <a
                href="#"
                className="text-[13px] text-neutral-500 underline underline-offset-4"
              >
                View all
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
              {section.items.map((item) => (
                <ProductCard
                  key={item.slug}
                  slug={item.slug}
                  title={item.title}
                  price={item.price}
                  status={item.status}
                  image={item.image}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </main>
  );
}