function updateCartQuantity(operation, cartQuantity, product) {
  const localCartQuantity = parseInt(localStorage.getItem("cartQuantity"));
  localStorage.setItem(
    "cartQuantity",
    operation === "increase"
      ? localCartQuantity + product.quantity || cartQuantity + product.quantity
      : localCartQuantity - product.quantity
  );
}
export default updateCartQuantity;
