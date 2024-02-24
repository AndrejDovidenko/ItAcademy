const links = document.querySelectorAll("a");
const parentInput = document.querySelector(".parent-input");
const inputs = parentInput.querySelectorAll("input");
const parentParagraph = document.querySelector(".parent-paragraph");
const paragraphs = parentParagraph.querySelectorAll("p");
const parentInputTwo = document.querySelector(".parent-input-two");
const inputsTwo = parentInputTwo.querySelectorAll("input");

function linksMouseoverHandler(e) {
  const el = e.target.closest("a");

  el.innerHTML = el.title;
  el.append(`(${el.href})`);
  el.removeEventListener("mouseover", linksMouseoverHandler);
}

function inputsBlurHandler(e) {
  const el = e.target.closest("input");
  console.log(el.value);
  el.value = "";
  el.removeEventListener("blur", inputsBlurHandler);
}

function paragraphsClickHandler(e) {
  const el = e.target.closest("p");
  el.innerHTML *= el.innerHTML;
  el.removeEventListener("click", paragraphsClickHandler);
}

function inputsTwoBlurHandler(e) {
  const el = e.target.closest("input");
  if (el.dataset.length == el.value.length) {
    el.classList.add("valid");
    el.classList.remove("invalid");
  } else {
    el.classList.add("invalid");
    el.classList.remove("valid");
  }
}

links.forEach((el) => {
  el.addEventListener("mouseover", linksMouseoverHandler);
});

inputs.forEach((el) => {
  el.addEventListener("blur", inputsBlurHandler);
});

paragraphs.forEach((el) => {
  el.addEventListener("click", paragraphsClickHandler);
});

inputsTwo.forEach((el) => {
  el.addEventListener("blur", inputsTwoBlurHandler);
});
