"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useLanguage } from "../../../components/LanguageContext";
import { useParams } from "next/navigation";

const articles = {
  "atmospheric-interfaces": {
    en: {
      category: "Official Feature",
      title: "Atmospheric Interfaces in Public Space",
      intro:
        "A study of interactive environments, urban media systems, and sensory design languages in contemporary public space.",
      body: [
        "This feature examines how atmospheric design can shape public perception through light, interface, material, and movement.",
        "Rather than treating urban installations as isolated visual objects, the project frame considers them as part of a wider civic and emotional infrastructure.",
        "ArtBop’s editorial approach highlights the relationships between experience design, architecture, and visual storytelling.",
      ],
    },
    zh: {
      category: "官方精选",
      title: "公共空间中的氛围界面",
      intro:
        "一篇关于互动环境、城市媒介系统与当代公共空间感知设计语言的研究型内容。",
      body: [
        "这篇内容讨论氛围设计如何通过光线、界面、材料与运动影响公共感知。",
        "它并不把城市装置视作孤立的视觉物件，而是将其理解为更广泛的城市情绪与公共基础设施的一部分。",
        "ArtBop 的编辑方式强调体验设计、建筑与视觉叙事之间的关系。",
      ],
    },
  },
  "material-futures": {
    en: {
      category: "Design",
      title: "Material Futures and Spatial Experiments",
      intro:
        "A closer look at how emerging studios work across texture, structure, and speculative object-making.",
      body: [
        "Material experimentation increasingly sits between design, sculpture, and installation.",
        "These practices often begin with surface research, industrial leftovers, or tactile systems that later become architectural gestures.",
        "The editorial lens here is less about product resolution and more about process, attitude, and spatial imagination.",
      ],
    },
    zh: {
      category: "设计",
      title: "材料未来与空间实验",
      intro:
        "聚焦新兴工作室如何在肌理、结构与推测性造物之间展开创作。",
      body: [
        "材料实验正在越来越多地处于设计、雕塑与装置之间的交界地带。",
        "这些实践常常从表面研究、工业边角料或触觉系统开始，最终转化为空间性的表达。",
        "这里的编辑视角并不只关注产品结果，而更关注过程、态度与空间想象力。",
      ],
    },
  },
  "game-space-visual-culture": {
    en: {
      category: "Visual Culture",
      title: "Game Space, Image Systems, and New Visual Culture",
      intro:
        "Projects and essays connecting digital worlds, image production, and narrative environments.",
      body: [
        "Contemporary visual culture is shaped as much by game environments as by photography, cinema, and graphic design.",
        "This article traces how spatial storytelling and image systems move across digital and physical formats.",
        "It also asks how editorial platforms can frame game-related work within a broader cultural discourse.",
      ],
    },
    zh: {
      category: "视觉文化",
      title: "游戏空间、图像系统与新视觉文化",
      intro:
        "关于数字世界、图像生产与叙事环境之间联系的项目与文章。",
      body: [
        "当代视觉文化不仅受到摄影、电影和平面设计影响，也深受游戏环境塑造。",
        "这篇文章梳理了空间叙事与图像系统如何在数字与现实媒介之间流动。",
        "它也讨论了编辑平台如何将游戏相关作品放进更广阔的文化语境中。",
      ],
    },
  },
};

export default function ArticleDetailPage() {
  const { language } = useLanguage();
  const params = useParams();
  const slug = params.slug as string;

  const article = articles[slug as keyof typeof articles]?.[language];

  if (!article) {
    return <div className="p-10">Article not found.</div>;
  }

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header />

      <article className="max-w-4xl mx-auto px-6 py-14">
        <div className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-4">
          {article.category}
        </div>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-none max-w-4xl">
          {article.title}
        </h1>

        <p className="mt-6 text-xl text-neutral-600 leading-9 max-w-3xl">
          {article.intro}
        </p>

        <div className="mt-10 space-y-6 text-neutral-800 leading-8 text-lg">
          {article.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      <Footer />
    </main>
  );
}