function fizzbuzz() {
  let result = "";
  for (let i = 1; i < 100; i++) {
    result +=
      (i % 3 === 0 && i % 5 === 0 && "fiizbuzz") ||
      (i % 5 === 0 && "buzz") ||
      (i % 3 === 0 && "fizz") ||
      i;

    result += "\n";
  }
  return result;
}
console.log(fizzbuzz());
