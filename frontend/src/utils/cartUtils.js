export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //calculate items price
  state.itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  addDecimals(state.itemsPrice);
  //calculate shipping price
  //(if order is over £100 then free else £5)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  //calculate tax price (20% tax)
  state.taxPrice = addDecimals(Number(0.2 * state.itemsPrice).toFixed(2));
  //calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};