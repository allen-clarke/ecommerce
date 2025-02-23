import { useEffect, useState } from "react";
import axios from "axios";
import convertCents from "../../../utilities/convertCents";
import Head from "../products/head/Head";
import OrderPreviewModal from "./OrderPreviewModal";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [orderPreview, setOrderPreview] = useState([]);
  const [orderPreviewBoxesAreVisible, setOrderPreviewBoxesAreVisible] =
    useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3000/orders")
      .then((resolve) => {
        //get the total of each order
        resolve.data.map((datum) => {
          datum.orderTotal = 0;
          datum.cart.map((order) => {
            datum.orderTotal += (order.priceCents / 100) * order.quantity;
          });
        });

        setOrders(resolve.data);
      })
      .catch((error) => console.error(error));
  }, [orders]);

  //get the total of all the orders
  let totalOrder = 0;
  orders.map((order) => (totalOrder += order.orderTotal));

  const handleOrderDeletion = (order) => {
    confirm(
      `Are you sure you want to delete ${order.buyerDetails.fullname}'s order ?`
    ) && axios.delete(`http://localhost:3000/orders/${order.id}`);
  };

  return (
    <>
      {/* <Head /> */}
      <OrderPreviewModal
        orderPreviewBoxesAreVisible={orderPreviewBoxesAreVisible}
        setOrderPreviewBoxesAreVisible={setOrderPreviewBoxesAreVisible}
        orderPreview={orderPreview}
        setOrderPreview={setOrderPreview}
      />
      <div
        className={
          orderPreviewBoxesAreVisible
            ? "fixed top-20 left-56 right-4 text-3xl text-white min-h-screen border border-gray-300 rounded-b-lg bg-stone-100"
            : "absolute top-20 left-56 right-4 text-3xl text-white min-h-screen border border-gray-300 rounded-b-lg bg-stone-100"
        }
      >
        <div className="overflow-x-auto">
          <table className="table text-gray-700 text-[17px] font-sans font-medium w-full">
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Order ID</th>
                <th>Purchaser</th>
                <th>Totals</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-b border-b-gray-300">
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>#{order.id}</td>
                  <td>{`${order.buyerDetails.firstname} ${order.buyerDetails.lastname}`}</td>
                  <td>${order.orderTotal.toFixed(2)}</td>
                  <td>{order.buyerDetails.date}</td>
                  <td className="flex items-center">
                    <button
                      title="preview order"
                      onClick={() => {
                        setOrderPreview(order.cart);

                        setOrderPreviewBoxesAreVisible(true);
                      }}
                    >
                      {/* <i className="text-2xl text-gray-600 bx bx-camera"></i> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 fill-current hover:fill-gray-400 mr-3 inline-block"
                        viewBox="0 0 128 128"
                      >
                        <path
                          d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                    <button
                      title="delete order"
                      onClick={() => handleOrderDeletion(order)}
                    >
                      <i className="text-xl text-gray-500 hover:text-red-600 bx bx-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="border-b border-b-gray-300 text-indigo-500">
                <th></th>
                <td>----------</td>
                <td>Total Order</td>
                <td>${totalOrder.toFixed(2)}</td>
                <td>----------</td>
              </tr>
            </tbody>

            <tfoot>
              <tr>
                <th></th>

                <th>Order ID</th>
                <th>Purchaser</th>
                <th>Totals</th>
                <th>Date</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/*  <div className="relative grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {orderPreview.map((order) => (
            <a key={order.id} className="group">
              <img
                alt={order.name}
                src={`/${order.image}`}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              <h3 className="mt-4 text-sm text-gray-900">{order.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                ${convertCents(order.priceCents)}
              </p>
              <p className="mt-1 text-lg font-medium text-gray-900">
                Qty: {order.quantity}
              </p>
            </a>
          ))} 
        </div>*/}
    </>
  );
};
export default Orders;
