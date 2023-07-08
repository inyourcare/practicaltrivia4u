import Link from "next/link";
import { subMapKeySelector } from "./Nav";

type SubLink = {
  href: string;
  tagName: string;
};
function SubLinks({ subMapKey }: { subMapKey: string }) {
  const subMap = new Map<string, Array<SubLink>>();
  subMap.set(subMapKeySelector.education, [
    { href: "/intro/sangsang", tagName: "상상코칭" },
    { href: "/intro/howcoding", tagName: "하우코딩" },
    { href: "/intro/goodo", tagName: "공부구도" },
  ]);
  subMap.set(subMapKeySelector.fun, [
    { href: "/fun/food_roulette", tagName: "점심추천" },
  ]);
  return (
    <nav className={`absolute min-w-[500px] grid grid-cols-8 gap-x-8`}>
      {subMap.get(subMapKey)?.map((sublink) => (
        <Link
          key={sublink.tagName}
          href={sublink.href}
          className="m-0 text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base whitespace-nowrap"
        >
          {sublink.tagName}
        </Link>
      ))}
    </nav>
  );
}

export default SubLinks;
