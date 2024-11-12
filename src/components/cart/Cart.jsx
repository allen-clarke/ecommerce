import { useState, useContext } from "react";
import axios from "axios";
import { CartQuantity } from "../../context/CartQuantity";
import updateCartQuantity from "../../utilities/updateCartQuantity";
import FetchData from "../../utilities/fetchData";
import convertCents from "../../utilities/convertCents";
import getRatingStars from "../../utilities/getRatingStar";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { cartQuantity, setCartQuantity } = useContext(CartQuantity);

  FetchData("http://localhost:3000/cart", setCart, cart);

  const handleRemoveFromCart = (id) => {
    setCartQuantity(cartQuantity - 1);
    axios
      .delete(`http://localhost:3000/cart/${id}`)
      .catch((error) => console.error(error));

    updateCartQuantity("decrease", cartQuantity);
  };
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
                    <form
                      className="flex flex-row items-center"
                      style={{ alignItems: "center" }}
                    >
                      <p className="text-black font-bold font-sans mt-4 text-[18px]">
                        Quantity:
                      </p>
                      <input
                        type="number"
                        name={cartItem.name + "-quantity"}
                        id={cartItem.name + "-quantity"}
                        defaultValue={cartItem.value}
                        min={1}
                        className="w-16 h-5 outline outline-1 outline-gray-400 rounded font-sans font-bold text-[18px] ml-2 -mb-4"
                      />
                    </form>
                  </div>

                  <div className="flex flex-row justify-between mt-8 items-center w-full">
                    <div className="p-2">
                      <p className="text-black font-black font-mono text-2xl">
                        ${convertCents(cartItem.priceCents)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="flex items-center content-center rounded  p-2 text-2xl absolute right-2 bottom-12"
              title="remove from cart"
              onClick={() => handleRemoveFromCart(cartItem.id)}
            >
              <i className="bx bx-trash text-[28px]"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
