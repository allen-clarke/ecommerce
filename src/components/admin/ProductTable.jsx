import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductHead from "./ProductTableHeader";
import convertCents from "../../utilities/convertCents";
// import { Link } from "react-router-dom";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <>
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="flex-1 flex flex-col md:ml-64">
          <div className="p-6 bg-white m-4 rounded-lg shadow-md mt-20 overflow-auto">
            <ProductHead />
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="p-3 text-left">Image</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Price ($)</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-blue-100"
                      }`}
                    >
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12 ml-3">
                              <img src={product.image} alt={product.name} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 font-bold">Clothings</td>
                      <td className="p-3 font-bold">
                        {convertCents(product.priceCents)}
                      </td>
                      <td className="p-3 text-center flex justify-center gap-3">
                        <Link
                          to={`/admin/edit/${product.id}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <i className="bx bx-pencil text-xl"></i>
                        </Link>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteProduct(product)}
                        >
                          <i className="bx bx-trash text-xl"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
