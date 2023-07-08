import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const { lat, lng, radius, query } = body;
  const size = 15; // max is 15
  let page = 1;
  let isEnd = false;
  // let restaurantsArr = new Array<any>();
  const restaurantsArr = new Array<any>();

  const firstFetched = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?y=${lat}&x=${lng}&radius=${radius}&query=${query}&size=${size}&page=${page}&category_group_code=FD6`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    }
  );
  const firstFetchedJsonData = await firstFetched.json();
  const meta = firstFetchedJsonData.meta;
  // restaurantsArr = restaurantsArr.concat(firstFetchedJsonData.documents);
  restaurantsArr.push(...firstFetchedJsonData.documents);
  console.log("meta", meta);
  // console.log("total count", meta.total_count);
  const repeatCountMax = meta.pageable_count / size + 1;
  for (page = page + 1; page < repeatCountMax; page++) {
    const fetched = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?y=${lat}&x=${lng}&radius=${radius}&query=${query}&size=${size}&page=${page}&category_group_code=FD6`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      }
    );
    const jsonData = await fetched.json();
    // restaurantsArr = restaurantsArr.concat(jsonData.documents);
    restaurantsArr.push(...jsonData.documents);

    console.log(
      `https://dapi.kakao.com/v2/local/search/keyword.json?y=${lat}&x=${lng}&radius=${radius}&query=${query}&size=${size}&page=${page}`,
      jsonData.documents.length
    );
  }

  return NextResponse.json({ data: restaurantsArr });

}
