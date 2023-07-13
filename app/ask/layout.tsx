import Footer from "@/components/root/Footer";
import Header from "@/components/root/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "4U 문의 페이지입니다.",
  description: "각종 문의 환영합니다. :D",
};

export default function AskLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <header className="w-full flex flex-col py-5 bg-[rgba(35,46,82,0)]">
        <Header />
      </header>
      {children}
      <Footer />
    </section>
  );
}
