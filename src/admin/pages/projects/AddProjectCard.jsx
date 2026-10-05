import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../../api/axios";
import { useToast } from "../../../components/Toast/Toast";
import { useConfirm } from "../../../components/ConfirmModal/ConfirmModal";

const SECTORS = [
  { value: "", label: "Select Sector" },
  { value: "ENGINEERING", label: "Engineering" },
  { value: "ARCHITECTURAL", label: "Architectural" },
  { value: "INFRASTRUCTURE DEVELOPMENT", label: "Infrastructure Development" },
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
  const toast = useToast();
  const confirm = useConfirm();

  const [form, setForm] = useState({
    title: "",
    sector: "",
    subCategory: "",
    location: "",
    description: "",
    isActive: true,
  });

  const [image, setImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  useEffect(() => {
    if (!image) {
      setImagePreview("");
      return undefined;
    }

    const previewUrl = URL.createObjectURL(image);
    setImagePreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [image]);

  useEffect(() => {
    const previewUrls = galleryImages.map((file) => URL.createObjectURL(file));
    setGalleryPreviews(previewUrls);
    return () => previewUrls.forEach((previewUrl) => URL.revokeObjectURL(previewUrl));
  }, [galleryImages]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.size > MAX_SIZE) {
      toast.warning("Image size should be less than 10MB");
      e.target.value = "";
      return;
    }
    setImage(selectedFile);
  };

  const handleGallerySelect = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    const oversizedFile = selectedFiles.find((file) => file.size > MAX_SIZE);
    if (oversizedFile) {
      toast.warning(`${oversizedFile.name} is larger than 10MB`);
      e.target.value = "";
      return;
    }
    setGalleryImages(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.warning("Please upload a main project image");
      return;
    }

    const confirmed = await confirm({
      title: "Add Project Card",
      message: `Are you sure you want to add "${form.title}" as a new project card?`,
      type: "info"
    });
    if (!confirmed) return;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("projectType", "PROJECT CARD"); // Internal project type for cards
    formData.append("sector", form.sector);
    formData.append("subCategory", form.subCategory);
    formData.append("location", form.location);
    formData.append("description", form.description);
    formData.append("isActive", form.isActive);
    if (image) {
      formData.append("image", image);
    }
    galleryImages.forEach((galleryImage) => {
      formData.append("images", galleryImage);
    });

    try {
      setLoading(true);
      await API.post("/admin/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Project card added successfully");
      navigate("/admin/projects");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add project card");
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
          {/* MAIN IMAGE */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 cursor-pointer hover:bg-slate-50 transition-colors">
            {imagePreview ? (
              <img src={imagePreview} alt="Main project preview" className="w-full max-w-xs h-48 object-cover rounded" />
            ) : (
              <>
                <Upload size={40} className="text-slate-400" />
                <span className="text-sm text-slate-500 mt-2">Click to upload main project image *</span>
              </>
            )}
            <input type="file" hidden accept="image/*" onChange={handleImageSelect} />
          </label>

          {/* ADDITIONAL PROJECT IMAGES */}
          <section className="space-y-3">
            <div>
              <h2 className="text-sm font-medium text-slate-700">Additional Project Images</h2>
              <p className="text-xs text-slate-500 mt-1">Select multiple images to show in the project details gallery. Each image must be under 10MB.</p>
            </div>
            <label className="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-5 cursor-pointer hover:bg-slate-50 transition-colors">
              <Upload size={20} className="text-slate-400" />
              <span className="text-sm text-slate-600">
                {galleryImages.length ? `Choose images (${galleryImages.length} selected)` : "Choose additional images"}
              </span>
              <input type="file" hidden accept="image/*" multiple onChange={handleGallerySelect} />
            </label>
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {galleryImages.map((galleryImage, index) => (
                  <div key={`${galleryImage.name}-${galleryImage.lastModified}-${index}`} className="relative">
                    <img
                      src={galleryPreviews[index]}
                      alt={`Additional gallery preview ${index + 1}`}
                      className="h-28 w-full rounded-lg border object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setGalleryImages((current) => current.filter((_, imageIndex) => imageIndex !== index))}
                      aria-label={`Remove additional image ${index + 1}`}
                      className="absolute right-1 top-1 rounded-full bg-slate-900/75 px-2 py-1 text-xs text-white hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

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

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              placeholder="Brief project description"
              className="w-full rounded-lg border px-4 py-2.5"
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
