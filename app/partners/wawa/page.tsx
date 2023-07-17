"use client";
import GoogleAd from "@/components/adsense/GoogleAd";
import { GoogldAdType } from "@/components/adsense/type";
import WawasInKakaomap from "@/components/partners/wawa/WawasInKakaomap";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const initialState = {
    lat: 0.0,
    lng: 0.0,
    radius: 100,
    lsLoading: false,
  };
  const [state, setState] = useState(initialState);
  // get geo info
  useEffect(() => {
    const { geolocation } = navigator;

    geolocation.getCurrentPosition(
      (position) => {
        setState({
          ...state,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          lsLoading: false,
        });
      },
      (error) => {
        console.warn("Fail to fetch current location", error);
        setState({ ...state, lat: 37, lng: 127, lsLoading: false });
      },
      {
        // enableHighAccuracy: false,
        enableHighAccuracy: true,
        // maximumAge: 0,
        maximumAge: 10000,
        // timeout: Infinity,
        timeout: 5000,
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <div className="flex justify-center items-center flex-col p-0 md:p-20">
        ※현재 위치로부터 가까운 와와학습코칭센터입니다.(보이지 않을 경우 지도를 확대 해 보세요)
        <WawasInKakaomap lat={state.lat} lon={state.lng} title={"현재위치"} />
      </div>
      <div className="flex justify-center items-center">
        <Image
          width={1920}
          height={520}
          src={`/images/partners/wawa/etc.jpg`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center">
        <Image
          width={1920}
          height={520}
          src={`/images/partners/wawa/etc2.jpg`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center">
        <Image
          width={1076}
          height={362}
          src={`/images/partners/wawa/1.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center p-20 bg-gray-300">
        <Image
          width={1080}
          height={199}
          src={`/images/partners/wawa/2.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center p-20">
        <Image
          width={1070}
          height={415}
          src={`/images/partners/wawa/3.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center">
        <Image
          width={1600}
          height={681}
          src={`/images/partners/wawa/4.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center bg-gray-300">
        <Image
          width={1235}
          height={915}
          src={`/images/partners/wawa/5.png`}
          alt=""
        />
      </div>

      {/* <div className="flex justify-center items-center">
        <Image
          width={1079}
          height={572}
          src={`/images/partners/wawa/6.png`}
          alt=""
        />
      </div> */}

      <div className="flex justify-center items-center mt-10">
        <Image
          width={1080}
          height={1393}
          src={`/images/partners/wawa/code/2-reform2.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center">
        <Image
          width={1080}
          height={1684}
          src={`/images/partners/wawa/code/3.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center">
        <Image
          width={1080}
          height={791}
          src={`/images/partners/wawa/code/4.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center">
        <Image
          width={1080}
          height={163}
          src={`/images/partners/wawa/code/6.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center">
        <Image
          width={1080}
          height={1273}
          src={`/images/partners/wawa/code/7.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center">
        <Image
          width={1080}
          height={2792}
          src={`/images/partners/wawa/code/8.png`}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center">
        <Image
          width={1080}
          height={2677}
          src={`/images/partners/wawa/code/9.png`}
          alt=""
        />
      </div>
      <div className="flex justify-center items-center">
        <Image
          width={1080}
          height={1820}
          src={`/images/partners/wawa/code/10.png`}
          alt=""
        />
      </div>
      <GoogleAd type={`${GoogldAdType.Display}`}/>
    </main>
  );
}
