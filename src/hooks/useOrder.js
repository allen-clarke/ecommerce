import axios from "axios";
import { useEffect, useState } from "react";

const useOrder = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/orders")
      .then((resolve) => {
        //  get the total of each order
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

  return { orders, setOrders };
};

export default useOrder;
