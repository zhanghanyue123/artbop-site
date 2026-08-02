import OpportunityListPage, { Opportunity } from "../../components/OpportunityListPage";
import { programs } from "../../data/programs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "艺术科技与交互设计院校申请",
  description: "艺术科技、创意计算、交互媒体和计算艺术专业的课程信息、申请要求与院校方向对比。",
  alternates: { canonical: "/study" },
};

const items: Opportunity[] = programs.map((item) => ({
  id: item.id,
  href: `/study/${item.slug}`,
  title: item.title,
  title_zh: item.title_zh,
  summary: item.summary,
  summary_zh: item.summary_zh,
  organization: item.school,
  location: item.location,
  deadline: item.next_deadline,
  tags: item.tags,
  source_url: item.source_url,
  image: item.image,
  details: [
    { label: "Degree", label_zh: "学位", value: item.degree },
    { label: "Duration", label_zh: "学制", value: item.duration },
    { label: "Application status", label_zh: "申请状态", value: item.application_status },
  ],
}));

export default function StudyPage() {
  return <OpportunityListPage eyebrow="Schools & Admissions" title="院校申请" titleEn="Schools & Admissions" description="聚焦艺术科技、创意计算、交互媒体与计算艺术专业的申请信息、课程变化和方向对比。" descriptionEn="Verified admissions information, programme changes, and comparisons across art, creative computing, interactive media, and computational arts." items={items} countLabel="个专业档案" countLabelEn="programme profiles" />;
}
