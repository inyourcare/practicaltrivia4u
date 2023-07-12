"use client";

import { useEffect, useState } from "react";

function WawasInKakaomap({
  lat,
  lon,
  title,
}: {
  lat: number;
  lon: number;
  title: string;
}) {
  const [wawaBranches, setWawaBranches] = useState(new Array());
  const getWawaBranchesList = async () =>
    await fetch(`/api/wawaBranches/list`, {
      method: "POST",
      body: JSON.stringify({
        page: 0,
        limit: 1000,
        // conditions: {
        // creator: {
        // email: 'admin@sotong.co.kr'
        // email
        //     ...(email && { email: email })
        // }
        // }
        // conditions
        conditions: {},
      }),
      headers: { "Content-Type": "application/json" },
    }).then(async (result) => {
      const { wawaBranches, pages } = await result.json();
      // console.log(wawaBranches, pages);
      return [wawaBranches, pages];
    });

  useEffect(() => {
    getWawaBranchesList().then((data) => {
      const [wawaBranches, pages] = data;
      console.log("kakaomap branch loaded::", wawaBranches.length);
      const arr = wawaBranches as Array<any>;
      if (arr && arr.length > 0) {
        console.log("start generating markers::", arr.length);
        setWawaBranches(arr);
      }
    });
  }, []);
  useEffect(() => {
    if (
      window.kakao &&
      window.kakao.maps &&
      window.kakao.maps.load &&
      wawaBranches &&
      wawaBranches.length > 0
    ) {
      window.kakao.maps.load(() => {
        // v3가 모두 로드된 후, 이 콜백 함수가 실행됩니다.
        // console.log(window.kakao.maps, window.kakao.maps.LatLng);
        // console.log(window.Kakao);
        var container = document.getElementById("map") as HTMLElement; //지도를 담을 영역의 DOM 레퍼런스
        var options = {
          // center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
          center: new window.kakao.maps.LatLng(lat, lon), //지도의 중심좌표.
          level: 7, //지도의 레벨(확대, 축소 정도)
        };
        var map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        if (map) {
          map.setDraggable(false);
          map.setZoomable(false);
          // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
          var mapTypeControl = new window.kakao.maps.MapTypeControl();

          // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
          // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
          map.addControl(
            mapTypeControl,
            window.kakao.maps.ControlPosition.TOPRIGHT
          );

          // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
          var zoomControl = new window.kakao.maps.ZoomControl();
          map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
        }

        var marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(lat, lon),
          title: title,
        });

        console.log("kakaomap generated");

        var positions = wawaBranches.map((b) => {
          return {
            title: `와와학습코칭센터 ${b.name}점`,
            latlng: new window.kakao.maps.LatLng(b.lat, b.lng),
          };
        });
        var imageSrc =
          // "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
          "/images/icons/kakao/map/marker/wawaMarkerPurple.png";
        for (var i = 0; i < positions.length; i++) {
          // 마커 이미지의 이미지 크기 입니다
          var imageSize = new window.kakao.maps.Size(40, 50);

          // 마커 이미지를 생성합니다
          var markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize
          );

          // 마커를 생성합니다
          var marker = new window.kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지
          });
        }
      });
    }
  }, [lat, lon, title, wawaBranches]);
  return (
    <>
      <div id="map" style={{ width: "100%", height: 500 }}>
        Sorry, kakao map not loaded, try refresh after some minutes :D
      </div>
      {wawaBranches && wawaBranches.length > 0 && (
        <div className="w-full my-5">
          <strong className="">등록된 와와학습코칭센터 목록</strong>
          <div className="h-[200px] overflow-y-scroll my-5 border-2 border-gray-200">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {wawaBranches.map((b) => (
                <div key={b.id}>{`${b.name}점`}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default WawasInKakaomap;
