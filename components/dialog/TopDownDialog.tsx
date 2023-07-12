import { Dispatch, SetStateAction } from "react";

export default function TopDownDialog({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`z-50 w-full h-screen fixed overflow-y-scroll hidescroll top-0 left-0 right-0 flex justify-center items-center bg-slate-900/20 cursor-pointer transition ease-in-out delay-150 origin-top ${open? 'scale-y-100' : 'scale-y-0'}`}
      onClick={() => setOpen(!open)}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute top-10 pb-20"
      >
        {children}
      </div>
    </div>
  );
}
