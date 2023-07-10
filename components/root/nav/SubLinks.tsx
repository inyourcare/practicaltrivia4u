import Link from "next/link";
import { subMap } from "./links";

function SubLinks({
  subMapKey,
  isOpen,
}: {
  subMapKey: string;
  isOpen: boolean;
}) {
  return (
    <>
      {subMap.get(subMapKey) && (
        <nav
          className={`absolute flex flex-wrap bg-gray-200 p-3 transition ease-in-out delay-150 origin-top ${
            isOpen ? "scale-y-100" : "scale-y-0"
          }`}
        >
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
      )}
    </>
  );
}

export default SubLinks;
