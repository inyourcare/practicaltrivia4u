import Link from "next/link";

function Pagination({
  pages,
}: {
  pages: { page: number; totalPageCount: number; limit: number; total: number };
}) {
  const pageIdx = pages.page;
  const splitCnt = pages.limit;
  const idx = pageIdx * pages.limit;
  // const initialState = {
  //   splitCnt: pages.limit,
  //   idx: pageIdx * pages.limit,
  // };
  // const [state, setState] = useState(initialState);
  // useEffect(() => {
  //   const nextPageIdx = state.idx / pages.limit;
  //   if (pageIdx !== nextPageIdx) {
  //     redirect(`/post/list/${nextPageIdx}`);
  //   }
  // }, [pageIdx, pages.limit, state.idx]);

  return (
    <>
      {/* {`page:${pages.page},limit:${pages.limit},total:${pages.total},pageIdx:${pageIdx},stateSplit:${state.splitCnt},stateIdx:${state.idx}`} */}
      {/* {`page:${pages.page},limit:${pages.limit},total:${pages.total},pageIdx:${pageIdx},totalPageCount:${pages.totalPageCount}`} */}
      {/* {postPreviews.slice(state.idx, state.idx + state.splitCnt)} */}
      {pages.total > 0 && (
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row items-center w-5/6 sm:w-5/6 md:w-4/6 lg:w-4/6 xl:w-4/6 2xl:w-3/6 justify-evenly mx-auto">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {idx + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.min(idx + splitCnt, pages.total)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {pages.total}
            </span>{" "}
            Entries
          </span>

          {/* <div className="inline-flex justify-evenly w-5/6 sm:w-5/6 md:w-3/6 lg:w-3/6 xl:w-4/6 2xl:w-2/6"> */}
          <div className="inline-flex justify-evenly w-7/12 sm:w-7/12 md:w-5/12 lg:w-5/12 xl:w-6/12 2xl:w-4/12">
            {/* <button
              // href={"/"}
              className="h-10 mx-auto  w-[100px] my-14 gap-2.5 inline-flex flex-col justify-center items-center rounded-lg text-center font-medium bg-[rgba(235,242,254,1)] text-[rgba(35,46,82,1)]"
              onClick={() =>
                setState({ ...state, idx: state.idx - state.splitCnt })
              }
              disabled={state.idx - state.splitCnt < 0}
            >
              Prev
            </button> */}
            <Link
              href={`/post/list/${pageIdx - 1}`}
              className={`${idx - splitCnt < 0 && "pointer-events-none"}`}
            >
              <div className="h-10 mx-auto  w-[100px] my-14 gap-2.5 inline-flex flex-col justify-center items-center rounded-lg text-center font-medium bg-[rgba(235,242,254,1)] text-[rgba(35,46,82,1)]">
                Prev
              </div>
            </Link>
            {new Array(pages.totalPageCount).slice(Math.max(pages.page-5,0),Math.min(pages.page+5,pages.totalPageCount)).fill(0).map((item, arrIdx) => (
              <Link
                key={arrIdx}
                href={`/post/list/${arrIdx}`}
                className={`${
                  arrIdx + 1 > pages.totalPageCount && "pointer-events-none"
                }`}
              >
                <div className="h-10 mx-auto w-[20px] my-14 gap-2.5 inline-flex justify-center items-center hover:underline hover:underline-offset-4">{arrIdx + 1}</div>
              </Link>
            ))}
            <Link
              href={`/post/list/${pageIdx + 1}`}
              className={`${
                idx + splitCnt >= pages.total && "pointer-events-none"
              }`}
            >
              <div className="h-10 mx-auto  w-[100px] my-14 gap-2.5 inline-flex flex-col justify-center items-center rounded-lg text-center font-medium bg-[rgba(235,242,254,1)] text-[rgba(35,46,82,1)]">
                Next
              </div>
            </Link>
            {/* <button
              // href={"/"}
              className="h-10 mx-auto  w-[100px] my-14 gap-2.5 inline-flex flex-col justify-center items-center rounded-lg text-center font-medium bg-[rgba(235,242,254,1)] text-[rgba(35,46,82,1)]"
              onClick={() =>
                setState({ ...state, idx: state.idx + state.splitCnt })
              }
              disabled={state.idx + state.splitCnt >= pages.total}
            >
              Next
            </button> */}
          </div>
        </div>
      )}
    </>
  );
}

export default Pagination;
