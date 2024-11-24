import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="flex-grow flex-shrink-0 basis-auto">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
