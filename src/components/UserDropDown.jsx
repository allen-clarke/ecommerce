import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserDropDown = ({ userDropDownIsOpened, setUserDropDownIsOpened }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const listItem = [
    { label: "Settings", icon: "cog" },
    { label: "Logout", icon: "log-out-circle" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <div
      className={`${
        userDropDownIsOpened ? "block" : "hidden"
      } w-52 h-48 bg-white pb-4 fixed right-10 top-[52px] border`}
      onMouseOver={() => setUserDropDownIsOpened(true)}
      onMouseOut={() => setUserDropDownIsOpened(false)}
    >
      <ul className="space-y-1">
        <li className="flex items-center font-normal font-[sans-serif] pl-3 py-1.5 cursor-pointer text-gray-700">
          <i className="bx bx-user-circle mr-1"></i>
          Account
        </li>
        <hr className="bg-gray-400" />
        {listItem.map((item, index) => (
          <li
            key={index}
            className="flex items-center font-normal font-[sans-serif] pl-3 py-1.5 cursor-pointer text-gray-700"
            onClick={() => {
              item.label === "Settings"
                ? navigate("/settings")
                : handleLogout();
            }}
          >
            <i className={`bx bx-${item.icon} mr-1`}></i>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UserDropDown;
