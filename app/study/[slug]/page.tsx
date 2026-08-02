import { notFound } from "next/navigation";
import OpportunityDetailPage from "../../../components/OpportunityDetailPage";
import { programs } from "../../../data/programs";

export function generateStaticParams() { return programs.map((item) => ({ slug: item.slug })); }

export default async function ProgramDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = programs.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return <OpportunityDetailPage item={{
    type: "Schools & Admissions", typeZh: "院校申请", backHref: "/study",
    title: item.title, titleZh: item.title_zh, organization: item.school,
    summary: item.summary, summaryZh: item.summary_zh, location: item.location,
    deadline: item.next_deadline, tags: item.tags, sourceUrl: item.source_url,
    details: [
      { label: "Degree", labelZh: "学位", value: item.degree },
      { label: "Duration", labelZh: "学制", value: item.duration },
      { label: "Application status", labelZh: "申请状态", value: item.application_status },
      ...(item.tuition ? [{ label: "Tuition", labelZh: "学费参考", value: item.tuition }] : []),
      ...(item.language ? [{ label: "Language", labelZh: "语言要求", value: item.language }] : []),
    ],
    sections: [
      { title: "Programme focus", titleZh: "专业方向", body: item.fit, bodyZh: item.fit_zh },
      { title: "Programme comparison", titleZh: "专业对比", body: item.comparison, bodyZh: item.comparison_zh },
      { title: "Admissions update", titleZh: "申请情况", body: item.application, bodyZh: item.application_zh },
      ...(item.programme_change ? [{ title: "Programme changes", titleZh: "专业变化", body: item.programme_change, bodyZh: item.programme_change_zh || item.programme_change }] : []),
    ],
  }} />;
}
