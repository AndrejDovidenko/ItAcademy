function quadraticEquation(a, b, c) {
  const d = b ** 2 - 4 * a * c;
  let x1;
  let x2;
  let result = "";

  let symbolB = "-";
  let symbolC = "-";
  let valueA = a;

  if (b > 0) {
    symbolB = "+";
  }
  if (c > 0) {
    symbolC = "+";
  }

  if (a === 1) {
    valueA = "";
  }

  if (d < 0) {
    result = `уравнение ${valueA}x^2 ${symbolB} ${Math.abs(
      b
    )}x ${symbolC} ${Math.abs(c)} = 0 не имеет вещественных корней`;
  }

  if (d > 0) {
    x1 = (-b + Math.sqrt(d)) / (2 * a);
    x2 = (-b - Math.sqrt(d)) / (2 * a);

    result = `уравнение ${valueA}x^2 ${symbolB} ${Math.abs(
      b
    )}x ${symbolC} ${Math.abs(c)} = 0 имеет корни x1 = ${x1} и x2 = ${x2}`;
  }

  if (d === 0) {
    x1 = -(b / (2 * a));
    result = `уравнение ${valueA}x^2 ${symbolB} ${Math.abs(
      b
    )}x ${symbolC} ${Math.abs(c)} = 0 имеет один корень x = ${x1}`;
  }
  return result;
}

console.log(quadraticEquation(8, -8, 72));
console.log(quadraticEquation(2, 4, 2));
console.log(quadraticEquation(21, 45, 18));
