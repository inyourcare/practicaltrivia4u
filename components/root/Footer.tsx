import React from "react";

function Footer() {
  return (
    <footer>
      <div className="w-full flex justify-center items-center bg-gray-100 h-[50px] border-y-2 border-gray-200 text-sm mt-[100px]">
        <p>{`COPYRIGHT (C) 과외4U. ALL RIGHTS RESERVED.`}</p>
      </div>
      <div className="w-full flex flex-col py-[20px] prose mx-auto text-sm ">
        <p className="my-1">
          <strong>업체명</strong> 과외4U | <strong>대표자</strong> 권기훈 |{" "}
          <strong>사업자등록번호</strong> 603-21-65656
        </p>
        <p className="my-1">
          <strong>대표전화</strong> 5961-5807 | (평일, 주말) 08:00 ~ 22:00 |
          서울특별시 동대문구 왕산로 25
        </p>
        <p className="my-1">
          <strong>제휴사</strong> 상상코칭 | e-상상코칭 | 와와학습코칭센터 |
          Power English | 쏠루트 유학센터
        </p>
      </div>
    </footer>
  );
}

export default Footer;
