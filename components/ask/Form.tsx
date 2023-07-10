"use client";

import emailjs from "@emailjs/browser";
import {
  FormEvent,
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

export default function Form({
  setIsOpen,
}: {
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedKind, setSelectedKind] = useState("");
  const [address, setAddress] = useState("");

  const form = useRef<HTMLFormElement>(null);

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
    if (fullAddress) setAddress(fullAddress);
  };

  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);
    try {
      const fetchBody = {
        name: (
          form.current?.querySelector("input[name='name']") as HTMLInputElement
        ).value,
        // kind: (
        //   form.current?.querySelector("input[name='kind']") as HTMLInputElement
        // ).value,
        kind: selectedKind,
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
        description: (
          form.current?.querySelector(
            "textarea[name='description']"
          ) as HTMLInputElement
        ).value,
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
          alert("정상적으로 문의되었습니다. 연락을 기다려 주세요! :D");
          if (setIsOpen) setIsOpen(false);
        })
        .catch(() => {
          alert(
            "문의하기 프로세스 중 문제가 발생했습니다. 잠시 후 다시 시도 해 주세요 :("
          );
          if (setIsOpen) setIsOpen(false);
        })
        .finally(() => setIsProcessing(false));
    } catch (error) {
      console.log(error);
    }
  };

  const daumPostOpen = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );
  return (
    <>
      <form
        className="bg-gray-200 shadow-md rounded px-3 pt-3 pb-8 w-full text-xs"
        ref={form}
        onSubmit={(e) => onSubmitForm(e)}
      >
        <div className="w-full flex flex-nowrap justify-between">
          <span className="w-1/2">
            <label
              className="block text-black text-xs font-bold my-1"
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
              문의하실 분야
            </label>
            <select
              className="shadow appearance-none border rounded w-11/12 py-2 px-1 text-black"
              value={selectedKind}
              onChange={(e) => setSelectedKind(e.target.value)}
              name="kind"
              required
            >
              <option value={""}>선택없음</option>
              <optgroup label="과외">
                <option value={"/sangsang"}>{`상상코칭`}</option>
                <option value={"/goodo"}>{`공부구도`}</option>
                <option value={"/howcoding"}>{`하우코딩`}</option>
                <option value={"/mindfulness"}>
                  {`마음키움`}
                </option>
                <option value={"/ipsi"}>{`입시`}</option>
              </optgroup>

              <optgroup label="회화">
                <option value={"/conversation"}>
                  {`회화`}
                </option>
              </optgroup>

              <optgroup label="학원">
                <option value={"/wawa"}>{`와와`}</option>
              </optgroup>

              <optgroup label="유학">
                <option value={"/solute"}>{`솔루트`}</option>
              </optgroup>
              <optgroup label="기타">
                <option value={"/developing"}>{`개발`}</option>
              </optgroup>
            </select>
          </span>
        </div>
        <label className="block text-black text-xs font-bold my-1">주소</label>
        <div className="flex flex-wrap justify-between">
          <input
            className="shadow appearance-none border rounded w-8/12 py-2 px-1 text-black"
            value={address}
            readOnly
            onClick={() => daumPostOpen({ onComplete: handleComplete })}
            name="address"
            required
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
        <label className="block text-black text-xs font-bold my-1">
          기타사항
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
          rows={4}
          placeholder="전화 가능 시간, 수업이 필요한 이유, 약점과 강점, 공부 성향 등"
          name="description"
        />
        <div className={"w-full h-24 flex flex-row-reverse items-end mt-5"}>
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
            문의하기
          </button>
        </div>
      </form>
    </>
  );
}
