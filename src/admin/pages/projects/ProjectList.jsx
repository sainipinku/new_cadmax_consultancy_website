import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Eye, X, Download, RotateCcw, Trash } from "lucide-react";
import API from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../components/Toast/Toast";
import { useConfirm } from "../../../components/ConfirmModal/ConfirmModal";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const confirm = useConfirm();

  useEffect(() => {
    fetchProjects();
  }, [showDeleted]);

  const fetchProjects = async () => {
    try {
      const res = await API.get(`/projects/admin/all?includeDeleted=${showDeleted}`);
      setProjects(res.data || []);
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
      await API.delete(`/projects/${id}`);
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
      await API.put(`/projects/${id}/restore`);
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
      await API.delete(`/projects/${id}/permanent`);
      fetchProjects();
      toast.success("Project permanently deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete project");
    }
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Project List</h1>
          <p className="text-sm text-slate-500">Manage all website projects</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showDeleted}
              onChange={(e) => setShowDeleted(e.target.checked)}
              className="w-4 h-4"
            />
            Show Deleted
          </label>
          <button
            onClick={() => navigate("/admin/projects/add")}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg"
          >
            <Plus size={16} />
            Add Project
          </button>
        </div>
      </div>

      {/* PROFESSIONAL TABLE */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="p-4 text-left w-[8%]">No.</th>
              <th className="p-4 text-left w-[30%]">Project Name</th>
              <th className="p-4 text-left w-[30%]">Location</th>
              <th className="p-4 text-left w-[15%]">Area</th>
              <th className="p-4 text-left w-[12%]">File</th>
              <th className="p-4 text-center w-[5%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-slate-500">
                  No projects found
                </td>
              </tr>
            )}

            {projects.map((item, index) => (
              <tr
                key={item._id}
                className={`border-t align-middle hover:bg-slate-50 ${
                  item.isDeleted ? "bg-red-50 opacity-70" : ""
                } ${!item.isActive && !item.isDeleted ? "bg-yellow-50" : ""}`}
              >
                {/* SERIAL NUMBER */}
                <td className="p-4 text-slate-600">
                  {item.serialNumber || index + 1}.
                </td>

                {/* PROJECT NAME */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image?.url || item.image}
                      alt={item.title}
                      className="w-16 h-12 object-cover rounded border"
                    />
                    <div>
                      <p className="font-semibold text-slate-800">{item.title}</p>
                      <div className="flex gap-1 mt-1">
                        {item.sector && (
                          <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">
                            {item.sector}
                          </span>
                        )}
                        {item.subCategory && (
                          <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded">
                            {item.subCategory}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                {/* LOCATION */}
                <td className="p-4 text-slate-600 text-sm">
                  {item.location || "—"}
                </td>

                {/* AREA */}
                <td className="p-4 text-slate-600 text-sm">
                  {item.area || "—"}
                </td>

                {/* FILE DOWNLOAD */}
                <td className="p-4">
                  {item.file ? (
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 border border-red-600 rounded hover:bg-red-50"
                    >
                      <Download size={12} />
                      DOWNLOAD
                    </a>
                  ) : (
                    <span className="text-slate-400 text-sm">—</span>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setPreview(item)}
                      title="Preview"
                      className="text-slate-500 hover:text-blue-600"
                    >
                      <Eye size={16} />
                    </button>

                    {!item.isDeleted ? (
                      <>
                        <button
                          onClick={() => navigate(`/admin/projects/edit/${item._id}`)}
                          title="Edit"
                          className="text-slate-500 hover:text-blue-600"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleSoftDelete(item._id)}
                          title="Move to Trash"
                          className="text-slate-500 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleRestore(item._id)}
                          title="Restore"
                          className="text-slate-500 hover:text-green-600"
                        >
                          <RotateCcw size={16} />
                        </button>
                        <button
                          onClick={() => handlePermanentDelete(item._id)}
                          title="Delete Forever"
                          className="text-slate-500 hover:text-red-600"
                        >
                          <Trash size={16} />
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

      {/* LEGEND */}
      <div className="mt-4 flex gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-yellow-50 border rounded"></span> Inactive
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-red-50 border rounded"></span> Deleted (Trash)
        </span>
      </div>

      {/* PREVIEW MODAL */}
      {preview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 relative">
            <button
              onClick={() => setPreview(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-black"
            >
              <X />
            </button>

            <img
              src={preview.image?.url || preview.image}
              alt={preview.title}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />

            <h2 className="text-xl font-semibold">{preview.title}</h2>

            {preview.location && (
              <p className="text-sm text-gray-600 mt-2">📍 {preview.location}</p>
            )}
            {preview.area && (
              <p className="text-sm text-gray-600 mt-1">� Area: {preview.area}</p>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {preview.sector && (
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                  {preview.sector}
                </span>
              )}
              {preview.subCategory && (
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                  {preview.subCategory}
                </span>
              )}
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                {preview.category}
              </span>
            </div>

            {preview.file && (
              <a
                href={preview.file}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded hover:bg-red-50"
              >
                <Download size={16} />
                Download File
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectList;
