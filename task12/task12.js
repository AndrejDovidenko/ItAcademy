function HashStorage() {
  this.storage = {};
}

HashStorage.prototype.addValue = function (key, value) {
  this.storage[key] = value;
};

HashStorage.prototype.getValue = function (key) {
  return this.storage[key];
};

HashStorage.prototype.deleteValue = function (key) {
  if (!this.storage[key]) return false;
  return delete this.storage[key];
};

HashStorage.prototype.getKeys = function () {
  const arr = [];
  for (key in this.storage) {
    arr.push(key);
  }
  return arr;
};

const coct = new HashStorage();

coct.addValue(0, "vine");
coct.addValue(1, "rom");
coct.addValue(2, "vodka");
// coct.getValue(1);
console.log(coct.getValue(1));
console.log(coct);

console.log(coct.deleteValue("fds"));
console.log(coct);
console.log(coct.getKeys());

// function CoctailsStorage() {
//   HashStorage.call(this);
// }

const coctailsStorage = new HashStorage();
const body = document.querySelector("body");
let = arrIngredients = [];

function addRecipe() {
  const cocktailName = document.querySelector(".cocktail-name");
  const arrRadio = document.querySelectorAll('input[type="radio"]');
  const recipe = document.querySelector("textarea");
  const key = cocktailName.value;
  let radio = null;

  arrRadio.forEach((el) => (el.checked ? (radio = el.value) : (radio = "")));

  const arrValue = [radio, arrIngredients, recipe.value];
  coctailsStorage.addValue(key, arrValue);
  arrIngredients = [];
  recipe.value = "";
  cocktailName.value = "";
  console.log(coctailsStorage);
}

function addIngredient() {
  const nameIngredient = document.querySelector('input[name="nameIngredient"]');
  const quantity = document.querySelector('input[name="quantity"]');
  const ingredient = `${nameIngredient.value} ${quantity.value} мл`;
  arrIngredients.push(ingredient);
  quantity.value = "";
  nameIngredient.value = "";
  //   console.log(arrIngredients);
}

body.addEventListener("click", (e) => {
  const modal = document.querySelector(".modal");
  const btnRecipe = e.target.closest(".btn-recipe");
  const close = e.target.closest(".close");

  if (btnRecipe) {
    modal.style.display = "block";
  }

  const buttonAdd = e.target.closest(".btn-add");
  const buttonIng = e.target.closest(".btn-ing");

  if (close) {
    modal.style.display = "none";
  }

  if (buttonAdd) {
    // console.log(777);
    addRecipe();
    modal.style.display = "none";
  }

  if (buttonIng) {
    addIngredient();
  }
});
