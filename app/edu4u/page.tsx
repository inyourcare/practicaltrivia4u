import Header from "@/components/root/Header";

export default function Home() {
  return (
    <main>
      <header className="w-full flex flex-col py-5 bg-[rgba(35,46,82,0)]">
        <Header />
      </header>
      <div className="flex justify-center itmes-center">
        <div className="w-full w-[60vw] h-[300px] bg-[url('/images/edu4u/main.png')] bg-no-repeat bg-center bg-cover"></div>
        <div>
          
        </div>
      </div>
    </main>
  );
}
