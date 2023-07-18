"use client";
import { useEffect, useState } from "react";

export const HookGetCurrentPosition = () => {
  const [position, setPosition] = useState({
    lat: 37,
    lng: 127,
  });

  useEffect(() => {
    const { geolocation } = navigator;
    geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("Fail to fetch current location", error);
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

  return position
};
