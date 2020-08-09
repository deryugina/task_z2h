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
        img: 'https://media.istockphoto.com/photos/red-womans-sports-jacket-picture-id520887025',
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
        img: 'https://media.istockphoto.com/photos/male-coat-isolated-on-the-white-picture-id163208487',
        category: 'куртки',
        price: 5550,
        brand: 'puper',
        size: 29,
        color: 'красный'
      },
      {
        id: 4,
        name: 'куртка выгодная',
        img: 'https://media.istockphoto.com/photos/red-womans-sports-jacket-picture-id520887025',
        category: 'куртки',
        oldPrice: 7900,
        price: 1990,
        brand: 'super',
        size: 29,
        color: 'зеленый'
      }
    ];

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
