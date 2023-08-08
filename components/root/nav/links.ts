export const rootLinks = {
  // education: "education",
  // academy: "academy",
  // edu4u: "edu4u",
  home: "home",
  partners: "partners",
  fun: "fun",
  post: "post",
  ask: "ask",
};

type LinkProps = {
  href: string;
  tagName: string;
};
export const linkMap = new Map<string, LinkProps>();
// linkMap.set(rootLinks.edu4u, { href: "/edu4u", tagName: "과외4U" });
linkMap.set(rootLinks.home, { href: "/", tagName: "HOME" });
linkMap.set(rootLinks.partners, {
  href: "/partners/sangsang",
  tagName: "파트너스",
});
linkMap.set(rootLinks.post, { href: "/post/list/0", tagName: "POST" });
linkMap.set(rootLinks.fun, {
  href: "/fun/food_roulette",
  tagName: "사유공간",
});
linkMap.set(rootLinks.ask, {
  href: "/ask",
  tagName: "문의하기",
});
export const subMap = new Map<string, Array<LinkProps>>();
// subMap.set(rootLinks.edu4u, [{ href: "/edu4u", tagName: "과외4U" }]);
subMap.set(rootLinks.home, [{ href: "/", tagName: "HOME" }]);
subMap.set(rootLinks.partners, [
  { href: "/partners/sangsang", tagName: "상상코칭" },
  { href: "/partners/howcoding", tagName: "하우코딩" },
  { href: "/partners/goodo", tagName: "공부구도" },
  { href: "/partners/wawa", tagName: "와와" },
  { href: "/partners/mindfulness", tagName: "마음키움" },
  { href: "/partners/power", tagName: "파워잉글리쉬" },
]);
subMap.set(rootLinks.post, [{ href: "/post/list/0", tagName: "POST" }]);
subMap.set(rootLinks.fun, [
  { href: "/fun/food_roulette", tagName: "점심추천" },
  { href: "/fun/voice_recognition", tagName: "영어공부" },
]);
subMap.set(rootLinks.ask, [
  { href: "/ask", tagName: "상담신청(과외)" },
  { href: "/ask/booking", tagName: "상담예약(학원)" },
]);
