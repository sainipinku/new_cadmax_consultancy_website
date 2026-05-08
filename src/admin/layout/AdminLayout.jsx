import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Navbar from "./Navbar";

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("isAdminAuth");
    const token = localStorage.getItem("adminToken");

    if (!isAuth || !token) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-slate-100">
      
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col">

        {/* TOP NAVBAR (PROFILE / DROPDOWN) */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
