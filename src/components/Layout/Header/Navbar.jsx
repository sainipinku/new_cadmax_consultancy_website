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
                    <div className="absolute top-0 left-full bg-white shadow-lg rounded-md py-2 min-w-[200px] border border-gray-100 ml-1">
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

      {/* Modern Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
      >
        <span className={`block h-[2px] w-6 bg-black transition ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}></span>
        <span className={`block h-[2px] w-6 bg-black transition ${menuOpen ? "opacity-0" : ""}`}></span>
        <span className={`block h-[2px] w-6 bg-black transition ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}></span>
      </button>

      {/* Mobile Menu */}
      <div className={`
        md:hidden absolute top-[77px] left-0 w-full
        bg-white/95 backdrop-blur-lg
        flex flex-col px-5 py-4 gap-3
        transition-all duration-300
        ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
      `}>
        {/* Simple Links */}
        {simpleLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-[14px] font-semibold border-b pb-2
              ${isActive ? "text-[#0F2C59] font-bold" : "text-black"}`
            }
          >
            {link.label}
          </NavLink>
        ))}

        {/* Mobile Projects Menu */}
        <div className="border-b pb-2">
          <p className="text-[14px] font-semibold text-[#0F2C59] mb-2">PROJECTS</p>
          <div className="pl-4 flex flex-col gap-2">
            <Link
              to="/projects"
              onClick={() => setMenuOpen(false)}
              className="text-[13px] text-gray-600 hover:text-[#0F2C59]"
            >
              All Projects
            </Link>
            <Link
              to="/projects/engineering"
              onClick={() => setMenuOpen(false)}
              className="text-[13px] text-gray-600 hover:text-[#0F2C59]"
            >
              Engineering
            </Link>
            <Link
              to="/projects/surveying"
              onClick={() => setMenuOpen(false)}
              className="text-[13px] text-gray-600 hover:text-[#0F2C59]"
            >
              Surveying
            </Link>
            <div className="pl-4 flex flex-col gap-1">
              <Link to="/projects/surveying/transportation" onClick={() => setMenuOpen(false)} className="text-[12px] text-gray-500 hover:text-[#0F2C59]">Transportation</Link>
              <Link to="/projects/surveying/water-influence" onClick={() => setMenuOpen(false)} className="text-[12px] text-gray-500 hover:text-[#0F2C59]">Water Influence</Link>
              <Link to="/projects/surveying/energy-sector" onClick={() => setMenuOpen(false)} className="text-[12px] text-gray-500 hover:text-[#0F2C59]">Energy Sector</Link>
              <Link to="/projects/surveying/irrigation-sector" onClick={() => setMenuOpen(false)} className="text-[12px] text-gray-500 hover:text-[#0F2C59]">Irrigation Sector</Link>
              <Link to="/projects/surveying/city-survey" onClick={() => setMenuOpen(false)} className="text-[12px] text-gray-500 hover:text-[#0F2C59]">City Survey</Link>
              <Link to="/projects/surveying/real-estate-sector" onClick={() => setMenuOpen(false)} className="text-[12px] text-gray-500 hover:text-[#0F2C59]">Real Estate Sector</Link>
            </div>
            <Link
              to="/projects/planning"
              onClick={() => setMenuOpen(false)}
              className="text-[13px] text-gray-600 hover:text-[#0F2C59]"
            >
              Planning
            </Link>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Navbar;