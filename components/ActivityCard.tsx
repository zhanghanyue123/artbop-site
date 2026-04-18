type ActivityCardProps = {
    time: string;
    user: string;
    action: string;
    target: string;
    image: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    type: string;
    people: string;
    tags: string;
  };
  
  export default function ActivityCard({
    time,
    user,
    action,
    target,
    image,
    title,
    excerpt,
    date,
    author,
    type,
    people,
    tags,
  }: ActivityCardProps) {
    return (
      <article className="border-t border-neutral-300 pt-6">
        <div className="flex items-start gap-3 text-[15px] md:text-[18px] leading-8 text-neutral-800">
          <span className="text-neutral-500">▶</span>
          <div className="flex-1">
            <span className="text-neutral-500">{time}</span>
            <span className="mx-2">@{user}</span>
            <span className="text-neutral-700">{action}</span>
            <span className="mx-2">{target}</span>
          </div>
          <button className="text-neutral-500 hover:text-black">•••</button>
        </div>
  
        <div className="mt-5 ml-8 max-w-[560px] border border-dashed border-neutral-400 bg-neutral-100">
          <div className="border-b border-dashed border-neutral-400">
            <img
              src={image}
              alt={title}
              className="w-full h-auto block object-cover"
              draggable={false}
            />
          </div>
  
          <div className="border-b border-dashed border-neutral-400 px-6 py-5">
            <h3 className="text-[24px] leading-[1.35] font-normal text-neutral-900">
              {title}
            </h3>
          </div>
  
          <div className="border-b border-dashed border-neutral-400 px-6 py-6">
            <p className="text-[20px] leading-[1.55] text-neutral-800">
              {excerpt}
            </p>
          </div>
  
          <div className="px-6 py-5 text-[14px] leading-7 text-neutral-700">
            <div className="grid grid-cols-[22px_1fr] gap-x-3">
              <div className="font-mono">D</div>
              <div>{date}</div>
  
              <div className="font-mono">A</div>
              <div>@{author}</div>
  
              <div className="font-mono">C</div>
              <div>{type}</div>
  
              <div className="font-mono">P</div>
              <div>{people}</div>
  
              <div className="font-mono">T</div>
              <div>{tags}</div>
  
              <div className="font-mono">F</div>
              <div>Save</div>
            </div>
          </div>
        </div>
  
        <div className="mt-5 ml-8 flex items-center gap-3">
          <button className="px-4 py-2 border border-neutral-500 bg-neutral-100 text-[15px] text-neutral-800 hover:bg-neutral-200">
            Comment
          </button>
          <button className="w-11 h-11 border border-neutral-500 bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
            ♢
          </button>
        </div>
      </article>
    );
  }