import { Link } from "react-router-dom";
import useDeliveryFees from "../hooks/useDeliveryFees";
import useOrderSummaryTotal from "../hooks/useOrderSummaryTotal";

const OrderSummary = ({ actualPurchase: actualPurchase }) => {
  const { deliveryFees } = useDeliveryFees(actualPurchase);
  const { total } = useOrderSummaryTotal(actualPurchase);

  return (
    <div className="bg-white h-max p-4 shadow-[0_2px_9px_-3px_rgba(61,63,68,0.3)] sticky top-0">
      <h3 className="text-lg font-bold text-gray-800">Order Summary</h3>

      <ul className="text-gray-800 text-sm space-y-3 mt-4">
        <li className="flex flex-wrap gap-4">
          Subtotal{" "}
          <span className="ml-auto font-bold">
            ${actualPurchase.toFixed(2)}
          </span>
        </li>
        <li className="flex flex-wrap gap-4">
          Delivery <span className="ml-auto font-bold">{deliveryFees}</span>
        </li>

        <li className="flex flex-wrap gap-4 font-bold">
          Total <span className="ml-auto">{total}</span>
        </li>
      </ul>
      <Link to="/checkout">
        <button
          type="button"
          className="mt-6 text-sm px-4 py-2.5 w-full bg-blue-700 hover:bg-blue-800 tracking-wide text-white"
        >
          Checkout
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          className="mt-6 text-sm px-4 py-2.5 w-full text-blue-700 hover:text-blue-800 tracking-wide"
        >
          <i className="bx bx-left-arrow-alt text-gray-500"></i> Continue
          shopping
        </button>
      </Link>

      <div className="mt-6 space-y-6">
        <div>
          <h4 className="text-sm font-bold text-gray-800 mb-2">
            Secure payment
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed">
            Experience peace of mind with our secure payment options, ensuring
            your transactions are protected and reliable.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-800 mb-2">
            Free delivery
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed">
            Enjoy the convenience of free delivery on all your orders, providing
            a cost-effective and seamless shopping experience.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-800 mb-2">
            Easy to return
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed">
            Simplify your shopping experience with hassle-free returns. Our easy
            return process ensures convenience and customer satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
