// import { toggleCartStatus } from "./toggleCartStatus";

const cartWrapper = document.querySelector(".cart-wrapper");
// отслеживаем клик на странице
window.addEventListener("click", function (e) {
  //проверяем что клик был совершон по кнопке добавить в корзину
  if (e.target.hasAttribute("data-cart")) {
    //находим карточку с товаромБ внутри которой был совршен клик
    const card = e.target.closest(".card");

    // собираем данные с этого товара в едиый обьект
    const productInfo = {
      id: card.dataset.id,
      imgSrc: card.querySelector(".product-img").getAttribute("src"),
      title: card.querySelector(".item-title").innerText,
      itemsInBox: card.querySelector("[data-items-in-box]").innerText,
      weight: card.querySelector(".price__weight").innerText,
      price: card.querySelector(".price__currency").innerText,
      counter: card.querySelector(".items__current").innerText,
    };

    //получаем id  товара
    const itemInCart = cartWrapper.querySelector(
      `[data-id = "${productInfo.id}"]`
    );

    //проверяем есть ли товар в корзине
    if (itemInCart) {
      //если товар есть в корзине увеличиваем счетчик
      const counterEl = itemInCart.querySelector("[data-counter]");
      counterEl.innerText =
        parseInt(counterEl.innerText) + parseInt(productInfo.counter);
    } else {
      //если товара нет в корзине додаем его туда
      const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
    <div class="cart-item__top">
      <div class="cart-item__img">
        <img src="${productInfo.imgSrc}" alt="" />
      </div>
      <div class="cart-item__desc">
        <div class="cart-item__title">${productInfo.title}</div>
        <div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}.</div>
  
        <!-- cart-item__details -->
        <div class="cart-item__details">
          <div class="items items--small counter-wrapper">
            <div class="items__control" data-action="minus">
              -
            </div>
            <div class="items__current" data-counter="">${productInfo.counter}</div>
            <div class="items__control" data-action="plus">+</div>
          </div>
  
          <div class="price">
            <div class="price__currency">${productInfo.price}</div>
          </div>
        </div>
        <!-- // cart-item__details -->
      </div>
    </div>
  </div>`;

      cartWrapper.insertAdjacentHTML("beforeend", cartItemHTML);
    }

    //сбрасываем счетчик добавленого товара на 1
    card.querySelector("[data-counter]").innerText = 1;

    //отображение статуса корзины Пустая/ Полная
    toggleCartStatus();

    //подсчет общей стоимости товаров
    calcCartPriceAndDelivery();
  }
});
