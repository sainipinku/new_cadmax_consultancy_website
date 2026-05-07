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
  { value: "", label: "Select Sub Category (Optional)" },
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

const AddProject = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    sector: "",
    subCategory: "",
    location: "",
    area: "",
    serialNumber: "",
    description: "",
    content: "",
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

    if (!image) {
      alert("Please upload project image");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("sector", form.sector);
    formData.append("subCategory", form.subCategory);
    formData.append("location", form.location);
    formData.append("area", form.area);
    formData.append("serialNumber", form.serialNumber);
    formData.append("description", form.description);
    formData.append("content", form.content);
    formData.append("isActive", form.isActive);
    formData.append("image", image);
    if (file) formData.append("file", file);

    try {
      setLoading(true);
      await API.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Project added successfully");
      navigate("/admin/projects");
    } catch (err) {
      console.error(err);
      alert("Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Add New Project</h1>
          <p className="text-sm text-slate-500">Create a new project for the website</p>
        </div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Serial & Title */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="serialNumber"
              value={form.serialNumber}
              onChange={handleChange}
              placeholder="Serial Number (e.g., 1, 2, 3)"
              className="w-full rounded-lg border px-4 py-2.5"
            />
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Project title"
              className="w-full rounded-lg border px-4 py-2.5"
              required
            />
          </div>

          {/* Row 2: Sector & SubCategory */}
          <div className="grid grid-cols-2 gap-4">
            <select name="sector" value={form.sector} onChange={handleChange} className="w-full rounded-lg border px-4 py-2.5" required>
              {SECTORS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <select name="subCategory" value={form.subCategory} onChange={handleChange} className="w-full rounded-lg border px-4 py-2.5">
              {SUB_CATEGORIES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          {/* Row 3: Category & Area */}
          <div className="grid grid-cols-2 gap-4">
            <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-lg border px-4 py-2.5" required>
              <option value="">Select Category</option>
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              placeholder="Area (e.g., 10.0 Hect., More than 10.0 Hect.)"
              className="w-full rounded-lg border px-4 py-2.5"
            />
          </div>

          {/* Location */}
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Project Location (e.g., Tonk road jaipur, client shree ram group)"
            className="w-full rounded-lg border px-4 py-2.5"
          />

          {/* Description & Content */}
          <textarea name="description" value={form.description} onChange={handleChange} rows="3" placeholder="Short description" className="w-full rounded-lg border px-4 py-2.5" />
          <textarea name="content" value={form.content} onChange={handleChange} rows="6" placeholder="Detailed content (HTML allowed)" className="w-full rounded-lg border px-4 py-2.5 font-mono text-sm" />

          {/* Active Status */}
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4" />
            <span className="text-sm text-slate-700">Active (Show on website)</span>
          </label>

          {/* Uploads */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-slate-50">
              <Upload />
              <span className="text-sm mt-2">{image ? image.name : "Upload Project Image *"}</span>
              <input type="file" hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            </label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-slate-50">
              <FileText />
              <span className="text-sm mt-2">{file ? file.name : "Upload File (PDF/DOC) - Optional"}</span>
              <input type="file" hidden accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} />
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <button type="button" onClick={() => navigate(-1)} className="px-5 py-2.5 border rounded-lg">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg">
              {loading ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
