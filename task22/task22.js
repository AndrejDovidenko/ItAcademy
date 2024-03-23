const body = document.querySelector("body");
const score = document.createElement("h1");
const startButton = document.createElement("button");
const countdown = document.createElement("div");
const notice = document.createElement("p");

const w = innerWidth / 1.5;
const h = w / 2;
const paddleHeight = h * 0.3; // высота ракетки
const paddleWidth = w * 0.02; // ширина ракетки
const startPosYPaddle = (h - paddleHeight) / 2; // начальная позиция по y
const deltaYPaddle = h - paddleHeight; // ограничение движения по y

const ballSize = h * 0.1; // размер мячика
const startPosYBall = h / 2; // начальная позиция по y
const startPosXBall = w / 2; // начальная позиция по x
const deltaYBall = h - ballSize / 2; // ограничение движения по y
const deltaXBall = w - ballSize / 2; // ограничение движения по x
const arrSpeedX = [-7, 7];
const arrSpeedY = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
const canvas = document.createElement("CANVAS");
const ctx = canvas.getContext("2d");
canvas.classList.add("multiAnimation");
canvas.width = w;
canvas.height = h;
// body.append(canvas);
let countTimer = 3;

class Hash {
  constructor(height, width, posY, deltaY, posX = 0, speedY = 2) {
    this.height = height;
    this.width = width;
    this.posY = posY;
    this.posX = posX;
    this.deltaY = deltaY;
    this.speedY = speedY;
  }
}

class PaddleHash extends Hash {
  constructor(name, height, width, posY, deltaY) {
    super(height, width, posY, deltaY);
    this.isMoving = false;
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
  }
}

class BallHash extends Hash {
  constructor(height, width, posY, deltaY, posX, speedY) {
    super(height, width, posY, deltaY, posX, speedY);
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
  paddleHeight,
  paddleWidth,
  startPosYPaddle,
  deltaYPaddle
);

const rightPaddleHash = new PaddleHash(
  "Right side",
  paddleHeight,
  paddleWidth,
  startPosYPaddle,
  deltaYPaddle
);

const ballHash = new BallHash(ballSize, ballSize, startPosYBall, deltaYBall);

function renderDom() {
  countdown.classList.add("countdown");
  notice.classList.add("notice");
  score.classList.add("score");
  startButton.classList.add("start-button");
  countdown.innerHTML = "3";
  startButton.innerHTML = "start";
  score.innerHTML = `${rightPaddleHash.score} : ${leftPaddleHash.score}`;

  body.append(score, startButton, canvas, countdown, notice);
}

renderDom();

function drawCanvas(ctx) {
  ctx.fillStyle = "#d9e1f2";
  ctx.fillRect(0, 0, w, h);

  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.arc(ballHash.posX, ballHash.posY, ballSize / 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = "#8bbdc7";
  ctx.fillRect(
    leftPaddleHash.posX,
    leftPaddleHash.posY,
    leftPaddleHash.width,
    leftPaddleHash.height
  );

  ctx.beginPath();
  ctx.fillRect(
    w - rightPaddleHash.width,
    rightPaddleHash.posY,
    rightPaddleHash.width,
    rightPaddleHash.height
  );
  ctx.fill();
}

drawCanvas(ctx);

function drawMultiAnimation() {
  const settings = {
    canvas: canvas,
    ctx: ctx,
    bufferCanvas: null,
    bufferCtx: null,
    start: true,
  };

  function updateBall() {
    ballHash.posX += ballHash.speedX;

    // Проверяем совпадение позиций правой ракетки и мячика, если есть совпадение отбиваем, иначе мячик долетает до края поля и останавливается
    if (
      ballHash.posY + ballSize / 3 >= rightPaddleHash.posY &&
      ballHash.posY - ballSize / 3 <=
        rightPaddleHash.posY + rightPaddleHash.height &&
      ballHash.posX >= ballHash.deltaX - rightPaddleHash.width
    ) {
      ballHash.speedX = -ballHash.speedX;
      ballHash.posX = ballHash.deltaX - rightPaddleHash.width;
    } else if (ballHash.posX >= ballHash.deltaX) {
      ballHash.posX = ballHash.deltaX;
      settings.start = false;
      roundIsOver(rightPaddleHash);
      return;
    }
    // Проверяем совпадение позиций левой ракетки и мячика, если есть совпадение отбиваем, иначе мячик долетает до края поля и останавливается
    if (
      ballHash.posY + ballSize / 3 >= leftPaddleHash.posY &&
      ballHash.posY - ballSize / 3 <=
        leftPaddleHash.posY + leftPaddleHash.height &&
      ballHash.posX <= leftPaddleHash.width + ballSize / 2
    ) {
      ballHash.speedX = -ballHash.speedX;
      ballHash.posX = leftPaddleHash.width + ballSize / 2;
    } else if (ballHash.posX <= ballSize / 2) {
      ballHash.posX = ballSize / 2;
      leftPaddleHash.isMoving = false;
      rightPaddleHash.isMoving = false;
      settings.start = false;
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
    if (ballHash.posY <= ballSize / 2) {
      ballHash.speedY = -ballHash.speedY;
      ballHash.posY = ballSize / 2;
    }
  }

  function animate() {
    updateBall();
    leftPaddleHash.movePaddle();
    rightPaddleHash.movePaddle();
    drawCanvas(settings.bufferCtx);
    settings.ctx.drawImage(settings.bufferCanvas, 0, 0, w, h);
    if (settings.start) {
      requestAnimationFrame(animate);
    }
  }

  settings.bufferCanvas = document.createElement("canvas");
  settings.bufferCtx = settings.bufferCanvas.getContext("2d");
  settings.bufferCanvas.width = w;
  settings.bufferCanvas.height = h;

  requestAnimationFrame(animate);
}

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
  ballHash.randomSpeed();
  if (leftPaddleHash.score < 5 && rightPaddleHash.score < 5) {
    leftPaddleHash.posY = startPosYPaddle;
    rightPaddleHash.posY = startPosYPaddle;
    ballHash.posX = startPosXBall;
    ballHash.posY = startPosYBall;
    drawCanvas(ctx);
    countdown.innerText = "3";
    countdown.style.display = "none";
    countdown.style.opacity = "1";
    countdown.classList.add("start");
    countTimer = 3;
    // старт раунда
    leftPaddleHash.isMoving = true;
    rightPaddleHash.isMoving = true;
    timer();
    setTimeout(() => drawMultiAnimation(), 4000);
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

function keyUpHandler(event) {
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
}

startButton.addEventListener("click", () => {
  leftPaddleHash.isMoving = true;
  rightPaddleHash.isMoving = true;
  startButton.disabled = true;
  startNewGame();
});

document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyUpHandler);
