import { useState } from "react";
import { sidebarItems } from "./SidebarItems";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(0);

  return (
    <aside className="fixed left-0 w-52 h-screen bg-stone-100 py-4 border-r border-r-[rgb(29,35,42)]">
      <p className="text-black text-2xl anton-sc ml-3.5">Fashionista</p>

      <ul className="mt-7">
        {sidebarItems.map((sidebarItem, index) => (
          <li
            key={index}
            className={
              isActive === index
                ? "flex items-center text-[17px] font-medium font-sans pl-3 py-2 mr-3 mb-0.5 rounded bg-gray-200 text-purple-400 border-l-4 border-l-purple-400 cursor-pointer"
                : "flex items-center text-[17px] text-gray-800 font-medium font-sans pl-3 py-2 mr-3 mb-0.5 rounded hover:bg-gray-200 hover:text-purple-400 hover:border-l-4 hover:border-l-purple-400 cursor-pointer"
            }
            onClick={() => setIsActive(index)}
          >
            <i className={"bx mr-2 " + sidebarItem.icon}></i>
            {sidebarItem.label}
          </li>
        ))}
      </ul>
      <button className="absolute bottom-6 left-4 flex items-center text-[17px] text-gray-800 font-medium font-sans">
        <i className="bx bx-log-out rotate-180 mr-1"></i>Log out
      </button>
    </aside>
  );
};
export default Sidebar;
