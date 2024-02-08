function compress(str) {
  let result = "";

  if (str.length === 1) {
    return console.log(str);
  }

  for (let i = 1, count = 1; i < str.length; i++) {
    if (str[i] === str[i - 1]) {
      count++;
    } else {
      result += str[i - 1] + count;
      count = 1;
    }

    if (i === str.length - 1) {
      result += str[i] + count;
    }
  }

  return console.log(result);
}

function uncompress(str) {
  let result = "";

  if (str.length === 1) {
    return console.log(str);
  }

  let arr = [];
  let subStr = "";

  str.split("").forEach((el, i) => {
    if (isNaN(el)) {
      arr.push(el);
    }
    if (!isNaN(str[i + 1])) {
      subStr += str[i + 1];
    } else {
      arr.push(subStr);
      subStr = "";
    }
  });

  arr.forEach((el, i) => (+el ? (result += arr[i - 1].repeat(+arr[i])) : null));

  return console.log(result);
}

compress("dddgggssjsii");
uncompress("d3g3s2j1s1i2");
uncompress("d1a10c100f1");
