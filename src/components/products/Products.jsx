import { useContext, useState } from "react";
import axios from "axios";
import { CartQuantity } from "../../context/CartQuantity";
import updateCartQuantity from "../../utilities/updateCartQuantity";
import convertCents from "../../utilities/convertCents";
import getRatingStars from "../../utilities/getRatingStar";
import FetchData from "../../utilities/fetchData";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState(undefined);
  const { cartQuantity, setCartQuantity } = useContext(CartQuantity);

  FetchData("http://localhost:3000/products", setProducts);

  const handleAddToCart = (product) => {
    setCartQuantity(cartQuantity + 1);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(undefined), 1050);
    axios
      .post("http://localhost:3000/cart", product)
      .catch((error) => console.error(error));

    updateCartQuantity("increase", cartQuantity);
  };

  return (
    <div className="grid gap-1 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-14">
      {products.map((product) => {
        return (
          <div
            className="flex flex-col border items-center rounded-md p-3"
            key={product.id}
          >
            <div className="h-52 mb-1.5">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-cover cursor-pointer"
              />
            </div>
            <div className="flex flex-row justify-between items-center w-full mb-3">
              <p className="text-black font-bold font-sans w-1/2">
                {product.name}
              </p>
              <div className="flex flex-row items-center">
                <button
                  className="flex items-center content-center rounded-full bg-gray-200 p-2 mr-2 text-2xl add-to-cart"
                  onClick={() => handleAddToCart(product)}
                  title="add to cart"
                >
                  {addedToCart === product.id ? (
                    <i className="bx bxs-check-circle"></i>
                  ) : (
                    <i className="bx bx-cart-add"></i>
                  )}
                </button>
                <button className="flex items-center content-center rounded-full bg-gray-200 p-2 text-2xl">
                  <i className="bx bx-heart"></i>
                </button>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center w-full">
              <p className="text-black font-black font-mono w-1/2">
                ${convertCents(product.priceCents)}
              </p>
              <div className="flex flex-row items-center">
                <img
                  className="max-w-[100px]"
                  src={getRatingStars(product.rating.stars)}
                  alt={"rating " + product.rating.stars}
                />
                <p className="text-black font-bold font-sans ml-2.5">
                  {product.rating.count}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
