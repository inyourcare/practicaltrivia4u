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
          className={`absolute -left-3 flex flex-wrap bg-gray-100 transition ease-in-out delay-150 origin-top min-w-[120px] ${
            isOpen ? "scale-y-100" : "scale-y-0"
          }`}
        >
          {subMap.get(subMapKey)?.map((sublink) => (
            <Link
              key={sublink.tagName}
              href={sublink.href}
              className="m-0 text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base whitespace-nowrap min-h-[50px] hover:border hover:bg-gray-200 border-gray-400 w-full flex justify-center items-center"
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
