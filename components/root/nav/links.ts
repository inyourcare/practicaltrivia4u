export const rootLinks = {
  // education: "education",
  // academy: "academy",
  edu4u: "edu4u",
  partners: "partners",
  fun: "fun",
  post: "post",
};

type LinkProps = {
  href: string;
  tagName: string;
};
export const linkMap = new Map<string, LinkProps>();
linkMap.set(rootLinks.edu4u, { href: "/edu4u", tagName: "과외4U" });
linkMap.set(rootLinks.partners, {
  href: "/intro/sangsang",
  tagName: "파트너스",
});
linkMap.set(rootLinks.post, { href: "/post", tagName: "POST" });
linkMap.set(rootLinks.fun, {
  href: "/fun/food_roulette",
  tagName: "점심추천",
});
export const subMap = new Map<string, Array<LinkProps>>();
subMap.set(rootLinks.edu4u, [{ href: "/edu4u", tagName: "과외4U" }]);
subMap.set(rootLinks.partners, [
  { href: "/intro/sangsang", tagName: "상상코칭" },
  { href: "/intro/howcoding", tagName: "하우코딩" },
  { href: "/intro/goodo", tagName: "공부구도" },
  { href: "/intro/wawa", tagName: "와와" },
]);
subMap.set(rootLinks.post, [{ href: "/post", tagName: "POST" }]);
subMap.set(rootLinks.fun, [
  { href: "/fun/food_roulette", tagName: "점심추천" },
]);
