import { ArrowLeft, Upload, FileText, X, Download } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../../api/axios";
import { useToast } from "../../../components/Toast/Toast";
import { useConfirm } from "../../../components/ConfirmModal/ConfirmModal";

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

const EditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();
  const confirm = useConfirm();

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

  const [currentImage, setCurrentImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [currentFile, setCurrentFile] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PROJECT ================= */
  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line
  }, []);

  const fetchProject = async () => {
    try {
      const res = await API.get(`/projects/${id}`);
      const project = res.data?.data;

      if (!project) {
        toast.error("Project not found");
        return navigate("/admin/projects");
      }

      setForm({
        title: project.title || "",
        category: project.category || "",
        sector: project.sector || "",
        subCategory: project.subCategory || "",
        location: project.location || "",
        area: project.area || "",
        serialNumber: project.serialNumber || "",
        description: project.description || "",
        content: project.content || "",
        isActive: project.isActive !== false,
      });

      setCurrentImage(project.image?.url || project.image || "");
      setCurrentFile(project.file || "");
    } catch (err) {
      console.error(err);
      toast.error("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  /* ================= CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmed = await confirm({
      title: "Update Project",
      message: `Are you sure you want to update "${form.title}"?`,
      type: "info"
    });
    if (!confirmed) return;

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

    if (newImage) {
      formData.append("image", newImage);
    }
    if (newFile) {
      formData.append("file", newFile);
    }

    try {
      await API.put(`/projects/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Project updated successfully");
      navigate("/admin/projects");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update project");
    }
  };

  if (loading) return <p>Loading project...</p>;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Edit Project
          </h1>
          <p className="text-sm text-slate-500">
            Update project details and image
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Serial & Title */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="serialNumber"
              value={form.serialNumber}
              onChange={handleChange}
              placeholder="Serial Number"
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

          {/* Sector */}
          <select
            name="sector"
            value={form.sector}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-2.5"
            required
          >
            {SECTORS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          {/* Sub Category */}
          <select
            name="subCategory"
            value={form.subCategory}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-2.5"
          >
            {SUB_CATEGORIES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          {/* Category & Area */}
          <div className="grid grid-cols-2 gap-4">
            <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-lg border px-4 py-2.5" required>
              <option value="">Select category</option>
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              placeholder="Area (e.g., 10.0 Hect.)"
              className="w-full rounded-lg border px-4 py-2.5"
            />
          </div>

          {/* Location */}
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Project Location (e.g., Jaipur, Rajasthan)"
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

          {/* Current Image */}
          {currentImage && (
            <div>
              <label className="block text-sm font-medium mb-2">Current Image</label>
              <img src={currentImage} alt="Project" className="w-full max-w-md rounded border object-cover h-40" />
            </div>
          )}

          {/* Current File */}
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

          {/* Uploads */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-slate-50">
              <Upload />
              <span className="text-sm mt-2">{newImage ? newImage.name : "Replace Image"}</span>
              <input type="file" hidden accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} />
            </label>
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

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg"
            >
              Update Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
