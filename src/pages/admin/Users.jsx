import { useEffect, useState } from "react";
import axios from "axios";
// import ProductHead from "./ProductTableHeader";
import { useAuth } from "../../context/AuthContext";
import img from "../../assets/admin.jfif";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users", { headers: { uid: user.uid } })
      .then((resolve) => setUsers(resolve.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDeleteUser = async (uid) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/delete-user",
        { uid }, // Wrap uid in an object
        {
          headers: { uid: user.uid },
        }
      );

      if (response.data.success) {
        alert("User deleted successfully!");
      } else {
        alert(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="flex-1 flex flex-col md:ml-64">
          <div className="p-6 bg-white m-4 rounded-lg shadow-md mt-20 overflow-auto">
            {/* <ProductHead /> */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="p-3 text-left">Photo</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email ($)</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-blue-100"
                      }`}
                    >
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12 ml-3">
                              <img src={img} alt={user.displayName} />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 font-bold">{user.displayName}</td>
                      <td className="p-3 font-bold">{user.email}</td>
                      <td className="p-3 text-center flex justify-center gap-3">
                        <button className="text-blue-500 hover:text-blue-700">
                          <i className="bx bx-pencil text-xl"></i>
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteUser(user.uid)}
                        >
                          <i className="bx bx-trash text-xl"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
