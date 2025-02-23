import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const adminPaths = [
    "/admin",
    "/admin/product/new",
    "/admin/product/edit/:id",
  ];
  return (
    <>
      <Header />
      <main className="flex-grow flex-shrink-0 basis-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
