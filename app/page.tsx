"use client";
import Header from "@/components/root/Header";
import "./home.css";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    var style = ["style1", "style2", "style3", "style4"];
    var tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
    var opacity = [
      "opacity1",
      "opacity1",
      "opacity1",
      "opacity2",
      "opacity2",
      "opacity3",
    ];

    function getRandomArbitrary(min: number, max: number) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    var estrela = "";
    var qtdeEstrelas = 250;
    var constelacao = document.querySelector(".constelacao") as HTMLDivElement;
    var widthWindow = window.innerWidth;
    var heightWindow = window.innerHeight;

    for (var i = 0; i < qtdeEstrelas; i++) {
      estrela +=
        "<span class='estrela " +
        style[getRandomArbitrary(0, 4)] +
        " " +
        opacity[getRandomArbitrary(0, 6)] +
        " " +
        tam[getRandomArbitrary(0, 5)] +
        "' style='animation-delay: ." +
        getRandomArbitrary(0, 9) +
        "s; left: " +
        getRandomArbitrary(0, widthWindow) +
        "px; top: " +
        getRandomArbitrary(0, heightWindow) +
        "px;'></span>";
    }

    constelacao.innerHTML = estrela;

    //meteoros

    var numeroAleatorio = getRandomArbitrary(10000, 15000);

    setTimeout(function () {
      carregarMeteoro();
    }, numeroAleatorio);

    function carregarMeteoro() {
      numeroAleatorio = getRandomArbitrary(10000, 15000);
      setTimeout(carregarMeteoro, numeroAleatorio);
      // numeroAleatorio = getRandomArbitrary(5000, 10000);
      var meteoro =
        "<div class='meteoro " + style[getRandomArbitrary(0, 4)] + "'></div>";
      document.getElementsByClassName("chuvaMeteoro")[0].innerHTML = meteoro;
      setTimeout(function () {
        document.getElementsByClassName("chuvaMeteoro")[0].innerHTML = "";
      }, 1000);
    }
  }, []);
  return (
    <main>
      <header className="w-full flex flex-col py-5 bg-[rgba(35,46,82,0)]">
        <Header />
      </header>
      {/* <Link id={linkId} href="/edu4u"></Link> */}
      <div className="w-full h-screen relative">
        <div className="noite"></div>

        <div className="constelacao"></div>

        <div className="lua">
          <div className="textura"></div>
        </div>

        <div className="chuvaMeteoro"></div>

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
