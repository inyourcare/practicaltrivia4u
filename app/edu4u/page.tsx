import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="w-[60vw] h-[300px] bg-[url('/images/edu4u/main.png')] bg-no-repeat bg-center bg-cover"></div>
        <div className="w-[80vw]">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            <Link href={"/edu4u/korean"}>
              <div className="py-[70%]  bg-[url('/images/edu4u/korean.png')] bg-no-repeat bg-center bg-contain hover:cursor-pointer"></div>
            </Link>
            <Link href={"/edu4u/math"}>
              <div className="py-[70%]  bg-[url('/images/edu4u/math.png')] bg-no-repeat bg-center bg-contain hover:cursor-pointer"></div>
            </Link>
            <Link href={"/edu4u/english"}>
              <div className=" py-[70%]  bg-[url('/images/edu4u/english.png')] bg-no-repeat bg-center bg-contain hover:cursor-pointer"></div>
            </Link>
            <Link href={"/edu4u/enrichment"}>
              <div className="py-[70%] bg-[url('/images/edu4u/enrichment.png')] bg-no-repeat bg-center bg-contain hover:cursor-pointer"></div>
            </Link>
          </div>
        </div>
        <div className="w-full flex justify-center items-center ">
          <div className="w-[60vw] pt-[50%] bg-[url('/images/edu4u/why4u.png')] bg-no-repeat bg-center bg-contain"></div>
        </div>
      </div>
    </main>
  );
}
