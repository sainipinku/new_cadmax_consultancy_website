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
  Image as ImageIcon,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import API, { resolveFileUrl } from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../components/Toast/Toast";
import { useConfirm } from "../../../components/ConfirmModal/ConfirmModal";

const noImageSmall = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23f3f4f6'/%3E%3Cg transform='translate(25,25)'%3E%3Crect x='20' y='20' width='100' height='70' rx='6' fill='%23d1d5db' stroke='%239ca3af' stroke-width='2'/%3E%3Ccircle cx='50' cy='45' r='10' fill='%239ca3af'/%3E%3Crect x='30' y='60' width='80' height='20' rx='3' fill='%239ca3af'/%3E%3C/g%3E%3Ctext x='75' y='125' font-family='Arial,sans-serif' font-size='14' fill='%239ca3af' text-anchor='middle' font-weight='bold'%3ENo Image%3C/text%3E%3C/svg%3E";
const noImageMedium = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Cg transform='translate(125,80)'%3E%3Crect x='20' y='20' width='150' height='100' rx='8' fill='%23d1d5db' stroke='%239ca3af' stroke-width='2'/%3E%3Ccircle cx='70' cy='55' r='14' fill='%239ca3af'/%3E%3Crect x='40' y='80' width='110' height='25' rx='4' fill='%239ca3af'/%3E%3C/g%3E%3Ctext x='200' y='230' font-family='Arial,sans-serif' font-size='18' fill='%239ca3af' text-anchor='middle' font-weight='bold'%3ENo Image%3C/text%3E%3C/svg%3E";

const Pagination = ({ totalPages, page, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }
  for (let i = start; i <= end; i++) pages.push(i);
  return (
    <div className="flex items-center justify-center gap-1.5 py-4 px-4 flex-wrap">
      <button onClick={() => onPageChange(1)} disabled={page === 1}
        className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">First</button>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}
        className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Prev</button>
      {start > 1 && <span className="px-1.5 text-slate-400 text-xs">...</span>}
      {pages.map(p => (
        <button key={p} onClick={() => onPageChange(p)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
            p === page ? "bg-blue-600 text-white border-blue-600" : "border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}>{p}</button>
      ))}
      {end < totalPages && <span className="px-1.5 text-slate-400 text-xs">...</span>}
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}
        className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Next</button>
      <button onClick={() => onPageChange(totalPages)} disabled={page === totalPages}
        className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Last</button>
    </div>
  );
};

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false);
  const [activeTab, setActiveTab] = useState("cards");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSector, setFilterSector] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const toast = useToast();
  const confirm = useConfirm();

  useEffect(() => { fetchProjects(); }, [showDeleted]);

  const fetchProjects = async () => {
    try {
      const res = await API.get(`/projects/admin/all?includeDeleted=${showDeleted}`);
      setProjects(res.data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load projects");
    } finally { setLoading(false); }
  };

  const handleSoftDelete = async (id) => {
    const confirmed = await confirm({ title: "Move to Trash", message: "Are you sure you want to move this project to trash? You can restore it later.", type: "warning" });
    if (!confirmed) return;
    try { await API.delete(`/projects/${id}`); fetchProjects(); toast.success("Project moved to trash"); }
    catch (err) { console.error(err); toast.error("Failed to delete project"); }
  };

  const handleRestore = async (id) => {
    const confirmed = await confirm({ title: "Restore Project", message: "Are you sure you want to restore this project? It will be visible on the website again.", type: "info" });
    if (!confirmed) return;
    try { await API.put(`/projects/${id}/restore`); fetchProjects(); toast.success("Project restored successfully"); }
    catch (err) { console.error(err); toast.error("Failed to restore project"); }
  };

  const handlePermanentDelete = async (id) => {
    const confirmed = await confirm({ title: "Permanent Delete", message: "⚠️ This action cannot be undone! The project will be permanently deleted from the system forever.", type: "danger" });
    if (!confirmed) return;
    try { await API.delete(`/projects/${id}/permanent`); fetchProjects(); toast.success("Project permanently deleted"); }
    catch (err) { console.error(err); toast.error("Failed to delete project"); }
  };

  const filteredProjects = Array.isArray(projects) ? projects.filter(p => {
    const matchesSearch = searchQuery === "" || 
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = filterSector === "" || p.sector === filterSector;
    return matchesSearch && matchesSector;
  }) : [];

  useEffect(() => { setCurrentPage(1); }, [searchQuery, filterSector, activeTab]);

  const cardProjects = filteredProjects.filter(p => p.projectType === "PROJECT CARD");
  const tableProjects = filteredProjects.filter(p => p.projectType === "PROJECT LIST" || (p.serialNumber || p.area || p.file));

  const totalCardPages = Math.ceil(cardProjects.length / itemsPerPage);
  const paginatedCards = cardProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalTablePages = Math.ceil(tableProjects.length / itemsPerPage);
  const paginatedTables = tableProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 mb-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Project Management</h1>
            <p className="text-blue-100 text-sm">Manage your project cards and list entries</p>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <input type="checkbox" id="showDeleted" checked={showDeleted}
              onChange={(e) => setShowDeleted(e.target.checked)}
              className="w-4 h-4 rounded border-white/30 bg-white/20 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="showDeleted" className="text-sm text-white cursor-pointer select-none whitespace-nowrap">
              Show Deleted ({totalDeleted})
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg"><LayoutGrid size={20} className="text-white" /></div>
              <div><p className="text-2xl font-bold">{activeCards}</p><p className="text-sm text-blue-200">Active Cards</p></div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg"><List size={20} className="text-white" /></div>
              <div><p className="text-2xl font-bold">{activeList}</p><p className="text-sm text-blue-200">List Entries</p></div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg"><CheckCircle2 size={20} className="text-white" /></div>
              <div><p className="text-2xl font-bold">{activeCards + activeList}</p><p className="text-sm text-blue-200">Total Active</p></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button onClick={() => setActiveTab("cards")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all ${
                activeTab === "cards" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}>
              <LayoutGrid size={16} /> Cards
              <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${activeTab === "cards" ? "bg-blue-100" : "bg-slate-200"}`}>{cardProjects.length}</span>
            </button>
            <button onClick={() => setActiveTab("table")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all ${
                activeTab === "table" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}>
              <List size={16} /> List
              <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${activeTab === "table" ? "bg-blue-100" : "bg-slate-200"}`}>{tableProjects.length}</span>
            </button>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search projects..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg text-sm w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <select value={filterSector} onChange={(e) => setFilterSector(e.target.value)}
              className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Sectors</option>
              <option value="ENGINEERING">Engineering</option>
              <option value="SURVEYING">Surveying</option>
              <option value="PLANNING">Planning</option>
            </select>
          </div>
          <button onClick={() => navigate(`/admin/projects/add-${activeTab === "cards" ? "card" : "list"}`)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm hover:shadow transition-all">
            <Plus size={18} /> {activeTab === "cards" ? "Add Card" : "Add Entry"}
          </button>
        </div>
      </div>

      {activeTab === "cards" && (
        <>
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><div className="flex items-center gap-2"><ImageIcon size={14} />Image</div></th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Project Name</th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell"><div className="flex items-center gap-2"><MapPin size={14} />Location</div></th>
                    <th className="px-4 md:px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                    <th className="px-4 md:px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedCards.length === 0 && (
                    <tr><td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center text-slate-400">
                        <ImageIcon size={48} className="mb-3 opacity-50" />
                        <p className="text-lg font-medium text-slate-600">{cardProjects.length === 0 ? "No project cards found" : "No results on this page"}</p>
                        <p className="text-sm">{cardProjects.length === 0 ? 'Click "Add Card" to create your first project card' : ""}</p>
                      </div>
                    </td></tr>
                  )}
              {paginatedCards.map((item) => (
                    <tr key={item._id}
                      className={`hover:bg-slate-50 transition-colors group ${item.isDeleted ? "bg-red-50/50" : ""} ${!item.isActive && !item.isDeleted ? "bg-amber-50/30" : ""}`}>
                      <td className="px-4 md:px-6 py-4 w-[20%] min-w-[120px]">
                        <div className="relative">
                          <img src={item.image ? resolveFileUrl(item.image?.url || item.image) : noImageSmall} alt={item.title}
                            className="w-full max-w-[120px] h-16 md:h-20 object-cover rounded-xl border border-slate-200 shadow-sm group-hover:shadow-md transition-shadow" />
                          {item.isDeleted && <div className="absolute inset-0 bg-red-500/20 rounded-xl flex items-center justify-center"><XCircle size={24} className="text-red-600" /></div>}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 max-w-[200px]">
                        <p className="font-semibold text-slate-900 text-sm md:text-base truncate" title={item.title}>{item.title}</p>
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          {item.sector && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{item.sector}</span>}
                          {item.subCategory && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">{item.subCategory}</span>}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 hidden sm:table-cell max-w-[200px]"><p className="text-sm text-slate-600 truncate" title={item.location || "—"}>{item.location || "—"}</p></td>
                      <td className="px-4 md:px-6 py-4 text-center">
                        {item.isDeleted ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle size={12} />Deleted</span>
                          : !item.isActive ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><AlertCircle size={12} />Inactive</span>
                          : <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle2 size={12} />Active</span>}
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => setPreview(item)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Preview"><Eye size={18} /></button>
                          {!item.isDeleted ? (
                            <>
                              <button onClick={() => navigate(`/admin/projects/edit-card/${item._id}`)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit"><Pencil size={18} /></button>
                              <button onClick={() => handleSoftDelete(item._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Move to Trash"><Trash2 size={18} /></button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => handleRestore(item._id)} className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Restore"><RotateCcw size={18} /></button>
                              <button onClick={() => handlePermanentDelete(item._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Forever"><Trash size={18} /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination totalPages={totalCardPages} page={currentPage} onPageChange={setCurrentPage} />
        </>
      )}

      {activeTab === "table" && (
        <>
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[5%]">#</th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[30%]">Project Name</th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[25%]">Location</th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[15%]">Area</th>
                    <th className="px-4 md:px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider w-[12%]">Status</th>
                    <th className="px-4 md:px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider w-[13%]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedTables.length === 0 && (
                    <tr><td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center text-slate-400">
                        <List size={48} className="mb-3 opacity-50" />
                        <p className="text-lg font-medium text-slate-600">{tableProjects.length === 0 ? "No list entries found" : "No results on this page"}</p>
                        <p className="text-sm">{tableProjects.length === 0 ? 'Click "Add Entry" to create your first table entry' : ""}</p>
                      </div>
                    </td></tr>
                  )}
                  {paginatedTables.map((item) => (
                    <tr key={item._id}
                      className={`hover:bg-slate-50 transition-colors group ${item.isDeleted ? "bg-red-50/50" : ""} ${!item.isActive && !item.isDeleted ? "bg-amber-50/30" : ""}`}>
                      <td className="px-4 md:px-6 py-4 w-[5%]">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-semibold text-sm">{item.serialNumber || "—"}</span>
                      </td>
                      <td className="px-4 md:px-6 py-4 max-w-[220px] w-[25%]">
                        <div className="flex items-center gap-3">
                          <img src={item.image ? resolveFileUrl(item.image?.url || item.image) : noImageSmall} alt={item.title}
                            className="w-10 h-8 object-cover rounded-lg border border-slate-200 shrink-0" />
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 text-sm truncate" title={item.title}>{item.title}</p>
                            {item.sector && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">{item.sector}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 max-w-[180px] w-[20%]"><p className="text-sm text-slate-600 truncate" title={item.location || "—"}>{item.location || "—"}</p></td>
                      <td className="px-4 md:px-6 py-4 w-[15%]"><span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium whitespace-nowrap">{item.area || "—"}</span></td>
                      <td className="px-4 md:px-6 py-4 text-center">
                        {item.isDeleted ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle size={12} />Deleted</span>
                          : !item.isActive ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><AlertCircle size={12} />Inactive</span>
                          : <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle2 size={12} />Active</span>}
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => setPreview(item)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Preview"><Eye size={18} /></button>
                          {!item.isDeleted ? (
                            <>
                              <button onClick={() => navigate(`/admin/projects/edit-list/${item._id}`)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit"><Pencil size={18} /></button>
                              <button onClick={() => handleSoftDelete(item._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Move to Trash"><Trash2 size={18} /></button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => handleRestore(item._id)} className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Restore"><RotateCcw size={18} /></button>
                              <button onClick={() => handlePermanentDelete(item._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Forever"><Trash size={18} /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination totalPages={totalTablePages} page={currentPage} onPageChange={setCurrentPage} />
        </>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
        <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-green-100 border border-green-200 flex items-center justify-center"><CheckCircle2 size={10} className="text-green-600" /></span><span className="text-slate-600">Active</span></span>
        <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-amber-100 border border-amber-200 flex items-center justify-center"><AlertCircle size={10} className="text-amber-600" /></span><span className="text-slate-600">Inactive</span></span>
        <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-red-100 border border-red-200 flex items-center justify-center"><XCircle size={10} className="text-red-600" /></span><span className="text-slate-600">Deleted</span></span>
      </div>

      {preview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setPreview(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img src={preview.image ? resolveFileUrl(preview.image?.url || preview.image) : noImageMedium} alt={preview.title} className="w-full h-56 md:h-64 object-cover" />
              <button onClick={() => setPreview(null)} className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"><X size={20} /></button>
              {preview.isDeleted && <div className="absolute inset-0 bg-red-500/30 flex items-center justify-center"><div className="bg-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"><XCircle size={18} className="text-red-600" /><span className="font-semibold text-red-600">Deleted</span></div></div>}
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{preview.title}</h2>
              {preview.location && <div className="flex items-start gap-3 mb-3"><MapPin size={20} className="text-slate-400 mt-0.5 shrink-0" /><span className="text-slate-600">{preview.location}</span></div>}
              {preview.area && <div className="flex items-center gap-3 mb-3"><span className="px-3 py-1 bg-slate-100 rounded-lg text-sm font-medium text-slate-700">{preview.area}</span><span className="text-slate-500 text-sm">Area</span></div>}
              {preview.sector && <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-2">{preview.sector}</span>}
              {preview.subCategory && <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">{preview.subCategory}</span>}
              {preview.file && <div className="mt-4 pt-4 border-t border-slate-100"><a href={resolveFileUrl(preview.file?.url || preview.file)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors"><Download size={18} />Download File</a></div>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectManagement;