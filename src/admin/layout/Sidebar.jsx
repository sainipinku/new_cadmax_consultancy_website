import {
  LayoutDashboard,
  FolderKanban,
  Layers,
  ListTree,
  LogOut,
  Mail,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/axios"; // ⚠️ path check kar lena

const Sidebar = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isAdminAuth");
    navigate("/admin/login", { replace: true });
  };

  // 🔥 fetch unread inquiries
  const fetchUnreadCount = async () => {
    try {
      const res = await API.get("/admin/inquiries");
      const unread = res.data?.data?.filter((i) => i.status === "unread").length || 0;
      setUnreadCount(unread);
    } catch (err) {
      console.error("Failed to fetch inquiry count", err);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col">
      {/* LOGO */}
      <div className="h-16 flex items-center justify-center text-2xl font-bold border-b border-slate-700">
        CADMAX
      </div>

      {/* NAV */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">

        {/* DASHBOARD */}
        <NavItem
          to="/admin"
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          exact
        />

        {/* INQUIRIES 🔥 */}
        <NavItem
          to="/admin/inquiries"
          icon={<Mail size={18} />}
          label="Inquiries"
          badge={unreadCount}
        />

        {/* SERVICES */}
        <div>
          <p className="text-xs uppercase text-slate-400 px-3 mb-2">
            Services
          </p>

          <NavItem
            to="/admin/services/categories"
            icon={<Layers size={18} />}
            label="Service page"
          />

          <NavItem
            to="/admin/services/subcategories"
            icon={<ListTree size={18} />}
            label="Service subpage"
          />
        </div>

        {/* PROJECTS */}
        <div>
          <p className="text-xs uppercase text-slate-400 px-3 mb-2">
            Projects
          </p>

          <NavItem
            to="/admin/projects"
            icon={<FolderKanban size={18} />}
            label="All Projects"
          />
        </div>
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg
                     hover:bg-red-600 text-red-400 hover:text-white transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

const NavItem = ({ to, icon, label, exact, badge }) => (
  <NavLink
    to={to}
    end={exact}
    className={({ isActive }) =>
      `flex items-center justify-between gap-3 px-3 py-2 rounded-lg transition ${
        isActive
          ? "bg-slate-800 text-white"
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`
    }
  >
    <div className="flex items-center gap-3">
      {icon}
      <span>{label}</span>
    </div>

    {badge > 0 && (
      <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </NavLink>
);

export default Sidebar;
