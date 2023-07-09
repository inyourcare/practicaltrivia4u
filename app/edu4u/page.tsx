import Header from "@/components/root/Header";

export default function Home() {
  return (
    <main>
      <header className="w-full flex flex-col py-5 bg-[rgba(35,46,82,0)]">
        <Header />
      </header>
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="w-[60vw] h-[300px] bg-[url('/images/edu4u/main.png')] bg-no-repeat bg-center bg-cover"></div>
        <div className="w-[80vw]">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            <div className="py-[70%]  bg-[url('/images/edu4u/korean.png')] bg-no-repeat bg-center bg-contain hover:cursor-pointer"></div>
            <div className="py-[70%]  bg-[url('/images/edu4u/math.png')] bg-no-repeat bg-center bg-contain hover:cursor-pointer"></div>
            <div className=" py-[70%]  bg-[url('/images/edu4u/english.png')] bg-no-repeat bg-center bg-contain hover:cursor-pointer"></div>
            <div className="py-[70%] bg-[url('/images/edu4u/enrichment.png')] bg-no-repeat bg-center bg-contain hover:cursor-pointer"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
