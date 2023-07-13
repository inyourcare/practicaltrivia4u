import Header from "@/components/root/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "4U(사소하지만 유용한) Posting 입니다.",
  description: "각종 유용한 정보를 다룹니다.",
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
    </section>
  );
}
