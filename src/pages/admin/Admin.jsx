import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Products from "./Products";
import NewProducts from "./NewProductPage";
import EditProduct from "./EditProductPage";
import Orders from "./OrdersPage";
import Users from "./Users";

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Products />} />
        <Route path="new" element={<NewProducts />} />
        <Route path="edit/:id" element={<EditProduct />} />
        <Route path="orders" element={<Orders />} />
        <Route path="list-of-users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default Admin;
