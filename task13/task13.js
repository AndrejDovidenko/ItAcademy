const allMonths = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

let yourDate = new Date();

const body = document.querySelector("body");
const button = document.createElement("button");
const calendar = document.createElement("div");
button.innerText = "New Date";
button.className = "new-date";
body.appendChild(button);

function getYourDate() {
  const inputData = prompt(
    "Через запятую введите дату - число, месяц, год (Например: 1,1,2015)"
  );
  if (inputData === null) {
    alert("Введены некоректные данные");
    return false;
  }

  const data = inputData.replaceAll(" ", "").split(",");

  if (
    +data[0] &&
    +data[1] &&
    +data[2] &&
    data[0] > 0 &&
    data[0] <= 31 &&
    data[1] > 0 &&
    data[1] < 13 &&
    data[2].length === 4
  ) {
    yourDate = new Date(data[2], data[1] - 1, data[0]);
  } else {
    alert("Введены некоректные данные");
    return false;
  }
}

function createCalendar() {
  calendar.className = "calendar";

  calendar.innerHTML = `<div class ="title">
  <button class = "btn btn-prev-year">&lt&lt</button>
  <button class = "btn btn-prev-month">&lt</button>
  <h1>${allMonths[yourDate.getMonth()]} ${yourDate.getFullYear()} года</h1>
  <button class = "btn btn-next-month">&gt</button>
  <button class = "btn btn-next-year">&gt&gt</button>
  </div>
  <div class="days">
    <div class="day"><p class ="day-name">пн</p></div>
    <div class="day"><p class ="day-name">вт</p></div>
    <div class="day"><p class ="day-name">ср</p></div>
    <div class="day"><p class ="day-name">чт</p></div>
    <div class="day"><p class ="day-name">пт</p></div>
    <div class="day weekend"><p class ="day-name">сб</p></div>
    <div class="day weekend"><p class ="day-name">вс</p></div>
  </div>`;

  const allDay = calendar.querySelectorAll(".day");
  const firstDay = new Date(yourDate.getFullYear(), yourDate.getMonth(), 1);
  const lastDay = new Date(yourDate.getFullYear(), yourDate.getMonth() + 1, 0);
  const dayOfWeekFirstDay = !firstDay.getDay() ? 7 : firstDay.getDay();
  const dayOfWeekLastDay = !lastDay.getDay() ? 7 : lastDay.getDay();

  firstDay.setDate(firstDay.getDate() - (dayOfWeekFirstDay - 1));

  const dateRange =
    lastDay.getDate() + (dayOfWeekFirstDay - 1) + 7 - dayOfWeekLastDay;

  for (let i = 0; i < dateRange; i++) {
    const el = document.createElement("p");
    el.innerHTML = firstDay.getDate();
    el.classList.add("num");

    if (
      yourDate.getDate() === firstDay.getDate() &&
      yourDate.getMonth() === firstDay.getMonth()
    ) {
      el.classList.add("this-day");
    }

    if (yourDate.getMonth() !== firstDay.getMonth()) {
      el.classList.add("another-month");
    }

    if (!firstDay.getDay()) {
      allDay[6].appendChild(el);
    } else {
      allDay[firstDay.getDay() - 1].appendChild(el);
    }

    firstDay.setDate(firstDay.getDate() + 1);
  }

  body.prepend(calendar);
}

createCalendar();

body.addEventListener("click", (e) => {
  const btnPrevMonth = e.target.closest(".btn-prev-month");
  const btnPrevYear = e.target.closest(".btn-prev-year");
  const btnNextMonth = e.target.closest(".btn-next-month");
  const btnNextYear = e.target.closest(".btn-next-year");
  const nextMonthLastDay = new Date(
    yourDate.getFullYear(),
    yourDate.getMonth() + 2,
    0
  ).getDate();
  const prevMonthLastDay = new Date(
    yourDate.getFullYear(),
    yourDate.getMonth(),
    0
  ).getDate();
  const nextYearLastDay = new Date(
    yourDate.getFullYear() + 1,
    yourDate.getMonth() + 1,
    0
  ).getDate();
  const prevYearLastDay = new Date(
    yourDate.getFullYear() - 1,
    yourDate.getMonth() + 1,
    0
  ).getDate();

  if (btnPrevMonth) {
    prevMonthLastDay < yourDate.getDate() ? yourDate.setDate(1) : false;

    yourDate.setMonth(yourDate.getMonth() - 1);
    createCalendar();
  }
  if (btnPrevYear) {
    prevYearLastDay < yourDate.getDate() ? yourDate.setDate(1) : false;

    yourDate.setFullYear(yourDate.getFullYear() - 1);
    createCalendar();
  }
  if (btnNextMonth) {
    nextMonthLastDay < yourDate.getDate() ? yourDate.setDate(1) : false;

    yourDate.setMonth(yourDate.getMonth() + 1);
    createCalendar();
  }
  if (btnNextYear) {
    nextYearLastDay < yourDate.getDate() ? yourDate.setDate(1) : false;

    yourDate.setFullYear(yourDate.getFullYear() + 1);
    createCalendar();
  }
});

button.addEventListener("click", () => {
  if (!getYourDate()) {
    createCalendar();
  }
});
