const body = document.querySelector("body");
const clockFace = document.createElement("div");
const hoursArrow = document.createElement("div");
const minuteArrow = document.createElement("div");
const secondArrow = document.createElement("div");
hoursArrow.className = "hours-arrow arrow";
minuteArrow.className = "minute-arrow arrow";
secondArrow.className = "second-arrow arrow";
clockFace.classList.add("clock-face");

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

addNumberOfHours();
addArrows();

function setCurrentValue() {
  const time = new Date();

  const degreeSecondArrow = time.getSeconds() * 6;
  const degreeMinuteArrow = time.getMinutes() * 6;
  const degreeHoursArrow = time.getHours() * 30 + (degreeMinuteArrow / 6) * 0.5;

  secondArrow.style.setProperty(
    "--deg-second-arrow",
    `${degreeSecondArrow}deg`
  );
  minuteArrow.style.setProperty(
    "--deg-minute-arrow",
    `${degreeMinuteArrow}deg`
  );
  hoursArrow.style.setProperty("--deg-hour-arrow", `${degreeHoursArrow}deg`);
}

function startClock() {
  setInterval(setCurrentValue, 1000);
}

startClock();
