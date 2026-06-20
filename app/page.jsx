"use client";

import React, { useEffect, useRef, useState } from "react";

// ────────────────────────────────────────────────────────────
//  石川 智基 — 研究者個人サイト
//  元サイト「余白と脈動」のレイアウトを踏襲。
//  配色: 和紙(生成り) × 藍墨(紺青) × 朱  ── 格式ある日本的トーン
//  背景モチーフ: 患者共有ネットワーク / 墨の滲み / 脈動(心電)線 / 幾何
// ────────────────────────────────────────────────────────────

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
        transform: shown ? "translateY(0)" : "translateY(26px)",
        transition: `opacity 1.1s ease ${delay}ms, transform 1.1s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children, light }) {
  return (
    <span
      className={`text-[11px] tracking-[0.4em] ${light ? "text-stone-400" : "text-[#7d3b30]"}`}
      style={{ fontFamily: "var(--sans)" }}
    >
      {children}
    </span>
  );
}

// 研究の世界観：患者共有ネットワーク（節点と連結）＋墨の滲み＋脈動線
function HeroBackdrop() {
  const nodes = [
    [120, 130], [240, 90], [330, 210], [200, 250], [90, 320],
    [430, 140], [520, 250], [410, 330], [300, 380], [560, 120],
    [640, 320], [710, 200], [480, 430], [180, 440], [620, 440],
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [3, 4], [1, 5], [5, 6],
    [2, 6], [6, 7], [7, 8], [3, 8], [5, 9], [6, 10], [10, 11], [9, 11],
    [7, 12], [12, 10], [8, 13], [13, 4], [12, 14], [10, 14], [11, 9], [8, 12],
  ];
  // 飛沫（スプラッシュの粒）を散らす
  const drops = (cx, cy, color, n, spread) =>
    Array.from({ length: n }).map((_, i) => {
      const a = (i / n) * Math.PI * 2 + i;
      const d = spread * (0.45 + ((i * 37) % 100) / 100);
      const r = 1 + ((i * 53) % 5) * 0.7;
      return <circle key={i} cx={cx + Math.cos(a) * d} cy={cy + Math.sin(a) * d} r={r} fill={color} />;
    });

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 780 520"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* 水彩のにじみ・かすれを作る乱流フィルタ */}
        <filter id="wc" x="-40%" y="-40%" width="180%" height="180%">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.014" numOctaves="3" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="62" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="1.3" />
        </filter>
        <filter id="wc2" x="-40%" y="-40%" width="180%" height="180%">
          <feTurbulence type="fractalNoise" baseFrequency="0.013 0.018" numOctaves="3" seed="19" result="n2" />
          <feDisplacementMap in="SourceGraphic" in2="n2" scale="50" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
      </defs>

      {/* 水彩スプラッシュ：藍（右上） */}
      <g filter="url(#wc)" opacity="0.16">
        <circle cx="615" cy="160" r="92" fill="#2f5a7a" />
        <circle cx="560" cy="125" r="46" fill="#3f6f92" />
        <circle cx="678" cy="205" r="52" fill="#244c6b" />
        <circle cx="640" cy="120" r="30" fill="#3f6f92" />
      </g>
      <g fill="#2f5a7a" opacity="0.32">{drops(620, 165, "#2f5a7a", 16, 120)}</g>

      {/* 水彩スプラッシュ：朱（左下） */}
      <g filter="url(#wc2)" opacity="0.15">
        <circle cx="150" cy="410" r="78" fill="#9c2f24" />
        <circle cx="108" cy="378" r="40" fill="#b5483b" />
        <circle cx="195" cy="438" r="42" fill="#83271d" />
      </g>
      <g fill="#9c2f24" opacity="0.3">{drops(150, 410, "#9c2f24", 14, 110)}</g>

      {/* ネットワーク：連結 */}
      <g stroke="#15223b" strokeWidth="0.7" opacity="0.28">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
      </g>
      {/* ネットワーク：節点 */}
      <g>
        {nodes.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 4 === 0 ? 4.5 : 2.6}
            fill={i % 5 === 0 ? "#9c2f24" : "#15223b"}
            opacity="0.55"
            style={{ animation: `pulse 3.4s ease-in-out ${i * 0.22}s infinite` }}
          />
        ))}
      </g>

      {/* 脈動（心電）線 */}
      <path
        d="M0 470 H180 l14 -34 l16 64 l14 -86 l16 116 l14 -74 H320 l14 -28 l16 50 l14 -62 l16 82 l14 -48 H780"
        fill="none"
        stroke="#9c2f24"
        strokeWidth="1.4"
        opacity="0.5"
        strokeLinejoin="round"
        style={{ strokeDasharray: 1600, strokeDashoffset: 1600, animation: "draw 6s ease forwards 0.6s" }}
      />
    </svg>
  );
}

// 幾何モチーフ：同心の輪（データ／医療を連想）
function Rings({ className }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <g fill="none" stroke="#15223b" strokeWidth="0.6" opacity="0.18">
        {[20, 40, 60, 80, 95].map((r) => <circle key={r} cx="100" cy="100" r={r} />)}
      </g>
      <circle cx="100" cy="100" r="4" fill="#9c2f24" opacity="0.5" />
    </svg>
  );
}

// 幾何モチーフ：三角メッシュ
function Mesh({ className, light }) {
  const c = light ? "#cfd6e2" : "#15223b";
  return (
    <svg className={className} viewBox="0 0 240 160" aria-hidden="true">
      <g fill="none" stroke={c} strokeWidth="0.6" opacity={light ? "0.25" : "0.14"}>
        <polygon points="20,20 90,40 60,120" />
        <polygon points="90,40 160,20 150,90" />
        <polygon points="60,120 90,40 150,90" />
        <polygon points="150,90 160,20 220,70" />
        <polygon points="60,120 150,90 130,150" />
        <polygon points="150,90 220,70 200,150" />
      </g>
      <g fill={light ? "#9aa6bd" : "#9c2f24"} opacity="0.5">
        {[[20,20],[90,40],[160,20],[60,120],[150,90],[220,70]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="2.2" />
        ))}
      </g>
    </svg>
  );
}

// 汎用：水彩スプラッシュ（色・濃度・位置は呼び出し側で指定）
let _wcSeed = 30;
function Splash({ className, color = "#2f5a7a", opacity = 0.12 }) {
  const seed = (_wcSeed += 7);
  const fid = `wcf${seed}`;
  const drops = Array.from({ length: 12 }).map((_, i) => {
    const a = (i / 12) * Math.PI * 2 + i;
    const d = 70 + ((i * 37) % 60);
    return <circle key={i} cx={150 + Math.cos(a) * d} cy={150 + Math.sin(a) * d} r={1 + ((i * 53) % 4) * 0.7} />;
  });
  return (
    <svg className={className} viewBox="0 0 300 300" aria-hidden="true">
      <defs>
        <filter id={fid} x="-40%" y="-40%" width="180%" height="180%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.016" numOctaves="3" seed={seed} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="55" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      <g filter={`url(#${fid})`} fill={color} opacity={opacity}>
        <circle cx="150" cy="145" r="68" />
        <circle cx="112" cy="120" r="38" />
        <circle cx="190" cy="165" r="42" />
      </g>
      <g fill={color} opacity={opacity * 2.2}>{drops}</g>
    </svg>
  );
}

export default function ResearcherSite() {
  const keywords = ["医療情報学", "医療政策", "医療経済", "臨床疫学"];

  const domains = [
    { ja: "医療情報学", en: "Medical Informatics" },
    { ja: "医療政策", en: "Health Policy" },
    { ja: "医療経済", en: "Health Economics" },
    { ja: "臨床疫学", en: "Clinical Epidemiology" },
  ];

  const themes = [
    {
      title: "患者共有ネットワーク分析",
      body: "レセプトデータから医療機関の連携構造を可視化。CT・MRIの共同利用や脳梗塞の医療連携をネットワークとして捉える。",
      tags: ["ネットワーク分析", "レセプト", "医療連携"],
    },
    {
      title: "医療需給の将来予測",
      body: "システムダイナミクスとGISを結合し、医師の地域偏在と需給を将来推計。資源配置計画を支える。",
      tags: ["システムダイナミクス", "GIS", "需給予測"],
    },
    {
      title: "COVID-19と医療提供体制",
      body: "遠隔診療の普及や慢性疾患患者の治療継続性を、大規模レセプト・健診データで実証的に分析。",
      tags: ["遠隔診療", "慢性疾患", "政策評価"],
    },
  ];

  const steps = [
    { no: "01", label: "問いを立てる" },
    { no: "02", label: "データを編む" },
    { no: "03", label: "分析する" },
    { no: "04", label: "可視化する" },
    { no: "05", label: "現場に還す" },
  ];

  const papers = [
    {
      title: "Understanding Collaborative CT and MRI Utilization Through Network Analysis",
      jour: "JMIR Formative Research, 2026",
      tag: "Network Analysis",
    },
    {
      title: "Impact of the COVID-19 pandemic on continuity of medical treatment for patients with chronic diseases in Japan",
      jour: "BMC Health Services Research, 2025",
      tag: "Health Services",
    },
    {
      title: "Forecasting the regional distribution and sufficiency of physicians in Japan",
      jour: "Human Resources for Health, 2017",
      tag: "System Dynamics",
    },
  ];

  const courses = [
    { uni: "旭川医科大学 医学部", items: ["医療情報学", "臨床疫学", "保健統計", "衛生・公衆衛生学", "基礎医学特論"] },
    { uni: "北海道大学 大学院", items: ["医療マネジメント特講"] },
    { uni: "小樽商科大学 大学院", items: ["地域ヘルスケアマネジメント"] },
    { uni: "一橋大学 / 成城大学 / 文京学院大学", items: ["医療産業論", "データ解析入門Ⅰ・Ⅱ", "医療と経済・社会"] },
  ];

  const tools = [
    {
      name: "地域医療連携 可視化アプリケーション",
      body: "リアルワールドデータを基にした政策意思決定支援。患者の流れと連携構造をインタラクティブに描く。",
    },
    {
      name: "画像診断機器 配置・利用の可視化基盤",
      body: "行政ビッグデータ分析基盤を用い、CT・MRIの地域差と共同利用の実態を地図とグラフで示す。",
    },
    {
      name: "RStudio による線量・統計分析",
      body: "再現可能な分析パイプライン。記述統計から時系列・空間分析、機械学習（SHAPによる寄与度評価）まで。",
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#eeece3] text-[#15223b] antialiased selection:bg-[#9c2f24] selection:text-[#eeece3]"
      style={{
        ["--mincho"]: "'Shippori Mincho', serif",
        ["--sans"]: "'Inter', 'Noto Sans JP', sans-serif",
        fontFamily: "var(--mincho)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600&family=Noto+Sans+JP:wght@400;500&family=Inter:wght@400;500&display=swap');
        html { scroll-behavior: smooth; }
        @keyframes pulse { 0%,100%{ opacity:.25; } 50%{ opacity:.75; } }
        @keyframes draw { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce){ *{ animation:none !important; } }
      `}</style>

      {/* ── ヘッダー ── */}
      <header className="fixed top-0 inset-x-0 z-40">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <a href="#hero" className="leading-tight">
            <span className="block text-lg tracking-wide">石川 智基</span>
            <span className="block text-[10px] tracking-[0.32em] text-[#7d3b30]" style={{ fontFamily: "var(--sans)" }}>
              TOMOKI ISHIKAWA
            </span>
          </a>
          <nav className="hidden md:flex gap-7 text-[11px] tracking-[0.24em]" style={{ fontFamily: "var(--sans)" }}>
            <a href="#about" className="hover:text-[#9c2f24]">ABOUT</a>
            <a href="#research" className="hover:text-[#9c2f24]">RESEARCH</a>
            <a href="#teaching" className="hover:text-[#9c2f24]">TEACHING</a>
            <a href="#tools" className="hover:text-[#9c2f24]">TOOLS</a>
            <a href="#contact" className="hover:text-[#9c2f24]">CONTACT</a>
          </nav>
        </div>
      </header>

      {/* ── ヒーロー ── */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-10">
        <HeroBackdrop />
        <div className="relative max-w-6xl mx-auto w-full">
          <Reveal>
            <p className="mb-8 text-xs tracking-[0.4em] text-[#7d3b30]" style={{ fontFamily: "var(--sans)" }}>
              MEDICAL INFORMATICS ・ HEALTH POLICY ・ HEALTH ECONOMICS
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="text-3xl md:text-6xl font-medium leading-[1.5] md:leading-[1.4]">
              データで医療を読み解き、<br />
              地域の未来を<br />
              かたちにする。
            </h1>
          </Reveal>
          <Reveal delay={350}>
            <p className="mt-10 text-stone-600 leading-loose text-sm md:text-base" style={{ fontFamily: "var(--sans)" }}>
              大規模レセプト・電子カルテデータの分析を通じて、<br />
              医療提供体制と政策の根拠をかたちにします。
            </p>
          </Reveal>
          <Reveal delay={500}>
            <a
              href="#about"
              className="inline-block mt-12 border-b border-[#15223b] pb-1 text-sm tracking-[0.2em] hover:border-[#9c2f24] hover:text-[#9c2f24] transition"
              style={{ fontFamily: "var(--sans)" }}
            >
              プロフィール →
            </a>
          </Reveal>
        </div>
        <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] text-stone-400" style={{ fontFamily: "var(--sans)" }}>
          SCROLL
        </span>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative px-6 md:px-10 py-28 md:py-40 overflow-hidden">
        <Splash className="absolute -left-20 top-24 w-[28rem] h-[28rem] hidden md:block" color="#2f5a7a" opacity={0.09} />
        <Rings className="absolute -right-16 top-10 w-72 h-72 hidden md:block" />
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-[1fr_1.3fr] gap-12 md:gap-20">
          <div>
            <Reveal><Eyebrow>ABOUT</Eyebrow></Reveal>
            <Reveal delay={100}>
              <h2 className="text-2xl md:text-4xl font-medium mt-4">自己紹介</h2>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-10 space-y-1 text-sm leading-relaxed text-stone-600" style={{ fontFamily: "var(--sans)" }}>
                <p>旭川医科大学 社会医学講座 講師</p>
                <p>北海道大学 大学院保健科学研究院 客員准教授</p>
                <p>東京大学 大学院医学系研究科 客員研究員</p>
                <p>自治医科大学 データサイエンスセンター 客員研究員</p>
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal delay={150}>
              <p className="text-lg md:text-xl leading-loose">
                医療情報学・医療経済を軸に、レセプトや電子カルテといった大規模な実医療データを分析し、医療の需給や連携、政策の効果を実証的に明らかにしてきました。経営学（MBA）・保健科学（博士）・公衆衛生学（MPH）の視座を重ね、データと現場をつなぐ研究を続けています。
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-12 border-t border-[#15223b]/15 pt-8" style={{ fontFamily: "var(--sans)" }}>
                <p className="text-[11px] tracking-[0.3em] text-[#7d3b30] mb-4">DEGREES</p>
                <div className="space-y-2 text-sm text-stone-600">
                  <p>経営管理修士（専門職）／ 小樽商科大学・2014</p>
                  <p>博士（保健科学）／ 北海道大学・2020</p>
                  <p>公衆衛生学修士／ 東京大学・2023</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="mt-8 flex flex-wrap gap-3" style={{ fontFamily: "var(--sans)" }}>
                {keywords.map((k) => (
                  <span key={k} className="text-xs border border-[#15223b]/25 rounded-full px-4 py-1.5 text-stone-600">
                    {k}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 専門領域（ダーク） ── */}
      <section className="relative px-6 md:px-10 py-28 md:py-40 bg-[#15223b] text-[#eeece3] overflow-hidden">
        <Mesh light className="absolute right-6 top-10 w-64 h-44 hidden md:block" />
        <div className="relative max-w-6xl mx-auto">
          <Reveal><Eyebrow light>EXPERTISE</Eyebrow></Reveal>
          <Reveal delay={100}>
            <h2 className="text-2xl md:text-4xl font-medium mt-4 mb-4">専門領域</h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-stone-400 leading-loose mb-14 text-sm md:text-base" style={{ fontFamily: "var(--sans)" }}>
              複雑な医療の課題を、<br />データの力で本質から解きほぐします。
            </p>
          </Reveal>
          <div className="divide-y divide-white/15 border-y border-white/15">
            {domains.map((d, i) => (
              <Reveal key={d.ja} delay={i * 90}>
                <div className="group py-7 md:py-8 flex items-baseline gap-6 hover:pl-3 transition-all">
                  <span className="text-xs text-stone-500" style={{ fontFamily: "var(--sans)" }}>0{i + 1}</span>
                  <span className="text-xl md:text-3xl font-medium group-hover:text-[#d98a7e] transition">{d.ja}</span>
                  <span className="ml-auto text-[11px] tracking-[0.25em] text-stone-500 hidden md:block" style={{ fontFamily: "var(--sans)" }}>
                    {d.en}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH 主要な研究テーマ ── */}
      <section id="research" className="relative px-6 md:px-10 py-28 md:py-40 overflow-hidden">
        <Mesh className="absolute -left-10 bottom-10 w-72 h-48 hidden md:block" />
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <Reveal><Eyebrow>RESEARCH</Eyebrow></Reveal>
              <Reveal delay={100}><h2 className="text-2xl md:text-4xl font-medium mt-4">主要な研究テーマ</h2></Reveal>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-[#15223b]/15 mb-24">
            {themes.map((t, i) => (
              <Reveal key={t.title} delay={i * 120} className="bg-[#eeece3]">
                <div className="group p-8 md:p-9 h-full hover:bg-white transition-colors">
                  <span className="text-xs text-[#7d3b30]" style={{ fontFamily: "var(--sans)" }}>0{i + 1}</span>
                  <h3 className="text-lg md:text-xl mt-5 mb-4 leading-relaxed">{t.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed mb-6" style={{ fontFamily: "var(--sans)" }}>{t.body}</p>
                  <div className="flex flex-wrap gap-2 text-[11px] text-stone-400" style={{ fontFamily: "var(--sans)" }}>
                    {t.tags.map((x) => <span key={x}>#{x}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 代表的な論文 */}
          <Reveal><Eyebrow>SELECTED PUBLICATIONS</Eyebrow></Reveal>
          <Reveal delay={100}>
            <div className="flex items-end justify-between mt-4 mb-10">
              <h3 className="text-xl md:text-3xl font-medium">代表的な論文</h3>
              <a href="https://orcid.org/0000-0001-8725-6508" target="_blank" rel="noreferrer"
                 className="text-[11px] tracking-[0.25em] border-b border-[#15223b] pb-0.5 hover:text-[#9c2f24] hover:border-[#9c2f24]" style={{ fontFamily: "var(--sans)" }}>
                VIEW ALL
              </a>
            </div>
          </Reveal>
          <div className="divide-y divide-[#15223b]/15 border-t border-[#15223b]/15">
            {papers.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <a href="https://orcid.org/0000-0001-8725-6508" target="_blank" rel="noreferrer"
                   className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 py-6 hover:pl-2 transition-all">
                  <span className="text-[11px] tracking-[0.25em] text-[#7d3b30] md:w-40 shrink-0" style={{ fontFamily: "var(--sans)" }}>{p.tag}</span>
                  <span className="leading-relaxed group-hover:text-[#9c2f24] transition" style={{ fontFamily: "var(--sans)" }}>
                    {p.title}
                    <span className="block text-xs text-stone-400 mt-1">{p.jour}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          {/* 受賞・著書 */}
          <div className="grid md:grid-cols-2 gap-12 mt-20" style={{ fontFamily: "var(--sans)" }}>
            <Reveal>
              <p className="text-[11px] tracking-[0.3em] text-[#7d3b30] mb-4">AWARDS</p>
              <div className="space-y-2 text-sm text-stone-600">
                <p>若手研究奨励賞 ／ 日本医療情報学会北海道支部・2026</p>
                <p>優秀CyPos賞 ／ JRC2020</p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-[11px] tracking-[0.3em] text-[#7d3b30] mb-4">BOOKS</p>
              <div className="space-y-2 text-sm text-stone-600">
                <p>革新的AI創薬（共著）／ エヌ・ティー・エス・2022</p>
                <p>医療経営士 中級テキスト 第5巻（分担執筆）／ 日本医療企画・2021</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── APPROACH 研究のアプローチ ── */}
      <section className="relative px-6 md:px-10 py-28 md:py-40 bg-[#e7e4d9] overflow-hidden">
        <Splash className="absolute -right-24 bottom-0 w-[30rem] h-[30rem] hidden md:block" color="#9c2f24" opacity={0.07} />
        <Rings className="absolute left-1/2 -top-20 w-80 h-80 opacity-70 hidden md:block" />
        <div className="relative max-w-6xl mx-auto">
          <Reveal><Eyebrow>APPROACH</Eyebrow></Reveal>
          <Reveal delay={100}><h2 className="text-2xl md:text-4xl font-medium mt-4 mb-16">研究のアプローチ</h2></Reveal>
          <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-4">
            {steps.map((s, i) => (
              <Reveal key={s.no} delay={i * 110} className="flex-1">
                <span className="text-xs text-[#7d3b30]" style={{ fontFamily: "var(--sans)" }}>{s.no}</span>
                <p className="text-lg md:text-xl mt-3 font-medium">{s.label}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="text-xl md:text-3xl font-medium leading-relaxed mt-20">
              データの複雑さを解きほぐし、<br />小さな問いから<br />医療と社会のしくみへ。
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── TEACHING 講義 ── */}
      <section id="teaching" className="relative px-6 md:px-10 py-28 md:py-40 overflow-hidden">
        <Mesh className="absolute right-0 top-16 w-64 h-44 hidden md:block" />
        <div className="relative max-w-6xl mx-auto">
          <Reveal><Eyebrow>TEACHING</Eyebrow></Reveal>
          <Reveal delay={100}><h2 className="text-2xl md:text-4xl font-medium mt-4 mb-16">講義</h2></Reveal>
          <div className="grid md:grid-cols-2 gap-px bg-[#15223b]/15">
            {courses.map((c, i) => (
              <Reveal key={c.uni} delay={i * 100} className="bg-[#eeece3]">
                <div className="p-8 md:p-9 h-full">
                  <p className="text-[11px] tracking-[0.2em] text-[#7d3b30] mb-5" style={{ fontFamily: "var(--sans)" }}>{c.uni}</p>
                  <div className="flex flex-wrap gap-2" style={{ fontFamily: "var(--sans)" }}>
                    {c.items.map((it) => (
                      <span key={it} className="text-sm border border-[#15223b]/20 rounded-full px-3.5 py-1 text-stone-600">{it}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOOLS BIツール ── */}
      <section id="tools" className="relative px-6 md:px-10 py-28 md:py-40 bg-[#15223b] text-[#eeece3] overflow-hidden">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g stroke="#cfd6e2" strokeWidth="0.5" opacity="0.12">
            {Array.from({ length: 9 }).map((_, i) => <line key={i} x1={i*100} y1="0" x2={i*100} y2="400" />)}
            {Array.from({ length: 5 }).map((_, i) => <line key={"h"+i} x1="0" y1={i*100} x2="800" y2={i*100} />)}
          </g>
        </svg>
        <div className="relative max-w-6xl mx-auto">
          <Reveal><Eyebrow light>BI ・ VISUALIZATION</Eyebrow></Reveal>
          <Reveal delay={100}><h2 className="text-2xl md:text-4xl font-medium mt-4 mb-4">BIツール</h2></Reveal>
          <Reveal delay={150}>
            <p className="text-stone-400 leading-loose mb-16 text-sm md:text-base" style={{ fontFamily: "var(--sans)" }}>
              分析を、見て・触れて・判断できる道具へ。<br />意思決定の現場で使える可視化を設計・開発しています。
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-white/15">
            {tools.map((t, i) => (
              <Reveal key={t.name} delay={i * 120} className="bg-[#15223b]">
                <div className="group p-8 md:p-9 h-full hover:bg-[#1c2c4c] transition-colors">
                  <span className="text-xs text-[#d98a7e]" style={{ fontFamily: "var(--sans)" }}>0{i + 1}</span>
                  <h3 className="text-lg md:text-xl mt-5 mb-4 leading-relaxed">{t.name}</h3>
                  <p className="text-sm text-stone-400 leading-relaxed" style={{ fontFamily: "var(--sans)" }}>{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative px-6 md:px-10 py-32 md:py-48 bg-[#e7e4d9] overflow-hidden">
        <Splash className="absolute left-4 top-8 w-80 h-80 hidden md:block" color="#2f5a7a" opacity={0.08} />
        <Splash className="absolute right-4 bottom-4 w-80 h-80 hidden md:block" color="#9c2f24" opacity={0.07} />
        <div className="relative max-w-6xl mx-auto text-center">
          <Reveal>
            <p className="text-2xl md:text-4xl font-medium leading-relaxed mb-12">
              データから、<br className="md:hidden" />医療の未来を共に。
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="flex flex-wrap justify-center gap-4" style={{ fontFamily: "var(--sans)" }}>
              <a href="https://orcid.org/0000-0001-8725-6508" target="_blank" rel="noreferrer"
                 className="border border-[#15223b] px-8 py-3.5 text-sm tracking-[0.2em] hover:bg-[#15223b] hover:text-[#eeece3] transition">
                ORCID
              </a>
              <a href="https://researchmap.jp/" target="_blank" rel="noreferrer"
                 className="border border-[#15223b] px-8 py-3.5 text-sm tracking-[0.2em] hover:bg-[#15223b] hover:text-[#eeece3] transition">
                researchmap
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── フッター ── */}
      <footer className="px-6 md:px-10 py-12 bg-[#15223b] text-stone-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-3 text-xs" style={{ fontFamily: "var(--sans)" }}>
          <span className="text-[#eeece3] tracking-[0.2em]">石川 智基  — TOMOKI ISHIKAWA</span>
          <span>© Tomoki Ishikawa — Medical Informatics &amp; Health Policy</span>
        </div>
      </footer>
    </div>
  );
}
