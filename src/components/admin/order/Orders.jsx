import { useEffect, useState } from "react";
import axios from "axios";
import convertCents from "../../../utilities/convertCents";

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
                  <td>{order.buyerDetails.fullname}</td>
                  <td>${order.orderTotal.toFixed(2)}</td>
                  <td>{order.buyerDetails.date}</td>
                  <td className="flex items-center">
                    <button
                      className="bg-gray-300 w-8 h-8 mr-0.5 rounded-md"
                      title="preview order"
                      onClick={() => {
                        setOrderPreview(order.cart);
                        setOrderPreviewBoxesAreVisible(true);
                      }}
                    >
                      <i className="text-2xl text-gray-600 bx bx-camera"></i>
                    </button>
                    <button
                      className="bg-gray-300 w-8 h-8 rounded-md"
                      title="delete order"
                      onClick={() => handleOrderDeletion(order)}
                    >
                      <i className="text-2xl text-red-600 bx bx-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="border-b border-b-gray-300 text-green-500">
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
      <div
        className={
          orderPreviewBoxesAreVisible
            ? "fixed bg-black opacity-90 left-0 right-0 min-h-screen z-50"
            : "fixed bg-black opacity-90 left-0 right-0 min-h-screen z-50 hidden"
        }
      >
        <button
          className="text-white"
          onClick={() => {
            setOrderPreview([]);
            setOrderPreviewBoxesAreVisible(false);
          }}
        >
          <i className="bx bx-x bx-lg font-black"></i>
        </button>
      </div>
      <div
        className={
          orderPreviewBoxesAreVisible
            ? "absolute top-20 left-56 right-4 text-3xl text-white min-h-screen border border-gray-300 rounded-b-lg bg-stone-100 z-[1000]"
            : "absolute top-20 left-56 right-4 text-3xl text-white min-h-screen border border-gray-300 rounded-b-lg bg-stone-100 z-[1000] hidden"
        }
      >
        {orderPreview.map((order) => {
          return (
            <div
              className="flex flex-row border rounded-md py-7 mb-2 relative z-50"
              key={order.id}
            >
              <div className="flex justify-center h-52 basis-1/2 shrink">
                <img
                  src={"/" + order.image}
                  alt={order.name}
                  className="max-h-full max-w-full object-cover cursor-pointer"
                />
              </div>
              <div className="flex basis-1/2 h-full pr-1">
                <div className="flex flex-row justify-end items-center mb-3">
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col">
                      <p className="text-black font-sans mb-2 text-2xl anton-sc">
                        {order.name}
                      </p>

                      <div>
                        <p className="text-black font-semibold font-sans mt-4 text-[18px]">
                          Quantity: {order.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row flex-wrap justify-between mt-8 items-center w-full">
                      <div>
                        <p className="text-black font-semibold font-sans text-[18px]">
                          Unit Price:{"  "}
                          <span className="font-mono">
                            &nbsp;${convertCents(order.priceCents)}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-black font-semibold font-sans text-[18px]">
                          Total:{"  "}
                          <span className="font-mono">
                            &nbsp;$
                            {(
                              convertCents(order.priceCents) * order.quantity
                            ).toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Orders;
