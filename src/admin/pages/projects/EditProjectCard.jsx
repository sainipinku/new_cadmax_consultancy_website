import { ArrowLeft, Upload, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API, { resolveFileUrl } from "../../../api/axios";
import { useToast } from "../../../components/Toast/Toast";
import { useConfirm } from "../../../components/ConfirmModal/ConfirmModal";

const getImagePath = (image) => {
  if (typeof image === "string") return image;
  return image?.url || image?.path || "";
};

const SECTORS = [
  { value: "", label: "Select Sector" },
  { value: "ENGINEERING", label: "Engineering" },
  { value: "ARCHITECTURAL", label: "Architectural" },
  { value: "INFRASTRUCTURE DEVELOPMENT", label: "Infrastructure Development" },
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
  const [currentGalleryImages, setCurrentGalleryImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState("");
  const [newGalleryImages, setNewGalleryImages] = useState([]);
  const [newGalleryPreviews, setNewGalleryPreviews] = useState([]);
  const [removeCurrentImage, setRemoveCurrentImage] = useState(false);
  const [initialGalleryCount, setInitialGalleryCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!newImage) {
      setNewImagePreview("");
      return undefined;
    }

    const previewUrl = URL.createObjectURL(newImage);
    setNewImagePreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [newImage]);

  useEffect(() => {
    const previewUrls = newGalleryImages.map((file) => URL.createObjectURL(file));
    setNewGalleryPreviews(previewUrls);
    return () => previewUrls.forEach((previewUrl) => URL.revokeObjectURL(previewUrl));
  }, [newGalleryImages]);

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
        sector: project.sector || "",
        subCategory: project.subCategory || "",
        location: project.location || "",
        description: project.description || "",
        content: project.content || "",
        isActive: project.isActive !== false,
      });

      const projectImages = Array.isArray(project.image)
        ? project.image
        : project.image
          ? [project.image]
          : [];
      const mainImage = projectImages[0];
      const galleryImages = [
        ...projectImages.slice(1),
        ...(Array.isArray(project.images) ? project.images : []),
      ];
      const normalizedGalleryImages = Array.from(
        new Set(galleryImages.map(getImagePath).filter(Boolean))
      );

      setCurrentImage(getImagePath(mainImage));
      setInitialGalleryCount(normalizedGalleryImages.length);
      setCurrentGalleryImages(normalizedGalleryImages);
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

  const handleNewImageSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.size > MAX_SIZE) {
      toast.warning("Image size should be less than 10MB. कृपया 10MB से कम की इमेज ही अपलोड करें।");
      e.target.value = "";
      return;
    }
    setNewImage(selectedFile);
    if (selectedFile) setRemoveCurrentImage(false);
  };

  const handleGallerySelect = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    const oversizedFile = selectedFiles.find((file) => file.size > MAX_SIZE);
    if (oversizedFile) {
      toast.warning(`${oversizedFile.name} is larger than 10MB`);
      e.target.value = "";
      return;
    }
    setNewGalleryImages((current) => [...current, ...selectedFiles]);
    e.target.value = "";
  };

  const galleryChanged =
    newGalleryImages.length > 0 || currentGalleryImages.length !== initialGalleryCount;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmed = await confirm({
      title: "Update Project Card",
      message: `Are you sure you want to update "${form.title}"?`,
      type: "info",
    });

    if (!confirmed) return;

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("category", "PROJECT CARD");
    formData.append("sector", form.sector);
    formData.append("subCategory", form.subCategory);
    formData.append("location", form.location);
    formData.append("description", form.description);
    formData.append("content", form.content);
    formData.append("isActive", form.isActive);

    // MAIN IMAGE
    if (newImage) {
      formData.append("image", newImage);
    }

    if (removeCurrentImage && !newImage) {
      formData.append("removeImage", "true");
    }

    // GALLERY ONLY IF CHANGED
    if (galleryChanged) {
      formData.append("existingImages", JSON.stringify(currentGalleryImages));

      newGalleryImages.forEach((file) => {
        formData.append("images", file);
      });
    }

    console.log("galleryChanged:", galleryChanged);

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      setSaving(true);

      const response = await API.put(
        `/projects/${id}`,
        formData
      );

      console.log(
        "UPDATE RESPONSE:",
        response?.data
      );

      toast.success(
        "Project card updated successfully"
      );

      navigate("/admin/projects");
    } catch (err) {
      console.error(err);
      console.error(
        err?.response?.data
      );

      toast.error(
        "Failed to update project card"
      );
    } finally {
      setSaving(false);
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
          {currentImage && !removeCurrentImage && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Main Image</label>
              <div className="relative w-fit">
                <img src={resolveFileUrl(currentImage)} alt="Current project" className="w-full max-w-xs h-48 object-cover rounded-lg border" />
                <button
                  type="button"
                  onClick={() => {
                    setRemoveCurrentImage(true);
                    setNewImage(null);
                  }}
                  aria-label="Remove current project image"
                  title="Remove current image"
                  className="absolute right-2 top-2 rounded-full bg-red-600 p-1.5 text-white shadow hover:bg-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}

          {/* REPLACE IMAGE */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Replace Image</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-slate-50">
              {newImagePreview ? (
                <div className="relative">
                  <img src={newImagePreview} alt="Replacement project preview" className="w-32 h-24 object-cover rounded" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setNewImage(null);
                    }}
                    aria-label="Remove selected replacement image"
                    title="Remove selected image"
                    className="absolute -right-2 -top-2 rounded-full bg-red-600 p-1 text-white shadow hover:bg-red-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={24} className="text-slate-400" />
                  <span className="text-sm text-slate-500 mt-1">
                    {removeCurrentImage ? "Current image removed — upload its replacement" : "Click to replace image"}
                  </span>
                </>
              )}
              <input key={newImage ? "replacement-selected" : "replacement-empty"} type="file" hidden accept="image/*" onChange={handleNewImageSelect} />
            </label>
          </div>

          {/* PROJECT GALLERY IMAGES */}
          <section className="space-y-3">
            <div>
              <h2 className="text-sm font-medium text-slate-700">Additional Project Images</h2>
              <p className="mt-1 text-xs text-slate-500">Remove saved images with × or add multiple images. Each uploaded image must be under 10MB.</p>
            </div>
            {(currentGalleryImages.length > 0 || newGalleryImages.length > 0) && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {currentGalleryImages.map((galleryImage, index) => (
                  <div key={`saved-${galleryImage}`} className="relative">
                    <img
                      src={resolveFileUrl(galleryImage)}
                      alt={`Saved gallery preview ${index + 1}`}
                      className="h-28 w-full rounded-lg border object-cover"
                    />
                    <span className="absolute bottom-1 left-1 rounded bg-slate-900/75 px-2 py-1 text-xs text-white">Saved</span>
                    <button
                      type="button"
                      onClick={() => setCurrentGalleryImages((current) => current.filter((_, imageIndex) => imageIndex !== index))}
                      aria-label={`Remove saved gallery image ${index + 1}`}
                      title="Remove saved image"
                      className="absolute right-1 top-1 rounded-full bg-red-600 p-1 text-white shadow hover:bg-red-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {newGalleryImages.map((galleryImage, index) => (
                  <div key={`${galleryImage.name}-${galleryImage.lastModified}-${index}`} className="relative">
                    <img
                      src={newGalleryPreviews[index]}
                      alt={`New gallery preview ${index + 1}`}
                      className="h-28 w-full rounded-lg border object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setNewGalleryImages((current) => current.filter((_, imageIndex) => imageIndex !== index))}
                      aria-label={`Remove new gallery image ${index + 1}`}
                      title="Remove selected image"
                      className="absolute right-1 top-1 rounded-full bg-red-600 p-1 text-white shadow hover:bg-red-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed p-5 transition-colors hover:bg-slate-50">
              <Upload size={20} className="text-slate-400" />
              <span className="text-sm text-slate-600">
                {newGalleryImages.length ? `Choose more images (${newGalleryImages.length} selected)` : "Choose multiple images"}
              </span>
              <input type="file" hidden accept="image/*" multiple onChange={handleGallerySelect} />
            </label>
          </section>

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

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="3" placeholder="Short description" className="w-full rounded-lg border px-4 py-2.5" />
          </div>

          {/* CONTENT */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Content (HTML allowed)</label>
            <textarea name="content" value={form.content} onChange={handleChange} rows="6" placeholder="Detailed content" className="w-full rounded-lg border px-4 py-2.5 font-mono text-sm" />
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
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">{saving ? "Saving..." : "Update Card"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectCard;