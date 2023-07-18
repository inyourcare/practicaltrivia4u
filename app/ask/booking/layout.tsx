import Header from "@/components/root/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "4U 상담 예약 페이지입니다.",
  description: "예약정보 등록하시고 빠른 상담 받아보세요! :D",
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {children}
    </section>
  );
}
