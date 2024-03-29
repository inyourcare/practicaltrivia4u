import Footer from "@/components/root/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Nanum_Gothic } from "next/font/google";
import Script from "next/script";
const nanumGothic = Nanum_Gothic({ weight: "400", subsets: ["latin"] });

declare global {
  interface Window {
    Kakao: any;
    kakao: any;
    YT: any;
    naver: any;
    dataLayer: any;
    // speech recognition
    SpeechRecognition:any;
    webkitSpeechRecognition:any;
  }
}

export const metadata: Metadata = {
  title: "4U - 사소하지만 유용한 Practical Trivia",
  description: "교육 서비스 및 사소하지만 유용한 것들을 다룹니다.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
  },
};

function kakaoInit() { // 페이지가 로드되면 실행
  window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
  console.log(window.Kakao.isInitialized());
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* favicon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        {/* 카카오 */}
        <script
          defer
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
        ></script>
        <script
          defer
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&libraries=services,clusterer&autoload=false`}
        ></script>
        {/* <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&libraries=services,clusterer&autoload=false`}
          // src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JAVASCRIPT_KEY}`}
          // strategy="beforeInteractive"
          strategy="lazyOnload"
        /> */}
        {/* 네이버 */}
        <script
          defer
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
        />
        <meta
          name="naver-site-verification"
          content="2bcce2baa1fc6bf384c15035f653a7c768d5e6bc"
        />
        {/* 구글 */}
        {process.env.NODE_ENV !== "development" && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8425397323378076"
            // crossorigin="anonymous"
            crossOrigin="anonymous"
          ></script>
        )}
        {/* <!-- Google tag (gtag.js) --> */}
        {process.env.NODE_ENV !== "development" && (
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-08E5CNK7PL"
          ></Script>
        )}
        {process.env.NODE_ENV !== "development" && (
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GA_MEASUREMENT_ID');
        `}
          </Script>
        )}
        {/* sortable */}
        <script defer src="/js/sortable/Sortable.min.js"></script>
        {/* mobile scale */}
        {/* <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" /> */}
      </head>
      <body className={nanumGothic.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
