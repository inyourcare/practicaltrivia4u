"use client";
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
      <div className="flex justify-center items-center">
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

      <div className="flex justify-center items-center">
        <Image
          width={1079}
          height={572}
          src={`/images/partners/wawa/6.png`}
          alt=""
        />
      </div>
      <br />
      <br />
      <br />
      {/* <div className="flex justify-center items-center">
        <p className="prose font-light text-gray-500 dark:text-gray-400">
          합리적인 가격. 철저한 관리. 지금 문의 주세요.
        </p>
      </div> */}
    </main>
  );
}
