import { Dispatch, SetStateAction } from "react";

export default function Dialog({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  if (open === false) return <></>;
  else
    return (
      <div
        className="w-full h-screen fixed top-0 left-0 right-0 flex justify-center items-center bg-slate-900/50 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          // className="opacity-100"
        >
          {children}
        </div>
      </div>
    );
}
