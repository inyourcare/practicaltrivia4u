"use client";

import { useEffect } from "react";

function WawasInKakaomap({
  lat,
  lon,
  title,
}: {
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

        // 마커를 표시할 위치와 title 객체 배열입니다
        var positions = [
          {
            title: "카카오",
            latlng: new window.kakao.maps.LatLng(lat + 0.001, lon),
          },
          {
            title: "생태연못",
            latlng: new window.kakao.maps.LatLng(lat, lon+0.001),
          },
          {
            title: "텃밭",
            latlng: new window.kakao.maps.LatLng(lat-0.001, lon),
          },
          {
            title: "근린공원",
            latlng: new window.kakao.maps.LatLng(lat, lon-0.001),
          },
        ];

        // 마커 이미지의 이미지 주소입니다
        var imageSrc =
          // "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
          "/images/icons/kakao/map/marker/markerStar.png";

        for (var i = 0; i < positions.length; i++) {
          // 마커 이미지의 이미지 크기 입니다
          var imageSize = new window.kakao.maps.Size(24, 35);

          // 마커 이미지를 생성합니다
          var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

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
  }, [lat, lon, title]);
  return (
    <>
      <div id="map" style={{ width: "80%", height: 500 }}>
        kakao map not loaded, click the background and close this dialog :D
      </div>
    </>
  );
}
export default WawasInKakaomap;
