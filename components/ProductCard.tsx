type ProductCardProps = {
    title: string;
    price: string;
    status: string;
    image: string;
    slug: string;
  };
  
  export default function ProductCard({
    title,
    price,
    status,
    image,
    slug,
  }: ProductCardProps) {
    return (
      <a href={`/shop/${slug}`} className="block group">
        <article className="space-y-3">
          <div className="w-full max-w-[180px] border border-neutral-200 bg-neutral-100 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-auto aspect-[4/5] object-cover group-hover:opacity-90 transition-opacity"
              draggable={false}
            />
          </div>
  
          <div className="max-w-[180px] space-y-1">
            <h3 className="text-sm leading-6 text-neutral-900">{title}</h3>
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span>{status}</span>
              <span>{price}</span>
            </div>
          </div>
        </article>
      </a>
    );
  }