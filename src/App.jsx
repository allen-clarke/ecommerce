import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Cart from "./pages/CartPage";
import Products from "./pages/HomePage";
import Checkout from "./pages/CheckoutPage";
import Admin from "./pages/admin/Admin";
import Login from "./pages/LoginPage";
import AdminRoute from "./components/admin/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Products />} />
          <Route path="login-or-signup" element={<Login />} />
          <Route path="cart" element={<Cart />} />
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/*"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
