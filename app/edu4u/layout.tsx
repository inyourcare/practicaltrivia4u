import Edu4UFooter from "@/components/edu4u/Footer";
import Header from "@/components/root/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "과외4U",
  description:
    "4U쌤과 함께 수학 과외, 영어 과외, 국어 과외 등 과외 구하기. 학생, 학부모, 선생님을 생각하는 과외.",
};

export default function Edu4ULayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <header className="w-full flex flex-col py-5 bg-[rgba(35,46,82,0)]">
        <Header />
      </header>
      {children}

      <Edu4UFooter />
    </section>
  );
}
