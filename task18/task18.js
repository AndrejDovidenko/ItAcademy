const svgNS = "http://www.w3.org/2000/svg";

const body = document.querySelector("body");
const svg = document.createElementNS(svgNS, "svg");
const clockFace = document.createElementNS(svgNS, "circle");
const hoursArrow = document.createElementNS(svgNS, "polygon");
const minuteArrow = document.createElementNS(svgNS, "polygon");
const secondArrow = document.createElementNS(svgNS, "polygon");
const digitalTime = document.createElementNS(svgNS, "text");
const digitalPath = document.createElementNS(svgNS, "path");
const digitalTextPath = document.createElementNS(svgNS, "textPath");
svg.setAttributeNS(null, "width", "500");
svg.setAttributeNS(null, "height", "500");
const w = parseFloat(svg.getAttributeNS(null, "width"));
const h = parseFloat(svg.getAttributeNS(null, "height"));

const stepArrowInDeg = 6; //(360/60 = 6)
const stepHourArrowInDeg = 30; //(360/12 = 30)
const stepIntermediateInDeg = 0.5; //(30/60 = 0.5 - промежуточный шаг часовой стрелки, происходит каждую минуту)

body.append(svg);

function drawClock() {
  let angle = -60;
  clockFace.setAttributeNS(null, "cx", w / 2);
  clockFace.setAttributeNS(null, "cy", h / 2);
  clockFace.setAttributeNS(null, "r", w >= h ? h / 2 : w / 2);
  clockFace.setAttributeNS(null, "fill", "#cfefda");

  //получаем координаты центра, радиусы основного круга и малых кругов
  const x0 = parseFloat(clockFace.getAttributeNS(null, "cx"));
  const y0 = parseFloat(clockFace.getAttributeNS(null, "cy"));
  const clockFaceRadius = parseFloat(clockFace.getAttributeNS(null, "r"));
  const smallCircleRadius = clockFaceRadius * 0.08;
  svg.append(clockFace);

  for (let i = 0; i < 12; i++) {
    const circle = document.createElementNS(svgNS, "circle");
    const text = document.createElementNS(svgNS, "text");
    const path = document.createElementNS(svgNS, "path");
    const textPath = document.createElementNS(svgNS, "textPath");
    const radian = (angle * Math.PI) / 180;

    //находим координаты малого круга. Формула x = x0 + r * cos угла вектора.
    const x = x0 + clockFaceRadius * 0.8 * Math.cos(radian);
    const y = y0 + clockFaceRadius * 0.8 * Math.sin(radian);

    circle.setAttributeNS(null, "cx", x);
    circle.setAttributeNS(null, "cy", y);
    circle.setAttributeNS(null, "r", smallCircleRadius);
    circle.setAttributeNS(null, "fill", "white");

    //проводим линию внутри малого круга для последующего выравнивания текста
    path.setAttributeNS(
      null,
      "d",
      `M${x - smallCircleRadius} ${y + smallCircleRadius / 3} L${
        x + smallCircleRadius
      } ${y + smallCircleRadius / 3}`
    );
    path.setAttributeNS(null, "id", i);

    //Выравниваем текст внутри малого круга
    textPath.innerHTML = i + 1;
    textPath.setAttributeNS(null, "href", `#${i}`);
    textPath.setAttributeNS(null, "startOffset", "50%");
    textPath.setAttributeNS(null, "text-anchor", "middle");
    text.style.fontSize = `${clockFaceRadius * 0.1}`;

    text.append(textPath);
    svg.append(circle, path, text);

    angle += 30;
  }

  //проводим линию внутри clockFace для последующего размещения на ней цифрового времени
  digitalPath.setAttributeNS(
    null,
    "d",
    `M${x0 - clockFaceRadius} ${y0 - clockFaceRadius * 0.3} L${
      x0 + clockFaceRadius
    } ${y0 - clockFaceRadius * 0.3}`
  );
  digitalPath.setAttributeNS(null, "id", "digital");

  //Выравниваем цифровое время внутри clockFace
  digitalTextPath.innerHTML = "00:00:00";
  digitalTextPath.setAttributeNS(null, "href", "#digital");
  digitalTextPath.setAttributeNS(null, "startOffset", "50%");
  digitalTextPath.setAttributeNS(null, "text-anchor", "middle");
  digitalTime.style.fontSize = `${clockFaceRadius * 0.2}`;

  digitalTime.append(digitalTextPath);
  svg.append(digitalPath, digitalTime);

  //Рисуем и добавляем сирелки
  secondArrow.setAttributeNS(
    null,
    "points",
    `${x0 - clockFaceRadius * 0.01} ${y0 + smallCircleRadius}, ${
      x0 + clockFaceRadius * 0.01
    } ${y0 + smallCircleRadius}, ${clockFaceRadius} ${
      y0 - clockFaceRadius * 0.8
    }`
  );
  secondArrow.setAttributeNS(null, "stroke", "black");
  secondArrow.setAttributeNS(null, "class", "second-arrow");

  minuteArrow.setAttributeNS(
    null,
    "points",
    `${x0 - clockFaceRadius * 0.01} ${y0 + smallCircleRadius}, ${
      x0 + clockFaceRadius * 0.01
    } ${y0 + smallCircleRadius}, ${clockFaceRadius} ${
      y0 - clockFaceRadius * 0.7
    }`
  );
  minuteArrow.setAttributeNS(null, "stroke", "black");
  minuteArrow.setAttributeNS(null, "class", "minute-arrow");

  hoursArrow.setAttributeNS(
    null,
    "points",
    `${x0 - clockFaceRadius * 0.015} ${y0 + smallCircleRadius}, ${
      x0 + clockFaceRadius * 0.015
    } ${y0 + smallCircleRadius}, ${clockFaceRadius} ${
      y0 - clockFaceRadius * 0.6
    }`
  );
  hoursArrow.setAttributeNS(null, "stroke", "black");
  hoursArrow.setAttributeNS(null, "class", "hour-arrow");
  svg.append(hoursArrow, secondArrow, minuteArrow, digitalPath);
}

function setCurrentValue() {
  digitalTextPath.innerHTML = new Date().toLocaleTimeString();
  // поворачиваю секундную стрелку: 1) получаю текущую секунду и умножаю это значение на шаг стрелки в градусах;
  // 2)присваиваю полученое значение СSS переменной для изменения значения свойства transform: rotate(--deg).

  secondArrow.style.setProperty(
    "--deg-second-arrow",
    `${new Date().getSeconds() * stepArrowInDeg}deg`
  );

  // поворачиваю минутную стрелку

  minuteArrow.style.setProperty(
    "--deg-minute-arrow",
    `${new Date().getMinutes() * stepArrowInDeg}deg`
  );

  // поворачиваю часовую стрелку: 1) получаю текущий час и умножаю это значение на шаг часовой стрелки в градусах;
  // 2) к полученому значению прибавляю промежуточное заначение(текущая минута * на промежуточный шаг);
  // 3) присваиваю полученое значение СSS переменной для изменения значения свойства transform: rotate(--deg).

  hoursArrow.style.setProperty(
    "--deg-hour-arrow",
    `${
      new Date().getHours() * stepHourArrowInDeg +
      new Date().getMinutes() * stepIntermediateInDeg
    }deg`
  );
}

function startClock() {
  setInterval(setCurrentValue, 1000);
}

drawClock();
setCurrentValue();
startClock();
