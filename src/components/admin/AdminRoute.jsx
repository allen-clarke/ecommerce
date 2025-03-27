import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  if (loading) return <div className="skeleton h-screen w-screen"></div>;
  return isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
