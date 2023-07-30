"use client";

import { useEffect, useState, useCallback } from "react";
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

type WordResult = {
  tried: Word;
  spoken?: string;
  pass: boolean;
  time: Date;
  guessedMeaning?: string;
};

export default function VoiceRecognition({ words }: { words: Word[] }) {
  const [spoken, setSpoken] = useState("");
  const [filteredLevels, setFilteredLevels] = useState(new Set<string>());
  const [filteredWords, setFilteredWords] = useState(null as unknown as Word[]);
  const [screenExpression, setScreenExpression] = useState({
    spell: "",
    meaning: "",
  });
  const [todayResult, setTodayResult] = useState(new Array<WordResult>());
  const [result, setResult] = useState(null as unknown as WordResult);
  const [guessingMeaning, setGuessingMeaning] = useState("");
  const [guessMode, setGuessMode] = useState(true);
  const guessOffMsg = "guess off";
  const [resultsDialogOpen, setResultsDialogOpen] = useState(false);
  const resultViewDivId = "result-view-div-id";
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
        console.log("recognition result");
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
    const spokenStr = spoken.trim().toLowerCase().replace(" ", "");
    const screenStr = screenExpression.spell
      .replace("+root", "")
      .trim()
      .toLowerCase()
      .replace(" ", "");
    const resultWords = words.filter((w) => w.spell === screenExpression.spell);
    if (args?.skip && resultWords && resultWords.length > 0) {
      // result manage
      console.log(resultWords);
      setResult({
        tried: resultWords[0],
        spoken: spokenStr,
        pass: false,
        time: new Date(),
        guessedMeaning: (guessMode && guessingMeaning) || guessOffMsg,
      });
      const idx = getRandomIndexOfFilteredWords();
      setScreenExpression({
        spell: filteredWords[idx].spell,
        meaning: filteredWords[idx].korean,
      });

      setGuessingMeaning("");
    } else {
      if (filteredWords && filteredWords.length > 0 && spokenStr && screenStr) {
        if (spokenStr === screenStr) {
          // result manage
          setResult({
            tried: words.filter((w) => w.spell === screenExpression.spell)[0],
            spoken: spokenStr,
            pass: true,
            time: new Date(),
            guessedMeaning: (guessMode && guessingMeaning) || guessOffMsg,
          });
          const idx = getRandomIndexOfFilteredWords();
          setScreenExpression({
            spell: filteredWords[idx].spell,
            meaning: filteredWords[idx].korean,
          });

          setGuessingMeaning("");
        }
      }
    }
  }

  /////////////////////////////////////// use effect ////////////////////////////////////////////////////////////
  const initiateAudioInput = useEffect(() => {
    startAndRefreshSpeechRecognition();

    // console.log(words)
    console.log();
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
      setScreenExpression({
        spell: filteredWords[idx].spell,
        meaning: filteredWords[idx].korean,
      });
    }
  }, [filteredWords, getRandomIndexOfFilteredWords]);
  //spoken 이 바뀔때만 호출 되도록
  const eventWhenSpokenAndScreenSame = useEffect(() => {
    setResultAndChangeExporession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spoken]);

  const addResult = useEffect(() => {
    console.log("result::", result);
    if (result) todayResult.push(result);
    // setTodayResult(Array.from(todayResult))
  }, [result, todayResult]);
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="flex items-center justify-center flex-col">
        {/* <DeviceControl/> */}
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

      <div className="flex items-center justify-center">
        <div className="text-gray-900 dark:text-white w-full flex flex-wrap justify-center items-center text-xs sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
          levels:{" "}
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
      </div>
      <br />

      {screenExpression && screenExpression.spell && (
        <div className="flex items-center justify-center flex-col">
          <div className="w-full flex flex-row ">
            <div className="flex justify-center items-center flex-row">
              {screenExpression.spell}
            </div>
            <button
              className="border ml-2 mr-5"
              onClick={() => textToSpeech(screenExpression.spell)}
            >
              <GiSpeaker />
            </button>
            {(guessMode &&
              ((guessingMeaning && screenExpression.meaning) || (
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
              ))) ||
              screenExpression.meaning}
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
          className="ml-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-4 border border-gray-400 rounded shadow disabled:cursor-not-allowed"
        >
          skip
        </button>
        <button
          onClick={() => todayResult.length>0 && setResultsDialogOpen(true)}
          className="ml-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-4 border border-gray-400 rounded shadow disabled:cursor-not-allowed"
        >
          결과보기
        </button>
      </div>

      <GoogleAd type={`${GoogldAdType.Display}`} />

      {todayResult.length > 0 && (
        <Dialog open={resultsDialogOpen} setOpen={setResultsDialogOpen}>
          <div
            id={resultViewDivId}
            className={`w-[80vw] max-w-md max-h-[80vh] overflow-y-scroll bg-white p-10 cursor-auto`}
          >
            <div>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {todayResult.map((result) => (
                  <li key={result.time.getTime()} className="w-full p-3 sm:p-4">
                    <div className="flex-1 min-w-0 justify-center items-center">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {`"${result.tried.spell}" vs "${
                          result.spoken || "not spoken"
                        }"`}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {` "${result.tried.korean}" vs "${result.guessedMeaning}"`}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {`${
                          (result.pass && "passed") || "Not passed"
                        } at ${result.time.toLocaleString()}`}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div
                className={"w-full h-10 flex flex-row-reverse items-end mt-5"}
              >
                <button
                  onClick={() =>
                    clickToScreenShot(resultViewDivId, "vocastudyresult(US)")
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
