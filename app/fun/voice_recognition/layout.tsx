export const metadata = {
  title: "4U 의 영어 스스로 공부하기 페이지입니다.",
  description:
    "영어 읽기, 스피킹, 혼자 공부하기, 독학을 돕기 위해 만들었습니다.",
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
