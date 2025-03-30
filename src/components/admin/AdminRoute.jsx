import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  const WarningComponent = () => {
    return (
      <div>
        <div id="modal">
          <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
              <div className="my-6 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 fill-red-500 inline"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2a1 1 0 0 1 .866.5l9 15A1 1 0 0 1 21 19H3a1 1 0 0 1-.866-1.5l9-15A1 1 0 0 1 12 2Zm0 3.618L5.618 18h12.764L12 5.618ZM11 10a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0v-4Zm1 8a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 12 18Z"
                    data-original="#000000"
                  />
                </svg>

                <h4 className="text-slate-900 text-base font-medium mt-4">
                  You are not authorized to access this route ‼
                </h4>

                <div className="text-center space-x-4 mt-10">
                  <button
                    id="closeButton"
                    type="button"
                    className="px-5 py-2.5 rounded-lg text-slate-900 text-sm font-medium bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Okay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="skeleton h-screen w-screen"></div>;
  return isAdmin ? children : <WarningComponent />;
};

export default AdminRoute;
//
