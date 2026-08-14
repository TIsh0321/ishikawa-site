"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

// スクロールでふわっと現れる
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

// 背景の淡いネットワーク模様（グレースケール・低濃度）
function NetworkBg({ opacity = 0.5 }) {
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
      <g stroke="#9aa0a6" strokeWidth="0.6" opacity="0.5">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
      </g>
      <g fill="#9aa0a6">
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 3.4 : 2.2} opacity="0.6" />
        ))}
      </g>
    </svg>
  );
}

export default function Home() {
  const interests = ["医療情報学", "医療政策", "医療経済", "臨床疫学"];

  const themes = [
    {
      en: "OBSERVING",
      title: "データにもとづいて医療を観察する",
      body:
        "レセプトや電子カルテなどの記録から、医療の利用や連携のありようを、できるだけ丁寧に読み解くことを心がけています。",
    },
    {
      en: "NETWORKS",
      title: "医療連携をネットワークとして捉える",
      body:
        "医療機関どうしのつながりをネットワークとして眺めることで、地域の医療の姿を少しずつ明らかにしていきます。",
    },
    {
      en: "TOWARD SOCIETY",
      title: "政策や社会への橋渡しを試みる",
      body:
        "分析から見えてきたことを、政策や現場の議論に役立てられる形にすることを目指し、研究と教育に取り組んでいます。",
    },
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

  const courses = [
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
      field: "データサイエンス",
      items: [
        { name: "医療情報学", slug: "medical-informatics" },
        { name: "データ解析入門Ⅰ・Ⅱ", slug: "data-analysis" },
        { name: "基礎医学特論", slug: "basic-medicine" },
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
      className="min-h-screen bg-white text-[#1f2530] antialiased"
      style={{ ["--sans"]: "'Inter', 'Noto Sans JP', sans-serif", fontFamily: "var(--sans)" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Noto+Sans+JP:wght@300;400;500&display=swap');
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ── ヘッダー ── */}
      <header className="fixed top-0 inset-x-0 z-40 bg-white/85 backdrop-blur-sm border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="text-sm tracking-wide font-medium">
            石川 智基
            <span className="text-[#6b7280] font-normal ml-2 text-xs tracking-[0.2em]">TOMOKI ISHIKAWA</span>
          </a>
          <nav className="flex gap-6 text-xs tracking-[0.18em] text-[#4b5563]">
            <a href="#about" className="hover:text-[#33506b]">ABOUT</a>
            <a href="#research" className="hover:text-[#33506b]">RESEARCH</a>
            <a href="#teaching" className="hover:text-[#33506b]">TEACHING</a>
            <a href="#contact" className="hover:text-[#33506b]">CONTACT</a>
          </nav>
        </div>
      </header>

      {/* ── ヒーロー ── */}
      <section id="top" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f8fa] to-white" />
        <NetworkBg opacity={0.4} />
        <div className="relative">
          <Reveal>
            <p className="text-[11px] tracking-[0.4em] text-[#8a94a6] mb-6">
              MEDICAL INFORMATICS ・ HEALTH POLICY
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide">石川 智基</h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-6 text-sm md:text-base text-[#6b7280] leading-relaxed">
              旭川医科大学 社会医学講座<br />
              データにもとづく医療の研究と教育
            </p>
          </Reveal>
          <Reveal delay={450}>
            <a href="#about" className="inline-block mt-12 text-xs tracking-[0.25em] text-[#33506b] border-b border-[#33506b]/40 pb-1 hover:border-[#33506b] transition">
              LEARN MORE ↓
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="px-6 py-28 md:py-36 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-[11px] tracking-[0.35em] text-[#8a94a6] mb-6">ABOUT</p>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lg md:text-xl leading-loose text-[#374151] font-light">
              医療情報学を軸に、特定の分野にとどまらず、データにもとづいて医療や社会の課題に向き合ってきました。分析から得られた知見を、政策や現場の議論に少しでも役立てられるよう、領域を横断した研究と教育に取り組んでいます。
            </p>
          </Reveal>
          <Reveal delay={250}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {interests.map((k) => (
                <span key={k} className="text-xs tracking-wide border border-black/10 rounded-full px-4 py-1.5 text-[#6b7280]">
                  {k}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={350}>
            <div className="mt-12 text-sm text-[#6b7280] leading-relaxed space-y-1">
              <p>旭川医科大学 社会医学講座 講師</p>
              <p>北海道大学 大学院保健科学研究院 客員准教授</p>
              <p>東京大学 大学院医学系研究科 客員研究員</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 研究の関心（積み重なる帯） ── */}
      {themes.map((t, i) => (
        <section
          key={t.en}
          className="relative px-6 py-24 md:py-32 overflow-hidden border-t border-black/5"
          style={{ background: i % 2 === 0 ? "#f6f7f9" : "#ffffff" }}
        >
          <NetworkBg opacity={0.16} />
          <div className="relative max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="text-[11px] tracking-[0.35em] text-[#8a94a6] mb-5">{t.en}</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-xl md:text-3xl font-light mb-6">{t.title}</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-[#6b7280] leading-loose text-sm md:text-base">{t.body}</p>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ── RESEARCH（英語論文カード） ── */}
      <section id="research" className="px-6 py-28 md:py-36 bg-white border-t border-black/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Reveal><p className="text-[11px] tracking-[0.35em] text-[#8a94a6] mb-4">RESEARCH</p></Reveal>
            <Reveal delay={100}><h2 className="text-2xl md:text-3xl font-light">主要な論文</h2></Reveal>
            <Reveal delay={180}>
              <p className="mt-5 text-sm text-[#6b7280] leading-relaxed">
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
                  className="group block h-full border border-black/10 rounded-lg p-7 hover:border-[#33506b]/40 hover:shadow-sm transition"
                >
                  <p className="text-[11px] tracking-[0.2em] text-[#8a94a6] mb-4">
                    {p.journal} ・ {p.year}
                  </p>
                  <h3 className="text-base md:text-lg leading-relaxed text-[#1f2530] group-hover:text-[#33506b] transition">
                    {p.title}
                  </h3>
                  <span className="inline-block mt-5 text-xs tracking-[0.2em] text-[#33506b]">
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
                className="text-xs tracking-[0.25em] text-[#4b5563] border-b border-black/20 pb-1 hover:text-[#33506b] hover:border-[#33506b] transition"
              >
                VIEW ALL PUBLICATIONS →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TEACHING ── */}
      <section id="teaching" className="px-6 py-28 md:py-36 bg-[#f6f7f9] border-t border-black/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Reveal><p className="text-[11px] tracking-[0.35em] text-[#8a94a6] mb-4">TEACHING</p></Reveal>
            <Reveal delay={100}><h2 className="text-2xl md:text-3xl font-light">講義</h2></Reveal>
            <Reveal delay={180}>
              <p className="mt-5 text-sm text-[#6b7280] leading-relaxed">
                担当する科目を分野ごとにまとめています。科目名から資料のページへ移動できます。
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {courses.map((c, i) => (
              <Reveal key={c.field} delay={i * 80}>
                <div className="bg-white border border-black/10 rounded-lg p-7 h-full">
                  <p className="text-[11px] tracking-[0.2em] text-[#8a94a6] mb-5">{c.field}</p>
                  <div className="flex flex-wrap gap-2">
                    {c.items.map((it) => (
                      <Link
                        key={it.slug}
                        href={`/teaching/${it.slug}`}
                        className="text-sm border border-black/10 rounded-full px-3.5 py-1 text-[#4b5563] hover:bg-[#33506b] hover:text-white hover:border-[#33506b] transition"
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
      <section id="contact" className="px-6 py-28 md:py-36 bg-white border-t border-black/5">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal><p className="text-[11px] tracking-[0.35em] text-[#8a94a6] mb-4">CONTACT</p></Reveal>
          <Reveal delay={100}>
            <p className="text-lg md:text-xl font-light leading-loose text-[#374151]">
              研究・教育に関するお問い合わせは、<br className="md:hidden" />下記のプロフィールからお願いいたします。
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="https://researchmap.jp/ish0321" target="_blank" rel="noreferrer"
                 className="border border-black/15 rounded-full px-7 py-3 text-xs tracking-[0.2em] text-[#4b5563] hover:bg-[#33506b] hover:text-white hover:border-[#33506b] transition">
                researchmap
              </a>
              <a href="https://orcid.org/0000-0001-8725-6508" target="_blank" rel="noreferrer"
                 className="border border-black/15 rounded-full px-7 py-3 text-xs tracking-[0.2em] text-[#4b5563] hover:bg-[#33506b] hover:text-white hover:border-[#33506b] transition">
                ORCID
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── フッター ── */}
      <footer className="px-6 py-10 bg-[#1f2530] text-[#9aa0a6]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-2 text-xs">
          <span className="text-white tracking-wide">石川 智基 ・ Tomoki Ishikawa</span>
          <span>© Tomoki Ishikawa</span>
        </div>
      </footer>
    </div>
  );
}
