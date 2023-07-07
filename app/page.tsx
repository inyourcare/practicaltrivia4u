import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center w-full bg-gray-300">
          {/* <YoutubePopupImage> */}
          <Image
            width={1200}
            height={720}
            src={`/images/intro/sangsang/1.webp`}
            alt=""
            // className="cursor-pointer"
          />
          {/* </YoutubePopupImage> */}
        </div>
      </div>

      <div className="h-[400px] flex justify-center items-center">
        <Image
          width={1040}
          height={161}
          src={`/images/intro/sangsang/2.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center flex-col items-center bg-gray-300 p-20 pb-40">
        <div className="h-[400px] flex justify-center items-center">
          <Image
            width={650}
            height={108}
            src={`/images/intro/sangsang/3.png`}
            alt=""
          />
        </div>
        <div className="flex flex-wrap md:flex-nowrap">
          <Image
            width={450 / 2}
            height={490 / 2}
            src={`/images/intro/sangsang/review01.png`}
            alt=""
          />
          <Image
            width={450 / 2}
            height={490 / 2}
            src={`/images/intro/sangsang/review02.png`}
            alt=""
          />
          <Image
            width={450 / 2}
            height={490 / 2}
            src={`/images/intro/sangsang/review03.png`}
            alt=""
          />
        </div>
        <div className="hidden md:block md:flex md:flex-nowrap">
          <Image
            width={450 / 2}
            height={490 / 2}
            src={`/images/intro/sangsang/review04.png`}
            alt=""
          />
          <Image
            width={450 / 2}
            height={490 / 2}
            src={`/images/intro/sangsang/review05.png`}
            alt=""
          />
          <Image
            width={450 / 2}
            height={490 / 2}
            src={`/images/intro/sangsang/review06.png`}
            alt=""
          />
        </div>
      </div>

      <div className="flex justify-center items-center flex-col">
        <div className="h-[400px] flex justify-center items-center">
          <Image
            width={477}
            height={103}
            src={`/images/intro/sangsang/4.png`}
            alt=""
          />
        </div>
        <div className="flex justify-center items-center flex-row ">
          <div className="h-[400px] flex justify-center items-center flex-1">
            <Image
              width={414}
              height={174}
              src={`/images/intro/sangsang/5.png`}
              alt=""
            />
          </div>
          <div className="flex justify-center items-center flex-1 flex-col">
            {/* <YoutubePopupImage> */}
            <Image
              width={630}
              height={501}
              src={`/images/intro/sangsang/5-1.png`}
              alt=""
            />
            {/* </YoutubePopupImage> */}
            <Image
              width={630}
              height={43}
              src={`/images/intro/sangsang/5-2.png`}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center flex-col items-center bg-gray-300 p-20 pb-40">
        <div className="h-[400px] flex justify-center items-center">
          <Image
            width={559}
            height={225}
            src={`/images/intro/sangsang/6.png`}
            alt=""
          />
        </div>
        <div className="h-[400px] flex justify-center items-center">
          <Image
            width={1200}
            height={347}
            src={`/images/intro/sangsang/6-1.png`}
            alt=""
          />
        </div>
      </div>

      <div className="flex justify-center flex-col items-center p-20 pb-40">
        <div className="h-[400px] flex justify-center items-center">
          <Image
            width={490}
            height={103}
            src={`/images/intro/sangsang/7.png`}
            alt=""
          />
        </div>
        <div className="h-[400px] flex justify-center items-center">
          <Image
            width={1200}
            height={354}
            src={`/images/intro/sangsang/7-1.png`}
            alt=""
          />
        </div>
      </div>

      <div className="flex justify-center flex-col items-center bg-gray-300 p-20 pb-40">
        <div className="h-[400px] flex justify-center items-center">
          <Image
            width={608}
            height={104}
            src={`/images/intro/sangsang/8.png`}
            alt=""
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="h-[400px] flex justify-center items-center flex-1">
            <Image
              width={636}
              height={271}
              src={`/images/intro/sangsang/8-1.png`}
              alt=""
            />
          </div>
          <div className="h-[400px] flex justify-center items-center flex-1">
            <Image
              width={600}
              height={400}
              src={`/images/intro/sangsang/8-4.png`}
              alt=""
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="flex justify-center items-center basis-1/2">
            <Image
              width={600}
              height={385}
              src={`/images/intro/sangsang/8-2.png`}
              alt=""
            />
          </div>
          <div className="flex justify-center items-center basis-1/2">
            <Image
              width={314}
              height={359}
              src={`/images/intro/sangsang/8-3.png`}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center flex-col items-center p-20 pb-40">
        <div className="h-[200px] flex justify-center items-center">
          <Image
            width={481}
            height={107}
            src={`/images/intro/sangsang/9.png`}
            alt=""
          />
        </div>
        <div className="h-[200px] flex justify-center items-center">
          <Image
            width={326}
            height={93}
            src={`/images/intro/sangsang/9-1.png`}
            alt=""
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="flex justify-center items-center basis-1/4">
            {/* <YoutubePopupImage> */}
            <Image
              width={260}
              height={300}
              src={`/images/intro/sangsang/9-2.jpg`}
              alt=""
            />
            {/* </YoutubePopupImage> */}
          </div>
          <div className="flex justify-center items-center basis-1/4">
            {/* <YoutubePopupImage> */}
            <Image
              width={260}
              height={300}
              src={`/images/intro/sangsang/9-3.jpg`}
              alt=""
            />
            {/* </YoutubePopupImage> */}
          </div>
          <div className="flex justify-center items-center basis-1/4">
            {/* <YoutubePopupImage> */}
            <Image
              width={260}
              height={300}
              src={`/images/intro/sangsang/9-4.jpg`}
              alt=""
            />
            {/* </YoutubePopupImage> */}
          </div>
          <div className="flex justify-center items-center basis-1/4">
            {/* <YoutubePopupImage> */}
            <Image
              width={260}
              height={300}
              src={`/images/intro/sangsang/9-5.jpg`}
              alt=""
            />
            {/* </YoutubePopupImage> */}
          </div>
        </div>
        <div className="h-[200px] flex justify-center items-center">
          <Image
            width={1200}
            height={130}
            src={`/images/intro/sangsang/9-6.jpg`}
            alt=""
          />
        </div>
      </div>

      <div
        className="flex justify-center flex-col items-center p-20 pb-40"
        style={{
          backgroundImage: `url('/images/intro/sangsang/10-back.jpg')`,
          backgroundRepeat: `no-repeat`,
          backgroundPosition: `center`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="h-[400px] flex justify-center items-center">
          <Image
            width={275}
            height={92}
            src={`/images/intro/sangsang/10.png`}
            alt=""
          />
        </div>
        <div className="flex flex-wrap md:flex-nowrap">
          <Image
            width={261}
            height={415}
            src={`/images/intro/sangsang/10-1.png`}
            alt=""
            className="p-1"
          />
          <Image
            width={261}
            height={415}
            src={`/images/intro/sangsang/10-2.png`}
            alt=""
            className="p-1"
          />
          <Image
            width={261}
            height={415}
            src={`/images/intro/sangsang/10-3.png`}
            alt=""
            className="p-1"
          />
        </div>
        <div className="hidden md:block md:flex md:flex-nowrap">
          <Image
            width={261}
            height={415}
            src={`/images/intro/sangsang/10-4.png`}
            alt=""
            className="p-1"
          />
          <Image
            width={261}
            height={415}
            src={`/images/intro/sangsang/10-5.png`}
            alt=""
            className="p-1"
          />
          <Image
            width={261}
            height={415}
            src={`/images/intro/sangsang/10-6.png`}
            alt=""
            className="p-1"
          />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div
          className="flex justify-center items-center w-full"
          style={{
            backgroundImage: `url('/images/intro/sangsang/12-back.webp')`,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: `center`,
            backgroundSize: "100% 100%",
          }}
        >
          <Image
            width={1200}
            height={1218}
            src={`/images/intro/sangsang/12.webp`}
            alt=""
          />
        </div>
      </div>
    </main>
  );
}
