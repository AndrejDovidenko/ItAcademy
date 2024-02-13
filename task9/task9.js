function currentSums(numbers) {
  let afterEquals = [];
  let beforeEquals = [];
  let substr = "";
  let res = "";

  numbers.reduce((acc, el, i) => {
    let sum = acc + el;
    afterEquals.push(sum);

    !i ? (substr += `${el}`) : (substr += `+${el}`);

    beforeEquals.push(substr);
    return sum;
  }, 0);

  res = `[${beforeEquals}] = [${afterEquals}]`;

  return console.log(res);
}

currentSums([2, 3, 5, 7, 11, 13, 17]);
currentSums([7, 5, 3, 4]);
currentSums([2, 3, 5, 7, 11, 13, 17, 32, 1, 2, 3]);

const firstLettersFromString = (string) => string.split(" ").map((el) => el[0]);

const str = "Каждый охотник желает знать, где сидит фазан.";
const newArr = firstLettersFromString(str);
console.log(newArr); // [К, о, ж, з, г, с, ф]

const filteredArray = (arr) => arr.filter((el) => el > 0 && el % 1 === 0);

const startArray = [-1, 2, 3.5, -12, 4, 1.25, 16];
const newArray = filteredArray(startArray);
console.log(newArray); // [2, 4, 16]

const moveZeros = (arr) => {
  arr.sort(
    (a, b) => (a === 0 && b !== 0 && 1) || (a !== 0 && b === 0 && -1) || 0
  );

  return arr;
};

const array1 = [false, 1, 0, NaN, 2, 0, null, 3, 4, 0, 5];
const array2 = [0, 2, 0, 4, 0, 6];
const array3 = [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(moveZeros(array1)); //[ false, 1, NaN, 2, null, 3, 4, 5, 0, 0, 0]
console.log(moveZeros(array2)); //[ 2, 4, 6, 0, 0, 0 ]
console.log(moveZeros(array3)); //[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ]

const changeArray = function (arr) {
  const deleteCount = Math.floor(arr.length / 2);
  const rightPart = arr.splice(0, deleteCount);
  let res = [];

  if (arr.length % 2 !== 0 && arr.length > 1) {
    const elCenter = arr.splice(0, 1);
    res = arr.concat(elCenter, rightPart);

    return console.log(res);
  }
  res = arr.concat(rightPart);

  return console.log(res);
};

changeArray([1, 2, 3, 4, 5]); //[ 4, 5, 3, 1, 2 ]
changeArray([1, 2]); //[ 2, 1 ]
changeArray([1, 2, 3, 4, 5, 6, 7, 8]); //[ 5, 6, 7, 8, 1, 2, 3, 4 ]
