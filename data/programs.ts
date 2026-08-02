export type ProgramItem = {
  id: string;
  slug: string;
  school: string;
  title: string;
  title_zh: string;
  degree: string;
  location: string;
  duration: string;
  application_status: string;
  next_deadline?: string;
  tuition?: string;
  language?: string;
  summary: string;
  summary_zh: string;
  programme_change?: string;
  programme_change_zh?: string;
  fit_zh: string;
  fit: string;
  comparison_zh: string;
  comparison: string;
  application_zh: string;
  application: string;
  tags: string[];
  source_url: string;
  published_at: string;
};

export const programs: ProgramItem[] = [
  {
    id: "ual-msc-creative-computing",
    slug: "ual-msc-creative-computing",
    school: "University of the Arts London",
    title: "MSc Creative Computing",
    title_zh: "创意计算理学硕士",
    degree: "MSc",
    location: "London, UK",
    duration: "Full time",
    application_status: "2026 international applications closed; 2027 entry opens autumn 2026",
    tuition: "2026/27: Home £14,420; International £30,890",
    language: "See UAL English language requirements",
    summary: "A programme combining technical ability, creative practice and social impact through computation.",
    summary_zh: "将编程、创造性实践与社会影响结合起来，适合希望把计算技术作为创作媒介和研究方法的申请者。",
    programme_change: "From 2027/28 CCI teaching moves to London College of Communication; from 2028/29 students become LCC students.",
    programme_change_zh: "从 2027/28 学年起，CCI 课程将在伦敦传媒学院的新楼授课；从 2028/29 学年起，相关学生将正式归属 LCC。2026/27 学年不受影响。",
    fit_zh: "适合希望系统提升编程能力，同时保留艺术、设计或社会议题研究方向的人。课程并不是传统计算机科学，也不是只做视觉作品，而是强调技术能力、创作实践和社会影响之间的结合。",
    fit: "Best suited to applicants who want stronger programming skills while maintaining an art, design or socially engaged practice. It connects technical ability, creative work and social impact rather than following a conventional computer science route.",
    comparison_zh: "与 RCA IED 相比，它的技术训练更明确；与 Goldsmiths Computational Arts 相比，课程名称和能力结构更接近创意技术与产业实践；与 NYU ITP 相比，学制和英国硕士体系更紧凑。",
    comparison: "More technically explicit than RCA IED, more aligned with creative technology practice than Goldsmiths Computational Arts, and more compact than NYU ITP's two-year structure.",
    application_zh: "国际学生的 2026/27 申请已经关闭，2027/28 预计在 2026 年秋季开放。上一轮申请分为 12 月和次年 3 月两个主要轮次，通常需要初始申请、个人陈述、简历，以及后续数字作品材料和视频任务。新的日期开放后应以官网为准。",
    application: "International applications for 2026/27 are closed and 2027/28 applications are expected to open in autumn 2026. The previous cycle used December and March rounds, followed by digital portfolio and video tasks. Confirm new dates when published.",
    tags: ["创意编程", "计算艺术", "社会影响"],
    source_url: "https://www.arts.ac.uk/subjects/creative-computing/postgraduate/msc-creative-computing",
    published_at: "2026-08-02",
  },
  {
    id: "rca-ma-information-experience-design",
    slug: "rca-ma-information-experience-design",
    school: "Royal College of Art",
    title: "MA Information Experience Design",
    title_zh: "信息体验设计文学硕士",
    degree: "MA · 180 credits",
    location: "London, UK",
    duration: "1 year / 45 weeks, full time",
    application_status: "2026 entry closed; 2027 applications open in autumn 2026",
    language: "See programme-specific RCA requirements",
    summary: "A boundary-crossing programme spanning art, design, research, sound, moving image, games and emerging experiences.",
    summary_zh: "以体验为核心连接艺术、设计和研究，媒介可以包括装置、声音、影像、游戏、虚拟环境及其他实验形式。",
    programme_change: "Part of the School of Communication & Design from September 2026; moving from White City to Battersea from August 2027.",
    programme_change_zh: "该专业自 2026 年 9 月起归入传播与设计学院；2026/27 学年仍在 White City，2027 年 8 月起迁往 Battersea 校区。",
    fit_zh: "适合已有较明确创作问题，希望跨越单一设计门类，通过装置、声音、影像、游戏或新兴媒介发展个人实践的人。项目接受艺术设计之外的科学、技术与人文学科背景。",
    fit: "Designed for applicants with a clear creative question who want to work across installation, sound, moving image, games or emerging media. Applicants may come from art and design, science, technology or humanities backgrounds.",
    comparison_zh: "它比 UAL Creative Computing 更强调概念、体验与作者性，不以编程训练为中心；比传统交互设计更开放，毕业方向也可能是艺术家、策展人、设计师、艺术指导或独立工作室。",
    comparison: "More concept- and experience-led than UAL Creative Computing, with less emphasis on formal programming training and a broader path toward art, curation, design and independent practice.",
    application_zh: "2027 入学申请预计于 2026 年秋季开放。官网目前要求单个 PDF 作品集，重点呈现最多两个项目；另需约 300 字个人陈述和两分钟自拍视频。RCA 2027 申请年度最多可申请两个不同专业，同一专业不能重复申请。",
    application: "Applications for 2027 entry are expected to open in autumn 2026. Current requirements include one portfolio PDF focused on up to two projects, a 300-word statement and a two-minute video. Applicants may select up to two RCA programmes in the 2027 cycle.",
    tags: ["体验设计", "跨媒介", "批判性实践"],
    source_url: "https://www.rca.ac.uk/study/programme-finder/information-experience-design-ma/",
    published_at: "2026-08-02",
  },
  {
    id: "nyu-itp-mps",
    slug: "nyu-itp-mps",
    school: "NYU Tisch School of the Arts",
    title: "Interactive Telecommunications Program",
    title_zh: "互动通信项目",
    degree: "MPS",
    location: "New York, USA",
    duration: "2 years, full time",
    application_status: "Fall 2027 application opens early September 2026",
    next_deadline: "2026-12-01, 23:59 ET",
    language: "English proficiency required for applicable international applicants",
    summary: "A two-year graduate programme exploring the imaginative and socially meaningful use of communications technologies.",
    summary_zh: "通过技术、设计、艺术与社会实验探索互动媒介，强调动手制作、合作和新的表达方式。",
    fit_zh: "适合跨专业申请者，不要求本科阶段必须学习设计或编程。它更看重申请者是否愿意通过互动媒体进行实验、合作和表达，并能把个人经验转化为有意义的创作方向。",
    fit: "Suitable for applicants across disciplines; a prior degree in design or programming is not required. The programme values experimentation, collaboration and meaningful expression through interactive media.",
    comparison_zh: "与英国一年制项目相比，ITP 两年学制为实验、合作和技术探索提供更多时间；它比单一交互设计专业更像一个由艺术家、设计师、工程师和研究者共同组成的创意技术社区。",
    comparison: "Its two-year format allows more time for experimentation than one-year UK programmes. It operates less like a narrow interaction design degree and more like a community of artists, designers, engineers and researchers.",
    application_zh: "2027 秋季申请将在 2026 年 9 月初开放，Tisch 官网列出的 ITP 截止日期为 12 月 1 日。申请包括 Tisch 研究生申请及项目要求的创意材料；官方说明提到个人陈述、简历、推荐信、成绩单和创意材料，国际申请者还需按适用规则提交英语成绩。",
    application: "Fall 2027 applications open in early September 2026 and the listed ITP deadline is 1 December. Applicants complete the Tisch graduate application and programme-specific creative materials, with English proficiency evidence where applicable.",
    tags: ["交互媒体", "创意技术", "跨学科"],
    source_url: "https://tisch.nyu.edu/itp.html",
    published_at: "2026-08-02",
  },
  {
    id: "goldsmiths-ma-computational-arts",
    slug: "goldsmiths-ma-computational-arts",
    school: "Goldsmiths, University of London",
    title: "MA Computational Arts",
    title_zh: "计算艺术文学硕士",
    degree: "MA",
    location: "London, UK",
    duration: "1 year full time / 2 years part time",
    application_status: "Applications available through Goldsmiths online system",
    language: "IELTS 6.5 overall; 6.5 writing; no element below 6.0, or equivalent",
    summary: "A practice-led programme examining aesthetic, political and cultural questions through creative computation.",
    summary_zh: "以计算作为艺术实践媒介，同时讨论技术背后的美学、知识、政治与文化问题，并以公开展览为重要成果。",
    fit_zh: "适合希望以代码、生成系统、交互装置或计算媒介持续发展艺术实践的人。项目强调实践研究和批判性语境，不只是学习软件或技术工具。",
    fit: "Best for artists who want to develop work through code, generative systems, interactive installation or computational media. The programme treats computation as a critical artistic medium rather than software training alone.",
    comparison_zh: "它比 UAL MSc Creative Computing 更接近当代艺术与实践研究；与 RCA IED 相比，对“计算”作为媒介的关注更集中；相较 NYU ITP，其教学语境更贴近英国当代艺术和研究型创作。",
    comparison: "Closer to contemporary art and practice research than UAL's MSc, more specifically focused on computation than RCA IED, and situated more firmly in a UK critical-art context than NYU ITP.",
    application_zh: "官网提供 Arts & Practice Based Research 与 Design & Creative Technology 等申请方向，并通过 Goldsmiths 在线系统直接申请。申请前需确认自己选择的路径、最新截止日期、材料要求和国际学生费用。英语要求目前为 IELTS 总分 6.5、写作 6.5，其他单项不低于 6.0，或认可的同等成绩。",
    application: "Applications are made directly through Goldsmiths, with pathways including Arts & Practice Based Research and Design & Creative Technology. Confirm pathway, deadline, materials and fees before applying. The listed IELTS requirement is 6.5 overall and in writing, with no element below 6.0.",
    tags: ["计算艺术", "实践研究", "创意技术"],
    source_url: "https://www.gold.ac.uk/pg/ma-computational-arts/",
    published_at: "2026-08-02",
  },
];
