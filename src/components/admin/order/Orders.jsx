import axios from "axios";
import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/orders")
      .then((resolve) => {
        //get the total of each order
        resolve.data.map((datum) => {
          datum.orderTotal = 0;
          datum.cart.map((cartItem) => {
            datum.orderTotal += (cartItem.priceCents / 100) * cartItem.quantity;
          });
        });

        setOrders(resolve.data);
      })
      .catch((error) => console.error(error));
  }, []);

  //get the total of all the orders
  let totalOrder = 0;
  orders.map((order) => (totalOrder += order.orderTotal));

  return (
    <div className="absolute top-20 left-56 right-4 text-3xl text-white min-h-screen border border-gray-300 rounded-b-lg bg-stone-100">
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
                <td>{new Date().toLocaleDateString()}</td>
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
  );
};
export default Orders;
