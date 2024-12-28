import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Products from "./products/Products";
import NewProducts from "./newProducts/NewProduct";

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Products />} />
        <Route path="new" element={<NewProducts />} />
      </Route>
    </Routes>
  );
};

export default Admin;
