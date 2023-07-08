function addEffect() {
  let img = document.createElement("img");
  // img.src = "/images/roulette/013_fullscreen_confettie.webp";
  img.classList.add('fixed')
  img.classList.add('top-0')
  img.classList.add('w-full')
  img.src = "/images/roulette/013_fullscreen_confettie.webp";
  document.body.append(img);
  const timeout = setTimeout(() => {
    document.body.removeChild(img)
    // img.remove();
    clearTimeout(timeout);
  }, 3000);
}

function floatingImage(imageUrl: string, text: string) {
  const container = document.getElementById("food-roulette-container");
  if (container) {
    // console.log(
    //   container.clientTop,
    //   container.clientLeft,
    //   container.clientHeight
    // );
    let div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = `${container.getBoundingClientRect().top}px`;
    div.style.left = `${container.getBoundingClientRect().left}px`;
    div.style.width = `${container.clientWidth}px`;
    div.style.height = `${container.clientHeight}px`;
    div.classList.add("flex");
    div.classList.add("justify-center");
    let box = document.createElement("div");
    // box.classList.add("w-full");
    box.classList.add("flex");
    box.classList.add("justify-center");
    box.classList.add("flex-col");
    box.style.position = "fixed";
    box.style.top = "10%";
    let img = document.createElement("img");
    img.src = imageUrl;
    img.style.width = "500px";
    img.style.height = "500px";
    
    let divPwrap = document.createElement("div");
    divPwrap.classList.add("absolute");
    divPwrap.classList.add("w-full");
    divPwrap.classList.add("flex");
    divPwrap.classList.add("justify-center");
    let p = document.createElement("p");
    p.textContent = text;
    // p.classList.add("absolute");
    // p.classList.add("w-full");
    p.classList.add("text-center");
    p.classList.add("font-black");
    p.classList.add("text-6xl");
    p.classList.add("text-white");
    p.classList.add("[text-shadow:_1px_1px_1px_rgb(0_0_0_/_100%)]");
    // p.classList.add("bg-white");
    divPwrap.append(p)
    box.append(img);
    box.append(divPwrap);
    // div.append(img);
    // div.append(p);
    div.append(box);
    container.appendChild(div);
    // document.body.appendChild(div);
    const timeout = setTimeout(() => {
      // document.body.removeChild(div);
      container.removeChild(div);
    }, imageWaitingSeconds);
  }
}
export function drawKong() {
  // console.log("drawKong");
  floatingImage("/images/roulette/kong-transparent.png", "22 22");
}
function drawTurky() {
  // console.log("drawTurky");
  floatingImage(
    "/images/roulette/turky-transparent.png",
    `힝 ${oneMoreCnt > 0 ? "또 " : ""}속았지`
  );
}

function scrollFollowing(item: Element, selectingClass: string) {
  const top = item.getBoundingClientRect().top;
  if (top) {
    const y = top + window.scrollY;
    window.scroll({
      top: y - 200,
      behavior: "smooth",
    });
  }
}
function afterSelected(finalCallback: any) {
  const selected = arr
    .filter((item) => item.classList.contains(selectingClass))
    .pop();
  selected?.classList.remove(selectingClass);
  selected?.classList.add(selectedClass);
  addEffect();
  finalCallback();
}

function selecting() {
  const intervalId = setInterval(() => {
    if (idx === 0) idx = arr.length;

    const realIdx = Math.abs(idx) % arr.length;
    const prevIdx = (arr.length + idx - direction * gap) % arr.length;
    const afterIdx = (arr.length + idx + direction * gap) % arr.length;
    arr[prevIdx].classList.remove(selectingClass);
    arr[afterIdx].classList.remove(selectingClass);
    arr[realIdx].classList.add(selectingClass);

    // console.log(idx, realIdx);
    idx = idx + direction * gap;

    scrollFollowing(arr[realIdx], selectingClass);

    // console.log(idx,realIdx)
  }, intervalSeconds);
  const timeoutId = setTimeout(() => {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
    curRecursion += 1;
    if (maxRecursion <= curRecursion) {
      const ran = Math.random();
      // const ran = 0.1;
      // const ran = 0.3;
      if (ran < 0.2 && oneMoreCnt < maxMorCount) {
        // if (1 > 0.5 && oneMoreCnt < 1) {
        // one more kong time
        drawKong();
        console.log("baby one more time");
        curRecursion = 0;
        intervalSeconds = initialIntervalSeconds;
        timeoutSeconds = initialTimeoutSeconds;
        oneMoreCnt += 1;
        const waiting = setTimeout(()=>{
          selecting();
        },imageWaitingSeconds)
      } else if (ran > 0.2 && ran < 0.4 && oneMoreCnt < maxMorCount) {
        drawTurky();
        console.log("baby one more turn over time");
        direction = -1 * direction;
        curRecursion = 0;
        intervalSeconds = initialIntervalSeconds;
        timeoutSeconds = initialTimeoutSeconds;
        oneMoreCnt += 1;
        const waiting = setTimeout(()=>{
          selecting();
        },imageWaitingSeconds)
      } else afterSelected(lastCallback);
    } else {
      intervalSeconds = 4 * intervalSeconds;
      timeoutSeconds = timeoutSeconds / 4;
      selecting();
    }
  }, timeoutSeconds);
}

// global variables
// nee to initialize variables in select function scope
const maxMorCount = 3;
let idx: number = 0;
let arr: Element[] = [];
let selectingClass: string;
let selectedClass: string;
let direction = 1;
let gap = 1;
let maxRecursion = 2;
let curRecursion = 0;
let lastCallback: any;
const initialIntervalSeconds = 50;
const initialTimeoutSeconds = 4000;
let intervalSeconds = initialIntervalSeconds;
let timeoutSeconds = initialTimeoutSeconds;
let oneMoreCnt = 0;
const imageWaitingSeconds = 1000;

const select = (
  elems: Element[],
  selectingClassString: string,
  selectedClassString: string,
  finalCallback: any
) => {
  if (elems.length < 1) {
    finalCallback();
    return;
  }

  idx = Math.floor(Math.random() * (arr.length - 0 + 1) + 0);
  arr = elems;
  selectingClass = selectingClassString;
  selectedClass = selectedClassString;
  direction = 1;
  gap = 1;
  curRecursion = 0;
  lastCallback = finalCallback;
  intervalSeconds = initialIntervalSeconds;
  timeoutSeconds = initialTimeoutSeconds;
  oneMoreCnt = 0;

  arr.forEach((elem) => {
    elem.classList.remove(selectingClass);
    elem.classList.remove(selectedClass);
  });

  selecting();
};

export default select;
