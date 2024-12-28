import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const NewProducts = () => {
  const [newProduct, setNewProduct] = useState({
    image: "",
    name: "",
    rating: { stars: 0, count: 0 },
    priceCents: 0,
    keywords: [""],
  });
  const navigate = useNavigate();

  const handleAddNewProduct = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/products", newProduct)
      .catch((error) => console.error(error));
    navigate("/admin");
  };

  return (
    <div className="flex flex-col bg-stone-100 absolute top-20 left-56 right-4 min-h-screen py-4 rounded-lg">
      <form
        onSubmit={(e) => handleAddNewProduct(e)}
        className="flex flex-col my-0 mx-auto"
      >
        <h1 className="text-black text-center md:text-left font-black anton-sc text-2xl my-4 ml-2">
          Add Product
        </h1>
        <label className="text-black font-sans font-normal text-xl mb-4">
          Image
          <br />
          <input
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            type="text"
            name="product-image"
            id="product-image"
            className="border border-[rgb(29,35,42)] outline-gray-300 p-2 rounded-md font-sans font-normal text-xl md:w-96 w-80 mt-3.5"
          />
        </label>
        <label className="text-black font-sans font-normal text-xl mb-4">
          Name
          <br />
          <input
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            type="text"
            name="product-name"
            id="product-name"
            className="border border-[rgb(29,35,42)] outline-gray-300 p-2 rounded-md font-sans font-normal text-xl md:w-96 w-80 mt-3.5"
          />
        </label>
        <label className="text-black font-sans font-normal text-xl mb-4">
          Price
          <br />
          <input
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                priceCents: parseInt(e.target.value),
              })
            }
            type="text"
            name="product-price"
            id="product-price"
            className="border border-[rgb(29,35,42)] outline-gray-300 p-2 rounded-md font-sans font-normal text-xl md:w-96 w-80 mt-3.5"
          />
        </label>
        <fieldset className="flex flex-col">
          <legend>Ratings</legend>
          <label className="text-black font-sans font-normal text-xl mb-4">
            Stars
            <br />
            <select
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  rating: {
                    ...newProduct.rating,
                    stars: Number(e.target.value),
                  },
                })
              }
              className="select select-bordered mr-2"
            >
              <option disabled selected>
                Stars
              </option>
              <option>0</option>
              <option>0.5</option>
              <option>1</option>
              <option>1.5</option>
              <option>2</option>
              <option>2.5</option>
              <option>3</option>
              <option>3.5</option>
              <option>4</option>
              <option>4.5</option>
              <option>5</option>
            </select>
          </label>
          <label className="text-black font-sans font-normal text-xl mb-4">
            Counts
            <br />
            <input
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  rating: {
                    ...newProduct.rating,
                    count: Number(e.target.value),
                  },
                })
              }
              type="text"
              name="rating-count"
              id="rating-count"
              className="border border-[rgb(29,35,42)] outline-gray-300 p-2 rounded-md font-sans font-normal text-xl md:w-96 w-80 mt-3.5"
            />
          </label>
        </fieldset>

        <label className="text-black font-sans font-normal text-xl mb-4">
          Keywords
          <br />
          <input
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                keywords: [e.target.value],
              })
            }
            type="text"
            name="keywords"
            id="keywords"
            className="border border-[rgb(29,35,42)] outline-gray-300 p-2 rounded-md font-sans font-normal text-xl md:w-96 w-80 mt-3.5"
          />
        </label>

        <div className="flex items-center">
          <button className="flex items-center h-10 px-2 text-[11px] font-sans font-bold border rounded-md text-white bg-blue-700 mr-3">
            Add Product
          </button>
          <Link
            to="/admin"
            type="button"
            className="flex items-center h-10 px-2 text-[11px] font-sans font-bold border rounded-md text-white bg-green-950"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
export default NewProducts;
