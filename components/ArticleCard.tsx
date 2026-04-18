import Link from "next/link";

type ArticleCardProps = {
  title: string;
  category: string;
  excerpt: string;
  slug: string;
};

export default function ArticleCard({
  title,
  category,
  excerpt,
  slug,
}: ArticleCardProps) {
  return (
    <Link href={`/articles/${slug}`} className="block">
      <article className="bg-white border border-neutral-200 rounded-[28px] p-6 shadow-sm hover:-translate-y-0.5 transition-transform">
        <div className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-3">
          {category}
        </div>
        <h3 className="text-xl font-semibold leading-tight mb-3">{title}</h3>
        <p className="text-neutral-600 leading-7 text-sm">{excerpt}</p>
      </article>
    </Link>
  );
}