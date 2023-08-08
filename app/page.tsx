import Header from "@/components/root/Header";
import "./home.css";

export default function Home() {
  function getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  return (
    <main>
      <header className="w-full flex flex-col py-5 bg-[rgba(35,46,82,0)]">
        <Header />
      </header>
      {/* <Link id={linkId} href="/edu4u"></Link> */}
      <div className="w-full h-screen relative flex justify-center items-center flex-col overflow-hidden">
        <div className="noite"></div>

        <div className="constelacao">
          {Array(250)
            .fill(0)
            .map((item, i) => (
              <span
                key={i}
                className={`estrela style${getRandomArbitrary(
                  0,
                  4
                )} opacity${getRandomArbitrary(0, 6)} tam${getRandomArbitrary(
                  0,
                  5
                )}`}
                style={{
                  animationDelay: `${getRandomArbitrary(0, 9)}s`,
                  left: `${getRandomArbitrary(0, 100)}%`,
                  top: `${getRandomArbitrary(0, 100)}%`,
                }}
              ></span>
            ))}
        </div>

        <div className="lua">
          <div className="textura"></div>
        </div>

        {/* <div className="chuvaMeteoro"></div> */}

        {/* <div className="floresta">
          <img
            src="https://raw.githubusercontent.com/interaminense/starry-sky/master/src/img/bgTree.png"
            alt=""
          />
        </div> */}
        <div className="absolute w-full">
          <h1 className="text-5xl drop-shadow-2xl [text-shadow:_5px_5px_5px_rgb(0_0_0_/_100%)] text-white text-center font-black">
            당신을 위한 사유공간
          </h1>
          {/* <p className="drop-shadow-2xl [text-shadow:_1px_1px_1px_rgb(0_0_0_/_100%)] text-white text-center font-black">
            고민하고 결정하기도 아까운 시간. 오늘 뭐먹을지 대신 선택 해
            드립니다.
          </p> */}
        </div>
      </div>
    </main>
  );
}
