"use client";

import { useEffect, useState } from "react";

export default function VoiceRecognition({ words }: { words: any }) {
  const [spoken, setSpoken] = useState("");
  function startAndRefreshSpeechRecognition() {
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
  startAndRefreshSpeechRecognition();
  useEffect(() => {
    // let dbWords = new Array<any>();
    // (words as Array<any>).map((fileWord) => {
    //   const fileName = fileWord[0] as string;
    //   const content = (fileWord[1] as string)
    //     .replace(/(?:\t)/g, " ")
    //     .replace(/(?:\r\n|\r|\n)/g, "<br />")
    //     .split("<br />")
    //     .map((s) => {
    //       const splits = s.trim().split(" ");
    //       const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    //       let i = 0;
    //       for (; i < splits.length; i += 1)
    //         if (korean.test(splits[i]) === true) break;
    //       return {
    //         spell: splits.slice(0, i).join(" "),
    //         korean: splits.slice(i).join(" "),
    //         level: fileName.split('.')[0]
    //       };
    //     });
    //   console.log(fileName, content);
    //   dbWords = dbWords.concat(content)
    // });
    // console.log('dbWords',dbWords)
    console.log(words)
  }, [words]);
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <button onClick={() => startAndRefreshSpeechRecognition()}>
        refresh
      </button>
      <br />
      {spoken}
    </div>
  );
}
