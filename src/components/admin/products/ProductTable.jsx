import axios from "axios";
import { useEffect, useState } from "react";
import convertCents from "../../../utilities/convertCents";
import { Link } from "react-router-dom";

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((resolve) => setProducts(resolve.data))
      .catch((error) => console.error(error));
  }, [products]);

  const handleDeleteProduct = (product) => {
    confirm(`Are you sure you want to delete ${product.name} ?`) &&
      axios.delete(`http://localhost:3000/products/${product.id}`);
  };

  return (
    <div className="absolute top-36 left-56 right-4 text-3xl text-white min-h-screen border border-gray-300 rounded-b-lg bg-stone-100">
      <div className="overflow-x-auto">
        <table className="table text-gray-700 text-[17px] font-sans font-medium w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Price ($)</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b border-b-gray-300">
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={product.image} alt={product.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td>{convertCents(product.priceCents)}</td>
                <td>Clothing</td>
                <td className="flex items-center">
                  <Link to={"/admin/edit/" + product.id} title="edit product">
                    <i className="text-2xl text-gray-700 hover:text-gray-400 bx bx-pencil"></i>
                  </Link>
                  <button
                    title="delete product"
                    onClick={() => handleDeleteProduct(product)}
                  >
                    <i className="text-2xl text-gray-500 hover:text-red-600 bx bx-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
