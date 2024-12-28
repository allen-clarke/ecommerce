import Header from "./components/header/Header";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const adminPaths = ["/admin", "/admin/new"];
  return (
    <>
      {adminPaths.forEach((path) => location.pathname !== path && <Header />)}
      <main className="flex-grow flex-shrink-0 basis-auto">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
