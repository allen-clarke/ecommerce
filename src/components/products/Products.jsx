import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartQuantity } from "../../context/CartQuantity";
import updateCartQuantity from "../../utilities/updateCartQuantity";
import convertCents from "../../utilities/convertCents";
import getRatingStars from "../../utilities/getRatingStar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [addedToCart, setAddedToCart] = useState(undefined);
  const { cartQuantity, setCartQuantity } = useContext(CartQuantity);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((resolve) => {
        setProducts(resolve.data);
        resolve.data.map((datum) => (datum.quantity = 1));
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product) => {
    indicateAddedToCart();

    handleCartQtyChange();

    addOrUpdateCartItem();

    function indicateAddedToCart() {
      setAddedToCart(product.id);
      setTimeout(() => setAddedToCart(undefined), 1050);
    }

    function handleCartQtyChange() {
      setCartQuantity(cartQuantity + product.quantity);
      updateCartQuantity("increase", cartQuantity, product);
    }

    function addOrUpdateCartItem() {
      setCart([...cart, product]);

      cart.map((cartItem) => {
        cartItem.id === product.id &&
          setCart(
            cart.map((cartItem) =>
              cartItem.id === product.id
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + product.quantity,
                  }
                : cartItem
            )
          );
      });
    }
  };

  const handleProductQtyChange = (e, product) => {
    e.target.value === ""
      ? (product.quantity = 1)
      : (product.quantity = parseInt(e.target.value));
  };

  return (
    <div className="grid gap-1 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-14">
      {products.map((product) => {
        return (
          <div
            className="relative flex flex-col border items-center rounded-md p-3"
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
                  <i
                    className={
                      addedToCart === product.id
                        ? "bx bxs-check-circle"
                        : "bx bx-cart-add"
                    }
                  ></i>
                </button>
                <button className="flex items-center content-center rounded-full bg-gray-200 p-2 text-2xl">
                  <i className="bx bx-heart"></i>
                </button>
              </div>
            </div>

            <div
              className="flex flex-row justify-between w-full"
              style={{ alignItems: "center" }}
            >
              <div
                className="flex font-semibold"
                style={{ alignItems: "center" }}
              >
                <p className="text-black font-sans text-[18px]">
                  Quantity:&nbsp;
                </p>
                <input
                  id={product.id}
                  type="number"
                  defaultValue={product.quantity}
                  min={1}
                  className="w-10 h-5 outline-gray-400 rounded border border-gray-400"
                  onChange={(e) => handleProductQtyChange(e, product)}
                />
              </div>

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

            <div className="absolute top-2 right-2">
              <p className="text-black font-black font-mono w-1/2">
                ${convertCents(product.priceCents)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
