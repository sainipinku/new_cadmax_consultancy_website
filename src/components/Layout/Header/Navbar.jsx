import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../../assets/Images/cadmax-logo/Cadmax-logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsDropdown, setProjectsDropdown] = useState(false);
  const [surveyingDropdown, setSurveyingDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const simpleLinks = [
    { label: "HOME", path: "/" },
    { label: "ABOUT", path: "/about" },
    { label: "SERVICES", path: "/Services" },
    { label: "CAREER", path: "/careerpath" },
    { label: "CONTACT", path: "/contact" },
  ];

  const linkHoverClass = `nav-link-underline text-[13px] tracking-[0.05em] font-medium transition-colors duration-200 ${
    scrolled ? "text-[#151515] hover:text-[#CAAA79]" : "text-white hover:text-[#CAAA79]"
  }`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-[300ms] ease-out
        h-[70px] md:h-[80px] px-5 md:px-10 lg:px-24 flex items-center justify-between
        ${scrolled ? "bg-[#FAF9F6]/95 backdrop-blur-sm shadow-sm" : "bg-transparent"}
      `}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center z-50">
        <img src={logo} alt="Cadmax Logo" className="h-[35px] sm:h-[40px] md:h-[45px] lg:h-[55px] object-contain" />
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-6 lg:gap-10">
        {simpleLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            className={({ isActive }) =>
              `${linkHoverClass} uppercase ${isActive ? "text-[#CAAA79] !font-semibold" : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}

        {/* Projects */}
        <div
          className="relative"
          onMouseEnter={() => setProjectsDropdown(true)}
          onMouseLeave={() => { setProjectsDropdown(false); setSurveyingDropdown(false); }}
        >
          <button className={`${linkHoverClass} uppercase inline-flex items-center gap-1.5`}>
            PROJECTS
            <svg className={`w-3.5 h-3.5 transition-transform ${projectsDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {projectsDropdown && (
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white shadow-xl rounded-sm py-3 min-w-[220px] border border-[#E8E4DC]"
              onMouseEnter={() => setProjectsDropdown(true)}
              onMouseLeave={() => { setProjectsDropdown(false); setSurveyingDropdown(false); }}
            >
              {[
                { label: "Engineering", path: "/projects/engineering" },
                {
                  label: "Surveying", path: "/projects/surveying",
                  submenu: [
                    { label: "Transportation", path: "/projects/surveying/transportation" },
                    { label: "Water Influence", path: "/projects/surveying/water-influence" },
                    { label: "Energy Sector", path: "/projects/surveying/energy-sector" },
                    { label: "Irrigation Sector", path: "/projects/surveying/irrigation-sector" },
                    { label: "City Survey", path: "/projects/surveying/city-survey" },
                    { label: "Real Estate Sector", path: "/projects/surveying/real-estate-sector" },
                  ]
                },
                { label: "Planning", path: "/projects/planning" },
              ].map((item) => (
                <div key={item.path} className="relative"
                  onMouseEnter={() => item.submenu && setSurveyingDropdown(true)}
                  onMouseLeave={() => item.submenu && setSurveyingDropdown(false)}
                >
                  <Link to={item.path} className="flex items-center justify-between px-5 py-2.5 text-[13px] font-medium text-[#151515] hover:text-[#CAAA79] hover:bg-[#F8F7F4] transition-colors duration-150 uppercase tracking-[0.03em]">
                    {item.label}
                    {item.submenu && (
                      <svg className="w-3.5 h-3.5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </Link>
                  {item.submenu && surveyingDropdown && (
                    <div className="absolute top-0 left-full bg-white shadow-xl rounded-sm py-3 min-w-[220px] border border-[#E8E4DC] ml-1">
                      {item.submenu.map((sub) => (
                        <Link key={sub.path} to={sub.path} className="block px-5 py-2.5 text-[13px] font-medium text-[#151515] hover:text-[#CAAA79] hover:bg-[#F8F7F4] transition-colors duration-150 uppercase tracking-[0.03em]">
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

      {/* Desktop CTA */}
      <Link to="/contact" className={`hidden lg:inline-flex items-center px-6 py-2.5 text-[13px] font-medium tracking-[0.05em] uppercase rounded-sm transition-all duration-200 ${
        scrolled
          ? "text-[#CAAA79] border border-[#CAAA79] hover:bg-[#CAAA79] hover:text-white"
          : "text-white border border-white hover:bg-white hover:text-[#151515]"
      }`}>
        ENQUIRE TODAY
      </Link>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden flex flex-col justify-center items-center w-10 h-10 relative z-[60] rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
        aria-label="Toggle menu"
      >
        <span className={`block h-[2.5px] w-5 rounded-full transition-all duration-300 ${menuOpen ? "bg-black rotate-45 translate-y-[4.5px]" : "bg-black"}`}></span>
        <span className={`block h-[2.5px] w-5 rounded-full mt-[5px] transition-all duration-300 ${menuOpen ? "bg-black opacity-0" : "bg-black"}`}></span>
        <span className={`block h-[2.5px] w-5 rounded-full mt-[5px] transition-all duration-300 ${menuOpen ? "bg-black -rotate-45 -translate-y-[4.5px]" : "bg-black"}`}></span>
      </button>

      {/* Mobile Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 z-50 h-full w-[300px] sm:w-[380px] bg-[#FAF9F6] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-y-auto ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header - only logo, close via hamburger X button */}
        <div className="flex items-center px-6 pt-5 pb-2">
          <img src={logo} alt="Cadmax Logo" className="h-[30px] sm:h-[35px] object-contain" />
        </div>

        {/* Divider */}
        <div className="mx-6 h-[1px] bg-[#E8E4DD]" />

        {/* Nav Links */}
        <div className="px-6 py-6">
          <div className="flex flex-col gap-1">
            {simpleLinks.map((link, i) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-3 text-[22px] sm:text-[26px] md:text-[30px] font-light tracking-[0.02em] text-[#151515] hover:text-[#CAAA79] transition-all duration-300 hover:pl-3 ${
                    isActive ? "text-[#CAAA79] !font-medium" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Projects Button */}
            <div className="py-2">
              <button
                onClick={() => setProjectsDropdown(!projectsDropdown)}
                className="w-full text-left text-[22px] sm:text-[26px] md:text-[30px] font-light tracking-[0.02em] text-[#151515] hover:text-[#CAAA79] transition-all duration-300 flex items-center gap-2"
              >
                <span className="inline-flex items-center gap-2">
                  PROJECTS
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${projectsDropdown ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {projectsDropdown && (
                <div className="mt-2 ml-4 border-l-2 border-[#CAAA79]/40 pl-4 space-y-1 overflow-hidden transition-all duration-300">
                  <Link to="/projects/engineering" onClick={() => setMenuOpen(false)} className="block py-2 text-[15px] sm:text-[16px] text-[#636363] hover:text-[#CAAA79] transition-colors duration-200 uppercase tracking-[0.03em]">
                    Engineering
                  </Link>
                  <div>
                    <button
                      onClick={() => setSurveyingDropdown(!surveyingDropdown)}
                      className="flex items-center gap-1.5 py-2 text-[15px] sm:text-[16px] text-[#636363] hover:text-[#CAAA79] transition-colors duration-200 uppercase tracking-[0.03em]"
                    >
                      Surveying
                      <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${surveyingDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {surveyingDropdown && (
                      <div className="ml-4 mt-1 space-y-1 border-l border-[#E8E4DD] pl-3">
                        {["Transportation", "Water Influence", "Energy Sector", "Irrigation Sector", "City Survey", "Real Estate Sector"].map((label, idx) => {
                          const path = `/projects/surveying/${label.toLowerCase().replace(/ /g, "-")}`;
                          return (
                            <Link key={path} to={path} onClick={() => setMenuOpen(false)} className="block py-1.5 text-[13px] sm:text-[14px] text-[#8A8A8A] hover:text-[#CAAA79] transition-colors duration-200 capitalize">
                              {label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <Link to="/projects/planning" onClick={() => setMenuOpen(false)} className="block py-2 text-[15px] sm:text-[16px] text-[#636363] hover:text-[#CAAA79] transition-colors duration-200 uppercase tracking-[0.03em]">
                    Planning
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-[#E8E4DD]">
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center w-full px-8 py-3.5 text-[13px] font-semibold tracking-[0.08em] uppercase text-white bg-[#CAAA79] rounded-sm hover:bg-[#B8975F] transition-all duration-200 shadow-lg shadow-[#CAAA79]/20"
            >
              ENQUIRE TODAY
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;