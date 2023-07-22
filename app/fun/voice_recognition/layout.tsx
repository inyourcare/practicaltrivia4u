export const metadata = {
  title: "4U 의 영어 스스로 공부하기 페이지입니다.",
  description:
    "20년 영어 독학의 노하우를 담았습니다. :D 경험 해 보세요",
  keywords:
    "영어,영어독학,혼자영어,스피킹,스피킹준비",
};

export default function FoodRouletteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
    </section>
  );
}
