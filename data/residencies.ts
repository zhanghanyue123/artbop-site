// data/residencies.ts

export type ResidencyItem = {
    id: string;
    title: string;
    title_zh?: string;
    slug: string;
    summary: string;
    summary_zh?: string;
    organizer: string;
    location: string;
    deadline?: string;
    duration?: string;
    eligibility?: string;
    funding?: string;
    accommodation?: string;
    category: string;
    tags: string[];
    source_url: string;
    image?: string;
    language?: string[];
    published_at?: string;
  };
  
  export const residencies: ResidencyItem[] = [];