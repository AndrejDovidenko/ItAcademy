function getConsoleTriangle() {
  let string = "";
  while (string.length < 18) {
    string += "|_";
    console.log(string);
  }
}

getConsoleTriangle();

function getChessBoard() {
  let result = "";
  let string = "";
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if ((j + i) % 2 === 0) {
        string += "\u2B1C";
      } else {
        string += "\u2B1B";
      }
    }
    result += `${string} \n`;
    string = "";
  }
  return console.log(result);
}

getChessBoard();
