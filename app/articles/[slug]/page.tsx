"use client";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useLanguage } from "../../../components/LanguageContext";
import { useParams } from "next/navigation";

type LocalizedArticle = {
  category: string;
  title: string;
  intro: string;
  body: string[];
  author?: string;
  team?: string;
  sourceName?: string;
  sourceUrl?: string;
  images?: string[];
};

const articles: Record<
  string,
  {
    en: LocalizedArticle;
    zh: LocalizedArticle;
  }
> = {
  "airforce-animatronics-single-tube": {
    en: {
      category: "Art & Technology / Digital Fabrication",
      title: "AirForce — Animatronics Structures from a Single Tube",
      intro:
        "AirForce is a fabrication system that turns one continuous inflatable tube into large-scale, load-bearing animated structures.",
      body: [
        "Created by a team of researchers at the Hasso Plattner Institute, AirForce replaces both the static elements and the pneumatic actuators of a conventional animatronic structure with a single tube-based system.",
        "At the center of the project is a Blender plug-in for designing and animating tube-based trusses. As a model is built, the software reroutes a continuous tube through the structure in real time and allows selected segments to become different kinds of actuators.",
        "The team tripled the tube’s cross-section, replaced fin seals with lap seals, and developed custom blowers. Together, these changes increased pressure and airflow enough for the resulting structures to lift human weight.",
        "AirForce can be assembled on the ground, transported while deflated, unfolded on site, and later refolded into a different actuated structure with almost complete material reuse.",
        "Its assembly system uses pre-made tube, hook-and-loop ties, custom inlets, blowers, and automatically generated placement stickers. The result is a lightweight fabrication method that requires no custom machinery.",
        "The project suggests a different relationship between structure and movement: rather than attaching motors to a finished frame, the frame itself becomes an active, inflatable mechanism.",
      ],
      author: "Filip",
      team:
        "Lukas Rambold, Robert Kovacs, Min Deng, Antonius Naumann, Konrad Gerlach, Horatio Hamkins, Helena Lendowski, Chiao Fang, Shohei Katakura, Conrad Lempert, Muhammad Abdullah, Patrick Baudisch",
      sourceName: "CreativeApplications.Net",
      sourceUrl:
        "https://www.creativeapplications.net/project/airforce-animatronics-structures-from-a-single-tube/",
      images: [
        "/images/articles/airforce/00-cover.jpg",
        "/images/articles/airforce/01.jpg",
        "/images/articles/airforce/02.jpg",
        "/images/articles/airforce/03.jpg",
        "/images/articles/airforce/04.jpg",
        "/images/articles/airforce/05.jpg",
        "/images/articles/airforce/06.jpg",
        "/images/articles/airforce/07.jpg",
        "/images/articles/airforce/08.png",
      ],
    },
    zh: {
      category: "艺术科技 / 数字制造",
      title: "一根管子撑起人类重量？AirForce 气动装置",
      intro:
        "AirForce 用一根连续充气管构建大型承重动态结构，让“结构本身”同时成为“驱动力”。",
      body: [
        "来自哈索·普拉特纳研究所（Hasso Plattner Institute）的研究团队开发了 AirForce。它改变了传统机械装置中结构与执行器相互分离的方式，以连续管材同时承担静态结构和气动驱动功能。",
        "系统的核心是一款 Blender 插件。用户建模时，软件会实时规划单管在桁架结构中的路径，并允许将指定的结构段转化为不同类型的执行器。",
        "为了获得足够的承重能力，团队将管材横截面增大三倍，以搭接密封取代传统鳍式密封，并使用定制鼓风机。这些改进提高了管内压力与空气流量，使结构足以抬起人体重量。",
        "结构可以在地面完成组装，以放气状态运输和部署，也可以重新折叠为另一种动态结构，材料复用率接近百分之百。",
        "AirForce 不依赖定制机械。预制管材、魔术贴、定制进气口、鼓风机与自动生成的定位贴纸，共同组成了一套轻量、可拆卸的制造方法。",
        "这个项目提出了结构与运动之间的新关系：运动能力不再由附加在框架上的电机提供，而是直接来自框架自身的充气与形变。",
      ],
      author: "Filip",
      team:
        "Lukas Rambold、Robert Kovacs、Min Deng、Antonius Naumann、Konrad Gerlach、Horatio Hamkins、Helena Lendowski、Chiao Fang、Shohei Katakura、Conrad Lempert、Muhammad Abdullah、Patrick Baudisch",
      sourceName: "CreativeApplications.Net",
      sourceUrl:
        "https://www.creativeapplications.net/project/airforce-animatronics-structures-from-a-single-tube/",
      images: [
        "/images/articles/airforce/00-cover.jpg",
        "/images/articles/airforce/01.jpg",
        "/images/articles/airforce/02.jpg",
        "/images/articles/airforce/03.jpg",
        "/images/articles/airforce/04.jpg",
        "/images/articles/airforce/05.jpg",
        "/images/articles/airforce/06.jpg",
        "/images/articles/airforce/07.jpg",
        "/images/articles/airforce/08.png",
      ],
    },
  },
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

        {(article.author || article.team) && (
          <div className="mt-8 border-y border-neutral-200 py-5 text-sm leading-7 text-neutral-600">
            {article.author && <p>Author: {article.author}</p>}
            {article.team && <p>Team: {article.team}</p>}
          </div>
        )}

        <div className="mt-10 space-y-6 text-neutral-800 leading-8 text-lg">
          {article.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {article.images && article.images.length > 0 && (
          <section className="mt-14 border-t border-neutral-200 pt-8">
            <div className="space-y-8">
              {article.images.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`${article.title} — image ${index + 1}`}
                  className="w-full rounded-2xl bg-white object-contain"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ))}
            </div>
          </section>
        )}

        {article.sourceUrl && (
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block text-sm underline underline-offset-4"
          >
            Source: {article.sourceName || article.sourceUrl}
          </a>
        )}
      </article>

      <Footer />
    </main>
  );
}
