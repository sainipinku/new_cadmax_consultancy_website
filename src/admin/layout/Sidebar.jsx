import {
  LayoutDashboard,
  FolderKanban,
  LogOut,
  Mail,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/axios";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isAdminAuth");
    navigate("/admin/login", { replace: true });
  };

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
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col bg-gradient-to-b from-[#0F2C59] to-[#1a3f7a] text-white transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
        {/* LOGO + TOGGLE */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {isOpen && (
            <span className="text-xl font-bold tracking-wider">CADMAX</span>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <NavItem
            to="/admin"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            exact
            collapsed={!isOpen}
          />

          <NavItem
            to="/admin/inquiries"
            icon={<Mail size={20} />}
            label="Inquiries"
            badge={unreadCount}
            collapsed={!isOpen}
          />

          <div className="pt-2 mt-2 border-t border-white/10">
            <p className={`text-xs uppercase text-blue-200/60 px-3 mb-2 ${!isOpen && "text-center"}`}>
              {isOpen ? "Projects" : "P"}
            </p>
            <NavItem
              to="/admin/projects"
              icon={<FolderKanban size={20} />}
              label="All Projects"
              collapsed={!isOpen}
            />
          </div>
        </nav>

        {/* LOGOUT */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-red-500/20 text-red-300 hover:text-red-200 transition group ${!isOpen && "justify-center"}`}
            title="Logout"
          >
            <LogOut size={20} />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <aside className={`lg:hidden fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-[#0F2C59] to-[#1a3f7a] text-white transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          <span className="text-xl font-bold tracking-wider">CADMAX</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <NavItem to="/admin" icon={<LayoutDashboard size={20} />} label="Dashboard" exact />
          <NavItem to="/admin/inquiries" icon={<Mail size={20} />} label="Inquiries" badge={unreadCount} />
          <div className="pt-2 mt-2 border-t border-white/10">
            <p className="text-xs uppercase text-blue-200/60 px-3 mb-2">Projects</p>
            <NavItem to="/admin/projects" icon={<FolderKanban size={20} />} label="All Projects" />
          </div>
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-red-500/20 text-red-300 hover:text-red-200 transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

const NavItem = ({ to, icon, label, exact, badge, collapsed }) => (
  <NavLink
    to={to}
    end={exact}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2.5 rounded-lg transition group ${
        isActive
          ? "bg-white/15 text-white shadow-sm"
          : "text-white/60 hover:bg-white/10 hover:text-white"
      } ${collapsed ? "justify-center" : ""}`
    }
    title={collapsed ? label : undefined}
  >
    <div className="shrink-0">{icon}</div>
    {!collapsed && <span className="text-sm font-medium">{label}</span>}
    {badge > 0 && !collapsed && (
      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
    {badge > 0 && collapsed && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
        {badge > 9 ? "9+" : badge}
      </span>
    )}
  </NavLink>
);

export default Sidebar;