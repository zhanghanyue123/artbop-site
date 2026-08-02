import ListingLanding from "../../components/ListingLanding";

export default function ResidenciesPage() {
  return <ListingLanding copy={{
    zh: { eyebrow: "Residencies", title: "驻留", description: "汇集艺术家驻留、研究计划、实验室访问和阶段性工作室机会。", scopeTitle: "重点信息", scope: ["驻留地点与周期", "申请对象与研究方向", "住宿、工作室及制作条件", "资助、费用与截止日期"], notice: "驻留信息将以官方申请页面为依据，并明确费用、资助和住宿条件。" },
    en: { eyebrow: "Residencies", title: "Residencies", description: "Artist residencies, research programs, lab visits, and temporary studio opportunities.", scopeTitle: "Key details", scope: ["Location and duration", "Eligibility and research focus", "Accommodation and production facilities", "Funding, fees, and deadline"], notice: "Listings will link to official application pages and clearly state fees, funding, and accommodation." },
  }} />;
}
