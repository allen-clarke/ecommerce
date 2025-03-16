import { Link } from "react-router-dom";

const ProductHead = () => {
  return (
    <div className="flex items-center py-3 justify-between rounded-t-lg border border-gray-300 bg-stone-100">
      <div>
        <p className="text-xl text-black font-bold font-sans pl-3">
          All Products
        </p>
      </div>
      <div className="flex items-center">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="hidden md:block" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      <div className="flex items-center pr-4">
        <select className="select select-bordered mr-2" defaultValue="Filter">
          <option disabled>Filter</option>
        </select>
        <Link
          to="/admin/new"
          className="flex items-center h-[44px] px-2 text-[11px] font-sans font-bold border rounded-md text-white border-blue-800 bg-blue-800"
        >
          <i className="bx bx-plus text-sm mr-0.5"></i>
          Add Product
        </Link>
      </div>
    </div>
  );
};

export default ProductHead;
