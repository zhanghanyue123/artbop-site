// data/competitions.ts

export type CompetitionItem = {
    id: string;
    title: string;
    title_zh?: string;
    slug: string;
    summary: string;
    summary_zh?: string;
    organizer: string;
    location?: string;
    deadline?: string;
    eligibility?: string;
    fee?: string;
    prize?: string;
    category: string;
    tags: string[];
    source_url: string;
    image?: string;
    language?: string[];
    published_at?: string;
  };
  
  export const competitions: CompetitionItem[] = [];