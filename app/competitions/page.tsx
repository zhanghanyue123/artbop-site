import OpportunityListPage, { Opportunity } from "../../components/OpportunityListPage";
import { competitions } from "../../data/competitions";

const items: Opportunity[] = competitions.map((item) => ({
  id: item.id, title: item.title, title_zh: item.title_zh,
  summary: item.summary, summary_zh: item.summary_zh,
  organization: item.organizer, location: item.location || "Online",
  deadline: item.deadline, tags: item.tags, source_url: item.source_url,
  details: [
    ...(item.fee ? [{ label: "Fee", label_zh: "费用", value: item.fee }] : []),
    ...(item.prize ? [{ label: "Award", label_zh: "奖励", value: item.prize }] : []),
    ...(item.eligibility ? [{ label: "Eligibility", label_zh: "参赛对象", value: item.eligibility }] : []),
  ],
}));

export default function CompetitionsPage() {
  return <OpportunityListPage eyebrow="Open Calls" title="竞赛" titleEn="Competitions" description="面向艺术、设计、数字创作与跨学科实践的真实开放征集。" descriptionEn="Verified open calls for art, design, digital creation, and interdisciplinary practice." items={items} />;
}
