"use client";
import { useState } from "react";
import TopDownDialog from "../dialog/TopDownDialog";
import AskForm from "@/components/ask/Form";

export default function Edu4UFooter() {
  const [askDialogOpen, setAskDialogOpen] = useState(false);
  return (
    <>
      <TopDownDialog open={askDialogOpen} setOpen={setAskDialogOpen}>
        <AskForm setIsOpen={setAskDialogOpen} />
      </TopDownDialog>
      <div className="hidden md:block ">
        <div className="w-full flex justify-center items-center">
        <div
          className="w-[80vw] h-[100px] p-10 text-center flex justify-center items-center bg-slate-500 mt-10 font-black text-5xl text-white cursor-pointer rounded-lg"
          onClick={() => setAskDialogOpen(true)}
        >
          상담 문의하기
        </div>
        </div>
      </div>
      <div
        className={`block md:hidden w-full cursor-pointer ${
          askDialogOpen && "origin-bottom scale-y-0"
        }`}
      >
        <div
          className={`fixed bottom-0 w-full h-[70px] bg-blue-100 flex flex-row `}
        >
          <div className="w-1/2 p-10 text-center flex justify-center items-center bg-green-300 font-black text-2xl text-white cursor-pointer rounded-lg">
            <a href="tel:27197294">전화상담</a>
          </div>
          <div
            className="w-1/2 p-10 text-center flex justify-center items-center bg-rose-500 font-black text-2xl text-white cursor-pointer rounded-lg"
            onClick={() => setAskDialogOpen(!askDialogOpen)}
          >
            상담문의
          </div>
        </div>
      </div>
    </>
  );
}
