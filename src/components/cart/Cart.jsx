"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { CartQuantity } from "../../context/CartQuantity";
import updateCartQuantity from "../../utilities/updateCartQuantity";
import convertCents from "../../utilities/convertCents";
import getRatingStars from "../../utilities/getRatingStar";
import OrderSummary from "../orderSummary/OrderSummary";
import EmptyCart from "./EmptyCart";
import useCart from "../../hooks/useCart";

const Cart = () => {
  const [open, setOpen] = useState(true);
  const { cart, setCart } = useCart();
  const { cartQuantity, setCartQuantity } = useContext(CartQuantity);

  const handleRemoveFromCart = (cartItemToBeDeleted) => {
    setCartQuantity(cartQuantity - cartItemToBeDeleted.quantity);

    setCart(cart.filter((cartItem) => cartItem !== cartItemToBeDeleted));

    updateCartQuantity("decrease", cartQuantity, cartItemToBeDeleted);
  };

  let totalPurchase = 0;
  cart.forEach((cartItem) => {
    totalPurchase +=
      (Math.round(cartItem.priceCents) / 100) * cartItem.quantity;
  });

  return cart.length === 0 ? (
    <EmptyCart />
  ) : (
    <div className="font-[sans-serif] bg-white h-full">
      <div className="max-w-7xl max-lg:max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>

        <div className="grid lg:grid-cols-3 gap-6 relative mt-6">
          {cart.map((cartItem) => {
            return (
              <div key={cartItem.id} className="lg:col-span-2 space-y-6">
                <div className="p-2 bg-white shadow-[0_2px_9px_-3px_rgba(61,63,68,0.3)] relative">
                  <div className="grid sm:grid-cols-2 items-center gap-4">
                    <div className="bg-gradient-to-tr from-gray-300 via-gray-100 flex items-center justify-center to-gray-50 w-full h-full p-4 shrink-0 text-center">
                      <img
                        src={cartItem.image}
                        alt={cartItem.name}
                        className="w-56 h-full object-contain inline-block"
                      />
                    </div>

                    <div className="p-2">
                      <h3 className="text-lg font-bold text-gray-800">
                        {cartItem.name}
                      </h3>

                      <div className="flex items-center justify-between flex-wrap gap-4 mt-6">
                        <div className="flex items-center gap-3">
                          <h4 className="text-sm text-gray-500">Qty:</h4>

                          <span className="text-gray-800 text-sm font-semibold px-3">
                            {cartItem.quantity}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-blue-600">
                            ${convertCents(cartItem.priceCents)}
                          </h4>
                        </div>
                      </div>

                      <div className="divide-x border-y grid grid-cols-2 text-center mt-6">
                        <button
                          type="button"
                          className="bg-transparent hover:bg-gray-100 flex items-center justify-center py-3 text-gray-800 text-sm"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3.5 fill-current mr-3 inline-block"
                            viewBox="0 0 128 128"
                          >
                            <path
                              d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                              data-original="#000000"
                            ></path>
                          </svg>
                          View details
                        </button>
                        <button
                          type="button"
                          className="bg-transparent hover:bg-gray-100 flex items-center justify-center py-3 text-gray-800 text-sm"
                          onClick={() => handleRemoveFromCart(cartItem)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 fill-current mr-3 inline-block"
                            viewBox="0 0 390 390"
                          >
                            <path
                              d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                              data-original="#000000"
                            ></path>
                            <path
                              d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                              data-original="#000000"
                            ></path>
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <OrderSummary totalPurchase={totalPurchase} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
