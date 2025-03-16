import { Outlet } from "react-router-dom";
import DashboardSidebar from "../../components/admin/Sidebar";
import DashboardHeader from "../../components/admin/DashboardHeader";
const Layout = () => {
  return (
    <>
      <DashboardSidebar />
      <DashboardHeader />
      <Outlet />
    </>
  );
};

export default Layout;
