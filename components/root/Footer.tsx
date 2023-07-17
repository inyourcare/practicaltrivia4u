import { PrismaClient } from "@prisma/client";
import React from "react";

async function Footer() {
  const prisma = new PrismaClient();
  const businessInfo =
    process.env.NODE_ENV === "development"
      ? {
          name: "4U Entertainment",
          bossName: "권기훈",
          buisinessRegistNumber: "202-18-74326",
          phone: "2719-7294",
          worktime: "(평일,주말) 08:00 ~ 22:00",
          address: "서울특별시 동대문구 왕산로 25",
          partners:
            "상상코칭 | e-상상코칭 | 와와학습코칭센터 | Power English | 솔루트 유학센터",
        }
      : await prisma.businessInfo.findFirst({
          orderBy: {
            createdAt: "desc",
          },
        });
  return (
    <footer>
      {/* {businessInfo?.bossName} */}
      <div className="w-full flex justify-center items-center bg-gray-100 h-[50px] border-y-2 border-gray-200 text-xs md:text-sm mt-[100px]">
        <p>{`COPYRIGHT (C) ${businessInfo?.name}. ALL RIGHTS RESERVED.`}</p>
      </div>
      <div className="w-full flex flex-col pt-[20px] pb-[70px] prose mx-auto text-xs justify-center items-center md:justify-start md:items-start md:text-sm">
        <div className="flex flex-row flex-wrap my-1">
          <p className="my-0">
            <strong>업체명</strong> {businessInfo?.name} |{" "}
          </p>
          <p className="my-0 mx-1">
            {" "}
            <strong>대표자</strong> {businessInfo?.bossName} |{" "}
          </p>
          <p className="my-0">
            {" "}
            <strong>사업자등록번호</strong>{" "}
            {businessInfo?.buisinessRegistNumber}
          </p>
        </div>
        <div className="flex flex-row flex-wrap my-1">
          <p className="my-0">
            <strong>대표전화</strong> {businessInfo?.phone} |{" "}
          </p>
          <p className="my-0 mx-1">{businessInfo?.worktime} |</p>
          <p className="my-0">{businessInfo?.address}</p>
        </div>
        <p className="my-1">
          <strong>제휴사</strong> {businessInfo?.partners}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
