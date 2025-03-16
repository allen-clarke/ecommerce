import { useState } from "react";
import sidebarItems from "./sidebarItems";

const DashboardSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isActive, setIsActive] = useState(-1);

  return (
    <aside
      className={`w-64 bg-white shadow-lg p-4 flex flex-col fixed h-screen ${
        sidebarOpen ? "block" : "hidden"
      } md:flex`}
    >
      <div className="flex items-center gap-2 text-xl font-bold mb-6">
        <span>Fashionista</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          <li className="flex items-center font-medium pl-3 py-2.5 rounded-l bg-blue-100 text-gray-700 border-l-4 border-l-gray-700 hover:bg-blue-100 hover:border-l-4 hover:border-l-gray-700">
            <i className="bx bxs-dashboard mr-1"></i>Dashboard
          </li>
          {sidebarItems.map((item, index) => {
            return (
              <li
                key={index}
                className={`flex items-center font-medium pl-3 py-2.5 rounded-l cursor-pointer text-gray-700 ${
                  index === isActive &&
                  "bg-blue-100 border-l-4 border-l-gray-700"
                } hover:bg-blue-100 hover:border-l-4 hover:border-l-gray-700`}
                onClick={() => setIsActive(index)}
              >
                <i className={`bx ${item.icon} mr-1`}></i>
                {item.label}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
