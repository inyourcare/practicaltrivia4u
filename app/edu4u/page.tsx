import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="w-full flex flex-col justify-center items-center ">
        
        <div className="w-[80vw] h-[300px] bg-[url('/images/edu4u/main.png')] bg-no-repeat bg-center bg-cover"></div>
        <div className="w-[80vw]">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            <Link href={"/edu4u/korean"}>
              <div className="pt-[150%]  bg-[url('/images/edu4u/korean.png')] bg-no-repeat bg-center bg-contain hover:cursor-pointer"></div>
            </Link>
            <Link href={"/edu4u/math"}>
              <div className="pt-[150%]  bg-[url('/images/edu4u/math.png')] bg-no-repeat bg-center bg-contain hover:cursor-pointer"></div>
            </Link>
            <Link href={"/edu4u/english"}>
              <div className=" pt-[150%]  bg-[url('/images/edu4u/english.png')] bg-no-repeat bg-center bg-contain hover:cursor-pointer"></div>
            </Link>
            <Link href={"/edu4u/enrichment"}>
              <div className="pt-[150%] bg-[url('/images/edu4u/enrichment.png')] bg-no-repeat bg-center bg-contain hover:cursor-pointer"></div>
            </Link>
          </div>
        </div>
        <div className="w-full flex justify-center items-center ">
          <div className="w-[60vw] pt-[50%] bg-[url('/images/edu4u/why4u.png')] bg-no-repeat bg-center bg-contain"></div>
        </div>
        <div className="w-full flex justify-center items-center mt-10">
          <div className="w-[80vw] pt-[20%] bg-[url('/images/edu4u/review/review_title.png')] bg-no-repeat bg-center bg-contain"></div>
        </div>
        <div className="w-[80vw] h-[550px] overflow-x-auto px-20 flex flex-row flex-nowrap snap-x">
          <div className="min-w-[350px] h-[520px] bg-gray-100 flex flex-col justify-center items-center snap-center p-3">
            <Image
              width={948}
              height={510}
              style={{ width: "350px", height: "250px" }}
              src={`/images/edu4u/review/review1.png`}
              alt=""
            />
            <p className="w-full h-[100px] break-all p-3">
              재미있는 영상과 재미있는 그림으로 설명해 주시고 일대일로
              대화하면서 수업하니까 흥미가 떨어지지 않았어요. 선생님이 칭찬을
              많이 해 주셔서 공부에 대한 자신감이 더 생기는 것 같습니다.
            </p>
          </div>
          <div className="min-w-[350px] h-[520px] bg-gray-100 ml-6 flex flex-col justify-center items-center snap-center p-3">
            <Image
              width={1048}
              height={586}
              style={{ width: "350px", height: "250px" }}
              src={`/images/edu4u/review/review2.png`}
              alt=""
            />
            <p className="w-full h-[100px] break-all p-3">
              학원을 많이 다녔는데 친구들과 실력차이가 나다보니까 적응하기
              힘들고 진도를 너무 빨리 나가서 스트레스였어요. 그래서 공부랑 많이
              멀어졌었는데 선생님과 수업하면서 스스로 공부하는 방법을 알게
              됐어요.{" "}
            </p>
          </div>
          <div className="min-w-[350px] h-[520px] bg-gray-100 ml-6 flex flex-col justify-center items-center snap-center p-3 ">
            <Image
              width={1280}
              height={597}
              style={{ width: "350px", height: "250px" }}
              src={`/images/edu4u/review/review3.png`}
              alt=""
            />
            <p className="w-full h-[100px] break-all p-3">
              공부할시간도 없는데 자료를 혼자 찾으려고하면 시간도 없어서
              답답했는데, 선생님이 도와주셔서 좋았어요. 학원 수업보다 저에게
              맞춤형으로 배려 해 주셔서 더 좋았던 것 같습니다.{" "}
            </p>
          </div>
          <div className="min-w-[350px] h-[520px] bg-gray-100 ml-6 flex flex-col justify-center items-center snap-center p-3">
            <Image
              width={1279}
              height={544}
              style={{ width: "350px", height: "250px" }}
              src={`/images/edu4u/review/review4.png`}
              alt=""
            />
            <p className="w-full h-[100px] break-all p-3">
              교과서 대신 문법 위주로 수업했고 선생님이 직접 준비한 자료가
              좋았어요. 특히 어원을 활용한 암기법을 알려주신게 도움이
              되었습니다. 심리적으로 많이 지쳤을 때 신경써 주셔서 많이 힘이
              되었습니다.
            </p>
          </div>
          <div className="min-w-[350px] h-[520px] bg-gray-100 ml-6 flex flex-col justify-center items-center snap-center p-3">
            <Image
              width={350}
              height={250}
              style={{ width: "350px", height: "250px" }}
              src={`/images/edu4u/review/review5.png`}
              alt=""
            />
            <p className="w-full h-[100px] break-all p-3">
              영어 학원을 꽤 오래 다녔던 저는 모든 학생이 같은 시험을 매번 보며
              결과에 대한 피드백을 받는 것에 스트레스가 점점 심해졌습니다.
              그러던 차에 과외코드 영어과외을 시작하면서 시험에 대한 부담 없이
              제 성향에 맞는 맞춤 수업과 코칭 대화 과정에서 자신감과 학습 의욕이
              많이 생겼습니다.
            </p>
          </div>
          <div className="min-w-[350px] h-[520px] bg-gray-100 ml-6 flex flex-col justify-center items-center snap-center p-3">
            <Image
              width={350}
              height={250}
              style={{ width: "350px", height: "250px" }}
              src={`/images/edu4u/review/review6.png`}
              alt=""
            />
            <p className="w-full h-[100px] break-all p-3">
              나름 많이 알고 있다고 생각했던 저는 첫 수업에서 학원에서 배운
              내용을 정리하면서 생각했던 것과는 다르게 제가 모르는 부분이 많다는
              것을 느꼈습니다.
            </p>
          </div>
          <div className="min-w-[350px] h-[520px] bg-gray-100 ml-6 flex flex-col justify-center items-center snap-center p-3">
            <Image
              width={350}
              height={250}
              style={{ width: "350px", height: "250px" }}
              src={`/images/edu4u/review/review7.png`}
              alt=""
            />
            <p className="w-full h-[100px] break-all p-3">
              고등학교에 진학하고 나서 주변 친구 중에 학업에 집중하는 친구를
              보면서 자극을 받기 시작해서, 좀더 집중적인 수업을 받기 위해 방문
              수업을 알아봤습니다. 그런데 코로나가 확산되는 시기였기 때문에
              대면수업에 대한 부담을 느껴서 화상1:1 수업을 시작했습니다.
            </p>
          </div>
          <div className="min-w-[350px] h-[520px] bg-gray-100 ml-6 flex flex-col justify-center items-center snap-center p-3">
            <Image
              width={350}
              height={250}
              style={{ width: "350px", height: "250px" }}
              src={`/images/edu4u/review/review8.png`}
              alt=""
            />
            <p className="w-full h-[100px] break-all p-3">
              고등학교에 진학하고 나서 주변 친구 중에 학업에 집중하는 친구를
              보면서 자극을 받기 시작해서, 좀더 집중적인 수업을 받기 위해 방문
              수업을 알아봤습니다. 그런데 코로나가 확산되는 시기였기 때문에
              대면수업에 대한 부담을 느껴서 화상1:1 수업을 시작했습니다.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
