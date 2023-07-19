const productContainerEL = document.querySelector("#product-container");
// запуск функции для начала работы
getProducts();

async function getProducts() {
  //получаем ответ с файла products.json
  const response = await fetch("./js/products.json");

  //парсим из JSON в JS формат
  const productsArray = await response.json();

  renderProducts(productsArray);
}

// рендерим наши карточки
function renderProducts(array) {
  array.forEach(({ id, title, itemBox, weight, price, imgSrc }) => {
    const productHTML = `<div class="col-md-6">
        <div class="card mb-4" data-id="${id}">
          <img
            class="product-img"
            src="img/roll/${imgSrc}"
            alt=""
          />
          <div class="card-body text-center">
            <h4 class="item-title">${title}</h4>
            <p>
              <small data-items-in-box class="text-muted">${itemBox} <span class="lng-pcs">шт.</span> </small>
            </p>

            <div class="details-wrapper">
              <div class="items counter-wrapper">
                <div class="items__control" data-action="minus">-</div>
                <div class="items__current" data-counter>1</div>
                <div class="items__control" data-action="plus">+</div>
              </div>

              <div class="price">
                <div class="price__weight">${weight}г.</div>
                <div class="price__currency">${price} ₴</div>
              </div>
            </div>

            <button
              data-cart
              type="button"
              class="btn btn-block btn-outline-warning lng-in_bucket"
            >
              + в корзину
            </button>
          </div>
        </div>
      </div>`;
    productContainerEL.insertAdjacentHTML("beforeend", productHTML);
  });
}
