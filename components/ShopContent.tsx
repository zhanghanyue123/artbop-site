"use client";

import Header from "./Header";
import Footer from "./Footer";
import { useLanguage } from "./LanguageContext";
import type { ProductRecord } from "../lib/supabase-rest";

function price(product: ProductRecord) {
  if (product.price_amount === null) return "价格咨询";
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: product.currency || "CNY",
  }).format(product.price_amount);
}

export default function ShopContent({ products }: { products: ProductRecord[] }) {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-neutral-950">
      <Header />
      <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-8 border-b border-neutral-300 pb-10 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-neutral-500">
              ArtBOP Shop
            </div>
            <h1 className="text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
              商店
            </h1>
          </div>
          <p className="max-w-xl text-lg leading-8 text-neutral-600">
            精选出版物、艺术家版次、创意物件与跨界合作。商品只由 ArtBOP 编辑后台上架。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-8">
        {products.length === 0 ? (
          <div className="border-t border-neutral-400 py-8 text-neutral-500">
            第一批精选商品正在准备中。
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
              const title = language === "zh" ? product.title_zh : product.title_en;
              return (
                <article key={product.id} className="group">
                  <div className="aspect-[4/5] overflow-hidden bg-neutral-200">
                    {product.cover_url && (
                      <img
                        src={product.cover_url}
                        alt={title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                    )}
                  </div>
                  <div className="pt-4">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                      {product.category || product.artist_name}
                    </div>
                    <h2 className="mt-2 text-xl font-semibold">{title}</h2>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span>{price(product)}</span>
                      {product.status === "sold_out" && <span>已售罄</span>}
                    </div>
                    {product.purchase_url && product.status !== "sold_out" && (
                      <a
                        href={product.purchase_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-block text-sm underline underline-offset-4"
                      >
                        购买或咨询
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
