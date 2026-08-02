import OpportunityListPage, { Opportunity } from "../../components/OpportunityListPage";
import { residencies } from "../../data/residencies";

const items: Opportunity[] = residencies.map((item) => ({
  id: item.id, title: item.title, title_zh: item.title_zh,
  summary: item.summary, summary_zh: item.summary_zh,
  organization: item.organizer, location: item.location,
  deadline: item.deadline, tags: item.tags, source_url: item.source_url,
  details: [
    ...(item.duration ? [{ label: "Duration", label_zh: "周期", value: item.duration }] : []),
    ...(item.funding ? [{ label: "Funding", label_zh: "资助", value: item.funding }] : []),
    ...(item.eligibility ? [{ label: "Eligibility", label_zh: "申请对象", value: item.eligibility }] : []),
  ],
}));

export default function ResidenciesPage() {
  return <OpportunityListPage eyebrow="Residencies" title="驻留" titleEn="Residencies" description="经过核实的艺术家驻留、研究计划与艺术科技实验机会。" descriptionEn="Verified artist residencies, research programmes, and art-and-technology opportunities." items={items} />;
}
