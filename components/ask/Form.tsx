"use client";

import emailjs from "@emailjs/browser";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  const [privateInfoAgree, setPrivateInfoAgree] = useState(false);

  const form = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
  const kindSelectId = "kind-select";

  const kinds = {
    edu4u: "edu4u",
    sangsang: "sangsang",
    howcoding: "howcoding",
    goodo: "goodo",
    wawa: "wawa",
    mindfulness: "mindfulness",
    ipsi: "ipsi",
    power_english: "power_english",
    power_japan: "power_japan",
    power_china: "power_china",
    solute: "solute",
    etc: "etc",
  };
  useEffect(() => {
    // const selectElem = document.getElementById(kindSelectId) as HTMLSelectElement
    const kindKey = pathname.split('/').pop()?.trim();
    console.info("select kind from pathname , ", kindKey);
    switch (kindKey) {
      case kinds.edu4u:
        setSelectedKind(kinds.edu4u);
        break;
      case kinds.sangsang:
        setSelectedKind(kinds.sangsang);
        break;
      case kinds.howcoding:
        setSelectedKind(kinds.howcoding);
        break;
      case kinds.goodo:
        setSelectedKind(kinds.goodo);
        break;
      case kinds.wawa:
        setSelectedKind(kinds.wawa);
        break;
      case kinds.mindfulness:
        setSelectedKind(kinds.mindfulness);
        break;
      case "power":
        setSelectedKind(kinds.power_english);
        break;

      default:
        break;
    }
  }, [
    kinds.edu4u,
    kinds.goodo,
    kinds.howcoding,
    kinds.mindfulness,
    kinds.power_english,
    kinds.sangsang,
    kinds.wawa,
    pathname,
  ]);

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
    <div className="w-[80vw] bg-gray-100 pb-10 pt-3 px-5 max-w-[650px] rounded-lg shadow-lg">
      <header className="w-full h-20 bg-gray-200 border-b-2 border-gray-300 flex justify-center items-center text-2xl text-slate-600">
        상담신청
      </header>
      <div className="p-1 bg-gray-200 border-b-2 border-gray-300">
        <Image
          width={1080}
          height={1080}
          style={{ maxHeight: "150px" }}
          className="rounded-md"
          src={`/images/edu4u/bg_asktop.png`}
          alt=""
        />
      </div>
      <form
        className="bg-gray-200 rounded-md shadow-md px-3 pt-3 pb-8 w-full text-xs"
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
            <label className="block text-black text-xs font-bold my-1 truncate">
              문의하실 분야
            </label>
            <select
              id={kindSelectId}
              className="shadow appearance-none border rounded w-11/12 py-2 px-1 text-black"
              value={selectedKind}
              onChange={(e) => setSelectedKind(e.target.value)}
              name="kind"
              required
            >
              <option value={""}>선택없음</option>

              <optgroup label="4U">
                <option value={kinds.edu4u}>{`과외4U`}</option>
              </optgroup>
              <optgroup label="파트너스">
                <option value={kinds.sangsang}>{`상상코칭`}</option>
                <option value={kinds.howcoding}>{`하우코딩`}</option>
                <option value={kinds.goodo}>{`공부구도`}</option>
                <option value={kinds.wawa}>{`와와`}</option>
                <option value={kinds.mindfulness}>{`마음키움`}</option>
                <option value={kinds.ipsi}>{`입시`}</option>
                <option value={kinds.power_english}>{`파워잉글리쉬`}</option>
                <option value={kinds.power_japan}>{`파워재팬`}</option>
                <option value={kinds.power_china}>{`파워차이나`}</option>
                <option value={kinds.solute}>{`솔루트유학`}</option>
              </optgroup>
              <optgroup label="기타문의">
                <option value={kinds.etc}>{`기타문의`}</option>
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
            문의하기
          </button>
          <div
            className={
              // "absolute bottom-2 right-10 rounded-xl bg-gray-300 p-2 min-w-[90px] justify-center items-center border text-xs font-bold " +
              " rounded-xl bg-rose-500 p-2 min-w-[90px] justify-center items-center border text-xs font-bold " +
              "max-h-[80px] h-10 flex justify-center items-center"
              // (isProcessing ? "disabled" : "")
            }
            onClick={() =>
              setIsOpen && isProcessing === false && setIsOpen(false)
            }
          >
            취소
          </div>
        </div>
      </form>
    </div>
  );
}
