export type EventItem = {
    id: string;
    title: string;
    title_zh?: string;
    slug: string;
    summary: string;
    summary_zh?: string;
    organizer: string;
    location: string;
    location_type: "offline" | "online" | "hybrid";
    start_date?: string;
    end_date?: string;
    deadline?: string;
    fee?: string;
    category: string;
    tags: string[];
    source_url: string;
    image?: string;
    language?: string[];
    published_at?: string;
  };
  
  export const events: EventItem[] = [];
