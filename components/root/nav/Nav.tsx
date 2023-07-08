"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SubLinks from "./SubLinks";
export const subMapKeySelector = {
  education: "education",
  fun: "fun"
};
function Nav() {
  const [subVisibility, setSubVisibility] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [subMapKey, setSubMapKey] = useState("education");
  const navLinks = useRef<HTMLAnchorElement[]>([]);
  useEffect(() => {
    navLinks.current.map((ref, i) => {
      ref.addEventListener("mouseover", (e) => {
        setIsMouseOver(true);
        if (i === 0) setSubMapKey(subMapKeySelector.education);
        else if (i === 1) setSubMapKey(subMapKeySelector.education);
        else if (i === 2) setSubMapKey(subMapKeySelector.fun);
        else setSubMapKey("");
      });
      ref.addEventListener("mouseout", (e) => {
        setIsMouseOver(false);
      });
      ref.addEventListener("click", (e) => {
        setSubVisibility(!subVisibility);
      });
    });
  }, [subVisibility]);
  return (
    <div>
      <nav className="gap-3 sm:gap-5 md:gap-10 lg:gap-10 xl:gap-10 2xl:gap-10 inline-flex justify-center sm:justify-center md:justify-right mt-5 sm:mt-5 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0  items-start text-left font-medium">
        <Link
          href={"/"}
          className="m-0 text-xs whitespace-nowrap sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg"
          ref={(elem) => {
            navLinks.current[0] = elem as HTMLAnchorElement;
          }}
        >
          과외
        </Link>
        <Link
          href={"/intro/sangsang"}
          className="m-0 text-xs whitespace-nowrap sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg"
          ref={(elem) => {
            navLinks.current[1] = elem as HTMLAnchorElement;
          }}
        >
          상상코칭
        </Link>
        <Link
          href={"/intro/howcoding"}
          className="m-0 text-xs whitespace-nowrap sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg"
          ref={(elem) => {
            navLinks.current[2] = elem as HTMLAnchorElement;
          }}
        >
          하우코딩
        </Link>
        <Link
          href={"/intro/goodo"}
          className="m-0 text-xs whitespace-nowrap sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg"
          ref={(elem) => {
            navLinks.current[3] = elem as HTMLAnchorElement;
          }}
        >
          공부구도
        </Link>
        <Link
          href={"/intro/wawa"}
          className="m-0 text-xs whitespace-nowrap sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg"
          ref={(elem) => {
            navLinks.current[4] = elem as HTMLAnchorElement;
          }}
        >
          학원
        </Link>
        <Link
          href={"/fun/food_roulette"}
          className="m-0 text-xs whitespace-nowrap sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg"
          ref={(elem) => {
            navLinks.current[5] = elem as HTMLAnchorElement;
          }}
        >
          점심추천
        </Link>
      </nav>
      {(subVisibility || isMouseOver) && <SubLinks subMapKey={subMapKey} />}
    </div>
  );
}

export default Nav;
