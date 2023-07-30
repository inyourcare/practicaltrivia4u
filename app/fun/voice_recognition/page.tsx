import Header from "@/components/root/Header";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <header className="w-full flex flex-col py-5 bg-[rgba(35,46,82,0)]">
        <Header />
      </header>
      <div className="py-12 flex justify-center">
        <div className="w-full max-w-screen-lg">
          <div className="w-full flex justify-center itmes-center"><h1 className="black font-bold">Link list (click)</h1></div>
          <div className="w-full flex p-3 flex-col md:flex-row justify-center items-center">
            <ul className="flex flex-wrap items-center justify-center text-gray-900 dark:text-white">
              <li>
                <Link
                  className="mr-4 hover:underline md:mr-6 "
                  href={"fun/voice_recognition/voca_US"}
                >
                  Vocaburary(US)
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
