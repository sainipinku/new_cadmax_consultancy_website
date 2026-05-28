import { useEffect, useState } from "react";
import {
  Users,
  Briefcase,
  Phone,
  FolderKanban,
  TrendingUp,
  Eye,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Building2,
  MapPin,
} from "lucide-react";
import API from "../../../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalInquiries: 0,
    unreadInquiries: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [projectsRes, inquiriesRes] = await Promise.all([
        API.get("/projects/admin/all"),
        API.get("/admin/inquiries"),
      ]);

      const projects = projectsRes.data?.data || [];
      const inquiries = inquiriesRes.data?.data || [];

      const active = projects.filter(p => p.isActive && !p.isDeleted).length;
      const unread = inquiries.filter(i => i.status === "unread").length;

      setStats({
        totalProjects: projects.length,
        activeProjects: active,
        totalInquiries: inquiries.length,
        unreadInquiries: unread,
      });

      setRecentInquiries(inquiries.slice(0, 5));
      setRecentProjects(projects.filter(p => !p.isDeleted).slice(0, 5));
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Active Projects",
      value: stats.activeProjects,
      icon: FolderKanban,
      color: "from-blue-600 to-blue-700",
      lightBg: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: "+12%",
    },
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: Building2,
      color: "from-indigo-600 to-indigo-700",
      lightBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      trend: "+8%",
    },
    {
      title: "Total Inquiries",
      value: stats.totalInquiries,
      icon: Mail,
      color: "from-purple-600 to-purple-700",
      lightBg: "bg-purple-50",
      iconColor: "text-purple-600",
      trend: "+24%",
    },
    {
      title: "Unread Inquiries",
      value: stats.unreadInquiries,
      icon: AlertCircle,
      color: stats.unreadInquiries > 0 ? "from-red-600 to-red-700" : "from-emerald-600 to-emerald-700",
      lightBg: stats.unreadInquiries > 0 ? "bg-red-50" : "bg-emerald-50",
      iconColor: stats.unreadInquiries > 0 ? "text-red-600" : "text-emerald-600",
      trend: stats.unreadInquiries > 0 ? "Needs attention" : "All clear",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-slate-500 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back! Here's your project overview.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <Calendar size={16} />
          <span>{new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${item.lightBg} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                  <ArrowUpRight size={12} />
                  {item.trend}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800">{item.value}</h3>
              <p className="text-sm text-slate-500 mt-1">{item.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-purple-600" />
              <h3 className="font-semibold text-slate-800">Recent Inquiries</h3>
            </div>
            <span className="text-xs text-slate-400">Last 5</span>
          </div>
          <div className="divide-y divide-slate-100">
            {recentInquiries.length > 0 ? (
              recentInquiries.map((inq) => (
                <div key={inq._id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        inq.status === "unread" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                      }`}>
                        {inq.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate">{inq.name}</p>
                        <p className="text-xs text-slate-500 truncate">{inq.email}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      inq.status === "unread" 
                        ? "bg-red-50 text-red-600" 
                        : "bg-green-50 text-green-600"
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400">
                <Mail size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No inquiries yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderKanban size={18} className="text-blue-600" />
              <h3 className="font-semibold text-slate-800">Recent Projects</h3>
            </div>
            <span className="text-xs text-slate-400">Last 5</span>
          </div>
          <div className="divide-y divide-slate-100">
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <div key={project._id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                        <Building2 size={16} className="text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate">{project.title}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          {project.location && (
                            <span className="flex items-center gap-1">
                              <MapPin size={10} />
                              {project.location}
                            </span>
                          )}
                          {project.sector && (
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-medium text-slate-600">
                              {project.sector}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ${
                      project.isActive 
                        ? "bg-green-50 text-green-600" 
                        : "bg-amber-50 text-amber-600"
                    }`}>
                      {project.isActive ? (
                        <><CheckCircle2 size={10} /> Active</>
                      ) : (
                        <><AlertCircle size={10} /> Inactive</>
                      )}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400">
                <FolderKanban size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No projects yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-5 md:p-6 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <p className="text-sm text-blue-200 mt-1">Manage your projects and inquiries efficiently</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/admin/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-700 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors shadow-lg"
            >
              <FolderKanban size={16} />
              View Projects
            </a>
            <a
              href="/admin/inquiries"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white border border-white/20 rounded-lg font-medium text-sm hover:bg-white/20 transition-colors"
            >
              <Mail size={16} />
              View Inquiries
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;