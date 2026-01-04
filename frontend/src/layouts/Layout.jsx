import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="p-4 flex-1">
        <Outlet />
      </div>
    </>

  );
};

export default Layout;