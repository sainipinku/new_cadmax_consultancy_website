import React, { useState } from "react";
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

  return (
    <header className="
      fixed top-0 left-0 w-full z-50
      h-[77px]
      flex items-center justify-between px-4 md:px-6
      bg-white/20 backdrop-blur-[28px]
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
              ${isActive ? "text-[#0F2C59] scale-110 font-extrabold" : "text-[#171717]"}
              
              after:content-[''] after:absolute after:left-0 after:bottom-[6px]
              after:h-[2px] after:bg-[#1B3C73] after:w-0
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
              ${isActive ? "text-[#0F2C59] scale-110 font-extrabold" : "text-[#171717]"}
              
              after:content-[''] after:absolute after:left-0 after:bottom-[6px]
              after:h-[2px] after:bg-[#1B3C73] after:w-0
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
            <div className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 min-w-[200px] border border-gray-100">
              {projectsMenu.items.map((item) => (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => item.submenu && setSurveyingDropdown(true)}
                  onMouseLeave={() => item.submenu && setSurveyingDropdown(false)}
                >
                  <Link
                    to={item.path}
                    className="flex items-center justify-between px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#0F2C59] transition"
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
                    <div className="absolute top-0 left-full bg-white shadow-lg rounded-md py-2 min-w-[200px] border border-gray-100">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block px-4 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#0F2C59] transition"
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
        className="hidden lg:block bg-[#171717] text-white px-6 py-3 rounded-md text-[14px] font-bold"
      >
        ENQUIRE TODAY
      </Link>

      {/* Professional Hamburger Menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`
          md:hidden relative w-10 h-10 flex flex-col justify-center items-center
          bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl
          shadow-lg hover:shadow-xl transition-all duration-300
          hover:scale-105 active:scale-95 border border-gray-200
          ${menuOpen ? "bg-gradient-to-br from-blue-50 to-indigo-50 shadow-blue-200" : ""}
        `}
      >
        {/* Animated Hamburger Lines */}
        <div className="relative w-6 h-5 flex flex-col justify-center">
          <span className={`
            absolute h-[3px] w-6 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full
            transition-all duration-300 ease-in-out
            ${menuOpen 
              ? "top-2 rotate-45 bg-gradient-to-r from-blue-600 to-indigo-600" 
              : "top-0"
            }
          `}></span>
          <span className={`
            absolute h-[3px] w-6 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full
            transition-all duration-300 ease-in-out
            ${menuOpen 
              ? "top-2 opacity-0 scale-0" 
              : "top-2"
            }
          `}></span>
          <span className={`
            absolute h-[3px] w-6 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full
            transition-all duration-300 ease-in-out
            ${menuOpen 
              ? "top-2 -rotate-45 bg-gradient-to-r from-blue-600 to-indigo-600" 
              : "top-4"
            }
          `}></span>
        </div>
        
        {/* Subtle glow effect when open */}
        {menuOpen && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-indigo-400/20 animate-pulse"></div>
        )}
      </button>

      {/* Professional Mobile Menu */}
      <div className={`
        md:hidden absolute top-[77px] left-0 w-full
        bg-gradient-to-br from-white via-white to-gray-50/95
        backdrop-blur-xl shadow-2xl border-t border-gray-100
        flex flex-col px-6 py-6 gap-2
        transition-all duration-500 ease-out
        transform origin-top
        ${menuOpen 
          ? "opacity-100 visible translate-y-0 scale-100" 
          : "opacity-0 invisible -translate-y-4 scale-95"
        }
      `}>
        {/* Menu Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Menu</span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Simple Links with Professional Styling */}
        <div className="space-y-1">
          {simpleLinks.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `group relative px-4 py-3 rounded-xl transition-all duration-300 transform
                ${isActive 
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-bold shadow-md scale-[1.02]" 
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:scale-[1.01]"
                }
                hover:shadow-md`
              }
              style={{
                animationDelay: `${index * 50}ms`,
                animation: menuOpen ? "slideInLeft 0.4s ease-out forwards" : "none"
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{link.label}</span>
                {isActive && (
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                )}
              </div>
              <div className={`
                absolute bottom-0 left-4 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full
                transition-all duration-300
                ${isActive ? "w-8" : "w-0"}
              `}></div>
            </NavLink>
          ))}
        </div>

        {/* Professional Projects Menu */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-4 px-4">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <span className="text-sm font-bold text-gray-800 uppercase tracking-wider">Projects</span>
          </div>
          
          <div className="space-y-2 px-2">
            {/* Main Project Categories */}
            {[
              { label: "All Projects", path: "/projects", icon: "📁" },
              { label: "Engineering", path: "/projects/engineering", icon: "⚙️" },
              { label: "Surveying", path: "/projects/surveying", icon: "📐" },
              { label: "Planning", path: "/projects/planning", icon: "📋" },
            ].map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  bg-gradient-to-r from-gray-50 to-white hover:from-purple-50 hover:to-pink-50
                  text-gray-700 hover:text-purple-700 hover:shadow-md hover:scale-[1.01]
                  border border-gray-100 hover:border-purple-200"
                style={{
                  animationDelay: `${(index + 5) * 50}ms`,
                  animation: menuOpen ? "slideInLeft 0.4s ease-out forwards" : "none"
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                <svg className="w-4 h-4 ml-auto text-gray-400 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            ))}

            {/* Surveying Subcategories */}
            <div className="ml-4 mt-3 space-y-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Surveying Specializations</p>
              {[
                { label: "Transportation", path: "/projects/surveying/transportation" },
                { label: "Water Influence", path: "/projects/surveying/water-influence" },
                { label: "Energy Sector", path: "/projects/surveying/energy-sector" },
                { label: "Irrigation Sector", path: "/projects/surveying/irrigation-sector" },
                { label: "City Survey", path: "/projects/surveying/city-survey" },
                { label: "Real Estate Sector", path: "/projects/surveying/real-estate-sector" },
              ].map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
                    text-gray-600 hover:text-purple-600 hover:bg-purple-50
                    text-sm"
                  style={{
                    animationDelay: `${(index + 9) * 30}ms`,
                    animation: menuOpen ? "fadeIn 0.3s ease-out forwards" : "none"
                  }}
                >
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-purple-400 transition-colors"></div>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile CTA Button */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block w-full px-6 py-4 bg-gradient-to-r from-gray-900 to-black text-white
              text-center font-bold rounded-xl shadow-lg
              hover:from-gray-800 hover:to-gray-900 hover:shadow-xl
              transform hover:scale-[1.02] transition-all duration-300
              relative overflow-hidden group"
          >
            <span className="relative z-10">ENQUIRE TODAY</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>

    </header>
  );
};

export default Navbar;
