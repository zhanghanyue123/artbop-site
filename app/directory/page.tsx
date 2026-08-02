import ListingLanding from "../../components/ListingLanding";

export default function DirectoryPage() {
  return <ListingLanding copy={{
    zh: { eyebrow: "Creative Directory", title: "设计名录", description: "建立面向艺术科技与视觉文化领域的艺术家、工作室、研究团队和文化机构名录。", scopeTitle: "名录类型", scope: ["艺术家与独立创作者", "设计及创意技术工作室", "学校与研究实验室", "展馆、艺术节与文化机构"], notice: "用户资料与机构认证即将开放。名录会清楚区分个人资料、机构资料与经过认证的官方页面。" },
    en: { eyebrow: "Creative Directory", title: "Design Directory", description: "A directory of artists, studios, research teams, schools, and institutions across art and technology.", scopeTitle: "Directory types", scope: ["Artists and independent practitioners", "Design and creative technology studios", "Schools and research labs", "Museums, festivals, and institutions"], notice: "Profiles and organization verification are opening soon. Personal, institutional, and verified pages will be clearly distinguished." },
  }} />;
}
