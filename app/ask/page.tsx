import GoogleAd from "@/components/adsense/GoogleAd";
import { GoogldAdType } from "@/components/adsense/type";
import AskForm from "@/components/ask/Form";

export default function Home() {
  return (
    <main>
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="w-[80vw] flex flex-col justify-center items-center">
          <AskForm />

          <GoogleAd type={`${GoogldAdType.Display}`} />
        </div>
      </div>
    </main>
  );
}
