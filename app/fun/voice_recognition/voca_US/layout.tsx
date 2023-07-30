export const metadata = {
  title: "4U 의 영어 단어(미국) 공부하기 페이지입니다.",
  description:
    "미국식 영어 단어를 말하며 공부 해 보세요",
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
