function pow(num) {
  let count = 1;

  return (deg = 2) => {
    let res = 1;
    recursion();

    function recursion() {
      if (deg < count) {
        count = 1;

        return console.log(`${num}^${deg} = ${res}`);
      }

      res *= num;
      count++;
      recursion();
    }
  };
}

pow(-2)(10);
pow(3)(3);
pow(3)(5);
pow(-2)(5);

// const two = pow(2);
// two(2);
// two(3);
// two(4);
// two(5);
// two(10);

function calculate(a) {
  return function (sign) {
    return function (b) {
      let res = "";

      if (sign === "/" && b === 0) {
        res = `${a} ${sign} ${b} = ошибка(на ноль делить нельзя)`;
      } else if (sign === "+") {
        res = `${a} ${sign} ${b} = ${a + b}`;
      } else if (sign === "-") {
        res = `${a} ${sign} ${b} = ${a - b}`;
      } else if (sign === "*") {
        res = `${a} ${sign} ${b} = ${a * b}`;
      } else if (sign === "/") {
        res = `${a} ${sign} ${b} = ${a / b}`;
      }

      return console.log(res);
    };
  };
}

calculate(3)("+")(5);
calculate(3)("/")(5);
calculate(3)("-")(5);
calculate(3)("*")(5);
calculate(3)("/")(0);

// const two = calculate(2);
// two("+")(1);
// two("-")(1);
// two("/")(0);
// two("*")(1);

// const twoPlus = calculate(2)("+");

// twoPlus(2);
// twoPlus(3);
// twoPlus(4);
// twoPlus(5);
