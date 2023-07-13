import Footer from "@/components/root/Footer";

export const metadata = {
  title: "점심 너로 정했다. 저메추, 점메추 찾으시면 들어오세요!",
  description:
    "선택할 수 있는게 너무 많아서 선택하기가 어려운 현대인들을 위한 룰렛. 점심, 점심 메뉴, 점심 룰렛, 점심 추천, 점심 추천 룰렛",
  keywords:
    "점심 너로 정했다. 점심, 점심 메뉴, 점심 룰렛, 점심 추천, 점심 추천 룰렛",
};

export default function FoodRouletteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
      <Footer />
    </section>
  );
}
