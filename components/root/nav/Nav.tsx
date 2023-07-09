"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SubLinks from "./SubLinks";
export const subMapKeySelector = {
  education: "education",
  academy: "academy",
  fun: "fun",
  post: "post",
};
function Nav() {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [subMapKey, setSubMapKey] = useState("");
  return (
    <div
      className="relative"
      onMouseOver={() => setIsMouseOver(true)}
      onMouseOut={() => setIsMouseOver(false)}
    >
      <nav className="gap-3 sm:gap-5 md:gap-10 lg:gap-10 xl:gap-10 2xl:gap-10 inline-flex justify-center sm:justify-center md:justify-right mt-5 sm:mt-5 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0  items-start text-left font-medium">
        <div className="relative">
          <Link
            href={"/"}
            className="m-0 text-xs whitespace-nowrap sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg"
            onMouseOver={() => setSubMapKey(subMapKeySelector.education)}
          >
            과외
          </Link>
          {isMouseOver && subMapKey === subMapKeySelector.education && (
            <SubLinks subMapKey={subMapKeySelector.education} />
          )}
        </div>
        <div className="relative">
          <Link
            href={"/intro/wawa"}
            className="m-0 text-xs whitespace-nowrap sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg"
            onMouseOver={() => setSubMapKey(subMapKeySelector.academy)}
          >
            학원
          </Link>
          {isMouseOver && subMapKey === subMapKeySelector.academy && (
            <SubLinks subMapKey={subMapKeySelector.academy} />
          )}
        </div>
        <div className="relative">
          <Link
            href={"/post/"}
            className="m-0 text-xs whitespace-nowrap sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg"
            onMouseOver={() => setSubMapKey(subMapKeySelector.post)}
          >
            POST
          </Link>
          {isMouseOver && subMapKey === subMapKeySelector.post && (
            <SubLinks subMapKey={subMapKeySelector.post} />
          )}
        </div>
        <div className="relative">
          <Link
            href={"/fun/food_roulette"}
            className="m-0 text-xs whitespace-nowrap sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg"
            onMouseOver={() => setSubMapKey(subMapKeySelector.fun)}
          >
            점심추천
          </Link>
          {isMouseOver && subMapKey === subMapKeySelector.fun && (
            <SubLinks subMapKey={subMapKeySelector.fun} />
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nav;
