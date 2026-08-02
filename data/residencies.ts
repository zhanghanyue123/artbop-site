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
  
export const residencies: ResidencyItem[] = [
  {
    id: "platform-dali-2027", slug: "platform-dali-what-is-real-2027",
    title: "What is real? — Art & Science Residencies 2027", title_zh: "“何为真实？”艺术与科学驻留 2027",
    summary: "A research-led residency connecting artists with major scientific institutions in Barcelona.",
    summary_zh: "艺术家将与巴塞罗那的超级计算、光子学、海洋科学、高能物理或生物医学研究机构合作，发展艺术与科学交叉项目。",
    organizer: "Platform Dalí", location: "Barcelona, Spain", deadline: "2026-09-07 23:59 CET",
    duration: "2027 programme", eligibility: "Artists and interdisciplinary practitioners", funding: "See each residency track",
    category: "Art & Science", tags: ["艺术科学", "研究驻留", "跨学科"],
    source_url: "https://platformdali.org/en/call/open-call-for-residencies-2027-what-is-real/", language: ["English"], published_at: "2026-08-02"
  },
  {
    id: "matadero-situated-research-2027", slug: "matadero-situated-research-2027",
    title: "Situated Research Residencies 2027", title_zh: "情境研究驻留 2027",
    summary: "A Madrid residency supporting research across art, design, science, technology and society.",
    summary_zh: "面向艺术、设计、科学、技术与社会交叉领域的研究型驻留，接受数字媒体、工程、编程与材料研究等不同实践。",
    organizer: "Matadero Madrid", location: "Madrid, Spain", deadline: "2026-09-27",
    duration: "2027 programme", eligibility: "Researchers and creators across disciplines", funding: "See official call",
    category: "Situated Research", tags: ["研究", "数字媒体", "社会实践"],
    source_url: "https://www.mataderomadrid.org/en/calls/open-call-situated-reseach-residencies-2027", language: ["English", "Spanish"], published_at: "2026-08-02"
  },
  {
    id: "visegrad-visual-sound-2027", slug: "visegrad-visual-sound-artist-residency-2027",
    title: "Visual and Sound Artist Residency 2027", title_zh: "维谢格拉德视觉与声音艺术家驻留 2027",
    summary: "A two-month cross-border residency for visual, sound, film, new media and mixed-media practices.",
    summary_zh: "面向视觉艺术、设计、声音、影像、新媒体与混合媒介创作者的两个月跨境驻留，申请者需在另一维谢格拉德国家开展项目。",
    organizer: "International Visegrad Fund", location: "Czechia, Hungary, Poland or Slovakia", deadline: "2026-10-15",
    duration: "2 months in 2027", eligibility: "V4 citizens aged 18+", funding: "€3,000 artist + €3,000 host",
    category: "Visual & Sound Art", tags: ["新媒体", "声音艺术", "视觉艺术"],
    source_url: "https://www.visegradfund.org/visual-and-sound-artist-residency-apply", language: ["English"], published_at: "2026-08-02"
  }
];
