const body = document.querySelector("body");
const score = document.createElement("h1");
const startButton = document.createElement("button");
const playingField = document.createElement("div");
const leftRacket = document.createElement("div");
const rightRacket = document.createElement("div");

score.classList.add("score");
startButton.classList.add("start-button");
playingField.classList.add("playing-field");
leftRacket.classList.add("left-racket");
rightRacket.classList.add("right-racket");
score.innerHTML = "0:0";
startButton.innerHTML = "start";
