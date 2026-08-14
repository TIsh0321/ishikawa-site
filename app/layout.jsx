import "./globals.css";

export const metadata = {
  title: "石川 智基 | 医療情報学・医療政策",
  description:
    "旭川医科大学 社会医学講座。データにもとづいて医療や社会の課題に向き合い、領域を横断した研究と教育に取り組んでいます。",
  openGraph: {
    title: "石川 智基 | 医療情報学・医療政策",
    description:
      "データにもとづく医療の研究と教育。領域を横断した取り組みを紹介します。",
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
