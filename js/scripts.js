let timer;
let isRunning = false;
let lapCount = 1;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapList = document.getElementById("lap-list");

function startTimer() {
  let minutes = 0,
    seconds = 0,
    milliseconds = 0;

  function updateTimer() {
    milliseconds += 10;
    if (milliseconds >= 1000) {
      seconds++;
      milliseconds = 0;
    }
    if (seconds >= 60) {
      minutes++;
      seconds = 0;
    }

    minutesDisplay.textContent = padZero(minutes);
    secondsDisplay.textContent = padZero(seconds);
    millisecondsDisplay.textContent = padZero(Math.floor(milliseconds / 10));
  }

  timer = setInterval(updateTimer, 10);
  isRunning = true;
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  stopTimer();
  minutesDisplay.textContent = "00";
  secondsDisplay.textContent = "00";
  millisecondsDisplay.textContent = "00";
  lapCount = 1;
  lapList.innerHTML = "";
}

function lapTimer() {
  const currentTime = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${lapCount}: ${currentTime}`;
  lapList.appendChild(lapItem);
  lapCount++;
}

function padZero(value) {
  return value.toString().padStart(2, "0");
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
startButton.addEventListener("click", lapTimer);
