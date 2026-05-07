import { ArrowLeft, Upload } from "lucide-react";
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


const AddProjectCard = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    sector: "",
    subCategory: "",
    location: "",
    isActive: true,
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("projectType", "PROJECT CARD"); // Internal project type for cards
    formData.append("sector", form.sector);
    formData.append("subCategory", form.subCategory);
    formData.append("location", form.location);
    formData.append("isActive", form.isActive);
    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      await API.post("/admin/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Project card added successfully");
      navigate("/admin/projects");
    } catch (err) {
      console.error(err);
      alert("Failed to add project card");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Add Project Card</h1>
          <p className="text-sm text-slate-500">Create a project card with image, title and address</p>
        </div>
        <button onClick={() => navigate("/admin/projects")} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* IMAGE UPLOAD */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 cursor-pointer hover:bg-slate-50 transition-colors">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Preview" className="w-full max-w-xs h-48 object-cover rounded" />
            ) : (
              <>
                <Upload size={40} className="text-slate-400" />
                <span className="text-sm text-slate-500 mt-2">Click to upload project image *</span>
              </>
            )}
            <input type="file" hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </label>

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project Title *</label>
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
            <label className="block text-sm font-medium text-slate-700 mb-1">Location / Address *</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g., Tonk road, Jaipur, client shree ram group"
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

          {/* ACTIVE STATUS */}
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4" />
            <span className="text-sm text-slate-700">Active (Show on website)</span>
          </label>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <button type="button" onClick={() => navigate("/admin/projects")} className="px-5 py-2.5 border rounded-lg hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {loading ? "Saving..." : "Add Project Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectCard;
