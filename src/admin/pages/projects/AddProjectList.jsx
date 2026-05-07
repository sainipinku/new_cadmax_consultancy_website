import { ArrowLeft, Upload, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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


const AddProjectList = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    sector: "",
    subCategory: "",
    location: "",
    area: "",
    isActive: true,
  });

  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("projectType", "PROJECT LIST"); // Internal project type for list
    formData.append("sector", form.sector);
    formData.append("subCategory", form.subCategory);
    formData.append("location", form.location);
    formData.append("area", form.area);
    formData.append("isActive", form.isActive);
    if (image) formData.append("image", image);
    if (file) formData.append("file", file);

    try {
      setLoading(true);
      await API.post("/admin/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Project list entry added successfully");
      navigate("/admin/projects");
    } catch (err) {
      console.error(err);
      alert("Failed to add project list entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Add Project List Entry</h1>
          <p className="text-sm text-slate-500">Create a table row entry with serial number, location, area and file</p>
        </div>
        <button onClick={() => navigate("/admin/projects")} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PROJECT NAME */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project Name *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., Padam Vatika"
              className="w-full rounded-lg border px-4 py-2.5"
              required
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location *</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g., Tonk road jaipur, client shree ram group"
              className="w-full rounded-lg border px-4 py-2.5"
              required
            />
          </div>

          {/* AREA */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Area *</label>
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              placeholder="e.g., More than 10.0 Hect., 10.0 Hect."
              className="w-full rounded-lg border px-4 py-2.5"
              required
            />
          </div>

          {/* SECTOR & SUB CATEGORY */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sector *</label>
              <select name="sector" value={form.sector} onChange={handleChange} className="w-full rounded-lg border px-4 py-2.5" required>
                {SECTORS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              <p className="text-xs text-slate-400 mt-1">For page filtering</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sub Category</label>
              <select name="subCategory" value={form.subCategory} onChange={handleChange} className="w-full rounded-lg border px-4 py-2.5">
                {SUB_CATEGORIES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              <p className="text-xs text-slate-400 mt-1">For Surveying sub-pages</p>
            </div>
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project Image *</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-slate-50">
              {image ? (
                <img src={URL.createObjectURL(image)} alt="Preview" className="w-32 h-24 object-cover rounded" />
              ) : (
                <>
                  <Upload size={24} className="text-slate-400" />
                  <span className="text-sm text-slate-500 mt-1">Click to upload image</span>
                </>
              )}
              <input type="file" hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            </label>
          </div>

          {/* FILE UPLOAD */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">File (PDF/DOC) - Optional</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-slate-50">
              <FileText size={24} className="text-slate-400" />
              <span className="text-sm text-slate-500 mt-1">
                {file ? file.name : "Click to upload file (optional)"}
              </span>
              <input type="file" hidden accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} />
            </label>
          </div>

          {/* ACTIVE STATUS */}
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4" />
            <span className="text-sm text-slate-700">Active (Show on website)</span>
          </label>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <button type="button" onClick={() => navigate("/admin/projects")} className="px-5 py-2.5 border rounded-lg hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">
              {loading ? "Saving..." : "Add to List"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectList;
