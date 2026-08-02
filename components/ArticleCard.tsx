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
      <article className="group h-full">
        {image && (
          <div className="aspect-[4/3] overflow-hidden bg-neutral-200">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        )}
        <div className="pt-4">
          <div className="mb-3 text-[11px] uppercase tracking-[0.22em] text-neutral-500">
            {category}
          </div>
          <h3 className="mb-3 text-xl font-semibold leading-tight tracking-[-0.02em]">
            {title}
          </h3>
          <p className="line-clamp-3 text-sm leading-6 text-neutral-600">
            {excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}
