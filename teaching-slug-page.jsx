import Link from "next/link";

// ─────────────────────────────────────────────
//  講義科目の詳細ページ（資料置き場）
//  各科目の説明と資料は下の COURSES を編集してください。
//  materials の href は外部URL（https://…）でも、
//  リポジトリの public フォルダに置いたPDF（例 "/slides/xxx.pdf"）でも可。
// ─────────────────────────────────────────────

const COURSES = {
  "public-health": {
    name: "衛生・公衆衛生学",
    field: "公衆衛生・疫学",
    summary:
      "集団の健康を守るための基礎的な考え方、健康の社会的な決定要因、保健医療制度の枠組みを概説します。",
    materials: [
      { label: "講義スライド（準備中）", href: "#" },
      { label: "参考資料（準備中）", href: "#" },
    ],
  },
  "clinical-epidemiology": {
    name: "臨床疫学",
    field: "公衆衛生・疫学",
    summary:
      "研究デザイン、バイアスと交絡、因果推論の考え方を、実データの例とともに学びます。",
    materials: [{ label: "講義スライド（準備中）", href: "#" }],
  },
  "health-statistics": {
    name: "保健統計",
    field: "公衆衛生・疫学",
    summary: "記述統計から推測統計、回帰分析まで、保健医療データを読み解く統計手法を扱います。",
    materials: [{ label: "講義スライド（準備中）", href: "#" }],
  },
  "health-policy": {
    name: "医療政策学",
    field: "公衆衛生・疫学",
    summary: "医療提供体制と政策形成の過程を、エビデンスにもとづく政策評価の視点から検討します。",
    materials: [{ label: "講義スライド（準備中）", href: "#" }],
  },
  "medical-informatics": {
    name: "医療情報学",
    field: "データサイエンス",
    summary: "レセプトや電子カルテなどの医療データの構造と、その分析・利活用の方法を学びます。",
    materials: [{ label: "講義スライド（準備中）", href: "#" }],
  },
  "data-analysis": {
    name: "データ解析入門Ⅰ・Ⅱ",
    field: "データサイエンス",
    summary: "Rを用いたデータの前処理・可視化・統計解析の基礎を、手を動かしながら習得します。",
    materials: [{ label: "講義スライド（準備中）", href: "#" }],
  },
  "basic-medicine": {
    name: "基礎医学特論",
    field: "データサイエンス",
    summary: "医療データを扱ううえで必要な基礎的な素養を、領域横断的に概観します。",
    materials: [{ label: "講義スライド（準備中）", href: "#" }],
  },
  "healthcare-management": {
    name: "医療マネジメント特講",
    field: "医療経営",
    summary: "医療機関の経営とマネジメントを、外部環境の分析などの観点から検討します。",
    materials: [{ label: "講義スライド（準備中）", href: "#" }],
  },
  "regional-healthcare": {
    name: "地域ヘルスケアマネジメント",
    field: "医療経営",
    summary: "地域包括ケアと医療・介護の連携を、データにもとづく視点から考えます。",
    materials: [{ label: "講義スライド（準備中）", href: "#" }],
  },
  "hospital-management": {
    name: "病院経営ケーススタディ",
    field: "医療経営",
    summary: "実際の病院経営の事例を題材に、課題の分析と意思決定の進め方を演習形式で学びます。",
    materials: [{ label: "講義スライド（準備中）", href: "#" }],
  },
  "health-economics": {
    name: "医療経済学",
    field: "経済",
    summary: "医療の需要と供給、費用対効果分析など、医療経済学の基礎的な考え方を扱います。",
    materials: [{ label: "講義スライド（準備中）", href: "#" }],
  },
  "health-industry": {
    name: "医療産業論",
    field: "経済",
    summary: "医療を産業として捉え、その構造や制度、動向を考えます。",
    materials: [{ label: "講義スライド（準備中）", href: "#" }],
  },
  "economy-society": {
    name: "医療と経済・社会",
    field: "経済",
    summary: "医療を経済・社会との関わりのなかで位置づけ、制度と持続可能性を考えます。",
    materials: [{ label: "講義スライド（準備中）", href: "#" }],
  },
};

export function generateStaticParams() {
  return Object.keys(COURSES).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const c = COURSES[params.slug];
  return { title: c ? `${c.name} | 石川 智基` : "講義 | 石川 智基" };
}

export default function CoursePage({ params }) {
  const course = COURSES[params.slug];

  return (
    <div
      className="min-h-screen bg-white text-[#1f3a5f] antialiased"
      style={{ ["--sans"]: "'Noto Sans JP', sans-serif", fontFamily: "var(--sans)" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap');`}</style>

      <div className="max-w-2xl mx-auto px-6 md:px-8 py-20 md:py-28">
        <Link href="/#teaching" className="text-xs tracking-[0.2em] text-[#0f766e] hover:opacity-70">
          ← 講義一覧へ戻る
        </Link>

        {course ? (
          <>
            <p className="mt-12 text-[11px] tracking-[0.3em] text-[#8a94a6]">{course.field}</p>
            <h1 className="text-3xl md:text-4xl font-light mt-4 leading-tight">{course.name}</h1>
            <p className="mt-8 text-base leading-loose text-[#4b5563]">{course.summary}</p>

            <div className="mt-14">
              <p className="text-[11px] tracking-[0.3em] text-[#8a94a6] mb-4">MATERIALS ・ 資料</p>
              <ul className="border border-black/10 rounded-lg divide-y divide-black/5">
                {course.materials.map((m, i) => (
                  <li key={i}>
                    <a
                      href={m.href}
                      className="group flex items-center justify-between px-5 py-4 text-sm text-[#4b5563] hover:text-[#0f766e] transition"
                    >
                      <span>{m.label}</span>
                      <span className="text-[#8a94a6] group-hover:text-[#0f766e]">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="mt-16">
            <h1 className="text-2xl font-light">科目が見つかりませんでした</h1>
            <p className="mt-4 text-[#6b7280]">URLをご確認ください。</p>
          </div>
        )}
      </div>
    </div>
  );
}
