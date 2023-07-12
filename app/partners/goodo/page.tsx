import YoutubePopup from "@/components/util/youtube/popup/YoutubePopup";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center w-full ">
          <Image
            width={1100}
            height={720}
            src={`/images/partners/goodo/1.png`}
            alt=""
          />
        </div>
      </div>

      <div className="h-[400px] flex justify-center items-center">
        <Image
          width={1040}
          height={161}
          src={`/images/partners/goodo/2.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center bg-gray-300 p-20">
        <Image
          width={1100}
          height={1427}
          src={`/images/partners/goodo/3.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center p-20">
        <YoutubePopup videoId="dm9KnAuYdSA">
          <Image
            width={1100}
            height={619}
            src={`/images/partners/goodo/4.png`}
            alt=""
          />
        </YoutubePopup>
      </div>

      <div className="flex justify-center items-center bg-[#f7941e] p-20">
        <Image
          width={1100}
          height={529}
          src={`/images/partners/goodo/5.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center p-20">
        <Image
          width={1079}
          height={712}
          src={`/images/partners/goodo/6.png`}
          alt=""
        />
      </div>
      <div className="flex justify-center items-center p-20">
        <Image
          width={585}
          height={361}
          src={`/images/partners/goodo/7.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center p-20 bg-[#1f2c6b]">
        <Image
          width={1100}
          height={1622}
          src={`/images/partners/goodo/8.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center p-20">
        <Image
          width={1096}
          height={1099}
          src={`/images/partners/goodo/9.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center p-20">
        <Image
          width={1098}
          height={817}
          src={`/images/partners/goodo/10.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center p-20 bg-gray-300">
        <Image
          width={1012}
          height={529}
          src={`/images/partners/goodo/11.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center p-20">
        <Image
          width={1098}
          height={575}
          src={`/images/partners/goodo/12.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center">
        <div
          className="w-full flex justify-center items-center w-full bg-gray-300 p-20"
          style={{
            backgroundImage: `url('/images/partners/goodo/13-back.png')`,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: `center`,
            backgroundSize: "100% 100%",
          }}
        >
          <Image
            width={1100}
            height={800}
            src={`/images/partners/goodo/13.png`}
            alt=""
          />
        </div>
      </div>

      <div className="flex justify-center items-center p-20">
        <Image
          width={1100}
          height={716}
          src={`/images/partners/goodo/14.png`}
          alt=""
        />
      </div>
    </>
  );
}
