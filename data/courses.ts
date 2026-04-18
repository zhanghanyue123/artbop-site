// data/courses.ts

export type CourseItem = {
    id: string;
    title: string;
    title_zh?: string;
    slug: string;
    summary: string;
    summary_zh?: string;
    provider: string;
    location: string;
    location_type: "offline" | "online" | "hybrid";
    start_date?: string;
    deadline?: string;
    duration?: string;
    fee?: string;
    level?: string;
    category: string;
    tags: string[];
    source_url: string;
    image?: string;
    language?: string[];
    published_at?: string;
  };
  
  export const courses: CourseItem[] = [];