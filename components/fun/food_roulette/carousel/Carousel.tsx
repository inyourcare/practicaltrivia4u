import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export default function Carousel({ children }: { children: React.ReactNode }) {
  const [curItemIdx, setCurItemIdx] = useState(0);
  const imageSrcs = [
    "bibimbap-gb0ce9688b_1280.jpg",
    // "chicken-g95e14ed32_1280.jpg",
    "chinese-g8a0e5afdc_1280.jpg",
    "chinese-ga243a95e4_1280.jpg",
    "korean-gf4c70fb5b_1280.jpg",
    "korean-ga4652220b_1280.jpg",
    "korean-gbf5b482a2_1280.jpg",
    "korean-g1e47495fe_1280.jpg",
    "octopus-desktop-gf9b2ab88c_1280.jpg",
    "dumplings-fried-gd9613f55a_1280.jpg",
    "food-gb41467b8e_1280.jpg",
    "skate-ga064e06a4_1280.jpg",
    "meat-g15ca3b422_1280.jpg",
    "tteokbokki-g0c7fc890a_1280.jpg",
  ];
  useEffect(() => {
    var idx = 1;
    // var classString = `test`;
    // var prevClassString = "prev";
    const intervalId = setInterval(() => {
      const sliderElem = sliderRef.current;
      if (sliderElem && sliderElem.children.length > 1) {
        // console.log("carousel interval", idx, classString);
        // prevClassString = classString;
        // sliderElem.classList.remove(classString);
        // classString = `-translate-x-[${idx * 100}%]`;
        idx = (idx + 1) % sliderElem.children.length;
        // sliderElem.classList.add(classString);
        sliderElem.setAttribute(
          "style",
          `transform: translate3d(-${idx * 100}%, 0px, 0px); transition-duration: 350ms;`
        );
      }
    }, 4500);
  }, []);
  const sliderRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className={`relative w-full h-[40vh] flex justify-center items-center flex-col overflow-hidden `}
      // bg-[url('/images/roulette/carousel/${imageSrcs[0]}')] bg-no-repeat bg-center bg-cover`}
    >
      <div
        id="carousel-slider"
        ref={sliderRef}
        className="w-full h-full flex flex-row transition ease-in-out delay-150 duration-300 "
      >
        {imageSrcs.map((src, i) => (
          <Image
            // width={1280}
            width={3200}
            // height={853}
            height={1800}
            key={i}
            src={`/images/roulette/carousel/${src}`}
            // fill
            style={{ objectFit: "cover" }}
            alt=""
            // className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
          ></Image>
        ))}
      </div>
      <div className="absolute w-full">{children}</div>
    </div>

    // <div
    //   className={`relative w-full h-[40vh] flex justify-center items-center flex-col overflow-hidden`}
    // >
    // <Slider items={imageSrcs}>{children}</Slider>
    // {/* <div className="absolute w-full">{children}</div> */}
    // </div>
  );
}
