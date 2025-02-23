import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <>
      {!pathname.includes("/admin") && <Header />}
      <main className="flex-grow flex-shrink-0 basis-auto">
        <Outlet />
      </main>
      {!pathname.includes("/admin") && <Footer />}
    </>
  );
};

export default Layout;
