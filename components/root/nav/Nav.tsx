"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SubLinks from "./SubLinks";
import { linkMap, rootLinks } from "./links";

function Nav() {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [subMapKey, setSubMapKey] = useState("");
  const navLinkClassName = `m-0 text-xs whitespace-nowrap sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg`
  return (
    <div
      className="relative"
      onMouseOver={() => setIsMouseOver(true)}
      onMouseOut={() => setIsMouseOver(false)}
    >
      <nav className="gap-3 sm:gap-5 md:gap-10 lg:gap-10 xl:gap-10 2xl:gap-10 inline-flex justify-center sm:justify-center md:justify-right mt-5 sm:mt-5 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0  items-start text-left font-medium">
        <div className="relative">
          <Link
            href={linkMap.get(rootLinks.edu4u)?.href as string}
            className={navLinkClassName}
            onMouseOver={() => setSubMapKey(rootLinks.edu4u)}
          >
            {linkMap.get(rootLinks.edu4u)?.tagName as string}
          </Link>
          <SubLinks
            subMapKey={rootLinks.edu4u}
            isOpen={isMouseOver && subMapKey === rootLinks.edu4u}
          />
        </div>
        <div className="relative">
          <Link
            href={linkMap.get(rootLinks.partners)?.href as string}
            className={navLinkClassName}
            onMouseOver={() => setSubMapKey(rootLinks.partners)}
          >
            {linkMap.get(rootLinks.partners)?.tagName as string}
          </Link>
          <SubLinks
            subMapKey={rootLinks.partners}
            isOpen={isMouseOver && subMapKey === rootLinks.partners}
          />
        </div>
        <div className="relative">
          <Link
            href={linkMap.get(rootLinks.post)?.href as string}
            className={navLinkClassName}
            onMouseOver={() => setSubMapKey(rootLinks.post)}
          >
            {linkMap.get(rootLinks.post)?.tagName as string}
          </Link>
          <SubLinks
            subMapKey={rootLinks.post}
            isOpen={isMouseOver && subMapKey === rootLinks.post}
          />
        </div>
        <div className="relative">
          <Link
            href={linkMap.get(rootLinks.fun)?.href as string}
            className={navLinkClassName}
            onMouseOver={() => setSubMapKey(rootLinks.fun)}
          >
            {linkMap.get(rootLinks.fun)?.tagName as string}
          </Link>
          <SubLinks
            subMapKey={rootLinks.fun}
            isOpen={isMouseOver && subMapKey === rootLinks.fun}
          />
        </div>
      </nav>
    </div>
  );
}

export default Nav;
