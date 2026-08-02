import Link from "next/link";

type ArticleCardProps = {
  title: string;
  category: string;
  excerpt: string;
  slug: string;
  image?: string;
};

export default function ArticleCard({
  title,
  category,
  excerpt,
  slug,
  image,
}: ArticleCardProps) {
  return (
    <Link href={`/articles/${slug}`} className="block">
      <article className="h-full overflow-hidden bg-white border border-neutral-200 rounded-[28px] shadow-sm hover:-translate-y-0.5 transition-transform">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full aspect-[4/3] object-cover"
            loading="lazy"
          />
        )}
        <div className="p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-3">
            {category}
          </div>
          <h3 className="text-xl font-semibold leading-tight mb-3">{title}</h3>
          <p className="text-neutral-600 leading-7 text-sm">{excerpt}</p>
        </div>
      </article>
    </Link>
  );
}
