const arrStr = ["первое", "второе", "третье", "четвертое ", "пятое"];

const body = document.querySelector("body");

const parentDiv = document.createElement("div");
const inputText = document.createElement("input");
const buttonAdd = document.createElement("button");
const buttonRemove = document.createElement("button");
const ol = document.createElement("ol");
const input = document.createElement("input");

inputText.setAttribute("type", "text");
inputText.setAttribute("minlength", "3");
inputText.setAttribute("required", true);
buttonAdd.classList.add("add-button");
buttonAdd.append("Add");
buttonRemove.classList.add("remove-button");
buttonRemove.append("Remove");

input.setAttribute("type", "text");
input.setAttribute("minlength", "3");
input.setAttribute("required", true);

body.append(ol);

function createOl(arr) {
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement("li");
    li.classList.add("list-item");
    li.append(arr[i]);
    ol.append(li);
  }
}

createOl(arrStr);

body.append(parentDiv);
parentDiv.append(inputText, buttonAdd, buttonRemove);

function replaceTextWithInput(item) {
  input.value = item.innerHTML;
  item.innerHTML = "";
  item.append(input);
  item.classList.remove("list-item");
  input.focus();
}

function addListItem(str) {
  const li = document.createElement("li");
  if (inputText.checkValidity()) {
    li.classList.add("list-item");
    li.append(str);
    ol.append(li);
    inputText.value = "";
  } else {
    inputText.reportValidity();
  }
  if (ol.lastChild) {
    buttonRemove.removeAttribute("disabled");
  }
}

function removeListItem() {
  ol.lastChild.remove();
  if (!ol.lastChild) {
    buttonRemove.setAttribute("disabled", "disabled");
  }
}

function bodyClickHandler(e) {
  const listItem = e.target.closest(".list-item");
  const buttonAdd = e.target.closest(".add-button");
  const buttonRemove = e.target.closest(".remove-button");

  if (listItem) {
    replaceTextWithInput(listItem);
  }
  if (buttonAdd) {
    addListItem(inputText.value);
  }

  if (buttonRemove) {
    removeListItem();
  }
}

function inputBlurHandler(e) {
  const li = e.target.closest("li");
  if (input.checkValidity()) {
    li.append(input.value);
    input.remove();
    li.classList.add("list-item");
    body.addEventListener("click", bodyClickHandler);
  } else {
    input.reportValidity();
  }
}

function inputHandler() {
  if (input.checkValidity()) {
    input.classList.remove("invalid");
  } else {
    input.classList.add("invalid");
    body.removeEventListener("click", bodyClickHandler);
    input.reportValidity();
  }
}

body.addEventListener("click", bodyClickHandler);
ol.addEventListener("input", inputHandler);
ol.addEventListener("blur", inputBlurHandler, true);
