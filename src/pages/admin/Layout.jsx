import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import Header from "../../components/admin/head/Head";

const Layout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
    </>
  );
};

export default Layout;
