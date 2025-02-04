import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Products from "./products/Products";
import NewProducts from "./newProducts/NewProduct";
import EditProduct from "./editProduct/EditProduct";
import Orders from "./order/Orders";

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Products />} />
        <Route path="new" element={<NewProducts />} />
        <Route path="edit/:id" element={<EditProduct />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  );
};

export default Admin;
