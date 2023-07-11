import Link from "next/link";
import { subMap } from "./links";

function SubLinksMobile({
  subMapKey,
  isOpen,
  liClassName,
}: {
  subMapKey: string;
  isOpen: boolean;
  liClassName: string;
}) {
  
  const liHeight = `h-[50px] `
  return (
    subMap.get(subMapKey) &&
    subMap.get(subMapKey)?.map((sublink) => (
      <li
        key={sublink.tagName}
        className={`${liClassName} ${
          isOpen ?  `${liHeight} scale-y-100` : "scale-y-0 h-[0px]"
        } bg-gray-100 px-10`}
      >
        <Link
          href={sublink.href}
          className={`${isOpen ? "scale-y-100" : "scale-y-0 h-[0px]"}`}
        >
          {isOpen && sublink.tagName}
        </Link>
      </li>
    ))
    // <ul className={`${isOpen ? "scale-y-100" : "scale-y-0"}`}>
    // </ul>
  );
}

export default SubLinksMobile;
