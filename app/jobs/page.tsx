import ListingLanding from "../../components/ListingLanding";

export default function JobsPage() {
  return <ListingLanding copy={{
    zh: { eyebrow: "Creative Jobs", title: "招聘", description: "关注艺术机构、创意工作室、研究团队和文化项目中的工作与合作机会。", scopeTitle: "岗位范围", scope: ["艺术与策展岗位", "创意技术与开发", "设计、影像与内容", "实习、自由职业与项目合作"], notice: "招聘信息将标明机构、地点、工作形式、截止时间和原始申请链接。" },
    en: { eyebrow: "Creative Jobs", title: "Jobs", description: "Roles and collaborations across art institutions, creative studios, research teams, and cultural projects.", scopeTitle: "Roles", scope: ["Art and curatorial roles", "Creative technology and development", "Design, moving image, and content", "Internships, freelance, and project work"], notice: "Listings will include the organization, location, working format, deadline, and original application link." },
  }} />;
}
