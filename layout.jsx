import "./globals.css";

export const metadata = {
  title: "石川 智基 | 医療情報学・医療政策・医療経済",
  description:
    "旭川医科大学 社会医学講座 講師。大規模レセプト・電子カルテデータの分析を通じて、医療提供体制と政策の根拠をかたちにします。",
  openGraph: {
    title: "石川 智基 | 医療情報学・医療政策・医療経済",
    description:
      "大規模レセプト・電子カルテデータの分析を通じて、医療提供体制と政策の根拠をかたちにします。",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
