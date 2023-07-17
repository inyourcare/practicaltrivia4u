import { PrismaClient } from "@prisma/client";
import React from "react";

async function Footer() {
  const prisma = new PrismaClient();
  const businessInfo =
    process.env.NODE_ENV === "development"
      ? {
          name: "test",
          bossName: "boss",
          buisinessRegistNumber: "00",
          phone: "00",
          worktime: "00",
          address: "00",
          partners: "00",
        }
      : await prisma.businessInfo.findFirst({
          orderBy: {
            createdAt: "desc",
          },
        });
  return (
    <footer>
      {/* {businessInfo?.bossName} */}
      <div className="w-full flex justify-center items-center bg-gray-100 h-[50px] border-y-2 border-gray-200 text-sm mt-[100px]">
        <p>{`COPYRIGHT (C) ${businessInfo?.name}. ALL RIGHTS RESERVED.`}</p>
      </div>
      <div className="w-full flex flex-col py-[20px] prose mx-auto text-xs justify-center items-center md:justify-start md:items-start md:text-sm">
        <p className="my-1">
          <strong>업체명</strong> {businessInfo?.name} | <strong>대표자</strong>{" "}
          {businessInfo?.bossName} | <strong>사업자등록번호</strong>{" "}
          {businessInfo?.buisinessRegistNumber}
        </p>
        <p className="my-1">
          <strong>대표전화</strong> {businessInfo?.phone} |{" "}
          {businessInfo?.worktime} | {businessInfo?.address}
        </p>
        <p className="my-1">
          <strong>제휴사</strong> {businessInfo?.partners}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
