// data/jobs.ts

export type JobItem = {
    id: string;
    title: string;
    title_zh?: string;
    slug: string;
    summary: string;
    summary_zh?: string;
    company: string;
    location: string;
    location_type: "offline" | "remote" | "hybrid";
    employment_type?: string;
    deadline?: string;
    salary?: string;
    experience_level?: string;
    category: string;
    tags: string[];
    source_url: string;
    image?: string;
    language?: string[];
    published_at?: string;
  };
  
  export const jobs: JobItem[] = [];