"use client";
import Link from "next/link";
import { linkMap, rootLinks } from "./links";
import SubLinksMobile from "./SubLinksMobile";
import { useState } from "react";

export default function NavMobile({ listOpen }: { listOpen: boolean }) {
  const ulClassName = `bg-white h-[100vh]`;
  const parentLiHeight = `h-[50px] `;
  const liClassName = `border-b-2 ml-10 border-gray-200 flex justify-left items-center transition ease-in-out delay-150 origin-top`;
  const [subOpenSet, setSubOpenSet] = useState(new Set());
  return (
    <div
      className={`block absolute w-full md:hidden transition ease-in-out delay-150 origin-left ${
        listOpen ? "scale-x-100" : "scale-x-0"
      } z-50`}
    >
      <ul className={ulClassName}>
        {Object.values(rootLinks).map((val) => (
          <div key={val}>
            <li className={parentLiHeight + "" + liClassName}>
              <div
                // href={linkMap.get(rootLinks.partners)?.href as string}
                className="cursor-pointer"
                onClick={() => {
                  // console.log('before',subOpenSet);
                  (subOpenSet.has(val) &&
                    subOpenSet.delete(val)) ||
                    subOpenSet.add(val);
                  // console.log('after',subOpenSet);
                  setSubOpenSet(new Set(subOpenSet));
                }}
              >
                {linkMap.get(val)?.tagName as string}
              </div>
            </li>
            <SubLinksMobile
              subMapKey={val}
              isOpen={subOpenSet.has(val)}
              liClassName={liClassName}
            />
          </div>
        ))}
      </ul>
    </div>
  );
}
