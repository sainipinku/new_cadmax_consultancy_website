import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

// ===== PUBLIC PAGES =====

// home
import Home from "../pages/home/home";

// about
import About from "../pages/About/About";

// services
// OLD SERVICES IMPORTS (commented - not deleted)
// import Services from "../pages/Services/Services";
// import Engineering from "../pages/Services/Engineering";
// import Architecture from "../pages/Services/Architecture";
// import InteriorDesign from "../pages/Services/InteriorDesign";
// import Infrastructure from "../pages/Services/Infrastructure";

// NEW SERVICES - CadmaxServices folder
import Services from "../pages/CadmaxServices/ServicesPage";
import Engineering from "../pages/CadmaxServices/ENGINEERING/Engineering";
import Architectural from "../pages/CadmaxServices/ARCHITECTURAL/Architectural";


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



// project (static page - unchanged)
import Project from "../pages/Project/Project";

// dynamic project pages
import EngineeringProjects from "../pages/Projects/Engineering/EngineeringProjects";
import SurveyingProjects from "../pages/Projects/Surveying/SurveyingProjects";
import Transportation from "../pages/Projects/Surveying/Transportation";
import WaterInfluence from "../pages/Projects/Surveying/WaterInfluence";
import EnergySector from "../pages/Projects/Surveying/EnergySector";
import IrrigationSector from "../pages/Projects/Surveying/IrrigationSector";
import CitySurvey from "../pages/Projects/Surveying/CitySurvey";
import RealEstateSector from "../pages/Projects/Surveying/RealEstateSector";
import PlanningProjects from "../pages/Projects/Planning/PlanningProjects";

// contact
import Contact from "../pages/contact/Contact";

// career
import Careerpath from "../pages/CAREER-PATHS/careerpath";

// ===== ADMIN =====
import AdminRoutes from "../admin/routes/AdminRoutes";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/" element={<Home />} />

        {/* OLD SERVICES ROUTES (commented - not deleted) */}
        {/* <Route path="/services" element={<Services />} /> */}
        {/* <Route path="/services/engineering" element={<Engineering />} /> */}
        {/* <Route path="/services/Architecture" element={<Architecture />} /> */}
        {/* <Route path="/services/InteriorDesign" element={<InteriorDesign />} /> */}
        {/* <Route path="/services/Infrastructure" element={<Infrastructure />} /> */}

        {/* NEW SERVICES ROUTE - CadmaxServices folder */}
        <Route path="/services" element={<Services />} />
        <Route path="/services/engineering" element={<Engineering />} />
        <Route path="/services/architectural" element={<Architectural />} />



        <Route path="/cadmax-consultancy" element={<CadmaxConsultancy />} />
        <Route path="/cadmax-projects" element={<CadmaxProjects />} />
        <Route path="/dipendra-ji-goner-site" element={<DipendraSite />} />
        



        <Route path="/services/maingate" element={<Maingate />} />
        <Route path="/services/electricity" element={<Electricity1 />} />
        <Route path="/services/roadNetwork" element={<Roadnetwork />} />
        <Route path="/services/waterSupply" element={<Watersupply />} />
        <Route path="/services/sewer" element={<Sewer />} />

        {/* ===== STATIC PROJECT PAGE (UNCHANGED) ===== */}
        <Route path="/projects" element={<Project />} />

        {/* ===== DYNAMIC PROJECT PAGES ===== */}
        {/* Engineering */}
        <Route path="/projects/engineering" element={<EngineeringProjects />} />

        {/* Surveying */}
        <Route path="/projects/surveying" element={<SurveyingProjects />} />
        <Route path="/projects/surveying/transportation" element={<Transportation />} />
        <Route path="/projects/surveying/water-influence" element={<WaterInfluence />} />
        <Route path="/projects/surveying/energy-sector" element={<EnergySector />} />
        <Route path="/projects/surveying/irrigation-sector" element={<IrrigationSector />} />
        <Route path="/projects/surveying/city-survey" element={<CitySurvey />} />
        <Route path="/projects/surveying/real-estate-sector" element={<RealEstateSector />} />

        {/* Planning */}
        <Route path="/projects/planning" element={<PlanningProjects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careerpath" element={<Careerpath />} />

        {/* ===== 🔐 ADMIN ROUTES ===== */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
