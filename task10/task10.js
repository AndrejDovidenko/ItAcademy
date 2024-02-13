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

let month = null;
let year = null;
let YourDate = null;

const body = document.querySelector("body");
const button = document.createElement("button");
const calendar = document.createElement("div");
button.innerText = "New Date";
body.appendChild(button);

function getYourDate() {
  const inputData = prompt(
    "Через запятую введите номер месяца и год (Например: 1, 2015)"
  );
  if (inputData === null) {
    alert("Введены некоректные данные");
    return 1;
  }

  const data = inputData.split(",");

  if (
    +data[0] &&
    +data[1] &&
    data[0] > 0 &&
    data[0] < 13 &&
    data[1].length === 4
  ) {
    month = data[0] - 1;
    year = data[1];
    YourDate = new Date(year, month);
  } else {
    alert("Введены некоректные данные");
    return 1;
  }
}

function createCalendar() {
  calendar.className = "calendar";

  calendar.innerHTML = `
<h1>${allMonths[month]} ${year} года</h1>
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

  for (let i = 0; i < allDay.length; i++) {
    const el = document.createElement("p");
    if (i < YourDate.getDay() - 1) {
      allDay[i].appendChild(el);
    }
  }

  while (YourDate.getMonth() === month) {
    const el = document.createElement("p");
    el.innerHTML = YourDate.getDate();

    if (!YourDate.getDay()) {
      allDay[6].appendChild(el);
    } else {
      allDay[YourDate.getDay() - 1].appendChild(el);
    }

    YourDate.setDate(YourDate.getDate() + 1);
  }

  body.appendChild(calendar);
}

button.addEventListener("click", () => {
  if (getYourDate() !== 1) {
    createCalendar();
  }
});
