function quadraticEquation(a, b, c) {
  const d = b ** 2 - 4 * a * c;
  let x1;
  let x2;
  let result = "";

  let symbolA = "";
  let symbolB = "+";
  let symbolC = "+";
  let valueA = a;
  let valueB = b;
  let valueC = c;

  if (a === 0) {
    return console.log("Старший коэфициент не может быть равен нулю");
  } else if (a === 1) {
    valueA = `${symbolA}`;
  } else if (a === -1) {
    symbolA = "-";
    valueA = `${symbolA}`;
  }

  if (b === 1) {
    valueB = `${symbolB} x`;
  } else if (b === 0) {
    valueB = "";
  } else if (b === -1) {
    symbolB = "-";
    valueB = `${symbolB} x`;
  } else if (b < -1) {
    symbolB = "-";
    valueB = `${symbolB} ${Math.abs(b)}x`;
  } else {
    valueB = `${symbolB} ${Math.abs(b)}x`;
  }

  if (c < 0) {
    symbolC = "-";
    valueC = `${symbolC} ${Math.abs(c)}`;
  } else if (c > 0) {
    valueC = `${symbolC} ${Math.abs(c)}`;
  } else {
    valueC = "";
  }

  if (d < 0) {
    result = `уравнение ${valueA}x^2 ${valueB} ${valueC} = 0 не имеет вещественных корней`;
  }

  if (d > 0) {
    x1 = (-b + Math.sqrt(d)) / (2 * a);
    x2 = (-b - Math.sqrt(d)) / (2 * a);
    result = `уравнение ${valueA}x^2 ${valueB} ${valueC} = 0 имеет корни x1 = ${x1} и x2 = ${x2}`;
  }

  if (d === 0) {
    x1 = -(b / (2 * a));
    result = `уравнение ${valueA}x^2 ${valueB} ${valueC} = 0 имеет один корень x = ${x1}`;
  }

  return console.log(result.replace(/\s+/g, " "));
}

quadraticEquation(-1, -1, -1);
quadraticEquation(1, -8, 72);
quadraticEquation(1, 12, 36);
quadraticEquation(4, -8, 1);
quadraticEquation(1, 0, 0);
