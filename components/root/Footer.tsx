import { PrismaClient } from "@prisma/client";
import React from "react";

async function Footer() {
  const prisma = new PrismaClient();
  const businessInfo = await prisma.businessInfo.findFirst({
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
      <div className="w-full flex flex-col py-[20px] prose mx-auto text-sm ">
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
