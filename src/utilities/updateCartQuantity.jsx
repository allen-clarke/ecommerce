function updateCartQuantity(operation, cartQuantity) {
  const localCartQuantity = parseInt(localStorage.getItem("cartQuantity"));
  localStorage.setItem(
    "cartQuantity",
    operation === "increase"
      ? localCartQuantity + 1 || cartQuantity + 1
      : localCartQuantity - 1 || cartQuantity - 1
  );
}
export default updateCartQuantity;
