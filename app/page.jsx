"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ── パレット（添付の早見表を参考） ──
//  マウンテンブルー #26333d / スレートブルー #4a6b93
//  クールグレイ #a3adba / ペリウィンクル #eef1f5
//  ※ 色は要所のみ。基調は白と淡いグレイ。

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.unobserve(el)),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// 背景の淡いネットワーク模様
function NetworkBg({ opacity = 0.4 }) {
  const nodes = [
    [90, 110], [200, 70], [300, 170], [170, 210], [70, 280],
    [400, 120], [500, 220], [380, 300], [270, 340], [560, 300],
    [620, 170], [460, 380], [150, 380], [610, 400],
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 5], [5, 6], [2, 6],
    [6, 7], [7, 8], [3, 8], [5, 9], [6, 10], [9, 13], [7, 11], [11, 13],
    [8, 12], [12, 4], [11, 9], [10, 5],
  ];
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 700 460"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ opacity }}
    >
      <g stroke="#8a99a8" strokeWidth="0.6" opacity="0.5">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
      </g>
      <g fill="#8a99a8">
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 3.4 : 2.2} opacity="0.6" />
        ))}
      </g>
    </svg>
  );
}

// 幾何学的な透かし（同心円＋放射線）
function GeoBg({ className, opacity = 0.06 }) {
  return (
    <svg className={className} viewBox="0 0 400 400" aria-hidden="true" style={{ opacity }}>
      <g fill="none" stroke="#4a6b93" strokeWidth="1">
        {[50, 95, 140, 185].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          return (
            <line
              key={i}
              x1={200 + Math.cos(a) * 50}
              y1={200 + Math.sin(a) * 50}
              x2={200 + Math.cos(a) * 185}
              y2={200 + Math.sin(a) * 185}
            />
          );
        })}
      </g>
      <g fill="#4a6b93">
        {[0, 3, 6, 9].map((i) => {
          const a = (i * Math.PI) / 6;
          return <circle key={i} cx={200 + Math.cos(a) * 140} cy={200 + Math.sin(a) * 140} r="4" />;
        })}
      </g>
    </svg>
  );
}

export default function Home() {
  const interests = ["医療情報学", "医療政策", "医療経済", "臨床疫学"];

  const profile = [
    {
      en: "RESEARCH",
      title: "研究",
      body:
        "医療情報学を軸に、レセプトや電子カルテなどのデータを分析し、医療の利用や連携のありようを読み解いています。医療機関のつながりをネットワークとして捉える研究にも取り組んでいます。",
    },
    {
      en: "EDUCATION",
      title: "教育",
      body:
        "データサイエンス、公衆衛生・疫学、医療経営、経済にわたる科目を担当し、データを丁寧に扱う姿勢を伝えることを大切にしています。",
    },
    {
      en: "ENGAGEMENT",
      title: "政策・社会への提言",
      body:
        "分析から得られた知見を、政策や現場の議論に少しでも役立てられる形にすることを目指しています。",
    },
  ];

  const concurrent = [
    { year: "2026.04 –", text: "自治医科大学 データサイエンスセンター 客員研究員" },
    { year: "2023.04 –", text: "北海道大学 大学院保健科学研究院 客員准教授" },
    { year: "2023.04 –", text: "東京大学 大学院医学系研究科 客員研究員" },
  ];

  const pastPositions = [
    { year: "2025", text: "OECD 雇用労働社会問題局（DELSA）" },
    { year: "2022.10 – 2025", text: "医療経済研究機構 主席研究員" },
    { year: "2017.04 – 2018", text: "北海道大学 大学院保健科学研究院 助教／特任助教" },
  ];

  const education = [
    { year: "2021 – 2023", text: "東京大学 大学院医学系研究科 公共健康医学専攻" },
    { year: "2016 – 2020", text: "北海道大学 大学院保健科学研究院 博士後期課程" },
    { year: "2013 – 2014", text: "小樽商科大学 大学院商学研究科" },
    { year: "2011 – 2013", text: "北海道大学 大学院保健科学院 修士課程" },
    { year: "2007 – 2011", text: "北海道大学 医学部保健学科" },
  ];

  const papers = [
    {
      title:
        "Understanding Collaborative CT and MRI Utilization Through Network Analysis",
      journal: "JMIR Formative Research",
      year: "2026",
      url: "https://formative.jmir.org/2026/1/e72248",
    },
    {
      title:
        "Impact of the COVID-19 Pandemic on Continuity of Medical Treatment for Patients with Chronic Diseases in Japan",
      journal: "BMC Health Services Research",
      year: "2025",
      url: "https://link.springer.com/article/10.1186/s12913-025-12798-3",
    },
    {
      title:
        "Changes in Demand Volume and Patient / Health Care Provider Characteristics of First-Time Telehealth Users",
      journal: "Telemedicine and e-Health",
      year: "2024",
      url: "https://www.liebertpub.com/doi/10.1089/tmj.2023.0118",
    },
    {
      title:
        "The Association Between Telehealth Utilization and Policy Responses on COVID-19 in Japan: Interrupted Time-Series Analysis",
      journal: "Interactive Journal of Medical Research",
      year: "2022",
      url: "https://www.i-jmr.org/2022/2/e39181",
    },
  ];

  const projects = [
    { period: "2026.07 – 2027.03", title: "電子カルテ・レセプト統合解析による救急受診適正化モデルの構築", funder: "北海道科学技術総合振興センター（ノーステック財団） タレント補助金" },
    { period: "2026.06 – 2027.01", title: "保健医療リアルワールドデータを用いた患者受診行動予測に基づく医療政策評価のための高度モデル分析", funder: "文部科学省 AI for Science 萌芽的挑戦研究創出事業（SPReAD）" },
    { period: "2026.06 – 2027.03", title: "北海道における放射線治療の均てん化と集中化に向けた需給分析枠組みの開発", funder: "秋山記念生命科学振興財団" },
    { period: "2026.06 – 2026.12", title: "救急受診適正化のための機械学習による重症予測モデルの構築と要因分析", funder: "伊藤医薬学術交流財団 海外留学学会等研究交流助成" },
    { period: "2025.04 – 2026.03", title: "レセプトデータおよび電子カルテデータを活用した救急搬送適正評価モデルの構築", funder: "受託研究" },
    { period: "2024.04 – 2027.03", title: "高次の医療需給を評価し医療連携政策を支援する大規模レセプトデータ分析技術の開発", funder: "日本学術振興会 科学研究費助成事業 基盤研究(C)" },
    { period: "2024.04 – 2025.03", title: "OECDのSHA手法に適用可能な保健医療支出推計の速報化とCOVID-19関連費用算出に関する研究", funder: "厚生労働省 政策科学総合研究事業" },
    { period: "2023", title: "リアルワールドデータを用いた「リフィル処方箋」に関する政策対応前後の比較研究", funder: "受託研究" },
    { period: "2022.11 – 2023.12", title: "大規模レセプト・健診データベースを用いた With/Post COVID-19 における慢性疾患患者の治療継続性に関する研究", funder: "医療科学研究所 指定課題研究" },
    { period: "2021.04 – 2023.03", title: "地域の資源配置計画に資するNDBと医療・介護連結データを用いた需給評価手法の開発", funder: "日本学術振興会 科学研究費助成事業 若手研究" },
    { period: "2020.12 – 2021.11", title: "行政ビッグデータ分析基盤を用いた画像診断機器利用状況の可視化及び評価に関する研究", funder: "ファイザーヘルスリサーチ振興財団" },
    { period: "2018.04 – 2022.03", title: "地域医療における需給評価手法の開発：NDBを活用した将来予測モデル構築", funder: "日本学術振興会 科学研究費助成事業 若手研究" },
  ];

  const courses = [
    {
      field: "データサイエンス",
      items: [
        { name: "医療情報学", slug: "medical-informatics" },
        { name: "データ解析入門Ⅰ・Ⅱ", slug: "data-analysis" },
        { name: "基礎医学特論", slug: "basic-medicine" },
      ],
    },
    {
      field: "公衆衛生・疫学",
      items: [
        { name: "衛生・公衆衛生学", slug: "public-health" },
        { name: "臨床疫学", slug: "clinical-epidemiology" },
        { name: "保健統計", slug: "health-statistics" },
        { name: "医療政策学", slug: "health-policy" },
      ],
    },
    {
      field: "医療経営",
      items: [
        { name: "医療マネジメント特講", slug: "healthcare-management" },
        { name: "地域ヘルスケアマネジメント", slug: "regional-healthcare" },
        { name: "病院経営ケーススタディ", slug: "hospital-management" },
      ],
    },
    {
      field: "経済",
      items: [
        { name: "医療経済学", slug: "health-economics" },
        { name: "医療産業論", slug: "health-industry" },
        { name: "医療と経済・社会", slug: "economy-society" },
      ],
    },
  ];

  return (
    <div
      className="min-h-screen bg-white text-[#2b3742] antialiased"
      style={{ ["--sans"]: "'Noto Sans JP', sans-serif", fontFamily: "var(--sans)" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap');
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ── ヘッダー ── */}
      <header className="fixed top-0 inset-x-0 z-40 bg-white/85 backdrop-blur-sm border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="text-sm tracking-wide font-bold">
            石川 智基
            <span className="text-[#7a8794] font-semibold ml-2 text-xs tracking-[0.2em]">TOMOKI ISHIKAWA</span>
          </a>
          <nav className="flex gap-5 md:gap-6 text-xs tracking-[0.16em] text-[#3c4854] font-bold">
            <a href="#about" className="hover:text-[#4a6b93]">ABOUT</a>
            <a href="#research" className="hover:text-[#4a6b93]">RESEARCH</a>
            <a href="#projects" className="hover:text-[#4a6b93] hidden sm:inline">PROJECTS</a>
            <a href="#teaching" className="hover:text-[#4a6b93]">TEACHING</a>
            <a href="#contact" className="hover:text-[#4a6b93]">CONTACT</a>
          </nav>
        </div>
      </header>

      {/* ── ヒーロー ── */}
      <section id="top" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#eef1f5] to-white" />
        <NetworkBg opacity={0.4} />
        <div className="relative">
          <Reveal>
            <p className="text-[11px] tracking-[0.4em] text-[#7f8ea0] mb-6">
              MEDICAL INFORMATICS ・ HEALTH POLICY
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide text-[#26333d]">石川 智基</h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-6 text-sm md:text-base text-[#5b6975] leading-relaxed">
              旭川医科大学 社会医学講座<br />
              データにもとづく医療の研究と教育
            </p>
          </Reveal>
          <Reveal delay={450}>
            <a href="#about" className="inline-block mt-12 text-xs tracking-[0.25em] text-[#4a6b93] border-b border-[#4a6b93]/40 pb-1 hover:border-[#4a6b93] transition">
              LEARN MORE ↓
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="px-6 py-28 md:py-36 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-[11px] tracking-[0.35em] text-[#7f8ea0] mb-6">ABOUT</p>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lg md:text-xl leading-loose text-[#3c4854] font-light">
              医療情報学を軸に、特定の分野にとどまらず、データにもとづいて医療や社会の課題に向き合ってきました。分析から得られた知見を、政策や現場の議論に少しでも役立てられるよう、領域を横断した研究と教育に取り組んでいます。
            </p>
          </Reveal>
          <Reveal delay={250}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {interests.map((k) => (
                <span key={k} className="text-xs tracking-wide border border-[#4a6b93]/20 rounded-full px-4 py-1.5 text-[#55636f]">
                  {k}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── プロフィール（3列 / レスポンシブで1列） ── */}
      <section className="relative px-6 py-24 md:py-32 bg-[#f2f4f7] border-y border-black/5 overflow-hidden">
        <NetworkBg opacity={0.12} />
        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[11px] tracking-[0.35em] text-[#7f8ea0] mb-12 text-center">PROFILE</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {profile.map((p, i) => (
              <Reveal key={p.en} delay={i * 120}>
                <div className="text-center md:text-left">
                  <p className="text-[10px] tracking-[0.3em] text-[#93a0af] mb-3">{p.en}</p>
                  <h3 className="text-lg md:text-xl font-medium mb-4 text-[#26333d]">{p.title}</h3>
                  <p className="text-sm text-[#5b6975] leading-loose">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 経歴 ── */}
      <section className="relative px-6 py-28 md:py-36 bg-white overflow-hidden">
        <GeoBg className="absolute -right-24 -top-12 w-[440px] h-[440px] hidden md:block" opacity={0.09} />
        <div className="relative max-w-4xl mx-auto">
          <Reveal>
            <p className="text-[11px] tracking-[0.35em] text-[#7f8ea0] mb-12 text-center">CAREER</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16">
            {/* 左：現職＋職歴 */}
            <div className="space-y-12">
              <div>
                <Reveal>
                  <h3 className="text-base font-medium text-[#26333d] mb-6 pb-3 border-b border-[#4a6b93]/25">現職</h3>
                </Reveal>
                {/* 本務 */}
                <Reveal>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] tracking-[0.15em] text-white bg-[#4a6b93] rounded px-2 py-0.5">本務</span>
                      <span className="text-xs text-[#8a99a8] tabular-nums">2026.01 –</span>
                    </div>
                    <p className="text-[#26333d] font-medium leading-relaxed">旭川医科大学 社会医学講座 講師</p>
                  </div>
                </Reveal>
                {/* 兼務 */}
                <Reveal delay={80}>
                  <p className="text-[11px] tracking-[0.2em] text-[#93a0af] mb-3">兼務</p>
                </Reveal>
                <div className="space-y-3">
                  {concurrent.map((p, i) => (
                    <Reveal key={p.text} delay={100 + i * 60}>
                      <div className="flex gap-4 text-sm">
                        <span className="text-[#8a99a8] shrink-0 w-24 tabular-nums">{p.year}</span>
                        <span className="text-[#5b6975] leading-relaxed">{p.text}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <div>
                <Reveal>
                  <h3 className="text-base font-medium text-[#26333d] mb-6 pb-3 border-b border-[#4a6b93]/25">職歴</h3>
                </Reveal>
                <div className="space-y-5">
                  {pastPositions.map((p, i) => (
                    <Reveal key={p.text} delay={i * 70}>
                      <div className="flex gap-4 text-sm">
                        <span className="text-[#8a99a8] shrink-0 w-24 tabular-nums">{p.year}</span>
                        <span className="text-[#3c4854] leading-relaxed">{p.text}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>

            {/* 右：学歴 */}
            <div>
              <Reveal>
                <h3 className="text-base font-medium text-[#26333d] mb-6 pb-3 border-b border-[#4a6b93]/25">学歴</h3>
              </Reveal>
              <div className="space-y-5">
                {education.map((e, i) => (
                  <Reveal key={e.text} delay={i * 70}>
                    <div className="flex gap-4 text-sm">
                      <span className="text-[#8a99a8] shrink-0 w-24 tabular-nums">{e.year}</span>
                      <span className="text-[#3c4854] leading-relaxed">{e.text}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESEARCH（英語論文カード） ── */}
      <section id="research" className="relative px-6 py-28 md:py-36 bg-[#f2f4f7] border-y border-black/5 overflow-hidden">
        <GeoBg className="absolute -left-24 -bottom-16 w-[440px] h-[440px] hidden md:block" opacity={0.09} />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Reveal><p className="text-[11px] tracking-[0.35em] text-[#7f8ea0] mb-4">RESEARCH</p></Reveal>
            <Reveal delay={100}><h2 className="text-2xl md:text-3xl font-light text-[#26333d]">主要な論文</h2></Reveal>
            <Reveal delay={180}>
              <p className="mt-5 text-sm text-[#5b6975] leading-relaxed">
                査読付きの英語論文の一部を紹介します。全業績は researchmap をご覧ください。
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {papers.map((p, i) => (
              <Reveal key={p.url} delay={i * 100}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group block h-full bg-white border border-black/10 rounded-lg p-7 hover:border-[#4a6b93]/50 hover:shadow-sm transition"
                >
                  <p className="text-[11px] tracking-[0.2em] text-[#93a0af] mb-4">
                    {p.journal} ・ {p.year}
                  </p>
                  <h3 className="text-base md:text-lg leading-relaxed text-[#2b3742] group-hover:text-[#4a6b93] transition">
                    {p.title}
                  </h3>
                  <span className="inline-block mt-5 text-xs tracking-[0.2em] text-[#4a6b93]">
                    VIEW ARTICLE →
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="text-center mt-12">
              <a
                href="https://researchmap.jp/ish0321/published_papers"
                target="_blank"
                rel="noreferrer"
                className="text-xs tracking-[0.25em] text-[#55636f] border-b border-black/20 pb-1 hover:text-[#4a6b93] hover:border-[#4a6b93] transition"
              >
                VIEW ALL PUBLICATIONS →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 研究プロジェクト（研究費・助成金） ── */}
      <section id="projects" className="px-6 py-28 md:py-36 bg-white border-t border-black/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <Reveal><p className="text-[11px] tracking-[0.35em] text-[#7f8ea0] mb-4">FUNDING</p></Reveal>
            <Reveal delay={100}><h2 className="text-2xl md:text-3xl font-light text-[#26333d]">研究プロジェクト</h2></Reveal>
            <Reveal delay={180}>
              <p className="mt-5 text-sm text-[#5b6975] leading-relaxed">
                これまでに携わった主な研究費・助成金です。
              </p>
            </Reveal>
          </div>

          <div className="border-t border-black/10">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={Math.min(i, 6) * 60}>
                <div className="flex flex-col md:flex-row md:gap-8 py-6 border-b border-black/10">
                  <span className="text-xs text-[#8a99a8] md:w-36 shrink-0 tabular-nums mb-1 md:mb-0 md:pt-1">
                    {p.period}
                  </span>
                  <div>
                    <h3 className="text-sm md:text-base text-[#2b3742] leading-relaxed">{p.title}</h3>
                    <p className="text-xs text-[#93a0af] mt-1.5">{p.funder}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="text-center mt-12">
              <a
                href="https://researchmap.jp/ish0321/research_projects"
                target="_blank"
                rel="noreferrer"
                className="text-xs tracking-[0.25em] text-[#55636f] border-b border-black/20 pb-1 hover:text-[#4a6b93] hover:border-[#4a6b93] transition"
              >
                VIEW ALL PROJECTS →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TEACHING ── */}
      <section id="teaching" className="px-6 py-28 md:py-36 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Reveal><p className="text-[11px] tracking-[0.35em] text-[#7f8ea0] mb-4">TEACHING</p></Reveal>
            <Reveal delay={100}><h2 className="text-2xl md:text-3xl font-light text-[#26333d]">講義</h2></Reveal>
            <Reveal delay={180}>
              <p className="mt-5 text-sm text-[#5b6975] leading-relaxed">
                担当する科目を分野ごとにまとめています。科目名から資料のページへ移動できます。（準備中）
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {courses.map((c, i) => (
              <Reveal key={c.field} delay={i * 80}>
                <div className="bg-[#f7f8fa] border border-black/10 rounded-lg p-7 h-full">
                  <p className="text-[11px] tracking-[0.2em] text-[#93a0af] mb-5">{c.field}</p>
                  <div className="flex flex-wrap gap-2">
                    {c.items.map((it) => (
                      <Link
                        key={it.slug}
                        href={`/teaching/${it.slug}`}
                        className="text-sm border border-black/10 rounded-full px-3.5 py-1 text-[#55636f] hover:bg-[#4a6b93] hover:text-white hover:border-[#4a6b93] transition"
                      >
                        {it.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="px-6 py-28 md:py-36 bg-[#f2f4f7] border-t border-black/5">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal><p className="text-[11px] tracking-[0.35em] text-[#7f8ea0] mb-4">CONTACT</p></Reveal>
          <Reveal delay={100}>
            <p className="text-lg md:text-xl font-light leading-loose text-[#3c4854]">
              研究・教育に関するお問い合わせは、<br className="md:hidden" />下記のプロフィールからお願いいたします。
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="https://researchmap.jp/ish0321" target="_blank" rel="noreferrer"
                 className="border border-[#4a6b93]/30 rounded-full px-7 py-3 text-xs tracking-[0.2em] text-[#55636f] hover:bg-[#4a6b93] hover:text-white hover:border-[#4a6b93] transition">
                researchmap
              </a>
              <a href="https://orcid.org/0000-0001-8725-6508" target="_blank" rel="noreferrer"
                 className="border border-[#4a6b93]/30 rounded-full px-7 py-3 text-xs tracking-[0.2em] text-[#55636f] hover:bg-[#4a6b93] hover:text-white hover:border-[#4a6b93] transition">
                ORCID
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── フッター ── */}
      <footer className="px-6 py-10 bg-[#26333d] text-[#9aa6b2]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-2 text-xs">
          <span className="text-white tracking-wide">石川 智基 ・ Tomoki Ishikawa</span>
          <span>© Tomoki Ishikawa</span>
        </div>
      </footer>
    </div>
  );
}
