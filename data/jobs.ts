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
  
export const jobs: JobItem[] = [
  {
    id: "ual-programme-director-idvc", slug: "ual-programme-director-interaction-design-visual-communication",
    title: "Programme Director — Interaction Design & Visual Communication", title_zh: "交互设计与视觉传播项目主任",
    summary: "Academic leadership for interaction design, service design, illustration, visual media and UX programmes at LCC.",
    summary_zh: "负责伦敦传媒学院交互设计、服务设计、插画与视觉媒体、用户体验等课程的学术方向、教学质量和团队管理。",
    company: "University of the Arts London", location: "London, UK", location_type: "hybrid", employment_type: "Permanent, full time", deadline: "2026-09-04 17:00", salary: "£60,484–£73,058", experience_level: "Senior academic leadership",
    category: "Interaction Design", tags: ["交互设计", "视觉传播", "教育"], source_url: "https://ual.tal.net/vx/lang-en-GB/mobile-0/appcentre-1/brand-1/xf-b3aeaecdb96f/candidate/so/pm/6/pl/1/opp/12593-Programme-Director-Interaction-Design-Visual-Communication/en-GB", language: ["English"], published_at: "2026-08-02"
  },
  {
    id: "cambridge-llm-biodiversity", slug: "cambridge-llm-biodiversity-research-associate",
    title: "Research Associate in LLMs for Biodiversity Data Extraction", title_zh: "生物多样性数据提取大语言模型研究员",
    summary: "Develop agentic LLM systems that extract and validate biodiversity knowledge from scientific literature.",
    summary_zh: "开发智能体式大语言模型工作流，从大规模科学文献中提取、组织并验证生物多样性信息，连接 AI、生态与环境研究。",
    company: "University of Cambridge", location: "Cambridge, UK", location_type: "offline", employment_type: "Fixed term, up to 3 years", deadline: "2026-08-23", salary: "£37,694–£46,049", experience_level: "PhD / Research Associate",
    category: "AI & Research", tags: ["LLM", "生态", "研究"], source_url: "https://www.cam.ac.uk/jobs/research-associate-in-large-language-models-for-biodiversity-data-extraction-fixed-term-pf50528", language: ["English"], published_at: "2026-08-02"
  },
  {
    id: "nua-games-lecturer-2026", slug: "nua-lecturer-senior-lecturer-games-2026",
    title: "Lecturer / Senior Lecturer — Games", title_zh: "游戏设计讲师 / 高级讲师",
    summary: "A teaching role in games at a specialist arts university, connecting creative practice and game development.",
    summary_zh: "诺里奇艺术大学游戏方向教学岗位，适合具有游戏设计、开发或相关创意实践与教学经验的申请者。",
    company: "Norwich University of the Arts", location: "Norwich, UK", location_type: "offline", employment_type: "Academic", deadline: "2026-08-20", salary: "£38,784–£56,535", experience_level: "Lecturer / Senior Lecturer",
    category: "Games", tags: ["游戏设计", "教学", "创意技术"], source_url: "https://www.jobs.ac.uk/search/employer/norwich-university-of-the-arts", language: ["English"], published_at: "2026-08-02"
  }
];
