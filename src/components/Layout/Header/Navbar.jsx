import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsDropdown, setProjectsDropdown] = useState(false);
  const [surveyingDropdown, setSurveyingDropdown] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [textWhite, setTextWhite] = useState(true);

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

  // Track scroll for header bg, text color, and visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      setHasScrolled(scrollY > 50);

      // Text color logic:
      // White on Hero (first 100vh) + on ContactSection
      // Dark (foreground) on everything else
      const contactSection = document.querySelector('.contact-section-home');
      let shouldBeWhite = false;

      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const contactVisible = rect.top < vh - 100;
        shouldBeWhite = contactVisible;
      }

      if (!shouldBeWhite) {
        // White only on hero section (first ~100vh)
        shouldBeWhite = scrollY < vh - 80;
      }

      setTextWhite(shouldBeWhite);

      // Also check for AmenitiesSection visibility for navbar hide/show
      const amenitiesSection = document.querySelector('[data-section="amenities"]');
      if (amenitiesSection) {
        const rect = amenitiesSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isInView = rect.top <= 0 && rect.bottom >= windowHeight;
        setIsVisible(!isInView);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Derived classes
  const textColorClass = textWhite ? 'text-white' : 'text-[var(--foreground)]';
  const logoDividerClass = textWhite ? 'bg-white' : 'bg-[var(--foreground)]';
  const hamburgerClass = textWhite ? 'bg-white' : 'bg-[var(--foreground)]';
  const underlineClass = textWhite ? 'after:bg-white' : 'after:bg-[var(--accent)]';
  const headerBgClass = hasScrolled
    ? textWhite
      ? 'bg-black/20 backdrop-blur-md'
      : 'bg-[var(--background)]/90 backdrop-blur-md'
    : 'bg-transparent';

  // Menu Component to be rendered via Portal
  const MenuOverlay = () => {
    if (!menuOpen) return null;

    return createPortal(
      <div className="
        fixed inset-0
        bg-[var(--background)]
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
                className="group flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
              >
              <span className="text-sm font-semibold tracking-wider uppercase">Close Menu</span>
              <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center items-center px-8 md:px-16 lg:px-24">
            <nav className="space-y-1 w-full max-w-2xl">
              {/* Simple Links */}
              {simpleLinks.map((link, index) => (
                <div
                  key={link.path}
                  className="overflow-hidden text-center"
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
                      `group block text-3xl md:text-4xl lg:text-5xl font-light text-[var(--foreground)] py-3 
                      transition-all duration-300 hover:pl-4 relative
                      ${isActive ? 'font-semibold' : ''}`
                    }
                  >
                    <span className="relative inline-block">
                      {link.label}
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-[var(--accent)] group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </NavLink>
                </div>
              ))}

              {/* Projects with Dropdown */}
              <div
                className="overflow-hidden text-center"
                style={{
                  animation: `slideDown 0.6s ease-out ${simpleLinks.length * 0.1}s forwards`,
                  opacity: 0
                }}
              >
                <button
                  onClick={() => setProjectsDropdown(!projectsDropdown)}
                  className="group flex items-center justify-center w-full text-3xl md:text-4xl lg:text-5xl font-light text-[var(--foreground)] py-3 hover:pl-4 transition-all duration-300"
                >
                  <span className="relative inline-block">
                    PROJECTS
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-[var(--accent)] group-hover:w-full transition-all duration-300"></span>
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
                      className="overflow-hidden text-center"
                      style={{
                        animation: projectsDropdown ? `slideDown 0.5s ease-out ${index * 0.08}s forwards` : 'none',
                        opacity: projectsDropdown ? 0 : 1
                      }}
                    >
                      {item.submenu ? (
                        <div>
                          <button
                            onClick={() => setSurveyingDropdown(!surveyingDropdown)}
                            className="flex items-center justify-center w-full text-xl md:text-2xl text-[var(--foreground)] py-2 hover:pl-2 transition-all duration-300"
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
                                className="block text-center text-base md:text-lg text-[var(--muted-foreground)] py-1.5 hover:pl-2 transition-all duration-300 hover:text-[var(--foreground)]"
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
                          className="block text-center text-xl md:text-2xl text-[var(--foreground)] py-2 hover:pl-2 transition-all duration-300"
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
            className="p-8 md:p-16 flex justify-center"
            style={{
              animation: `slideDown 0.6s ease-out ${(simpleLinks.length + 1) * 0.1}s forwards`,
              opacity: 0
            }}
          >
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 px-6 py-2 rounded-md text-[14px] font-bold transition-all duration-300"
            >
              ENQUIRE TODAY
            </Link>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
    <header
      className={`
      fixed top-0 left-0 w-full z-50
      h-[77px]
      flex items-center justify-between px-4 md:px-6
      transition-all duration-500 ease-in-out
      ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      navbar-enter
      ${headerBgClass}
    `}>

      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 group">
        <span className={`${textColorClass} text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight transition-colors duration-300`} style={{ fontFamily: 'Fragment Glare, Arial, sans-serif' }}>
          CADMAX
        </span>
        <span className={`hidden sm:block w-[2px] h-6 md:h-8 ${logoDividerClass} transition-all duration-300`}></span>
        <span className={`hidden sm:block ${textColorClass} text-sm md:text-base lg:text-lg font-light tracking-[0.3em] uppercase transition-colors duration-300`} style={{ fontFamily: 'Fragment Glare, Arial, sans-serif' }}>
          Consultancy
        </span>
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-2 lg:gap-5">
        {/* Simple Links */}
        {simpleLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            className={({ isActive }) =>
              `relative text-[14px] font-bold px-3 py-2 transition font-['Cormorant_Garamond'] tracking-wider
              ${isActive ? "text-[var(--accent)] scale-110 font-extrabold" : textColorClass}
              
              after:content-[''] after:absolute after:left-0 after:bottom-[6px]
              after:h-[2px] ${textWhite ? 'after:bg-white' : 'after:bg-[var(--accent)]'} after:w-0
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
              `relative text-[14px] font-bold px-3 py-2 transition flex items-center gap-1 font-['Cormorant_Garamond'] tracking-wider
              ${isActive ? "text-[var(--accent)] scale-110 font-extrabold" : textColorClass}
              
              after:content-[''] after:absolute after:left-0 after:bottom-[6px]
              after:h-[2px] ${textWhite ? 'after:bg-white' : 'after:bg-[var(--accent)]'} after:w-0
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
            <div className="absolute top-full left-0 bg-[var(--card)] shadow-lg rounded-md py-2 min-w-[150px] border border-[var(--border)] z-[60]">
              {projectsMenu.items.map((item) => (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => item.submenu && setSurveyingDropdown(true)}
                  onMouseLeave={() => item.submenu && setSurveyingDropdown(false)}
                >
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-2 text-[13px] font-semibold text-[var(--foreground)] hover:bg-[var(--secondary)] hover:text-[var(--accent)] transition"
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
                    <div className="absolute top-0 left-full bg-[var(--card)] shadow-lg rounded-md py-2 min-w-[180px] border border-[var(--border)]">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block px-4 py-2 text-[13px] font-semibold text-[var(--foreground)] hover:bg-[var(--secondary)] hover:text-[var(--accent)] transition"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="h-[0.5px] bg-[var(--border)] w-[calc(100%-6vw)] max-w-[1400px] mx-auto mt-2"></div>
            </div>
          )}
        </div>
      </nav>

      {/* Desktop Button */}
      <Link
        to="/contact"
        className={`hidden lg:block ${textWhite ? 'bg-white text-[#254441]' : 'bg-[var(--primary)] text-[var(--primary-foreground)]'} hover:opacity-90 px-3 py-1 rounded-md text-[12px] font-bold transition-all duration-300`}
      >
        ENQUIRE TODAY
      </Link>

      {/* Elegant Hamburger Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 group ${menuOpen ? 'fixed right-4 z-[100000]' : ''}`}
      >
        <span className={`block w-8 h-0.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2 bg-[var(--foreground)]' : hamburgerClass}`}></span>
        <span className={`block w-8 h-0.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : hamburgerClass}`}></span>
        <span className={`block w-8 h-0.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2 bg-[var(--foreground)]' : hamburgerClass}`}></span>
      </button>

      {/* Full Screen Menu Overlay - Rendered via Portal */}
      <MenuOverlay />

      {/* Backdrop Overlay */}
      {menuOpen && createPortal(
        <div
          className="md:hidden fixed inset-0 bg-[var(--foreground)]/20 backdrop-blur-sm transition-opacity duration-700 opacity-100 menu-backdrop-portal"
          onClick={() => setMenuOpen(false)}
        ></div>,
        document.body
      )}
    </header>

      {/* Bottom line - hides on scroll or when dropdown open */}
      <div className="fixed top-[77px] left-0 w-full flex justify-center z-50 pointer-events-none">
        <div
          className={`nav-line-enter h-[0.5px] ${textWhite ? 'bg-white' : 'bg-[var(--border)]'} w-[calc(100%-6vw)] max-w-[1400px] transition-opacity duration-300 ease-in-out ${
            hasScrolled || projectsDropdown ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

    </>
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

  .navbar-enter {
    opacity: 0;
    transform: translateY(-100%);
    animation: navbarSlideIn 1.0s cubic-bezier(0.16, 1, 0.3, 1) 4s forwards;
  }

  @keyframes navbarSlideIn {
    0% {
      opacity: 0;
      transform: translateY(-100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .nav-line-enter {
    opacity: 0;
    transform: scaleX(0);
    transform-origin: center;
    animation: lineGrow 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) 5s forwards;
  }

  @keyframes lineGrow {
    0% {
      opacity: 0;
      transform: scaleX(0);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: scaleX(1);
    }
  }
`;
document.head.appendChild(styleSheet);

export default Navbar;