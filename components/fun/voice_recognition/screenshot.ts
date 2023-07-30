import html2canvas from "html2canvas";

export function clickToScreenShot(elemId: string, filename: string) {
  const elem = document.getElementById(elemId);
  if (elem) {
    html2canvas(elem, {}).then(function (canvas) {
      saveAs(
        canvas.toDataURL(),
        `${new Date().toLocaleString()}_${filename}.png`
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
