const body = document.querySelector("body");
const modal = document.createElement("div");
const labelName = document.createElement("label");
const inputName = document.createElement("input");
const birthdayBlock = document.createElement("div");
const labelDay = document.createElement("label");
const selectDay = document.createElement("select");
const labelMonth = document.createElement("label");
const selectMonth = document.createElement("select");
const labelYear = document.createElement("label");
const selectYear = document.createElement("select");
const buttonSend = document.createElement("button");
const digitalTime = document.createElement("p");

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

function createOptions(arr, item) {
  arr.forEach((el) => {
    const option = document.createElement("option");
    option.append(el);
    item.append(option);
  });
}

function createOptionsDay(year, month) {
  const firstDay = 1;
  const lastDay = new Date(year, month, 0).getDate();
  const allDays = Array.from({ length: lastDay }, (_, i) => firstDay + i);
  createOptions(allDays, selectDay);
}

function renderDom() {
  modal.classList.add("modal");
  labelName.classList.add("label-name");
  inputName.classList.add("input-name");
  birthdayBlock.classList.add("birthday-day");
  buttonSend.classList.add("button-send");
  digitalTime.classList.add("digital-time");
  inputName.setAttribute("type", "text");
  labelName.textContent = "Name";
  buttonSend.textContent = "Send";

  labelName.append(inputName);
  labelDay.append(selectDay);
  labelMonth.append(selectMonth);
  labelYear.append(selectYear);
  birthdayBlock.append(labelYear, labelMonth, labelDay);
  modal.append(labelName, birthdayBlock, buttonSend);
  body.append(modal, digitalTime);

  createOptions(allYears, selectYear);
  createOptions(allMonths, selectMonth);
  createOptions(["Выбрать день"], selectDay);
}

renderDom();

function countDown() {
  const birthdayMonth = +localStorage.getItem("birthdayMonth");
  const birthdayDay = +localStorage.getItem("birthdayDay");
  const currentDate = new Date();
  const birthdayDate = new Date(
    currentDate.getFullYear(),
    birthdayMonth,
    birthdayDay
  );
  const birthdayDateNext = new Date(
    currentDate.getFullYear() + 1,
    birthdayMonth,
    birthdayDay
  );
  const difference =
    currentDate < birthdayDate
      ? birthdayDate - currentDate
      : birthdayDateNext - currentDate;

  const months = Math.floor((difference / (1000 * 60 * 60 * 24 * 30.5)) % 12);
  const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 30.5);
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  //   body.append(digitalTime);
  digitalTime.innerHTML = `Осталось ${months} месяц(а/ев), ${days} д ${hours} ч ${minutes} мин ${seconds} сек`;

  setInterval(countDown, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  if (
    localStorage.getItem("birthdayDay") &&
    localStorage.getItem("birthdayMonth") &&
    localStorage.getItem("birthdayYear") &&
    localStorage.getItem("userName")
  ) {
    digitalTime.classList.add("show");
    countDown();
  } else {
    modal.classList.add("show");
  }
});

birthdayBlock.addEventListener("input", () => {
  if (selectYear.selectedIndex > 0 && selectMonth.selectedIndex > 0) {
    createOptionsDay(selectYear.value, selectMonth.selectedIndex);
  }
});

buttonSend.addEventListener("click", () => {
  localStorage.setItem("userName", `${inputName.value}`);
  localStorage.setItem("birthdayYear", `${selectYear.value}`);
  localStorage.setItem("birthdayMonth", `${selectMonth.selectedIndex - 1}`);
  localStorage.setItem("birthdayDay", `${selectDay.value}`);
  modal.classList.remove("show");
  digitalTime.classList.add("show");
  countDown();
});
