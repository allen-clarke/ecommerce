import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { CartQuantity } from "../../context/CartQuantity";
import updateCartQuantity from "../../utilities/updateCartQuantity";
import convertCents from "../../utilities/convertCents";
import getRatingStars from "../../utilities/getRatingStar";
import OrderSummary from "../orderSummary/OrderSummary";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { cartQuantity, setCartQuantity } = useContext(CartQuantity);

  useEffect(() => {
    axios
      .get("http://localhost:3000/cart")
      .then((resolve) => setCart(resolve.data))
      .catch((error) => console.error(error));
  }, [cart]);

  const handleRemoveFromCart = (cartItem) => {
    setCartQuantity(cartQuantity - cartItem.quantity);

    axios
      .delete(`http://localhost:3000/cart/${cartItem.id}`)
      .catch((error) => console.error(error));

    updateCartQuantity("decrease", cartQuantity, cartItem);
  };

  let totalPurchase = 0;
  cart.forEach((cartItem) => {
    totalPurchase +=
      (Math.round(cartItem.priceCents) / 100) * cartItem.quantity;
  });

  return (
    <div className="mt-16 p-3 md:w-9/12 my-0 mx-auto">
      {cart.map((cartItem) => {
        return (
          <div
            className="flex flex-row border rounded-md py-7 mb-2 relative"
            key={cartItem.id}
          >
            <div className="flex justify-center h-52 basis-1/2 shrink">
              <img
                src={cartItem.image}
                alt={cartItem.name}
                className="max-h-full max-w-full object-cover cursor-pointer"
              />
            </div>
            <div className="flex basis-1/2 h-full pr-1">
              <div className="flex flex-row justify-end items-center mb-3">
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col">
                    <p className="text-black font-sans mb-2 text-2xl anton-sc">
                      {cartItem.name}
                    </p>
                    <div className="flex flex-row items-center">
                      <img
                        className="max-w-[100px]"
                        src={getRatingStars(cartItem.rating.stars)}
                        alt={"rating " + cartItem.rating.stars}
                      />
                      <p className="text-black font-bold font-sans ml-2.5">
                        {cartItem.rating.count}
                      </p>
                    </div>
                    <div>
                      <p className="text-black font-semibold font-sans mt-4 text-[18px]">
                        Quantity: {cartItem.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row flex-wrap justify-between mt-8 items-center w-full">
                    <div>
                      <p className="text-black font-bold font-sans">
                        Unit Price:{"  "}
                        <span className="font-mono">
                          &nbsp;${convertCents(cartItem.priceCents)}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-black font-bold font-sans">
                        Total:{"  "}
                        <span className="font-mono">
                          &nbsp;$
                          {(
                            convertCents(cartItem.priceCents) *
                            cartItem.quantity
                          ).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="flex items-center content-center rounded p-2 text-2xl absolute right-1 bottom-2"
              title="remove from cart"
              onClick={() => handleRemoveFromCart(cartItem)}
            >
              <i className="bx bx-trash text-[28px]"></i>
            </button>
          </div>
        );
      })}
      <OrderSummary totalPurchase={totalPurchase} />
    </div>
  );
};

export default Cart;
