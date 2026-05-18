import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import Navbar from "../../../components/Layout/Header/Navbar";
import Footer from "../../../components/Layout/Footer/Footer";
import API, { resolveFileUrl } from "../../../api/axios";

// Custom CSS for animations
const styles = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-slideInLeft {
  animation: slideInLeft 0.4s ease-out forwards;
}
`;

const ProjectLayout = ({
  heroImage,
  title,
  subtitle,
  description,
  sector,
  subCategory = null,
  showProjectList = true,
}) => {
  const [cardProjects, setCardProjects] = useState([]);
  const [listProjects, setListProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        // Fetch PROJECT CARD type
        let cardUrl = `/projects?sector=${sector}&type=cards`;
        if (subCategory) {
          cardUrl += `&subCategory=${subCategory}`;
        }
        const cardRes = await API.get(cardUrl);
        setCardProjects(cardRes.data?.data || []);
        
        // Fetch PROJECT LIST type
        let listUrl = `/projects?sector=${sector}&type=list`;
        if (subCategory) {
          listUrl += `&subCategory=${subCategory}`;
        }
        const listRes = await API.get(listUrl);
        setListProjects(listRes.data?.data || []);
        
      } catch (error) {
        console.error("Project fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [sector, subCategory]);

  return (
    <>
      <style>{styles}</style>
      <Navbar />

      {/* Hero Section - Only Image */}
      <div
        className="relative w-full h-[400px] md:h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Title Section - Below Hero */}
      <div className="py-12 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto text-center pt-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F2C59] mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base md:text-lg font-medium text-gray-600">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Description - Optional (only shows if provided) */}
      {description && (
        <div className="py-2 px-4 md:px-8 lg:px-16 bg-gray-50 border-y border-gray-100">
          <div className="max-w-5xl mx-auto">
            <p className="text-base text-gray-700 leading-relaxed text-center">
              {description}
            </p>
          </div>
        </div>
      )}

      {/* Projects Grid Section */}
      {showProjectList && (
        <div className="py-4 px-4 md:px-8 lg:px-16 pt-2">
          <div className="max-w-7xl mx-auto">
            

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#0F2C59] border-t-transparent"></div>
                <p className="mt-4 text-gray-600">Loading projects...</p>
              </div>
            ) : (
              <>
                {/* PROJECT CARDS SECTION */}
                {cardProjects.length > 0 && (
                  <div className="mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {cardProjects.map((project, index) => (
                        <div
                          key={project._id}
                          className="group animate-fadeInUp cursor-pointer"
                          style={{ animationDelay: `${index * 100}ms` }}
                          onClick={() => setSelectedProject(project)}
                        >
                          <div className="relative overflow-hidden group">
                            {/* Project Image */}
                            <div className="relative h-64">
                              <img
                                src={project.image ? resolveFileUrl(project.image) : "https://via.placeholder.com/600x400?text=No+Image"}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={(e) => {
                                  e.target.src = "https://via.placeholder.com/600x400?text=No+Image";
                                }}
                              />
                              {/* Status Badge on Image */}
                              <div className="absolute top-4 left-4">
                                <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-700 border border-gray-200">
                                  PROJECT
                                </span>
                              </div>
                            </div>
                            
                            {/* Content Below Image */}
                            <div className="p-4 bg-white">
                              {/* Title and Location */}
                              <h3 className="text-gray-900 text-lg font-bold mb-2">
                                {project.title}
                              </h3>
                              
                              {project.location && (
                                <div className="flex items-center text-gray-600 text-sm">
                                 
                                  {project.location}
                                </div>
                              )}
                            </div>
                              
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PROJECT LIST SECTION */}
                {listProjects.length > 0 && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0F2C59] mb-6 text-center">Project List</h2>
                    <div className="overflow-x-auto animate-fadeIn">
                      <table className="w-full border-collapse bg-white rounded-xl shadow-lg overflow-hidden">
                        <thead>
                          <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                            <th className="text-left py-4 px-6 font-semibold">No.</th>
                            <th className="text-left py-4 px-6 font-semibold">Project Name</th>
                            <th className="text-left py-4 px-6 font-semibold">Location</th>
                            <th className="text-left py-4 px-6 font-semibold">Area</th>
                            <th className="text-left py-4 px-6 font-semibold">File</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listProjects.map((project, index) => (
                            <tr key={project._id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 animate-slideInLeft" style={{ animationDelay: `${index * 50}ms` }}>
                              <td className="py-4 px-6 text-gray-600 font-medium">{index + 1}.</td>
                              <td className="py-4 px-6">
                                <span
                                  className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium hover:underline transition-all duration-200"
                                  onClick={() => setSelectedProject(project)}
                                >
                                  {project.title}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-gray-600">{project.location || "—"}</td>
                              <td className="py-4 px-6 text-gray-600">{project.area || "—"}</td>
                              <td className="py-4 px-6">
                                {(project.file || project.image) ? (
                                  <a
                                    href={resolveFileUrl(project.file || project.image)}
                                    download
                                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-md"
                                  >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                    DOWNLOAD
                                  </a>
                                ) : (
                                  <span className="text-gray-400 font-medium">—</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* NO PROJECTS FOUND */}
                {cardProjects.length === 0 && listProjects.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-xl text-gray-600">No projects found.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl transform transition-all duration-300 scale-100 animate-fadeInUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-80 md:h-96 bg-gradient-to-br from-gray-100 to-gray-200">
              <img
                src={selectedProject.image ? resolveFileUrl(selectedProject.image) : "https://via.placeholder.com/800x600?text=No+Image"}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x600?text=No+Image";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-white hover:scale-110 transition-all duration-200"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-8 bg-gradient-to-br from-white to-gray-50 overflow-y-auto">
              <h3 className="text-3xl font-bold text-[#0F2C59] mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {selectedProject.title}
              </h3>
              {selectedProject.location && (
                <div className="flex items-center text-gray-600 mb-4 bg-blue-50 px-4 py-2 rounded-lg">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {selectedProject.location}
                </div>
              )}
              {selectedProject.description && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProjectLayout;
