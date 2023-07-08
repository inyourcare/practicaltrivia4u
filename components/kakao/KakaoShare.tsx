"use client";

import { useEffect } from "react";

export default function KakaoShare({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (window.Kakao) {
      console.log("kakao instance");
      if (!window.Kakao.isInitialized())
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    } else {
      console.log("no kakao instance", window.Kakao);
    }
  }, []);

  const kakaoSendScrap = () => {
    const { Kakao, location } = window;
    Kakao.Link.sendScrap({
      // templateId: 94996,
      requestUrl: location.href,
    });
  };
  return (
    <div onClick={() => kakaoSendScrap()}>
      {children}
    </div>
  );
}
