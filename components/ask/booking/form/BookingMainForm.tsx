"use client";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useDaumPostcodePopup } from "react-daum-postcode";

export default function BookingMainForm({
  branch,
  address,
}: {
  branch: string | undefined;
  address: string;
}) {
  const form = useRef<HTMLFormElement>(null);
  const [privateInfoAgree, setPrivateInfoAgree] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingMainFormAddress, setBookingMainFormAddress] = useState(address);
  const [selectedGrade, setSelectedGrade] = useState("");
  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!privateInfoAgree) {
      alert("이용약관을 동의 해 주세요.");
      const checkbox = document.getElementById(
        "privateInfoAgreeInputId"
      ) as HTMLInputElement;
      checkbox.focus();
      return;
    }
    setIsProcessing(true);
    try {
      const fetchBody = {
        name: (
          form.current?.querySelector("input[name='name']") as HTMLInputElement
        ).value,
        kind: "wawa",
        address: (
          form.current?.querySelector(
            "input[name='address']"
          ) as HTMLInputElement
        ).value,
        address2: (
          form.current?.querySelector(
            "input[name='address2']"
          ) as HTMLInputElement
        ).value,
        phone: (
          form.current?.querySelector("input[name='phone']") as HTMLInputElement
        ).value,
        branch: branch,
        description: `학생학년:${selectedGrade}`,
      };
      console.debug("fetchBody::", fetchBody);
      await fetch(`/api/contactinfo/create`, {
        method: "POST",
        body: JSON.stringify(fetchBody),
        headers: { "Content-Type": "application/json" },
      })
        .then((contactInfo) => {
          console.debug("contactInfo create successfully::", contactInfo);
          return emailjs
            .sendForm(
              process.env.NEXT_PUBLIC_NEXT_PUBLIC_MAIL_SERVER_KEY as string,
              process.env.NEXT_PUBLIC_MAIL_TEMPLATE_KEY as string,
              form.current ? form.current : "",
              process.env.NEXT_PUBLIC_MAIL_PRIVATE_KEY as string
            )
            .then(
              function (response) {
                console.log("SUCCESS!", response.status, response.text);
              },
              function (error) {
                console.log("FAILED...", error);
              }
            );
        })
        .then(() => {
          alert("정상적으로 신청되었습니다. 연락을 기다려 주세요! :D");
        })
        .catch(() => {
          alert(
            "상담신청 프로세스 중 문제가 발생했습니다. 잠시 후 다시 시도 해 주세요 :("
          );
        })
        .finally(() => setIsProcessing(false));
    } catch (error) {
      console.log(error);
    }
  };

  const daumPostOpen = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    if (fullAddress) setBookingMainFormAddress(fullAddress);
  };
  return (
    <div className="w-full">
      {/* 예약신청폼 */}
      <div
        className={`p-1 bg-[url('/images/ask/booking/ask-booking-bg.png')] bg-no-repeat bg-center bg-cover `}
      >
        <Image
          width={500}
          height={250}
          style={{ maxHeight: "250px" }}
          className="rounded-md"
          src={`/images/ask/booking/banner.png`}
          alt=""
        />
      </div>
      <div className="flex justify-center items-center flex-col">
        <h4 className="text-black text-sm font-bold my-3 ml-3 truncate w-full">
          {branch} 상담예약
        </h4>
        <form
          className={`px-3 pt-3 pb-8 w-full text-xs`}
          ref={form}
          onSubmit={(e) => onSubmitForm(e)}
        >
          <div className="w-full flex flex-nowrap justify-between">
            <span className="w-1/2">
              <label
                className="block text-black text-xs font-bold my-1 truncate"
                // onClick={() => test()}
              >
                상담 받으실 분 성함
              </label>
              <input
                className="shadow appearance-none border rounded w-11/12 py-2 px-1 text-black"
                placeholder="예) 이름:홍길동"
                name="name"
                required
              />
            </span>
            <span className="w-1/2">
              <label className="block text-black text-xs font-bold my-1">
                전화번호
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                // placeholder="예) 이름:010-1234-1234"
                type="tel"
                placeholder="00*-000*-0000"
                pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}"
                maxLength={13}
                name="phone"
                required
              />
            </span>
          </div>
          <div className="w-full flex flex-nowrap justify-between">
            <span className="w-1/2">
              <label className="block text-black text-xs font-bold my-1 truncate">
                학생 학년 (선택)
              </label>
              <select
                // id={kindSelectId}
                className="shadow appearance-none border rounded w-11/12 py-2 px-1 text-black"
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                name="kind"
                required
              >
                <optgroup label="초등">
                  <option value={`elem1`}>{`초등 1학년`}</option>
                  <option value={`elem2`}>{`초등 2학년`}</option>
                  <option value={`elem3`}>{`초등 3학년`}</option>
                  <option value={`elem4`}>{`초등 4학년`}</option>
                  <option value={`elem5`}>{`초등 5학년`}</option>
                  <option value={`elem6`}>{`초등 6학년`}</option>
                </optgroup>
                <optgroup label="중등">
                  <option value={`middle1`}>{`중등 1학년`}</option>
                  <option value={`middle2`}>{`중등 2학년`}</option>
                  <option value={`middle3`}>{`중등 3학년`}</option>
                </optgroup>
                <optgroup label="고등">
                  <option value={`high1`}>{`고등 1학년`}</option>
                  <option value={`high2`}>{`고등 2학년`}</option>
                  <option value={`high3`}>{`고등 3학년`}</option>
                </optgroup>
                <optgroup label="기타">
                  <option value={`etc`}>{`기타`}</option>
                </optgroup>
              </select>
            </span>
          </div>
          <label className="block text-black text-xs font-bold my-1">
            주소(※빠르고 정확한 상담을 위해 정확히 입력 부탁드려요.)
          </label>
          <div className="flex flex-wrap justify-between">
            <input
              className="shadow appearance-none border rounded w-8/12 py-2 px-1 text-black"
              value={address}
              readOnly
              onClick={() => daumPostOpen({ onComplete: handleComplete })}
              name="address"
            />
            <input
              className="shadow appearance-none border rounded w-4/12 py-2 px-1 text-black"
              placeholder="상세주소입력"
              name="address2"
            />
            {/* <span className="shadow appearance-none border">
                  <DaumPostPopupOpenBtn setAddress={setAddress} />
                </span> */}
          </div>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-1 text-black mt-5"
            rows={4}
            readOnly
            value={`1. 수집하는 개인정보의 항목: 이름, 학년, 핸드폰번호, 거주지역
2. 개인정보의 수집 이용 목적: 상담신청에 대한 응대
3. 개인정보의 보유 및 이용기간: 상담신청 정보는 신청일을 기준으로 2개월 동안 보관 후 삭제합니다.
4. 개인정보의 파기: 수집 및 이용목적 달성 또는 동의철회를 하는 경우, 분쇄/소각 등 재생 불가능한 방법으로 지체 없이 파기 함
5. 위와 같이 개인정보를 수집/이용에 대한 동의를 거부할 권리가 있습니다. 동의를 거부할 경우 무료상담을 받으실 수 없음을 알려드립니다.
☞ 고객의 개인정보는 당사의 기술적 관리적 보호조치에 따라 안전하게 보관됨을 알려드립니다.
☞ 고객의 개인정보처리지침에 대한 자세한 내용은 당사 홈페이지 내 개인정보처리방침을 참고하시기 바랍니다.`}
          />
          <div className="w-full flex flex-row-reverse">
            <label className="flex justify-center items-center">
              <input
                id="privateInfoAgreeInputId"
                type="checkbox"
                className="mx-1 flex justify-center items-center"
                checked={privateInfoAgree}
                onChange={(e) => setPrivateInfoAgree(e.target.checked)}
              />
              개인정보동의, 수집하는 개인정보 항목 이용에 모두 동의합니다.
            </label>
          </div>
          <div className={"w-full h-10 flex flex-row-reverse items-end mt-5"}>
            <button
              className={
                // "absolute bottom-2 right-10 rounded-xl bg-gray-300 p-2 min-w-[90px] justify-center items-center border text-xs font-bold " +
                " rounded-xl bg-gray-300 p-2 min-w-[90px] justify-center items-center border text-xs font-bold " +
                "max-h-[80px] h-10"
                // (isProcessing ? "disabled" : "")
              }
              type="submit"
              value="submit"
              disabled={isProcessing}
            >
              신청하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
