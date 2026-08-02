import ListingLanding from "../../components/ListingLanding";

export default function CompetitionsPage() {
  return <ListingLanding copy={{
    zh: { eyebrow: "Open Calls", title: "竞赛", description: "为艺术家、设计师、学生和跨学科团队整理值得关注的开放征集、奖项与竞赛。", scopeTitle: "信息标准", scope: ["主办方与官方来源", "参赛资格与作品范围", "截止日期与费用", "奖金、展览或支持内容"], notice: "本栏目只发布能够核实官方来源与截止时间的信息，避免转载失效或来源不明的征集。" },
    en: { eyebrow: "Open Calls", title: "Competitions", description: "Selected open calls, awards, and competitions for artists, designers, students, and interdisciplinary teams.", scopeTitle: "Listing standards", scope: ["Organizer and official source", "Eligibility and disciplines", "Deadline and fees", "Awards, exhibitions, or support"], notice: "Only opportunities with verifiable official sources and current deadlines will be published." },
  }} />;
}
