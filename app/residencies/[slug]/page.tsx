import { notFound } from "next/navigation";
import OpportunityDetailPage from "../../../components/OpportunityDetailPage";
import { residencies } from "../../../data/residencies";
import type { Metadata } from "next";
import { opportunityMetadata } from "../../../lib/seo";

export function generateStaticParams() { return residencies.map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = residencies.find((entry) => entry.slug === slug);
  if (!item) return {};
  return opportunityMetadata({ title: item.title_zh || item.title, description: item.summary_zh || item.summary, path: `/residencies/${slug}`, image: item.image });
}

export default async function ResidencyDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = residencies.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return <OpportunityDetailPage item={{
    type: "Residencies", typeZh: "驻留", backHref: "/residencies",
    title: item.title, titleZh: item.title_zh, organization: item.organizer,
    summary: item.summary, summaryZh: item.summary_zh, location: item.location,
    deadline: item.deadline, tags: item.tags, sourceUrl: item.source_url,
    image: item.image,
    details: [
      ...(item.duration ? [{ label: "Duration", labelZh: "驻留周期", value: item.duration }] : []),
      ...(item.funding ? [{ label: "Funding", labelZh: "资助", value: item.funding }] : []),
      ...(item.eligibility ? [{ label: "Eligibility", labelZh: "申请对象", value: item.eligibility }] : []),
    ],
    sections: [
      { title: "About the programme", titleZh: "项目介绍", body: item.summary, bodyZh: `${item.summary_zh || item.summary} 该计划强调研究过程、跨机构交流和在地实践，适合希望在新的知识环境中推进项目的创作者。` },
      { title: "Who should consider it", titleZh: "适合谁申请", body: `This opportunity is intended for ${item.eligibility || "artists and interdisciplinary practitioners"}. Applicants should review the programme focus and host conditions before preparing a proposal.`, bodyZh: `申请对象为${item.eligibility || "艺术家及跨学科创作者"}。建议申请者清楚说明自己的研究问题、工作方法、驻留期间希望完成的阶段目标，以及与所在地或合作机构之间的关联。` },
      { title: "Before applying", titleZh: "申请前需要注意", body: "Check the official call for required materials, language, portfolio format, funding coverage and any costs not included. Prepare the application according to the latest official instructions.", bodyZh: `请重点核对申请材料、作品集格式、工作语言、资助覆盖范围及未包含费用。当前公开信息显示驻留周期为 ${item.duration || "以官网说明为准"}，提交前仍应再次查看官网是否有补充文件或日期调整。` },
    ],
  }} />;
}
