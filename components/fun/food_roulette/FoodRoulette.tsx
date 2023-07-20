"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { BiTrash, BiMove } from "react-icons/bi";
import { Nanum_Gothic } from "next/font/google";
import { RestaurantInterface } from "./types";
import select from "./src/select";
import Carousel from "./carousel/Carousel";
import Dialog from "@/components/dialog/Dialog";
import KakaoRestaurant from "./KakaoRestaurant";
import KakaoShare from "@/components/kakao/KakaoShare";
const nanumGothic = Nanum_Gothic({ weight: "400", subsets: ["latin"] });
import "./foodroulette.css";
import { HookGetCurrentPosition } from "@/components/hooks/HookGetCurrentPosition";
import GoogleAd from "@/components/adsense/GoogleAd";
import { GoogldAdType } from "@/components/adsense/type";

// class MyDraggable extends Draggable {
//   onDragEnter:DraggableEventHandler
// }
export default function FoodRoulette() {
  const query = "음식점";
  const initialState = {
    // lat: 0.0,
    // lng: 0.0,
    radius: 100,
    lsLoading: false,
  };
  const [state, setState] = useState(initialState);
  const [restaurants, setRestaurants] = useState(
    [] as Array<RestaurantInterface>
  );
  const [restaurantsLoading, setRestaurantsLoading] = useState(false);
  const [kinds] = useState(new Set<string>());
  const [kindMap] = useState(new Map<string, Array<RestaurantInterface>>());
  const [mapOpen, setMapOpen] = useState(false);
  const [mapRestaurant, setMapRestaurant] = useState(
    undefined as unknown as RestaurantInterface
  );
  const notFilteredClassString = "not-filtered";
  const filteredClassString = "filtered";
  const [filteredKinds,setFilteredKinds] = useState(new Set<string>());
  const listItmeContainerId = "list_item";
  const filterBtnsContainerId = "filter-btns-container";
  const filterBtnElems = useRef<HTMLButtonElement[]>([]);
  const restaurantsDivElems = useRef<HTMLDivElement[]>([]);
  const [filteredRestaurantCntTrigger,setFilteredRestaurantCntTrigger] = useState(true)
  const [filteredRestaurantCnt, setFilteredRestaurantCnt] = useState(0)

  // get geo info
  // useEffect(() => {
  //   const { geolocation } = navigator;

  //   geolocation.getCurrentPosition(
  //     (position) => {
  //       setState({
  //         ...state,
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //         lsLoading: false,
  //       });
  //     },
  //     (error) => {
  //       console.warn("Fail to fetch current location", error);
  //       setState({ ...state, lat: 37, lng: 127, lsLoading: false });
  //     },
  //     {
  //       // enableHighAccuracy: false,
  //       enableHighAccuracy: true,
  //       // maximumAge: 0,
  //       maximumAge: 10000,
  //       // timeout: Infinity,
  //       timeout: 5000,
  //     }
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const position = HookGetCurrentPosition();

  // sortable
  useEffect(() => {
    const listItem = document.getElementById(listItmeContainerId);
    console.log("rendering list item sorted");
    new window.Sortable(listItem, {
      animation: 350,
      // chosenClass: "sortable-chosen",
      // dragClass: "sortable-drag",
      handle: ".handle", // handle's class
      ghostClass: "bg-gray-100", // 배경 색
      filter: `.${notFilteredClassString}`,
    });
  }, []);

  // initialize
  useEffect(() => {
    if (filterBtnElems.current[0]) {
      // console.log('hi',filterBtnElems.current[0].classList);
      filterBtnElems.current[0].click();
    }
  }, [restaurantsLoading, filterBtnElems, kinds.size]);

  // 후보 음식점 개수
  useEffect(()=>{
    // console.log(restaurantsDivElems.current.filter(elem=>elem.classList.contains(filteredClassString)).length)
    setFilteredRestaurantCnt(restaurantsDivElems.current.filter(elem=>elem.classList.contains(filteredClassString)).length)
  },[filteredRestaurantCntTrigger])

  const fetchingRestaurants = useCallback(() => {
    setRestaurantsLoading(true);
    fetch(`/api/kakao/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lat: position.lat,
        lng: position.lng,
        radius: state.radius,
        query: query,
      }),
    })
      .then(async (response) => {
        // console.log((await restaurants.json()).data)
        const restaurants = (await response.json()).data;
        // console.log(restaurants);
        // setRestaurants(restaurants.documents);
        setRestaurants(restaurants);
        (restaurants as Array<RestaurantInterface>).map((restaurant) => {
          const splitStrings = restaurant.category_name.split(">");

          if (splitStrings.length > 1 && splitStrings[1]) {
            const kind = splitStrings[1].trim();
            kinds.add(kind);
            const resArr = kindMap.get(kind);
            if (!resArr) {
              const newArr = new Array<RestaurantInterface>();
              newArr.push(restaurant);
              kindMap.set(kind, newArr);
            } else {
              resArr.push(restaurant);
            }
          }
        });
      })
      .catch((e) => {
        alert(`${query} 데이터를 가져오는 중에 문제가 발생했습다.`);
      })
      .finally(() => {
        setRestaurantsLoading(false);
        filteredKinds.clear();
      });
  }, [position.lat, position.lng, state.radius, kinds, kindMap, filteredKinds]);

  function mingle() {
    const listItem = document.getElementById(listItmeContainerId);
    console.log("mingling");
    if (listItem && listItem?.children.length > 0) {
      const itemLen = listItem.children.length;
      for (let i = 0; i < 100; i++) {
        const min = 0;
        const max = itemLen - 1;
        const ranSeed = Math.random();
        const randomIndex = Math.floor(ranSeed * (max - min + 1) + min);
        const backward = ranSeed > 0.5;

        if (backward)
          listItem.insertBefore(
            listItem.children[randomIndex],
            listItem.children[randomIndex].previousElementSibling
          );
        else
          listItem.insertBefore(
            listItem.children[randomIndex],
            listItem.children[randomIndex].nextElementSibling
              ?.nextElementSibling as Element
          );
      }
    }
  }
  function reduce() {
    const listItem = document.getElementById(listItmeContainerId);
    console.log("mingling");
    if (listItem && listItem?.children.length > 0) {
      const arr = new Array<Element>();
      for (var i = 0; i < listItem?.children.length; i++) {
        const item = listItem?.children[i];
        arr.push(item);
      }
      arr.forEach((elem, i) => i > 1 && elem.remove());
    }
  }
  function selectOne() {
    // drawKong()
    setState({ ...state, lsLoading: true });
    const listItem = document.getElementById(listItmeContainerId);
    console.log("selectOne");
    if (listItem && listItem?.children.length > 0) {
      const arr = new Array<Element>();
      for (var i = 0; i < listItem?.children.length; i++) {
        const item = listItem?.children[i];
        if (item.classList.contains(filteredClassString)) arr.push(item);
      }
      // const selectingClass = `${styles.selecting}`;
      const selectingClass = `roulette-selecting`;
      const selectedClass = `roulette-selected`;
      // className={`${styles.subText} mb-2`}
      select(arr, selectingClass, selectedClass, () => {
        setState({ ...state, lsLoading: false });
      });
    }
  }

  // function filteringElem(elem: HTMLElement) {
  //   elem.classList.add(filteredClassString);
  //   // elem.classList.add("bg-gray-400");
  // }

  function onTitleClick(url: string) {
    // const openPopup = () =>
    console.log("onTitleClick");
    window.open(
      // "/popup/youtube?videoId=QykE0eswFH0",
      // "http://place.map.kakao.com/736810177",
      url,
      "popup",
      "top=100, left=300, width=1200, height=600, status=no, menubar=no, toolbar=no, resizable=no"
    );
  }
  function onAddressClick(restaurant: RestaurantInterface) {
    // console.log("onAddressClick");
    // setMapCenter({ lat: Number(y), lng: Number(x) });
    setMapRestaurant(restaurant);
    setMapOpen(!mapOpen);
  }
  return (
    <div
      id="food-roulette-container"
      className="w-full flex justify-center flex-col"
    >
      {/* <div className="w-full flex justify-center">
        lat {state.lat} / lng {state.lng} / lsLoading {state.lsLoading}
      </div> */}
      {/* <div className="w-full flex justify-center items-center flex-col "> */}
      
      <Carousel>
        <h1 className="text-5xl drop-shadow-2xl [text-shadow:_5px_5px_5px_rgb(0_0_0_/_100%)] text-white text-center font-black">
          오늘 뭐먹지?
        </h1>
        <p className="drop-shadow-2xl [text-shadow:_1px_1px_1px_rgb(0_0_0_/_100%)] text-white text-center font-black">
          고민하고 결정하기도 아까운 시간. 오늘 뭐먹을지 대신 선택 해 드립니다.
        </p>
      </Carousel>
      
      <GoogleAd type={`${GoogldAdType.Display}`} />
      {/* </div> */}
      {/* <div className="w-full h-[500px] bg-gray-300">
        <iframe
          className="w-full h-[500px]"
          src="https://place.map.kakao.com/1643013789"
        />
      </div> */}
      <br />
      <br />
      <div className="relative flex flex-row justify-center items-center flex-wrap text-xs sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg flex-wrap">
        {`지금 위치로 부터 반경 `}
        <select
          onChange={(e) =>
            setState({ ...state, radius: Number(e.target.value) })
          }
          value={state.radius}
          className="border"
        >
          <option value={100}>100m</option>
          <option value={200}>200m</option>
          <option value={500}>500m</option>
          <option value={1000}>1km</option>
          <option value={2000}>2km</option>
        </select>
        {"에서 "}
        <button
          disabled={restaurantsLoading || state.lsLoading}
          onClick={() => fetchingRestaurants()}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold px-4 border border-gray-400 rounded shadow disabled:cursor-not-allowed"
        >
          찾기
        </button>
        <div className="ml-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-4 border border-gray-400 rounded shadow disabled:cursor-not-allowed">
          <KakaoShare>
            <button>카카오 공유</button>
          </KakaoShare>
        </div>
        {/* <button onClick={() => drawKong()}>kong test</button> */}
        {/* <button onClick={() => addEffect()}>effect test</button> */}
        {restaurants.length > 0 && (
          <div className="flex flex-wrap ml-1 ">
            {/* {`total: ${restaurants.length}`} */}
            {`total: ${restaurants.length} / 후보: ${
              // document.getElementsByClassName(filteredClassString).length
              filteredRestaurantCnt
            }`}
            <button
              disabled={restaurantsLoading || state.lsLoading}
              onClick={() => selectOne()}
              className="border ml-1 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded disabled:cursor-not-allowed"
            >
              골라줘
            </button>
            <button
              disabled={restaurantsLoading || state.lsLoading}
              onClick={() => mingle()}
              className="border ml-1 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded disabled:cursor-not-allowed"
            >
              섞기
            </button>
            {/* <button
              disabled={restaurantsLoading}
              onClick={() => reduce()}
              className="border ml-1"
            >
              줄이기
            </button> */}
          </div>
        )}
      </div>
      <br />
      <div>
        {restaurantsLoading === false && kinds.size > 0 && (
          <div
            id={filterBtnsContainerId}
            className="flex justify-center items-center flex-wrap text-xs sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg"
          >
            filter:
            {Array.from(kinds).map((k, i) => (
              <button
                key={k}
                onClick={(e) => {
                  if (filteredKinds.has(k)) {
                    // console.log("removing kind");
                    const arr = kindMap.get(k);
                    if (arr && arr.length > 0) {
                      arr.map((item) => {
                        const card = document.getElementById(item.id);
                        // card && filteringElem(card);
                        card && card.classList.remove(filteredClassString);
                        card && card.classList.add(notFilteredClassString);
                      });
                    }
                    // e.currentTarget.classList.add("bg-blue-200");
                    // e.currentTarget.classList.remove("bg-blue-500");
                    filteredKinds.delete(k);
                  } else {
                    // console.log("adding kind");
                    const arr = kindMap.get(k);
                    if (arr && arr.length > 0) {
                      arr.map((item) => {
                        const card = document.getElementById(item.id);
                        // card && filteringElem(card);
                        card && card.classList.remove(notFilteredClassString);
                        card && card.classList.add(filteredClassString);
                      });
                    }
                    // e.currentTarget.classList.add("bg-blue-500");
                    // e.currentTarget.classList.remove("bg-blue-200");
                    filteredKinds.add(k);
                  }
                  
                  // e.currentTarget.
                  setFilteredKinds(new Set(filteredKinds))
                  setFilteredRestaurantCntTrigger(!filteredRestaurantCntTrigger)
                }}
                disabled={restaurantsLoading || state.lsLoading}
                className={`border ml-1 ${filteredKinds.has(k)? 'bg-blue-500':'bg-blue-200'} hover:border hover:border-blue-500 text-white font-bold px-4 rounded disabled:cursor-not-allowed`}
                ref={(elem) => {
                  filterBtnElems.current[i] = elem as HTMLButtonElement;
                }}
              >
                {k}
              </button>
            ))}
          </div>
        )}
      </div>
      <br />
      <p className="text-sm ">※제목을 클릭하면 상세페이지 팝업을 엽니다.</p>
      <p className="text-sm ">※주소를 클릭하면 지도를 보여줍니다.</p>
      <p className="text-sm ">
        ※콩신(한번 더)과 터키 아이스크림(반대로) 아저씨 이벤트를 추가했습니다.
      </p>
      <p className="text-sm ">
        ※filter 항목은 검색된 음식점 종류에 따라 다릅니다.
      </p>
      <p className="text-sm ">
        ※filter 항목을 누르면 음식점을 포함하거나 제외할 수 있습니다.
      </p>
      <p className="text-sm ">
        ※단순 API 사용으로 지점의 리뷰나 별점을 참조하는 기능은 불가능합니다.
        또한 왼쪽 이미지는 로딩이 느려요.
      </p>
      <br />

      <div id={listItmeContainerId} className="relative border">
        {restaurantsLoading ? (
          <>Now loading</>
        ) : (
          restaurants.map((restaurant, i) => (
            <div
              // draggable
              key={i}
              className={`border border-gray-300 p-4 w-full mx-auto ${nanumGothic.className} not-filtered`}
              id={restaurant.id}
              ref={(elem) => {
                restaurantsDivElems.current[i] = elem as HTMLDivElement;
              }}
            >
              {/* <div className="animate-pulse flex space-x-4"> */}
              <div className="w-full flex space-x-4">
                {/* <div
                  className={`${state.lsLoading === false ? "handle" : ""}
                  hidden lg:block hover:cursor-move hover:bg-gray-100 lg:rounded-full lg:h-12 lg:w-12 lg:flex lg:justify-center lg:items-center overflow-hidden`}
                >
                  <BiMove />
                </div> */}
                <div className="hidden basis-4/12 min-h-[200px] relative hidden lg:block overflow-hidden">
                  <div className="w-[800px] h-[500px] pointer-events-none absolute top-[-150px] left-[-270px] scale-50">
                    <iframe
                      frameBorder="0"
                      scrolling="no"
                      src={`${restaurant.place_url.replace(
                        "http://",
                        "https://"
                      )}`}
                      style={{
                        // border: "1px solid black",
                        // position: "absolute",
                        // bottom: "84px",
                        width: "800px",
                        height: "800px",
                        // scale: '0.5'
                      }}
                    />
                  </div>
                </div>
                {/* <div className="flex-1 space-y-4 py-1 overflow-hidden text-ellipsis whitespace-nowrap "> */}
                <div className="flex-1 space-y-4 py-1 overflow-hidden text-ellipsis whitespace-nowrap ">
                  {/* <div className="h-4 bg-gray-400 rounded w-3/4">{title}</div> */}
                  {/* <div className="h-4 w-3/4 cursor-auto hover:pointer-events-none"> */}
                  <div
                    className="no-cursor cursor-pointer h-4 w-3/4 "
                    onClick={() => onTitleClick(restaurant.place_url)}
                  >
                    <strong>
                      {restaurant.place_name}({restaurant.category_name})
                    </strong>
                  </div>
                  <div className="space-y-2">
                    {/* <div className="h-4 bg-gray-400 rounded">{script1}</div> */}
                    <div
                      className="no-cursor cursor-pointer h-4 rounded"
                      onClick={() => onAddressClick(restaurant)}
                    >
                      {restaurant.road_address_name}
                      {/* / ( {restaurant.x} , {restaurant.y} ) */}
                    </div>
                    {/* <div className="h-4 bg-gray-400 rounded w-5/6">{script2}</div> */}
                    <div className="no-cursor cursor-auto h-4 rounded w-5/6">
                      거리: {restaurant.distance}m / 번호:{" "}
                      <a href={`tel:${restaurant.phone}`}>{restaurant.phone}</a>
                      {/* url: {restaurant.place_url} */}
                    </div>
                  </div>
                </div>
                <div
                  className="hidden lg:block rounded-full  h-12 w-12 flex lg:flex justify-center lg:justify-center items-center lg:items-center hover:cursor-pointer hover:bg-gray-200"
                  onClick={(e) => {
                    if (state.lsLoading === false) {
                      const elem =
                        e.currentTarget?.parentElement?.parentElement;
                      elem && elem.classList.remove(filteredClassString);
                      elem && elem.classList.add(notFilteredClassString);
                      setFilteredRestaurantCntTrigger(!filteredRestaurantCntTrigger)
                    }
                  }}
                >
                  <BiTrash />
                </div>
              </div>

              {/* <li>{restaurant.category_group_code}</li> */}
              {/* <li>{restaurant.x}</li> */}
              {/* <li>{restaurant.y}</li> */}
              {/* <li>{restaurant.id}</li> */}
            </div>
          ))
        )}
      </div>

      {restaurants.length > 0 && (
        <Dialog open={mapOpen} setOpen={setMapOpen}>
          <KakaoRestaurant
            width={500}
            height={500}
            restaurant={mapRestaurant}
          />
        </Dialog>
      )}
      {/* <Image
        width={1100}
        height={1427}
        // src={`/images/intro/goodo/3.png`}
        src={`/images/roulette/013_fullscreen_confettie.webp`}
        alt=""
      /> */}
    </div>
  );
}
