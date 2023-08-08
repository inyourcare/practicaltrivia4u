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
      <div className="w-full h-screen relative">
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
      </div>
    </main>
  );
}
