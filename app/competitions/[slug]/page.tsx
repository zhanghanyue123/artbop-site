import { notFound } from "next/navigation";
import OpportunityDetailPage from "../../../components/OpportunityDetailPage";
import { competitions } from "../../../data/competitions";

export function generateStaticParams() { return competitions.map((item) => ({ slug: item.slug })); }

export default async function CompetitionDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = competitions.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return <OpportunityDetailPage item={{
    type: "Competitions", typeZh: "竞赛", backHref: "/competitions",
    title: item.title, titleZh: item.title_zh, organization: item.organizer,
    summary: item.summary, summaryZh: item.summary_zh,
    location: item.location || "Online", deadline: item.deadline,
    tags: item.tags, sourceUrl: item.source_url,
    image: item.image,
    details: [
      ...(item.fee ? [{ label: "Fee", labelZh: "参赛费用", value: item.fee }] : []),
      ...(item.prize ? [{ label: "Award", labelZh: "奖励与支持", value: item.prize }] : []),
      ...(item.eligibility ? [{ label: "Eligibility", labelZh: "参赛对象", value: item.eligibility }] : []),
    ],
    sections: [
      { title: "About the open call", titleZh: "征集介绍", body: item.summary, bodyZh: `${item.summary_zh || item.summary} ArtBOP 收录该项目，是因为它具有明确的官方来源、仍在开放的申请窗口，以及清晰可核实的参赛方向。` },
      { title: "What to prepare", titleZh: "需要准备什么", body: "Review the official rules before selecting work. Prepare images or project documentation, a concise description, creator information, and any process material required by the category.", bodyZh: `建议先阅读完整规则，再选择与征集方向匹配的作品。通常需要准备作品图像或项目文档、简洁的创作说明、作者资料，以及主办方要求的过程记录。参赛对象为${item.eligibility || "以官网规则为准"}。` },
      { title: "ArtBOP note", titleZh: "ArtBOP 提醒", body: "Fees and award terms can differ by category. Confirm copyright, exhibition, delivery and refund terms on the official page before paying or submitting.", bodyZh: `不同组别可能有不同费用与奖励条件。当前页面记录的费用为“${item.fee || "以官网为准"}”。付款或投稿前，请确认版权授权、展览方式、作品运输、退款政策和最终截止时区。` },
    ],
  }} />;
}
