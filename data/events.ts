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
  
  export const events: EventItem[] = [
    {
      id: "event-001",
      title: "Experimental Media Gathering 2026",
      title_zh: "实验媒体聚会 2026",
      slug: "experimental-media-gathering-2026",
      summary:
        "A public event bringing together artists, designers, and technologists for talks, screenings, and workshop-based exchange.",
      summary_zh:
        "一个汇集艺术家、设计师与技术创作者的公共活动，包含讲座、放映与工作坊交流。",
      organizer: "ArtBop",
      location: "Shanghai",
      location_type: "offline",
      start_date: "2026-06-18",
      fee: "Free",
      category: "Event",
      tags: ["media", "art", "community"],
      source_url: "https://example.com",
      published_at: "2026-04-11",
    },
  ];