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
        //img: 'https://media.istockphoto.com/photos/red-womans-sports-jacket-picture-id520887025',
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
        //img: 'https://media.istockphoto.com/photos/male-coat-isolated-on-the-white-picture-id163208487',
        category: 'куртки',
        price: 5550,
        brand: 'puper',
        size: 29,
        color: 'красный'
      },
      {
        img: './images_jackets/green_jacket_profitable.jpg',
        //img: 'https://media.istockphoto.com/photos/red-womans-sports-jacket-picture-id520887025',
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

  //Img.style.height = "232px";
  //Img.style.width = "351px";

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

  let Brand = item.querySelector(".alert-dark div:first-child small");
  Brand.innerText = products[i].brand;
  let brandText = document.createElement('strong');
  brandText.textContent = "Бренд ";
  Brand.prepend(brandText);

  let Size = item.querySelector(".alert-dark div:nth-child(2) small");
  Size.innerText = products[i].size;
  let sizeText = document.createElement('strong');
  sizeText.textContent = "Размер ";
  Size.prepend(sizeText);

  let Color = item.querySelector(".alert-dark div:last-child small");
  Color.innerText = products[i].color;
  let colorText = document.createElement('strong');
  colorText.textContent = "Цвет ";
  Color.prepend(colorText);

  i++;
}

var beforeFiltersWork = document.querySelector(".alert-light");
beforeFiltersWork.textContent = "Найден " + i + " товар";

var arrFilters = [];
var lastValBrand, lastValSize, lastValColor;

//PART_2: WORKING WITH DROPPING BUTTON
//PART_2: REALIZATION OF FILTERS
var selectBrand = document.querySelector("form .form-group:first-child .form-control");
var selectSize = document.querySelector("form .form-group:nth-child(2) .form-control");
var selectColor = document.querySelector("form .form-group:nth-child(3) .form-control");

var reset = document.querySelector(".btn-secondary");
reset.style.pointerEvents = "none";
reset.style.cursor = "default";

selectBrand.addEventListener( "change", function() {

  if (selectBrand.classList.contains('chosenEarlier')) {
    let indexLastVal = arrFilters.indexOf(lastValBrand);
    console.log(lastValBrand);
    console.log(indexLastVal);
    let result = "Бренд " + selectBrand.value;
    console.log(result.toLowerCase());
    arrFilters[indexLastVal] = result.toLowerCase();
    lastValBrand = result.toLowerCase();
  } else {
    let result = "Бренд " + selectBrand.value;
    lastValBrand = result.toLowerCase();
    console.log(lastValBrand);
    selectBrand.classList.add('chosenEarlier');
    let newArrLength = arrFilters.push(lastValBrand);
  }
  compareChoiceWithProducts(arrFilters);
  reset.style.pointerEvents = "auto";
  reset.style.cursor = "pointer";
});

selectSize.addEventListener( "change", function() {
  if (selectSize.classList.contains('chosenEarlier')) {
    let indexLastVal = arrFilters.indexOf(lastValSize);
    //console.log(lastFilterVal);
    //console.log(indexLastVal);
    let result = "Размер " + selectSize.value;
    lastValSize = result.toLowerCase();
    //console.log(result.toLowerCase());
    arrFilters[indexLastVal] = result.toLowerCase();
  } else {
    let result = "Размер " + selectSize.value;
    lastValSize = result.toLowerCase();
    selectSize.classList.add('chosenEarlier');
    let newArrLength = arrFilters.push(lastValSize);
  }
  compareChoiceWithProducts(arrFilters);
  reset.style.pointerEvents = "auto";
  reset.style.cursor = "pointer";
});

selectColor.addEventListener( "change", function() {
  if (selectColor.classList.contains('chosenEarlier')) {
    let indexLastVal = arrFilters.indexOf(lastValColor);
    //console.log(lastFilterVal);
    console.log(indexLastVal);
    let result = "Цвет " + selectColor.value;
    lastValColor = result.toLowerCase();
    //console.log(result.toLowerCase());
    arrFilters[indexLastVal] = result.toLowerCase();
  } else {
    let result = "Цвет " + selectColor.value;
    lastValColor = result.toLowerCase();
    selectColor.classList.add('chosenEarlier');
    let newArrLength = arrFilters.push(lastValColor);
  }
  compareChoiceWithProducts(arrFilters);
  reset.style.pointerEvents = "auto";
  reset.style.cursor = "pointer";
});

function compareChoiceWithProducts (arrChoices) {

  var count = 0;
  var count1 = 0;

  //var arrayLength = arrChoices.length - 1;

  var objects = document.querySelectorAll(".col-6");

  for (object of objects) {
    count = 0;
    let characteristics = object.querySelectorAll(".alert-dark div small");
    for (choice of arrChoices) {
      console.log(choice);
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
  /*for (arrFilter of arrFilters) {
    for (object of objects) {
      count = 0;
      let characteristics = object.querySelectorAll(".alert-dark div small");

  for (arrFilter of arrFilters) {
    for (object of objects) {
      count = 0;
      let characteristics = object.querySelectorAll(".alert-dark div small");
      for (characteristic of characteristics) {
        if (characteristic.textContent.toLowerCase() === arrFilter) {
          count++;
        }
      }
    }
  }*/
      /*for (characteristic of characteristics) {
        if (characteristic.textContent.toLowerCase() === arrFilter) {
          count++;
        }
      }
      if (count === 0) {
        object.style.display = "none";
      } else {
        count1++;
        object.removeAttribute('style');
      }*/
  let foundProduct = document.querySelector(".alert-light");
  foundProduct.textContent = "Найден " + count1 + " товар";
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
    this.classList.toggle("full-view");
    if (this.classList.contains('full-view') === true) {
      let addition = this.querySelector('.alert-dark');
      addition.style.visibility = "hidden";
      addition.style.position = "absolute";
    } else {
      let addition1 = this.querySelector('.alert-dark');
      addition1.style.visibility = "visible";
      addition1.style.position = "relative";
    }
  });
}
//}

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
