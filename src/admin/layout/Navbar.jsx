import { useState } from "react";
import { ChevronDown, LogOut, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onToggleSidebar }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const admin = {
    name: "cadmax",
    email: "admin@cadmax.com",
    avatar: "https://i.pravatar.cc/100?img=3",
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuth");
    navigate("/admin/login", { replace: true });
    window.location.reload();
  };

  return (
    <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 shadow-sm">
      {/* Left: Title */}
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-slate-800">
          Admin Panel
        </h2>
      </div>

      {/* Right: Profile */}
      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 cursor-pointer select-none p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <img
            src={admin.avatar}
            alt="Admin"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200"
          />
          <span className="font-medium text-slate-700 text-sm hidden sm:block">
            {admin.name}
          </span>
          <ChevronDown size={16} className="text-slate-500" />
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-12 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3">
                <img
                  src={admin.avatar}
                  alt="Admin"
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-white"
                />
                <div>
                  <p className="font-semibold text-slate-800 text-sm">
                    {admin.name}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Mail size={12} />
                    {admin.email}
                  </div>
                </div>
              </div>
            </div>

            <div className="py-1">
              <button
                onClick={() => {
                  navigate("/admin/profile");
                  setOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <User size={16} className="text-slate-400" />
                Update Profile
              </button>

              <button
                onClick={() => {
                  navigate("/admin/reset-password");
                  setOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Reset Password
              </button>

              <div className="border-t border-slate-100 my-1" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;