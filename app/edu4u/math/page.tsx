import GoogleAd from "@/components/adsense/GoogleAd";
import { GoogldAdType } from "@/components/adsense/type";

export default function Home() {
  return (
    <main>
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="w-[60vw] pt-[250%] bg-[url('/images/edu4u/detail/math_detail.png')] bg-no-repeat bg-center bg-contain"></div>
      </div>
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="w-[60vw] pt-[50%] bg-[url('/images/edu4u/why4u.png')] bg-no-repeat bg-center bg-contain"></div>
      </div>
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="w-[80vw]">
          <GoogleAd type={`${GoogldAdType.Display}`} />
        </div>
      </div>
    </main>
  );
}
