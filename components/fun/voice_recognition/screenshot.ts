import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";

function leftPad(value: number) {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
}

// export function clickToScreenShot(elemId: string, filename: string) {
export function clickToScreenShot(
  elemInner: HTMLDivElement | null,
  elemOuter: HTMLDivElement | null,
  filename: string
) {
  // const elem = document.getElementById(elemId);
  // const elem = document.querySelector(`#${elemId}`) as HTMLElement;
  if (elemInner && elemOuter) {
    const date = new Date();
    const year = date.getFullYear();
    const month = leftPad(date.getMonth() + 1);
    const day = leftPad(date.getDate());
    const filedate = [year, month, day].join("_");

    // elem.scrollTo(0, 0);
    // // html2canvas(elem, {scrollY: -window.scrollY}).then(function (canvas) {
    // html2canvas(elem, {
    //   // allowTaint: true,
    //   // useCORS: true,
    //   // logging: false,
    //   // scrollY: -window.scrollY,
    //   height: elem.scrollHeight,
    //   windowHeight: elem.scrollHeight,
    // }).then(function (canvas) {
    //   saveAs(canvas.toDataURL("image/png", 1.0), `${filedate}_${filename}.png`);
    // });
    // elem.scrollTo(0, elem.scrollHeight);

    domtoimage
      .toPng(elemInner, { height: elemOuter.scrollHeight, bgcolor: "white" })
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.download = `${filedate}_${filename}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error("Error while taking screenshot:", error);
      });
  }
}

function saveAs(uri: string, filename: string) {
  var link = document.createElement("a");
  if (typeof link.download === "string") {
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}
