"use client";
import { HookGetCurrentPosition } from "@/components/hooks/HookGetCurrentPosition";
import { useSearchParams } from "next/navigation";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useEffect, useState } from "react";

function BokingMain({ wawaBranches }: { wawaBranches: Array<any> }) {
  // const title = "현재위치";
  const searchParams = useSearchParams();
  // const searchBranch = searchParams.get("branch")
  const [branch, setBranch] = useState(searchParams.get("branch"));
  const position = HookGetCurrentPosition();
  const [address, setAddress] = useState("");
  const [map, setMap] = useState(undefined as unknown as any);
  const daumPostOpen = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );
  const daumPosthandleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    if (fullAddress) setAddress(fullAddress);
  };

  // useEffect(()=>{
  //   if (searchBranch){
  //     setBranch(searchBranch)
  //   }
  // },[searchBranch])
  useEffect(() => {
    if (map && branch) {
      const name = branch.slice(0, branch.length - 1);
      console.log("map branch effect", branch);
      const filtered = wawaBranches.filter((b) => b.name === name);
      if (filtered.length > 0) {
        const b = filtered[0];
        var coords = new window.kakao.maps.LatLng(b.lat, b.lng);
        map.setCenter(coords);
      }
    }
  }, [map, branch]);
  useEffect(() => {
    if (map && address) {
      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new window.kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(
        // "제주특별자치도 제주시 첨단로 242",
        address,
        function (result: any, status: any) {
          // 정상적으로 검색이 완료됐으면
          if (status === window.kakao.maps.services.Status.OK) {
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
              title: "home",
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            // var infowindow = new window.kakao.maps.InfoWindow({
            //   content:
            //     '<div style="width:150px;text-align:center;padding:6px 0;">Home</div>',
            // });
            // infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
          }
        }
      );
    }
  }, [map, address]);
  useEffect(() => {
    // console.log('useeffect' , window, window.kakao, window.Kakao, wawaBranches)
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
        var center = new window.kakao.maps.LatLng(position.lat, position.lng);
        var options = {
          // center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
          center: center, //지도의 중심좌표.
          level: 7, //지도의 레벨(확대, 축소 정도)
        };
        var map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        setMap(map);
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
          position: new window.kakao.maps.LatLng(position.lat, position.lng),
          title: "현재위치",
        });

        console.log("kakaomap generated");

        var positions = wawaBranches.map((b) => {
          return {
            title: `${b.name}점`,
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
            clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
          });

          // 인포윈도우를 생성합니다
          // var infowindow = new window.kakao.maps.InfoWindow({
          //   // content : '<div style="padding:5px;">Hello World!</div>',
          //   // removable : true
          //   content: positions[i].title
          // });
          // 아래 코드는 위의 마커를 생성하는 코드에서 clickable: true 와 같이
          // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
          // marker.setClickable(true);
          // window.kakao.maps.event.addListener(marker, "click", function () {
          // 마커 위에 인포윈도우를 표시합니다
          // infowindow.open(map, marker);
          // console.log(positions[i].title)
          // setBranch(marker.getTitle());
          //   infowindow.open(map, marker);
          // });
          // window.kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
          // window.kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
          window.kakao.maps.event.addListener(
            marker,
            "click",
            makeClickListener(marker)
          );
        }
      });
    }
    // // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
    // function makeOverListener(map:any, marker:any, infowindow:any) {
    //   return function() {
    //       infowindow.open(map, marker);
    //   };
    // }
    // // 인포윈도우를 닫는 클로저를 만드는 함수입니다
    // function makeOutListener(infowindow:any) {
    //   return function() {
    //       infowindow.close();
    //   };
    // }
    function makeClickListener(marker: any) {
      return function () {
        // infowindow.close();
        setBranch(marker.getTitle());
      };
    }
  }, [position.lat, position.lng, wawaBranches]);
  return (
    <>
      <div
        className={`${
          (branch && "scale-y-100") || "scale-y-0"
        } transition ease-in-out delay-150`}
      >
        <div>
          {/* 예약신청폼 */}
          <div>선택지점: {branch}</div>
        </div>
      </div>
      <div
        className={`${
          (branch && "scale-y-0") || "scale-y-100"
        } transition ease-in-out delay-150`}
      >
        <div>지점을 선택하시면 예약신청폼이 열립니다.</div>
      </div>
      <div className="flex flex-wrap justify-between w-full">
        <span className="w-2/12 min-w-[90px] flex justify-center items-center">
          장소검색:
        </span>
        <input
          className="w-10/12 shadow appearance-none border rounded py-2 px-1 text-black"
          value={address}
          readOnly
          onClick={() => daumPostOpen({ onComplete: daumPosthandleComplete })}
          name="address"
          required
        />
        {/* <input
            className="shadow appearance-none border rounded w-4/12 py-2 px-1 text-black"
            placeholder="상세주소입력"
            name="address2"
          /> */}
        {/* <span className="shadow appearance-none border">
                  <DaumPostPopupOpenBtn setAddress={setAddress} />
                </span> */}
      </div>
      ※ 위치로부터 가까운 와와학습코칭센터입니다.(보이지 않을 경우 지도를 확대
      해 보세요)
      <div id="map" style={{ width: "100%", height: 500 }}>
        Sorry, kakao map not loaded, try refresh after some minutes :D
      </div>
      {wawaBranches && wawaBranches.length > 0 && (
        <div className="w-full my-5">
          <strong className="">등록된 와와학습코칭센터 목록</strong>
          <div className="h-[200px] overflow-y-scroll my-5 border-2 border-gray-200">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {wawaBranches.map((b) => (
                <div
                  key={b.id}
                  className="cursor-pointer"
                  onClick={() => setBranch(`${b.name}점`)}
                >{`${b.name}점`}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default BokingMain;
