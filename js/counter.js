window.addEventListener("click", onClick);

function onClick(e) {
  let counter;
  // отслеживаем нажатие кнопок +/-, если это те кнопки берем у карточки,
  // у которой нажата кнопка текст счетчика
  if (
    e.target.dataset.action === "plus" ||
    e.target.dataset.action === "minus"
  ) {
    const counterWrapper = e.target.closest(".counter-wrapper");
    counter = counterWrapper.querySelector("[data-counter]");
  }
  // изменяем текст в счетчике увеличивая  его на 1
  if (e.target.dataset.action === "plus") {
    counter.innerText = ++counter.innerText;
  }

  if (e.target.dataset.action === "minus") {
    // изменяем текст в счетчике уменьшая его на 1
    if (parseInt(counter.innerText) > 1) {
      counter.innerText = --counter.innerText;
    } else if (
      e.target.closest(".cart-wrapper") &&
      parseInt(counter.innerText) === 1
    ) {
      // проверка на товар, который находиться в корзине
      //удаление товара с корзины
      e.target.closest(".cart-item").remove();

      //отображение статуса корзины Пустая/ Полная
      toggleCartStatus();

      //пересчет стоимости товаров при удалении с корзины
      calcCartPriceAndDelivery();
    }
  }

  //проверяем на клик внтури корзины для подсчета стоимости товаров
  if (
    e.target.hasAttribute("data-action") &&
    e.target.closest(".cart-wrapper")
  ) {
    calcCartPriceAndDelivery();
  }
}
