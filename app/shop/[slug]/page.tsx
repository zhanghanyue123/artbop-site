"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useLanguage } from "../../../components/LanguageContext";
import { useParams } from "next/navigation";

const products = {
  "publication-001": {
    en: {
      category: "Publications",
      title: "ArtBop Issue 01: Visual Culture Notes",
      price: "CHF 38",
      status: "New",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop",
      description:
        "A printed publication featuring essays, visual notes, and editorial material across art, image systems, and cultural observation.",
      details: [
        "Format: Softcover",
        "Year: 2026",
        "Language: English / Chinese",
        "Edition: First release",
      ],
    },
    zh: {
      category: "Publications",
      title: "ArtBop Issue 01: Visual Culture Notes",
      price: "CHF 38",
      status: "新品",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop",
      description:
        "一本围绕艺术、图像系统与文化观察展开的印刷出版物，包含文章、视觉笔记与编辑内容。",
      details: [
        "规格：平装",
        "年份：2026",
        "语言：中英双语",
        "版本：首发",
      ],
    },
  },
  "publication-002": {
    en: {
      category: "Publications",
      title: "Publishing as Spatial Practice",
      price: "CHF 42",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop",
      description:
        "An editorial reader on publishing, exhibition-making, and spatial storytelling.",
      details: [
        "Format: Softcover",
        "Year: 2025",
        "Language: English",
        "Edition: Standard",
      ],
    },
    zh: {
      category: "Publications",
      title: "Publishing as Spatial Practice",
      price: "CHF 42",
      status: "有货",
      image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop",
      description:
        "一本关于出版、展览组织与空间叙事的编辑读本。",
      details: [
        "规格：平装",
        "年份：2025",
        "语言：英文",
        "版本：标准版",
      ],
    },
  },
  "edition-001": {
    en: {
      category: "Artist Editions",
      title: "Soft Screen Print No. 3",
      price: "CHF 120",
      status: "Limited",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
      description:
        "A limited artist print produced as part of a small-run edition series.",
      details: [
        "Format: Print",
        "Edition: 30",
        "Signed: Yes",
        "Year: 2026",
      ],
    },
    zh: {
      category: "Artist Editions",
      title: "Soft Screen Print No. 3",
      price: "CHF 120",
      status: "限量",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
      description:
        "作为小批量艺术版次系列之一制作的限量版画作品。",
      details: [
        "形式：版画",
        "版数：30",
        "签名：有",
        "年份：2026",
      ],
    },
  },
};

export default function ShopDetailPage() {
  const { language } = useLanguage();
  const params = useParams();
  const slug = params.slug as string;

  const product = products[slug as keyof typeof products]?.[language];

  if (!product) {
    return <div className="p-10">Product not found.</div>;
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-[420px_1fr] gap-12">
        <div className="max-w-[320px]">
          <div className="border border-neutral-200 bg-neutral-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full aspect-[4/5] object-cover"
              draggable={false}
            />
          </div>
        </div>

        <div className="max-w-2xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-neutral-500 mb-3">
            {product.category}
          </div>

          <h1 className="text-[30px] md:text-[40px] font-normal tracking-tight leading-tight">
            {product.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-neutral-500">
            <span>{product.status}</span>
            <span>{product.price}</span>
          </div>

          <p className="mt-8 text-[16px] leading-8 text-neutral-700 max-w-xl">
            {product.description}
          </p>

          <div className="mt-8 space-y-2 text-sm text-neutral-600">
            {product.details.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>

          <div className="mt-10 flex gap-3">
            <button className="px-5 py-3 border border-black bg-black text-white text-sm">
              Add to cart
            </button>
            <button className="px-5 py-3 border border-neutral-300 text-sm">
              Save
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}