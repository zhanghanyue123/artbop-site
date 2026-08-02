import { notFound } from "next/navigation";
import OpportunityDetailPage from "../../../components/OpportunityDetailPage";
import { jobs } from "../../../data/jobs";

export function generateStaticParams() { return jobs.map((item) => ({ slug: item.slug })); }

export default async function JobDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = jobs.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return <OpportunityDetailPage item={{
    type: "Jobs", typeZh: "招聘", backHref: "/jobs",
    title: item.title, titleZh: item.title_zh, organization: item.company,
    summary: item.summary, summaryZh: item.summary_zh, location: item.location,
    deadline: item.deadline, tags: item.tags, sourceUrl: item.source_url,
    image: item.image,
    details: [
      ...(item.employment_type ? [{ label: "Contract", labelZh: "工作类型", value: item.employment_type }] : []),
      ...(item.salary ? [{ label: "Salary", labelZh: "薪酬", value: item.salary }] : []),
      ...(item.experience_level ? [{ label: "Level", labelZh: "经验要求", value: item.experience_level }] : []),
      { label: "Work mode", labelZh: "工作方式", value: item.location_type },
    ],
    sections: [
      { title: "About the role", titleZh: "岗位介绍", body: item.summary, bodyZh: `${item.summary_zh || item.summary} 这一岗位与 ArtBOP 关注的艺术、设计、技术和跨学科实践方向直接相关。` },
      { title: "Candidate profile", titleZh: "适合的申请者", body: `The role is listed at ${item.experience_level || "the level stated by the employer"}. Candidates should match their portfolio and experience to the essential criteria in the official job description.`, bodyZh: `岗位级别为 ${item.experience_level || "以招聘页面为准"}。申请者应重点对照官网职位说明中的必要条件，用项目经历、研究成果、教学或专业实践证明自己与岗位的匹配度。` },
      { title: "Application advice", titleZh: "申请建议", body: "Read the full person specification and submit through the employer's official recruitment system. Confirm work eligibility, contract terms and interview timing before applying.", bodyZh: `建议通过机构官方招聘系统提交，避免经由非官方中介。申请前请确认工作资格、合同期限、办公方式和面试时间；针对岗位要求修改简历与支持陈述，不要只发送通用版本。` },
    ],
  }} />;
}
