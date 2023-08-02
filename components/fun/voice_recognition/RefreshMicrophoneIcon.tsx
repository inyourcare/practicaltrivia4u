import { GiSpeaker, GiRecycle } from "react-icons/gi";
import { HiMicrophone } from "react-icons/hi";
export default function RefreshMicrophoneIcon({isSpeechStarted}:{isSpeechStarted:boolean}) {
  return (
    <div className="flex flex-row items-center justify-center">
      {/* <GiRecycle className={`${isSpeechStarted && "" || "glow"}`} color="#0099a4"/> */}
      <GiRecycle className={`${isSpeechStarted ===false && "glow"}`}/>
      <HiMicrophone />
    </div>
  );
}
