"use client";

import { useEffect } from "react";
import Kakaomap from "./Kakaomap";
import { RestaurantInterface } from "./types";

function KakaoRestaurant({
  width,
  height,
  restaurant,
}: {
  width: number;
  height: number;
  restaurant: RestaurantInterface;
}) {
  return (
    <Kakaomap
      width={width}
      height={height}
      lat={Number(restaurant.y)}
      lon={Number(restaurant.x)}
      title={restaurant.place_name}
    />
  );
}
export default KakaoRestaurant;
