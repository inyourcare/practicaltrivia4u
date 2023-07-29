import { configuration } from "./configuration";

export function textToSpeech(word: string) {
  console.log("textToSpeech", word);
  // "speechSynthesis" in window
  //   ? console.log("Web Speech API supported!")
  //   : console.log("Web Speech API not supported :-(");

  const synth = window.speechSynthesis;
  // let ourText = "안녕하세요";
  const utterThis = new SpeechSynthesisUtterance(word);
  utterThis.volume = 1
  utterThis.lang = configuration.lang

  synth.speak(utterThis);
}
