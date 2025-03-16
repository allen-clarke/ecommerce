import convertCents from "../../utilities/convertCents";
const OrderPreviewModal = ({
  orderPreviewBoxesAreVisible,
  setOrderPreviewBoxesAreVisible,
  orderPreview,
  setOrderPreview,
}) => {
  return (
    <div
      className={
        orderPreviewBoxesAreVisible
          ? "fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]"
          : "hidden"
      }
    >
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
        <div className="flex items-center pb-3 border-b border-gray-300">
          <h3 className="text-gray-800 text-xl font-bold flex-1">
            Order Preview
          </h3>
          <button
            onClick={() => {
              setOrderPreviewBoxesAreVisible(false);
              setOrderPreview([]);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
          </button>
        </div>

        <div className="my-6">
          <div className="relative grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
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
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6 flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
            onClick={() => {
              setOrderPreviewBoxesAreVisible(false);
              setOrderPreview([]);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default OrderPreviewModal;
