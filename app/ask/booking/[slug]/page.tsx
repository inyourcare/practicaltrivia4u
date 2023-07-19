import GoogleAd from "@/components/adsense/GoogleAd";
import { GoogldAdType } from "@/components/adsense/type";
import BookingForm from "@/components/ask/booking/BookingForm";

export default function Home({
  params,
}: {
  params: { slug: string };
}) {
  const branchName = params.slug
  return (
    <main>
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="w-[80vw] flex flex-col justify-center items-center">
          <BookingForm branchName = {branchName}/>
          <GoogleAd type={`${GoogldAdType.Display}`} />
        </div>
      </div>
    </main>
  );
}
