const products = [
      {
        id: 1,
        name: 'куртка красная',
        img: 'https://media.istockphoto.com/photos/male-coat-isolated-on-the-white-picture-id163208487',
        category: 'куртки',
        oldPrice: 5880,
        price: 4790,
        brand: 'super',
        size: 31,
        color: 'красный'
      },

      {
        id: 2,
        name: 'куртка большая',
        img: './images_jackets/green_jacket_big.jpg',
        category: 'куртки',
        oldPrice: 5900,
        price: 3790,
        brand: 'super',
        size: 42,
        color: 'зеленый'
      },
      {
        id: 3,
        name: 'куртка модная',
        img: './images_jackets/red_jacket_fashionable.jpg',
        category: 'куртки',
        price: 5550,
        brand: 'puper',
        size: 29,
        color: 'красный'
      },
      {
        id: 4,
        name: 'куртка выгодная',
        img: './images_jackets/green_jacket_profitable.jpg',
        category: 'куртки',
        oldPrice: 7900,
        price: 1990,
        brand: 'super',
        size: 29,
        color: 'зеленый'
      }
    ];

//PART_1: DISPLAY THE CONTENT OF CONSTATNT
var newNode = document.querySelector(".col-6").cloneNode(true);
document.querySelector(".no-gutters").appendChild(newNode);

var newNode = document.querySelector(".col-6").cloneNode(true);
document.querySelector(".no-gutters").appendChild(newNode);

var i = 0;

var items = document.querySelectorAll(".col-6");


for(item of items) {

  let Img = item.querySelector(".card-img-top");
  Img.src = products[i].img;

  let cardTitle = item.querySelector(".mb-0");
  cardTitle.innerText = products[i].name;

  let categoryProduct = item.querySelector(".text-muted");
  categoryProduct.innerHTML = products[i].category;

  let crossedPrice = item.querySelector("del");

  if(products[i].oldPrice) {
    crossedPrice.innerHTML = products[i].oldPrice;
  } else {
    crossedPrice.innerHTML = "";
  }

  let newPrice = item.querySelector("del + strong");
  newPrice.innerHTML = products[i].price;

  let details = item.querySelector(".alert-dark");

  if(details === null) {
    let alert = document.querySelector(".alert-dark");
    let alertClone = alert.cloneNode(true);
    let cardText = item.querySelector(".card-text");
    cardText.appendChild(alertClone);
  }

  function displayNamesOfDetails (detail, detailTitle, constantFieldVal) {

    detail.innerText = constantFieldVal;
    let createStrong = document.createElement('strong');
    createStrong.textContent = detailTitle;
    detail.prepend(createStrong);
  }

  let Brand = item.querySelector(".alert-dark div:first-child small");
  displayNamesOfDetails (Brand, "Бренд ", products[i].brand);

  let Size = item.querySelector(".alert-dark div:nth-child(2) small");
  displayNamesOfDetails (Size, "Размер ", products[i].size);

  let Color = item.querySelector(".alert-dark div:last-child small");
  displayNamesOfDetails (Color, "Цвет ", products[i].color);

  i++;
}

var fullForms = document.querySelectorAll(".col-6");
for (form of fullForms) {
  let addInfo = form.querySelector(".alert-dark");
  addInfo.classList.add('short-view');
  addInfo.style.visibility = "hidden";
  addInfo.style.position = "absolute";
}

var beforeFiltersWork = document.querySelector(".alert-light");
beforeFiltersWork.textContent = "Найден " + i + " товар";

var arrFilters = [];
var lastValBrand, lastValSize, lastValColor;

//PART_2: REALIZATION OF FILTERS
var selectBrand = document.querySelector("form .form-group:first-child .form-control");
var selectSize = document.querySelector("form .form-group:nth-child(2) .form-control");
var selectColor = document.querySelector("form .form-group:nth-child(3) .form-control");

var reset = document.querySelector(".btn-secondary");
reset.style.pointerEvents = "none";
reset.style.cursor = "default";

function activationResetButton (reset) {
  reset.style.pointerEvents = "auto";
  reset.style.cursor = "pointer";
  reset.addEventListener("click", function() {
    resetFilters(arrFilters);
  });
}

addEventToElement(selectBrand, lastValBrand, "Бренд ");
addEventToElement(selectSize, lastValSize, "Размер ");
addEventToElement(selectColor, lastValColor, "Цвет ");

function addEventToElement (selectOption, lastValOption, characteristicTitle) {

  selectOption.addEventListener( "change", function() {
    if (selectOption.classList.contains('chosenEarlier')) {
      let indexLastVal = arrFilters.indexOf(lastValOption);
      let result = characteristicTitle + selectOption.value;
      arrFilters[indexLastVal] = result.toLowerCase();
      lastValOption = result.toLowerCase();
    } else {
      let result = characteristicTitle + selectOption.value;
      lastValOption = result.toLowerCase();
      selectOption.classList.add('chosenEarlier');
      let newArrLength = arrFilters.push(lastValOption);
    }
    compareChoiceWithProducts(arrFilters);
    activationResetButton(reset);
  });
}

function compareChoiceWithProducts (arrChoices) {

  var count = 0;
  var count1 = 0;
  var objects = document.querySelectorAll(".col-6");

  for (object of objects) {
    count = 0;
    let characteristics = object.querySelectorAll(".alert-dark div small");
    for (choice of arrChoices) {
      for (characteristic of characteristics) {
        if (characteristic.textContent.toLowerCase() === choice) {
          count++;
        }
      }
    }
    if (arrChoices.length === count) {
      object.removeAttribute('style');
      count1++;
    } else {
      object.style.display = "none";
    }
  }
  numberProducts(count1);
}

function resetFilters (arrFilters) {

  let i = 0;

  arrFilters.splice(0, arrFilters.length);
  console.log(arrFilters.length);
  let elemChosenEarlier = document.querySelectorAll(".chosenEarlier");
  for (elem of elemChosenEarlier) {
    elem.classList.remove("chosenEarlier");
    elem.selectedIndex = 0;
  }
  let hiddenProducts = document.querySelectorAll(".col-6");
  for (product of hiddenProducts) {
    product.removeAttribute('style');
    i++;
  }
  numberProducts(i);
}

function numberProducts (number) {
  let foundProduct = document.querySelector(".alert-light");
  foundProduct.textContent = "Найден " + number + " товар";
}

var optionsBrand = document.querySelectorAll("form .form-group:first-child .form-control option");
var optionsSize = document.querySelectorAll("form .form-group:nth-child(2) .form-control option");
var optionsColor = document.querySelectorAll("form .form-group:nth-child(3) .form-control option");

var j = 0;

for (optionBrand of optionsBrand) {
  this.value = optionBrand.textContent;
}

for (optionSize of optionsSize) {
  this.value = optionSize.textContent;
}

for (optionColor of optionsColor) {
  this.value = optionColor.textContent;
}


//PART_4: TOGGLE
var cardProducts = document.querySelectorAll(".col-6");

for (cardProduct of cardProducts) {

  cardProduct.addEventListener("click", function() {
    this.classList.toggle("short-view");
    if (this.classList.contains("short-view") === true) {
      let additionVisible = this.querySelector('.alert-dark');
      additionVisible.style.visibility = "visible";
      additionVisible.style.position = "relative";
    } else {
      let additionHidden = this.querySelector('.alert-dark');
      additionHidden.style.visibility = "hidden";
      additionHidden.style.position = "absolute";
    }
  });
}

var byuButtons = document.querySelectorAll(".btn-primary");
for (byuButton of byuButtons) {
  byuButton.classList.remove('stretched-link');
  let parentBut = byuButton.parentNode;
  let titleProduct = parentBut.querySelector(".mb-0");
  byuButton.addEventListener("click", function() {
    let text = "куплен товар " + titleProduct.textContent;
    alert(text);
  });
}
