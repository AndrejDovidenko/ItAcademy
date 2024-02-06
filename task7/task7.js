const buttons = document.querySelectorAll(".button");

function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

buttons.forEach((el) => {
  const counter = makeCounter();
  el.addEventListener("click", () => {
    el.innerHTML = counter();
  });
});
