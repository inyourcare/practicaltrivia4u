"use client";

import { useEffect } from "react";

export default function DeviceControl() {
  function gotDevices(deviceInfos: MediaDeviceInfo[]) {
    const videoElement = document.querySelector("video") as HTMLVideoElement;
    const audioInputSelect = document.querySelector(
      "select#audioSource"
    ) as HTMLSelectElement | null;
    const audioOutputSelect = document.querySelector(
      "select#audioOutput"
    ) as HTMLSelectElement | null;
    const videoSelect = document.querySelector(
      "select#videoSource"
    ) as HTMLSelectElement | null;
    const selectors = [audioInputSelect, audioOutputSelect, videoSelect];

    if (audioOutputSelect) {
      audioOutputSelect.disabled = !("sinkId" in HTMLMediaElement.prototype);
    }
    // Handles being called several times to update labels. Preserve values.
    const values = selectors.map((select) => select && select.value);
    selectors.forEach((select) => {
      while (select && select.firstChild) {
        select.removeChild(select.firstChild);
      }
    });
    for (let i = 0; i !== deviceInfos.length; ++i) {
      const deviceInfo = deviceInfos[i];
      const option = document.createElement("option");
      option.value = deviceInfo.deviceId;
      if (audioInputSelect && deviceInfo.kind === "audioinput") {
        option.text =
          deviceInfo.label || `microphone ${audioInputSelect.length + 1}`;
        audioInputSelect.appendChild(option);
      } else if (audioOutputSelect && deviceInfo.kind === "audiooutput") {
        option.text =
          deviceInfo.label || `speaker ${audioOutputSelect.length + 1}`;
        audioOutputSelect.appendChild(option);
      } else if (videoSelect && deviceInfo.kind === "videoinput") {
        option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
        videoSelect.appendChild(option);
      } else {
        // console.log("Some other kind of source/device: ", deviceInfo);
      }
    }
    selectors.forEach((select, selectorIndex) => {
      if (
        select &&
        Array.prototype.slice
          .call(select.childNodes)
          .some((n) => n.value === values[selectorIndex])
      ) {
        select.value = values[selectorIndex] as string;
      }
    });
  }

  function handleError(error: any) {
    // console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
    console.log("navigator.MediaDevices.getUserMedia error: ", error);
  }

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then(gotDevices)
      .catch(handleError);
  }, []);
  return (
    <div>
      <div className="select">
        <label htmlFor="audioSource">Audio input source: </label>
        <select id="audioSource" onChange={(e)=>{console.log(e.target.value)}}></select>
      </div>

      {/* <div className="select">
        <label htmlFor="audioOutput">Audio output destination: </label>
        <select id="audioOutput"></select>
      </div> */}

      {/* <div className="select">
        <label htmlFor="videoSource">Video source: </label>
        <select id="videoSource"></select>
      </div> */}

      {/* <video id="video" playsinline autoplay></video> */}
    </div>
  );
}