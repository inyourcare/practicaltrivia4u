"use client";
import Link from "next/link";
import { linkMap, rootLinks } from "./links";
import SubLinksMobile from "./SubLinksMobile";
import { useState } from "react";

export default function NavMobile({ listOpen }: { listOpen: boolean }) {
  const ulClassName = `bg-white h-[100vh]`;
  const parentLiHeight = `h-[50px] `
  const liClassName = `border-b-2 ml-10 border-gray-200 flex justify-left items-center transition ease-in-out delay-150 origin-top`;
  const [subOpenSet, setSubOpenSet] = useState(new Set());
  return (
    <div
      className={`block absolute w-full md:hidden transition ease-in-out delay-150 origin-left ${
        listOpen ? "scale-x-100" : "scale-x-0"
      } z-50`}
    >
      <ul className={ulClassName}>
        <li className={parentLiHeight + '' + liClassName}>
          <div
            // href={linkMap.get(rootLinks.edu4u)?.href as string}
            className="cursor-pointer"
            onClick={() => {
              (subOpenSet.has(rootLinks.edu4u) &&
                subOpenSet.delete(rootLinks.edu4u)) ||
                subOpenSet.add(rootLinks.edu4u);
              setSubOpenSet(new Set(subOpenSet));
            }}
          >
            {linkMap.get(rootLinks.edu4u)?.tagName as string}
          </div>
        </li>

        <SubLinksMobile
          subMapKey={rootLinks.edu4u}
          isOpen={subOpenSet.has(rootLinks.edu4u)}
          liClassName={liClassName}
        />
        <li className={parentLiHeight + '' + liClassName}>
          <div
            // href={linkMap.get(rootLinks.partners)?.href as string}
            className="cursor-pointer"
            onClick={() => {
              // console.log('before',subOpenSet);
              (subOpenSet.has(rootLinks.partners) &&
                subOpenSet.delete(rootLinks.partners)) ||
                subOpenSet.add(rootLinks.partners);
              // console.log('after',subOpenSet);
              setSubOpenSet(new Set(subOpenSet));
            }}
          >
            {linkMap.get(rootLinks.partners)?.tagName as string}
          </div>
        </li>

        <SubLinksMobile
          subMapKey={rootLinks.partners}
          isOpen={subOpenSet.has(rootLinks.partners)}
          liClassName={liClassName}
        />
        <li className={parentLiHeight + '' + liClassName}>
          <div
            // href={linkMap.get(rootLinks.post)?.href as string}
            className="cursor-pointer"
            onClick={() => {
              (subOpenSet.has(rootLinks.post) &&
                subOpenSet.delete(rootLinks.post)) ||
                subOpenSet.add(rootLinks.post);
              setSubOpenSet(new Set(subOpenSet));
            }}
          >
            {linkMap.get(rootLinks.post)?.tagName as string}
          </div>
        </li>

        <SubLinksMobile
          subMapKey={rootLinks.post}
          isOpen={subOpenSet.has(rootLinks.post)}
          liClassName={liClassName}
        />
        <li className={parentLiHeight + '' + liClassName}>
          <div
            // href={linkMap.get(rootLinks.fun)?.href as string}
            className="cursor-pointer"
            onClick={() => {
              (subOpenSet.has(rootLinks.fun) &&
                subOpenSet.delete(rootLinks.fun)) ||
                subOpenSet.add(rootLinks.fun);
              setSubOpenSet(new Set(subOpenSet));
            }}
          >
            {linkMap.get(rootLinks.fun)?.tagName as string}
          </div>
        </li>

        <SubLinksMobile
          subMapKey={rootLinks.fun}
          isOpen={subOpenSet.has(rootLinks.fun)}
          liClassName={liClassName}
        />
      </ul>
    </div>
  );
}
