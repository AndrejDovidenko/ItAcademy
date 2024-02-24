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
  delete this.storage[key];
  return true;
};

HashStorage.prototype.getKeys = function () {
  const arr = [];
  for (key in this.storage) {
    arr.push(key);
  }
  return arr;
};

const coctailsStorage = new HashStorage();

coctailsStorage.addValue("маргарита", [
  "алкогольный",
  ["Водка Finlandia 50мл", " Кофейный ликер 25мл", "Лед в кубиках 120 г"],
  "Наполни стакан кубиками льда доверху, затем налей кофейный ликер 25 мл, водку 50 мл и размешай коктейльной ложкой.",
]);

coctailsStorage.addValue("пеликан", [
  "алкогольный",
  [
    "Гренадин Monin 10мл",
    "Клубничный сироп Monin 10мл",
    "Персиковый сок 150мл",
    "Лимонный сок 15мл",
    "Банан 110г",
    "Клубника 50г",
    "Дробленый лед 60г",
  ],
  "Положи в блендер очищенную и нарезанную половинку банана и клубнику 2 ягоды. Налей лимонный сок 15 мл, гренадин 10 мл, клубничный сироп 10 мл и персиковый сок 150 мл. Добавь в блендер совок дробленого льда и взбей. Перелей в хайбол. Укрась кружком банана и половинкой клубники на коктейльной шпажке.",
]);

coctailsStorage.addValue("дайкири", [
  "алкогольный",
  [
    "Белый ром 60 мл",
    "Сок лайма 30 мл",
    "Сахарный сироп 1 чайная ложка",
    "Дроблёный льд 200 г",
  ],
  " Влейте ром, сок лайма и сахарный сироп в шейкер для коктейлей. Добавьте лёд, накройте крышкой и встряхните до охлаждения. Процедите в охлаждённый бокал.",
]);

const body = document.querySelector("body");
const textOutput = document.querySelector(".text-output");
const modal = document.querySelector(".modal");
let = arrIngredients = [];

function addCocktail() {
  const cocktailName = document.querySelector(".cocktail-name");
  const arrRadio = document.querySelectorAll('input[type="radio"]');
  const recipe = document.querySelector("textarea");
  const key = cocktailName.value.toLowerCase();
  let radio = null;

  arrRadio.forEach((el) => {
    el.checked ? (radio = el.value) : false;
  });

  const arrValue = [radio, arrIngredients, recipe.value];

  if (cocktailName.value.length < 3) {
    alert("Заполните поле 'Название коктейля'. Минимкм 3 символа!");
  } else if (arrIngredients.length < 2) {
    alert("Добавьте минимум два ингридиента!");
  } else if (recipe.value.length < 20) {
    alert("Заполните поле 'Рецепт'. Минимум 20 символов");
  } else {
    coctailsStorage.addValue(key, arrValue);
    arrIngredients = [];
    recipe.value = "";
    cocktailName.value = "";
    modal.style.display = "none";
  }
}

function addIngredient() {
  const nameIngredient = document.querySelector('input[name="nameIngredient"]');
  const quantity = document.querySelector('input[name="quantity"]');
  const unit = document.querySelector(".unit");
  const ingredient = `${nameIngredient.value} ${quantity.value} ${unit.innerText}`;
  arrIngredients.push(ingredient);
  quantity.value = "";
  nameIngredient.value = "";
}

function disabledOff() {
  const ingredient = document.querySelector(".ingredient");
  const inputs = ingredient.querySelectorAll("input");
  const buttonIng = document.querySelector(".btn-ing");
  inputs.forEach((el) => {
    el.addEventListener("input", () => {
      if (inputs[0].value.length > 2 && inputs[1].value > 0) {
        buttonIng.removeAttribute("disabled");
      } else {
        buttonIng.setAttribute("disabled", "disabled");
      }
    });
  });
}

function showCocktail() {
  textOutput.innerHTML = "";
  const key = prompt("Введите название коктейля.");

  if (!key) {
    alert("Введены некоректные данные!");
    return;
  }

  const info = coctailsStorage.getValue(key.toLowerCase());

  if (info === undefined) {
    alert("Коктейль с таким названием oтcyтcтвyeт в хранилище!");
    return;
  }

  const h2 = document.createElement("h2");
  const h3Ing = document.createElement("h3");
  const ul = document.createElement("ul");
  const h3Recipe = document.createElement("h3");
  const p = document.createElement("p");
  const upperKey = key
    .split("")
    .map((el, i) => (!i ? el.toUpperCase() : el.toLowerCase()))
    .join("");

  h2.append(`Коктейль "${upperKey}" (${info[0]})`);
  h3Ing.append("Необходимые ингридиенты:");

  info[1].forEach((el) => {
    const li = document.createElement("li");
    li.append(el);
    ul.append(li);
  });

  h3Recipe.append("Рецепт приготовления:");
  p.append(info[2]);
  textOutput.append(h2, h3Ing, ul, h3Recipe, p);
}

function removeCocktail() {
  const key = prompt("Введите название коктейля.");
  if (!key) {
    alert("Введены некоректные данные!");
    return;
  }

  const del = coctailsStorage.deleteValue(key.toLowerCase());

  if (!del) {
    alert("Коктейль с таким названием oтcyтcтвyeт в хранилище!");
  } else {
    alert(`Коктейль ${key.toLowerCase()} успешно удален из хранилища!`);
  }
}

function showCocktailList() {
  textOutput.innerHTML = "";
  const arr = coctailsStorage.getKeys();
  const h2 = document.createElement("h2");
  const ol = document.createElement("ol");

  h2.append("Список коктейлей:");

  arr.forEach((el) => {
    const li = document.createElement("li");
    li.append(el);
    ol.append(li);
  });

  textOutput.append(h2, ol);
}

body.addEventListener("click", (e) => {
  const btnCocktailAdd = e.target.closest(".btn-cocktail-add");
  const btnCocktailShow = e.target.closest(".btn-cocktail-show");
  const btnCocktailRemove = e.target.closest(".btn-cocktail-remove");
  const btnCocktailList = e.target.closest(".btn-cocktail-list");
  console.log(btnCocktailAdd);

  if (btnCocktailAdd) {
    modal.style.display = "block";
  }

  if (btnCocktailShow) {
    showCocktail();
  }

  if (btnCocktailRemove) {
    removeCocktail();
  }

  if (btnCocktailList) {
    showCocktailList();
  }
});

modal.addEventListener("click", (e) => {
  const close = e.target.closest(".close");
  const buttonAdd = e.target.closest(".btn-add");
  const buttonIng = e.target.closest(".btn-ing");
  const unit = e.target.closest(".unit");

  disabledOff();

  if (close) {
    modal.style.display = "none";
  }

  if (buttonAdd) {
    addCocktail();
  }

  if (buttonIng) {
    addIngredient();
    buttonIng.setAttribute("disabled", "disabled");
  }

  if (unit) {
    if (unit.innerText === "мл") {
      unit.innerText = "г";
    } else {
      unit.innerText = "мл";
    }
  }
});
