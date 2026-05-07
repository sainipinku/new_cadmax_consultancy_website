import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminPrivate from "../routes/AdminPrivate";

/* AUTH */
import Login from "../pages/auth/Login";

/* DASHBOARD */
import Dashboard from "../pages/dashboard/Dashboard";

/* INQUIRIES */
import Inquiries from "../pages/Inquiries/Inquiries"; // ✅ correct import

/* SERVICES */
import CategoryList from "../pages/services/CategoryList";
import CategoryForm from "../pages/services/CategoryForm";
import SubCategoryList from "../pages/services/SubCategoryList";
import SubCategoryForm from "../pages/services/SubCategoryForm";

/* PROJECTS */
import ProjectManagement from "../pages/projects/ProjectManagement";
import AddProjectCard from "../pages/projects/AddProjectCard";
import AddProjectList from "../pages/projects/AddProjectList";
import EditProjectCard from "../pages/projects/EditProjectCard";
import EditProjectList from "../pages/projects/EditProjectList";

/* SETTINGS */
import ProfileUpdate from "../pages/settings/ProfileUpdate";
import ResetPassword from "../pages/settings/ResetPassword";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="login" element={<Login />} />

      {/* ================= PROTECTED ================= */}
      <Route
        path="/"
        element={
          <AdminPrivate>
            <AdminLayout />
          </AdminPrivate>
        }
      >
        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        {/* ===== INQUIRIES ===== */}
        <Route path="inquiries" element={<Inquiries />} />

        {/* ===== SERVICES ===== */}
        <Route path="services/categories" element={<CategoryList />} />
        <Route path="services/categories/add" element={<CategoryForm />} />
        <Route
          path="services/categories/edit/:id"
          element={<CategoryForm />}
        />

        <Route path="services/subcategories" element={<SubCategoryList />} />
        <Route
          path="services/subcategories/add"
          element={<SubCategoryForm />}
        />
        <Route
          path="services/subcategories/edit/:id"
          element={<SubCategoryForm />}
        />

        {/* ===== PROJECTS ===== */}
        <Route path="projects" element={<ProjectManagement />} />
        {/* Project Cards */}
        <Route path="projects/add-card" element={<AddProjectCard />} />
        <Route path="projects/edit-card/:id" element={<EditProjectCard />} />
        {/* Project List/Table */}
        <Route path="projects/add-list" element={<AddProjectList />} />
        <Route path="projects/edit-list/:id" element={<EditProjectList />} />

        {/* ===== SETTINGS ===== */}
        <Route path="profile" element={<ProfileUpdate />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
