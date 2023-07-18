function calcCartPriceAndDelivery() {
  const cartItems = document.querySelectorAll(".cart-item");
  const totalPriceEl = document.querySelector(".total-price");
  const deliveryCost = document.querySelector(".delivery-cost");
  const cartDeliveryEl = document.querySelector("[data-cart-delivery]");
  const freeDeliveryEl = document.querySelector(".small");

  let priceTotal = 0;

  cartItems.forEach((item) => {
    const amountEl = item.querySelector("[data-counter]").innerText;
    const priceEl = item.querySelector(".price__currency").innerText;
    const currentPrice = parseInt(amountEl) * parseInt(priceEl);
    priceTotal += currentPrice;
  });

  //отображаем общую стоимость товаров
  totalPriceEl.innerText = priceTotal;
  // показываем, скрываем стоимость доставки
  if (priceTotal > 0) {
    cartDeliveryEl.classList.remove("none");
  } else {
    cartDeliveryEl.classList.add("none");
  }

  //проверка на то, что цена выше 600 грн - доставка бесплатна
  if (priceTotal >= 600) {
    deliveryCost.classList.add("free");
    deliveryCost.innerText = "Бесплатно";
    freeDeliveryEl.classList.add("none");
  } else {
    deliveryCost.classList.remove("free");
    deliveryCost.innerText = "250 ₴";
    freeDeliveryEl.classList.remove("none");
  }
}
