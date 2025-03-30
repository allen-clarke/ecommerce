import { useState } from "react";
import { useNavigate } from "react-router-dom";
import admin from "../../assets/admin.jfif";
import { useAuth } from "../../context/AuthContext";
const DashboardHeader = () => {
  const [userDropDownIsOpened, setUserDropDownIsOpened] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow flex justify-between items-center fixed w-full z-10 md:ml-64">
      <button
        className="md:invisible p-2"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          className="fill-gray-800"
          viewBox="0 0 64 64"
        >
          <path d="M8 16h48v4H8v-4Zm0 12h48v4H8v-4Zm0 12h48v4H8v-4Z" />
        </svg>
      </button>

      <div className="flex justify-between items-center p-4 space-x-4 cursor-pointer">
        <div className="flex">
          <i className="bx bx-home text-[22px]"></i>
        </div>
        <div className="flex">
          <i className="bx bx-bell text-[22px] text-"></i>
        </div>
        <div
          className="flex items-center content-center rounded-full h-6 w-6 mr-3 border border-gray-400"
          onMouseOver={() => setUserDropDownIsOpened(true)}
          onMouseOut={() => setUserDropDownIsOpened(false)}
        >
          <img
            className="rounded-full h-full w-full"
            src={admin}
            alt="Photo of an admin"
          />
        </div>
      </div>

      <div
        className={`${
          userDropDownIsOpened ? "block" : "hidden"
        } w-52 h-48 bg-white pb-4 fixed right-0 top-10 border`}
        onMouseOver={() => setUserDropDownIsOpened(true)}
        onMouseOut={() => setUserDropDownIsOpened(false)}
      >
        <ul className="space-y-1">
          <li className="flex items-center font-normal font-[sans-serif] pl-3 py-1.5 cursor-pointer text-gray-700">
            <i className="bx bx-user-circle mr-1"></i>
            Account
          </li>
          <hr className="bg-gray-400" />
          <li className="flex items-center font-normal font-[sans-serif] pl-3 py-1.5 cursor-pointer text-gray-700">
            <i className="bx bxl-product-hunt mr-1"></i>
            Products
          </li>
          <li className="flex items-center font-normal font-[sans-serif] pl-3 py-1.5 cursor-pointer text-gray-700">
            <i className="bx bx-cart-alt mr-1"></i>
            Orders
          </li>
          <li className="flex items-center font-normal font-[sans-serif] pl-3 py-1.5 cursor-pointer text-gray-700">
            <i className="bx bx-cog mr-1"></i>
            Settings
          </li>
          <li
            className="flex items-center font-normal font-[sans-serif] pl-3 py-1.5 cursor-pointer text-gray-700"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <i className="bx bx-log-out-circle mr-1"></i>
            Logout
          </li>
        </ul>
      </div>
    </header>
  );
};

export default DashboardHeader;
