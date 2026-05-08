import { useEffect, useState } from "react";
import { 
  Pencil, 
  Trash2, 
  Plus, 
  Eye, 
  X, 
  Download, 
  RotateCcw, 
  Trash, 
  LayoutGrid, 
  List, 
  Search,
  Filter,
  MoreVertical,
  Image as ImageIcon,
  MapPin,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import API from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../components/Toast/Toast";
import { useConfirm } from "../../../components/ConfirmModal/ConfirmModal";

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false);
  const [activeTab, setActiveTab] = useState("cards");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSector, setFilterSector] = useState("");

  const navigate = useNavigate();
  const toast = useToast();
  const confirm = useConfirm();

  useEffect(() => {
    fetchProjects();
  }, [showDeleted]);

  const fetchProjects = async () => {
    try {
      const res = await API.get(`/admin/projects?includeDeleted=${showDeleted}`);
      setProjects(res.data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleSoftDelete = async (id) => {
    const confirmed = await confirm({
      title: "Move to Trash",
      message: "Are you sure you want to move this project to trash? You can restore it later.",
      type: "warning"
    });
    if (!confirmed) return;
    try {
      await API.delete(`/admin/projects/${id}`);
      fetchProjects();
      toast.success("Project moved to trash");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete project");
    }
  };

  const handleRestore = async (id) => {
    const confirmed = await confirm({
      title: "Restore Project",
      message: "Are you sure you want to restore this project? It will be visible on the website again.",
      type: "info"
    });
    if (!confirmed) return;
    try {
      await API.put(`/admin/projects/${id}/restore`);
      fetchProjects();
      toast.success("Project restored successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to restore project");
    }
  };

  const handlePermanentDelete = async (id) => {
    const confirmed = await confirm({
      title: "Permanent Delete",
      message: "⚠️ This action cannot be undone! The project will be permanently deleted from the system forever.",
      type: "danger"
    });
    if (!confirmed) return;
    try {
      await API.delete(`/admin/projects/${id}/permanent`);
      fetchProjects();
      toast.success("Project permanently deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete project");
    }
  };

  // Filter projects based on tab and search
  const filteredProjects = Array.isArray(projects) ? projects.filter(p => {
    const matchesSearch = searchQuery === "" || 
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = filterSector === "" || p.sector === filterSector;
    return matchesSearch && matchesSector;
  }) : [];

  const cardProjects = filteredProjects.filter(p => p.projectType === "PROJECT CARD");
  const tableProjects = filteredProjects.filter(p => p.projectType === "PROJECT LIST" || (p.serialNumber || p.area || p.file));

  // Stats
  const activeCards = cardProjects.filter(p => p.isActive && !p.isDeleted).length;
  const activeList = tableProjects.filter(p => p.isActive && !p.isDeleted).length;
  const totalDeleted = projects.filter(p => p.isDeleted).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      {/* MODERN HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 mb-6 text-white shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Project Management</h1>
            <p className="text-blue-100">Manage your project cards and list entries</p>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <input
              type="checkbox"
              id="showDeleted"
              checked={showDeleted}
              onChange={(e) => setShowDeleted(e.target.checked)}
              className="w-4 h-4 rounded border-white/30 bg-white/20 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="showDeleted" className="text-sm text-white cursor-pointer select-none">
              Show Deleted ({totalDeleted})
            </label>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <LayoutGrid size={20} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeCards}</p>
                <p className="text-sm text-blue-200">Active Cards</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <List size={20} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeList}</p>
                <p className="text-sm text-blue-200">List Entries</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <CheckCircle2 size={20} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeCards + activeList}</p>
                <p className="text-sm text-blue-200">Total Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTROLS BAR */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* TABS */}
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("cards")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all ${
                activeTab === "cards"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <LayoutGrid size={16} />
              Cards
              <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                activeTab === "cards" ? "bg-blue-100" : "bg-slate-200"
              }`}>
                {cardProjects.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("table")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all ${
                activeTab === "table"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <List size={16} />
              List
              <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                activeTab === "table" ? "bg-blue-100" : "bg-slate-200"
              }`}>
                {tableProjects.length}
              </span>
            </button>
          </div>

          {/* SEARCH & FILTER */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterSector}
              onChange={(e) => setFilterSector(e.target.value)}
              className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Sectors</option>
              <option value="ENGINEERING">Engineering</option>
              <option value="SURVEYING">Surveying</option>
              <option value="PLANNING">Planning</option>
            </select>
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={() => navigate(`/admin/projects/add-${activeTab === "cards" ? "card" : "list"}`)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm hover:shadow transition-all"
          >
            <Plus size={18} />
            {activeTab === "cards" ? "Add Card" : "Add Entry"}
          </button>
        </div>
      </div>

      {/* ========== CARDS TAB ========== */}
      {activeTab === "cards" && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[20%]">
                  <div className="flex items-center gap-2">
                    <ImageIcon size={14} />
                    Image
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[25%]">
                  Project Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[30%]">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    Location
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider w-[15%]">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider w-[10%]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cardProjects.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center text-slate-400">
                      <ImageIcon size={48} className="mb-3 opacity-50" />
                      <p className="text-lg font-medium text-slate-600">No project cards found</p>
                      <p className="text-sm">Click "Add Card" to create your first project card</p>
                    </div>
                  </td>
                </tr>
              )}

              {cardProjects.map((item) => (
                <tr
                  key={item._id}
                  className={`hover:bg-slate-50 transition-colors group ${
                    item.isDeleted ? "bg-red-50/50" : ""
                  } ${!item.isActive && !item.isDeleted ? "bg-amber-50/30" : ""}`}
                >
                  {/* IMAGE */}
                  <td className="px-6 py-4">
                    <div className="relative">
                      <img
                        src={item.image ? `http://localhost:5000${item.image}` : 'https://via.placeholder.com/150?text=No+Image'}
                        alt={item.title}
                        className="w-28 h-20 object-cover rounded-xl border border-slate-200 shadow-sm group-hover:shadow-md transition-shadow"
                      />
                      {item.isDeleted && (
                        <div className="absolute inset-0 bg-red-500/20 rounded-xl flex items-center justify-center">
                          <XCircle size={24} className="text-red-600" />
                        </div>
                      )}
                    </div>
                  </td>

                  {/* TITLE */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 text-base">{item.title}</span>
                      <div className="flex gap-1.5 mt-2">
                        {item.sector && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {item.sector}
                          </span>
                        )}
                        {item.subCategory && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {item.subCategory}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* LOCATION */}
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-600 line-clamp-2">{item.location || "—"}</span>
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4 text-center">
                    {item.isDeleted ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircle size={12} />
                        Deleted
                      </span>
                    ) : !item.isActive ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        <AlertCircle size={12} />
                        Inactive
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle2 size={12} />
                        Active
                      </span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setPreview(item)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Preview"
                      >
                        <Eye size={18} />
                      </button>

                      {!item.isDeleted ? (
                        <>
                          <button
                            onClick={() => navigate(`/admin/projects/edit-card/${item._id}`)}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleSoftDelete(item._id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Move to Trash"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleRestore(item._id)}
                            className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Restore"
                          >
                            <RotateCcw size={18} />
                          </button>
                          <button
                            onClick={() => handlePermanentDelete(item._id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Forever"
                          >
                            <Trash size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ========== TABLE/LIST TAB ========== */}
      {activeTab === "table" && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[8%]">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[28%]">
                  Project Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[25%]">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    Location
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[12%]">
                  Area
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider w-[10%]">
                  File
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider w-[12%]">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider w-[5%]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableProjects.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center text-slate-400">
                      <List size={48} className="mb-3 opacity-50" />
                      <p className="text-lg font-medium text-slate-600">No list entries found</p>
                      <p className="text-sm">Click "Add Entry" to create your first table entry</p>
                    </div>
                  </td>
                </tr>
              )}

              {tableProjects.map((item) => (
                <tr
                  key={item._id}
                  className={`hover:bg-slate-50 transition-colors group ${
                    item.isDeleted ? "bg-red-50/50" : ""
                  } ${!item.isActive && !item.isDeleted ? "bg-amber-50/30" : ""}`}
                >
                  {/* SERIAL NUMBER */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-semibold text-sm">
                      {item.serialNumber || "—"}
                    </span>
                  </td>

                  {/* PROJECT NAME */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image ? `http://localhost:5000${item.image}` : 'https://via.placeholder.com/150?text=No+Image'}
                        alt={item.title}
                        className="w-12 h-10 object-cover rounded-lg border border-slate-200"
                      />
                      <div>
                        <span className="font-semibold text-slate-900 text-sm">{item.title}</span>
                        <div className="flex gap-1 mt-1">
                          {item.sector && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {item.sector}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* LOCATION */}
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="text-slate-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-600 line-clamp-2">{item.location || "—"}</span>
                    </div>
                  </td>

                  {/* AREA */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium">
                      {item.area || "—"}
                    </span>
                  </td>

                  {/* FILE */}
                  <td className="px-6 py-4 text-center">
                    {item.file ? (
                      <a
                        href={item.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Download size={14} />
                        Download
                      </a>
                    ) : (
                      <span className="text-slate-300 text-sm">—</span>
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4 text-center">
                    {item.isDeleted ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircle size={12} />
                        Deleted
                      </span>
                    ) : !item.isActive ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        <AlertCircle size={12} />
                        Inactive
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle2 size={12} />
                        Active
                      </span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setPreview(item)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Preview"
                      >
                        <Eye size={18} />
                      </button>

                      {!item.isDeleted ? (
                        <>
                          <button
                            onClick={() => navigate(`/admin/projects/edit-list/${item._id}`)}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleSoftDelete(item._id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Move to Trash"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleRestore(item._id)}
                            className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Restore"
                          >
                            <RotateCcw size={18} />
                          </button>
                          <button
                            onClick={() => handlePermanentDelete(item._id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Forever"
                          >
                            <Trash size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* LEGEND */}
      <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-green-100 border border-green-200 flex items-center justify-center">
            <CheckCircle2 size={10} className="text-green-600" />
          </span>
          <span className="text-slate-600">Active</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-amber-100 border border-amber-200 flex items-center justify-center">
            <AlertCircle size={10} className="text-amber-600" />
          </span>
          <span className="text-slate-600">Inactive</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-red-100 border border-red-200 flex items-center justify-center">
            <XCircle size={10} className="text-red-600" />
          </span>
          <span className="text-slate-600">Deleted</span>
        </span>
      </div>

      {/* PREVIEW MODAL */}
      {preview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* IMAGE */}
            <div className="relative">
              <img
                src={preview.image ? `http://localhost:5000${preview.image}` : 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={preview.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setPreview(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              {preview.isDeleted && (
                <div className="absolute inset-0 bg-red-500/30 flex items-center justify-center">
                  <div className="bg-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <XCircle size={18} className="text-red-600" />
                    <span className="font-semibold text-red-600">Deleted</span>
                  </div>
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{preview.title}</h2>

              <div className="space-y-3">
                {preview.location && (
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-slate-400 mt-0.5 shrink-0" />
                    <span className="text-slate-600">{preview.location}</span>
                  </div>
                )}

                {preview.serialNumber > 0 && (
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-700">
                      {preview.serialNumber}
                    </span>
                    <span className="text-slate-500 text-sm">Serial Number</span>
                  </div>
                )}

                {preview.area && (
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-slate-100 rounded-lg text-sm font-medium text-slate-700">
                      {preview.area}
                    </span>
                    <span className="text-slate-500 text-sm">Area</span>
                  </div>
                )}
              </div>

              {/* SECTOR BADGES */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex flex-wrap gap-2">
                  {preview.sector && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {preview.sector}
                    </span>
                  )}
                  {preview.subCategory && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      {preview.subCategory}
                    </span>
                  )}
                  {preview.projectType && preview.projectType !== "PROJECT CARD" && preview.projectType !== "PROJECT LIST" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700">
                      {preview.projectType}
                    </span>
                  )}
                </div>
              </div>

              {/* FILE DOWNLOAD */}
              {preview.file && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <a
                    href={preview.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <Download size={18} />
                    Download File
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectManagement;
