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

let YourDate = new Date();

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
    YourDate = new Date(data[2], data[1] - 1, data[0]);
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
  <h1>${allMonths[YourDate.getMonth()]} ${YourDate.getFullYear()} года</h1>
  <button class = "btn btn-next-month">&gt</button>
  <button class = "btn btn-next-year">&gt&gt</button>
  </div>
  <div class="days">
    <div class="day">пн</div>
    <div class="day">вт</div>
    <div class="day">ср</div>
    <div class="day">чт</div>
    <div class="day">пт</div>
    <div class="day">сб</div>
    <div class="day">вс</div>
  </div>`;

  const allDay = calendar.querySelectorAll(".day");
  const FirstDay = new Date(YourDate.getFullYear(), YourDate.getMonth(), 1);
  //   const dayNum = FirstDay.getDay() - 2;
  //   const prev = new Date(YourDate.getFullYear(), YourDate.getMonth(), -dayNum);
  for (let i = 0; i < allDay.length - 1; i++) {
    const el = document.createElement("p");
    if (i < FirstDay.getDay() - 1 || !FirstDay.getDay()) {
      //   el.innerText = prev.getDate() + i;
      allDay[i].appendChild(el);
    }
  }

  const lastDate = new Date(
    YourDate.getFullYear(),
    YourDate.getMonth() + 1,
    0
  ).getDate();

  for (let i = 0; i < lastDate; i++) {
    const el = document.createElement("p");

    if (YourDate.getDate() === i + 1) {
      el.style.backgroundColor = "red";
    }
    el.innerHTML = i + 1;

    if (!FirstDay.getDay()) {
      allDay[6].appendChild(el);
    } else {
      allDay[FirstDay.getDay() - 1].appendChild(el);
    }

    FirstDay.setDate(FirstDay.getDate() + 1);
  }

  body.appendChild(calendar);
}

createCalendar();

body.addEventListener("click", (e) => {
  const btnPrevMonth = e.target.closest(".btn-prev-month");
  const btnPrevYear = e.target.closest(".btn-prev-year");
  const btnNextMonth = e.target.closest(".btn-next-month");
  const btnNextYear = e.target.closest(".btn-next-year");
  const nextMonthLastDay = new Date(
    YourDate.getFullYear(),
    YourDate.getMonth() + 2,
    0
  ).getDate();
  const prevMonthLastDay = new Date(
    YourDate.getFullYear(),
    YourDate.getMonth(),
    0
  ).getDate();
  const nextYearLastDay = new Date(
    YourDate.getFullYear() + 1,
    YourDate.getMonth() + 1,
    0
  ).getDate();
  const prevYearLastDay = new Date(
    YourDate.getFullYear() - 1,
    YourDate.getMonth() + 1,
    0
  ).getDate();

  if (btnPrevMonth) {
    prevMonthLastDay < YourDate.getDate() ? YourDate.setDate(1) : false;

    YourDate.setMonth(YourDate.getMonth() - 1);
    createCalendar();
  }
  if (btnPrevYear) {
    prevYearLastDay < YourDate.getDate() ? YourDate.setDate(1) : false;

    YourDate.setFullYear(YourDate.getFullYear() - 1);
    createCalendar();
  }
  if (btnNextMonth) {
    nextMonthLastDay < YourDate.getDate() ? YourDate.setDate(1) : false;

    YourDate.setMonth(YourDate.getMonth() + 1);
    createCalendar();
  }
  if (btnNextYear) {
    nextYearLastDay < YourDate.getDate() ? YourDate.setDate(1) : false;

    YourDate.setFullYear(YourDate.getFullYear() + 1);
    createCalendar();
  }
});

button.addEventListener("click", () => {
  if (!getYourDate()) {
    createCalendar();
  }
});
