import "./globals.css";
import type { Metadata } from "next";
import { Nanum_Gothic } from "next/font/google";
const nanumGothic = Nanum_Gothic({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "과외4U",
  description: "4U쌤과 함께 수학 과외, 영어 과외, 국어 과외 등 과외 구하기. 학생, 학부모, 선생님을 생각하는 과외.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={nanumGothic.className}>{children}</body>
    </html>
  );
}
