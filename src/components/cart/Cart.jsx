import { cart } from "./data/cart";

const Cart = () => {
  return (
    <div className="mt-16 p-3 md:w-9/12 my-0 mx-auto">
      {cart.map((product) => {
        return (
          <div
            className="flex flex-row border rounded-md py-7 mb-2 relative"
            key={product.id}
          >
            <div className="flex justify-center h-52 basis-1/2 shrink">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-cover cursor-pointer"
              />
            </div>
            <div className="flex basis-1/2 h-full pr-1">
              <div className="flex flex-row justify-end items-center mb-3">
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col">
                    <p className="text-black font-sans mb-2 text-2xl anton-sc">
                      {product.name}
                    </p>
                    <div className="flex flex-row items-center">
                      <img
                        className="max-w-[100px]"
                        src={
                          "src/assets/products/ratings/rating-" +
                          product.rating.stars * 10 +
                          ".png"
                        }
                        alt={"rating " + product.rating.stars}
                      />
                      <p className="text-black font-bold font-sans ml-2.5">
                        {product.rating.count}
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
                        name={product.name + "-quantity"}
                        id={product.name + "-quantity"}
                        defaultValue={product.value}
                        min={1}
                        className="w-16 h-5 outline outline-1 outline-gray-400 rounded font-sans font-bold text-[18px] ml-2 -mb-4"
                      />
                    </form>
                  </div>

                  <div className="flex flex-row justify-between mt-8 items-center w-full">
                    <div className="p-2">
                      <p className="text-black font-black font-mono text-2xl">
                        ${(Math.round(product.priceCents) / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="flex items-center content-center rounded  p-2 text-2xl absolute right-2 bottom-12"
              title="remove from cart"
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
