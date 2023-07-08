import Image from "next/image";
export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div
          className="w-full flex justify-center items-center w-full bg-gray-300"
          style={{
            backgroundImage: `url('/images/intro/howcoding/1-back.png')`,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: `center`,
            backgroundSize: "100% 100%",
          }}
        >
          <Image
            width={1200}
            height={1515}
            src={`/images/intro/howcoding/1.png`}
            alt=""
          />
        </div>
      </div>

      <div className="h-[400px] flex justify-center items-center">
        <Image
          width={1040}
          height={161}
          src={`/images/intro/howcoding/2.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center">
        <Image
          width={1200}
          height={2006}
          src={`/images/intro/howcoding/3.png`}
          alt=""
        />
      </div>

      <div
        className="flex justify-center flex-col items-center bg-gray-300 p-20 pb-40"
        style={{
          backgroundImage: `url('/images/intro/howcoding/4-back.png')`,
          backgroundRepeat: `no-repeat`,
          backgroundPosition: `center`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="h-[400px] flex justify-center items-center">
          <Image
            width={850}
            height={143}
            src={`/images/intro/howcoding/4.png`}
            alt=""
          />
        </div>
        <div className="flex flex-wrap md:flex-nowrap">
          <Image
            width={450 / 2}
            height={521 / 2}
            src={`/images/intro/howcoding/review01.png`}
            alt=""
          />
          <Image
            width={450 / 2}
            height={521 / 2}
            src={`/images/intro/howcoding/review02.png`}
            alt=""
          />
          <Image
            width={450 / 2}
            height={521 / 2}
            src={`/images/intro/howcoding/review03.png`}
            alt=""
          />
        </div>
        <div className="hidden md:block md:flex md:flex-nowrap">
          <Image
            width={450 / 2}
            height={521 / 2}
            src={`/images/intro/howcoding/review04.png`}
            alt=""
          />
          <Image
            width={450 / 2}
            height={521 / 2}
            src={`/images/intro/howcoding/review05.png`}
            alt=""
          />
          <Image
            width={450 / 2}
            height={521 / 2}
            src={`/images/intro/howcoding/review06.png`}
            alt=""
          />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <Image
          width={1200}
          height={1320}
          src={`/images/intro/howcoding/5.png`}
          alt=""
        />
      </div>


      <div className="flex justify-center flex-col items-center p-20 pb-40">
        <div className="h-[400px] flex justify-center items-center">
          <Image
            width={743}
            height={129}
            src={`/images/intro/howcoding/6.png`}
            alt=""
          />
        </div>
        <div className="flex justify-center items-center">
          <Image
            width={1200}
            height={1078}
            src={`/images/intro/howcoding/6-1.png`}
            alt=""
          />
        </div>
        <div className="flex justify-center items-center">
          <Image
            width={1200}
            height={666}
            src={`/images/intro/howcoding/6-2.png`}
            alt=""
          />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <Image
          width={1200}
          height={4730}
          src={`/images/intro/howcoding/7.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center flex-col items-center p-20 pb-40">
        <div className="h-[400px] flex justify-center items-center">
          <Image
            width={640}
            height={208}
            src={`/images/intro/howcoding/8.png`}
            alt=""
          />
        </div>
      </div>

      <div className="flex justify-center flex-col items-center bg-[#455080] py-20">
        <div className="flex justify-center items-center">
          <Image
            width={1066}
            height={398}
            src={`/images/intro/howcoding/9.png`}
            alt=""
          />
        </div>
      </div>

      <div className="flex justify-center flex-col items-center p-20 pb-40">
        <div className="flex justify-center items-center">
          <Image
            width={1200}
            height={588}
            src={`/images/intro/howcoding/10.png`}
            alt=""
          />
        </div>
        <div className="flex justify-center items-center">
          <Image
            width={1200}
            height={3150}
            src={`/images/intro/howcoding/10-1.png`}
            alt=""
          />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div
          className="w-full flex justify-center items-center w-full h-[480px] bg-gray-300"
          style={{
            backgroundImage: `url('/images/intro/howcoding/11-back.png')`,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: `center`,
            backgroundSize: "100% 100%",
          }}
        >
          <Image
            width={821}
            height={101}
            src={`/images/intro/howcoding/11.png`}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
