class DateStorage {
  constructor() {
    this.storage = {};
  }

  addValue(key, value) {
    this.storage[key] = value;
  }

  getValue(key) {
    return this.storage[key];
  }

  removeValue(key) {
    delete this.storage[key];
  }
}

const storage = new DateStorage();

const allMonths = [
  "Выбрать месяц",
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

const startYear = 1980;
const currentYear = new Date().getFullYear();
const allYears = Array.from(
  { length: currentYear - startYear + 1 },
  (_, i) => startYear + i
);
allYears.unshift("Выбрать год");

let yourDate = new Date();

const body = document.querySelector("body");
const header = document.createElement("header");
const labelYear = document.createElement("label");
const labelMonth = document.createElement("label");
const selectYear = document.createElement("select");
const selectMonth = document.createElement("select");

const buttonCreate = document.createElement("button");
const buttonRemove = document.createElement("button");
const calendar = document.createElement("div");
buttonCreate.innerHTML = "Создать";
buttonCreate.className = "button button-create";
buttonCreate.setAttribute("disabled", "disabled");
buttonRemove.innerHTML = "Удалить";
buttonRemove.className = "button button-remove";
calendar.setAttribute("id", "1");
selectYear.classList.add("select-year");
selectMonth.classList.add("select-month");
body.append(header);
header.append(labelYear);
labelYear.append("Год: ", selectYear);
header.append(labelMonth);
labelMonth.append("Месяц: ", selectMonth);
header.append(buttonCreate);
header.append(buttonRemove);

storage.addValue(calendar.id, yourDate);

function createOptions(arr, item) {
  arr.forEach((el) => {
    const option = document.createElement("option");
    option.append(el);
    item.append(option);
  });
}

createOptions(allYears, selectYear);
createOptions(allMonths, selectMonth);

function getYourDate() {
  const inputData = [selectYear.value, selectMonth.selectedIndex];
  const data = inputData;

  return new Date(data[0], data[1] - 1);
}

function createCalendar(item, date) {
  item.className = "calendar";

  item.innerHTML = `<div class ="title">
    <button class = "btn btn-prev-year">&lt&lt</button>
    <button class = "btn btn-prev-month">&lt</button>
    <h1>${allMonths[date.getMonth() + 1]} ${date.getFullYear()} года</h1>
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

  const allDay = item.querySelectorAll(".day");
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
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
      date.getDate() === firstDay.getDate() &&
      date.getMonth() === firstDay.getMonth()
    ) {
      el.classList.add("this-day");
    }

    if (date.getMonth() !== firstDay.getMonth()) {
      el.classList.add("another-month");
    } else {
      el.classList.add("this-month");
    }

    if (!firstDay.getDay()) {
      allDay[6].appendChild(el);
    } else {
      allDay[firstDay.getDay() - 1].appendChild(el);
    }

    firstDay.setDate(firstDay.getDate() + 1);
  }

  return item;
}

body.append(createCalendar(calendar, yourDate));

function flipCalendar(sign, period, item) {
  const date = storage.getValue(+item.id);
  if (sign === "-" && period === "month") {
    date.setMonth(date.getMonth() - 1);
  } else if (sign === "+" && period === "month") {
    date.setMonth(date.getMonth() + 1);
  } else if (sign === "-" && period === "year") {
    date.setFullYear(date.getFullYear() - 1);
  } else if (sign === "+" && period === "year") {
    date.setFullYear(date.getFullYear() + 1);
  }
  const newCalendar = createCalendar(item, date);
  item.replaceWith(newCalendar);
}

function createNewCalendar() {
  const newYourDate = getYourDate();

  const calendar = document.createElement("div");
  const arrCalendars = document.querySelectorAll(".calendar");
  const lastId = arrCalendars.length;

  storage.addValue(+lastId + 1, newYourDate);
  calendar.setAttribute("id", +lastId + 1);
  body.append(createCalendar(calendar, newYourDate));
  buttonRemove.removeAttribute("disabled", "disabled");
}

function headerChangeHandler() {
  const arrSelects = header.querySelectorAll("select");
  if (arrSelects[0].selectedIndex === 0 || arrSelects[1].selectedIndex === 0) {
    buttonCreate.setAttribute("disabled", "disabled");
  } else if (
    arrSelects[0].selectedIndex !== 0 &&
    arrSelects[1].selectedIndex !== 0
  ) {
    buttonCreate.removeAttribute("disabled", "disabled");
  }
}

function bodyClickHandler(e) {
  const buttonCreate = e.target.closest(".button-create");
  const buttonRemove = e.target.closest(".button-remove");
  const btnPrevMonth = e.target.closest(".btn-prev-month");
  const btnPrevYear = e.target.closest(".btn-prev-year");
  const btnNextMonth = e.target.closest(".btn-next-month");
  const btnNextYear = e.target.closest(".btn-next-year");
  const thisCalendar = e.target.closest(".calendar");
  const cell = e.target.closest(".this-month");
  const date = storage.getValue(+thisCalendar?.id);
  const nextMonthLastDay = new Date(
    date?.getFullYear(),
    date?.getMonth() + 2,
    0
  ).getDate();
  const prevMonthLastDay = new Date(
    date?.getFullYear(),
    date?.getMonth(),
    0
  ).getDate();
  const nextYearLastDay = new Date(
    date?.getFullYear() + 1,
    date?.getMonth() + 1,
    0
  ).getDate();
  const prevYearLastDay = new Date(
    date?.getFullYear() - 1,
    date?.getMonth() + 1,
    0
  ).getDate();

  if (btnPrevMonth) {
    prevMonthLastDay < date.getDate() ? date.setDate(1) : false;
    flipCalendar("-", "month", thisCalendar);
  }
  if (btnPrevYear) {
    prevYearLastDay < date.getDate() ? date.setDate(1) : false;
    flipCalendar("-", "year", thisCalendar);
  }
  if (btnNextMonth) {
    nextMonthLastDay < date.getDate() ? date.setDate(1) : false;
    flipCalendar("+", "month", thisCalendar);
  }
  if (btnNextYear) {
    nextYearLastDay < date.getDate() ? date.setDate(1) : false;
    flipCalendar("+", "year", thisCalendar);
  }
  if (cell) {
    const thisDay = thisCalendar.querySelector(".this-day");
    thisDay.classList.remove("this-day");
    cell.classList.add("this-day");
  }

  if (buttonRemove) {
    const arrCalendars = document.getElementsByClassName("calendar");
    storage.removeValue(arrCalendars[0].id);
    arrCalendars[0].remove();
    if (!arrCalendars.length) {
      buttonRemove.setAttribute("disabled", "disabled");
    }
  }

  if (buttonCreate) {
    createNewCalendar();
  }
}

header.addEventListener("change", headerChangeHandler);
body.addEventListener("click", bodyClickHandler);
