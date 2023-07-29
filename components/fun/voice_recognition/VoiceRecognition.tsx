"use client";

import { useEffect, useState, useCallback } from "react";
import { Word } from "@prisma/client";
import { levels } from "./levels";
import DeviceControl from "./DeviceControl";

export default function VoiceRecognition({ words }: { words: Word[] }) {
  const [spoken, setSpoken] = useState("");
  const [filteredLevels, setFilteredLevels] = useState(new Set<string>());
  const [filteredWords, setFilteredWords] = useState(null as unknown as Word[]);
  const [screenExpression, setScreenExpression] = useState("");
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
      recognition.lang = "en-US";
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
  async function getMedia(constraints: MediaStreamConstraints) {
    let stream = null;

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      /* 스트림 사용 */
    } catch (err) {
      /* 오류 처리 */
      console.error("error while getMedia", err);
    }
  }
  // function getRandomIndexOfFilteredWords() {
  //   return Math.floor(Math.random() * filteredWords.length);
  // }
  const getRandomIndexOfFilteredWords = useCallback(() => {
    return (
      (filteredWords &&
        filteredWords.length > 0 &&
        Math.floor(Math.random() * filteredWords.length)) ||
      0
    );
  }, [filteredWords]);

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
    const spokenStr = spoken.trim().toLowerCase();
    const screenStr = screenExpression.trim().toLowerCase();
    if (filteredWords && filteredWords.length > 0 && spokenStr === screenStr) {
      setScreenExpression(filteredWords[getRandomIndexOfFilteredWords()].spell);
    }
  }, [spoken, screenExpression, filteredWords, getRandomIndexOfFilteredWords]);
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="flex items-center justify-center flex-col">
        {/* <DeviceControl/> */}
        ※마이크 변경(크롬) chrome://settings/content/microphone
        {/* <a href="https://www.freecodecamp.org/" target="_blank"></a> */}
        <button onClick={() => startAndRefreshSpeechRecognition()}>
          마이크 새로고침 (아이콘)
        </button>
      </div>
      <br />
      {spoken}
      <br />
      <div className="flex items-center justify-center">
        <div className="w-full flex flex-col ">{screenExpression}</div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-full flex flex-raw ">
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
    </div>
  );
}
