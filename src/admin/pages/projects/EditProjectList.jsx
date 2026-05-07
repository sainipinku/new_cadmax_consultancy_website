import { ArrowLeft, Upload, FileText, X, Download } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../../api/axios";

const SECTORS = [
  { value: "", label: "Select Sector" },
  { value: "ENGINEERING", label: "Engineering" },
  { value: "SURVEYING", label: "Surveying" },
  { value: "PLANNING", label: "Planning" },
];

const SUB_CATEGORIES = [
  { value: "", label: "No Sub Category" },
  { value: "TRANSPORTATION", label: "Transportation" },
  { value: "WATER INFLUENCE", label: "Water Influence" },
  { value: "ENERGY SECTOR", label: "Energy Sector" },
  { value: "IRRIGATION SECTOR", label: "Irrigation Sector" },
  { value: "CITY SURVEY SECTOR", label: "City Survey Sector" },
  { value: "REAL ESTATE SECTOR", label: "Real Estate Sector" },
];

const CATEGORIES = [
  { value: "MANORATE AND BOUNDARY CONSTRUCTION", label: "Manorate and Boundary Construction" },
  { value: "ROAD NETWORK", label: "Road Network" },
  { value: "WATER SUPPLY", label: "Water Supply" },
  { value: "ELECTRICITY", label: "Electricity" },
  { value: "MEP PROJECTS", label: "MEP Projects" },
  { value: "INFRASTRUCTURE", label: "Infrastructure" },
  { value: "RESIDENTIAL", label: "Residential" },
  { value: "COMMERCIAL", label: "Commercial" },
  { value: "INDUSTRIAL", label: "Industrial" },
];

const EditProjectList = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    category: "",
    sector: "",
    subCategory: "",
    location: "",
    area: "",
    serialNumber: "",
    description: "",
    isActive: true,
  });

  const [currentImage, setCurrentImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [currentFile, setCurrentFile] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line
  }, []);

  const fetchProject = async () => {
    try {
      const res = await API.get(`/projects`);
      const project = res.data.find((p) => p._id === id);

      if (!project) {
        alert("Project not found");
        return navigate("/admin/projects");
      }

      setForm({
        title: project.title,
        sector: project.sector || "",
        subCategory: project.subCategory || "",
        location: project.location || "",
        area: project.area || "",
        serialNumber: project.serialNumber || "",
        isActive: project.isActive !== false,
      });

      setCurrentImage(project.image);
      setCurrentFile(project.file || "");
    } catch (err) {
      console.error(err);
      alert("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", "PROJECT LIST");
    formData.append("sector", form.sector);
    formData.append("subCategory", form.subCategory);
    formData.append("location", form.location);
    formData.append("area", form.area);
    formData.append("serialNumber", form.serialNumber);
    formData.append("isActive", form.isActive);

    if (newImage) formData.append("image", newImage);
    if (newFile) formData.append("file", newFile);

    try {
      await API.put(`/projects/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Project list entry updated successfully");
      navigate("/admin/projects");
    } catch (err) {
      console.error(err);
      alert("Failed to update project list entry");
    }
  };

  if (loading) return <p>Loading project...</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Edit Project List Entry</h1>
          <p className="text-sm text-slate-500">Update table row entry</p>
        </div>
        <button onClick={() => navigate("/admin/projects")} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SERIAL NUMBER & TITLE */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Serial Number *</label>
              <input type="number" name="serialNumber" value={form.serialNumber} onChange={handleChange} className="w-full rounded-lg border px-4 py-2.5" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Project Name *</label>
              <input name="title" value={form.title} onChange={handleChange} className="w-full rounded-lg border px-4 py-2.5" required />
            </div>
          </div>

          {/* LOCATION */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location *</label>
            <input name="location" value={form.location} onChange={handleChange} className="w-full rounded-lg border px-4 py-2.5" required />
          </div>

          {/* AREA */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Area *</label>
            <input name="area" value={form.area} onChange={handleChange} placeholder="e.g., More than 10.0 Hect." className="w-full rounded-lg border px-4 py-2.5" required />
          </div>

          {/* SECTOR & SUB CATEGORY */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sector *</label>
              <select name="sector" value={form.sector} onChange={handleChange} className="w-full rounded-lg border px-4 py-2.5" required>
                {SECTORS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sub Category</label>
              <select name="subCategory" value={form.subCategory} onChange={handleChange} className="w-full rounded-lg border px-4 py-2.5">
                {SUB_CATEGORIES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-lg border px-4 py-2.5" required>
              <option value="">Select Category</option>
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          {/* CURRENT IMAGE */}
          {currentImage && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Image</label>
              <img src={currentImage} alt="Project" className="w-32 h-24 object-cover rounded border" />
            </div>
          )}

          {/* REPLACE IMAGE */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Replace Image</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-slate-50">
              {newImage ? (
                <img src={URL.createObjectURL(newImage)} alt="New" className="w-32 h-24 object-cover rounded" />
              ) : (
                <>
                  <Upload size={24} className="text-slate-400" />
                  <span className="text-sm text-slate-500 mt-1">Click to replace image</span>
                </>
              )}
              <input type="file" hidden accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} />
            </label>
          </div>

          {/* CURRENT FILE */}
          {currentFile && (
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded border">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-slate-500" />
                <span className="text-sm">Current file attached</span>
              </div>
              <a href={currentFile} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 text-sm hover:underline">
                <Download size={16} /> Download
              </a>
            </div>
          )}

          {/* REPLACE FILE */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Replace File (Optional)</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-slate-50">
              <FileText />
              <span className="text-sm mt-2">{newFile ? newFile.name : currentFile ? "Replace File" : "Upload File (Optional)"}</span>
              {currentFile && (
                <button
                  type="button"
                  onClick={() => { setCurrentFile(""); setNewFile(null); }}
                  className="text-xs text-red-600 mt-1 flex items-center gap-1"
                >
                  <X size={12} /> Remove current file
                </button>
              )}
              <input type="file" hidden accept=".pdf,.doc,.docx" onChange={(e) => setNewFile(e.target.files[0])} />
            </label>
          </div>

          {/* ACTIVE STATUS */}
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4" />
            <span className="text-sm text-slate-700">Active</span>
          </label>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <button type="button" onClick={() => navigate("/admin/projects")} className="px-5 py-2.5 border rounded-lg hover:bg-slate-50">Cancel</button>
            <button type="submit" className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700">Update Entry</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectList;
