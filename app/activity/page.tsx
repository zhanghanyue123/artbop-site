"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ActivityCard from "../../components/ActivityCard";
import { useLanguage } from "../../components/LanguageContext";

const content = {
  en: {
    eyebrow: "Community Activity",
    title: "A live stream of member publishing, saving, and profile updates.",
    items: [
      {
        time: "3 hours ago",
        user: "flower",
        action: "saved",
        target:
          "Overflow (2021) – A real-time data sculpture that bridges people and places",
        image:
          "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1400&auto=format&fit=crop",
        title:
          "Overflow (2021) – A real-time data sculpture that bridges people and places",
        excerpt:
          "Overflow is a site-specific kinetic and generative sculpture driven by real-time data systems that monitor movement, connection, and public rhythms across urban space.",
        date: "31/08/2021",
        author: "mmansion",
        type: "Member, Project",
        people: "Gregg Perkins, James Curran, Mikhail Mansion, Olivia Mansion",
        tags: "OpenCV, Processing",
      },
      {
        time: "17 hours ago",
        user: "velvetdisruption",
        action: "changed location from WAW / NYC / ATX to",
        target: "New York.",
        image:
          "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?q=80&w=1400&auto=format&fit=crop",
        title: "Member profile update",
        excerpt:
          "A location update in the member profile feed, visible as part of the public activity stream.",
        date: "11/04/2026",
        author: "velvetdisruption",
        type: "Member Update",
        people: "Profile record",
        tags: "Location, Profile",
      },
      {
        time: "1 day ago",
        user: "artbopstudio",
        action: "published",
        target: "Soft Infrastructures for Civic Screens",
        image:
          "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1400&auto=format&fit=crop",
        title: "Soft Infrastructures for Civic Screens",
        excerpt:
          "An editorial project exploring how public-facing media surfaces can act as emotional, cultural, and urban infrastructure.",
        date: "10/04/2026",
        author: "artbopstudio",
        type: "Editorial Feature",
        people: "ArtBop Editorial Team",
        tags: "Media Architecture, Urban Screen",
      },
    ],
  },
  zh: {
    eyebrow: "社区动态",
    title: "一个实时显示成员发布、收藏与资料更新的动态流。",
    items: [
      {
        time: "3 小时前",
        user: "flower",
        action: "收藏了",
        target: "Overflow (2021) – 一件连接人与地点的实时数据雕塑",
        image:
          "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1400&auto=format&fit=crop",
        title: "Overflow (2021) – 一件连接人与地点的实时数据雕塑",
        excerpt:
          "Overflow 是一个特定场域的动态生成装置作品，通过实时数据系统监测移动、连接与公共空间中的节奏变化。",
        date: "31/08/2021",
        author: "mmansion",
        type: "成员，项目",
        people: "Gregg Perkins, James Curran, Mikhail Mansion, Olivia Mansion",
        tags: "OpenCV, Processing",
      },
      {
        time: "17 小时前",
        user: "velvetdisruption",
        action: "将所在地从 WAW / NYC / ATX 修改为",
        target: "纽约。",
        image:
          "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?q=80&w=1400&auto=format&fit=crop",
        title: "成员资料更新",
        excerpt:
          "这是一次成员资料中的所在地更新，会作为公共动态流的一部分显示出来。",
        date: "11/04/2026",
        author: "velvetdisruption",
        type: "成员更新",
        people: "资料记录",
        tags: "所在地, 资料",
      },
      {
        time: "1 天前",
        user: "artbopstudio",
        action: "发布了",
        target: "Soft Infrastructures for Civic Screens",
        image:
          "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1400&auto=format&fit=crop",
        title: "Soft Infrastructures for Civic Screens",
        excerpt:
          "一个围绕公共媒介界面如何成为情绪、文化与城市基础设施的编辑型项目。",
        date: "10/04/2026",
        author: "artbopstudio",
        type: "官方精选",
        people: "ArtBop 编辑团队",
        tags: "媒体建筑, 城市屏幕",
      },
    ],
  },
};

export default function ActivityPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <main className="min-h-screen bg-neutral-200 text-neutral-900">
      <Header />

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-[11px] uppercase tracking-[0.24em] text-neutral-500 mb-3">
          {t.eyebrow}
        </div>
        <h1 className="text-3xl md:text-5xl font-normal tracking-tight max-w-4xl leading-tight">
          {t.title}
        </h1>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16 space-y-10">
        {t.items.map((item, index) => (
          <ActivityCard
            key={index}
            time={item.time}
            user={item.user}
            action={item.action}
            target={item.target}
            image={item.image}
            title={item.title}
            excerpt={item.excerpt}
            date={item.date}
            author={item.author}
            type={item.type}
            people={item.people}
            tags={item.tags}
          />
        ))}
      </section>

      <Footer />
    </main>
  );
}