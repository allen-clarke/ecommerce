import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Products from "./products/Products";
import Orders from "./order/Orders";

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Products />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  );
};

export default Admin;
