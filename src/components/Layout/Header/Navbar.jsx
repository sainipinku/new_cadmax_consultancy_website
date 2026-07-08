import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { NavLink, Link } from "react-router-dom";
import logo from "../../../assets/Images/cadmax-logo/Cadmax-logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsDropdown, setProjectsDropdown] = useState(false);
  const [surveyingDropdown, setSurveyingDropdown] = useState(false);

  // Projects menu structure
  const projectsMenu = {
    label: "PROJECTS",
    path: "/projects",
    items: [
      { label: "Engineering", path: "/projects/engineering" },
      {
        label: "Surveying",
        path: "/projects/surveying",
        submenu: [
          { label: "Transportation", path: "/projects/surveying/transportation" },
          { label: "Water Influence", path: "/projects/surveying/water-influence" },
          { label: "Energy Sector", path: "/projects/surveying/energy-sector" },
          { label: "Irrigation Sector", path: "/projects/surveying/irrigation-sector" },
          { label: "City Survey", path: "/projects/surveying/city-survey" },
          { label: "Real Estate Sector", path: "/projects/surveying/real-estate-sector" },
        ],
      },
      { label: "Planning", path: "/projects/planning" },
    ],
  };

  const simpleLinks = [
    { label: "HOME", path: "/" },
    { label: "ABOUT", path: "/about" },
    { label: "SERVICES", path: "/Services" },
    { label: "CAREER", path: "/careerpath" },
    { label: "CONTACT", path: "/contact" },
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // Menu Component to be rendered via Portal
  const MenuOverlay = () => {
    if (!menuOpen) return null;

    return createPortal(
      <div className="
        fixed inset-0
        bg-[#F5F5F0] 
        transition-all duration-700 ease-in-out
        opacity-100 visible
        overflow-y-auto
        menu-overlay-portal
      ">
        {/* Menu Content */}
        <div className="h-full flex flex-col">
      {/* Close Button */}
          <div className="flex justify-end p-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-2 text-[#171717] hover:text-[#0F2C59] transition-colors"
            >
              <span className="text-sm font-semibold tracking-wider uppercase">Close Menu</span>
              <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24">
            <nav className="space-y-1">
              {/* Simple Links */}
              {simpleLinks.map((link, index) => (
                <div
                  key={link.path}
                  className="overflow-hidden"
                  style={{
                    animation: `slideDown 0.6s ease-out ${index * 0.1}s forwards`,
                    opacity: 0
                  }}
                >
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `group block text-3xl md:text-4xl lg:text-5xl font-light text-[#171717] py-3 
                      transition-all duration-300 hover:pl-4 relative
                      ${isActive ? 'font-semibold' : ''}`
                    }
                  >
                    <span className="relative inline-block">
                      {link.label}
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-[#0F2C59] group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </NavLink>
                </div>
              ))}

              {/* Projects with Dropdown */}
              <div
                className="overflow-hidden"
                style={{
                  animation: `slideDown 0.6s ease-out ${simpleLinks.length * 0.1}s forwards`,
                  opacity: 0
                }}
              >
                <button
                  onClick={() => setProjectsDropdown(!projectsDropdown)}
                  className="group flex items-center justify-between w-full text-3xl md:text-4xl lg:text-5xl font-light text-[#171717] py-3 hover:pl-4 transition-all duration-300"
                >
                  <span className="relative inline-block">
                    PROJECTS
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-[#0F2C59] group-hover:w-full transition-all duration-300"></span>
                  </span>
                  <svg 
                    className={`w-6 h-6 md:w-8 md:h-8 transition-transform duration-300 ${projectsDropdown ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Projects Dropdown */}
                <div className={`ml-2 md:ml-4 mt-2 space-y-1 transition-all duration-500 ease-in-out ${projectsDropdown ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  {projectsMenu.items.map((item, index) => (
                    <div
                      key={item.path}
                      className="overflow-hidden"
                      style={{
                        animation: projectsDropdown ? `slideDown 0.5s ease-out ${index * 0.08}s forwards` : 'none',
                        opacity: projectsDropdown ? 0 : 1
                      }}
                    >
                      {item.submenu ? (
                        <div>
                          <button
                            onClick={() => setSurveyingDropdown(!surveyingDropdown)}
                            className="flex items-center justify-between w-full text-xl md:text-2xl text-[#171717] py-2 hover:pl-2 transition-all duration-300"
                          >
                            <span>{item.label}</span>
                            <svg 
                              className={`w-5 h-5 transition-transform duration-300 ${surveyingDropdown ? 'rotate-180' : ''}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                          
                          {/* Surveying Submenu */}
                          <div className={`ml-4 md:ml-6 mt-1 space-y-1 transition-all duration-500 ease-in-out ${surveyingDropdown ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                            {item.submenu.map((sub, subIndex) => (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                onClick={() => {
                                  setMenuOpen(false);
                                  setProjectsDropdown(false);
                                  setSurveyingDropdown(false);
                                }}
                                className="block text-base md:text-lg text-[#171717]/80 py-1.5 hover:pl-2 transition-all duration-300 hover:text-[#171717]"
                                style={{
                                  animation: surveyingDropdown ? `slideDown 0.4s ease-out ${subIndex * 0.05}s forwards` : 'none',
                                  opacity: surveyingDropdown ? 0 : 1
                                }}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={item.path}
                          onClick={() => {
                            setMenuOpen(false);
                            setProjectsDropdown(false);
                          }}
                          className="block text-xl md:text-2xl text-[#171717] py-2 hover:pl-2 transition-all duration-300"
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          {/* Bottom CTA Button */}
          <div 
            className="p-8 md:p-16"
            style={{
              animation: `slideDown 0.6s ease-out ${(simpleLinks.length + 1) * 0.1}s forwards`,
              opacity: 0
            }}
          >
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#CAAA79] text-white hover:bg-[#c09c66] text-lg font-semibold rounded-full hover:bg-[#0F2C59] transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <span>ENQUIRE TODAY</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <header className="
      fixed top-0 left-0 w-full z-50
      h-[77px]
      flex items-center justify-between px-4 md:px-6
      bg-[#F8F7F4]/90 backdrop-blur-md
      border-b border-black/5
    ">

      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="
            h-[45px] 
            sm:h-[50px] 
            md:h-[60px] 
            lg:h-[70px] 
            object-contain
          "
        />
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-5">
        {/* Simple Links */}
        {simpleLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            className={({ isActive }) =>
              `relative text-[14px] font-bold px-3 py-2 transition
              ${isActive ? "text-[#CAAA79] scale-110 font-extrabold" : "text-[#171717]"}
              
              after:content-[''] after:absolute after:left-0 after:bottom-[6px]
              after:h-[2px] after:bg-[#CAAA79] after:w-0
              hover:after:w-full after:transition-all`
            }
          >
            {link.label}
          </NavLink>
        ))}

        {/* Projects Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setProjectsDropdown(true)}
          onMouseLeave={() => {
            setProjectsDropdown(false);
            setSurveyingDropdown(false);
          }}
        >
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `relative text-[14px] font-bold px-3 py-2 transition flex items-center gap-1
              ${isActive ? "text-[#CAAA79] scale-110 font-extrabold" : "text-[#171717]"}
              
              after:content-[''] after:absolute after:left-0 after:bottom-[6px]
              after:h-[2px] after:bg-[#CAAA79] after:w-0
              hover:after:w-full after:transition-all`
            }
          >
            PROJECTS
            <svg
              className={`w-4 h-4 transition-transform ${projectsDropdown ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </NavLink>

          {/* Projects Dropdown Menu */}
          {projectsDropdown && (
            <div className="absolute top-full left-0 bg-[#F8F7F4]  shadow-lg rounded-md py-2 min-w-[150px] border border-gray-100">
              {projectsMenu.items.map((item) => (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => item.submenu && setSurveyingDropdown(true)}
                  onMouseLeave={() => item.submenu && setSurveyingDropdown(false)}
                >
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-2 text-[13px] font-semibold text-black  hover:bg-[#e0cfb4] hover:text-[#c89a56] transition"
                  >
                    {item.label}
                    {item.submenu && (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </Link>

                  {/* Surveying Submenu */}
                  {item.submenu && surveyingDropdown && (
                    <div className="absolute top-0 left-full bg-[#F8F7F4]  shadow-lg rounded-md py-2 min-w-[180px] border border-gray-100">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block px-4 py-2 text-[13px] font-semibold text-black hover:bg-[#e0cfb4] hover:text-[#c89a56] transition"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Desktop Button */}
      <Link
        to="/contact"
        className="hidden lg:block bg-[#CAAA79] text-white hover:bg-[#c09c66] px-6 py-2 rounded-md text-[14px] font-bold"
      >
        ENQUIRE TODAY
      </Link>

      {/* Elegant Hamburger Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 group"
      >
        <span className={`block w-8 h-0.5 bg-[#0F2C59] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-8 h-0.5 bg-[#0F2C59] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-8 h-0.5 bg-[#0F2C59] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Full Screen Menu Overlay - Rendered via Portal */}
      <MenuOverlay />

      {/* Backdrop Overlay */}
      {menuOpen && createPortal(
        <div 
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-700 opacity-100 menu-backdrop-portal"
          onClick={() => setMenuOpen(false)}
        ></div>,
        document.body
      )}
    </header>
  );
};

// Add custom animations
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(styleSheet);

export default Navbar;