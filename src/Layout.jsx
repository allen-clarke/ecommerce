import Header from "./components/header/Header";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/admin" && <Header />}
      <main className="flex-grow flex-shrink-0 basis-auto">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
