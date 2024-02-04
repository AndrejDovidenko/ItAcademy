const arr = ["а", "е", "ё", "и", "о", "у", "ы", "э", "ю", "я"];

function countVowelLetters(str) {
  let count = 0;
  let res = "";
  const lowerStr = str.toLowerCase();

  for (let i = 0; i < lowerStr.length; i++) {
    if (arr.indexOf(lowerStr[i]) > -1) {
      count++;
    }
  }

  res = `Количество гласных = ${count}`;
  console.log(res);
}

countVowelLetters("Пришла зима, запахло...");
countVowelLetters("Ghbdtn, z r dfv bp Hjccbb");
countVowelLetters(
  "Не будете ли Вы так любезны, Иван, передать мне блокнот и «Известия»"
);
countVowelLetters("Архангел Уриил");
