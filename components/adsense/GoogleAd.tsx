"use client";
import { useEffect } from "react";
import { GoogldAdType } from "./type";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const GoogleAd = ({ type }: { type: string }) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className={`googleAd-container w-full ${type === GoogldAdType.Display && 'mt-5 lg:mt-10 p-5'}`}>
      {/* 반응형 디스플레이 */}
      {(type === GoogldAdType.Display && (
        <ins
          className="adsbygoogle flex justify-center items-center"
          // style={{ display: "block" }}
          data-ad-client="ca-pub-8425397323378076"
          data-ad-slot="8957801928"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      )) ||
        (type === GoogldAdType.InFeed && (
          <div>
            {/* <div className="hidden lg:block "> */}
            <div className="h-[0px] lg:h-auto ">
              <div className="border boder-gray-100 p-5">
                <ins
                  className="adsbygoogle flex justify-center items-center"
                  // style={{ display: "block" }}
                  data-ad-format="fluid"
                  data-ad-layout-key="-fb+5w+4e-db+86"
                  data-ad-client="ca-pub-8425397323378076"
                  data-ad-slot="5476941666"
                ></ins>
              </div>
            </div>
            
            {/* <div className="block lg:hidden"> */}
            <div className="h-auto lg:h-[0px] overflow-hidden">
              <div className="border boder-gray-100 p-5">
                <ins
                  className="adsbygoogle flex justify-center items-center"
                  // style={{ display: "block" }}
                  data-ad-format="fluid"
                  data-ad-layout-key="-6t+ed+2i-1n-4w"
                  data-ad-client="ca-pub-8425397323378076"
                  data-ad-slot="7932494865"
                ></ins>
              </div>
            </div>
          </div>
        ))}

      {/* 상단이미지 인피드*/}

      {/* 왼쪽이미지 인피드*/}
    </div>
  );
};

export default GoogleAd;
