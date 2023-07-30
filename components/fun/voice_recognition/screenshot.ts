import html2canvas from "html2canvas";

function leftPad(value:number) {
  if (value >= 10) {
      return value;
  }

  return `0${value}`;
}

export function clickToScreenShot(elemId: string, filename: string) {
  const elem = document.getElementById(elemId);
  if (elem) {
    const date = new Date()
    const year = date.getFullYear();
    const month = leftPad(date.getMonth() + 1);
    const day = leftPad(date.getDate());
    const filedate = [year, month, day].join('_');
    html2canvas(elem, {}).then(function (canvas) {
      saveAs(
        canvas.toDataURL("image/png", 1.0),
        `${filedate}_${filename}.png`
      );
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
