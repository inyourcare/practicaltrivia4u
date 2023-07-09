"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SubLinks from "./SubLinks";
export const subMapKeySelector = {
  education: "education",
  academy: "academy",
  fun: "fun",
};
function Nav() {
  // const navLinks = useRef<HTMLAnchorElement[]>([]);
  // const navContainer = useRef<HTMLDivElement>(null);
  // const [subVisibility, setSubVisibility] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [subMapKey, setSubMapKey] = useState("");
  // useEffect(() => {
  // navContainer.current?.addEventListener("mouseover", () =>
  //   setIsMouseOver(true)
  // );
  // navContainer.current?.addEventListener("mouseout", () =>
  //   setIsMouseOver(false)
  // );
  // navLinks.current.map((ref, i) => {
  //   ref.addEventListener("mouseover", (e) => {
  //     if (i === 0) setSubMapKey(subMapKeySelector.education);
  //     else if (i === 1) setSubMapKey(subMapKeySelector.academy);
  //     else if (i === 2) setSubMapKey(subMapKeySelector.fun);
  //     else setSubMapKey("");
  //   });
  //   // ref.addEventListener("mouseout", (e) => {});
  //   // ref.addEventListener("click", (e) => {
  //   //   setSubVisibility(!subVisibility);
  //   // });
  // });
  // }, []);
  return (
    // <div className="relative" ref={navContainer}>
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
            // ref={(elem) => {
            //   navLinks.current[0] = elem as HTMLAnchorElement;
            // }}
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
            // ref={(elem) => {
            //   navLinks.current[1] = elem as HTMLAnchorElement;
            // }}
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
            href={"/fun/food_roulette"}
            className="m-0 text-xs whitespace-nowrap sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg"
            // ref={(elem) => {
            //   navLinks.current[2] = elem as HTMLAnchorElement;
            // }}
            onMouseOver={() => setSubMapKey(subMapKeySelector.fun)}
          >
            점심추천
          </Link>
          {isMouseOver && subMapKey === subMapKeySelector.fun && (
            <SubLinks subMapKey={subMapKeySelector.fun} />
          )}
        </div>
      </nav>
      {/* {(subVisibility || isMouseOver) && <SubLinks subMapKey={subMapKey} />} */}
      {/* {(isMouseOver) && <SubLinks subMapKey={subMapKey} />} */}
      {/* {<SubLinks subMapKey={subMapKeySelector.fun} />} */}
    </div>
  );
}

export default Nav;
