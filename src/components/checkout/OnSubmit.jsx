import axios from "axios";

export const onSubmit = async (buyerDetails) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  axios.post("http://localhost:3000/orders", { buyerDetails, cart });

  // reset();
};
