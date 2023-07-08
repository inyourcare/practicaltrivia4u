import FoodRoulette from "@/components/fun/food_roulette/FoodRoulette";
import Nav from "@/components/root/nav/Nav";

declare global {
  interface Window {
    Sortable: any;
  }
}
export default function Home() {
  return (
    <>
      <header className="w-full flex flex-col py-5 bg-[rgba(35,46,82,0)]">
        <Nav />
      </header>
      <div className="py-12 flex justify-center">
        <div className="w-full max-w-screen-lg">
          <div className="w-full flex p-3 flex-col md:flex-row">
            <FoodRoulette />
          </div>
        </div>
      </div>
    </>
  );
}
