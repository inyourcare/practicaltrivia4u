"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SubLinks from "./SubLinks";
import { linkMap, rootLinks } from "./links";

function Nav() {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [subMapKey, setSubMapKey] = useState("");
  const navLinkClassName = `m-0 text-xs whitespace-nowrap sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg cursor-pointer`;
  return (
    <div
      className="relative"
      onMouseOver={() => setIsMouseOver(true)}
      onMouseOut={() => setIsMouseOver(false)}
    >
      <nav className="gap-3 sm:gap-5 md:gap-10 lg:gap-10 l:gap-10 2xl:gap-10 inline-flex justify-center sm:justify-center md:justify-right mt-5 sm:mt-5 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0  items-start text-left font-medium">
        {Object.values(rootLinks).map((val) => (
          <div className="relative" key={val}>
            <div
              onMouseOver={() => setSubMapKey(val)}
              className="min-h-[40px]"
            >
              <div
                // href={linkMap.get(rootLinks.partners)?.href as string}
                className={navLinkClassName}
              >
                {linkMap.get(val)?.tagName as string}
              </div>
            </div>
            <SubLinks
              subMapKey={val}
              isOpen={isMouseOver && subMapKey === val}
            />
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Nav;
