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
  
export const competitions: CompetitionItem[] = [
  {
    id: "origin-cg-2026", slug: "origin-cg-international-creativity-2026",
    title: "2026 Origin CG International Creativity Competition", title_zh: "Origin CG 国际创意竞赛 2026",
    summary: "An international competition focused on CG, digital creation and AI-enabled creative education.",
    summary_zh: "聚焦 CG、数字创作与 AI 辅助创意教育的国际竞赛，入围者可获得官方展示与数字认证。",
    organizer: "CG Global Entertainment / Krystal Institute", location: "Online", deadline: "2026-09-30",
    eligibility: "Creators and students; see category rules", fee: "See official rules", prize: "Finalist certificate, badge and official showcase",
    category: "Digital Art", tags: ["CG", "数字艺术", "AI 创作"], source_url: "https://showcase.cgge.media/en/3D-showcase/2026/", image: "https://showcase.cgge.media/static/images/showcase-2026/landing/hero-cube2-md.8cc038d7f0cf.webp", language: ["English"], published_at: "2026-08-02"
  },
  {
    id: "fca-spotlight-painting-2026", slug: "fca-spotlight-painting-2026",
    title: "2026 Spotlight Online Exhibition — Painting", title_zh: "Spotlight 2026 国际绘画征集",
    summary: "An international online exhibition call for painters worldwide.",
    summary_zh: "加拿大艺术家联合会面向全球艺术家开放的线上绘画展征集，可提交最多五件作品。",
    organizer: "Federation of Canadian Artists", location: "International / Online", deadline: "2026-09-12 23:59 PDT",
    eligibility: "Artists worldwide", fee: "From CAN$20; non-member surcharge applies", prize: "International online exhibition",
    category: "Painting", tags: ["绘画", "国际征集", "线上展览"], source_url: "https://artists.ca/submissions/index", language: ["English"], published_at: "2026-08-02"
  },
  {
    id: "arteffect-summer-2026", slug: "arteffect-summer-competition-2026",
    title: "ARTEFFECT Summer Competition 2026", title_zh: "ARTEFFECT 夏季艺术竞赛 2026",
    summary: "A free competition inviting secondary-school students to create original art inspired by an approved unsung hero.",
    summary_zh: "面向 9–12 年级学生的免费艺术竞赛，作品需围绕指定的“无名英雄”展开，接受数字艺术、装置、雕塑及多种视觉媒介。",
    organizer: "ARTEFFECT", location: "International / Online", deadline: "2026-09-15 23:59 PT",
    eligibility: "Students in grades 9–12", fee: "Free", prize: "Awards and recognition; see official rules",
    category: "Student Art", tags: ["青年艺术", "数字艺术", "免费参赛"], source_url: "https://www.arteffectlmc.org/competition/summer", image: "https://cdn.prod.website-files.com/68a3a3894731574d74a4f56f/69c4127f91e1ede89f563ef6_Braidwood.png", language: ["English"], published_at: "2026-08-02"
  }
];
