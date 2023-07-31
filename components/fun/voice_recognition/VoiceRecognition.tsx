"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Word } from "@prisma/client";
import { levels } from "./levels";
import { textToSpeech } from "./textToSpeech";
import { configuration } from "./configuration";
import { GiSpeaker } from "react-icons/gi";
import RefreshMicrophoneIcon from "./RefreshMicrophoneIcon";
import GoogleAd from "@/components/adsense/GoogleAd";
import { GoogldAdType } from "@/components/adsense/type";
import Dialog from "@/components/dialog/Dialog";
import { clickToScreenShot } from "./screenshot";
import Image from "next/image";
import "./voicerecognition.css";

type WordResult = {
  tried: Word;
  spoken?: string;
  pass: boolean;
  time: Date;
  guessedMeaning?: string;
};

let failcount = 0;
export default function VoiceRecognition({ words }: { words: Word[] }) {
  const [spoken, setSpoken] = useState("");
  const [filteredLevels, setFilteredLevels] = useState(new Set<string>());
  const [filteredWords, setFilteredWords] = useState(null as unknown as Word[]);
  // const [screenExpression, setScreenExpression] = useState({
  //   spell: "",
  //   meaning: "",
  // });
  const [screenWord, setScreenWord] = useState(null as unknown as Word);
  const [todayResult, setTodayResult] = useState(new Array<WordResult>());
  const [result, setResult] = useState(null as unknown as WordResult);
  const [guessingMeaning, setGuessingMeaning] = useState("");
  const [guessMode, setGuessMode] = useState(false);
  const guessOffMsg = "guess off";
  const [resultsDialogOpen, setResultsDialogOpen] = useState(false);
  const resultDivOuter = useRef<HTMLDivElement>(null);
  const resultDivInner = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);
  const [isStart, setIsStart] = useState(true);
  function startAndRefreshSpeechRecognition() {
    if (
      window &&
      (window.SpeechRecognition || window.webkitSpeechRecognition)
    ) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      // true면 음절을 연속적으로 인식하나 false면 한 음절만 기록함
      recognition.interimResults = true;
      // 값이 없으면 HTML의 <html lang="en">을 참고합니다. ko-KR, en-US
      // recognition.lang = "ko-KR";
      recognition.lang = configuration.lang;
      // true means continuous, and false means not continuous (single result each time.)
      // true면 음성 인식이 안 끝나고 계속 됩니다.
      recognition.continuous = true;
      // 숫자가 작을수록 발음대로 적고, 크면 문장의 적합도에 따라 알맞은 단어로 대체합니다.
      // maxAlternatives가 크면 이상한 단어도 문장에 적합하게 알아서 수정합니다.
      recognition.maxAlternatives = 10000;
      // setSpeechRecognition(recognition);

      let speechToText = "";
      recognition.addEventListener("result", (e: any) => {
        let interimTranscript = "";
        // console.log("recognition result");
        for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
          let transcript = e.results[i][0].transcript;
          const isFinal = e.results[i].isFinal;
          if (e.results[i].isFinal) {
            // console.log(transcript);
            setSpoken(transcript);
          }
        }
      });

      // 음성인식이 끝나면 자동으로 재시작합니다.
      // recognition.addEventListener("end", recognition.start);

      // 음성 인식 시작
      recognition.start();
      console.log("speech recognition starts");
    }
  }
  const getRandomIndexOfFilteredWords = useCallback(() => {
    return (
      (filteredWords &&
        filteredWords.length > 0 &&
        Math.floor(Math.random() * filteredWords.length)) ||
      0
    );
  }, [filteredWords]);
  function setResultAndChangeExporession(args?: { skip?: boolean }) {
    if (screenWord) {
      const spokenStr = spoken.trim().toLowerCase().replace(" ", "");
      const screenStrNolized = screenWord.spell
        .replace("+root", "")
        .trim()
        .toLowerCase();
      const screenStr = screenStrNolized.replace(" ", "");
      // const resultWords = words.filter((w) => w.spell === screenWord.spell);

      // skip
      if (args?.skip) {
        // result manage
        // console.log(resultWords);
        setResult({
          tried: screenWord,
          spoken: spokenStr,
          pass: false,
          time: new Date(),
          guessedMeaning: (guessMode && guessingMeaning) || guessOffMsg,
        });
        const idx = getRandomIndexOfFilteredWords();
        setScreenWord(filteredWords[idx]);

        setGuessingMeaning("");
        setIsStuck(false);
        failcount = 0;
        setIsStart(false);
      } else {
        if (
          filteredWords &&
          filteredWords.length > 0 &&
          spokenStr &&
          screenStr
        ) {
          // pass
          if (spokenStr === screenStr || spoken.includes(screenStrNolized)) {
            // result manage
            setResult({
              tried: screenWord,
              spoken: spokenStr,
              pass: true,
              time: new Date(),
              guessedMeaning: (guessMode && guessingMeaning) || guessOffMsg,
            });
            const idx = getRandomIndexOfFilteredWords();
            setScreenWord(filteredWords[idx]);

            setGuessingMeaning("");
            setIsStuck(false);
            failcount = 0;
            setIsStart(false);
          } else {
            failcount += 1;
            if (failcount > 2) {
              setIsStuck(true);
            }
          }
        }
      }
    }
  }

  /////////////////////////////////////// use effect ////////////////////////////////////////////////////////////
  const initiateAudioInput = useEffect(() => {
    startAndRefreshSpeechRecognition();

    // console.log(words)
    // console.log();
  }, [words]);
  const syncronizeFilteredWords = useEffect(() => {
    // console.log(
    //   "filtered words",
    //   words.filter((word) => filteredLevels.has(word.level))
    // );
    setFilteredWords(words.filter((word) => filteredLevels.has(word.level)));
  }, [filteredLevels, words]);
  const initiateScreenExpression = useEffect(() => {
    if (filteredWords && filteredWords.length > 0) {
      const idx = getRandomIndexOfFilteredWords();
      setScreenWord(filteredWords[idx]);
    }
  }, [filteredWords, getRandomIndexOfFilteredWords]);
  //spoken 이 바뀔때만 호출 되도록
  const eventWhenSpokenAndScreenSame = useEffect(() => {
    setResultAndChangeExporession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spoken]);

  const addResult = useEffect(() => {
    // console.log("result::", result);
    if (result) todayResult.push(result);
    // setTodayResult(Array.from(todayResult))
  }, [result, todayResult]);
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="flex items-center justify-center flex-col">
        {/* <DeviceControl/> */}
        <div className={`w-full ${isStart && "glow"}`}>
          <p>※ 먼저 level을 선택 해 주세요</p>
        </div>
        <div className={`w-full ${isStart && "glow"}`}>
          <p>※ 마이크로 해당 단어를 읽으면 다음 단어로 넘어갑니다.</p>
        </div>
        <div className="w-full">
          <p>※ 마이크 변경(크롬) chrome://settings/content/microphone</p>
        </div>
        <div className="w-full">
          <p>
            ※ have to + root 와 같이 나오면 + root 를 없다고 생각하고 발음 해
            주세요
          </p>
        </div>
        <div className="w-full">
          <p>
            ※ 단어 발음은 가능하면 dictionary 사이트를 참조하시는 걸 권장드려요
          </p>
        </div>
        <div className={`w-full ${isStuck && "glow"}`}>
          <p>※ 단어가 포함된 문장을 말해보세요</p>
        </div>
        <div className={`w-full ${isStuck && "glow"}`}>
          <p>※ 인식이 부정확한 경우 Skip 하세요</p>
        </div>
        <div className="w-full flex flex-row">
          <p>{`※ 마이크 새로고침 -> `}</p>{" "}
          <div className="ml-2 flex justtify-center items-center">
            <RefreshMicrophoneIcon />
          </div>
        </div>
        <div className="w-full">
          <a href="mailto: practicaltrivia@gmail.com">
            ※ 문의메일(practicaltrivia@gmail.com)
          </a>
        </div>
        {/* <a href="https://www.freecodecamp.org/" target="_blank"></a> */}
      </div>
      <br />

      <div className="flex items-center justify-center flex-col">
        <div className="text-gray-900 dark:text-white w-full flex flex-wrap justify-center items-center text-xs sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
          <div className="text-gray-900">levels: </div>
          {Object.keys(levels).map((key) => (
            <button
              className={`border ml-1 ${
                filteredLevels.has(key) ? "bg-blue-500" : "bg-blue-200"
              } hover:border hover:border-blue-500 text-white font-bold px-4 rounded disabled:cursor-not-allowed`}
              key={key}
              onClick={() => {
                filteredLevels.has(key)
                  ? filteredLevels.delete(key)
                  : filteredLevels.add(key);
                setFilteredLevels(new Set(filteredLevels));
              }}
            >
              {key}
            </button>
          ))}
        </div>
        <div className="mt-[10px]">
          지금 단어 수준:{" "}
          {Array.from(filteredLevels)
            .map((level) => level)
            .join(",")}
        </div>
      </div>
      <br />

      {screenWord && (
        <div className="flex items-center justify-center flex-col">
          <div className="w-full flex flex-row py-20">
            <div className="flex justify-center items-center flex-row">
              <p className="text-5xl">{screenWord.spell}</p>
            </div>
            <button
              className="border ml-2 mr-5"
              onClick={() => textToSpeech(screenWord.spell)}
            >
              <GiSpeaker />
            </button>
            {(guessMode &&
              ((guessingMeaning && screenWord.korean) || (
                <div className="flex justify-center items-center flex-row">
                  <input
                    id="guess-meaning-input"
                    type="text"
                    placeholder="의미를 추측 해 보세요"
                    className="border border-slate-300 rounded-md p-1 text-xs"
                  />
                  <button
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold px-4 border border-gray-400 rounded shadow disabled:cursor-not-allowed"
                    onClick={() =>
                      setGuessingMeaning(
                        (
                          document.getElementById(
                            "guess-meaning-input"
                          ) as HTMLInputElement
                        )?.value
                      )
                    }
                  >
                    guess
                  </button>
                </div>
              ))) || (
              <div className="flex justify-center items-center flex-row">
                {screenWord.korean}
              </div>
            )}
          </div>
          {/* <div className="w-full flex flex-row ">
            
          </div> */}
        </div>
      )}
      <br />
      <div className="flex justify-center items-center flex-row">
        <div className="mx-3">
          <h5>you speak:</h5>
        </div>
        {spoken.toLowerCase()}
        <button className="" onClick={() => startAndRefreshSpeechRecognition()}>
          <div className="mx-3">
            <RefreshMicrophoneIcon />
          </div>
        </button>
      </div>
      <br />
      <div className="flex justify-center items-center">
        <button
          onClick={() => setGuessMode(!guessMode)}
          className={
            (guessMode &&
              `bg-white text-gray-800 font-semibold px-4 border border-gray-400 rounded shadow disabled:cursor-not-allowed`) ||
            `bg-gray-400 text-white font-semibold px-4 border border-gray-400 rounded shadow disabled:cursor-not-allowed`
          }
        >
          guess 모드
        </button>
        <button
          onClick={() => setResultAndChangeExporession({ skip: true })}
          className={`ml-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-4 border border-gray-400 rounded shadow disabled:cursor-not-allowed ${
            isStuck && "glow"
          }`}
        >
          skip
        </button>
        <button
          onClick={() => todayResult.length > 0 && setResultsDialogOpen(true)}
          className="ml-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-4 border border-gray-400 rounded shadow disabled:cursor-not-allowed"
        >
          결과보기
        </button>
      </div>

      <GoogleAd type={`${GoogldAdType.Display}`} />

      {todayResult.length > 0 && (
        <Dialog open={resultsDialogOpen} setOpen={setResultsDialogOpen}>
          <div
            className={`w-[80vw] max-w-md max-h-[80vh] overflow-y-scroll bg-white p-10 cursor-auto`}
            ref={resultDivOuter}
          >
            <div>
              <div ref={resultDivInner}>
                <div className="w-full flex justify-between">
                  <div className="w-full flex justify-center items-center font-black">
                    Voca(US)
                  </div>
                  <div
                    className="cursor-pointer w-[40px] h-[40px]"
                    onClick={() => setResultsDialogOpen(false)}
                  >
                    <Image
                      width={40}
                      height={40}
                      style={{
                        width: 50,
                        height: 40,
                        color: "black",
                        backgroundColor: "white",
                      }}
                      src={`/images/icons/list-close-btn.svg`}
                      priority
                      alt=""
                      className=""
                    />
                  </div>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {todayResult.map((result) => (
                    <li
                      key={result.time.getTime()}
                      className="w-full p-3 sm:p-4"
                    >
                      <div className="flex-1 min-w-0 justify-center items-center">
                        <p className="text-sm font-medium text-black truncate ">
                          {`"${result.tried.spell}" vs "${
                            result.spoken || "not spoken"
                          }" from ${result.tried.level}`}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {` "${result.tried.korean}" vs "${result.guessedMeaning}"`}
                        </p>
                        {/* mobile */}
                        <div className="block md:hidden">
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {`${(result.pass && "passed") || "Not passed"}`}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {`${result.time.toLocaleDateString()}`}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {`${result.time.toLocaleTimeString()}`}
                          </p>
                        </div>
                        {/* pc */}
                        <div className="hidden md:block">
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {`${
                              (result.pass && "passed") || "Not passed"
                            } at ${result.time.toLocaleString()}`}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={"w-full h-10 flex flex-row-reverse items-end mt-5"}
              >
                <button
                  onClick={() =>
                    clickToScreenShot(
                      resultDivInner.current,
                      resultDivOuter.current,
                      "vocastudyresult(US)"
                    )
                  }
                >
                  이미지 저장
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
