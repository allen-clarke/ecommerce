import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Cart from "./components/cart/Cart";
import Products from "./components/products/Products";
import Checkout from "./components/checkout/Checkout";
import Admin from "./components/admin/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="admin/*" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
