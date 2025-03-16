import { useState } from "react";
import axios from "axios";
import OrderPreviewModal from "../../components/admin/OrderPreviewModal";
import useOrder from "../../hooks/useOrder";

const Orders = () => {
  const { orders } = useOrder();
  const [orderPreview, setOrderPreview] = useState([]);
  const [orderPreviewBoxesAreVisible, setOrderPreviewBoxesAreVisible] =
    useState(false);

  //get the total of all the orders
  let totalOrder = 0;
  orders.map((order) => (totalOrder += order.orderTotal));

  const handleOrderDeletion = (order) => {
    confirm(`Are you sure you want to delete this order ?`) &&
      axios.delete(`http://localhost:3000/orders/${order.id}`);
  };

  return (
    <>
      <OrderPreviewModal
        orderPreviewBoxesAreVisible={orderPreviewBoxesAreVisible}
        setOrderPreviewBoxesAreVisible={setOrderPreviewBoxesAreVisible}
        orderPreview={orderPreview}
        setOrderPreview={setOrderPreview}
      />

      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 flex flex-col md:ml-64">
          <div className="p-6 bg-white m-4 rounded-lg shadow-md mt-20 overflow-auto">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="p-3 text-left">Order ID</th>
                    <th className="p-3 text-left">Purchaser</th>
                    <th className="p-3 text-left">Total ($)</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-blue-100"
                      }`}
                    >
                      <td className="p-3 font-semibold">{order.id}</td>
                      <td className="p-3 font-semibold">{`${order.buyerDetails.firstname} ${order.buyerDetails.lastname}`}</td>
                      <td className="p-3 font-semibold">{order.orderTotal}</td>
                      <td className="p-3 font-semibold">21-03-22</td>
                      <td className="p-3 font-semibold text-center flex items-center justify-center gap-3">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          title="see details"
                          onClick={() => {
                            setOrderPreview(order.cart);

                            setOrderPreviewBoxesAreVisible(true);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 fill-current mr-3 inline-block"
                            viewBox="0 0 128 128"
                          >
                            <path
                              d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                              data-original="#000000"
                            ></path>
                          </svg>
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          title="delete"
                          onClick={() => handleOrderDeletion(order)}
                        >
                          <i className="bx bx-trash text-xl"></i>
                        </button>
                      </td>
                    </tr>
                  ))}

                  <tr
                    className={`${
                      orders.length % 2 === 0 ? "bg-gray-100" : "bg-blue-100"
                    }`}
                  >
                    <td className="p-3">--------</td>
                    <td>Total Order</td>
                    <td>${totalOrder.toFixed(2)}</td>
                    <td className="p-3">--------</td>
                    <td className="p-3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Orders;
