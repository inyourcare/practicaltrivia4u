import Link from "next/link";

function SubLinks() {
  return (
    <nav className="absolute">
      <Link
        href={"/"}
        className="m-0 text-xs sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg"
      >
        sub
      </Link>
      <Link
        href={"/"}
        className="m-0 text-xs sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg"
      >
        sub2
      </Link>
      <Link
        href={"/"}
        className="m-0 text-xs sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg"
      >
        sub3
      </Link>
    </nav>
  );
}

export default SubLinks;
