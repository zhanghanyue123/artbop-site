import OpportunityListPage, { Opportunity } from "../../components/OpportunityListPage";
import { jobs } from "../../data/jobs";

const items: Opportunity[] = jobs.map((item) => ({
  id: item.id, title: item.title, title_zh: item.title_zh,
  summary: item.summary, summary_zh: item.summary_zh,
  organization: item.company, location: item.location,
  deadline: item.deadline, tags: item.tags, source_url: item.source_url,
  details: [
    ...(item.employment_type ? [{ label: "Contract", label_zh: "工作类型", value: item.employment_type }] : []),
    ...(item.salary ? [{ label: "Salary", label_zh: "薪酬", value: item.salary }] : []),
    { label: "Work mode", label_zh: "工作方式", value: item.location_type },
  ],
}));

export default function JobsPage() {
  return <OpportunityListPage eyebrow="Creative Jobs" title="招聘" titleEn="Jobs" description="艺术、交互设计、创意技术与跨学科研究中的真实岗位。" descriptionEn="Verified roles across art, interaction design, creative technology, and interdisciplinary research." items={items} />;
}
