import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  return isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
