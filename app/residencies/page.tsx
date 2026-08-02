import OpportunityListPage, { Opportunity } from "../../components/OpportunityListPage";
import { residencies } from "../../data/residencies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "艺术家驻留与研究计划",
  description: "经过核实的国内外艺术家驻留、艺术科技研究计划与跨学科创作机会。",
  alternates: { canonical: "/residencies" },
};

const items: Opportunity[] = residencies.map((item) => ({
  id: item.id, title: item.title, title_zh: item.title_zh,
  summary: item.summary, summary_zh: item.summary_zh,
  organization: item.organizer, location: item.location,
  deadline: item.deadline, tags: item.tags, source_url: item.source_url,
  href: `/residencies/${item.slug}`,
  image: item.image,
  details: [
    ...(item.duration ? [{ label: "Duration", label_zh: "周期", value: item.duration }] : []),
    ...(item.funding ? [{ label: "Funding", label_zh: "资助", value: item.funding }] : []),
    ...(item.eligibility ? [{ label: "Eligibility", label_zh: "申请对象", value: item.eligibility }] : []),
  ],
}));

export default function ResidenciesPage() {
  return <OpportunityListPage eyebrow="Residencies" title="驻留" titleEn="Residencies" description="经过核实的艺术家驻留、研究计划与艺术科技实验机会。" descriptionEn="Verified artist residencies, research programmes, and art-and-technology opportunities." items={items} />;
}
