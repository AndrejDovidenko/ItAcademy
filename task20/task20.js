const body = document.querySelector("body");
const score = document.createElement("h1");
const startButton = document.createElement("button");
const playingField = document.createElement("div");
const leftRacket = document.createElement("div");
const rightRacket = document.createElement("div");
const widthPlayingField = innerWidth / 2;
const heightPlayingField = widthPlayingField / 2;

score.classList.add("score");
startButton.classList.add("start-button");
playingField.classList.add("playing-field");
leftRacket.classList.add("left-racket", "racket");
rightRacket.classList.add("right-racket", "racket");
score.innerHTML = "0:0";
startButton.innerHTML = "start";
playingField.style.width = widthPlayingField + "px";
playingField.style.height = heightPlayingField + "px";

playingField.append(leftRacket, rightRacket);
body.append(score, startButton, playingField);

class RacketHash {
  constructor() {
    this.posY = 0;
    this.speedY = 1;
    this.width = widthPlayingField * 0.05;
    this.height = heightPlayingField * 0.4;
    this.isMoving = false;
  }

  update(item) {
    item.style = `transform: translateY(${this.posY + "px"});`;
  }
}

const leftRacketHash = new RacketHash();
const rightRacketHash = new RacketHash();
// console.log(leftRacketHash.posY);

const playingFieldHash = {
  width: widthPlayingField,
  height: heightPlayingField,
};

function moveRacket(direction, hash, item) {
  if (direction === 1) {
    if (-hash.posY * 2 + hash.height > playingFieldHash.height) {
      return;
    }
    hash.posY -= hash.speedY;
  }
  if (direction === -1) {
    if (hash.posY * 2 + hash.height > playingFieldHash.height) {
      return;
    }
    hash.posY += hash.speedY;
  }

  hash.update(item);

  if (hash.isMoving) {
    requestAnimationFrame(() => moveRacket(direction, hash, item));
  }
}

document.addEventListener("keydown", (event) => {
  console.log(event.code);

  switch (event.code) {
    case "ShiftLeft":
      leftRacketHash.isMoving = true;
      moveRacket(1, leftRacketHash, leftRacket);
      break;
    case "ControlLeft":
      leftRacketHash.isMoving = true;
      moveRacket(-1, leftRacketHash, leftRacket);
      break;
    case "ArrowUp":
      rightRacketHash.isMoving = true;
      moveRacket(1, rightRacketHash, rightRacket);
      break;
    case "ArrowDown":
      rightRacketHash.isMoving = true;
      moveRacket(-1, rightRacketHash, rightRacket);
      break;
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "ShiftLeft":
      leftRacketHash.isMoving = false;
      break;
    case "ControlLeft":
      leftRacketHash.isMoving = false;
      break;
    case "ArrowUp":
      rightRacketHash.isMoving = false;

      break;
    case "ArrowDown":
      rightRacketHash.isMoving = false;
      break;
  }
});

// var ballH = {
//   posX: 0,
//   posY: 0,
//   speedX: 1,
//   width: 100,
//   height: 100,

//   update: function () {
//     var ballElem = document.getElementById("IBall");
//     ballElem.style.left = this.posX + "px";
//     ballElem.style.top = this.posY + "px";
//   },
// };

// var areaH = {
//   width: 400,
//   height: 300,
// };

// function start() {
//   // синхрон с внутренней анимацией браузера
//   // обычно 60 раз в сек
//   requestAnimationFrame(tick);
// }

// function tick() {
//   ballH.posX += ballH.speedX;

//   // вылетел ли мяч правее стены?
//   if (ballH.posX + ballH.width > areaH.width) {
//     ballH.speedX = -ballH.speedX;
//     ballH.posX = areaH.width - ballH.width;
//   }
//   // вылетел ли мяч левее стены?
//   if (ballH.posX < 0) {
//     ballH.speedX = -ballH.speedX;
//     ballH.posX = 0;
//   }

//   ballH.update();

//   requestAnimationFrame(tick);
// }

// ballH.update();
