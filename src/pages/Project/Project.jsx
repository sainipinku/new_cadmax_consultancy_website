import React, { useEffect, useState } from "react";
import "./Project.css";
import Navbar from "../../components/Layout/Header/Navbar";
import Footer from "../../components/Layout/Footer/Footer";
import API, { resolveFileUrl } from "../../api/axios";
import heroBG from "../../../src/assets/Images/project/project-banner.png";

// Inline SVG data URI for fallback "No Image" placeholder (no external network request)
const noImagePlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f3f4f6'/%3E%3Cg transform='translate(250,130)'%3E%3Crect x='20' y='20' width='120' height='90' rx='8' fill='%23d1d5db' stroke='%239ca3af' stroke-width='2'/%3E%3Ccircle cx='60' cy='50' r='12' fill='%239ca3af'/%3E%3Crect x='35' y='70' width='90' height='25' rx='4' fill='%239ca3af'/%3E%3C/g%3E%3Ctext x='300' y='300' font-family='Arial,sans-serif' font-size='20' fill='%239ca3af' text-anchor='middle' font-weight='bold'%3ENo Image%3C/text%3E%3C/svg%3E";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await API.get("/projects?type=cards");
        const data = res.data?.data || res.data || [];
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Project fetch error:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />

      
      <div
        className="project-hero"
        style={{ backgroundImage: `url(${heroBG})` }}
      >
        <div className="text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[var(--accent)]" />
            <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
              Our Work
            </span>
            <div className="w-8 h-[1px] bg-[var(--accent)]" />
          </div>
        
        </div>
      </div>

      <div className="project-wrapper">
        <div className="project-wrapper-inner">
       
        <h2 className="project-title uppercase">
          Projects That <span className="italic text-[var(--accent)]">Inspire</span>
        </h2>

       
        <div className="project-tabs">
          {/* <button className="tab active">
            MANORATE AND BOUNDARY CONSTRUCTION
          </button> */}
          {/* <button className="tab">ROAD NETWORK</button>
          <button className="tab">WATER SUPPLY</button>
          <button className="tab">ELECTRICITY</button> */}
        </div>

      
        <div className="project-grid">
          {loading && (
            <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>
              Loading projects...
            </p>
          )}

          {!loading && projects.length === 0 && (
            <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>
              No projects found.
            </p>
          )}

          {!loading &&
            projects.slice(0, visibleCount).map((item) => (
              <div className="project-card" key={item._id || item.id || item.title}>
                <div className="img-box">
                  <img
                    src={
                      item.image
                        ? resolveFileUrl(item.image?.url || item.image)
                        : noImagePlaceholder
                    }
                    alt={item.title}
                    className="project-img"
                    onError={(e) => {
                      e.target.src = noImagePlaceholder;
                    }}
                  />
                </div>

                <div className="project-content">
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
        </div>

        
        {!loading && visibleCount < projects.length && (
          <button
            className="load-more"
            onClick={() => setVisibleCount(projects.length)}
          >
            LOAD MORE
          </button>
        )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Project;





 //  dynamic page here ====>  //

// import React, { useEffect, useState } from "react";
// import "./Project.css";
// import Navbar from "../../components/Layout/Header/Navbar";
// import Footer from "../../components/Layout/Footer/Footer";
// import API from "../../api/axios";

// import heroBG from "../../../src/assets/Images/project/hero-project-banner.jpg";

// const CATEGORIES = [
//   "MANORATE AND BOUNDARY CONSTRUCTION",
//   "ROAD NETWORK",
//   "WATER SUPPLY",
//   "ELECTRICITY",
// ];

// const Project = () => {
//   const [projects, setProjects] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(12);
//   const [activeTab, setActiveTab] = useState(CATEGORIES[0]);

//   /* ================= FETCH PROJECTS ================= */
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const res = await API.get("/projects");
//         setProjects(res.data || []);
//       } catch (error) {
//         console.error("Project fetch error", error);
//       }
//     };

//     fetchProjects();
//   }, []);

//   /* ================= RESET LOAD MORE ON TAB CHANGE ================= */
//   useEffect(() => {
//     setVisibleCount(12);
//   }, [activeTab]);

//   /* ================= FILTER PROJECTS ================= */
//   const filteredProjects = projects.filter(
//     (item) => item.category?.toUpperCase() === activeTab
//   );

//   return (
//     <>
//       <Navbar />

//       {/* HERO */}
//       <div
//         className="project-hero"
//         style={{ backgroundImage: `url(${heroBG})` }}
//       >
//         <h1>PROJECT</h1>
//       </div>

//       <div className="project-wrapper">
//         <h2 className="project-title uppercase">Projects That Inspire.</h2>

//         {/* TABS */}
//         <div className="project-tabs">
//           {CATEGORIES.map((cat) => (
//             <button
//               key={cat}
//               className={`tab ${activeTab === cat ? "active" : ""}`}
//               onClick={() => setActiveTab(cat)}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* GRID */}
//         <div className="project-grid">
//           {filteredProjects.length === 0 && (
//             <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>
//               No projects found in this category.
//             </p>
//           )}

//           {filteredProjects.slice(0, visibleCount).map((item) => (
//             <div className="project-card" key={item._id}>
//               <div className="img-box">
//                 <img
//                   src={item.image}  
//                   alt={item.title}
//                   className="project-img"
//                 />

//                 <div className="download-icon">
//                   <i className="bi bi-download"></i>
//                 </div>
//               </div>

//               <div className="project-content">
//                 <h3>{item.title}</h3>
                
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* LOAD MORE */}
//         {visibleCount < filteredProjects.length && (
//           <button
//             className="load-more"
//             onClick={() => setVisibleCount((prev) => prev + 12)}
//           >
//             LOAD MORE
//           </button>
//         )}
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Project;
