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

type WordResult = {
  tried: Word;
  spoken?: string;
  pass: boolean;
};

export default function VoiceRecognition({ words }: { words: Word[] }) {
  const [spoken, setSpoken] = useState("");
  const [filteredLevels, setFilteredLevels] = useState(new Set<string>());
  const [filteredWords, setFilteredWords] = useState(null as unknown as Word[]);
  const [screenExpression, setScreenExpression] = useState("");
  const [todayResult, setTodayResult] = useState(new Array<WordResult>());
  const [result, setResult] = useState(null as unknown as WordResult);
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
  // const addResult = useCallback(
  //   (r_screen: string, r_spoken: string, r_pass: boolean) => {
  //     todayResult.push({
  //       tried: words.filter((w) => w.spell === r_screen)[0],
  //       spoken: r_spoken,
  //       pass: r_pass,
  //     });
  //     setTodayResult(Array.from(todayResult))
  //   },
  //   [todayResult, words]
  // );

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
    if (filteredWords && filteredWords.length > 0)
      setScreenExpression(filteredWords[getRandomIndexOfFilteredWords()].spell);
  }, [filteredWords, getRandomIndexOfFilteredWords]);
  const eventWhenSpokenAndScreenSame = useEffect(() => {
    const spokenStr = spoken.trim().toLowerCase().replace(' ','');
    const screenStr = screenExpression.replace("+", " ").trim().toLowerCase().replace(' ','');
    if (filteredWords && filteredWords.length > 0 && spokenStr && screenStr && spokenStr === screenStr) {
      setResult({
        tried: words.filter((w) => w.spell === screenExpression)[0],
        spoken: spokenStr,
        pass: true,
      });
      setScreenExpression(filteredWords[getRandomIndexOfFilteredWords()].spell);
    }
  }, [
    spoken,
    screenExpression,
    filteredWords,
    getRandomIndexOfFilteredWords,
    setResult,
    words,
  ]);
  const addResult = useEffect(() => {
    console.log("result::", result);
    if (result)
      todayResult.push(result);
    // setTodayResult(Array.from(todayResult))
  }, [result, todayResult]);
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="flex items-center justify-center flex-col">
        {/* <DeviceControl/> */}
        <p>※ 마이크 변경(크롬) chrome://settings/content/microphone</p>
        <p>
          ※ have to + root 와 같이 나오면 + 를 없다고 생각하고 발음 해 주세요
        </p>
        <p>
          ※ 단어 발음은 가능하면 dictionary 사이트를 사용하시는 걸 권장드려요
        </p>
        <div className="flex flex-row">
          <p>{`※ 마이크 새로고침 -> `}</p> <RefreshMicrophoneIcon />
        </div>
        {/* <a href="https://www.freecodecamp.org/" target="_blank"></a> */}
      </div>
      <br />

      <div className="flex items-center justify-center">
        <div className="text-gray-900 dark:text-white w-full flex flex-wrap">
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

      {screenExpression && (
        <div className="flex items-center justify-center">
          <div className="w-full flex flex-row ">
            {screenExpression}
            <button
              className="border ml-3"
              onClick={() => textToSpeech(screenExpression)}
            >
              <GiSpeaker />
            </button>
          </div>
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
          onClick={() => console.log(todayResult)}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold px-4 border border-gray-400 rounded shadow disabled:cursor-not-allowed"
        >
          결과보기
        </button>
      </div>

      <GoogleAd type={`${GoogldAdType.Display}`} />
    </div>
  );
}
