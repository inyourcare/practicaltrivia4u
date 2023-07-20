import { HookGetCurrentPosition } from "@/components/hooks/HookGetCurrentPosition";
import BokingMain from "./BokingMain";

export const getWawaBranchesList = async (conditions?:any) =>
  await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/wawaBranches/list`, {
    method: "POST",
    body: JSON.stringify({
      page: 0,
      limit: 1000,
      // conditions: {
      // creator: {
      // email: 'admin@sotong.co.kr'
      // email
      //     ...(email && { email: email })
      // }
      // }
      // conditions
      conditions: conditions,
    }),
    headers: { "Content-Type": "application/json" },
  }).then(async (result) => {
    const { wawaBranches, pages } = await result.json();
    // console.log(wawaBranches, pages);
    return [wawaBranches, pages];
  });
export default async function BookingForm({branchName}:{branchName?:string}) {
  const [wawaBranches, pages] = await getWawaBranchesList();
  return (
    <>
      {/* <div>Branch: {branch}</div> */}

      <div className="flex justify-center items-center flex-col p-0 md:px-20">
        <BokingMain wawaBranches={wawaBranches} branchName={branchName}/>
      </div>
    </>
  );
}
