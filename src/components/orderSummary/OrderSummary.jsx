import { Link } from "react-router-dom";

const OrderSummary = ({ totalPurchase }) => {
  return (
    <div className="border rounded bg-transparent pt-5 mb-2 mt-12">
      <div>
        <h1 className="anton-sc text-center text-2xl border-b pb-5">
          Order Summary
        </h1>
      </div>
      <div className="flex flex-col pb-2">
        <div className="flex flex-row justify-between px-2 py-3">
          <p className="anton-sc text-black">Subtotal</p>
          <p className="text-black font-bold font-sans">
            ${totalPurchase.toFixed(2)}
          </p>
        </div>
        <div className="flex flex-row justify-between px-2 py-3">
          <p className="anton-sc text-black">Delivery</p>
          <p className="text-black font-bold font-sans">
            {totalPurchase > 150 ? "Free" : "$" + Number(3).toFixed(2)}
          </p>
        </div>
        <div className="flex flex-row justify-between px-2 py-3 border-y mb-2">
          <p className="anton-sc text-black">Total</p>
          <p className="text-black font-bold font-sans">
            $
            {totalPurchase > 150
              ? totalPurchase.toFixed(2)
              : (totalPurchase + 3).toFixed(2)}
          </p>
        </div>
        <Link
          to="/checkout"
          className="bg-orange-500 hover:bg-orange-600 text-white text-center text-2xl font-medium rounded-3xl font-serif py-2.5 mx-2"
        >
          Check Out
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
