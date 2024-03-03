const body = document.querySelector("body");
const clockFace = document.createElement("div");
const hoursArrow = document.createElement("div");
const minuteArrow = document.createElement("div");
const secondArrow = document.createElement("div");
hoursArrow.className = "hours-arrow arrow";
minuteArrow.className = "minute-arrow arrow";
secondArrow.className = "second-arrow arrow";
clockFace.classList.add("clock-face");

const stepArrowInDeg = 6; //(360/60 = 6)
const stepHourArrowInDeg = 30; //(360/12 = 30)
const stepIntermediateInDeg = 0.5; //(30/60 = 0.5 - промежуточный шаг часовой стрелки, происходит каждую минуту)

body.append(clockFace);

function addNumberOfHours() {
  for (let i = 1; i <= 12; i++) {
    const wrapper = document.createElement("div");
    const numberOfHours = document.createElement("p");
    numberOfHours.classList.add("number-of-hours");
    wrapper.classList.add("wrapper");

    numberOfHours.append(i);
    wrapper.append(numberOfHours);
    clockFace.append(wrapper);
  }
}

function addArrows() {
  clockFace.append(hoursArrow, minuteArrow, secondArrow);
  const allArrows = document.querySelectorAll(".arrow");
  for (let i = 0; i < allArrows.length; i++) {
    const div = document.createElement("div");
    allArrows[i].append(div);
  }
}

function setCurrentValue() {
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

addNumberOfHours();
addArrows();
setCurrentValue();
startClock();
