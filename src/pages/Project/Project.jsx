import React, { useEffect, useState } from "react";
import "./Project.css";
import Navbar from "../../components/Layout/Header/Navbar";
import Footer from "../../components/Layout/Footer/Footer";
import API, { resolveFileUrl } from "../../api/axios";

import heroBG from "../../../src/assets/Images/project/project-banner.png";

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
        <h1>PROJECT</h1>
      </div>

      <div className="project-wrapper">
       
        <h2 className="project-title uppercase">Projects That Inspire</h2>

       
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
                        ? resolveFileUrl(item.image)
                        : "https://via.placeholder.com/600x400?text=No+Image"
                    }
                    alt={item.title}
                    className="project-img"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/600x400?text=No+Image";
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
