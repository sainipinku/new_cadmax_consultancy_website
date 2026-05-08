import { ArrowLeft, Upload } from "lucide-react";
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


const EditProjectCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();
  const confirm = useConfirm();

  const [form, setForm] = useState({
    title: "",
    sector: "",
    subCategory: "",
    location: "",
    description: "",
    content: "",
    isActive: true,
  });

  const [currentImage, setCurrentImage] = useState("");
  const [newImage, setNewImage] = useState(null);
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
        toast.error("Project not found");
        return navigate("/admin/projects");
      }

      setForm({
        title: project.title,
        sector: project.sector || "",
        subCategory: project.subCategory || "",
        location: project.location || "",
        isActive: project.isActive !== false,
      });

      setCurrentImage(project.image);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmed = await confirm({
      title: "Update Project Card",
      message: `Are you sure you want to update "${form.title}"?`,
      type: "info"
    });
    if (!confirmed) return;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", "PROJECT CARD");
    formData.append("sector", form.sector);
    formData.append("subCategory", form.subCategory);
    formData.append("location", form.location);
    formData.append("isActive", form.isActive);

    if (newImage) {
      formData.append("image", newImage);
    }

    try {
      await API.put(`/projects/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Project card updated successfully");
      navigate("/admin/projects");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update project card");
    }
  };

  if (loading) return <p>Loading project...</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Edit Project Card</h1>
          <p className="text-sm text-slate-500">Update project card details</p>
        </div>
        <button onClick={() => navigate("/admin/projects")} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* CURRENT IMAGE */}
          {currentImage && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Image</label>
              <img src={currentImage} alt="Project" className="w-full max-w-xs h-48 object-cover rounded-lg border" />
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

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project Title *</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="e.g., Padam Vatika" className="w-full rounded-lg border px-4 py-2.5" required />
          </div>

          {/* LOCATION */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location / Address *</label>
            <input name="location" value={form.location} onChange={handleChange} placeholder="e.g., Tonk road, Jaipur" className="w-full rounded-lg border px-4 py-2.5" required />
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
            <span className="text-sm text-slate-700">Active</span>
          </label>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <button type="button" onClick={() => navigate("/admin/projects")} className="px-5 py-2.5 border rounded-lg hover:bg-slate-50">Cancel</button>
            <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Update Card</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectCard;
