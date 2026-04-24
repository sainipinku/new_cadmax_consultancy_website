import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

// ===== PUBLIC PAGES =====

// home
import Home from "../pages/home/home";

// about
import About from "../pages/About/About";

// services
import Services from "../pages/Services/Services";
import Engineering from "../pages/Services/Engineering";
import Architecture from "../pages/Services/Architecture";
import InteriorDesign from "../pages/Services/InteriorDesign";
import Infrastructure from "../pages/Services/Infrastructure";

// engineering sub-pages
import Maingate from "../pages/Services/Engineering-subpage/maingate";
import Roadnetwork from "../pages/Services/Engineering-subpage/roadNetwork";
import Watersupply from "../pages/Services/Engineering-subpage/waterSupply";
import Electricity1 from "../pages/Services/Engineering-subpage/electricity";
import Sewer from "../pages/Services/Engineering-subpage/Sewer";


// interior sub page 
import CadmaxConsultancy from "../pages/Services/interior-sub-page/CadmaxConsultancy";
import CadmaxProjects from "../pages/Services/interior-sub-page/CadmaxProjects";
import DipendraSite from "../pages/Services/interior-sub-page/DipendraSite";



// project
import Project from "../pages/Project/Project";

// contact
import Contact from "../pages/contact/Contact";

// career
import Careerpath from "../pages/CAREER-PATHS/careerpath";

// ===== ADMIN =====
import AdminRoutes from "../admin/routes/AdminRoutes";
import AdminPrivate from "../admin/routes/AdminPrivate";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/" element={<Home />} />

        <Route path="/services" element={<Services />} />
        <Route path="/services/engineering" element={<Engineering />} />
        <Route path="/services/Architecture" element={<Architecture />} />
        <Route path="/services/InteriorDesign" element={<InteriorDesign />} />
        <Route path="/services/Infrastructure" element={<Infrastructure />} />



        <Route path="/cadmax-consultancy" element={<CadmaxConsultancy />} />
        <Route path="/cadmax-projects" element={<CadmaxProjects />} />
        <Route path="/dipendra-ji-goner-site" element={<DipendraSite />} />
        



        <Route path="/services/maingate" element={<Maingate />} />
        <Route path="/services/electricity" element={<Electricity1 />} />
        <Route path="/services/roadNetwork" element={<Roadnetwork />} />
        <Route path="/services/waterSupply" element={<Watersupply />} />
        <Route path="/services/sewer" element={<Sewer />} />

        <Route path="/projects" element={<Project />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careerpath" element={<Careerpath />} />

        {/* ===== 🔐 ADMIN ROUTES ===== */}
        <Route
          path="/admin/*"
          element={
            <AdminPrivate>
              <AdminRoutes />
            </AdminPrivate>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
