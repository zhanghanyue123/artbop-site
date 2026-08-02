import ListingLanding from "../../components/ListingLanding";

export default function EventsPage() {
  return <ListingLanding copy={{
    zh: {
      eyebrow: "Events",
      title: "活动",
      description: "收录与当代艺术、创意科技和视觉文化相关的展览、讲座、放映、工作坊与社区活动。",
      scopeTitle: "收录范围",
      scope: ["展览与艺术节", "讲座、论坛与放映", "工作坊与开放日", "线上及线下社区活动"],
      notice: "活动发布功能正在开放中。首批信息将经过编辑核实，确保日期、地点、主办方和原始链接真实有效。",
    },
    en: {
      eyebrow: "Events",
      title: "Events",
      description: "Exhibitions, talks, screenings, workshops, festivals, and gatherings across contemporary art and creative technology.",
      scopeTitle: "What we list",
      scope: ["Exhibitions and festivals", "Talks, forums, and screenings", "Workshops and open studios", "Online and local gatherings"],
      notice: "Event submissions are opening soon. Initial listings will be reviewed for accurate dates, locations, organizers, and original sources.",
    },
  }} />;
}
