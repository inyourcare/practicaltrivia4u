"use client";

import { useEffect } from "react";

function Kakaomap({
  width,
  height,
  lat,
  lon,
  title,
}: {
  width: number;
  height: number;
  lat: number;
  lon: number;
  title: string;
}) {
  useEffect(() => {
    if (window.kakao && window.kakao.maps && window.kakao.maps.load) {
      window.kakao.maps.load(() => {
        // v3가 모두 로드된 후, 이 콜백 함수가 실행됩니다.
        // console.log(window.kakao.maps, window.kakao.maps.LatLng);
        // console.log(window.Kakao);
        var container = document.getElementById("map") as HTMLElement; //지도를 담을 영역의 DOM 레퍼런스
        var options = {
          // center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
          center: new window.kakao.maps.LatLng(lat, lon), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };
        var map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        // container.style.width = `${width}px`;
        // container.style.height = `${height}px`;
        // map.relayout();

        var marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(lat, lon),
          title: title,
        });
      });
    }
  }, [lat, lon, width, height, title]);
  return (
    <>
      <div
        id="map"
        // className={`w-[${width}px] h-[${height}px] `}
        className="max-w-[300px] max-h-[300px] md:max-w-[1500px] md:max-h-[1500px] bg-white"
        style={{ width: width, height: height }}
      >
        kakao map not loaded, click the background and close this dialog :D
      </div>
    </>
  );
}
export default Kakaomap;
