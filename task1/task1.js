const body = document.querySelector("body");

body.addEventListener("click", (e) => {
  const rectangle = e.target.closest(".rectangle");
  const season = e.target.closest(".season");
  const number = e.target.closest(".number");
  if (rectangle) {
    getRectanglePar();
  }
  if (season) {
    getTheSeason();
  }
  if (number) {
    getNumberPar();
  }
});

function getRectanglePar() {
  const inputData = prompt(
    "Через запятую введите длину и ширину прямоугольника"
  );
  if (inputData === null) {
    return console.log("User clicked the cancel button");
  }
  const length = Number(inputData.split(",")[0]);
  const width = Number(inputData.split(",")[1]);
  if (!length || !width) {
    return console.log("Incorrect data entered");
  }
  const perimeter = length * 2 + width * 2;
  const square = length * width;
  if (length === width) {
    return console.log(
      `This figure is a foursquare. Perimeter is ${perimeter}. Square is ${square}`
    );
  } else {
    return console.log(`Perimeter is ${perimeter}. Square is ${square}`);
  }
}
// getRectanglePar();

function getTheSeason() {
  const inputData = prompt("какой сечас месяц? (введите число от 1 до 12)");
  const month = Number(inputData);
  if ((month > 0 && month < 3) || month === 12) {
    return console.log("it's winter now");
  } else if (month > 2 && month < 6) {
    return console.log("it's spring now");
  } else if (month > 5 && month < 9) {
    return console.log("it's summer now");
  } else if (month > 8 && month < 12) {
    return console.log("it's autumn now");
  } else {
    return console.log("Incorrect data entered");
  }
}

// getTheSeason();

// конструкция Switch:

function getTheSeasonSwitch() {
  const inputData = prompt("какой сечас месяц? (введите число от 1 до 12)");
  const month = Number(inputData);
  switch (month) {
    case 1:
      console.log("it's winter now");
      break;
    case 2:
      console.log("it's winter now");
      break;
    case 3:
      console.log("it's spring now");
      break;
    case 4:
      console.log("it's spring now");
      break;
    case 5:
      console.log("it's spring now");
      break;
    case 6:
      console.log("it's summer now");
      break;
    case 7:
      console.log("it's summer now");
      break;
    case 8:
      console.log("it's summer now");
      break;
    case 9:
      console.log("it's autumn now");
      break;
    case 10:
      console.log("it's autumn now");
      break;
    case 11:
      console.log("it's autumn now");
      break;
    case 12:
      console.log("it's winter now");
      break;
    default:
      console.log("Incorrect data entered");
  }
}

//  Или можно вот так:

function getTheSeasonSwitch() {
  const inputData = prompt("какой сечас месяц? (введите число от 1 до 12)");
  const month = Number(inputData);
  switch (true) {
    case (month > 0 && month < 3) || month === 12:
      console.log("it's winter now");
      break;
    case month > 2 && month < 6:
      console.log("it's spring now");
      break;
    case month > 5 && month < 9:
      console.log("it's summer now");
      break;
    case month > 8 && month < 12:
      console.log("it's autumn now");
      break;
    default:
      console.log("Incorrect data entered");
  }
}

// getTheSeasonSwitch();

function getNumberPar() {
  const inputData = prompt("Введите любое число");
  const num = Number(inputData);
  let result = `${num} это`;
  if (!num && num != 0) {
    result = "Incorrect data entered";
    return console.log(result);
  } else {
    if (num % 2 === 0) {
      result += " четное,";
    } else {
      result += " нечетное,";
    }

    if (Number.isInteger(num)) {
      result += " целое,";
    } else {
      result += " дробное,";
    }

    if (num > 0) {
      result += " положительное число.";
    } else if (num == 0) {
      result +=
        " уникальное число(не является ни положительным, ни отрицательным).";
    } else {
      result += " отрицательное число.";
    }
  }
  return console.log(result);
}

// getNumberPar();
