import GoogleAd from "@/components/adsense/GoogleAd";
import { GoogldAdType } from "@/components/adsense/type";
import YoutubePopup from "@/components/util/youtube/popup/YoutubePopup";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center items-center">
        <div className="hidden md:block ">
          <div className="flex justify-center items-center w-full ">
            <Image
              width={1200}
              height={720}
              src={`/images/partners/mindfulness/1.webp`}
              alt=""
              // className="cursor-pointer"
            />
          </div>
        </div>
        <div className="block md:hidden">
          <div className="flex justify-center items-center w-full ">
            <Image
              width={640}
              height={592}
              src={`/images/partners/mindfulness/1-small.webp`}
              alt=""
              // className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="h-[200px] md:h-[400px] flex justify-center items-center">
        <Image
          width={1040}
          height={161}
          src={`/images/partners/mindfulness/2.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center w-full bg-gray-300 py-10">
          <YoutubePopup videoId="LHYnQDYOA_o">
            <Image
              width={1200}
              height={1026}
              src={`/images/partners/mindfulness/3-LHYnQDYOA_o.png`}
              alt=""
            />
          </YoutubePopup>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center w-full py-10">
          <Image
            width={1200}
            height={1085}
            src={`/images/partners/mindfulness/4.png`}
            alt=""
          />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center w-full py-10">
          <Image
            width={1200}
            height={2443}
            src={`/images/partners/mindfulness/5.png`}
            alt=""
          />
        </div>
      </div>

      <div className="bg-[url('/images/partners/mindfulness/6-bg.png')] bg-no-repeat bg-center bg-cover">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center w-full py-10">
            <Image
              width={1200}
              height={1320}
              src={`/images/partners/mindfulness/6.png`}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center w-full py-10">
          <Image
            width={1200}
            height={1487}
            src={`/images/partners/mindfulness/7.png`}
            alt=""
          />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center w-full bg-gray-300 py-10">
          <Image
            width={1200}
            height={1911}
            src={`/images/partners/mindfulness/8.png`}
            alt=""
          />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center w-full py-10">
          <Image
            width={1200}
            height={643}
            src={`/images/partners/mindfulness/9.png`}
            alt=""
          />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center w-full bg-gray-300 py-10">
          <Image
            width={1200}
            height={855}
            src={`/images/partners/mindfulness/10.png`}
            alt=""
          />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center w-full py-10">
          <YoutubePopup videoId="oMYA8aA238A">
            <Image
              width={1200}
              height={1133}
              src={`/images/partners/mindfulness/11-oMYA8aA238A.png`}
              alt=""
            />
          </YoutubePopup>
        </div>
      </div>
      <GoogleAd type={`${GoogldAdType.Display}`}/>
    </main>
  );
}
