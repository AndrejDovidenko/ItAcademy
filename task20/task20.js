const body = document.querySelector("body");
const countdown = document.createElement("div");
const score = document.createElement("h1");
const startButton = document.createElement("button");
const playingField = document.createElement("div");
const leftPaddle = document.createElement("div");
const rightPaddle = document.createElement("div");
const ball = document.createElement("div");
const notice = document.createElement("p");

const widthPlayingField = innerWidth / 1.5;
const heightPlayingField = widthPlayingField / 2;

const paddleHeight = heightPlayingField * 0.3; // высота ракетки
const paddleWidth = widthPlayingField * 0.02; // ширина ракетки
const startPosYPaddle = (heightPlayingField - paddleHeight) / 2; // начальная позиция по y
const deltaYPaddle = heightPlayingField - paddleHeight; // ограничение движения по y

const ballSize = heightPlayingField * 0.1; // размер мячика
const startPosYBall = heightPlayingField / 2 - ballSize / 2; // начальная позиция по y
const startPosXBall = widthPlayingField / 2 - ballSize / 2; // начальная позиция по x
const deltaYBall = heightPlayingField - ballSize; // ограничение движения по y
const deltaXBall = widthPlayingField - ballSize; // ограничение движения по x
const arrSpeedX = [-7, 7];
const arrSpeedY = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
let countTimer = 3;

class Hash {
  constructor(item, height, width, posY, deltaY, posX = 0, speedY = 2) {
    this.item = item;
    this.height = height;
    this.width = width;
    this.posY = posY;
    this.posX = posX;
    this.deltaY = deltaY;
    this.speedY = speedY;
  }

  update() {
    this.item.style.transform = `translateX(${this.posX + "px"}) translateY(${
      this.posY + "px"
    }) translateZ(0)`;
  }
}

class PaddleHash extends Hash {
  constructor(name, item, height, width, posY, deltaY) {
    super(item, height, width, posY, deltaY);
    this.isMoving = false;
    this.rafId = null;
    this.score = 0;
    this.name = name;
    this.moveUp = false;
    this.moveDown = false;
  }

  updateScore() {
    this.score += 1;
  }

  movePaddle() {
    if (this.moveUp && this.isMoving) {
      this.posY -= this.speedY;
      if (this.posY <= 0) {
        this.posY = 0;
      }
    }

    if (this.moveDown && this.isMoving) {
      this.posY += this.speedY;
      if (this.posY >= this.deltaY) {
        this.posY = this.deltaY;
      }
    }

    this.update();

    this.rafId = requestAnimationFrame(() => this.movePaddle());
  }
}

class BallHash extends Hash {
  constructor(item, height, width, posY, deltaY, posX, speedY) {
    super(item, height, width, posY, deltaY, posX, speedY);
    this.posX = startPosXBall;
    this.deltaX = deltaXBall;
  }

  randomSpeed() {
    this.speedX = arrSpeedX.sort(() => Math.random() - 0.5)[0];
    this.speedY = arrSpeedY.sort(() => Math.random() - 0.5)[0];
  }
}

const leftPaddleHash = new PaddleHash(
  "Left side",
  leftPaddle,
  paddleHeight,
  paddleWidth,
  startPosYPaddle,
  deltaYPaddle
);
leftPaddleHash.update();

const rightPaddleHash = new PaddleHash(
  "Right side",
  rightPaddle,
  paddleHeight,
  paddleWidth,
  startPosYPaddle,
  deltaYPaddle
);
rightPaddleHash.update();

const ballHash = new BallHash(
  ball,
  ballSize,
  ballSize,
  startPosYBall,
  deltaYBall
);
ballHash.update();

function renderDom() {
  countdown.classList.add("countdown");
  notice.classList.add("notice");
  score.classList.add("score");
  startButton.classList.add("start-button");
  playingField.classList.add("playing-field");
  leftPaddle.classList.add("left-racket", "racket");
  rightPaddle.classList.add("right-racket", "racket");
  ball.classList.add("ball");
  countdown.innerHTML = "3";
  score.innerHTML = `${leftPaddleHash.score} : ${rightPaddleHash.score}`;
  startButton.innerHTML = "start";
  playingField.style.width = widthPlayingField + "px";
  playingField.style.height = heightPlayingField + "px";

  playingField.append(leftPaddle, ball, rightPaddle);
  body.append(countdown, notice, score, startButton, playingField);
}

renderDom();

function timer() {
  countdown.style.display = "inline-block";
  const t = setInterval(() => {
    countTimer--;

    if (countTimer <= 0) {
      countdown.innerText = "Go!";
      countdown.style.opacity = "0";
      clearInterval(t);
    } else {
      countdown.innerText = String(countTimer);
    }
  }, 1000);
}

function startNewRound() {
  // подготовка к старту нового раунда, обновляем позиции ракеток и мячика, обновляем обратный отсчет
  if (leftPaddleHash.score < 5 && rightPaddleHash.score < 5) {
    // document.addEventListener("keydown", keydownHandler);
    leftPaddleHash.posY = startPosYPaddle;
    leftPaddleHash.update();
    rightPaddleHash.posY = startPosYPaddle;
    rightPaddleHash.update();
    ballHash.posX = startPosXBall;
    ballHash.posY = startPosYBall;
    ballHash.update();
    countdown.innerText = "3";
    countdown.style.display = "none";
    countdown.style.opacity = "1";
    countdown.classList.add("start");
    countTimer = 3;
    // старт раунда
    leftPaddleHash.isMoving = true;
    rightPaddleHash.isMoving = true;
    requestAnimationFrame(() => leftPaddleHash.movePaddle());
    requestAnimationFrame(() => rightPaddleHash.movePaddle());
    timer();
    setTimeout(() => startBall(), 4000);
  }
}

function startNewGame() {
  if (leftPaddleHash.score === 5 || rightPaddleHash.score === 5) {
    leftPaddleHash.score = 0;
    rightPaddleHash.score = 0;
    score.innerHTML = `${rightPaddleHash.score} : ${leftPaddleHash.score}`;
    notice.classList.remove("show");
  }
  startNewRound();
}

function roundIsOver(item) {
  // конец раунда, останавливаем ракетки, меняем счет, удаляем клаасс у обратного отсчета, выводим на экран победителя игры если есть
  leftPaddleHash.isMoving = false;
  rightPaddleHash.isMoving = false;
  if (leftPaddleHash.rafId) cancelAnimationFrame(leftPaddleHash.rafId);
  if (rightPaddleHash.rafId) cancelAnimationFrame(rightPaddleHash.rafId);

  countdown.classList.remove("start");
  item.updateScore();
  score.innerHTML = `${rightPaddleHash.score} : ${leftPaddleHash.score}`;

  if (item.score === 5) {
    notice.innerHTML = item.name + " lost!";
    notice.classList.add("show");
    startButton.disabled = false;
  }
  // запускаем новый раунд
  setTimeout(() => startNewRound(), 2000);
}

function moveBall() {
  ballHash.posX += ballHash.speedX;

  // Проверяем совпадение позиций правой ракетки и мячика, если есть совпадение отбиваем, иначе мячик долетает до края поля и останавливается
  if (
    ballHash.posY + ballHash.height >= rightPaddleHash.posY &&
    ballHash.posY <= rightPaddleHash.posY + rightPaddleHash.height &&
    ballHash.posX >= ballHash.deltaX - rightPaddleHash.width
  ) {
    ballHash.speedX = -ballHash.speedX;
    ballHash.posX = ballHash.deltaX - rightPaddleHash.width;
  } else if (ballHash.posX >= ballHash.deltaX) {
    ballHash.posX = ballHash.deltaX;
    ballHash.update();
    // конец раунда
    roundIsOver(rightPaddleHash);
    return;
  }
  // Проверяем совпадение позиций левой ракетки и мячика, если есть совпадение отбиваем, иначе мячик долетает до края поля и останавливается
  if (
    ballHash.posY + ballHash.height >= leftPaddleHash.posY &&
    ballHash.posY <= leftPaddleHash.posY + leftPaddleHash.height &&
    ballHash.posX <= leftPaddleHash.width
  ) {
    ballHash.speedX = -ballHash.speedX;
    ballHash.posX = leftPaddleHash.width;
  } else if (ballHash.posX <= 0) {
    ballHash.posX = 0;
    ballHash.update();
    // конец раунда
    roundIsOver(leftPaddleHash);
    return;
  }

  ballHash.posY += ballHash.speedY;
  // вылетел ли мяч ниже пола?
  if (ballHash.posY >= ballHash.deltaY) {
    ballHash.speedY = -ballHash.speedY;
    ballHash.posY = ballHash.deltaY;
  }
  // вылетел ли мяч выше потолка?
  if (ballHash.posY <= 0) {
    ballHash.speedY = -ballHash.speedY;
    ballHash.posY = 0;
  }

  ballHash.update();
  requestAnimationFrame(moveBall);
}

function startBall() {
  ballHash.randomSpeed();
  requestAnimationFrame(moveBall);
}

function keydownHandler(event) {
  switch (event.code) {
    case "ShiftLeft":
      leftPaddleHash.moveUp = true;
      break;
    case "ControlLeft":
      leftPaddleHash.moveDown = true;
      break;
    case "ArrowUp":
      rightPaddleHash.moveUp = true;
      break;
    case "ArrowDown":
      rightPaddleHash.moveDown = true;
      break;
  }
}

startButton.addEventListener("click", () => {
  leftPaddleHash.isMoving = true;
  rightPaddleHash.isMoving = true;
  startButton.disabled = true;
  startNewGame();
});

document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "ShiftLeft":
      leftPaddleHash.moveUp = false;
      break;
    case "ControlLeft":
      leftPaddleHash.moveDown = false;
      break;
    case "ArrowUp":
      rightPaddleHash.moveUp = false;
      break;
    case "ArrowDown":
      rightPaddleHash.moveDown = false;
      break;
  }
});
