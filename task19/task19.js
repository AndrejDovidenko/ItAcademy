const canvasClock = document.createElement("CANVAS");
canvasClock.width = 500;
canvasClock.height = 500;
const clockWeight = parseFloat(canvasClock.getAttribute("width"));
const clockHeight = parseFloat(canvasClock.getAttribute("height"));
const clockRadius =
  clockWeight > clockHeight ? clockHeight / 2 : clockWeight / 2;
const smallCircleRadius = clockRadius * 0.08;
const stepArrowInDeg = 6; //(360/60 = 6)
const stepHourArrowInDeg = 30; //(360/12 = 30)
const stepIntermediateInDeg = 0.5; //(30/60 = 0.5 - промежуточный шаг часовой стрелки, происходит каждую минуту)
let angle = -60;
document.body.append(canvasClock);

document.addEventListener("DOMContentLoaded", function () {
  function drawClock() {
    let ctx = canvasClock.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "#cfefda";
    ctx.arc(clockWeight / 2, clockHeight / 2, clockRadius, 0, 2 * Math.PI);
    ctx.fill();

    for (let i = 0; i < 12; i++) {
      const radian = (angle * Math.PI) / 180;

      //находим координаты малого круга. Формула x = x0 + r * cos угла вектора.
      const x = clockWeight / 2 + clockRadius * 0.8 * Math.cos(radian);
      const y = clockHeight / 2 + clockRadius * 0.8 * Math.sin(radian);
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.arc(x, y, smallCircleRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "black";
      ctx.font = `${smallCircleRadius}px serif`;
      ctx.textAlign = "center";
      ctx.fillText(`${i + 1}`, x, y + (clockRadius * 0.08) / 3);

      angle += 30;
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";

    // рисуем стрелки
    ctx.translate(clockHeight / 2, clockWeight / 2);
    ctx.rotate((new Date().getSeconds() * stepArrowInDeg * Math.PI) / 180);
    ctx.beginPath();
    ctx.moveTo(0 - smallCircleRadius / 5, 0 + smallCircleRadius);
    ctx.lineTo(0 + smallCircleRadius / 5, 0 + smallCircleRadius);
    ctx.lineTo(0, -clockRadius * 0.8);
    ctx.fill();
    ctx.resetTransform();

    ctx.translate(clockHeight / 2, clockWeight / 2);
    ctx.rotate((new Date().getMinutes() * stepArrowInDeg * Math.PI) / 180);
    ctx.beginPath();
    ctx.moveTo(0 - smallCircleRadius / 5, 0 + smallCircleRadius);
    ctx.lineTo(0 + smallCircleRadius / 5, 0 + smallCircleRadius);
    ctx.lineTo(0, -clockRadius * 0.7);
    ctx.fill();
    ctx.resetTransform();

    ctx.translate(clockHeight / 2, clockWeight / 2);
    ctx.rotate(
      ((new Date().getHours() * stepHourArrowInDeg +
        new Date().getMinutes() * stepIntermediateInDeg) *
        Math.PI) /
        180
    );
    ctx.beginPath();
    ctx.moveTo(0 - smallCircleRadius / 4, 0 + smallCircleRadius);
    ctx.lineTo(0 + smallCircleRadius / 4, 0 + smallCircleRadius);
    ctx.lineTo(0, -clockRadius * 0.5);
    ctx.fill();
    ctx.resetTransform();

    // рисуем цифровые часы
    ctx.translate(clockHeight / 2, clockWeight / 2);
    ctx.fillStyle = "black";
    ctx.font = `${clockRadius * 0.15}px serif`;
    ctx.fillText(
      `${new Date().toLocaleTimeString()}`,
      0,
      0 - smallCircleRadius * 3
    );
    ctx.resetTransform();
  }

  setInterval(drawClock, 1000);
});
