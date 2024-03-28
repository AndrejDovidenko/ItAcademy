const body = document.querySelector("body");
const modal = document.createElement("div");
const welcome = document.createElement("h2");
const labelName = document.createElement("label");
const inputName = document.createElement("input");
const birthdayBlock = document.createElement("div");
const textBirthdayBlock = document.createElement("h2");
const labelDay = document.createElement("label");
const selectDay = document.createElement("select");
const labelMonth = document.createElement("label");
const selectMonth = document.createElement("select");
const labelYear = document.createElement("label");
const selectYear = document.createElement("select");
const buttonSend = document.createElement("button");
const countDownBlock = document.createElement("div");
const textCountDown = document.createElement("h2");
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

let intId = null;

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
  birthdayBlock.classList.add("birthday-date");
  buttonSend.classList.add("button-send");
  countDownBlock.classList.add("count-down-block");
  inputName.setAttribute("type", "text");
  inputName.setAttribute("placeholder", "Введите ваше имя");
  welcome.textContent = "Привет пользователь, давай знакомиться!";
  textBirthdayBlock.textContent = "Выберите дату вашего рождения:";
  buttonSend.textContent = "Send";
  selectDay.disabled = true;
  buttonSend.disabled = true;

  labelName.append(inputName);
  labelDay.append(selectDay);
  labelMonth.append(selectMonth);
  labelYear.append(selectYear);
  birthdayBlock.append(labelYear, labelMonth, labelDay);
  countDownBlock.append(textCountDown, digitalTime);
  modal.append(
    welcome,
    labelName,
    textBirthdayBlock,
    birthdayBlock,
    buttonSend
  );
  body.append(modal, countDownBlock);

  createOptions(allYears, selectYear);
  createOptions(allMonths, selectMonth);
  createOptions(["Выбрать день"], selectDay);
}

renderDom();

function countDown() {
  const birthdayMonth = +localStorage.getItem("birthdayMonth");
  const birthdayDay = +localStorage.getItem("birthdayDay");
  const name = localStorage.getItem("userName");

  if (birthdayDay && birthdayMonth) {
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

    textCountDown.textContent = `Привет ${name}! До твоего дня рождения осталось:`;
    digitalTime.textContent = `${months} мес. ${days} д. ${hours} ч. ${minutes} мин. ${seconds} сек.`;
  } else {
    countDownBlock.classList.remove("show");
    modal.classList.add("show");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (
    localStorage.getItem("birthdayDay") &&
    localStorage.getItem("birthdayMonth") &&
    localStorage.getItem("birthdayYear") &&
    localStorage.getItem("userName")
  ) {
    countDownBlock.classList.add("show");
    countDown();
    intId = setInterval(countDown, 1000);
  } else {
    modal.classList.add("show");
  }
});

modal.addEventListener("input", () => {
  if (selectYear.selectedIndex > 0 && selectMonth.selectedIndex > 0) {
    createOptionsDay(selectYear.value, selectMonth.selectedIndex);
    selectDay.disabled = false;
  }

  if (
    inputName.value.length > 2 &&
    selectYear.selectedIndex > 0 &&
    selectMonth.selectedIndex > 0 &&
    selectDay.selectedIndex > 0
  ) {
    buttonSend.disabled = false;
  } else {
    buttonSend.disabled = true;
  }
});

buttonSend.addEventListener("click", () => {
  localStorage.setItem("userName", `${inputName.value}`);
  localStorage.setItem("birthdayYear", `${selectYear.value}`);
  localStorage.setItem("birthdayMonth", `${selectMonth.selectedIndex - 1}`);
  localStorage.setItem("birthdayDay", `${selectDay.value}`);
  modal.classList.remove("show");
  countDownBlock.classList.add("show");
  clearInterval(intId);
  countDown();
  intId = setInterval(countDown, 1000);
});
