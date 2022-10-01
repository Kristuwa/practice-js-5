// Потрібно перебрати масив і якщо він має об'єкти в яких дублюються айді то квонтіті цих елементів потрібно сплюсувати
// а ті обє'кти в яких айді співпав видалити з масиву.
// (Потрібно мутувати даний масив, створювати новий не потрібно)

// const products = [
//   {
//     id: "sku1",
//     qty: 1,
//   },
//   {
//     id: "sku2",
//     qty: 2,
//   },
//   {
//     id: "sku3",
//     qty: 3,
//   },
//   {
//     id: "sku1",
//     qty: 6,
//   },
//   {
//     id: "sku1",
//     qty: 8,
//   },
//   {
//     id: "sku2",
//     qty: 19,
//   },
//   {
//     id: "sku4",
//     qty: 1,
//   },
// ];

// for (let i = 0; i < products.length; i += 1) {
//   for (let j = i + 1; j < products.length; j += 1)
//     if (products[i].id === products[j].id) {
//       products[i].qty += products[j].qty;
//       products.splice(j, 1);
//       j -= 1;
//       console.log(products);
//     }
// }

// task 2

const instruments = [
  {
    id: 1,
    img: "https://static.dnipro-m.ua/cache/products/1754/catalog_origin_141546.jpg",
    name: "Молоток",
    price: 150,
  },
  {
    id: 2,
    img: "https://static.dnipro-m.ua/cache/products/5098/catalog_origin_195568.jpg",
    name: "Перфоратор",
    price: 3000,
  },
  {
    id: 3,
    img: "https://static.dnipro-m.ua/cache/products/2023/catalog_origin_200763.jpg",
    name: "Рівень",
    price: 2000,
  },
];

const KEY = "basket";
const listRef = document.querySelector(".gallery");

function createMarkup(instruments) {
  return instruments
    .map(({ id, img, name, price }) => {
      return `<li class='gallery__item' data-id="${id}">
		<img src='${img}' alt='${name}' width="100" height="100"/>
<p>${name}</p>
<p>${price}</p>
<button type="button" class='btn'>Добавить в корзину</button>
		</li>`;
    })
    .join("");
}
let basket = [];
const markup = createMarkup(instruments);

listRef.insertAdjacentHTML("beforeend", markup);
listRef.addEventListener("click", onAddProductToBasket);

function onAddProductToBasket(e) {
  if (e.target.classList.contains("btn")) {
    const id = Number(e.target.closest("li").dataset.id);
    const instrument = instruments.find((instrument) => instrument.id === id);
    const storageList = localStorage.getItem(KEY);
    try {
      basket = storageList ? JSON.parse(storageList) : [];
      basket.push(instrument);
      const updateList = JSON.stringify(basket);
      localStorage.setItem(KEY, updateList);
    } catch (error) {
      console.log(error);
    }
  }
}
